import "./ServerCard.css";
import Switch from "react-switch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../../Utils/makeReq";
import { handleTime } from "../../../Utils/handleTime";

export function ServerCard(): JSX.Element {
  const [server, setServer] = useState<any>();
  const [serverStatus, setServerStatus] = useState<boolean>();
  const params = useParams();

  useEffect(() => {
    makeRequest("/servers/all")
      .then((res) => {
        const currentServer = res.data.filter(
          (item: any) => item.id == params.id
        )[0];
        setServer(currentServer);
        setServerStatus(currentServer.status ? true : false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleStatus = async (status: boolean) => {
    const result = await makeRequest.post(`/servers/${params.id}/status`, {
      status
    });
    if (result.status === 200) setServerStatus(status);
  };

  return (
    <div className="ServerCard">
      {server && (
        <div className="Box">
          <h2>
            {" "}
            <span>{server.name}</span>
          </h2>
          <p>
            IP: <span>{server.ip}</span>
          </p>
          <p>
            Company Name: <span>{server.companyName}</span>
          </p>
          <div className="status">
            Status: <Switch checked={serverStatus!} onChange={handleStatus} />
          </div>
          <p>
            spanCreated At: <span>{handleTime(server.createdAt)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
