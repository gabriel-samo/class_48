import "./ServerList.css";
import ReactSwitch from "react-switch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../../Utils/makeReq";
import { handleTime } from "../../../Utils/handleTime";
import { RadioGroup, RadioButton } from "react-radio-buttons";

export function ServerList(): JSX.Element {
  const navigate = useNavigate();
  const [servers, setServers] = useState<any[]>([]);

  useEffect(() => {
    makeRequest("/servers/all")
      .then((res) => {
        setServers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = async (filter: string) => {
    try {
      const result = await makeRequest(`/servers/all/?${filter}=true`);
      setServers(result.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="ServerList">
      <div>Filter by: </div>
      <form>
        <RadioGroup horizontal onChange={handleChange} className="filters">
          <RadioButton value="time" name="time">
            By Crated At (lastet at the top)
          </RadioButton>
          <RadioButton value="status" name="status">
            By Status(ON is above)
          </RadioButton>
        </RadioGroup>
      </form>
      {servers.length > 0 &&
        servers.map((item) => (
          <div className="Box" key={item.id}>
            <div className="header">
              <h2>{item.name}</h2>
              <ReactSwitch
                disabled
                checked={item.status ? true : false}
                onChange={() => {}}
              />
            </div>
            <p className="time">
              <b>Created At:</b> <span>{handleTime(item.createdAt)}</span>
            </p>
            <input
              type="button"
              value="More"
              onClick={() => {
                navigate(`/server/${item.id}`);
              }}
            />
          </div>
        ))}
    </div>
  );
}
