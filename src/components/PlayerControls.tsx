import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'

type PlayerControlsProps = {
    style?: ViewStyle
}

type PlayerButtonProps = {
    style?: ViewStyle
    iconSize?: number
}

export const PlayPauseButton = ({ style, iconSize = 30 }: PlayerButtonProps) => {
    const { playing } = useIsPlaying()

    return (
        <View style={[{ height: iconSize }, style]}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
            >
                <FontAwesome6
                    name={playing ? 'pause' : 'play'}
                    size={iconSize}
                    color={colors.text}
                />
            </TouchableOpacity>
        </View>
    )
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
    return (
        <View style={[playControlsStyle.container, style]}>
            <View style={playControlsStyle.row}>
                <SkipToPreviousButton />
                <PlayPauseButton />
                <SkipToNextButton />
            </View>
        </View>
    )
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => await TrackPlayer.skipToNext()}
        >
            <FontAwesome6 name='forward' size={iconSize} color={colors.text} />
        </TouchableOpacity>
    )
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => await TrackPlayer.skipToPrevious()}
        >
            <FontAwesome6 name='backward' size={iconSize} color={colors.text} />
        </TouchableOpacity>
    )
}

const playControlsStyle = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})
