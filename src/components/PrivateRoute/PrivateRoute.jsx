import { Navigate, Outlet } from "react-router-dom";
import Coopernet from "../../utils/Coopernet";

const PriveRoute = () => {
  const token =
    Coopernet.oauth.access_token ?? JSON.parse(localStorage.getItem("token"));
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PriveRoute;
