import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
    const apiUrl = 'http:/192.168.0.187:8080/api/v1';

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/1`);
            return response.json();
        } catch (error) {
            throw new Error('Network response error');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['myQueryKey'],
        queryFn: fetchTransactions,
    });
    if (isLoading || !data) {
        return <Text>loading</Text>;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.subtext}>
                Welcome to Profile Page {data.data.username}
            </Text>
        </View>
    );
};

export default Profile;
