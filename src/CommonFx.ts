import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const verifyStaffAuthToken = async (authToken: string) => {
  try {
    if (!authToken) return false;
    const apiRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/verifyStaffAuthToken`,
      { token: authToken }
    );
    if (apiRes && apiRes?.data?.success) {
      return apiRes.data;
    } else {
      toast.error("Authorization error");
      Cookies.remove("staffAuthToken");
      return false;
    }
  } catch (err: any) {
    toast.error(
      err.message || "Something went wrong while validating your auth token."
    );
  }
};
