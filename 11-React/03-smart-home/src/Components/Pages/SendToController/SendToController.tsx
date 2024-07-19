import "./SendToController.css";
import { blueGrey, grey } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";

function SendToController(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: blueGrey[900], height: '100%' }} >
            <Typography sx={{ color: grey[100] }} variant="h3">Send Data To Controller Here...</Typography>
        </ Box>
    );
}

export default SendToController;
