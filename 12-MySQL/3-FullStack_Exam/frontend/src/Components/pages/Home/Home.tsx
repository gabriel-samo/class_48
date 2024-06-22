import "./Home.css";
import { makeRequest } from "../../../Utils/makeReq";
import { handleTime } from "../../../Utils/handleTime";
import { SyntheticEvent, useEffect, useState } from "react";

export type teamState = {
  id: number;
  name?: string;
};

export type meetingState = {
  id: number;
  team_id: number;
  started_at?: string;
  ended_at?: string;
  meeting_desc?: string;
  meeting_room?: string;
};

export function Home(): JSX.Element {
  const [teams, setTeams] = useState<teamState[]>();
  const [meetings, setMeetings] = useState<meetingState[]>();

  useEffect(() => {
    makeRequest
      .get("/teams")
      .then((res) => setTeams(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = async (event: SyntheticEvent) => {
    const teamId = (event.target as HTMLSelectElement).value;
    if (teamId) {
      const result = await makeRequest.get(`meetings/team/${teamId}`);
      setMeetings(result.data);
    } else {
      setMeetings([]);
    }
  };

  function getDiff(dateOne: any, dateTwo: any) {
    const date1 = new Date(dateOne);
    const date2 = new Date(dateTwo);
    let diff: any = +date2 - +date1;

    let mm = Math.floor(diff / 1000 / 60) % 60;
    let hh = Math.floor(diff / 1000 / 60 / 60);

    return `${hh}hr, ${mm}min`;
  }

  return (
    <div className="Home">
      <h1>Meetings</h1>
      <hr />
      <p>Select a team to display their meeting:</p>
      <select name="teams" id="teams" onChange={handleChange}>
        <option value=""></option>
        {teams &&
          teams.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
      <hr />
      {meetings &&
        meetings!.map((item) => (
          <div key={item.id} className="Box">
            <h3>Meeting ID: {item.id}</h3>
            <p>
              <span>Meeting Room:</span> {item.meeting_room}
            </p>
            <p>
              <span>Meeting Description:</span> {item.meeting_desc}
            </p>
            <p>
              <span>Started At:</span> {handleTime(item.started_at!)}
            </p>
            <p>
              <span>Ended At:</span> {handleTime(item.ended_at!)}
            </p>
            <p>
              <span>Meeting Duration:</span>{" "}
              {getDiff(item.started_at, item.ended_at)}
            </p>
          </div>
        ))}
    </div>
  );
}
