import logo from "../assets/vacation-log.png";

import { motion } from "framer-motion";
import { container, item } from "../utils/animtaionConf";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

function Home() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col gap-4 items-center h-screen">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex lg:flex-row flex-col items-center gap-4"
        >
          <motion.div
            variants={item}
            className="flex flex-1 flex-col justify-center items-center gap-10"
          >
            <h1 className="sm:text-9xl md:text-7xl text-5xl font-bold">
              <i>Vacations</i>
            </h1>
            <p className="sm:text-2xl overflow-auto text-center">
              Plan your next vacation with us and get a personalized list of
              destinations to explore.
            </p>
            {currentUser.token ? (
              <Button color="blue" onClick={() => navigate("/vacations")}>
                View Vacations
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
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
          <motion.img
            variants={item}
            src={logo}
            alt="logo"
            className="flex-1 h-[30rem] w-[30rem] object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
