import { request } from "@/utils/axios-utils";
import type { IPayEducation, IVerifyEducationCustomer, IPayJambWaec, IVerifyJambWaec } from "./education.types";

export const getEducationBillersRequest = async () => {
  return request({
    url: "/bill/education/billers",
    method: "get",
  });
};

export const getEducationBillerItemsRequest = async ({
  billerCode,
}: {
  billerCode: string;
}) => {
  return request({
    url: `/bill/remita/education/biller-items?billerCode=${billerCode}`,
    method: "get",
  });
};

// School fee institutions list (plan)
export const getSchoolFeePlanRequest = async (currency: string = "NGN") => {
  const qp = new URLSearchParams();
  if (currency) qp.set("currency", currency);
  return request({
    url: `/bill/school/get-plan?${qp.toString()}`,
    method: "get",
  });
};

// School fee bill info (returns plans/services)
export const getSchoolBillInfoRequest = async (billerCode: string) => {
  return request({
    url: `/bill/school/get-bill-info?billerCode=${billerCode}`,
    method: "get",
  });
};

export const verifyEducationCustomerRequest = async (
  formdata: IVerifyEducationCustomer
) => {
  return request({
    url: "/bill/remita/education/verify-customer",
    method: "post",
    data: formdata,
  });
};

// School fee verification (new endpoint)
export const verifySchoolBillerNumberRequest = async (formdata: {
  itemCode: string;
  billerCode: string;
  billerNumber: string;
}) => {
  return request({
    url: "/bill/school/verify-biller-number",
    method: "post",
    data: formdata,
  });
};

export const payEducationSchoolFeeRequest = async (formdata: IPayEducation) => {
  return request({
    url: "/bill/education/school-fee/pay",
    method: "post",
    data: formdata,
  });
};

// School fee payment (new endpoint)
export const paySchoolFeeRequest = async (formdata: {
  itemCode: string;
  billerCode: string;
  currency: string;
  billerNumber: string;
  amount: number;
  walletPin: string;
  addBeneficiary?: boolean;
}) => {
  return request({
    // Spec: POST /api/v1/bill/education/school-fee/pay (base URL already includes /api/v1)
    url: "/bill/education/school-fee/pay",
    method: "post",
    data: formdata,
  });
};

// JAMB & WAEC APIs
export const getVendingProvidersRequest = async (page: number = 0, size: number = 20) => {
  return request({
    url: `/bill/remita/vending/providers?page=${page}&size=${size}`,
    method: "get",
  });
};

export const getVendingProductsRequest = async ({
  provider,
  page = 0,
  pageSize = 20,
  countryCode = "NGA",
  categoryCode = "educations",
}: {
  provider: string;
  page?: number;
  pageSize?: number;
  countryCode?: string;
  categoryCode?: string;
}) => {
  return request({
    url: `/bill/remita/vending/products?provider=${provider}&page=${page}&pageSize=${pageSize}&countryCode=${countryCode}&categoryCode=${categoryCode}`,
    method: "get",
  });
};

export const verifyWaecBillerNumberRequest = async (formdata: IVerifyJambWaec) => {
  return request({
    url: "/bill/remita/waec/verify-biller-number",
    method: "post",
    data: formdata,
  });
};

export const verifyJambBillerNumberRequest = async (formdata: IVerifyJambWaec) => {
  return request({
    url: "/bill/remita/jamb/verify-biller-number",
    method: "post",
    data: formdata,
  });
};

export const payWaecRequest = async (formdata: IPayJambWaec) => {
  return request({
    url: "/bill/waec/pay",
    method: "post",
    data: formdata,
  });
};

export const payJambRequest = async (formdata: IPayJambWaec) => {
  return request({
    url: "/bill/jamb/pay",
    method: "post",
    data: formdata,
  });
};





















































