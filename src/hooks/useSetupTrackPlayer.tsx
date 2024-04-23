import { useEffect, useRef } from 'react'
import TrackPlayer, {
    Capability,
    RatingType,
    RepeatMode,
} from 'react-native-track-player'

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    })

    await TrackPlayer.updateOptions({
        ratingType: RatingType.Heart,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
        ],
    })

    await TrackPlayer.setVolume(0.8)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}
export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
    const isInitialized = useRef(false)

    useEffect(() => {
        setupPlayer()
            .then(() => {
                isInitialized.current = true
                onLoad?.()
            })
            .catch((error) => {
                isInitialized.current = false
                console.error({ error })
            })
    }, [onLoad])
}
