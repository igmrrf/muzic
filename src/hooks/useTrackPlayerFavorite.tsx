import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

const useTrackPlayerFavorite = () => {
    const activeTrack = useActiveTrack()
    const { favorites, toggleTrackFavorite } = useFavorites()

    const isFavorite =
        favorites.find((track) => track.url === activeTrack?.url)?.rating === 1

    const toggleFavorite = useCallback(async () => {
        const id = await TrackPlayer.getActiveTrackIndex()
        if (id == null) return
        // update track player internal state
        await TrackPlayer.updateMetadataForTrack(id, { rating: isFavorite ? 0 : 1 })

        // update app state
        if (activeTrack) {
            toggleTrackFavorite(activeTrack)
        }
    }, [isFavorite, toggleTrackFavorite, activeTrack])
    return { isFavorite, toggleFavorite }
}

export default useTrackPlayerFavorite
