import { unknownTrackImageUrl } from '@/constants/images'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { MovingText } from './MovingText'
import { useRouter } from 'expo-router'
import { defaultStyles } from '@/styles'

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

const floatingPlayerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 10,
    },
    trackTitle: {
        ...defaultStyles.text,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 10,
    },
    trackControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16,
    },
})
