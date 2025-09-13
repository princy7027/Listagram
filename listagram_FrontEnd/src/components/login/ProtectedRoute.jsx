import { getToken, getUser } from "@/helpers/utils/auth.util";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {
  const token = getToken();

    const { isLoggedIn } = useSelector((state) => state.auth);
    const user=getUser()
    const isAuthenticated = !!token

  if (isAuthenticated) return children;

  return <Navigate to="/login" />;
  // return (window.location.href = );
};

export default ProtectedRoute;
