import { colors } from '@/constants/tokens'
import { defaultStyles, utilsStyles } from '@/styles'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TrackPlayer, { Track, useIsPlaying } from 'react-native-track-player'
import { FontAwesome6 } from '@expo/vector-icons'

type QueueControlsProps = {
    tracks: Track[]
} & ViewProps

export const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
    const handlePlay = async () => {
        await TrackPlayer.setQueue(tracks)
        await TrackPlayer.load(tracks[0])
        await TrackPlayer.play()
    }

    const handleShuffle = async () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)
        await TrackPlayer.setQueue(shuffledTracks)
        await TrackPlayer.load(shuffledTracks[0])
        await TrackPlayer.play()
    }

    return (
        <View style={[queueControlsStyles.container, style]}>
            <View style={utilsStyles.flex}>
                <TouchableOpacity
                    onPress={handlePlay}
                    activeOpacity={0.8}
                    style={queueControlsStyles.button}
                >
                    <Text style={queueControlsStyles.buttonText}>Play</Text>
                    <FontAwesome6 name={'play'} size={22} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={utilsStyles.flex}>
                <TouchableOpacity
                    onPress={handleShuffle}
                    activeOpacity={0.8}
                    style={queueControlsStyles.button}
                >
                    <Text style={queueControlsStyles.buttonText}>Shuffle</Text>
                    <FontAwesome6 name={'shuffle'} size={22} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const queueControlsStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        padding: 12,
        backgroundColor: 'rgba(47,47,47,0.5)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 8,
    },
    buttonText: {
        ...defaultStyles.text,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    },
})
