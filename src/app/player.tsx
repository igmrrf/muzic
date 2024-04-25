import { MovingText } from '@/components/MovingText'
import { unknownTrackImageUrl } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { defaultStyles, utilsStyles } from '@/styles'
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { FontAwesome } from '@expo/vector-icons'
import { PlayerControls } from '@/components/PlayerControls'
import PlayerProgressBar from '@/components/PlayerProgressBar'
import PlayerRepeatToggle from '@/components/PlayerRepeatToggle'
import PlayerVolumeBar from '@/components/PlayerVolumeBar'
import usePlayerBackground from '@/hooks/usePlayerBackground'
import { LinearGradient } from 'expo-linear-gradient'
import useTrackPlayerFavorite from '@/hooks/useTrackPlayerFavorite'

const PlayerScreen = () => {
    const activeTrack = useActiveTrack()
    const { top, bottom } = useSafeAreaInsets()

    const { imageColors } = usePlayerBackground(
        activeTrack?.artwork ?? unknownTrackImageUrl
    )

    const { isFavorite, toggleFavorite } = useTrackPlayerFavorite()
    if (!activeTrack)
        return (
            <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator color={colors.icon} />
            </View>
        )

    return (
        <LinearGradient
            colors={
                imageColors
                    ? [imageColors.background, imageColors.primary]
                    : [colors.background, colors.background]
            }
            style={{ flex: 1 }}
        >
            <View style={playerStyles.overlayContainer}>
                {Platform.OS === 'ios' ? <DismissPlayerSymbol /> : undefined}
                <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
                    <View style={playerStyles.artworkImageContainer}>
                        <FastImage
                            source={{
                                uri: activeTrack.artwork ?? unknownTrackImageUrl,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode='cover'
                            style={playerStyles.artworkImage}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 'auto' }}>
                            <View style={{ height: 60 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View style={playerStyles.trackTitleContainer}>
                                        <MovingText
                                            text={activeTrack.title ?? ''}
                                            animationThreshold={30}
                                            style={playerStyles.trackTitleText}
                                        />
                                    </View>
                                    <FontAwesome
                                        name={isFavorite ? 'heart' : 'heart-o'}
                                        size={20}
                                        color={isFavorite ? colors.primary : colors.icon}
                                        style={{ marginHorizontal: 14 }}
                                        onPress={toggleFavorite}
                                    />
                                </View>
                                {activeTrack.artist && (
                                    <Text
                                        numberOfLines={1}
                                        style={[
                                            playerStyles.trackArtistText,
                                            { marginTop: 6 },
                                        ]}
                                    >
                                        {activeTrack.artist}
                                    </Text>
                                )}
                            </View>
                            <PlayerProgressBar style={{ marginTop: 32 }} />
                            <PlayerControls style={{ marginTop: 40 }} />
                        </View>
                        <PlayerVolumeBar
                            style={{ marginTop: 'auto', marginBottom: 30 }}
                        />
                        <View style={utilsStyles.centeredRow}>
                            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const DismissPlayerSymbol = () => {
    const { top } = useSafeAreaInsets()

    return (
        <View
            style={{
                position: 'absolute',
                top: top + 8,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <View
                accessible={false}
                style={{
                    width: 50,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    opacity: 0.7,
                }}
            ></View>
        </View>
    )
}

const playerStyles = StyleSheet.create({
    overlayContainer: {
        ...defaultStyles.container,
        paddingHorizontal: screenPadding.horizontal,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    artworkImageContainer: {
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 11.0,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '45%',
    },
    artworkImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: 22,
        fontWeight: '700',
    },
    trackArtistText: {
        ...defaultStyles.text,
        opacity: 0.8,
        maxWidth: '90%',
    },
})

export default PlayerScreen
