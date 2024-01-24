import React, { useState } from 'react';
import {
    View,
    FlatList,
    Text,
    Pressable,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';
import SearchComponent from './searchComponent';

const peopleList = [
    {
        id: 1,
        name: 'Alice Johnson',
        userName: '@dwil234',
        avatarUrl: 'https://placekitten.com/200/200',
    },
    {
        id: 2,
        name: 'Bob Smith',
        userName: '@dwil234',
        avatarUrl: 'https://placekitten.com/200/200',
    },
    {
        id: 3,
        name: 'Carol Danvers',
        userName: '@dwil234',
        avatarUrl: 'https://placekitten.com/200/200',
    },
    {
        id: 4,
        name: 'David Brown',
        userName: '@dwil234',
        avatarUrl: 'https://placekitten.com/200/200',
    },
    // ... more data
];

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[b.length][a.length];
}

function filterSimilarNames(namesArray, inputName, threshold) {
    return namesArray.filter(
        name =>
            levenshteinDistance(name.toLowerCase(), inputName.toLowerCase()) <=
            threshold
    );
}

function PeopleSelector() {
    const [searchQuery, setSearchQuery] = useState('');
    const { width: viewportWidth } = Dimensions.get('window');

    const onRemove = () => {};

    const onAdd = () => {};

    const filteredPeople = searchQuery
        ? filterSimilarNames(
              peopleList.map(person => person.name),
              searchQuery,
              3
          )
        : peopleList;

    const isPersonSelected = personId => {
        const selectedPeople = [{ id: 1 }];
        selectedPeople.some(p => p.id === personId);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Suggestions</Text>
            <View style={styles.resultsContainer}>
                <FlatList
                    data={filteredPeople}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.item}
                            onPress={() => onSelect(item)}
                        >
                            <Image
                                source={{ uri: item.avatarUrl }}
                                style={styles.avatar}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.userName}>
                                    {item.userName}
                                </Text>
                            </View>
                            {isPersonSelected(item.id) ? (
                                <AntDesign
                                    name="minuscircleo"
                                    size={24}
                                    color="red"
                                    onPress={() => onRemove(item)}
                                />
                            ) : (
                                <Feather
                                    name="dollar-sign"
                                    size={24}
                                    color="black"
                                />
                            )}
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    resultsContainer: {
        paddingHorizontal: 40,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 15,
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 14,
        color: 'gray',
    },
    headerText: {
        fontWeight: 'bold',
        backgroundColor: '#ededed',
        padding: 4,
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
    },
});

export default PeopleSelector;
