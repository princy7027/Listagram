import React, { lazy } from "react";
import { ToastContainer } from "react-toastify";
import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
import PrivateRoute from "@/components/login/ProtectedRoute";
import SignedInRoute from "./components/login/SignInRoute";

import { RouterProvider } from 'react-router-dom';
import routes from "./routes/index";
// import SignedInRoute from "./components/login/SignInRoute";
const Layout = lazy(() => import("@/layout/Layout"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ForgetPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
      {/* <Router>
        <AccessibleNavigationAnnouncer />
        <Switch> */}
          {/* <SignedInRoute> */}
       
          {/* <Route
            path="/login"
            render={(props) =>
               <SignedInRoute>
               <Login  {...props} /> 
                </SignedInRoute>
            }
          
          /> */}
          {/* <Route path="/signup" component={SignUp} /> */}
          {/* <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} /> */}
          {/* <Redirect exact from="/" to="/login" /> */}
          {/* </SignedInRoute> */}

          {/* <PrivateRoute>
            <Route path="/" component={Layout} /> */}
            {/* <Redirect exact from="/" to="/dashboard" /> */}
          {/* </PrivateRoute>
        </Switch> */}
      {/* </Router> */}
    </>
  );
};

export default App;
