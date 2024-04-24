import ArtistsListItem from '@/components/ArtistListItem'
import { ItemDivider } from '@/components/ItemDivider'
import TrackEmpty from '@/components/TrackEmpty'
import { Artist } from '@/helpers/types'
import React from 'react'
import { FlatListProps, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type ArtistsListProps = { artists: Artist[] } & Partial<FlatListProps<Artist>>

const ArtistsList = ({ artists, ...flatListProps }: ArtistsListProps) => {
    return (
        <View>
            <FlatList
                data={artists}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 128,
                }}
                ListEmptyComponent={TrackEmpty}
                ListFooterComponent={ItemDivider}
                ItemSeparatorComponent={ItemDivider}
                renderItem={({ item: artist }) => <ArtistsListItem artist={artist} />}
                {...flatListProps}
            />
        </View>
    )
}

export default ArtistsList
