import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                        '& input': { color: 'white' },
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: blue[600] }
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '.MuiSvgIcon-root': { color: 'white' },
                    '.MuiSelect-select': { color: 'white' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.25)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: blue[600] },
                }
            }
        }
    }
})