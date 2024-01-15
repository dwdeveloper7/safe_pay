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

const Profile: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.subtext}>Welcome to Profile Page</Text>
        </View>
    );
};

export default Profile;
