"use client";

import { useMemo } from "react";
import type { ReactElement } from "react";
import useUserStore from "@/store/user.store";
import DashboardAccountCard from "./DashboardAccountCard";
import SavingsTypeCard from "./cards/SavingsTypeCard";
import FixedDepositCard from "./cards/FixedDepositCard";
import InvestmentStatCard from "./cards/InvestmentStatCard";
import TransactionChartCard from "./cards/TransactionChartCard";
import { useMyFixedDeposits } from "@/api/fixed-deposit/fixed-deposit.queries";
import { useSavingsPlans } from "@/api/savings/savings.queries";
import { useGetInvestments } from "@/api/investment/investment.queries";

const StatsCardsRow = () => {
  const { user } = useUserStore();

  // Check if user has created these products
  const { deposits: fixedDeposits } = useMyFixedDeposits();
  const { plans: savingsPlans } = useSavingsPlans();
  const { investmentsData } = useGetInvestments({
    page: 1,
    limit: 1,
  });

  const hasFixedDeposit = useMemo(() => {
    return Array.isArray(fixedDeposits) && fixedDeposits.length > 0;
  }, [fixedDeposits]);

  const hasSavings = useMemo(() => {
    return Array.isArray(savingsPlans) && savingsPlans.length > 0;
  }, [savingsPlans]);

  const hasInvestment = useMemo(() => {
    const investments = investmentsData?.investments || [];
    return Array.isArray(investments) && investments.length > 0;
  }, [investmentsData]);

  // Calculate how many stats cards are displayed (excluding account card)
  const statsCardsCount = useMemo(() => {
    let count = 0;
    if (hasSavings) count++;
    if (hasFixedDeposit) count++;
    if (hasInvestment) count++;
    return count;
  }, [hasSavings, hasFixedDeposit, hasInvestment]);

  // Calculate placeholder span (if 1 card, placeholder takes 2 spaces; if 2 cards, placeholder takes 1 space; if 3 cards, no placeholder)
  const placeholderSpan = useMemo(() => {
    if (statsCardsCount === 0) return 3; // If no stats cards, placeholder takes all 3 spaces
    if (statsCardsCount === 1) return 2; // If 1 card, placeholder takes 2 spaces
    if (statsCardsCount === 2) return 1; // If 2 cards, placeholder takes 1 space
    return 0; // If 3 cards, no placeholder needed
  }, [statsCardsCount]);

  return (
    <>
      {/* Mobile: horizontal slider for the 4 stats cards (excluding Transaction Overview) */}
      <div className="sm:hidden -mx-4 px-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-1">
          {[
            { key: "account", element: <DashboardAccountCard wallets={user?.wallet || []} /> },
            hasSavings ? { key: "savings", element: <SavingsTypeCard /> } : null,
            hasFixedDeposit ? { key: "fixed", element: <FixedDepositCard /> } : null,
            hasInvestment ? { key: "invest", element: <InvestmentStatCard /> } : null,
          ]
            .filter(Boolean)
            .map((card) => {
              const typed = card as { key: string; element: ReactElement };
              return (
                <div
                  key={typed.key}
                  className="snap-start"
                  style={{ minWidth: "calc(100vw - 2rem)" }}
                >
                  {typed.element}
                </div>
              );
            })}
        </div>
      </div>

      {/* Tablet & Desktop: keep the grid and placeholder/chart logic */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <DashboardAccountCard wallets={user?.wallet || []} />
        
        {/* Only show stats cards if user has created them */}
        {hasSavings && <SavingsTypeCard />}
        {hasFixedDeposit && <FixedDepositCard />}
        {hasInvestment && <InvestmentStatCard />}
        
        {/* Placeholder chart card - only show if there's space */}
        {placeholderSpan > 0 && (
          <TransactionChartCard spanCols={placeholderSpan} />
        )}
      </div>
    </>
  );
};

export default StatsCardsRow;
