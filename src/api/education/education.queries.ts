/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEducationBillerItemsRequest,
  getEducationBillersRequest,
  payEducationSchoolFeeRequest,
  verifyEducationCustomerRequest,
  verifyWaecBillerNumberRequest,
  verifyJambBillerNumberRequest,
  payWaecRequest,
  payJambRequest,
  getSchoolFeePlanRequest,
  getSchoolBillInfoRequest,
  verifySchoolBillerNumberRequest,
  paySchoolFeeRequest,
  getVendingProvidersRequest,
  getVendingProductsRequest,
} from "./education.apis";
import type {
  EducationBiller,
  EducationBillerItem,
  IPayEducation,
  IVerifyEducationCustomer,
  VerifiedEducationCustomer,
  IVerifyJambWaec,
  VerifiedJambWaec,
  IPayJambWaec,
  SchoolBillInfo,
  SchoolFeePlan,
  VendingProvider,
  VendingProduct,
} from "./education.types";

export const useGetSchoolFeePlan = (currency: string = "NGN", enabled: boolean = true) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["school-fee-plan", { currency }],
    queryFn: () => getSchoolFeePlanRequest(currency),
    enabled,
  });
  // Support multiple backend response shapes:
  // 1) { statusCode, data: [...] }
  // 2) { statusCode, data: { data: [...] } }
  // 3) [...] (array directly)
  const body: any = data?.data ?? null;
  const payload: any = body?.data ?? null;
  const institutions: any[] = Array.isArray(body)
    ? body
    : Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : [];
  return { institutions, isPending, isError };
};

export const useGetEducationBillers = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["education-billers"],
    queryFn: getEducationBillersRequest,
  });
  const body = data?.data;
  const payload = body?.data ?? body;
  const billers: EducationBiller[] = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.content)
      ? payload.content
      : Array.isArray(payload?.data)
        ? payload.data
        : [];
  return { billers, isPending, isError };
};

export const useGetEducationBillerItems = (billerCode: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["education-biller-items", billerCode],
    queryFn: () => getEducationBillerItemsRequest({ billerCode }),
    enabled: !!billerCode,
  });
  const body = data?.data;
  const payload = body?.data ?? body;
  const items: EducationBillerItem[] = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.content)
      ? payload.content
      : Array.isArray(payload?.data)
        ? payload.data
        : [];
  return { items, isPending, isError };
};

// School fee bill info (for services/plans)
export const useGetSchoolBillInfo = (billerCode: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["school-bill-info", billerCode],
    queryFn: () => getSchoolBillInfoRequest(billerCode),
    enabled: !!billerCode,
  });
  // Support multiple backend response shapes:
  // 1) { statusCode, data: { billerCode, billerName, plans: [...] } }
  // 2) { statusCode, data: { data: { billerCode, billerName, plans: [...] } } }
  const body: any = data?.data ?? null;
  const payload: any = body?.data ?? null;
  const billInfo: SchoolBillInfo | null =
    payload && !Array.isArray(payload)
      ? (payload?.billerCode ? payload : payload?.data ?? null)
      : null;
  const rawPlans: any = billInfo?.plans ?? [];
  const plans: any[] = Array.isArray(rawPlans) ? rawPlans : [];
  return { billInfo, plans, isPending, isError };
};

export const useVerifyEducationCustomer = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: (payload: IVerifyEducationCustomer) =>
      verifyEducationCustomerRequest(payload),
    onError,
    onSuccess,
  });
};

// School fee verification
export const useVerifySchoolBillerNumber = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: (payload: { itemCode: string; billerCode: string; billerNumber: string }) =>
      verifySchoolBillerNumberRequest(payload),
    onError,
    onSuccess,
  });
};

export const usePayEducationSchoolFee = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IPayEducation) => payEducationSchoolFeeRequest(payload),
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

// School fee payment
export const usePaySchoolFee = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { itemCode: string; billerCode: string; currency: string; billerNumber: string; amount: number; walletPin: string; addBeneficiary?: boolean }) =>
      paySchoolFeeRequest(payload),
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(data);
    },
  });
};

// Vending Hooks
export const useGetVendingProviders = (page: number = 0, size: number = 20) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["vending-providers", page, size],
    queryFn: () => getVendingProvidersRequest(page, size),
  });
  const body = data?.data;
  // Deep search for providers array
  const providers: VendingProvider[] = (() => {
    const p1 = body?.data;
    const p2 = p1?.data;
    if (Array.isArray(p1)) return p1;
    if (Array.isArray(p2)) return p2;
    if (Array.isArray(p2?.products)) return p2.products;
    if (Array.isArray(p1?.products)) return p1.products;
    if (Array.isArray(p2?.content)) return p2.content;
    if (Array.isArray(p1?.content)) return p1.content;
    return [];
  })();
  return { providers, isPending, isError };
};

export const useGetVendingProducts = (params: {
  provider: string;
  page?: number;
  pageSize?: number;
  countryCode?: string;
  categoryCode?: string;
}) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["vending-products", params],
    queryFn: () => getVendingProductsRequest(params),
    enabled: !!params.provider,
  });
  const body = data?.data;
  // Deep search for products array
  const products: VendingProduct[] = (() => {
    const p1 = body?.data;
    const p2 = p1?.data;
    if (Array.isArray(p1)) return p1;
    if (Array.isArray(p2)) return p2;
    if (Array.isArray(p2?.products)) return p2.products;
    if (Array.isArray(p1?.products)) return p1.products;
    if (Array.isArray(p2?.content)) return p2.content;
    if (Array.isArray(p1?.content)) return p1.content;
    return [];
  })();
  return { products, isPending, isError };
};

export const useVerifyWaecBillerNumber = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: (payload: IVerifyJambWaec) => verifyWaecBillerNumberRequest(payload),
    onError,
    onSuccess,
  });
};

export const useVerifyJambBillerNumber = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: (payload: IVerifyJambWaec) => verifyJambBillerNumberRequest(payload),
    onError,
    onSuccess,
  });
};

export const usePayWaec = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IPayJambWaec) => payWaecRequest(payload),
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      onSuccess(data);
    },
  });
};

export const usePayJamb = (
  onError: (error: any) => void,
  onSuccess: (data: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IPayJambWaec) => payJambRequest(payload),
    onError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["get-beneficiaries"] });
      onSuccess(data);
    },
  });
};





















































