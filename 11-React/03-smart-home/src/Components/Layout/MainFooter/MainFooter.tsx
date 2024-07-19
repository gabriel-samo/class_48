import { Box, Typography } from "@mui/material";
import "./MainFooter.css";
import { grey } from "@mui/material/colors";

function MainFooter(): JSX.Element {
    return (
        <Box sx={{ backgroundColor: grey[900], textAlign: 'center', height: '100%' }}>
            <Typography variant="caption" sx={{ color: grey[100] }}>All Rights Reserved (C)</Typography>
        </Box>
    );
}

export default MainFooter;
