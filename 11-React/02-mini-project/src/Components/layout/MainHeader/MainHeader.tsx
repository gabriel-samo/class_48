import { NavLink } from "react-router-dom";
import "./MainHeader.css";
import { Button, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

function MainHeader(): JSX.Element {
    return (
        <Typography component={'div'} className="MainHeader" sx={{
            backgroundColor: grey[900]
        }}>
            <Typography variant="h2" component={'h1'} sx={{ color: yellow[200] }}>Mini React Project</Typography>
            <NavLink to="/login">
                <Button variant="contained" sx={{
                    color: grey[100],
                    backgroundColor: yellow[700],
                    py: 1,
                    px: 2,
                    fontSize: 20,
                    '&:hover': { backgroundColor: yellow[900] }
                }}>Login
                </Button>
            </NavLink>
        </Typography >
    );
}

export default MainHeader;
