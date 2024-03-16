import { NavLink } from "react-router-dom";
import "./MainHeader.css";
import { Button, Typography } from "@mui/material";
import { blue, grey, purple } from "@mui/material/colors";

function MainHeader(): JSX.Element {
    return (
        <Typography component={'div'} className="MainHeader" sx={{
            backgroundColor: blue[900]
        }}>
            <Typography variant="h2" component={'h1'}>Mini React Project</Typography>
            <NavLink to="/login">
                <Button variant="contained" sx={{
                    color: grey[100],
                    backgroundColor: purple[800],
                    py: 1,
                    px: 2,
                    fontSize: 20,
                    '&:hover': { backgroundColor: purple[700] }
                }}>Login
                </Button>
            </NavLink>
        </Typography >
    );
}

export default MainHeader;
