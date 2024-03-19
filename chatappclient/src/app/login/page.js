"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  LoginUserAsync,
  LoginUserByGoogleAsync,
  checkAuthAsync,
  selectLoggedInUser,
} from "@/redux/features/auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const LoggedInuser = useSelector(selectLoggedInUser);
  const router = useRouter();
  const [isAuthentcated, setIsAuthenticated] = useState("false");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);
  const onSubmitForm = (data) => {
    console.log(data);
    dispatch(LoginUserAsync(data));
  };

  return (
    <div className="px-2">
      {LoggedInuser ? (
        <h1> {router.push("/homepage")} </h1>
      ) : (
        <div>
          <h1 className="text-center sm:text-3xl font-bold lg:text-2lg text-lime-600 mt-4 ">
            {" "}
            Login to chat APP
          </h1>

          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="mt-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number",
                },
              })}
              className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white rounded-md px-4 py-2 w-full mt-2"
            >
              Login
            </button>
            <Link href={"/register"}>
              <button
                type="submit"
                className="px-4 mt-2 text-center m-auto py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              >
                Create a new account
              </button>
            </Link>
          </form>
          <div className="flex  justify-center mt-2 dark:bg-gray-800">
            {/* <Link href="http://localhost:5000/auth/google"> */}
            <button
              onClick={() => {
                // dispatch(LoginUserByGoogleAsync());

                window.open(
                  "http://localhost:5000/auth/google/callback",
                  "_self"
                );
              }}
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
            {/* </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
