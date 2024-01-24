import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PeopleSelector from './peopleSelector';
import SearchComponent from './searchComponent';

function PeopleSearch() {
    return (
        <View style={styles.container}>
            <SearchComponent onChangeHandler={() => {}} />
            <PeopleSelector />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
    },
});

export default PeopleSearch;
