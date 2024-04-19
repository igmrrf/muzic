import React from 'react'
import { FlatList, FlatListProps, View } from 'react-native'

import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import TrackEmpty from './TrackEmpty'

export type TrackListsProps = Partial<FlatListProps<Track>> & { tracks: Track[] }

const ItemDivider = () => (
    <View
        style={{ ...utilsStyles.itemsSeparator, marginVertical: 9, marginLeft: 60 }}
    ></View>
)

const TrackLists = ({ tracks, ...flatListProps }: TrackListsProps) => {
    const handleTrackSelect = async (track: Track) => {
        console.log(track)
        await TrackPlayer.load(track)
        await TrackPlayer.play()
    }
    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 128,
            }}
            ListEmptyComponent={TrackEmpty}
            ListFooterComponent={ItemDivider}
            ItemSeparatorComponent={ItemDivider}
            renderItem={({ item: track }) => (
                <TrackListItem onTrackSelect={handleTrackSelect} track={track} />
            )}
            {...flatListProps}
        />
    )
}

export default TrackLists
