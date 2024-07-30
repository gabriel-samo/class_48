import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { makeRequest } from "../utils/makeRequest";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, FloatingLabel, HR, Spinner } from "flowbite-react";
import { container } from "../utils/animtaionConf";

type RegisterInputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

function Register() {
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterInputs>();

  const checkEmail = async (email: string) => {
    try {
      const response = await makeRequest().post("/api/users/emailTaken", {
        email
      });
      if (response.status === 200 && response.data) {
        setError("email", { type: "emailTaken" });
        return true;
      }
      return false;
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<RegisterInputs> = async (formInputs) => {
    setRegisterLoading(true);
    setRegisterError("");
    setRegisterSuccess(false);
    try {
      if (await checkEmail(formInputs.email)) return;
      const response = await makeRequest().post(
        "/api/users/register",
        formInputs
      );
      if (response.status === 200) {
        dispatch(
          loginUser({
            ...response.data,
            token: response.headers["authorization"]
          })
        );
        setRegisterLoading(false);
        setRegisterSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error: any) {
      console.error(error);
      setRegisterError("An error occurred while registering");
      setRegisterLoading(false);
      setRegisterSuccess(false);
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
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        <FloatingLabel
          label="First Name"
          variant="filled"
          type="text"
          {...register("firstName", {
            required: true
          })}
          color={errors.firstName?.type === "required" ? "error" : "default"}
          helperText={
            errors.firstName?.type === "required"
              ? "First Name is required"
              : ""
          }
        />
        <FloatingLabel
          label="Last Name"
          variant="filled"
          type="text"
          {...register("lastName", {
            required: true
          })}
          color={errors.lastName?.type === "required" ? "error" : "default"}
          helperText={
            errors.lastName?.type === "required" ? "Last Name is required" : ""
          }
        />
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
          disabled={registerLoading || registerSuccess}
        >
          {registerLoading || registerSuccess ? (
            <Spinner size="sm" />
          ) : (
            "Register"
          )}
        </Button>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        <div className="flex flex-col justify-center items-center text-sm">
          <p>Already have an account? </p>
          <Link className="text-blue-500 hover:underline" to="/login">
            Sign In
          </Link>
        </div>
        {registerSuccess && (
          <Alert color="success">
            Registration Successful, redirecting to home page...
          </Alert>
        )}
        {registerError && <Alert color="failure">{registerError}</Alert>}
      </form>
    </motion.div>
  );
}

export default Register;
