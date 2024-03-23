import { Box, Stack, Typography } from "@mui/material";
import "./MainHeader.css";
import { grey } from "@mui/material/colors";

function MainHeader(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: grey[900], textAlign: 'center', height: '100%' }}>
            <Typography variant="h2" sx={{ color: grey[100] }}>Smart Home</Typography>
        </Box>
    );
}

export default MainHeader;
