import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../model/song";

type songsState = {
  songs: Song[];
};

const initialState: songsState = {
  songs: []
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong(state, action: PayloadAction<Song>) {
      const songIndex = state.songs.findIndex(
        (item) => item.id === action.payload.id
      );
      if (songIndex < 0) {
        state.songs.push(action.payload);
      }
      return state;
    },
    removeSong(state, action: PayloadAction<string>) {
      const songIndex = state.songs.findIndex(
        (item) => item.id === action.payload
      );
      if (songIndex >= 0) {
        state.songs.splice(songIndex, 1);
      }
    },
    setSongs(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      return state;
    }
  }
});

export const { addSong, removeSong, setSongs } = songsSlice.actions;
