import PlaylistList from '@/components/PlaylistList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { usePlaylists, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'
import { useHeaderHeight } from '@react-navigation/elements'

const AddToPlaylistModal = () => {
    const router = useRouter()
    const headerHeight = useHeaderHeight()
    const { activeQueueId } = useQueue()

    const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()

    const tracks = useTracks()

    const { playlists, addToPlaylist } = usePlaylists()

    const track = tracks.find((currentTrack) => currentTrack.url === trackUrl)

    if (!track) {
        return null
    }

    const availablePlaylists = playlists.filter(
        (playlist) =>
            !playlist.tracks.find((playlistTrack) => playlistTrack.url === track.url)
    )
    const handlePlaylistPress = async (playlist: Playlist) => {
        addToPlaylist(track, playlist.name)
        router.dismiss()
        // if the current queue is the current list we're playing from, add track to end of queue
        if (activeQueueId?.startsWith(playlist.name)) {
            await TrackPlayer.add(track)
        }
    }
    return (
        <SafeAreaView
            style={[addToPlaylistModalStyle.modalContainer, { paddingTop: headerHeight }]}
        >
            <PlaylistList
                playlists={availablePlaylists}
                onPlaylistPress={handlePlaylistPress}
            />
        </SafeAreaView>
    )
}
const addToPlaylistModalStyle = StyleSheet.create({
    modalContainer: {
        ...defaultStyles.container,
        paddingHorizontal: screenPadding.horizontal,
    },
})
export default AddToPlaylistModal
