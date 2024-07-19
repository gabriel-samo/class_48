import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../model/song';

type songsState = {
    songs: Song[]
}

const initialState: songsState = {
    songs: JSON.parse(localStorage.getItem('mySongs') || '[]') || [],
}

export const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        addSong(state, action: PayloadAction<Song>) {
            const songIndex = state.songs.findIndex((item) => item.id === action.payload.id);
            if (songIndex < 0) {
                state.songs.push(action.payload);
            }
            localStorage.setItem('mySongs', JSON.stringify(state.songs));
        },
        removeSong(state, action: PayloadAction<string>) {
            const songIndex = state.songs.findIndex((item) => item.id === action.payload);
            if (songIndex >= 0) {
                state.songs.splice(songIndex, 1);
            }
            localStorage.setItem('mySongs', JSON.stringify(state.songs));
        },
        searchSong() { },
    }
})

export const { addSong, removeSong } = songsSlice.actions;