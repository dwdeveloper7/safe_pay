import { StatusBar } from 'expo-status-bar';
import { loadCustomFonts } from './startup';
import { View, ActivityIndicator } from 'react-native';
import AppContainerStyles from './AppContainerStyles';
import Router from './Router';

export default function App() {
    const fontsLoaded = loadCustomFonts();

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View style={AppContainerStyles.container}>
            <Router />
        </View>
    );
}
