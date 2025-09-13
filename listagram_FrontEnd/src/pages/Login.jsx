import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import ImageLight from "@/assets/img/login-office.jpeg";
import ImageDark from "@/assets/img/login-office-dark.jpeg";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import CMButton from "@/components/form/button/CMButton";
import { Label } from "@windmill/react-ui";

const Login = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src={ImageLight} alt="Office" />
              <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src={ImageDark} alt="Office" />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Label className="col-span-4 sm:col-span-2 font-medium text-sm mb-3">Email</Label>
                  <InputArea
                    register={register}
                    defaultValue="admin@gmail.com"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="Enter Your Email"
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-6"></div>
                  <Label className="col-span-4 sm:col-span-2 font-medium text-sm mb-3">Password</Label>

                  <InputArea
                    register={register}
                    label="Password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="Enter Password"
                  />
                  <Error errorName={errors.password} />
                  <div className="mt-6"></div>

                  {loading ? (
                    <CMButton disabled={loading} type="submit" className={`bg-emerald-600 rounded-md mt-4 h-12 w-full`} to="/dashboard" />
                  ) : (
                    <Button disabled={loading} type="submit" className="mt-4 h-12 w-full" to="/dashboard" style={{background: "linear-gradient(95deg,#22c55e .52%,#115e59 104.33%)"}}> 
                      Sign In
                    </Button>
                  )}
                  {/* <button
                    disabled
                    className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
                  >
                    <ImFacebook className="w-4 h-4 mr-2" />{" "}
                    <span className="ml-2"> {t("LoginWithFacebook")} </span>
                  </button> */}
                  {/* <button
                    disabled
                    className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                  >
                    <ImGoogle className="w-4 h-4 mr-2" />{" "}
                    <span className="ml-2">{t("LoginWithGoogle")}</span>
                  </button> */}
                </form>

                <p className="mt-4 flex items-end justify-end">
                  <Link className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline" to="/forgot-password">
                    Forgot Password?
                  </Link>
                </p>
                {/* <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                    to="/signup"
                  >
                    {t("CreateAccountTitle")}
                  </Link>
                </p> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
