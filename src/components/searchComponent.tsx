import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function SearchComponent({ onChangeHandler }) {
    return (
        <View style={styles.searchContainer}>
            <FontAwesome5
                name="search"
                size={18}
                color="#006aff"
                style={styles.iconStyle}
            />
            <TextInput
                placeholder="Search"
                style={styles.inputStyle}
                // Add other props like onChangeText, value, etc. as needed
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#006aff',
        borderWidth: 6,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
    },
    iconStyle: {
        width: 20, // Adjust the size as needed
        height: 20, // Adjust the size as needed
        marginRight: 10,
    },
    inputStyle: {
        flex: 1,
        fontSize: 16,
        // Add other styling as needed to match your design
    },
});

export default SearchComponent;
