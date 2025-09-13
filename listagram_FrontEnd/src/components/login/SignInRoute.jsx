import { getToken, getUser } from "@/helpers/utils/auth.util";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";




const SignedInRoute = ({ children }) => {
  const token = getToken();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user=getUser()
  const isAuthenticated = !!token
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  // if (isAuthenticated) return (window.location.href = redirects);

  return (
    <>
      {children}
   </>
  );
};

export default SignedInRoute;
