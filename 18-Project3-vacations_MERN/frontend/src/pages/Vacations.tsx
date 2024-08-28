import Skeleton from "../components/Skeleton";
import VacationCard from "../components/VacationCard";

import { motion } from "framer-motion";
import { decodeToken } from "react-jwt";
import { useEffect, useState } from "react";
import { Vacation } from "../models/vacation";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { makeRequest } from "../utils/makeRequest";
import { Button, Pagination } from "flowbite-react";
import { container, item } from "../utils/animtaionConf";

function Vacations() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [wasDeleted, setWasDeleted] = useState(false);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [currentFilter, setCurrentFilter] = useState<
    "followed" | "all" | "not-started" | "active"
  >("all");
  const currentUser = useAppSelector((state) => state.currentUser);
  const isAdmin = decodeToken<{ isAdmin: boolean }>(currentUser.token)?.isAdmin;

  useEffect(() => {
    if (isAdmin) {
      setCurrentFilter("all");
    }
    setIsLoading(true);
    makeRequest(currentUser.token)
      .get(
        `/api/vacations/${currentFilter}${
          currentPage > 1 ? `/?offset=${(currentPage - 1) * 9}` : ""
        }`
      )
      .then((res) => {
        // console.log(res);
        setTotalPages(Math.ceil(res.data.totalRows / 9));
        setVacations(res.data.vacations);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((error: any) => {
        console.error("Something went wrong:\n" + error);
      });
  }, [currentPage, currentFilter, wasDeleted]);

  return (
    <div>
      <div className="pt-14 flex flex-col gap-4 justify-center items-center">
        <h1 className="sm:text-8xl text-6xl font-bold">
          <i>Vacations</i>
        </h1>
        <div className="flex felx-row items-center gap-1">
          {isAdmin ? (
            <>
              <Button
                color="blue"
                outline
                onClick={() => {
                  navigate("/add-vacation");
                }}
              >
                Add Vacation
              </Button>
            </>
          ) : (
            <>
              <Button
                outline={currentFilter !== "all"}
                color="blue"
                onClick={async () => {
                  setCurrentFilter("all");
                  setCurrentPage(1);
                }}
              >
                All
              </Button>
              <Button
                outline={currentFilter !== "followed"}
                color="blue"
                onClick={async () => {
                  setCurrentFilter("followed");
                  setCurrentPage(1);
                }}
              >
                Followed
              </Button>
              <Button
                outline={currentFilter !== "not-started"}
                color="blue"
                onClick={async () => {
                  setCurrentFilter("not-started");
                  setCurrentPage(1);
                }}
              >
                Not Started
              </Button>
              <Button
                outline={currentFilter !== "active"}
                color="blue"
                onClick={async () => {
                  setCurrentFilter("active");
                  setCurrentPage(1);
                }}
              >
                Active
              </Button>
            </>
          )}
        </div>
        <Pagination
          className="text-center"
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={totalPages}
        />
      </div>

      {vacations && vacations.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="my-5 flex flex-row flex-wrap gap-10 justify-center"
        >
          {isLoading
            ? vacations.map((vacation) => (
                <motion.div variants={item} key={vacation.vacation_id}>
                  <Skeleton />
                </motion.div>
              ))
            : vacations.map((vacation) => (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  key={vacation.vacation_id}
                >
                  <VacationCard
                    vacation={vacation}
                    wasDeleted={wasDeleted}
                    setWasDeleted={setWasDeleted}
                  />
                </motion.div>
              ))}
        </motion.div>
      )}
      <Pagination
        className="text-center my-8"
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Vacations;
