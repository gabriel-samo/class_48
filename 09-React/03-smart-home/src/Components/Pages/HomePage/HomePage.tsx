import { Box, Typography } from "@mui/material";
import "./HomePage.css";
import { blueGrey, grey } from "@mui/material/colors";

function HomePage(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: blueGrey[900], height: '100%' }} >
            <Typography sx={{ color: grey[100] }} variant="h3">Home Page Below...</Typography>
        </ Box>
    );
}

export default HomePage;
