import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'
import { Slider } from 'react-native-awesome-slider'
import { utilsStyles } from '@/styles'
import useTrackPlayerVolume from '@/hooks/useTrackPlayerVolume'
// import {us} from 'react-native-track-player'

const PlayerVolumeBar = ({ style }: ViewProps) => {
    const { volume, updateVolume } = useTrackPlayerVolume()
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)
    progress.value = volume ?? 0
    return (
        <View style={style}>
            <View style={playerVolumeBarStyle.container}>
                <Ionicons
                    name='volume-low'
                    color={colors.icon}
                    style={{ opacity: 0.8 }}
                    size={20}
                />
                <View style={playerVolumeBarStyle.slider}>
                    <Slider
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        thumbWidth={0}
                        renderBubble={() => null}
                        onValueChange={async (value) => updateVolume(value)}
                        containerStyle={utilsStyles.slider}
                        theme={{
                            maximumTrackTintColor: colors.maxiumumTrackTintColor,
                            minimumTrackTintColor: colors.minimumTrackTintColor,
                        }}
                    />
                </View>

                <Ionicons
                    name='volume-high'
                    color={colors.icon}
                    style={{ opacity: 0.8 }}
                    size={20}
                />
            </View>
        </View>
    )
}

const playerVolumeBarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
})

export default PlayerVolumeBar
