export type EducationBiller = {
  billerId: string;
  billerName: string;
  billerShortName?: string;
  billerLogoUrl?: string;
  countryCode?: string;
  category?: string;
  description?: string;
};

export type EducationBillerItem = {
  billPaymentProductId: string;
  billPaymentProductName: string;
  isAmountFixed: boolean;
  amount: number;
  currency: string;
  payAmount: number;
};

export type IVerifyEducationCustomer = {
  itemCode: string; // billPaymentProductId
  billerCode: string; // billerId
  billerNumber: string; // customerId
};

export type VerifiedEducationCustomer = {
  customerName?: string;
  billerNumber?: string;
  amount?: number;
  [k: string]: any;
};

export type IPayEducation = {
  itemCode: string;
  billerCode: string;
  currency: string;
  billerNumber: string;
  amount: number;
  walletPin: string;
  addBeneficiary?: boolean;
};

// JAMB & WAEC Types
export type VendingProvider = {
  code: string;
  name: string;
  description?: string;
  logoUrl?: string;
  category?: string;
};

export type VendingProduct = {
  billPaymentProductId: string;
  billPaymentProductName: string;
  isAmountFixed: boolean;
  amount: number;
  currency: string;
  payAmount: number;
};

export type IVerifyJambWaec = {
  itemCode: string;
  billerCode: string;
  billerNumber: string;
};

export type VerifiedJambWaec = {
  customerName?: string;
  candidateNumber?: string;
  registrationNumber?: string;
  amount?: number;
};

export type IPayJambWaec = {
  itemCode: string;
  billerCode: string;
  currency: string;
  billerNumber: string;
  amount: number;
  walletPin: string;
  addBeneficiary?: boolean;
};

// School fee bill info types
export type SchoolFeePlan = {
  id: number;
  name: string;
  amount: number;
  itemCode?: string;
};

export type SchoolBillInfo = {
  billerCode: string;
  billerName: string;
  plans: SchoolFeePlan[];
};





















































