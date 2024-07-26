import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { staffActions } from "../slices/staffSlice";
import Cookies from "js-cookie";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(staffActions.resetStaffDetails());
    Cookies.remove("staffAuthToken");
    navigate("/login");
  }, []);
  return <></>;
};
