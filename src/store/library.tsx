import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import libary from '@/assets/data/library.json'

interface LibraryState {
    tracks: TrackWithPlaylist[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
    tracks: libary,
    toggleTrackFavorite: () => {},
    addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () =>
    useLibraryStore((state) => {
        const favorites = state.tracks.filter((track) => track.rating)
        const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)
        return {
            favorites,
            toggleTrackFavorite,
        }
    })
