import TrackLists from '@/components/TrackLists'
import { screenPadding } from '@/constants/tokens'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import library from '@/assets/data/library.json'
import { ScrollView, View } from 'react-native'
import { trackTitleFilter } from '@/helpers/filter'

const SongsScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in songs',
        },
    })

    const filteredTracks = useMemo(() => {
        if (!search) return library

        return library.filter(trackTitleFilter(search))
    }, [search])

    return (
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={{
                    paddingHorizontal: screenPadding.horizontal,
                }}
            >
                <TrackLists tracks={filteredTracks} scrollEnabled={false} />
            </ScrollView>
        </View>
    )
}

export default SongsScreen
