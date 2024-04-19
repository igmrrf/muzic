import { unknownTrackImageUrl } from '@/constants/images'
import { trackEmptyStyles } from '@/styles'
import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

const TrackEmpty = () => {
    return (
        <View style={trackEmptyStyles.container}>
            <View>
                <FastImage
                    source={{
                        uri: unknownTrackImageUrl,
                        priority: FastImage.priority.normal,
                    }}
                    style={trackEmptyStyles.image}
                />
            </View>
            <View>
                <Text style={trackEmptyStyles.text}>No songs found</Text>
            </View>
        </View>
    )
}

export default TrackEmpty
