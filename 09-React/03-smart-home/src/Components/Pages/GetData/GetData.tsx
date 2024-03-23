import { Box, Typography } from "@mui/material";
import "./GetData.css";
import { blueGrey, grey } from "@mui/material/colors";

function GetData(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: blueGrey[900], height: '100%' }} >
            <Typography sx={{ color: grey[100] }} variant="h3">Get Data Here...</Typography>
        </ Box>
    );
}

export default GetData;
