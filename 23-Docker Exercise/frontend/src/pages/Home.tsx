import axios from "axios";
import { useState } from "react";

function Home() {
  const [carNumber, setCarNumber] = useState("");
  const [car, setCar] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/cars?carNumber=${carNumber}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setCar(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <h1 className="text-4xl font-bold">Home</h1>
      <form
        className="my-10 border border-gray-500 rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold my-5 text-center">Car Search</h2>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="search">Car Number:</label>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-500 rounded-lg p-1"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 my-5"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-5 flex flex-wrap gap-2 justify-center items-center">
        {car &&
          car.map((car: any) => (
            <div className="border border-gray-500 rounded-lg p-5">
              <h2 className="text-2xl font-bold my-2">Car Details:</h2>
              <p>{car.tozeret_nm}</p>
              <p>{car.kinuy_mishari}</p>
              <p>{car.shnat_yitzur}</p>
              <p>{car.tzeva_rechev}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
