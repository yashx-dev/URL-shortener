import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Loader from "./shared/Loader.jsx"; 

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Checking authentication..." />;     
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;