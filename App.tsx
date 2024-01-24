import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { loadCustomFonts } from './startup';
import AppContainerStyles from './AppContainerStyles';
import { Router } from './router/index';
import useAuthStore from './src/stores/useAuthStore';
import BottomNavigationBar from './src/pages/homepage/components/BottomNavigationBar';

import AsyncStorage from '@react-native-async-storage/async-storage';

const logAsyncStorageContent = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);
    console.log(entries);
};

require('./startupConfig');

export default function App() {
    const fontsLoaded = loadCustomFonts();
    const queryClient = new QueryClient();

    const { session } = useAuthStore();

    logAsyncStorageContent();

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
