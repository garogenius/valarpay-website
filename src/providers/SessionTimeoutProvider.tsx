"use client";

import { useCallback, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import useNavigate from "@/hooks/useNavigate";
import useUserStore from "@/store/user.store";
import { removeHeaderToken } from "@/utils/axios-utils";

type Props = { children: React.ReactNode };

// 20 minutes idle timeout (can be tuned)
const IDLE_LIMIT_MS = 20 * 60 * 1000;
const LOGOUT_BROADCAST_KEY = "valarpay-force-logout";

const SessionTimeoutProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsLoggedIn, setUser } = useUserStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const performLogout = useCallback(
    (reason: string = "idle-timeout") => {
      // Broadcast to other tabs
      try {
        localStorage.setItem(LOGOUT_BROADCAST_KEY, `${Date.now()}:${reason}`);
      } catch (err) {
        // ignore cross-tab sync failures
      }

      sessionStorage.setItem("isLoggingOut", "true");
      removeHeaderToken();
      Cookies.remove("accessToken");
      queryClient.removeQueries({ queryKey: ["get-user"] });
      sessionStorage.removeItem("returnTo");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/login", "replace");
    },
    [navigate, queryClient, setIsLoggedIn, setUser]
  );

  const resetTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      performLogout();
    }, IDLE_LIMIT_MS);
  }, [clearTimer, performLogout]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Start timer on mount
    resetTimer();

    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "visibilitychange"];

    const handleActivity = () => {
      // Only reset when tab is visible to avoid unnecessary resets while hidden
      if (document.visibilityState === "visible") {
        resetTimer();
      }
    };

    activityEvents.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOGOUT_BROADCAST_KEY) {
        // Another tab triggered logout
        performLogout("cross-tab");
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearTimer();
      activityEvents.forEach((event) => window.removeEventListener(event, handleActivity));
      window.removeEventListener("storage", handleStorage);
    };
  }, [clearTimer, resetTimer, performLogout]);

  return <>{children}</>;
};

export default SessionTimeoutProvider;

