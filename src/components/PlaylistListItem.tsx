import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableHighlightProps,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'

type PlaylistListItemProps = {
    playlist: Playlist
} & TouchableHighlightProps

const PlaylistListItem = ({ playlist, ...props }: PlaylistListItemProps) => {
    return (
        <TouchableHighlight activeOpacity={0.8} {...props}>
            <View style={playlistListItemStyles.playlistListItemContainer}>
                <View>
                    <FastImage
                        source={{
                            uri: playlist.artworkPreview,
                            priority: FastImage.priority.normal,
                        }}
                        style={playlistListItemStyles.playlistListItemArtworkImage}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Text
                        style={playlistListItemStyles.playlistListItemNameText}
                        numberOfLines={1}
                    >
                        {playlist.name}
                    </Text>
                    <AntDesign
                        name='right'
                        size={16}
                        color={colors.icon}
                        style={{ opacity: 0.5 }}
                    />
                </View>
            </View>
        </TouchableHighlight>
    )
}

const playlistListItemStyles = StyleSheet.create({
    playlistListItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 90,
    },
    playlistListItemArtworkImage: {
        borderRadius: 8,
        width: 70,
        height: 70,
    },
    playlistListItemNameText: {
        ...defaultStyles.text,
        fontSize: 17,
        fontWeight: '600',
        maxWidth: '80%',
    },
})

export default PlaylistListItem
