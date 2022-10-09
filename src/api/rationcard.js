import axios from "axios";
import { getBaseURL } from "./config";

export const getMembersDetails = (rationCardNo) => {
  let url = `${getBaseURL()}/OHCMSAPI/bskyapi/bskyapiService/getNFSData/${rationCardNo}`;
  return axios.post(url);
};
