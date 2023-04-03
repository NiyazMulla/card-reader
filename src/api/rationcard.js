import axios from "axios";
import { getBaseURL, getHeaders } from "./config";

export const getMembersDetails = (rationCardNo) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/getNFSData/${rationCardNo}`;
  return axios.post(url,{},);
};

export const generateOTP = (adharNo) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/generateOTP/${adharNo}`;
  return axios.post(url,{});
};
export const getMembersDetailsFromSmartCard = (rationCardNo) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/readSmartCard`;
  return axios.post(url,{
    rationCardNum:rationCardNo
  },);
};
export const verifyOTP = (payload) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/verifyOTP`;
  return axios.post(url, payload);
};
export const redirectToOdishaOneFromUpdateCard = (requestId) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/odhishaOneResapi/getResponseParam/${requestId}/UPDATE`;
  return axios.post(url,{});
};

export const redirectToOdishaOneFromPrint = (requestId) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/odhishaOneResapi/getResponseParam/${requestId}/PRINT`;
  return axios.post(url,{});
};

export const redirectToOdishaOneFromDelivery = (requestId) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/odhishaOneResapi/getResponseParam/${requestId}/PRINT`;
  return axios.post(url,{});
};
export const redirectToOdishaOneFromCancel = (requestId) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/odhishaOneResapi/getResponseParam/${requestId}/CANCEL`;
  return axios.post(url,{},getHeaders());
};
