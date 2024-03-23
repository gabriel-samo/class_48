import { NavLink } from "react-router-dom";
import "./MainMenu.css";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { grey } from "@mui/material/colors";
import HomeIcon from '@mui/icons-material/Home';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';


function MainMenu(): JSX.Element {

    const drawerWidth = '17%';

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: grey[900] },
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
                            '&:hover': { backgroundColor: grey[800] }
                        }}>
                            <ListItemIcon>
                                <HomeIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <Divider />

                <NavLink to="/get-from-server" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: grey[800] }
                        }}>
                            <ListItemIcon>
                                <BrowserUpdatedIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Get Data' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <NavLink to="/show-devices" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: grey[800] }
                        }}>
                            <ListItemIcon>
                                <ListAltIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Show Devices' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <NavLink to="/save-data" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: grey[800] }
                        }}>
                            <ListItemIcon>
                                <CloudUploadIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Save Data' />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <NavLink to="/send-to-controller" style={{
                    textDecoration: 'none',
                }}>
                    <ListItem disablePadding sx={{
                        color: grey[200],
                    }}>
                        <ListItemButton sx={{
                            '&:hover': { backgroundColor: grey[800] }
                        }}>
                            <ListItemIcon>
                                <ForwardToInboxIcon sx={{
                                    color: grey[200]
                                }} />
                            </ListItemIcon>
                            <ListItemText primary='Send to Controller' />
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
