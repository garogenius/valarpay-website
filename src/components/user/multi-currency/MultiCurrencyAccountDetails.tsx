"use client";

import React from "react";
import { FiEdit2, FiTrash2, FiPlus, FiCopy, FiArrowDownLeft, FiArrowUpRight, FiCheckCircle, FiXCircle, FiClock, FiSend, FiRepeat, FiArrowDown, FiUser } from "react-icons/fi";
import { LuCopy, LuWallet } from "react-icons/lu";
import {
  useGetCurrencyAccounts,
  useGetCurrencyAccountByCurrency,
  useGetCurrencyAccountTransactions,
  useGetCurrencyAccountDeposits,
  useGetCurrencyAccountPayouts,
  useGetCurrencyAccountPayoutDestinations,
  useUpdateCurrencyAccount,
  useCloseCurrencyAccount,
} from "@/api/currency/currency.queries";
import { ICurrencyAccount } from "@/api/currency/currency.types";
import CustomButton from "@/components/shared/Button";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import UpdateCurrencyAccountModal from "@/components/modals/currency/UpdateCurrencyAccountModal";
import CloseCurrencyAccountModal from "@/components/modals/currency/CloseCurrencyAccountModal";
import CreatePayoutDestinationModal from "@/components/modals/currency/CreatePayoutDestinationModal";
import CreatePayoutModal from "@/components/modals/currency/CreatePayoutModal";
import { formatDistanceToNow } from "date-fns";
import { getCurrencyIconByString } from "@/utils/utilityFunctions";
import Image from "next/image";
import EmptyState from "@/components/user/table/EmptyState";
import images from "../../../../public/images";

interface MultiCurrencyAccountDetailsProps {
  currency: "USD" | "EUR" | "GBP";
  onRefetch: () => void;
}

