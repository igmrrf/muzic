import ArtistsList from '@/components/ArtistsList'
import { screenPadding } from '@/constants/tokens'
import { nameFilter } from '@/helpers/filter'
import { Artist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const ArtistsScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in artists',
        },
    })
    const artists = useArtists()
    const filteredArtists = useMemo(
        () => artists.filter(nameFilter<Artist>(search)),
        [search, artists]
    )

    return (
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={{
                    paddingHorizontal: screenPadding.horizontal,
                }}
            >
                <ArtistsList scrollEnabled={false} artists={filteredArtists} />
            </ScrollView>
        </View>
    )
}

export default ArtistsScreen
