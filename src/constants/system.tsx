import { Platform, useColorScheme } from 'react-native'

export enum platforms {
    android = 'android',
    ios = 'ios',
    web = 'web',
}

export const isTV = Platform.isTV
export const isAndroid = Platform.OS === platforms.android
export const isiOS = Platform.OS === platforms.ios
export const isWeb = Platform.OS === platforms.web
export const isMacOs = Platform.OS === 'macos'
export const isWindows = Platform.OS === 'windows'

export const theme = useColorScheme()
