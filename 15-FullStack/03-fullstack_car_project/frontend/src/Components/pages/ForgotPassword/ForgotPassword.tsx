import { SubmitHandler, useForm } from "react-hook-form";
import "./ForgotPassword.css";
import notify from "../../../Utils/Notify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const caption = (msg: string) => {
  return <p className="errorMsg text-red-600 text-end text-xs">{msg}</p>;
};

type formInputs = {
  userName: string;
  newPassword: string;
  confirmPassword: string;
};

function ForgotPassword(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      notify.error("The passwords are not matching");
      return;
    }
    axios
      .post(`http://localhost:8080/users/forgotPassword/${data.userName}`, data)
      .then(async (res) => {
        notify.success(`${res.data.msg}`);
        navigate("/login");
        reset();
      })
      .catch((err) => {
        if (err.response) {
          notify.error(err.response.data.msg);
        } else {
          notify.error(`${err.name}: ${err.message}`);
          //   console.log(err);
        }
      });
  };

  return (
    <div className="ForgotPassword Box">
      <h2 className="text-3xl font-bold mb-4">Change Password</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputField">
          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            className={`${errors.userName ? "alert" : ""} mt-4`}
            type="text"
            placeholder="Enter Username"
            {...register("userName", {
              required: true,
            })}
          />
        </div>
        {errors.userName?.type === "required" &&
          caption("this filed is required")}
        <div className="inputField">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            className={`${errors.newPassword ? "alert" : ""}`}
            type="password"
            placeholder="Enter New Password"
            {...register("newPassword", {
              required: true,
            })}
          />
        </div>
        {errors.newPassword?.type === "required" &&
          caption("this filed is required")}
        <div className="inputField">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            className={`${errors.confirmPassword ? "alert" : ""}`}
            type="password"
            placeholder="ReEnter New Password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
        </div>
        {errors.newPassword?.type === "required" &&
          caption("this filed is required")}
        <input
          type="submit"
          value="Change Password"
          className="bg-yellow-400 cursor-pointer w-[95%] text-black hover:bg-yellow-500 rounded-lg"
        />
      </form>
    </div>
  );
}

export default ForgotPassword;
