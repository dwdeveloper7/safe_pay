// Badge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ value, children }) => {
    return (
        <View style={styles.container}>
            {children}

            {value > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{value}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 24,
        height: 24,
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 2,
        minWidth: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure the badge is above the icon
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Badge;
