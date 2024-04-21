import React, { useRef } from 'react'
import { FlatList, FlatListProps, View } from 'react-native'

import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import TrackEmpty from './TrackEmpty'
import { useQueue } from '@/store/queue'

export type TrackListsProps = Partial<FlatListProps<Track>> & {
    id: string
    tracks: Track[]
}

const ItemDivider = () => (
    <View
        style={{ ...utilsStyles.itemsSeparator, marginVertical: 9, marginLeft: 60 }}
    ></View>
)

const TrackLists = ({ id, tracks, ...flatListProps }: TrackListsProps) => {
    const queueOffset = useRef(0)
    const { activeQueueId, setActiveQueueId } = useQueue()
    const handleTrackSelect = async (selectedTrack: Track) => {
        const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)
        if (trackIndex === -1) return

        const isChangingQueue = id !== activeQueueId
        if (isChangingQueue) {
            const beforeTracks = tracks.slice(0, trackIndex)
            const afterTracks = tracks.slice(trackIndex + 1)
            await TrackPlayer.reset()
            await TrackPlayer.add(selectedTrack)
            await TrackPlayer.add(afterTracks)
            await TrackPlayer.add(beforeTracks)

            await TrackPlayer.load(selectedTrack) // not there
            await TrackPlayer.play()

            queueOffset.current = trackIndex
            setActiveQueueId(id)
        } else {
            const nextTrackIndex =
                trackIndex - queueOffset.current < 0
                    ? tracks.length + trackIndex - queueOffset.current
                    : trackIndex - queueOffset.current

            await TrackPlayer.skip(nextTrackIndex)
            await TrackPlayer.load(selectedTrack) // not there
            await TrackPlayer.play() // no await
        }
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
