import CarData from "../Models/CarData";
import * as fs from "fs";
import * as path from "path";

const addCarToStorage = (carInfo: CarData) => {
  const carsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../Data/allCars.json"), {
      encoding: "utf-8",
    })
  );
  // if(carsData)
  const updatedData = [...carsData, carInfo];
  fs.writeFileSync(
    path.join(__dirname, "../Data/allCars.json"),
    JSON.stringify(updatedData)
  );
};

export { addCarToStorage };
