import React, { useMemo } from 'react'
import TrackLists from '@/components/TrackLists'
import { screenPadding } from '@/constants/tokens'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { ScrollView, View } from 'react-native'
import { trackTitleFilter } from '@/helpers/filter'
import { useFavorites } from '@/store/library'
import { generateTracksListId } from '@/helpers/miscellaneous'

const FavoriteScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in songs',
        },
    })

    const favorites = useFavorites().favorites

    const filteredTracks = useMemo(() => {
        if (!search) return favorites

        return favorites.filter(trackTitleFilter(search))
    }, [search, favorites])

    return (
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={{
                    paddingHorizontal: screenPadding.horizontal,
                }}
            >
                <TrackLists
                    id={generateTracksListId('favorites', search)}
                    tracks={filteredTracks}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    )
}

export default FavoriteScreen
