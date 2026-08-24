export interface ICurrencyAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  currency: "USD" | "EUR" | "GBP" | "NGN";
  balance: number;
  label?: string;
  status?: "ACTIVE" | "INACTIVE" | "CLOSED";
  providerAccountId?: string;
}

export interface ICreateCurrencyAccount {
  currency: "USD" | "EUR" | "GBP" | "NGN";
  label: string;
}

export interface IUpdateCurrencyAccount {
  label?: string;
}

export interface ICloseCurrencyAccount {
  walletPin: string;
}

export interface ICreatePayoutDestination {
  type: "wire" | "nip" | "stablecoin";

  // Wire transfer fields
  account_number?: string;
  routing_number?: string;
  account_name?: string; // Alias for beneficiary_name
  beneficiary_name?: string;
  beneficiary_address?: string;
  bank_name?: string;
  bank_address?: string;
  wire_type?: string;

  // NIP fields
  account_type?: "personal" | "business";
  bank_code?: string;

  // Stablecoin fields
  currency?: string; // e.g., "USDC"
  address_code?: string;
  address_network?: string;

  // Common optional field
  label?: string;
}

export interface ICreatePayout {
  destination_id: string;
  amount: number;
  description?: string;
}

export interface ICurrencyTransaction {
  id: string;
  account_id: string;
  amount: number;
  currency: string;
  transaction_type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  description?: string;
  reference?: string;
  created_at: string;
  updated_at: string;
}

export interface ICurrencyDeposit {
  id: string;
  account_id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
  created_at: string;
  updated_at: string;
}

export interface ICurrencyPayout {
  id: string;
  account_id: string;
  destination_id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
  fee?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface IPayoutDestination {
  id: string;
  type: "wire" | "nip" | "stablecoin";

  // Wire transfer fields
  wire_type?: string;
  account_type?: "personal" | "business";
  account_number?: string;
  routing_number?: string;
  beneficiary_name?: string;
  beneficiary_address?: string;
  bank_name?: string;
  bank_address?: string;

  // NIP fields
  bank_code?: string;

  // Stablecoin fields
  currency?: string;
  address_code?: string;
  address_network?: string;

  // Common fields
  label?: string;
  created_at: string;

  // Legacy fields for backward compatibility
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}

export interface IGetCurrencyAccountTransactionsQuery {
  limit?: number;
  offset?: number;
}

export interface IGetCurrencyAccountDepositsQuery {
  limit?: number;
  offset?: number;
}

export interface IGetCurrencyAccountPayoutsQuery {
  limit?: number;
  offset?: number;
}

