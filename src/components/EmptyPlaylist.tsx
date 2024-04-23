import { unknownArtistImageUrl } from '@/constants/images'
import { trackEmptyStyles } from '@/styles'
import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

const EmptyPlaylist = () => {
    return (
        <View style={trackEmptyStyles.container}>
            <View>
                <FastImage
                    source={{
                        uri: unknownArtistImageUrl,
                        priority: FastImage.priority.normal,
                    }}
                    style={trackEmptyStyles.image}
                />
            </View>
            <View>
                <Text style={trackEmptyStyles.text}>No playlist found</Text>
            </View>
        </View>
    )
}

export default EmptyPlaylist
