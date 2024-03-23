import { Box, Stack } from "@mui/material"
import ReactPlayer from "react-player"
import { SongDetails } from "../model/SongDetails"

interface videoProps {
    songDetails: SongDetails

}

export default function Video(props: videoProps): JSX.Element {
    const { songDetails } = props;

    return (
        <Box sx={{ my: 5, }}>
            <Stack alignItems='center'>
                <ReactPlayer controls volume={songDetails.volume} url={songDetails.songUrl} />
            </Stack>
        </Box>
    )
}