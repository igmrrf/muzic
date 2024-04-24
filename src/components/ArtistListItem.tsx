import { unknownArtistImageUrl } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { Artist } from '@/helpers/types'
import { trackListItemStyles } from '@/styles'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'

type ArtistsListItemProps = {
    artist: Artist
}
const ArtistsListItem = ({ artist }: ArtistsListItemProps) => {
    return (
        <Link href={`/artists/${artist.name}`} asChild>
            <TouchableHighlight>
                <View
                    style={{
                        ...trackListItemStyles.container,
                    }}
                >
                    <View>
                        <FastImage
                            source={{
                                uri: unknownArtistImageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            style={{
                                ...trackListItemStyles.artworkImage,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{ width: '100%' }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    ...trackListItemStyles.titleText,
                                    color: colors.text,
                                }}
                            >
                                {artist.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </Link>
    )
}

export default ArtistsListItem
