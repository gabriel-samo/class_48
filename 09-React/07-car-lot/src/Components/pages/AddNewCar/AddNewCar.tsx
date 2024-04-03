import {ChangeEvent, useState } from "react";
import "./AddNewCar.css";
import axios from "axios";
import { useAppDispatch } from "../../../store/hooks";
import { Car } from "../../../model/Car";
import { addCar } from "../../../store/carsSlice";
import { useNavigate } from "react-router-dom";

function AddNewCar(): JSX.Element {
    const CAR_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=';

    const [carNumber, setCarNumber] = useState('');
    const [carDetails, setCarDetails] = useState<Car | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleSearch(){
        axios.get(CAR_URL+carNumber).then(res=>{
            const result = res.data.result.records[0];
            setCarDetails(result);
        })
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setCarDetails(prevState=> {
            if(!prevState) return null;
            return {...prevState, [event.target.name]: event.target.value}
        })
    }

    function handleAddCar(){
        if(carDetails){
            dispatch(addCar(carDetails));
        }
        navigate("/");
    }

    return (
        <div className="AddNewCar">
            <div className="Box">
                <h2>Add Car</h2>
                <hr />
                <label htmlFor="carNumber">Car Number</label>
                <input id="carNumber" type="number" placeholder="Enter Car Number" onChange={(event)=>setCarNumber(event.target.value)}/>
                <input type="button" value="Search Car" onClick={handleSearch}/>
            </div>
            {carDetails && (
            <div className="CarDetails">
                <p><span className="detailLabel">Car Number: </span>{carDetails.mispar_rechev}</p>
                <p><span className="detailLabel">Manufacturer: </span>{carDetails.tozeret_nm}</p>
                <p><span className="detailLabel">Model: </span>{carDetails.kinuy_mishari}</p>
                <p><span className="detailLabel">Fuel Type: </span>{carDetails.sug_delek_nm}</p>
                <p><span className="detailLabel">Color: </span>{carDetails.tzeva_rechev}</p>
                <p><span className="detailLabel">Year: </span>{carDetails.shnat_yitzur}</p>
                <p className="inputArea">
                    <label htmlFor="km">KM: </label>
                    <input type="number" name="km" id="km" placeholder='Enter K"M' onChange={handleChange}/>
                </p>
                <p className="inputArea">
                    <label htmlFor="hand">Hand: </label>
                    <input type="number" name="hand" id="hand" placeholder='Enter Hand' onChange={handleChange}
                    />
                </p>
                <p className="inputArea">
                    <label htmlFor="desc">Description: </label>
                    <input type="text" name="desc" id="desc" placeholder='Enter Description' onChange={handleChange}
                    />
                </p>
                <p className="inputArea">
                    <label htmlFor="img1">Image 1: </label>
                    <input type="text" name="img1" id="img1" placeholder='Enter Image 1' onChange={handleChange}
                    />
                </p>
                <p className="inputArea">
                    <label htmlFor="img2">Image 2: </label>
                    <input type="text" name="img2" id="img2" placeholder='Enter Image 2' onChange={handleChange}                    
                    />
                </p>
                <p className="inputArea">
                    <label htmlFor="img3">Image 3: </label>
                    <input type="text" name="img3" id="img3" placeholder='Enter Image 3' onChange={handleChange}
                    />
                </p>
                <input type="button" value="Add Car" onClick={handleAddCar}/>
            </div>)}
        </div>
    );
}

export default AddNewCar;
