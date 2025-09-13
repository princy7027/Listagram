import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useNavigateWithLastPath = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastPathname, setLastPathname] = useState(location.pathname);

  useEffect(() => {
    setLastPathname(location.pathname);
  }, [location.pathname]);

  const navigateWithLastPath = (to) => {
    navigate(to);
  };

  return { navigate: navigateWithLastPath, lastPathname };
};
export default useNavigateWithLastPath;
