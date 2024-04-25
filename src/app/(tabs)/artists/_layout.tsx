import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const ArtistsScreenLayout = () => {
    return (
        <SafeAreaView style={defaultStyles.container}>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{ headerTitle: 'Artists', ...StackScreenWithSearchBar }}
                />

                <Stack.Screen
                    name='[name]'
                    options={{
                        headerTitle: '',
                        headerBackVisible: true,
                        headerStyle: {
                            backgroundColor: colors.background,
                        },
                        headerTintColor: colors.primary,
                    }}
                />
            </Stack>
        </SafeAreaView>
    )
}

export default ArtistsScreenLayout
