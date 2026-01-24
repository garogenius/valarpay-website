/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin, usePasscodeLogin } from "@/api/auth/auth.queries";
import { motion } from "framer-motion";
import images from "../../../public/images";
import AuthHeader from "./AuthHeader";
import Image from "next/image";
import AuthInput from "./AuthInput";
import CustomButton from "@/components/shared/Button";
import Link from "next/link";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import useNavigate from "@/hooks/useNavigate";
import icons from "../../../public/icons";
import { useTheme } from "@/store/theme.store";
import useAuthEmailStore from "@/store/authEmail.store";
import { useEffect, useState, useMemo } from "react";
import { User } from "@/constants/types";
import { ILogin } from "@/api/auth/auth.types";
import Cookies from "js-cookie";
import * as BiometricService from "@/services/biometric.service";
import { useBiometricChallenge, useBiometricLogin } from "@/api/biometric/biometric.queries";
import useUserStore from "@/store/user.store";




interface LoginFormData {
  username: string;
  password?: string;
  ipAddress?: string;
  deviceName?: string;
  operatingSystem?: string;
  passcode?: string;
}

interface RememberedUser {
  email: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
}

const REMEMBERED_USER_KEY = "valar_remembered_user";

const LoginContent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { setAuthEmail, setAuthUsername } = useAuthEmailStore();
  const { setUser, setIsLoggedIn } = useUserStore();

  const [biometricType, setBiometricType] = useState<"fingerprint" | "faceid" | null>(null);
  const [deviceId] = useState(() => BiometricService.getDeviceId());
  const [loginMethod, setLoginMethod] = useState<"password" | "passcode">("password");
  const [rememberedUser, setRememberedUser] = useState<RememberedUser | null>(null);

  const unifiedSchema = useMemo(() => yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().when("$loginMethod", {
      is: "password",
      then: (sh) => sh.min(8, "Password must be at least 8 characters").required("Password is required"),
      otherwise: (sh) => sh.optional(),
    }),
    passcode: yup.string().when("$loginMethod", {
      is: "passcode",
      then: (sh) => sh.required("Passcode is required").length(6, "Passcode must be exactly 6 digits"),
      otherwise: (sh) => sh.optional(),
    }),
    ipAddress: yup.string().optional(),
    deviceName: yup.string().optional(),
    operatingSystem: yup.string().optional(),
  }), [loginMethod]);

  const form = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
      passcode: "",
      ipAddress: "",
      deviceName: "",
      operatingSystem: "",
    },
    resolver: yupResolver(unifiedSchema) as any,
    context: { loginMethod },
    mode: "onChange",
  });

  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors, isValid } = formState;

  // Debugging log for disabled button issue
  console.log("Login Form State:", { isValid, errors, loginMethod, values: form.getValues() });

  useEffect(() => {
    // Check for remembered user
    const stored = localStorage.getItem(REMEMBERED_USER_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRememberedUser(parsed);
        // Pre-fill form with email as username as requested
        setValue("username", parsed.email, { shouldValidate: true });
      } catch (e) {
        localStorage.removeItem(REMEMBERED_USER_KEY);
      }
    }

    // Get operating system
    const getOS = () => {
      const userAgent = window.navigator.userAgent;

      if (/Windows/.test(userAgent)) return "Windows";
      if (/Mac/.test(userAgent)) return "MacOS";
      if (/Linux/.test(userAgent)) return "Linux";
      if (/Android/.test(userAgent)) return "Android";
      if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";

      return "Unknown OS";
    };

    // Get device name
    const getDeviceName = () => {
      const userAgent = window.navigator.userAgent;
      // Extract device info from user agent string
      const deviceInfo =
        userAgent.split(") ")[0].split("(")[1] || "Unknown Device";
      return deviceInfo;
    };

    // Get IP address
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setValue("ipAddress", data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
        setValue("ipAddress", "Unable to fetch IP");
      }
    };

    setValue("operatingSystem", getOS());
    setValue("deviceName", getDeviceName());
    getIpAddress();

    // Detect biometric capability
    // COMMENTED OUT: Biometric login feature temporarily disabled
    // BiometricService.detectBiometricCapability().then(setBiometricType);
  }, [setValue]); // Run once when component mounts

  const onError = async (error: any) => {
    const trimmedUsername = form.getValues("username").trim().toLowerCase();
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage];

    if (descriptions.includes("Email not verified")) {
      setAuthEmail(trimmedUsername);
      navigate("/verify-email");
    } else {
      ErrorToast({
        title: "Error during login",
        descriptions,
      });
    }
  };

  const onPasswordSuccess = (data: any) => {
    const user: User = data?.data?.user;
    const trimmedUsername = form.getValues("username").trim().toLowerCase();
    setAuthEmail(user?.email);
    setAuthUsername(trimmedUsername);
    console.log("Password login payload:", {
      username: trimmedUsername,
      password: form.getValues("password"),
      ipAddress: form.getValues("ipAddress"),
      deviceName: form.getValues("deviceName"),
      operatingSystem: form.getValues("operatingSystem"),
    });

    // After password login, always go to 2FA verification
    SuccessToast({
      title: "Login successful!",
      description:
        "Check your email for verification code to continue with your two-factor authentication.",
    });
    navigate("/two-factor-auth");

    // Save user for next time
    const userData: RememberedUser = {
      email: user.email,
      username: user.username,
      fullName: user.fullname,
      avatarUrl: user.profileImageUrl || undefined,
    };
    localStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(userData));

    reset();
  };

  const onPasscodeSuccess = (data: any) => {
    const user: User = data?.data?.user;
    const token = data?.data?.accessToken;

    if (token) {
      Cookies.set("accessToken", token);
    }

    setAuthEmail(user?.email);
    setAuthUsername(form.getValues("username").toLowerCase());
    setUser(user);
    setIsLoggedIn(true);

    SuccessToast({
      title: "Login successful!",
      description: "Welcome back!",
    });

    navigate("/user/dashboard");

    // Save user for next time
    const userData: RememberedUser = {
      email: user.email,
      username: user.username,
      fullName: user.fullname,
      avatarUrl: user.profileImageUrl || undefined,
    };
    localStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(userData));

    reset();
  };

  const {
    mutate: login,
    isPending: loginPending,
    isError: loginError,
  } = useLogin(onError, onPasswordSuccess);

  const loginLoading = loginPending && !loginError;

  const {
    mutate: passcodeLogin,
    isPending: passcodeLoginPending,
    isError: passcodeLoginError,
  } = usePasscodeLogin(onError, onPasscodeSuccess);

  const passcodeLoginLoading = passcodeLoginPending && !passcodeLoginError;
  const isLoading = loginLoading || passcodeLoginLoading;


  // COMMENTED OUT: Biometric login feature temporarily disabled
  // Biometric login
  // const { mutate: getChallenge, isPending: challengePending } = useBiometricChallenge(
  //   (error) => {
  //     ErrorToast({ title: "Challenge Error", descriptions: [error?.response?.data?.message || "Failed to get challenge"] });
  //   },
  //   (data) => {
  //     const challenge = data.data.challenge;
  //     BiometricService.signChallenge(challenge).then((signed) => {
  //       if (signed) {
  //         biometricLoginMutate({
  //           identifier: form.getValues("username"),
  //           deviceId,
  //           signature: signed.signature,
  //           challenge,
  //           publicKey: BiometricService.getStoredBiometricInfo()?.publicKey || "",
  //         });
  //       } else {
  //         ErrorToast({ title: "Biometric Error", descriptions: ["Failed to sign challenge"] });
  //       }
  //     }).catch(() => {
  //       ErrorToast({ title: "Biometric Error", descriptions: ["Failed to sign challenge"] });
  //     });
  //   }
  // );

  // const { mutate: biometricLoginMutate, isPending: biometricLoginPending } = useBiometricLogin(
  //   (error) => {
  //     const errorMessage = error?.response?.data?.message;
  //     const descriptions = Array.isArray(errorMessage) ? errorMessage : [errorMessage || "Biometric login failed"];
  //     ErrorToast({ title: "Biometric Login Failed", descriptions });
  //   },
  //   (data) => {
  //     Cookies.set("accessToken", data.data.accessToken);
  //     setUser(data.data.user);
  //     setIsLoggedIn(true);
  //     SuccessToast({ title: "Login successful!", description: "You have been logged in using biometric authentication." });
  //     navigate("/user/dashboard");
  //   }
  // );

  const handleSwitchAccount = () => {
    setRememberedUser(null);
    localStorage.removeItem(REMEMBERED_USER_KEY);
    reset({ ...form.getValues(), username: "", password: "", passcode: "" });
  };

  const maskEmail = (email: string) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;
    const visible = name.slice(0, 4);
    return `${visible}*******@${domain}`;
  };

  const onSubmit = async (data: LoginFormData) => {
    // Ensure we use email from remembered user if available
    const finalUsername = rememberedUser?.email || data.username;
    const trimmedUsername = finalUsername.trim().toLowerCase();

    if (loginMethod === "password") {
      const payload = {
        username: trimmedUsername,
        password: data.password || "",
        ipAddress: data.ipAddress || "",
        deviceName: data.deviceName || "",
        operatingSystem: data.operatingSystem || "",
      };
      console.log("🚀 Submitting password login payload:", payload);
      login(payload as ILogin);
    } else {
      const payload = {
        username: trimmedUsername,
        passcode: data.passcode,
        ipAddress: data.ipAddress || "",
        deviceName: data.deviceName || "",
        operatingSystem: data.operatingSystem || "",
      };
      console.log("🚀 Submitting passcode login payload:", payload);
      passcodeLogin(payload);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Left image section (desktop) */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-1/2">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/home/landingPage/glassBuilding.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Image overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: '#1C2E50CC' }} />

        {/* Header on top of left section */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <AuthHeader />
        </div>

        {/* Left content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="pl-12 pr-8 max-w-2xl text-white space-y-6">
            <div>
              <h2 className="text-5xl font-bold mb-4 leading-tight text-primary">Welcome to ValarPay</h2>
              <p className="text-2xl opacity-95 mb-6 leading-relaxed">Your trusted partner in seamless digital payments and financial solutions.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl opacity-90">Secure and instant money transfers</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl opacity-90">24/7 Customer Support</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl opacity-90">Competitive exchange rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right brand section */}
      <div className="relative min-h-screen md:ml-[50%] bg-dark-primary flex items-center">
        {/* Header on mobile */}
        <div className="md:hidden absolute top-0 left-0 right-0 z-20">
          <AuthHeader />
        </div>

        {/* Login form */}
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-12">
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            className="z-10 flex flex-col justify-center items-center w-full max-w-md bg-dark-primary dark:bg-bg-1100 dark:xs:border dark:border-border-600 rounded-2xl p-6 sm:p-8 gap-6"
          >
            <form
              key={loginMethod}
              className="flex flex-col justify-start items-start w-full gap-7"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {!rememberedUser ? (
                <AuthInput
                  id="username"
                  label="Email or Phone Number"
                  type="text"
                  htmlFor="username"
                  placeholder="Username"
                  icon={
                    <Image
                      src={
                        theme === "dark"
                          ? icons.authIcons.mailDark
                          : icons.authIcons.mail
                      }
                      alt="username"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  }
                  error={errors.username?.message}
                  {...register("username")}
                />
              ) : (
                <div key="quick-login" className="w-full flex flex-col items-center gap-4 mb-2">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-white/10 flex items-center justify-center border-2 border-primary/20">
                    {rememberedUser.avatarUrl ? (
                      <Image src={rememberedUser.avatarUrl} alt="profile" fill className="object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-gray-500 dark:text-gray-400 uppercase">
                        {(rememberedUser.fullName || rememberedUser.username || "U").slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Continue with</p>
                    <p className="font-medium text-black dark:text-white mt-0.5">
                      {maskEmail(rememberedUser.email)}
                    </p>
                  </div>
                  <input type="hidden" {...register("username")} />
                </div>
              )}

              {loginMethod === "password" ? (
                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  htmlFor="password"
                  placeholder="Password"
                  autoComplete="off"
                  forgotPassword={true}
                  icon={
                    <Image
                      src={
                        theme === "dark"
                          ? icons.authIcons.lockDark
                          : icons.authIcons.lock
                      }
                      alt="password"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  }
                  error={errors.password?.message}
                  {...register("password")}
                />
              ) : (
                <AuthInput
                  id="passcode"
                  label="Passcode"
                  type="password"
                  htmlFor="passcode"
                  placeholder="Enter 6-digit passcode"
                  maxLength={6}
                  icon={
                    <Image
                      src={theme === "dark" ? icons.authIcons.lockDark : icons.authIcons.lock}
                      alt="passcode"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  }
                  error={errors.passcode?.message}
                  {...register("passcode", {
                    onChange: (e: any) => {
                      // Only allow numeric input
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setValue("passcode", val, { shouldValidate: true });
                    }
                  })}
                />
              )}

              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline font-medium transition-colors"
                  onClick={() => {
                    const newMethod = loginMethod === "password" ? "passcode" : "password";
                    setLoginMethod(newMethod);
                    reset({ ...form.getValues(), password: "", passcode: "" }); // Keep username, clear credentials
                    setTimeout(() => form.trigger(), 0); // Re-validate with new context
                  }}
                >
                  {loginMethod === "password" ? "Login with Passcode" : "Login with Password"}
                </button>
              </div>

              {rememberedUser && (
                <div className="w-full flex justify-center -mt-2">
                  <button
                    type="button"
                    onClick={handleSwitchAccount}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                  >
                    Login with another account
                  </button>
                </div>
              )}


              {/* Moved CTA to top-right header */}

              <CustomButton
                type="submit"
                disabled={!isValid || isLoading}
                isLoading={isLoading}
                className="mb-4  w-full  border-2 border-primary text-black text-base 2xs:text-lg max-2xs:px-6 py-3.5 xs:py-4"
              >
                Sign In{" "}
              </CustomButton>

              {/* COMMENTED OUT: Biometric login feature temporarily disabled */}
              {/* {biometricType && BiometricService.isWebAuthnSupported() && (
                <CustomButton
                  type="button"
                  onClick={() => {
                    const username = form.getValues("username");
                    if (!username) {
                      ErrorToast({ title: "Username Required", descriptions: ["Please enter your username first"] });
                      return;
                    }
                    getChallenge({ identifier: username, deviceId });
                  }}
                  disabled={challengePending || biometricLoginPending || !form.getValues("username")}
                  isLoading={challengePending || biometricLoginPending}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white text-base py-3.5"
                >
                  {biometricType === "faceid" ? "Login with Face ID" : "Login with Fingerprint"}
                </CustomButton>
              )} */}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