const MultiCurrencyAccountDetails: React.FC<MultiCurrencyAccountDetailsProps> = ({
  currency,
  onRefetch,
}) => {
  const [tab, setTab] = React.useState<"transactions" | "deposits" | "payouts" | "destinations">("transactions");
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openClose, setOpenClose] = React.useState(false);
  const [openCreateDestination, setOpenCreateDestination] = React.useState(false);
  const [payoutDestinationType, setPayoutDestinationType] = React.useState<"wire" | "nip" | "stablecoin">("wire");
  const [openCreatePayout, setOpenCreatePayout] = React.useState(false);
  const [transactionsPage, setTransactionsPage] = React.useState(0);
  const [depositsPage, setDepositsPage] = React.useState(0);
  const [payoutsPage, setPayoutsPage] = React.useState(0);
  const limit = 10;

  const { account, isPending: accountLoading, refetch: refetchAccount } = useGetCurrencyAccountByCurrency(currency);
  const { transactions, count: transactionsCount, isPending: transactionsLoading } = useGetCurrencyAccountTransactions(
    currency,
    { limit, offset: transactionsPage * limit }
  );
  const { deposits, count: depositsCount, isPending: depositsLoading } = useGetCurrencyAccountDeposits(
    currency,
    { limit, offset: depositsPage * limit }
  );
  const { payouts, count: payoutsCount, isPending: payoutsLoading } = useGetCurrencyAccountPayouts(
    currency,
    { limit, offset: payoutsPage * limit }
  );
  const { destinations, isPending: destinationsLoading, refetch: refetchDestinations } = useGetCurrencyAccountPayoutDestinations(currency);
  const { accounts } = useGetCurrencyAccounts();
  const [openAccountsModal, setOpenAccountsModal] = React.useState(false);

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <FiCheckCircle className="text-green-400" />;
      case "pending":
        return <FiClock className="text-yellow-400" />;
      case "failed":
        return <FiXCircle className="text-red-400" />;
      default:
        return <FiClock className="text-white/40" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-white/60";
    }
  };

  const handleUpdateSuccess = () => {
    setOpenUpdate(false);
    refetchAccount();
    onRefetch();
  };

  const handleCloseSuccess = () => {
    setOpenClose(false);
    refetchAccount();
    onRefetch();
  };

  const handleCreateDestinationSuccess = () => {
    setOpenCreateDestination(false);
    refetchDestinations();
  };

  const handleCreatePayoutSuccess = () => {
    setOpenCreatePayout(false);
    setTab("payouts");
    refetchAccount();
    onRefetch();
  };

  if (!account && !accountLoading) {
    return (
      <div className="rounded-2xl bg-bg-600 dark:bg-bg-1100 border border-white/10 p-8 flex flex-col items-center justify-center gap-4">
        <p className="text-white/60 text-sm">No {currency} account found</p>
      </div>
    );
  }

  const transactionsTotalPages = Math.ceil((transactionsCount || 0) / limit);
  const depositsTotalPages = Math.ceil((depositsCount || 0) / limit);
  const payoutsTotalPages = Math.ceil((payoutsCount || 0) / limit);

  return (
    <div className="flex flex-col gap-6">
      {/* Account Details Card */}
      <div className="rounded-2xl bg-bg-600 dark:bg-bg-1100 border border-white/10 p-4 sm:p-6">
        {accountLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-3 w-20 bg-white/10 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : account ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={getCurrencyIconByString(currency.toLowerCase()) || ""}
                  alt={currency}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div>
                  <h2 className="text-white text-lg sm:text-xl font-semibold">
                    {account.accountName || account.label || `${currency} Account`}
                  </h2>
                  <p className="text-white/60 text-sm">{currency} Account Details</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Edit Label button removed */}
                <button
                  onClick={() => setOpenClose(true)}
                  disabled={account.balance > 0}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrash2 className="text-base" />
                  <span className="hidden sm:inline">Close Account</span>
                </button>
              </div>
            </div>

            {/* Account Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs mb-1">Account Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-white text-sm font-medium">{account.accountNumber || (account as any).account_number || "N/A"}</p>
                  {account.accountNumber && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(account.accountNumber || "");
                        SuccessToast({
                          title: "Copied",
                          description: "Account number copied to clipboard",
                        });
                      }}
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                      title="Copy"
                    >
                      <LuCopy className="w-4 h-4 text-white/80" />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs mb-1">Bank Name</p>
                <p className="text-white text-sm font-medium">{account.bankName || (account as any).bank_name || "N/A"}</p>
              </div>
              {/* Balance card hidden as requested */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs mb-1">Account Name</p>
                <div className="flex items-center gap-2">
                  <p className="text-white text-sm font-medium truncate">{account.accountName || (account as any).account_name || account.label || "N/A"}</p>
                  {account.accountName && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(account.accountName || "");
                        SuccessToast({
                          title: "Copied",
                          description: "Account name copied to clipboard",
                        });
                      }}
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                      title="Copy"
                    >
                      <LuCopy className="w-4 h-4 text-white/80" />
                    </button>
                  )}
                </div>
              </div>
              {/* Status and Currency cards hidden as requested */}
            </div>

            {/* Action Buttons - Premium Mobile Design */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setOpenCreatePayout(true)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#D4B139] hover:bg-[#E5C14A] transition-all group shadow-lg flex items-center justify-center"
                >
                  <FiSend className="text-black text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-xs font-semibold text-white text-center">Transfer</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setPayoutDestinationType("wire");
                    setOpenCreateDestination(true);
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#D4B139] hover:bg-[#E5C14A] transition-all group shadow-lg flex items-center justify-center"
                >
                  <FiRepeat className="text-black text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-xs font-semibold text-white text-center">Destinations</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setOpenCreatePayout(true);
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#D4B139] hover:bg-[#E5C14A] transition-all group shadow-lg flex items-center justify-center"
                >
                  <FiArrowDown className="text-black text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-xs font-semibold text-white text-center">Withdraw</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setOpenAccountsModal(true)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#D4B139] hover:bg-[#E5C14A] transition-all group shadow-lg flex items-center justify-center"
                >
                  <FiUser className="text-black text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                </button>
                <span className="text-[10px] sm:text-xs font-semibold text-white text-center">Account</span>
              </div>
            </div>

            {/* Copy All Details Button */}
            {/* <CustomButton
              onClick={() => {
                const accountDetails = `Account Name: ${account.accountName || account.label || "N/A"}\nAccount Number: ${account.accountNumber || "N/A"}\nBank Name: ${account.bankName || "N/A"}\nBalance: ${currency} ${formatAmount(account.balance || 0)}\nCurrency: ${currency}`;
                navigator.clipboard.writeText(accountDetails);
                SuccessToast({
                  title: "Account Details Copied",
                  description: "All account details have been copied to clipboard",
                });
              }}
              className="w-full bg-[#FF6B2C] hover:bg-[#FF7A3D] text-black font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <FiCopy />
              <span>Copy All Account Details</span>
            </CustomButton> */}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-white/60 text-sm">No {currency} account found</p>
          </div>
        )}
      </div>

      {/* Lists Section */}
      {account && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payout History Card */}
          <div className="rounded-2xl bg-bg-600 dark:bg-bg-1100 border border-white/10 overflow-hidden h-fit">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold">Payout History</h3>
              <button
                onClick={() => setTab("payouts")}
                className="text-xs text-primary hover:underline"
              >
                View Details
              </button>
            </div>
            <div className="p-6">
              {!payoutsLoading && (!payouts || payouts.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-white/40 text-sm italic">No payout history yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(payouts || []).slice(0, 5).map((payout: any) => (
                    <div
                      key={payout.id}
                      className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-red-500/20">
                        <FiArrowUpRight className="text-red-400 text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white text-sm font-semibold text-red-400">
                            -{currency} {formatAmount(payout.amount)}
                          </p>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 ${getStatusColor(payout.status)}`}>
                            {payout.status?.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-white/40 text-[10px] truncate mt-0.5">
                          {formatDate(payout.created_at)} • {payout.description || "Payout"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Payout Destinations Card */}
          <div className="rounded-2xl bg-bg-600 dark:bg-bg-1100 border border-white/10 overflow-hidden h-fit">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold">Payout Destinations</h3>
              <button
                onClick={() => setTab("destinations")}
                className="text-xs text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="p-6">
              {!destinationsLoading && (!destinations || destinations.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-white/40 text-sm italic">No destinations saved</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(destinations || []).slice(0, 5).map((dest: any) => (
                    <div
                      key={dest.id}
                      className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-500/20">
                        <span className="text-[10px] font-bold text-blue-400">{dest.type?.slice(0, 4).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{dest.account_name}</p>
                        <p className="text-white/40 text-[10px] truncate mt-0.5">
                          {dest.account_number} • {dest.bank_name || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transactions History Table - Moved down and always shown if exists */}
      {account && transactions && transactions.length > 0 && (
        <div className="rounded-2xl bg-bg-600 dark:bg-bg-1100 border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-white font-semibold">Recent Transactions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {transactions.slice(0, 10).map((txn: any) => (
                <div
                  key={txn.id}
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${txn.transaction_type === "credit"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                    }`}>
                    {txn.transaction_type === "credit" ? (
                      <FiArrowDownLeft className="text-green-400 text-xl" />
                    ) : (
                      <FiArrowUpRight className="text-red-400 text-xl" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium text-sm truncate">
                        {txn.description || txn.reference || "Transaction"}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getStatusIcon(txn.status)}
                        <span className={`text-xs font-semibold ${getStatusColor(txn.status)}`}>
                          {txn.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className={`text-sm font-semibold ${txn.transaction_type === "credit" ? "text-green-400" : "text-red-400"
                        }`}>
                        {txn.transaction_type === "credit" ? "+" : "-"}
                        {currency} {formatAmount(txn.amount)}
                      </p>
                      <p className="text-white/50 text-xs">
                        {formatDate(txn.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {account && (
        <>
          <UpdateCurrencyAccountModal
            isOpen={openUpdate}
            onClose={() => setOpenUpdate(false)}
            account={account}
            onSuccess={handleUpdateSuccess}
          />
          <CloseCurrencyAccountModal
            isOpen={openClose}
            onClose={() => setOpenClose(false)}
            account={account}
            onSuccess={handleCloseSuccess}
          />
          <CreatePayoutDestinationModal
            isOpen={openCreateDestination}
            onClose={() => setOpenCreateDestination(false)}
            account={account}
            onSuccess={handleCreateDestinationSuccess}
            initialType={payoutDestinationType}
          />
          <CreatePayoutModal
            isOpen={openCreatePayout}
            onClose={() => setOpenCreatePayout(false)}
            account={account}
            destinations={destinations || []}
            onSuccess={handleCreatePayoutSuccess}
          />
          <CurrencyAccountsModal
            isOpen={openAccountsModal}
            onClose={() => setOpenAccountsModal(false)}
            accounts={accounts || []}
          />
        </>
      )}
    </div>
  );
};

// Internal Modal to list accounts
const CurrencyAccountsModal: React.FC<{ isOpen: boolean; onClose: () => void; accounts: any[] }> = ({ isOpen, onClose, accounts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-bg-1100 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white text-xl font-bold">Currency Accounts</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <FiPlus className="text-2xl rotate-45" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {accounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <LuWallet className="text-3xl text-white/20" />
              </div>
              <p className="text-white/40 font-medium">No accounts found</p>
            </div>
          ) : (
            accounts.map((acc: any) => (
              <div key={acc.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-[#D4B139]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#D4B139] font-extrabold text-lg">{acc.currency}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-lg truncate mb-0.5">{acc.accountName || acc.label || `${acc.currency} Account`}</p>
                  <p className="text-white/40 text-sm font-mono tracking-wider">{acc.accountNumber || (acc as any).account_number || "No Account Number"}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCopy className="text-white/60 text-sm" />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-[#D4B139] text-black font-extrabold text-lg hover:bg-[#E5C14A] transition-all active:scale-[0.98] shadow-lg shadow-[#D4B139]/10"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default MultiCurrencyAccountDetails;
