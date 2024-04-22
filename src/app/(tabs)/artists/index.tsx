import { ItemDivider } from '@/components/ItemDivider'
import TrackEmpty from '@/components/TrackEmpty'
import { unknownArtistImageUrl } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, trackListItemStyles } from '@/styles'
import React, { useMemo } from 'react'
import { FlatListProps, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

type ArtistsScreenProps = {} & Partial<FlatListProps<string>>
const ArtistsScreen = ({ ...flatListProps }: ArtistsScreenProps) => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in artists',
        },
    })
    const artists = useArtists()
    const filteredArtists = useMemo(
        () =>
            artists.filter((artist) =>
                artist.toLowerCase().includes(search.toLowerCase())
            ),
        [search]
    )
    const handleArtistSelect = () => {}
    return (
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={{
                    paddingHorizontal: screenPadding.horizontal,
                }}
            >
                <FlatList
                    data={filteredArtists}
                    contentContainerStyle={{
                        paddingTop: 10,
                        paddingBottom: 128,
                    }}
                    ListEmptyComponent={TrackEmpty}
                    ListFooterComponent={ItemDivider}
                    ItemSeparatorComponent={ItemDivider}
                    renderItem={({ item: artist }) => (
                        <ArtistsListItem
                            onArtistSelect={handleArtistSelect}
                            artist={artist}
                        />
                    )}
                    {...flatListProps}
                />
            </ScrollView>
        </View>
    )
}

type ArtistsListItemProps = {
    artist: string
    onArtistSelect: (artist: string) => void
}
const ArtistsListItem = ({ artist, onArtistSelect }: ArtistsListItemProps) => {
    return (
        <TouchableHighlight onPress={() => onArtistSelect(artist)}>
            <View
                style={{
                    ...trackListItemStyles.container,
                }}
            >
                <View>
                    <FastImage
                        source={{
                            uri: unknownArtistImageUrl,
                            priority: FastImage.priority.normal,
                        }}
                        style={{
                            ...trackListItemStyles.artworkImage,
                        }}
                    />
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
                                color: colors.text,
                            }}
                        >
                            {artist}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default ArtistsScreen
