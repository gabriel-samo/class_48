import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { makeRequest } from "../utils/makeRequest";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, FloatingLabel, HR, Spinner } from "flowbite-react";
import { container } from "../utils/animtaionConf";

type LoginInputs = {
  email: string;
  password: string;
};

function Login() {
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (formInputs) => {
    try {
      setLoginLoading(true);
      setLoginError("");
      setLoginSuccess(false);
      const response = await makeRequest().post("/api/users/login", formInputs);
      if (response.status === 200) {
        const userToLogin = {
          ...response.data,
          token: response.headers["authorization"]
        };
        dispatch(loginUser(userToLogin));
        setLoginSuccess(true);
        setLoginLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error: any) {
      console.error(error);
      setLoginError("An error occurred while logging in");
      setLoginLoading(false);
      setLoginSuccess(false);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex justify-center h-screen"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-100 dark:bg-gray-800 mt-10 w-[18rem] sm:w-[25rem] h-fit shadow-2xl rounded-lg p-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        <FloatingLabel
          label="Email"
          variant="filled"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              invalidEmail: (value) => {
                return value.includes("@") && value.includes(".")
                  ? true
                  : false;
              }
            }
          })}
          color={
            errors.email?.type === "required" ||
            errors.email?.type === "invalidEmail" ||
            errors.email?.type === "emailTaken"
              ? "error"
              : "default"
          }
          helperText={
            errors.email?.type === "required"
              ? "Email is required"
              : errors.email?.type === "invalidEmail"
              ? "Invalid email"
              : errors.email?.type === "emailTaken"
              ? "Email is already taken"
              : ""
          }
        />
        <FloatingLabel
          label="Password"
          variant="filled"
          type="password"
          {...register("password", {
            required: true,
            minLength: 4
          })}
          color={
            errors.password?.type === "required" ||
            errors.password?.type === "minLength"
              ? "error"
              : "default"
          }
          helperText={
            errors.password?.type === "required"
              ? "Password is required"
              : errors.password?.type === "minLength"
              ? "Password must be at least 4 characters"
              : ""
          }
        />
        <Button
          className="dark:bg-gray-800"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loginLoading || loginSuccess}
        >
          {loginLoading || loginSuccess ? <Spinner size="sm" /> : "Sign In"}
        </Button>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        <div className="flex flex-col justify-center items-center text-sm">
          <p>Don't have an account? </p>
          <Link className="text-blue-500 hover:underline" to="/register">
            Register
          </Link>
        </div>
        {loginError && <Alert color="failure">{loginError}</Alert>}
        {loginSuccess && (
          <Alert color="success">
            Login successful, redirecting to home page...
          </Alert>
        )}
      </form>
    </motion.div>
  );
}

export default Login;
