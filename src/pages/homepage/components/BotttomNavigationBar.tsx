import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Badge from '../../../components/badge';
import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialIcons,
    Octicons,
} from '@expo/vector-icons';

const BottomNavigationBar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab}>
                <AntDesign name="home" size={24} color="black" />
                <Text style={styles.label}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
                <FontAwesome name="handshake-o" size={24} color="black" />
                <Text style={styles.label}>Transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
                <Badge value="88">
                    <Ionicons name="notifications" size={24} color="black" />
                </Badge>
                <Text style={styles.label}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
                <MaterialIcons name="account-circle" size={24} color="black" />
                <Text style={styles.label}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
                <Octicons name="question" size={24} color="black" />
                <Text style={styles.label}>Help</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    tab: {
        alignItems: 'center',
    },
    label: {
        marginTop: 5,
    },
});

export default BottomNavigationBar;
