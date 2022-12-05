import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useAppSelector(selectCurentTokenAuth);
  console.log("enter protected", token);
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

// valide pas le token,
