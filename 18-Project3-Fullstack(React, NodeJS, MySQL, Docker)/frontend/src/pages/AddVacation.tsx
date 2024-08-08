import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SyntheticEvent, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  FileInput,
  FloatingLabel,
  HR,
  Label,
  Spinner,
  Textarea,
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
  const [addVacationError, setAddVacationError] = useState<string | null>(null);
  const [addVacationLoading, setAddVacationLoading] = useState(false);
  const [addVacationSuccess, setAddVacationSuccess] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const currentUser = useAppSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<AddVacationInputs>();

  const handleUploadImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowImage(false);
    const target = e.target as HTMLInputElement;
    try {
      if (target.files && target.files[0]) {
        const res = await uploadImage(target.files[0]);
        setValue("image", res?.data.imageUrl);
        setShowImage(true);
      } else {
        console.log("No image uploaded");
      }
    } catch (error: any) {
      console.log(error);
      setShowImage(false);
    }
  };

  const onSubmit: SubmitHandler<AddVacationInputs> = async (formInputs) => {
    setAddVacationError(null);
    setAddVacationLoading(true);
    setAddVacationSuccess(false);
    // console.log(formInputs);
    try {
      const res = await makeRequest(currentUser.token).post(
        "/api/vacations/new",
        formInputs
      );
      if (res.status === 200) {
        setAddVacationSuccess(true);
        setTimeout(() => {
          navigate("/vacations");
        }, 2000);
      } else {
        setAddVacationError(res.data);
      }
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
          color={errors.destination ? "error" : "default"}
          helperText={
            errors.destination?.type === "required"
              ? "Destination is required"
              : ""
          }
        />
        <div>
          <Label htmlFor="description">Description:</Label>
          <Textarea
            id="description"
            className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
            rows={4}
            {...register("description", {
              required: true
            })}
            color={errors.description ? "error" : "default"}
            helperText={
              errors.description?.type === "required"
                ? "Description is required"
                : ""
            }
          />
        </div>
        <FloatingLabel
          label="Start Date"
          variant="filled"
          type="date"
          {...register("startDate", {
            required: true,
            validate: {
              minDate: (value) => {
                return value >= new Date().toISOString().split("T")[0];
              },
              isBeforeEndDate: (value) => {
                return value < getValues("endDate");
              }
            }
          })}
          color={errors.startDate ? "error" : "default"}
          helperText={
            errors.startDate?.type === "required"
              ? "Start Date is required"
              : errors.startDate?.type === "minDate"
              ? "Start Date must be after or equal to today"
              : errors.startDate?.type === "isBeforeEndDate"
              ? "Start Date must be before End Date"
              : ""
          }
        />
        <FloatingLabel
          label="End Date"
          variant="filled"
          type="date"
          {...register("endDate", {
            required: true,
            validate: {
              isAfterStartDate: (value) => {
                return value > getValues("startDate");
              }
            }
          })}
          color={errors.endDate ? "error" : "default"}
          helperText={
            errors.endDate?.type === "required"
              ? "End Date is required"
              : errors.endDate?.type === "isAfterStartDate"
              ? "End Date must be after Start Date"
              : ""
          }
        />
        <FloatingLabel
          label="Price"
          variant="filled"
          type="number"
          {...register("price", {
            required: true,
            validate: {
              priceIsPositive: (value) => {
                return value > 0 && value < 10000;
              }
            }
          })}
          color={errors.price ? "error" : "default"}
          helperText={
            errors.price?.type === "required"
              ? "Price is required"
              : errors.price?.type === "priceIsPositive"
              ? "Price must be positive and less than 10,000"
              : ""
          }
        />
        <div>
          <Label htmlFor="dropzone-file">Image:</Label>
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {showImage ? (
                <img
                  className="z-0 w-full h-full rounded-lg"
                  src={getValues("image")}
                  alt=""
                />
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>
              )}
              <FileInput
                id="dropzone-file"
                className="hidden"
                {...register("image", {
                  onChange: handleUploadImage,
                  validate: {
                    isNotEmpty: (value) => {
                      return value.length > 0;
                    }
                  },
                  value: getValues("image")
                })}
                color={
                  errors.image?.type === "isNotEmpty" ? "failure" : "default"
                }
                helperText={
                  errors.image?.type === "isNotEmpty" ? "Image is required" : ""
                }
              />
            </Label>
          </div>
        </div>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
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
        <Button outline color="gray" onClick={() => navigate("/vacations")}>
          Cancel
        </Button>
        {addVacationSuccess && (
          <Toast color="success">
            <Spinner size="sm" />
            Vacation Added Successfully, redirecting to vacations page...
            <Toast.Toggle />
          </Toast>
        )}
        {addVacationError && <Alert color="failure">{addVacationError}</Alert>}
      </form>
    </motion.div>
  );
}

export default AddVacation;
