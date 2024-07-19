import "./AddMeeting.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../../Utils/makeReq";
import { meetingState, teamState } from "../Home/Home";
import { SubmitHandler, useForm, Controller, get } from "react-hook-form";
import { SyntheticEvent, useEffect, useState } from "react";

const caption = (msg: string) => {
  return <p className="alert">{msg}</p>;
};

export function AddMeeting(): JSX.Element {
  const [teams, setTeams] = useState<teamState[]>();
  const [timeIntervals, setTimeIntervals] =
    useState<{ start: Date; end: Date }[]>();
  const navigate = useNavigate();

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<meetingState>();

  useEffect(() => {
    makeRequest
      .get("/teams")
      .then((res) => setTeams(res.data))
      .catch((err) => console.log(err));
  }, []);

  const validateDate = (date: string) => {
    if (timeIntervals) {
      const test = timeIntervals?.filter((item) =>
        moment(date).isBetween(item.start, item.end)
      );
      return test.length > 0 ? false : true;
    }
  };

  const onSubmit: SubmitHandler<meetingState> = async (data) => {
    try {
      data.started_at = moment(data.started_at).format("yyyy-MM-DD HH:mm");
      data.ended_at = moment(data.ended_at).format("yyyy-MM-DD HH:mm");
      // console.log(data);
      const result = await makeRequest.post("/meetings/new", data);
      if (result.status === 200) navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleTimeChange = async (event: SyntheticEvent) => {
    const teamId = (event.target as HTMLSelectElement).value;
    if (teamId) {
      const result = await makeRequest.get(`meetings/team/${teamId}`);
      setTimeIntervals(
        result.data.map((item: meetingState) => {
          return {
            start: new Date(item.started_at!),
            end: new Date(item.ended_at!)
          };
        })
      );
    } else {
      setTimeIntervals([]);
    }
  };

  return (
    <div className="AddMeeting">
      <form onSubmit={handleSubmit(onSubmit)} className="Box">
        <h2>Add New Meeting</h2>
        <hr />
        {/*---------------------------------------------------------*/}
        <div className="inputField">
          <label htmlFor="meetingDesc">Meeting Description:</label>
          <input
            id="meetingDesc"
            type="text"
            placeholder="Enter Meeting Description"
            {...register("meeting_desc", {
              required: true
            })}
          />
        </div>
        {errors.meeting_desc?.type === "required" &&
          caption("this filed is required")}
        {/*---------------------------------------------------------*/}
        <div className="inputField">
          <label htmlFor="meetingRoom">Meeting Room:</label>
          <input
            id="meetingRoom"
            type="text"
            placeholder="Enter Meeting Room"
            {...register("meeting_room", {
              required: true
            })}
          />
        </div>
        {errors.meeting_room?.type === "required" &&
          caption("this filed is required")}
        {/*---------------------------------------------------------*/}
        <div className="inputField">
          <label htmlFor="startedAt">Starting Time:</label>
          <Controller
            control={control}
            name="started_at"
            render={({ field }) => (
              <DatePicker
                className="time"
                id="startedAt"
                showTimeSelect
                timeIntervals={5}
                onChange={(date) => field.onChange(date)}
                selected={field.value as unknown as Date}
                dateFormat="dd/MM/yyyy HH:mm"
              />
            )}
            rules={{
              required: true,
              validate: {
                validDate: (date) => date && validateDate(date)
              }
            }}
          />
        </div>
        {(errors.started_at?.type === "required" &&
          caption("this filed is required")) ||
          (errors.started_at?.type === "validDate" &&
            caption("there is a meeting at this time"))}
        {/*---------------------------------------------------------*/}
        <div className="inputField">
          <label htmlFor="endedAt">Starting Time:</label>
          <Controller
            control={control}
            name="ended_at"
            render={({ field }) => (
              <DatePicker
                className="time"
                id="endedAt"
                showTimeSelect
                timeIntervals={5}
                onChange={(date) => field.onChange(date)}
                selected={field.value as unknown as Date}
                dateFormat="dd/MM/yyyy HH:mm"
              />
            )}
            rules={{
              required: true,
              validate: {
                validDate: (date) => date && validateDate(date),
                checkEndDate: (date) => {
                  return moment(getValues("started_at")).isSameOrBefore(date);
                }
              }
            }}
          />
        </div>
        {(errors.ended_at?.type === "required" &&
          caption("this filed is required")) ||
          (errors.ended_at?.type === "validDate" &&
            caption("there is a meeting at this time")) ||
          (errors.ended_at?.type === "checkEndDate" &&
            caption("the end date cannot be before the start date"))}
        {/*---------------------------------------------------------*/}
        <div className="inputField">
          <label htmlFor="teams">Team:</label>
          <select
            id="teams"
            {...register("team_id", { required: true })}
            onChange={handleTimeChange}
          >
            <option value="">-- Select Team --</option>
            {teams &&
              teams.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {errors.team_id?.type === "required" &&
          caption("this filed is required")}
        {/*---------------------------------------------------------*/}
        <input type="submit" value="Add Meeting" />
      </form>
    </div>
  );
}
