"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaFingerprint } from "react-icons/fa";
import NextImage from "next/image";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import useUserStore from "@/store/user.store";
import { CURRENCY } from "@/constants/types";
import GlobalTransactionHistoryModal from "@/components/shared/GlobalTransactionHistoryModal";
import { useFingerprintForPayments } from "@/store/paymentPreferences.store";
import { useGetDataPlan, useGetDataPlanByNetwork, useGetDataVariation, usePayForData } from "@/api/data/data.queries";
import { getNetworkIconByString } from "@/utils/utilityFunctions";
import { dataPlanNetwork } from "../../user/bill/bill.data";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import Image from "next/image";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import classNames from "classnames";

type Step = "details" | "confirm";

const MobileDataBillSteps: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useUserStore();
  const fingerprintEnabled = useFingerprintForPayments();
  const ngnWallet = user?.wallet?.find((w: any) => w.currency === CURRENCY.NGN);
  const walletAccountNumber = ngnWallet?.accountNumber || "";

  const [step, setStep] = useState<Step>("details");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [planOpen, setPlanOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);

  const [selectedPlan, setSelectedPlan] = useState<any>(null); // NetworkPlan
  const [selectedAmountKey, setSelectedAmountKey] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [walletPin, setWalletPin] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);

  const cleanPhone = phoneNumber.replace(/\D/g, "").slice(-11);
  const { network: detectedNetwork, networkPlans: initialPlans, isLoading: plansPending, isError: plansError } = useGetDataPlan({
    phone: cleanPhone,
    currency: "NGN",
  });

  const [manualNetwork, setManualNetwork] = useState<string>("");
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const networkDropdownRef = useRef<HTMLDivElement>(null);

  // Sync detected network with manual network
  React.useEffect(() => {
    if (detectedNetwork) {
      setManualNetwork(detectedNetwork.toLowerCase());
    }
  }, [detectedNetwork]);

  const activeNetwork = (() => {
    if (manualNetwork) return manualNetwork;
    if (detectedNetwork) return String(detectedNetwork);
    return "";
  })();

  const { data: plansFromNetwork, isLoading: plansByNetworkPending, isError: plansByNetworkError } = useGetDataPlanByNetwork(
    activeNetwork.toUpperCase() || ""
  );

  const networkPlans = useMemo(() => {
    // If we have auto-detected plans and they match the active network, use them
    if (initialPlans && initialPlans.length > 0 && detectedNetwork?.toLowerCase() === activeNetwork.toLowerCase()) {
      return initialPlans;
    }
    return plansFromNetwork?.data?.data || [];
  }, [initialPlans, plansFromNetwork, detectedNetwork, activeNetwork]);

  const network = activeNetwork;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const plansLoading = plansPending || (plansByNetworkPending && !!activeNetwork);

  // Auto-select first plan when network is detected and plans are available
  React.useEffect(() => {
    if (network && networkPlans && networkPlans.length > 0 && !selectedPlan) {
      setSelectedPlan(networkPlans[0]);
    }
  }, [network, networkPlans, selectedPlan]);

  useOnClickOutside(networkDropdownRef, () => setNetworkDropdownOpen(false));
  useOnClickOutside(planRef, () => setPlanOpen(false));
  useOnClickOutside(amountRef, () => setAmountOpen(false));

  const operatorId = useMemo(() => Number(selectedPlan?.operatorId || 0) || 0, [selectedPlan]);

  const { variations, isPending: varsPending, isError: varsError } = useGetDataVariation({
    operatorId: operatorId || undefined,
  });
  const varsLoading = varsPending && !varsError;

  const selectedPlanLabel = useMemo(() => {
    if (!selectedPlan) return "";
    const name = (selectedPlan.operatorName || selectedPlan.planName || selectedPlan.name || selectedPlan.description || "").trim();
    if (!name) return `${activeNetwork.toUpperCase()} Data`;

    const networkRef = activeNetwork.toLowerCase();
    let cleanLabel = name;

    // Strip network prefixes e.g., "MTN Nigeria Bundles" -> "Bundles"
    const prefixes = [
      `${networkRef} nigeria`,
      networkRef,
      "nigeria"
    ];

    prefixes.forEach(prefix => {
      if (cleanLabel.toLowerCase().startsWith(prefix)) {
        cleanLabel = cleanLabel.substring(prefix.length).trim();
      }
    });

    // Normalize generic/empty labels
    if (!cleanLabel || cleanLabel.toLowerCase() === "plan" || cleanLabel.toLowerCase() === "data") {
      return "Normal Plan";
    }

    // Professional refinement
    const lower = cleanLabel.toLowerCase();
    if (lower.includes("sme")) return "SME Data";
    if (lower.includes("gifting")) return "Gifting Plan";
    if (lower.includes("corporate")) return "Corporate Data";
    if (lower.includes("extra")) return "Extra Data";
    if (lower.includes("bundle")) return "Data Bundles";

    return cleanLabel.charAt(0).toUpperCase() + cleanLabel.slice(1);
  }, [selectedPlan, activeNetwork]);

  const selectedAmountLabel = useMemo(() => {
    if (!selectedAmountKey) return "";
    const desc = (variations || {})[selectedAmountKey];
    return String(desc || `${selectedAmountKey}`).trim();
  }, [selectedAmountKey, variations]);

  const getBundleCategory = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes("daily") || d.includes("1 day") || d.includes("2 days")) return "Daily";
    if (d.includes("weekly") || d.includes("7 days")) return "Weekly";
    if (d.includes("monthly") || d.includes("30 days")) return "Monthly";
    if (d.includes("sme")) return "SME";
    if (d.includes("social") || d.includes("whatsapp") || d.includes("instagram") || d.includes("facebook") || d.includes("youtube")) return "Social";
    if (d.includes("yearly") || d.includes("365 days")) return "Yearly";
    return "Others";
  };

  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    Object.values(variations || {}).forEach((v: any) => {
      cats.add(getBundleCategory(String(v)));
    });
    return Array.from(cats);
  }, [variations]);

  const filteredAmountOptions = useMemo(() => {
    const map = variations || {};
    const keys = Object.keys(map || {}).sort((a, b) => Number(a) - Number(b));
    if (selectedCategory === "All") return keys;
    return keys.filter(k => getBundleCategory(String(map[k])) === selectedCategory);
  }, [variations, selectedCategory]);

  const amount = useMemo(() => Number(selectedAmountKey) || 0, [selectedAmountKey]);

  const formatNgn = (v: number) =>
    `₦${new Intl.NumberFormat("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
      Number.isFinite(v) ? v : 0
    )}`;

  const onPayError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage) ? errorMessage : [errorMessage || "Data purchase failed"];
    ErrorToast({ title: "Error during data purchase", descriptions });
  };

  const onPaySuccess = (data: any) => {
    SuccessToast({ title: "Data purchase successful", description: "Your purchase was successful" });
    const ref = data?.data?.data?.transactionRef || data?.data?.data?.reference || `data_${Date.now()}`;
    const now = new Date().toISOString();
    setTransactionData({
      id: ref,
      type: "DATA",
      status: "SUCCESSFUL",
      direction: "debit",
      amount: Number(amount) || 0,
      currency: "NGN",
      reference: ref,
      createdAt: now,
      paymentMethod: "Available Balance",
      senderName: user?.fullname || undefined,
      senderAccount: walletAccountNumber,
      recipientName: (network || selectedPlan?.network || "Data").toString().toUpperCase(),
      recipientAccount: phoneNumber,
      recipientBank: "Mobile Data",
      description: "Mobile Data",
      network: (network || selectedPlan?.network || "").toString().toUpperCase(),
      billerNumber: phoneNumber,
      planName: selectedAmountLabel || undefined,
    });
    setShowSuccess(true);
  };

  const { mutate: payData, isPending: payPending, isError: payErr } = usePayForData(onPayError, onPaySuccess);
  const paying = payPending && !payErr;

  const canNext = phoneNumber.length >= 10 && !!selectedPlan && amount > 0;
  const canPay = canNext && walletPin.length === 4;

  return (
    <>
      <div className="w-full flex flex-col bg-white dark:bg-bg-1100">
        <div className="px-5 pt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#0A0A0A] dark:text-white text-sm font-semibold">Mobile Data</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                {step === "details" ? "Enter payment details to continue" : "Confirm Transactions"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-5 py-5 border-t border-gray-200 dark:border-gray-800">
          {step === "details" ? (
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-gray-500 dark:text-gray-400">Phone Number</label>
                <div className="w-full flex items-center bg-[#F4F4F5] dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 text-sm">
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.trim())}
                    className="w-full bg-transparent border-none outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 text-sm"
                    placeholder="Enter phone number"
                    inputMode="text"
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-1" ref={networkDropdownRef}>
                <label className="text-[11px] text-gray-500 dark:text-gray-400">Network</label>
                <button
                  type="button"
                  onClick={() => setNetworkDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between bg-[#F4F4F5] dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 text-sm text-black dark:text-white"
                >
                  <div className="flex items-center gap-2">
                    {activeNetwork ? (
                      <>
                        <Image
                          src={getNetworkIconByString(activeNetwork) || ""}
                          alt={activeNetwork}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain rounded-full"
                        />
                        <span className="font-medium uppercase">{activeNetwork}</span>
                      </>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-600">Select Network</span>
                    )}
                  </div>
                  <span className="text-gray-500 dark:text-gray-500">▾</span>
                </button>

                {networkDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-2xl z-[999999]">
                    <SearchableDropdown
                      items={dataPlanNetwork}
                      searchKey="value"
                      showSearch={false}
                      isOpen={true}
                      onClose={() => setNetworkDropdownOpen(false)}
                      onSelect={(item: any) => {
                        setManualNetwork(item.value);
                        setSelectedPlan(null);
                        setSelectedAmountKey("");
                        setNetworkDropdownOpen(false);
                      }}
                      displayFormat={(item: any) => (
                        <div className="flex items-center gap-2">
                          <Image
                            src={getNetworkIconByString(item.value) || ""}
                            alt={item.value}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="uppercase text-sm">{item.label}</span>
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Plan */}
              <div className="relative flex flex-col gap-1" ref={planRef}>
                <label className="text-[11px] text-gray-500 dark:text-gray-400">Plan</label>
                <button
                  type="button"
                  onClick={() => setPlanOpen((v) => !v)}
                  disabled={!networkPlans?.length}
                  className="w-full flex items-center justify-between bg-[#F4F4F5] dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 text-sm text-black dark:text-white disabled:opacity-60"
                >
                  <span className={selectedPlan ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-600"}>
                    {selectedPlan ? selectedPlanLabel : "Select plan"}
                  </span>
                  <span className="text-gray-500 dark:text-gray-500">▾</span>
                </button>

                {planOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden max-h-52 overflow-y-auto shadow-2xl z-[999999]">
                    {(networkPlans || []).map((p: any, idx: number) => {
                      const name = (p.operatorName || p.planName || p.name || p.description || "").trim();
                      const networkRef = activeNetwork.toLowerCase();
                      let label = name;

                      const prefixes = [`${networkRef} nigeria`, networkRef, "nigeria"];
                      prefixes.forEach(prefix => {
                        if (label.toLowerCase().startsWith(prefix)) {
                          label = label.substring(prefix.length).trim();
                        }
                      });

                      if (!label || label.toLowerCase() === "plan" || label.toLowerCase() === "data") {
                        label = "Normal Plan";
                      } else {
                        const lower = label.toLowerCase();
                        if (lower.includes("sme")) label = "SME Data";
                        else if (lower.includes("gifting")) label = "Gifting Plan";
                        else if (lower.includes("corporate")) label = "Corporate Data";
                        else if (lower.includes("extra")) label = "Extra Data";
                        else if (lower.includes("bundle")) label = "Data Bundles";
                        else label = label.charAt(0).toUpperCase() + label.slice(1);
                      }

                      return (
                        <button
                          key={p.id || p.planId || p.planName || idx}
                          type="button"
                          onClick={() => {
                            setSelectedPlan(p);
                            setSelectedAmountKey("");
                            setSelectedCategory("All");
                            setPlanOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-[#1C1C1E] transition-colors border-b border-gray-50 dark:border-gray-800 last:border-b-0"
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Category Tabs */}
              {operatorId > 0 && categories.length > 2 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedAmountKey("");
                      }}
                      className={classNames(
                        "px-3 py-1.5 rounded-full text-[11px] font-medium transition-all whitespace-nowrap border",
                        selectedCategory === cat
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-gray-50 dark:bg-[#141416] border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Amount / Variation */}
              <div className="relative flex flex-col gap-1" ref={amountRef}>
                <label className="text-[11px] text-gray-500 dark:text-gray-400">Bundle</label>
                <button
                  type="button"
                  onClick={() => setAmountOpen((v) => !v)}
                  disabled={!operatorId}
                  className="w-full flex items-center justify-between bg-[#F4F4F5] dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 text-sm text-black dark:text-white disabled:opacity-60"
                >
                  <span className={selectedAmountKey ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-600"}>
                    {selectedAmountKey ? selectedAmountLabel : operatorId ? "Select bundle" : "Select plan first"}
                  </span>
                  <span className="text-gray-500 dark:text-gray-500">▾</span>
                </button>

                {amountOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden max-h-52 overflow-y-auto shadow-2xl z-[999999]">
                    {varsLoading ? (
                      <div className="p-4 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                        <SpinnerLoader width={18} height={18} color="#FF6B2C" /> Loading...
                      </div>
                    ) : filteredAmountOptions.length > 0 ? (
                      filteredAmountOptions.map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => {
                            setSelectedAmountKey(k);
                            setAmountOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-[#1C1C1E] transition-colors border-b border-gray-50 dark:border-gray-800 last:border-b-0"
                        >
                          {String((variations || {})[k] || k)}
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-xs">
                        No bundles in this category
                      </div>
                    )}
                  </div>
                )}
              </div>

              {amount > 0 ? (
                <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-800/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                    <p className="text-xs text-green-700 dark:text-green-300 font-medium">{formatNgn(amount)}</p>
                  </div>
                  <p className="text-[11px] text-green-700 dark:text-green-300">From Available Balance</p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <div className="rounded-xl bg-[#F4F4F5] dark:bg-[#141416] border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between py-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Network</p>
                  <p className="text-xs font-medium text-black dark:text-white">
                    {String(network || selectedPlan?.network || "-").toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Phone Number</p>
                  <p className="text-xs font-medium text-black dark:text-white">{phoneNumber || "-"}</p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Plan</p>
                  <p className="text-xs font-medium text-black dark:text-white">{selectedAmountLabel || "-"}</p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Amount Debited</p>
                  <p className="text-xs font-semibold text-black dark:text-white">{formatNgn(amount)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600 dark:text-gray-400 text-[11px]">Enter Transaction PIN</p>
                <div className="w-full flex items-center bg-[#F4F4F5] dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3">
                  <input
                    value={walletPin}
                    onChange={(e) => setWalletPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="w-full bg-transparent border-none outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 text-sm"
                    placeholder="Enter PIN"
                    inputMode="numeric"
                    type="password"
                    maxLength={4}
                  />
                  {fingerprintEnabled ? (
                    <button
                      type="button"
                      className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                      aria-label="Use fingerprint"
                      onClick={() =>
                        ErrorToast({
                          title: "Fingerprint not available",
                          descriptions: ["Fingerprint sign-in isn't enabled on web yet."],
                        })
                      }
                    >
                      <FaFingerprint className="text-gray-600 dark:text-gray-300 text-lg" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5">
          {step === "details" ? (
            <button
              onClick={() => setStep("confirm")}
              disabled={!canNext}
              className="w-full px-4 py-3 rounded-full bg-[#FF6B2C] text-black font-semibold hover:bg-[#FF7A3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("details")}
                className="flex-1 px-4 py-3 rounded-full bg-[#2C2C2E] text-white hover:bg-[#353539] transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!selectedPlan) return;
                  payData({
                    phone: phoneNumber,
                    currency: "NGN",
                    operatorId: Number(selectedPlan.operatorId),
                    amount: Number(amount),
                    addBeneficiary: false,
                    walletPin,
                  });
                }}
                disabled={!canPay || paying}
                className="flex-1 px-4 py-3 rounded-full bg-[#FF6B2C] text-black font-semibold hover:bg-[#FF7A3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paying ? "Processing..." : "Pay"}
              </button>
            </div>
          )}
        </div>
      </div>

      {transactionData && (
        <GlobalTransactionHistoryModal
          isOpen={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            setTransactionData(null);
            setStep("details");
            setSelectedPlan(null);
            setSelectedAmountKey("");
            setWalletPin("");
            setPhoneNumber("");
            onClose();
          }}
          transaction={transactionData}
        />
      )}
    </>
  );
};

export default MobileDataBillSteps;
