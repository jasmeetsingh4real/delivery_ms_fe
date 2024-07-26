import Cookies from "js-cookie";
import { Navigate, useSearchParams } from "react-router-dom";
export const GuestRoute = (props: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const authToken = Cookies.get("staffAuthToken");
  if (authToken && !searchParams.get("isRedirected")) {
    return <Navigate to={"/"} />;
  } else return <>{props.children}</>;
};
