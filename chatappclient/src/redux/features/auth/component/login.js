// LoginForm.js
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
