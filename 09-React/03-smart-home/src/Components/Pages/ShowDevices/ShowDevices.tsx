import "./ShowDevices.css";
import { Box, Divider, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Home } from "../../model/Home";
import { Devices } from "../../model/Devices";
import { EpIds } from "../../model/EpIds";
import ShowEpIds from "../ShowEpIds/ShowEpIds";

function ShowDevices(): JSX.Element {

    let myHome = new Home(
        1,
        'GbHome',
        [
            new Devices(
                1, 'gp31', 'livingRoom', 10, [
                new EpIds(1, 'Main Light'),
                new EpIds(2, 'Spot Light'),
                new EpIds(3, 'Led Strip')
            ]),
            new Devices(
                2, 'gp21', 'Kitchen', 11, [
                new EpIds(1, "Main kitchen light"),
                new EpIds(2, "Butcher light")
            ])
        ]
    )
    return (
        <Box className="ShowDevices" sx={{ backgroundColor: blueGrey[900], height: '100%' }} >
            <Typography sx={{ color: grey[100] }} variant="h3">{myHome.name}</Typography>
            <Divider sx={{ bgcolor: grey[100] }} />
            {myHome.devices.map((item, index) =>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    mx: 'auto',
                    my: 2,
                    border: '1px solid black',
                    width: '70rem',
                    borderRadius: 3,
                    bgcolor: grey[900],
                    color: grey[100],
                    boxShadow: '1px 1px 5px 0.1px black',
                }}>
                    <Box>
                        <Typography className="text-row"><span>Device ID:</span> <span>{item.id}</span></Typography>
                        <Typography className="text-row"><span>Device Location:</span> <span>{item.location}</span></Typography>
                        <Typography className="text-row"><span>Device Name:</span> <span>{item.name}</span></Typography>
                    </Box>
                    <ShowEpIds key={index} endDevices={item.epIds} />
                </Box>
            )}
        </ Box>
    );
}

export default ShowDevices;
