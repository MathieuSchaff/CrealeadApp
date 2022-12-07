import { Navigate, Outlet } from "react-router-dom";
import Coopernet from "../../utils/Coopernet";

const PriveRoute = () => {
  console.log("enter protected", Coopernet.oauth);
  const token =
    Coopernet.oauth.access_token ?? JSON.parse(localStorage.getItem("token"));
  console.log(JSON.parse(localStorage.getItem("token")));
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PriveRoute;
