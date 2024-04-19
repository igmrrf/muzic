import { colors, fontSize } from '@/constants/tokens'
import { formatSecondsToMinutes } from '@/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/styles'
import React from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

const PlayerProgressBar = ({ style }: ViewProps) => {
    const { duration, position } = useProgress(250)
    const isSliding = useSharedValue(false)
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    const trackElaspedTime = formatSecondsToMinutes(position)
    const trackRemainingTime = formatSecondsToMinutes(duration - position)

    if (!isSliding.value) {
        progress.value = duration > 0 ? position / duration : 0
    }
    return (
        <View style={style}>
            <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                thumbWidth={0}
                renderBubble={() => null}
                onSlidingStart={() => (isSliding.value = true)}
                onValueChange={async (value) =>
                    await TrackPlayer.seekTo(value * duration)
                }
                containerStyle={utilsStyles.slider}
                theme={{
                    maximumTrackTintColor: colors.maxiumumTrackTintColor,
                    minimumTrackTintColor: colors.minimumTrackTintColor,
                }}
                onSlidingComplete={async (value) => {
                    if (!isSliding.value) return
                    isSliding.value = false

                    await TrackPlayer.seekTo(value * duration)
                }}
            />
            <View style={playerProgressStyle.timeRow}>
                <Text style={playerProgressStyle.timeText}>{trackElaspedTime}</Text>
                <Text style={playerProgressStyle.timeText}> -{trackRemainingTime}</Text>
            </View>
        </View>
    )
}

const playerProgressStyle = StyleSheet.create({
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 20,
    },
    timeText: {
        ...defaultStyles.text,
        color: colors.text,
        opacity: 0.75,
        fontSize: fontSize.xs,
        letterSpacing: 0.7,
        fontWeight: '500',
    },
})

export default PlayerProgressBar
