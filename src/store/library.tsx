import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import libary from '@/assets/data/library.json'
import { unknownTrackImageUrl } from '@/constants/images'

interface LibraryState {
    tracks: TrackWithPlaylist[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
    tracks: libary,
    toggleTrackFavorite: (track) =>
        set((state) => ({
            tracks: state.tracks.map((currenTrack) => {
                if (currenTrack.url === track.url) {
                    return {
                        ...currenTrack,
                        rating: currenTrack.rating === 1 ? 0 : 1,
                    }
                }
                return currenTrack
            }),
        })),

    addToPlaylist: (track, playlistName) =>
        set((state) => ({
            tracks: state.tracks.map((currenTrack) => {
                if (currenTrack.url === track.url) {
                    return {
                        ...currenTrack,
                        playlist: [...(currenTrack.playlist ?? []), playlistName],
                    }
                }
                return currenTrack
            }),
        })),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useArtists = () =>
    useLibraryStore((state) =>
        state.tracks.reduce((acc, track) => {
            const existingArtist = acc.find((artist) => artist.name === track.artist)

            if (existingArtist) {
                existingArtist.tracks.push(track)
            } else {
                acc.push({
                    name: track.artist ?? 'unknown',
                    tracks: [track],
                })
            }
            return acc
        }, [] as Artist[])
    )

export const useArtistsv1 = () =>
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

export const usePlaylists = () =>
    useLibraryStore((state) => {
        const addToPlaylist = state.addToPlaylist
        const playlists = state.tracks.reduce((acc, track) => {
            track.playlist?.forEach((playlistName) => {
                const existingPlaylist = acc.find(
                    (playlist) => playlist.name === playlistName
                )

                if (existingPlaylist) {
                    existingPlaylist.tracks.push(track)
                } else {
                    acc.push({
                        name: playlistName ?? 'unknown',
                        tracks: [track],
                        artworkPreview: track.artwork ?? unknownTrackImageUrl,
                    })
                }
            })
            return acc
        }, [] as Playlist[])
        return {
            playlists,
            addToPlaylist,
        }
    })
