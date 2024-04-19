import React, { useCallback, useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

const useTrackPlayerVolume = () => {
    const [volume, setVolume] = useState<number | undefined>()
    const getVolume = useCallback(async () => {
        const currentVolume = await TrackPlayer.getVolume()
        setVolume(currentVolume)
    }, [])

    const updateVolume = useCallback(async (value: number) => {
        if (value < 0 || value > 1) return

        setVolume(value)
        await TrackPlayer.setVolume(value)
    }, [])

    useEffect(() => {
        getVolume()
    }, [getVolume])

    return { volume, updateVolume }
}

export default useTrackPlayerVolume
