import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import notify from "../../../Utils/Notify";
import { useAppDispatch } from "../../../store/hooks";
import { loginUser } from "../../../store/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingPrompt from "../../LoadingPrompt";

type formInputs = {
  userName: string;
  userPass: string;
};

const caption = (msg: string) => {
  return <p className="errorMsg text-red-600 text-end text-xs">{msg}</p>;
};

export default function Login() {
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleOpenLoadingPrompt() {
    setLoadingIsVisible(true);
  }

  function handleCloseLoadingPrompt() {
    setLoadingIsVisible(false);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    axios
      .post("http://localhost:8080/users/login", data)
      .then(async (res) => {
        const loggedUser = {
          userName: res.data.userDetails.userName,
          userEmail: res.data.userDetails.userEmail,
          userRole: res.data.userDetails.userRole,
          userToken: res.headers["authorization"].split(" ")[1],
        };
        dispatch(loginUser(loggedUser));
        notify.success(`${res.data.msg}\n`);
        handleOpenLoadingPrompt();
        setTimeout(() => {
          handleCloseLoadingPrompt();
          navigate("/");
        }, 2000);
        reset();
      })
      .catch((err) => {
        if (err.response) {
          notify.error(err.response.data.msg);
        } else {
          notify.error(`${err.name}: ${err.message}`);
          console.log(err);
        }
      });
  };

  return (
    <div className="Login">
      {loadingIsVisible && <LoadingPrompt onClose={handleCloseLoadingPrompt} />}
      <form onSubmit={handleSubmit(onSubmit)} className="Box">
        <h2 className="text-3xl font-bold mb-3">Login</h2>
        <hr />
        <div className="inputField">
          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            className={`${errors.userName ? "alert" : ""} mt-4`}
            type="text"
            placeholder="Enter Username"
            {...register("userName", {
              required: true,
              minLength: 4,
            })}
          />
        </div>
        {errors.userName?.type === "required" &&
          caption("this filed is required")}
        {errors.userName?.type === "minLength" &&
          caption("the minimum length is 4")}
        <div className="inputField">
          <label htmlFor="userPass">Password:</label>
          <input
            id="userPass"
            className={`${errors.userPass ? "alert" : ""}`}
            type="password"
            placeholder="Enter Password"
            {...register("userPass", {
              required: true,
              minLength: 6,
            })}
          />
        </div>
        {errors.userPass?.type === "required" &&
          caption("this filed is required")}
        {errors.userPass?.type === "minLength" &&
          caption("the minimum length is 6")}
        <input
          type="submit"
          value="Login"
          className="bg-yellow-400 cursor-pointer w-[95%] text-black hover:bg-yellow-500 rounded-lg mb-4"
        />
        <hr />
        <div className="mt-4">
          Forgot your password?{" "}
          <NavLink
            className="text-yellow-500 hover:underline"
            to="/forgotPassword"
          >
            Click here
          </NavLink>
        </div>
        <div>
          Not a user?{" "}
          <NavLink className="text-yellow-500 hover:underline" to="/register">
            Sing Up
          </NavLink>
        </div>
      </form>
    </div>
  );
}
