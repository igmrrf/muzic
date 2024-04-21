import { colors } from '@/constants/tokens'
import React, { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { IOSImageColors } from 'react-native-image-colors/build/types'

const usePlayerBackground = (imageUrl: string) => {
    const [imageColors, setImageColors] = useState<IOSImageColors | null>(null)

    useEffect(() => {
        getColors(imageUrl, {
            fallback: colors.background,
            cache: true,
            key: imageUrl,
        }).then((colors) => setImageColors(colors as IOSImageColors))
    }, [imageUrl])

    return { imageColors }
}

export default usePlayerBackground