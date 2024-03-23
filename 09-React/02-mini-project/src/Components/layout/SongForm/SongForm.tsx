import { Box, Button, ButtonGroup, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import "./SongForm.css";
import { grey, red, yellow } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import ReactPlayer from "react-player";
import { theme } from "../../utils/theme";
import Video from "../../items/Video";
import { getValue } from "@testing-library/user-event/dist/utils";
import { SongDetails } from "../../model/SongDetails";

type formInputs = {
    songUrl: string
    name: String
    priority: String
    volume: number
    repeat: boolean
}

function SongForm(): JSX.Element {
    const [displayVideo, setDisplayVideo] = useState(false);
    const [songDetails, setSongDetails] = useState({});

    const onSubmit: SubmitHandler<formInputs> = (data) => {
        console.log(data);
        setSongDetails(data);
        setDisplayVideo(true);
        reset();
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<formInputs>();

    return (
        <>
            <Box sx={{
                pt: 1,
                width: '20rem',
                mt: '2rem',
                mx: 'auto',
                borderRadius: 3,
                backgroundColor: grey[900],
                boxShadow: '1px 1px 10px 0.1px black'
            }}>
                <Typography variant="h4" gutterBottom>Add Song Form</Typography>
                <Divider sx={{ backgroundColor: 'grey', mb: 2, mx: 2 }} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction='column' gap={2} width={'100%'} alignItems='center'>
                        <ThemeProvider theme={theme}>
                            <TextField
                                size="small"
                                variant="outlined"
                                color="primary"
                                type="text"
                                label="Song's URL"
                                {...register("songUrl", { required: true })}
                                error={errors.songUrl && true}
                                helperText={
                                    errors.songUrl?.type === "required" && 'This filed is required'
                                } />
                            <TextField
                                size="small"
                                variant="outlined"
                                color="primary"
                                type="text"
                                label="Name"
                                {...register("name", { required: true })}
                                error={errors.name && true}
                                helperText={
                                    errors.name?.type === "required" && 'This filed is required'
                                } />
                            <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                                <InputLabel id="prioritySelectLabel" sx={{ color: 'white' }}>Priority</InputLabel>
                                <Select
                                    labelId="prioritySelectLabel"
                                    label="Priority"
                                    {...register('priority', { required: true })}
                                    error={errors.priority && true}
                                    defaultValue=""
                                >
                                    <MenuItem value='' defaultChecked >None</MenuItem>
                                    <MenuItem value='high'>High</MenuItem>
                                    <MenuItem value='medium'>Medium</MenuItem>
                                    <MenuItem value='low'>Low</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.priority?.type === 'required' && <Typography variant="caption" sx={{ color: red[700] }}>This field is required</Typography>}
                            <TextField
                                size="small"
                                variant="outlined"
                                color="primary"
                                type="number"
                                label="Volume"
                                {...register("volume", { required: true, min: 0, max: 100 })}
                                error={errors.volume && true}
                                helperText={
                                    errors.volume?.type === "required" && 'This field is required' ||
                                    errors.volume?.type === "min" && 'Minimum volume is 0' ||
                                    errors.volume?.type === "max" && 'Maximum volume is 100'
                                }
                            />
                        </ThemeProvider >
                        <FormControlLabel control={<Checkbox />} label="Repeat" {...register('repeat')} />
                    </Stack>
                    <Divider sx={{ backgroundColor: 'grey', mt: 2, mx: 2 }} />
                    <ButtonGroup sx={{ m: 2 }}>
                        <Button type="submit" variant="contained" color="warning" sx={{ backgroundColor: yellow[800] }}>Submit</Button>
                        <Button type="reset" variant="contained" color="info" >Reset</Button>
                    </ButtonGroup>
                </form>
            </Box>
            {displayVideo && <Video songDetails={songDetails} />}
        </>
    );
}

export default SongForm;
