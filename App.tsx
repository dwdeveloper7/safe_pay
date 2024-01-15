import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AppContainerStyles from './AppContainerStyles';
import Router from './Router';
import BottomNavigationBar from './src/pages/homepage/components/BottomNavigationBar';

export default function App() {
    return (
        <View style={AppContainerStyles.container}>
            <Router />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f87ae',
    },
    navLinkContainer: {
        flexDirection: 'row',
    },
});
