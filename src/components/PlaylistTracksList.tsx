import { unknownArtistImageUrl } from '@/constants/images'
import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { Playlist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { QueueControls } from './QueueControls'
import TrackLists from './TrackLists'

const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
    const search = useNavigationSearch({
        searchBarOptions: {
            hideWhenScrolling: true,
            placeholder: 'Find in playlist',
        },
    })
    const filteredArtistTracks = useMemo(() => {
        return playlist.tracks.filter(trackTitleFilter(search))
    }, [playlist.tracks, search])

    return (
        <View>
            <TrackLists
                tracks={filteredArtistTracks}
                id={generateTracksListId(playlist.name, search)}
                scrollEnabled={false}
                hideQueueControls={true}
                ListHeaderComponentStyle={artistTrackListStyle.artistHeaderContainer}
                ListHeaderComponent={
                    <View>
                        <View style={artistTrackListStyle.artworkImageContainer}>
                            <FastImage
                                source={{
                                    uri: playlist.artworkPreview,
                                    priority: FastImage.priority.high,
                                }}
                                style={artistTrackListStyle.artistImage}
                            />
                        </View>
                        <Text
                            numberOfLines={1}
                            style={artistTrackListStyle.artistNameText}
                        >
                            {playlist.name}
                        </Text>
                        {search.length === 0 && (
                            <QueueControls
                                tracks={filteredArtistTracks}
                                style={{ paddingTop: 24 }}
                            />
                        )}
                    </View>
                }
            />
        </View>
    )
}

const artistTrackListStyle = StyleSheet.create({
    artistHeaderContainer: {
        flex: 1,
        marginBottom: 32,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
    },
    artistImage: {
        width: '80%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    artistNameText: {
        ...defaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800',
    },
})

export default PlaylistTracksList
