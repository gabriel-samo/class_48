import vacationPhoto from "../assets/vacation-photo.jpg";

import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { motion } from "framer-motion";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { container, item } from "../utils/animtaionConf";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function Home() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.token && isExpired(currentUser.token.split(" ")[1])) {
      dispatch(logoutUser());
    }
  }, []);

  return (
    <div>
      <div className="pt-10 flex flex-col gap-4 items-center h-screen w-full text-white realtive">
        <motion.img
          variants={container}
          initial="hidden"
          animate="visible"
          src={vacationPhoto}
          alt="vacation photo"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-75%"></div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="z-10 flex lg:flex-row flex-col items-center gap-4"
        >
          <motion.div
            variants={item}
            className="flex flex-1 flex-col justify-center items-start gap-10 p-10"
          >
            <h1 className="sm:text-9xl text-6xl font-bold">
              <i>Vacations</i>
            </h1>
            <p className="sm:text-2xl overflow-auto text-start sm:w-1/2 w-full">
              Plan your next vacation with us and get a personalized list of
              destinations to explore. Welcome to vacation project, your gateway
              to unforgettable adventures around the world. Our expertly curated
              vacation packages cater to all types of travelers, whether you
              seek relaxation, cultural immersion, or thrilling adventures.
            </p>
            {currentUser.token ? (
              <Button color="blue" onClick={() => navigate("/vacations")}>
                View Vacations
              </Button>
            ) : (
              <div className="flex flex-col gap-2 bg-gray-700 p-6 rounded-lg shadow-lg text-white">
                <p className="text-2xl">
                  To get started, please login or register.
                </p>
                <div className="flex flex-row gap-2 justify-center">
                  <Button color="blue" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                  <Button
                    outline
                    color="blue"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
