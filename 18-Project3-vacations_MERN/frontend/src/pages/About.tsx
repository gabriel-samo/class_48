import { HR } from "flowbite-react";
import { motion } from "framer-motion";
import myPicture from "../assets/GabrielSamo.jpg";
import { container, item } from "../utils/animtaionConf";

function About() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="bg-gray-200 dark:bg-gray-700 felx felx-col md:flex-row items-center justify-center p-16 h-full"
    >
      <motion.h1 variants={item} className="text-4xl font-bold text-center">
        About Me
      </motion.h1>
      <HR className="bg-gray-800 dark:bg-gray-200 my-4 p-0" />
      <motion.div variants={item} className="flex flex-col md:flex-row gap-10">
        {/* right */}
        <div className="basis-1/2">
          <p className="text-center text-3xl">
            <i>
              "Those who work hard, work alone. Those who work smart, work as a
              team."
            </i>
          </p>
        </div>
        {/* left */}
        <div className="basis-1/2">
          <p>
            This project is a full stack project following MERN stack principles
            with MySQL as the database.
            <br />
            For the frontend, I used React with TypeScript, Flowbite React, and
            Tailwind CSS.
            <br />
            For the backend, I used Node.js with Express.js with TypeScript.
            <br />
            Also, I used Docker for the containerization of the project.
          </p>
          <br />
          <p>
            A little about me (as if someone cares...) my name is Gabriel
            Samoylov i am 30 years old an aspiring FullStack Web Developer. I am
            a creative problem solver and I enjoy working with complex coding
            challenges. I have a passion for developing high-quality software. I
            learn quickly and adapt to new technologies. I also have excellent
            communication and organizational skills, which help me to
            collaborate effectively with other team members.
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={item}
        className="flex flex-col md:flex-row gap-10 items-center justify-center"
      >
        {/* right */}
        <div className="basis-1/2 flex justify-end">
          <img
            src={myPicture}
            alt="My Picture, Gabriel Samoylov"
            className="rounded-full w-48 h-48"
          />
        </div>
        {/* left */}
        <div className="flex flex-col justify-center border-l-2 pl-2 basis-1/2">
          <div>Gabriel Samoylov</div>
          <div>Fullstack Web Developer (Aspiring one...)</div>
          <a href="https://github.com/gabriel-samo">Github Link</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default About;
