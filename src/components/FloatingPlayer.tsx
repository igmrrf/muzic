import { unknownTrackImageUrl } from '@/constants/images'
import { floatingPlayerStyles } from '@/styles'
import { Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { MovingText } from './MovingText'
import { useRouter } from 'expo-router'

export const FloatingPlayer = ({ style }: ViewProps) => {
    const router = useRouter()
    const activeTrack = useActiveTrack()
    const lastActiveTrack = useLastActiveTrack()

    const displayedTrack = activeTrack ?? lastActiveTrack

    if (!displayedTrack) return null

    const handlePress = () => {
        router.navigate('/player')
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.9}
            style={[floatingPlayerStyles.container, style]}
        >
            <>
                <FastImage
                    source={{
                        uri: displayedTrack.artwork ?? unknownTrackImageUrl,
                    }}
                    style={floatingPlayerStyles.trackArtworkImage}
                />
                <View style={floatingPlayerStyles.trackTitleContainer}>
                    <MovingText
                        text={displayedTrack.title ?? ''}
                        style={floatingPlayerStyles.trackTitle}
                        animationThreshold={25}
                    />
                </View>
                <View style={floatingPlayerStyles.trackControlContainer}>
                    <PlayPauseButton iconSize={24} />
                    <SkipToNextButton iconSize={22} />
                </View>
            </>
        </TouchableOpacity>
    )
}
