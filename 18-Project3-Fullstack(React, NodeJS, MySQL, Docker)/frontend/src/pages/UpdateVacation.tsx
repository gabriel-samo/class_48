import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SyntheticEvent, useEffect, useState } from "react";
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
import { Vacation } from "../models/vacation";

type AddVacationInputs = {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  image: string;
};

function UpdateVacation() {
  const [currentVacation, setCurrentVacation] = useState<Vacation | null>(null);
  const [updateVacationError, setUpdateVacationError] = useState<string | null>(
    null
  );
  const [updateVacationLoading, setUpdateVacationLoading] = useState(false);
  const [updateVacationSuccess, setUpdateVacationSuccess] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

  const currentUser = useAppSelector((state) => state.currentUser);
  const { id: vacationId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<AddVacationInputs>();

  useEffect(() => {
    makeRequest(currentUser.token)
      .get(`/api/vacations/one/${vacationId}`)
      .then((res) => {
        setCurrentVacation(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUploadImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    setImageChanged(false);
    const target = e.target as HTMLInputElement;
    try {
      if (target.files && target.files[0]) {
        const res = await uploadImage(target.files[0]);
        setValue("image", res?.data.imageUrl);
        setImageChanged(true);
      } else {
        console.log("No image uploaded");
      }
    } catch (error: any) {
      console.log(error);
      setUpdateVacationError("An error occurred while uploading image");
    }
  };

  const onSubmit: SubmitHandler<AddVacationInputs> = async (formInputs) => {
    setUpdateVacationError(null);
    setUpdateVacationLoading(true);
    setUpdateVacationSuccess(false);
    try {
      if (!formInputs.image.length) {
        formInputs.image = currentVacation?.image!;
      }
      const res = await makeRequest(currentUser.token).post(
        `/api/vacations/update/${vacationId}`,
        formInputs
      );
      if (res.status === 200) {
        setUpdateVacationSuccess(true);
        setTimeout(() => {
          navigate("/vacations");
        }, 2000);
      } else {
        setUpdateVacationError(res.data);
      }
    } catch (error: any) {
      console.error(error);
      setUpdateVacationError("An error occurred while updating vacation");
      setUpdateVacationLoading(false);
      setUpdateVacationSuccess(false);
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
          defaultValue={currentVacation?.destination}
          {...register("destination", {
            required: true
          })}
          color={errors.destination ? "error" : "default"}
          helperText={
            errors.destination?.type === "required"
              ? "Destination must be changed"
              : ""
          }
        />
        <div>
          <Label htmlFor="description">Description:</Label>
          <Textarea
            id="description"
            className="bg-zinc-100 dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
            rows={4}
            defaultValue={currentVacation?.description}
            {...register("description", {
              required: true
            })}
            color={errors.description ? "failure" : ""}
            helperText={
              errors.description?.type === "required"
                ? "Description must be changed"
                : ""
            }
          />
        </div>
        <FloatingLabel
          label="Start Date"
          variant="filled"
          type="date"
          defaultValue={currentVacation?.start_date.split("T")[0]}
          {...register("startDate", {
            required: true,
            validate: {
              isBeforeEndDate: (value) => {
                return value < getValues("endDate");
              }
            }
          })}
          color={errors.startDate ? "error" : "default"}
          helperText={
            errors.startDate?.type === "required"
              ? "Start Date must be changed"
              : errors.startDate?.type === "isBeforeEndDate"
              ? "Start Date must be before End Date"
              : ""
          }
        />
        <FloatingLabel
          label="End Date"
          variant="filled"
          type="date"
          defaultValue={currentVacation?.end_date.split("T")[0]}
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
              ? "End Date must be changed"
              : errors.endDate?.type === "isAfterStartDate"
              ? "End Date must be after Start Date"
              : ""
          }
        />
        <FloatingLabel
          label="Price"
          variant="filled"
          type="number"
          defaultValue={currentVacation?.price}
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
              ? "Price must be changed"
              : errors.price?.type === "priceIsPositive"
              ? "Price must be positive and less than 10,000"
              : ""
          }
        />
        <div>
          <label htmlFor="dropzone-file">Image:</label>
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <img
                className="z-0 w-full h-full rounded-lg"
                src={
                  !imageChanged ? currentVacation?.image : getValues("image")
                }
                alt={currentVacation?.destination}
              />

              <FileInput
                id="dropzone-file"
                className="hidden"
                defaultValue={currentVacation?.image}
                {...register("image", {
                  onChange: handleUploadImage,
                  value: getValues("image")
                })}
              />
            </Label>
          </div>
        </div>
        <Button
          className="dark:bg-gray-800"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={updateVacationLoading || updateVacationSuccess}
        >
          {updateVacationLoading || updateVacationSuccess ? (
            <Spinner size="sm" />
          ) : (
            "Update Vacation"
          )}
        </Button>
        <HR className="p-0 m-0 bg-blue-300 dark:bg-blue-700" />
        {updateVacationSuccess && (
          <Toast color="success">
            <Spinner size="sm" />
            Vacation Updated Successfully, redirecting to vacations page...
            <Toast.Toggle />
          </Toast>
        )}
        {updateVacationError && (
          <Alert color="failure">{updateVacationError}</Alert>
        )}
      </form>
    </motion.div>
  );
}

export default UpdateVacation;
