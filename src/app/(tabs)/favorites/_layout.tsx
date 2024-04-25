import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const FavoriteScreenLayout = () => {
    return (
        <SafeAreaView style={defaultStyles.container}>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{ headerTitle: 'Favorites', ...StackScreenWithSearchBar }}
                />
            </Stack>
        </SafeAreaView>
    )
}

export default FavoriteScreenLayout
