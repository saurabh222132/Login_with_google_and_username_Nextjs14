"use client";
import {
  createUserAsync,
  selectLoggedInUser,
  selectLoginMessage,
  selectLogingSuccess,
} from "@/redux/features/auth/AuthSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loginMessage = useSelector(selectLoginMessage);
  const loginSuccess = useSelector(selectLogingSuccess);
  const loggedinUser = useSelector(selectLoggedInUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password", "");

  const onSubmitForm = (data) => {
    console.log(data);
    delete data.confirmPassword;

    dispatch(createUserAsync(data));
  };

  return (
    <div className="px-2">
      {loggedinUser ? (
        router.push("/homepage")
      ) : (
        <div>
          <h1 className="text-center sm:text-3xl font-bold lg:text-2lg text-lime-600 mt-4 ">
            {" "}
            Register to chat APP
          </h1>

          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="mt-4 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid name format",
                },
              })}
              className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}

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

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              })}
              className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
            {loginMessage ? (
              <span
                className={`${
                  loginSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {loginMessage}
              </span>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white rounded-md px-4 py-2 w-full mt-2"
            >
              Signup
            </button>
            <Link href={"/login"}>
              <button className="px-4 mt-2 text-center m-auto py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                Already have an account
              </button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
