import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 16,
        marginTop: 10,
    },
});

const NotFound: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>404 - Not Found</Text>
            <Text style={styles.subtext}>
                The page you are looking for does not exist.
            </Text>
        </View>
    );
};

export default NotFound;
