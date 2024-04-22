import { utilsStyles } from '@/styles'
import { View } from 'react-native'

export const ItemDivider = () => (
    <View
        style={{ ...utilsStyles.itemsSeparator, marginVertical: 9, marginLeft: 60 }}
    ></View>
)
