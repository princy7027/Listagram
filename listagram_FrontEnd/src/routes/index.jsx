import PrivateRoute from "@/components/login/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";
import Layout from "@/layout/Layout";
import Login from "@/pages/Login";
import SignedInRoute from "@/components/login/SignInRoute";
import ProtectedRoute from "@/components/login/ProtectedRoute";
import Property from "@/pages/Property";
import AddProperty from "@/pages/AddProperty";

// use lazy for better code splitting
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Projects = lazy(() => import("@/pages/Projects"));
const Users = lazy(() => import("@/pages/Users"));
const Customers = lazy(() => import("@/pages/Customers"));
// const Setting = lazy(() => import("@/pages/Setting"));
const Page404 = lazy(() => import("@/pages/404"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <SignedInRoute>
        <Login />
      </SignedInRoute>
    ),
  },
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/projects",
    element: (
      
        <Layout>
          <Projects />
        </Layout>
      
    ),
  },
  {
    path: "/Add-Property",
    element: (
      
        <Layout>
          <AddProperty />
        </Layout>
      
    ),
  },
  {
    path: "/users",
    element: (
        <Layout>
          <Users />
        </Layout>
    ),
  },
  {
    path: "/Listings",
    element: (
        <Layout>
          <Property />
        </Layout>
    ),
  },
  {
    path: "/customers",
    element: (
        <Layout>
          <Customers />
        </Layout>
    ),
  },

  {
    path: "/404",
    element: (
        <Layout>
          <Page404 />{" "}
        </Layout>
    ),
  },
  {
    path: "/coming-soon",
    element: (
        <Layout>
          <ComingSoon />
        </Layout>
    ),
  },
  {
    path: "/edit-profile",
    element: (
        <Layout>
          <EditProfile />
        </Layout>
    ),
  },
]);

export default routes;
