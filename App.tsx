import { StatusBar } from 'expo-status-bar';
import { loadCustomFonts } from './startup';
import { View, ActivityIndicator } from 'react-native';
import AppContainerStyles from './AppContainerStyles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Router from './Router';

export default function App() {
    const fontsLoaded = loadCustomFonts();
    const queryClient = new QueryClient();
    const devPath = 'localhost:8080/api/v1';

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <View style={AppContainerStyles.container}>
                <Router />
            </View>
        </QueryClientProvider>
    );
}
