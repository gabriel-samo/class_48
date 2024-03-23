import { Box, Typography } from "@mui/material";
import { EpIds } from "../../model/EpIds";
import "./ShowEpIds.css";
import { blueGrey, grey } from "@mui/material/colors";

interface epIdsProps {
    endDevices: EpIds[];
}

function ShowEpIds(props: epIdsProps): JSX.Element {
    const { endDevices } = props;

    return (
        <div className="ShowEpIds">
            {endDevices.map((item, index) =>
                <Box sx={{
                    border: '1px solid black',
                    width: '20rem',
                    display: 'block',
                    m: 1,
                    borderRadius: 3,
                    color: grey[100],
                    boxShadow: '1px 1px 5px 0.1px black'
                }}>
                    <Typography>Node ID: {item.id}</Typography>
                    <Typography>Node Name: {item.name}</Typography>
                </Box>
            )}
        </div>
    );
}

export default ShowEpIds;
