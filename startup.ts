import { useFonts } from 'expo-font';

export const loadCustomFonts = () => {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
        // Add other font styles if needed
    });
    return fontsLoaded;
};
