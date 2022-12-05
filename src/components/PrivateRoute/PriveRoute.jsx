import { Navigate, Outlet } from "react-router-dom";

const PriveRoute = ({ children }) => {
  const token = true;
  console.log("enter protected", token);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PriveRoute;
