import { useParams } from "react-router-dom";
import "./SearchPage.css";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "../SingleItem/SingleItem";
import { Car } from "../../Model/Car";

function SearchPage(): JSX.Element {
    // URLs for all vehicles types:
    const CAR_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q='
    const BIKE_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=';
    const TRUCK_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&q=';
    const OFFROAD_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=851ecab1-0622-4dbe-a6c7-f950cf82abf9&q=';
    let searchURL = '';

    const DATA_LIMIT = 10;

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<Car[]>([]);

    function handleChange(event: SyntheticEvent) {
        let searchTerm = (event.target as HTMLInputElement).value;
        setSearchValue(searchTerm);
    }

    const params = useParams();
    const vType = params.vehicleType?.toLowerCase();

    function getData() {
        switch (vType) {
            case "car":
                searchURL = CAR_URL + searchValue;
                break;
            case "bike":
                searchURL = BIKE_URL + searchValue;
                break;
            case "truck":
                searchURL = TRUCK_URL + searchValue;
                break;
            case "offroad":
                searchURL = OFFROAD_URL + searchValue;
                break;
            default:
                searchURL = CAR_URL + searchValue;
                break;
        }
    }

    const carData: Car[] = [];
    function handleClick(event: SyntheticEvent) {
        getData();
        axios.get(searchURL)
            .then((result) => {
                const data = result.data.result.records;
                for (let index = 0; index < DATA_LIMIT; index++) {
                    if (data.length > 0) {
                        carData.push(new Car(data[index].baalut, data[index].tozeret_nm, data[index].kinuy_mishari, data[index].sug_delek_nm, data[index].mispar_rechev))
                    }
                }
                setSearchResult(carData);
            })
    }

    return (
        <div className="SearchPage">
            <h2>Search Page for {vType} !</h2>
            <input type="text" placeholder="Search Term" onChange={handleChange} value={searchValue} />
            <input type="button" value="Search" onClick={handleClick} />
            <br /><br /><br />
            <div>
                {searchResult.length > 0 ? searchResult.map((item, index) => <SingleItem key={index} item={item} />) : 'No Results...'}
            </div>
        </div>
    );
}

export default SearchPage;
