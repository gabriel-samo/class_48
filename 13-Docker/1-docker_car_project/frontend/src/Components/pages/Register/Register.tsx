import "./Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import notify from "../../../Utils/Notify";
import { NavLink, useNavigate } from "react-router-dom";

type formInputs = {
  userName: string;
  userPass: string;
  confirmPass: string;
  userEmail: string;
  phoneNumber?: number;
  userRole?: string;
};

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInputs>();

  const caption = (msg: string) => {
    return <p className="errorMsg text-red-600 text-end text-xs">{msg}</p>;
  };

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    if (data.userPass !== data.confirmPass) {
      notify.error("The passwords do not match!");
      return;
    }
    // console.log(data);
    axios
      .post("http://localhost:8080/users/register", data)
      .then((res) => {
        notify.success(res.data.msg);
        navigate("/login");
        reset();
      })
      .catch((err) => {
        notify.error(err.response.data.msg);
      });
  };

  return (
    <div className="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="Box">
        <h2 className="text-3xl font-bold mb-3">Register</h2>
        <hr />
        <div className="inputField mt-3">
          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            className={`${errors.userName ? "alert" : ""}`}
            type="text"
            placeholder="Enter Username"
            {...register("userName", {
              required: true,
              minLength: 5,
              maxLength: 15,
            })}
          />
        </div>
        {(errors.userName?.type === "required" &&
          caption("this filed is required")) ||
          (errors.userName?.type === "minLength" &&
            caption("The minimum length is 5 characters")) ||
          (errors.userName?.type === "maxLength" &&
            caption("The maximum length is 15 characters"))}
        <div className="inputField">
          <label htmlFor="userPass">Password:</label>
          <input
            id="userPass"
            className={`${errors.userPass ? "alert" : ""}`}
            type="password"
            placeholder="Enter Password"
            {...register("userPass", {
              required: true,
              minLength: 5,
              maxLength: 15,
            })}
          />
        </div>
        {(errors.userPass?.type === "required" &&
          caption("this filed is required")) ||
          (errors.userPass?.type === "minLength" &&
            caption("The minimum length is 5 characters")) ||
          (errors.userPass?.type === "maxLength" &&
            caption("The maximum length is 15 characters"))}
        <div className="inputField">
          <label htmlFor="confirmPass">Confirm Password:</label>
          <input
            id="confirmPass"
            className={`${errors.confirmPass ? "alert" : ""}`}
            type="password"
            placeholder="Re-Enter Password"
            {...register("confirmPass", {
              required: true,
              minLength: 5,
              maxLength: 15,
            })}
          />
        </div>
        {(errors.confirmPass?.type === "required" &&
          caption("this filed is required")) ||
          (errors.confirmPass?.type === "minLength" &&
            caption("The minimum length is 5 characters")) ||
          (errors.confirmPass?.type === "maxLength" &&
            caption("The maximum length is 15 characters"))}
        <div className="inputField">
          <label htmlFor="userEmail">Email:</label>
          <input
            id="userEmail"
            className={`${errors.userEmail ? "alert" : ""}`}
            type="email"
            placeholder="Enter Email"
            {...register("userEmail", {
              required: true,
              minLength: 5,
              maxLength: 15,
            })}
          />
        </div>
        {(errors.userEmail?.type === "required" &&
          caption("this filed is required")) ||
          (errors.userEmail?.type === "minLength" &&
            caption("The minimum length is 5 characters")) ||
          (errors.userEmail?.type === "maxLength" &&
            caption("The maximum length is 15 characters"))}
        <div className="inputField">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            className={`${errors.userEmail ? "alert" : ""}`}
            type="number"
            placeholder="Enter Phone Number"
            {...register("phoneNumber", {
              required: true,
              minLength: 5,
              maxLength: 15,
            })}
          />
        </div>
        {(errors.phoneNumber?.type === "required" &&
          caption("this filed is required")) ||
          (errors.phoneNumber?.type === "minLength" &&
            caption("The minimum length is 5 characters")) ||
          (errors.phoneNumber?.type === "maxLength" &&
            caption("The maximum length is 15 characters"))}
        <div className="inputField">
          <label htmlFor="userRole">User Role: (not required)</label>
          <select
            id="userRole"
            className="ml-2 my-1 rounded text-black py-1.5 bg-blue-50"
            {...register("userRole", {})}
          >
            <option value=""></option>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <input
          type="submit"
          value="Register"
          className="bg-yellow-400 cursor-pointer text-black hover:bg-yellow-500 rounded-lg w-[95%] mb-4"
        />
        <hr />
        <div className="mt-4">
          Already have a user?{" "}
          <NavLink className="text-yellow-500 hover:underline" to="/login">
            Sing-in
          </NavLink>
        </div>
      </form>
    </div>
  );
}
