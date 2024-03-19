// RegisterForm.js
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <input
        type="text"
        placeholder="Name"
        {...register("name", { required: true })}
        className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
      />
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          validate: (value) =>
            value === watchPassword || "Passwords don't match",
        })}
        className="border border-gray-300 rounded-md p-2 mb-2 block w-full"
      />
      {errors.confirmPassword && (
        <span className="text-red-500">{errors.confirmPassword.message}</span>
      )}
      <Button
        type="submit"
        // className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
