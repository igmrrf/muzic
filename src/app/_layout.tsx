import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { SplashScreen } from 'expo-router'
import { useCallback } from 'react'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colors } from '@/constants/tokens'
import TrackPlayer from 'react-native-track-player'
import { playbackService } from '@/constants/playbackService'
import { isAndroid } from '@/constants/system'

SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync()
    }, [])
    useSetupTrackPlayer({
        onLoad: handleTrackPlayerLoaded,
    })
    useLogTrackPlayerState()
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <RootNavigation />

                <StatusBar style='auto' />
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

const RootNavigation = () => {
    return (
        <Stack>
            <Stack.Screen
                name='(tabs)'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='player'
                options={{
                    presentation: 'card',
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    animationDuration: 400,
                    headerShown: false,
                    ...(isAndroid && { animation: 'slide_from_bottom' }),
                }}
            />

            <Stack.Screen
                name='(modals)/addToPlaylistModal'
                options={{
                    presentation: 'modal',
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTitle: 'Add to playlist',
                    headerTitleStyle: {
                        color: colors.primary,
                    },
                }}
            />
        </Stack>
    )
}

export default App
