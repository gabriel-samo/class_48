import axios from "axios";

const getCar = async (id: string) => {
  const CAR_URL = process.env.CAR_URL;
  let vehicleData = (await axios.get(CAR_URL + id)).data.result.records[0];
  return vehicleData;
};

const getBike = async (id: string) => {
  const BIKE_URL = process.env.BIKE_URL;
  let vehicleData = (await axios.get(BIKE_URL + id)).data.result.records[0];
  return vehicleData;
};

const getTruck = async (id: string) => {
  const TRUCK_URL = process.env.TRUCK_URL;
  let vehicleData = (await axios.get(TRUCK_URL + id)).data.result.records[0];
  return vehicleData;
};

const getHandicap = async (id: string) => {
  const HANDICAP_URL = process.env.HANDICAP_URL;
  let vehicleData = (await axios.get(HANDICAP_URL + id)).data.result.records[0];
  return vehicleData;
};

const getOffRoad = async (id: string) => {
  const OFFROAD_URL = process.env.OFFROAD_URL;
  let vehicleData = (await axios.get(OFFROAD_URL + id)).data.result.records[0];
  return vehicleData;
};

const getRecall = async (id: string) => {
  const RECALL_URL = process.env.RECALL_URL;
  let vehicleData = (await axios.get(RECALL_URL + id)).data.result.records[0];
  return vehicleData;
};

export { getCar, getBike, getTruck, getHandicap, getOffRoad, getRecall };
