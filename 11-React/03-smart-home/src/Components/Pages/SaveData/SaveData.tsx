import { Box, Typography } from "@mui/material";
import "./SaveData.css";
import { blueGrey, grey } from "@mui/material/colors";

function SaveData(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: blueGrey[900], height: '100%' }} >
            <Typography sx={{ color: grey[100] }} variant="h3">Save Data Here...</Typography>
        </ Box>
    );
}

export default SaveData;
