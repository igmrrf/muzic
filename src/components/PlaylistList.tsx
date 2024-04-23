import { nameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import React, { useMemo } from 'react'
import { FlatListProps, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ItemDivider } from './ItemDivider'
import EmptyPlaylist from './EmptyPlaylist'
import PlaylistListItem from './PlaylistListItem'

type PlaylistListProps = {
    playlists: Playlist[]
    onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const PlaylistList = ({
    playlists,
    onPlaylistPress,
    ...flatListProps
}: PlaylistListProps) => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in playlist',
        },
    })

    const filteredPlaylist = useMemo(
        () => playlists.filter(nameFilter<Playlist>(search)),
        [playlists, search]
    )
    return (
        <FlatList
            data={filteredPlaylist}
            renderItem={({ item: playlist }) => {
                return (
                    <PlaylistListItem
                        playlist={playlist}
                        onPress={() => onPlaylistPress(playlist)}
                    />
                )
            }}
            contentContainerStyle={{ padding: 10, paddingBottom: 128 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            ListEmptyComponent={EmptyPlaylist}
            {...flatListProps}
        />
    )
}

export default PlaylistList
