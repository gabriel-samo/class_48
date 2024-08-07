import moment from "moment";

import { decodeToken } from "react-jwt";
import { useEffect, useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { Vacation } from "../models/vacation";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useAppSelector } from "../redux/hooks";
import { ShowMore } from "@re-dev/react-truncate";
import { makeRequest } from "../utils/makeRequest";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaHeart, FaTrash, FaPencilAlt } from "react-icons/fa";

type VacationCardProps = {
  vacation: Vacation;
  wasDeleted: boolean;
  setWasDeleted: (wasDeleted: boolean) => void;
};

function VacationCard({
  vacation,
  wasDeleted,
  setWasDeleted
}: VacationCardProps) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useAppSelector((state) => state.theme);
  const [followersIds, setFollowersIds] = useState<number[]>([]);
  const currentUser = useAppSelector((state) => state.currentUser);
  const decodedToken = decodeToken<{ isAdmin: boolean }>(currentUser.token);

  const getFollowersIds = async () => {
    try {
      const res = await makeRequest(currentUser.token).get(
        `/api/follows/${vacation.vacation_id}`
      );
      setFollowersIds(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowersIds();
  }, [vacation]);

  const handleFollow = async () => {
    try {
      const res = await makeRequest(currentUser.token).post(
        `/api/follows/add`,
        { vacationId: vacation.vacation_id }
      );
      if (res.status === 200) {
        getFollowersIds();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteVacation = async () => {
    try {
      const res = await makeRequest(currentUser.token).delete(
        `/api/vacations/delete/${vacation.vacation_id}`
      );
      if (res.status === 200) {
        setWasDeleted(true);
        setTimeout(() => {
          setWasDeleted(false);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="rounded shadow-2xl w-[18rem] sm:w-[20rem] lg:w-[25rem] max-w-[32rem] min-h-[30rem] bg-white dark:bg-gray-800">
      <div className="relative h-60 mb-4">
        <img
          src={vacation.image}
          alt={vacation.destination}
          className="w-full h-full rounded-md object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-50%"></div>
      </div>
      {!decodedToken?.isAdmin ? (
        <button
          className={`absolute top-4 left-4 p-2 min-w-28 h-10 text-gray-500 rounded-full flex justify-center items-center gap-2 transition-colors 
          ${
            followersIds.includes(+currentUser.id)
              ? "bg-red-200 hover:bg-red-100"
              : "bg-gray-200 hover:bg-gray-100"
          }`}
          onClick={handleFollow}
        >
          <FaHeart
            color={`${followersIds.includes(+currentUser.id) ? "red" : "gray"}`}
          />
          <div>
            {followersIds.includes(+currentUser.id) ? "Unlike" : "Like"}
          </div>
          <div>{followersIds.length}</div>
        </button>
      ) : (
        <div>
          <button
            className={`absolute top-4 left-4 p-2 min-w-24 h-10 text-gray-500 rounded-full flex justify-center items-center gap-2 transition-colors bg-gray-200 hover:bg-gray-100`}
            onClick={() => navigate(`/update-vacation/${vacation.vacation_id}`)}
          >
            <FaPencilAlt color="gray" />
            <div>Edit</div>
          </button>
          <button
            className={`absolute top-4 left-32 p-2 min-w-24 h-10 text-gray-500 rounded-full flex justify-center items-center gap-2 transition-colors bg-gray-200 hover:bg-gray-100`}
            onClick={() => setOpenModal(true)}
          >
            <FaTrash color="gray" />
            <div>Delete</div>
          </button>
        </div>
      )}
      <h2 className="text-white text-2xl font-bold absolute top-44 left-6">
        {vacation.destination}
      </h2>
      <div className="mt-[-2.3rem] relative p-4 flex items-center gap-2 bg-blue-600 text-white rounded-lg">
        <IoMdCalendar />
        <div>{moment(vacation.start_date).format("DD/MM/YYYY")}</div> -{" "}
        <div>{moment(vacation.end_date).format("DD/MM/YYYY")}</div>
      </div>
      <div className="flex flex-col gap-2 relative mt-[-0.5rem] p-4 dark:text-white dark:bg-gray-800 rounded-md">
        <div className="min-h-[9rem]">
          <ShowMore anchorClass="text-blue-500 hover:underline" lines={6}>
            {vacation.description}
          </ShowMore>
        </div>
        <p className="mt-4 text-white p-4 w-[95%] rounded bg-blue-500 flex justify-center items-center m-auto">
          {vacation.price}$
        </p>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className={theme}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-red-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this vacation?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  handleDeleteVacation();
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VacationCard;
