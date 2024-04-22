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

export const useArtists = () =>
    useLibraryStore((state) => {
        const artists: string[] = []
        const tracks = state.tracks
        for (const track of tracks) {
            if (track.artist && !artists.includes(track?.artist)) {
                artists.push(track.artist)
            }
        }
        return artists
    })

export const useFavorites = () =>
    useLibraryStore((state) => {
        const favorites = state.tracks.filter((track) => track.rating)
        const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)
        return {
            favorites,
            toggleTrackFavorite,
        }
    })

export const usePlaylist = () =>
    useLibraryStore((state) => {
        const addToPlaylist = state.addToPlaylist
        return {
            addToPlaylist,
        }
    })
