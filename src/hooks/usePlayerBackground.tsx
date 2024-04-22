import { platforms } from '@/constants/system'
import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { ImageColorsResult } from 'react-native-image-colors/build/types'

const usePlayerBackground = (imageUrl: string) => {
    const [imageColors, setImageColors] = useState<{
        background: string
        primary: string
    }>({
        background: colors.background,
        primary: colors.primary,
    })

    useEffect(() => {
        getColors(imageUrl, {
            fallback: colors.background,
            cache: true,
            key: imageUrl,
        }).then((colors: ImageColorsResult) => {
            if (colors.platform === platforms.android) {
                setImageColors({
                    background: colors?.dominant,
                    primary: colors.average,
                })
            } else if (colors.platform === platforms.ios) {
                setImageColors({
                    background: colors?.background,
                    primary: colors.primary,
                })
            }
        })
    }, [imageUrl])

    return { imageColors }
}

export default usePlayerBackground
