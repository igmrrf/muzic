import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'
import { isAndroid, isiOS } from './system'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
    headerLargeTitle: true,
    headerLargeStyle: {
        backgroundColor: colors.background,
    },
    headerLargeTitleStyle: {
        color: colors.text,
    },
    ...(isAndroid && {
        headerStyle: {
            backgroundColor: colors.background,
        },
    }),
    headerTintColor: colors.text,
    headerTransparent: isiOS,
    headerBlurEffect: 'prominent',
    headerShadowVisible: false,
}
