import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

//internal import
import { AdminContext } from "@/context/AdminContext";
// import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { removeSetting } from "@/reduxStore/slice/settingSlice";
import { signIn } from "@/reduxStore/slice/authSlice";
// import { setUserInfo } from "@/helpers/authHelper";

const useLoginSubmit = () => {
  const reduxDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const { dispatch } = useContext(AdminContext);
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const [adminData, setAdminData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;
    // return;

    if (location.pathname === "/login") {
      console.log(email, password,"email, password")
      let body = { email: email, password: password };
      dispatch(signIn(body)).unwrap().then((res)=>
      {
        console.log(res,"resres")
             if (res.data.success) {
          setLoading(false);
          // setAdminData(res?.payload);
          // dispatch(saveCreds(body));
          // setUserInfo(res?.payload);
          if (res?.data?.token) {
            notifySuccess("Login successfully!!");
            navigate("/dashboard");
            // dispatch(saveCreds({}));
          }
        }
      });
      // reduxDispatch(removeSetting("globalSetting"));
      // AdminServices.loginAdmin({ email, password })
      // .then((res) => {
      //   if (res.success) {
      //     setLoading(false);
      //     setAdminData(res?.payload);
      //     // dispatch(saveCreds(body));
      //     // setUserInfo(res?.payload);
      //     if (res?.payload?.token) {
      //       notifySuccess("Login successfully!!");
      //       history.push("/dashboard");
      //       // dispatch(saveCreds({}));
      //     }
      //   }
      // })
      // .catch((err) => {
      //   notifyError(err ? err.response.data.message : err.message);
      //   setLoading(false);
      // });
    }

    if (location.pathname === "/signup") {
      // AdminServices.registerAdmin({ name, email, password, role })
      //   .then((res) => {
      //     if (res) {
      //       setLoading(false);
      //       notifySuccess("Register Success!");
      //       dispatch({ type: "USER_LOGIN", payload: res });
      //       Cookies.set("adminInfo", JSON.stringify(res), {
      //         expires: cookieTimeOut,
      //         sameSite: "None",
      //         secure: true,
      //       });
      //       history.replace("/");
      //     }
      //   })
      //   .catch((err) => {
      //     notifyError(err ? err.response.data.message : err.message);
      //     setLoading(false);
      //   });
    }

    if (location.pathname === "/forgot-password") {
      // AdminServices.forgetPassword({ verifyEmail })
      //   .then((res) => {
      //     setLoading(false);
      //     notifySuccess(res.message);
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //     notifyError(err ? err.response.data.message : err.message);
      //   });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
