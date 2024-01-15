import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { type RootStackParamList, routeNames } from '../../../Router';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const RouteButtons: React.FC = () => {
    const navigation = useNavigation();

    const appRoutes = routeNames.filter(route => route !== 'Dev');

    const navigateToRoute = (routeName: keyof RootStackParamList) => {
        navigation.navigate(routeName);
    };

    return (
        <View style={styles.container}>
            {appRoutes.map(route => (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigateToRoute(route);
                    }}
                    key={route}
                >
                    <Text style={styles.buttonText}>Quick Nav to /{route}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default RouteButtons;
