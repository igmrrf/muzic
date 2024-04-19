import { unknownTrackImageUrl } from '@/constants/images'
import LoaderKit from 'react-native-loader-kit'
import { colors } from '@/constants/tokens'
import { trackListItemStyles } from '@/styles'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Entypo, Ionicons } from '@expo/vector-icons'

export type TrackListItemProps = {
    track: Track
    onTrackSelect: (track: Track) => void
}
const TrackListItem = ({
    track,
    onTrackSelect: handleTrackSelect,
}: TrackListItemProps) => {
    const isActiveTrack = useActiveTrack()?.url === track.url
    const { playing } = useIsPlaying()

    return (
        <TouchableHighlight onPress={() => handleTrackSelect(track)}>
            <View
                style={{
                    ...trackListItemStyles.container,
                }}
            >
                <View>
                    <FastImage
                        source={{
                            uri: track.artwork ?? unknownTrackImageUrl,
                            priority: FastImage.priority.normal,
                        }}
                        style={{
                            ...trackListItemStyles.artworkImage,
                            opacity: isActiveTrack ? 0.6 : 1,
                        }}
                    />
                    {isActiveTrack &&
                        (playing ? (
                            <LoaderKit
                                style={trackListItemStyles.playingIconIndicator}
                                name='LineScaleParty'
                                color={colors.icon}
                            />
                        ) : (
                            <Ionicons
                                style={trackListItemStyles.pauseIndicator}
                                name='play'
                                size={24}
                                color={colors.icon}
                            />
                        ))}
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ width: '100%' }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                ...trackListItemStyles.titleText,
                                color: isActiveTrack ? colors.primary : colors.text,
                            }}
                        >
                            {track.title}
                        </Text>
                        {track.artist && (
                            <Text
                                numberOfLines={1}
                                style={trackListItemStyles.artistStyle}
                            >
                                {track.artist}
                            </Text>
                        )}
                    </View>
                    <Entypo name='dots-three-horizontal' color={colors.icon} size={18} />
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default TrackListItem
