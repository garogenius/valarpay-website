"use client";

import React from "react";
import { CgClose } from "react-icons/cg";
import { useCreateCurrencyAccountPayoutDestination } from "@/api/currency/currency.queries";
import CustomButton from "@/components/shared/Button";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { ICurrencyAccount } from "@/api/currency/currency.types";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useVerifyAccount } from "@/api/wallet/wallet.queries";

interface CreatePayoutDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: ICurrencyAccount;
  onSuccess: () => void;
  initialType?: "wire" | "nip" | "stablecoin";
}

const CreatePayoutDestinationModal: React.FC<CreatePayoutDestinationModalProps> = ({
  isOpen,
  onClose,
  account,
  onSuccess,
  initialType = "wire",
}) => {
  const [type, setType] = React.useState<"wire" | "nip" | "stablecoin">(initialType);

  // Wire transfer fields
  const [accountNumber, setAccountNumber] = React.useState("");
  const [routingNumber, setRoutingNumber] = React.useState("");
  const [beneficiaryName, setBeneficiaryName] = React.useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [bankAddress, setBankAddress] = React.useState("");
  const [wireType, setWireType] = React.useState("swift");

  // NIP fields
  const [nipAccountNumber, setNipAccountNumber] = React.useState("");
  const [nipBankCode, setNipBankCode] = React.useState("");
  const [nipBeneficiaryName, setNipBeneficiaryName] = React.useState("");
  const [nipAccountType, setNipAccountType] = React.useState<"personal" | "business">("personal");
  const [verifiedAccountName, setVerifiedAccountName] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  // Stablecoin fields
  const [stablecoinCurrency, setStablecoinCurrency] = React.useState("USDC");
  const [addressCode, setAddressCode] = React.useState("");
  const [addressNetwork, setAddressNetwork] = React.useState("POL");

  // Common field
  const [label, setLabel] = React.useState("");

  const [bankOpen, setBankOpen] = React.useState(false);
  const bankRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(bankRef, () => setBankOpen(false));

  const currency = account.currency || "USD";

  // For NIP account verification
  const { mutate: verifyAccount } = useVerifyAccount(
    () => { }, // onError
    () => { }  // onSuccess
  );

  React.useEffect(() => {
    if (isOpen) {
      setType(initialType);
      resetForm();
    }
  }, [isOpen, initialType]);

  const resetForm = () => {
    // Wire fields
    setAccountNumber("");
    setRoutingNumber("");
    setBeneficiaryName("");
    setBeneficiaryAddress("");
    setBankName("");
    setBankAddress("");
    setWireType("swift");

    // NIP fields
    setNipAccountNumber("");
    setNipBankCode("");
    setNipBeneficiaryName("");
    setNipAccountType("personal");
    setVerifiedAccountName("");

    // Stablecoin fields
    setStablecoinCurrency("USDC");
    setAddressCode("");
    setAddressNetwork("POL");

    // Common
    setLabel("");
    setBankOpen(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // NIP account verification
  React.useEffect(() => {
    if (type === "nip" && nipAccountNumber.length === 10 && nipBankCode) {
      setIsVerifying(true);
      verifyAccount(
        {
          accountNumber: nipAccountNumber,
          bankCode: nipBankCode,
        },
        {
          onSuccess: (data: any) => {
            const accountName = data?.data?.data?.account_name || data?.data?.account_name;
            if (accountName) {
              setVerifiedAccountName(accountName);
              setNipBeneficiaryName(accountName);
            }
            setIsVerifying(false);
          },
          onError: () => {
            setVerifiedAccountName("");
            setIsVerifying(false);
          },
        }
      );
    } else {
      setVerifiedAccountName("");
    }
  }, [nipAccountNumber, nipBankCode, type]);


  const onError = (error: any) => {
    const errorMessage = error?.response?.data?.message;
    const descriptions = Array.isArray(errorMessage)
      ? errorMessage
      : [errorMessage || "Failed to create payout destination"];
    ErrorToast({
      title: "Creation Failed",
      descriptions,
    });
  };

  const onSuccessCallback = (data: any) => {
    SuccessToast({
      title: "Destination Created",
      description: "Payout destination created successfully",
    });
    handleClose();
    onSuccess();
  };

  const { mutate: createDestination, isPending } = useCreateCurrencyAccountPayoutDestination(
    onError,
    onSuccessCallback
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formdata: any = { type };

    if (type === "wire") {
      formdata = {
        ...formdata,
        account_number: accountNumber.trim(),
        routing_number: routingNumber.trim(),
        account_name: beneficiaryName.trim(), // Using account_name as alias for beneficiary_name
        beneficiary_address: beneficiaryAddress.trim(),
        bank_name: bankName.trim(),
        bank_address: bankAddress.trim() || undefined,
        wire_type: wireType,
        label: label.trim() || undefined,
      };
    } else if (type === "nip") {
      formdata = {
        ...formdata,
        account_type: nipAccountType,
        account_number: nipAccountNumber.trim(),
        bank_code: nipBankCode.trim(),
        beneficiary_name: nipBeneficiaryName.trim(),
        label: label.trim() || undefined,
      };
    } else if (type === "stablecoin") {
      formdata = {
        ...formdata,
        currency: stablecoinCurrency.trim(),
        address_code: addressCode.trim(),
        address_network: addressNetwork.trim(),
        label: label.trim() || undefined,
      };
    }

    createDestination({ currency, formdata });
  };

  if (!isOpen || !account) return null;

  const canSubmit = () => {
    if (type === "wire") {
      return accountNumber.trim() && routingNumber.trim() && beneficiaryName.trim() && bankName.trim();
    } else if (type === "nip") {
      return nipAccountNumber.trim().length === 10 && nipBankCode.trim() && nipBeneficiaryName.trim();
    } else if (type === "stablecoin") {
      return stablecoinCurrency.trim() && addressCode.trim() && addressNetwork.trim();
    }
    return false;
  };

  return (
    <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={handleClose} />
      </div>
      <div className="relative mx-2.5 2xs:mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 px-0 py-4 w-full max-w-md max-h-[92vh] rounded-2xl overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 cursor-pointer bg-bg-1400 rounded-full hover:bg-bg-1200 transition-colors z-10"
        >
          <CgClose className="text-xl text-text-200 dark:text-text-400" />
        </button>

        <div className="px-5 sm:px-6 pt-1 pb-4">
          <h2 className="text-white text-base sm:text-lg font-semibold">Create Payout Destination</h2>
          <p className="text-white/60 text-sm mt-1">Add a new payout destination for {currency} account</p>
        </div>

        <form onSubmit={handleSubmit} className="px-5 sm:px-6 pb-6 space-y-4 overflow-y-auto max-h-[calc(92vh-120px)]">
          {/* Type Selection */}
          <div>
            <label className="block text-sm text-white/80 mb-1.5">Destination Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "wire", label: "Wire" },
                { value: "nip", label: "NIP" },
                { value: "stablecoin", label: "Stablecoin" },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${type === t.value
                    ? "bg-primary text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wire Transfer Fields */}
          {type === "wire" && (
            <>
              <div>
                <label className="block text-sm text-white/80 mb-1.5">Account Number *</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Routing Number / SWIFT Code *</label>
                <input
                  type="text"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value.toUpperCase())}
                  placeholder="Enter SWIFT code"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Beneficiary Name *</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  placeholder="Enter beneficiary name"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Beneficiary Address *</label>
                <textarea
                  value={beneficiaryAddress}
                  onChange={(e) => setBeneficiaryAddress(e.target.value)}
                  placeholder="Enter beneficiary address"
                  rows={2}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Bank Name *</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter bank name"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Bank Address (Optional)</label>
                <textarea
                  value={bankAddress}
                  onChange={(e) => setBankAddress(e.target.value)}
                  placeholder="Enter bank address"
                  rows={2}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary resize-none"
                />
              </div>
            </>
          )}

          {/* NIP Fields */}
          {type === "nip" && (
            <>
              <div>
                <label className="block text-sm text-white/80 mb-1.5">Account Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "personal", label: "Personal" },
                    { value: "business", label: "Business" },
                  ].map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setNipAccountType(t.value as any)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${nipAccountType === t.value
                        ? "bg-primary text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Account Number *</label>
                <input
                  type="text"
                  value={nipAccountNumber}
                  onChange={(e) => setNipAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10-digit account number"
                  maxLength={10}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                />
                {isVerifying && (
                  <p className="text-xs text-blue-400 mt-1">Verifying account...</p>
                )}
                {verifiedAccountName && (
                  <p className="text-xs text-green-400 mt-1">✓ {verifiedAccountName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Bank Code *</label>
                <input
                  type="text"
                  value={nipBankCode}
                  onChange={(e) => setNipBankCode(e.target.value)}
                  placeholder="e.g., 000014"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Beneficiary Name *</label>
                <input
                  type="text"
                  value={nipBeneficiaryName}
                  onChange={(e) => setNipBeneficiaryName(e.target.value)}
                  placeholder="Enter beneficiary name"
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
                  required
                  readOnly={!!verifiedAccountName}
                />
              </div>
            </>
          )}

          {/* Stablecoin Fields */}
          {type === "stablecoin" && (
            <>
              <div>
                <label className="block text-sm text-white/80 mb-1.5">Stablecoin Currency *</label>
                <select
                  value={stablecoinCurrency}
                  onChange={(e) => setStablecoinCurrency(e.target.value)}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white outline-none focus:border-primary"
                  required
                >
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="DAI">DAI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Wallet Address *</label>
                <input
                  type="text"
                  value={addressCode}
                  onChange={(e) => setAddressCode(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1.5">Network *</label>
                <select
                  value={addressNetwork}
                  onChange={(e) => setAddressNetwork(e.target.value)}
                  className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white outline-none focus:border-primary"
                  required
                >
                  <option value="POL">Polygon (POL)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BSC">Binance Smart Chain (BSC)</option>
                  <option value="ARB">Arbitrum (ARB)</option>
                </select>
              </div>
            </>
          )}

          {/* Label (Optional for all types) */}
          <div>
            <label className="block text-sm text-white/80 mb-1.5">Label (Optional)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Supplier Payment - John Doe"
              className="w-full bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-3.5 px-3 text-white placeholder:text-white/50 outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <CustomButton
              type="button"
              onClick={handleClose}
              className="flex-1 bg-transparent border border-border-600 text-white hover:bg-white/5 py-3 rounded-lg transition-colors"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              isLoading={isPending}
              disabled={!canSubmit() || isPending}
              className="flex-1 bg-primary hover:bg-primary/90 text-black font-medium py-3 rounded-lg transition-colors"
            >
              Create Destination
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePayoutDestinationModal;
