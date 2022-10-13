import axios from "axios";
import { getBaseURL } from "./config";

export const getMembersDetails = (rationCardNo) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/getNFSData/${rationCardNo}`;
  return axios.post(url);
};

export const generateOTP = (adharNo) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/generateOTP/${adharNo}`;
  return axios.post(url);
};

export const verifyOTP = (payload) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/verifyOTP`;
  return axios.post(url, payload);
};
