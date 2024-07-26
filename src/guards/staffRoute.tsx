import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { verifyStaffAuthToken } from "../CommonFx";
import { toast } from "react-toastify";
export const StaffRoute = (props: any) => {
  const [userVerified, setUserVerified] = useState(false);
  const authToken = Cookies.get("staffAuthToken");
  const navigate = useNavigate();
  const verifyUser = async () => {
    if (!authToken) {
      toast.error("Auth token not found");
      setUserVerified(false);
      return navigate("/login");
    }
    const response = await verifyStaffAuthToken(authToken);
    if (response) setUserVerified(true);
    else {
      Cookies.remove("staffAuthToken");
      setUserVerified(false);
      return navigate("/login");
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);

  return <>{userVerified ? props.children : null}</>;
};
