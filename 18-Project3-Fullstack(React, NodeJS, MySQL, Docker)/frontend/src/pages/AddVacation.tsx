import { SyntheticEvent, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { makeRequest } from "../utils/makeRequest";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  FileInput,
  FloatingLabel,
  HR,
  Label,
  Spinner,
  Toast
} from "flowbite-react";
import { container } from "../utils/animtaionConf";
import { uploadImage } from "../utils/uploadImage";

type AddVacationInputs = {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  image: string;
};

function AddVacation() {
  const [addVacationError, setAddVacationError] = useState("");
  const [addVacationLoading, setAddVacationLoading] = useState(false);
  const [addVacationSuccess, setAddVacationSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<AddVacationInputs>();

  const handleUploadImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    try {
      if (target.files && target.files[0]) {
        const res = await uploadImage(target.files[0]);
        console.log(res);
      } else {
        console.log("No image");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<AddVacationInputs> = async (formInputs) => {
    setAddVacationError("");
    setAddVacationLoading(true);
    setAddVacationSuccess(false);
    console.log(formInputs);
    try {
    } catch (error: any) {
      console.error(error);
      setAddVacationError("An error occurred while adding vacation");
      setAddVacationLoading(false);
      setAddVacationSuccess(false);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex justify-center min-h-screen mb-10"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-100 dark:bg-gray-800 mt-10 w-[18rem] sm:w-[25rem] h-fit shadow-2xl rounded-lg p-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Add Vacation</h1>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        <FloatingLabel
          label="Destination"
          variant="filled"
          type="text"
          {...register("destination", {
            required: true
          })}
          color={errors.destination?.type === "required" ? "error" : "default"}
          helperText={
            errors.destination?.type === "required"
              ? "Destination is required"
              : ""
          }
        />
        <FloatingLabel
          label="Description"
          variant="filled"
          type="text"
          {...register("description", {
            required: true
          })}
          color={errors.description?.type === "required" ? "error" : "default"}
          helperText={
            errors.description?.type === "required"
              ? "Description is required"
              : ""
          }
        />
        <FloatingLabel
          label="Start Date"
          variant="filled"
          type="date"
          {...register("startDate", {
            required: true
          })}
          color={errors.startDate?.type === "required" ? "error" : "default"}
          helperText={
            errors.startDate?.type === "required"
              ? "Start Date is required"
              : ""
          }
        />
        <FloatingLabel
          label="End Date"
          variant="filled"
          type="date"
          {...register("endDate", {
            required: true
          })}
          color={errors.endDate?.type === "required" ? "error" : "default"}
          helperText={
            errors.endDate?.type === "required" ? "End Date is required" : ""
          }
        />
        <FloatingLabel
          label="Price"
          variant="filled"
          type="number"
          {...register("price", {
            required: true
          })}
          color={errors.price?.type === "required" ? "error" : "default"}
          helperText={
            errors.price?.type === "required" ? "Price is required" : ""
          }
        />
        <label htmlFor="dropzone-file">Image:</label>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              {getValues("image") ? (
                <img
                  className="z-0 w-full h-full"
                  src={getValues("image")}
                  alt=""
                />
              ) : (
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              )}
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              {...register("image", {
                required: true
              })}
              color={errors.image?.type === "required" ? "failure" : "default"}
              helperText={
                errors.image?.type === "required" ? "Image is required" : ""
              }
            />
          </Label>
        </div>
        <Button
          className="dark:bg-gray-800"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={addVacationLoading || addVacationSuccess}
        >
          {addVacationLoading || addVacationSuccess ? (
            <Spinner size="sm" />
          ) : (
            "Add Vacation"
          )}
        </Button>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        {addVacationSuccess && (
          <Toast color="success">
            Vacation Added Successfully, redirecting to home page...
          </Toast>
        )}
        {addVacationError && <Alert color="failure">{addVacationError}</Alert>}
      </form>
    </motion.div>
  );
}

export default AddVacation;
