import React, { useContext, useState } from "react";
import { NavLink,useNavigate, useLocation,Link  } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";

//internal import
import sidebar from "@/routes/sidebar";
// import SidebarSubMenu from "SidebarSubMenu";
import logoDark from "../../assets/img/whitelogo.png";
// import logoLight from "@/assets/img/logo/logo-dark.svg";
import logoLight from "../../assets/img/LOG1.png";

import { AdminContext } from "@/context/AdminContext";
import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";
import { logout } from "@/reduxStore/slice/authSlice";
import { useDispatch } from "react-redux";

// import { LogOut } from "@/helpers/authHelper";

const SidebarContent = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname, "pathnamepathname");
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link
        className=" text-gray-900 dark:text-gray-200"
        to="/dashboard"
      >
        {mode === "dark" ? (
          <img src={logoDark} alt="Dashtar" width="160" className="pl-6" />
        ) : (
          <img src={logoLight} alt="Dashtar" width="160" className="pl-6" />
        )}
      </Link>
      <ul className="mt-8">
        {sidebar.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} />
          ) : (
            <li className="relative" key={route.name}>
              <NavLink
                exact
                to={route.path}
                target={`${route?.outside ? "_blank" : "_self"}`}
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-500 dark:hover:text-gray-200"
                activeClassName="text-emerald-500 dark:text-gray-100"
                activeStyle={{
                  color: "#22c55e",
                }}
                rel="noreferrer"
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-tr-lg rounded-br-lg ${
                    route.path === pathname ? "block" : "hidden"
                  }`}
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(95deg,#22c55e .52%,#115e59 104.33%)",
                  }}
                ></span>

                <route.icon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-4">{t(`${route.name}`)}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button
          onClick={handleLogOut}
          size="large"
          className="w-full"
          style={{
            background: "linear-gradient(95deg,#22c55e .52%,#115e59 104.33%)",
          }}
        >
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">Log Out</span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;
