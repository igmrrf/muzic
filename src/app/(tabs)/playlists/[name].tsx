import PlaylistTracksList from '@/components/PlaylistTracksList'
import { screenPadding } from '@/constants/tokens'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const PlaylistDetailScreen = () => {
    const { name: playlistName } = useLocalSearchParams<{ name: string }>()
    const { playlists } = usePlaylists()
    const playlist = playlists.find((playlist) => playlist.name === playlistName)

    if (!playlist) {
        console.warn(`Playlist ${playlistName} not found`)
        return <Redirect href={'/(tabs)/playlists'} />
    }
    return (
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={{
                    paddingHorizontal: screenPadding.horizontal,
                }}
            >
                <PlaylistTracksList playlist={playlist} />
            </ScrollView>
        </View>
    )
}

export default PlaylistDetailScreen
