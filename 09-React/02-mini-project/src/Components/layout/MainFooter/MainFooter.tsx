import { Box, Typography } from "@mui/material";
import "./MainFooter.css";
import { grey, yellow } from "@mui/material/colors";

function MainFooter(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: grey[900], height: '100%' }} className="MainFooter">
            <Typography sx={{ color: yellow[100] }}>
                Ⓒ All right reserved to Gabriel Samoylov
            </Typography>
        </Box>
    );
}

export default MainFooter;
