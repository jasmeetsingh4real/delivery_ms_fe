import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
export const GuestRoute = (props: any) => {
  const authToken = Cookies.get("staffAuthToken");
  if (authToken) {
    return <Navigate to={"/"} />;
  } else return <>{props.children}</>;
};
