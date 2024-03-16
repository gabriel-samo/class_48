import { NavLink } from "react-router-dom";
import "./MainMenu.css";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { blue, deepPurple, grey, red } from "@mui/material/colors";


function MainMenu(): JSX.Element {

    const drawerWidth = 256;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: blue[900] },
            }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <NavLink to="/" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: blue[800] }
                        }}>
                            <ListItemIcon>
                                <InboxIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Main Menu' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <Divider />

                <NavLink to="/assets" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: blue[800] }
                        }}>
                            <ListItemIcon>
                                <InboxIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Assets' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <NavLink to="/rates" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: blue[800] }
                        }}>
                            <ListItemIcon>
                                <InboxIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Rates' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <NavLink to="/exchanges" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: blue[800] }
                        }}>
                            <ListItemIcon>
                                <InboxIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Exchanges' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <Divider />

                <List>

                </List>
            </Box>
        </Drawer>
    );
}

export default MainMenu;
