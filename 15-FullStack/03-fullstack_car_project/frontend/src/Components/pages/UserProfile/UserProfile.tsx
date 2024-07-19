import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

type formInputs = {
  newUserName?: string;
  newPassword?: string;
  newEmail?: string;
};

const caption = (msg: string) => {
  return <p className="errorMsg text-red-600 text-end text-xs">{msg}</p>;
};

export default function UserProfile(): JSX.Element {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = (data) => {};

  // http://localhost:8080/users/updateUser/:userName

  return (
    <div className="UserProfile Box">
      <h2 className="text-3xl font-bold mb-4">Hello {params.userName}</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <hr />
        <div className="inputField">
          <label htmlFor="newUserName">New Username:</label>
          <input
            id="newUserName"
            className="mt-4"
            type="text"
            placeholder="Enter New Username"
            {...register("newUserName", {
              minLength: 4,
              pattern: /^[a-zA-z0-9_.-]*$/,
            })}
          />
        </div>
        {errors.newUserName?.type === "minLength" &&
          caption("the minimum length is 4")}
        {errors.newUserName?.type === "pattern" &&
          caption("special characters are not allowed")}
        <div className="inputField">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            className="mt-4"
            type="password"
            placeholder="Enter New Password"
            {...register("newPassword", {
              minLength: 4,
              pattern: /^[a-zA-z0-9_.-]*$/,
            })}
          />
        </div>
        {errors.newPassword?.type === "minLength" &&
          caption("the minimum length is 4")}
        {errors.newPassword?.type === "pattern" &&
          caption("special characters are not allowed")}
        <div className="inputField">
          <label htmlFor="newEmail">New Email:</label>
          <input
            id="newEmail"
            className="mt-4"
            type="email"
            placeholder="Enter New Email"
            {...register("newEmail", {
              minLength: 4,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
        </div>
        {errors.newEmail?.type === "minLength" &&
          caption("the minimum length is 4")}
        {errors.newEmail?.type === "pattern" &&
          caption("email is not valid or some of the characters are not valid")}
        <input
          type="submit"
          value="Login"
          className="bg-yellow-400 cursor-pointer w-[95%] text-black hover:bg-yellow-500 rounded-lg mb-4"
        />
      </form>
    </div>
  );
}
