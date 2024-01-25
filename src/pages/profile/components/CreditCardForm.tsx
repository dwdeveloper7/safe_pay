import cardValidator from 'card-validator';

import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CreditCard from './CreditCard';
import Button from '../../../components/Button';

const CreditCardForm: React.FC<{ onClose: () => void; visible: boolean }> = ({
    onClose,
    visible,
}) => {
    return (
        <Modal animationType="fade" visible={visible}>
            <View style={styles.container}>
                <Pressable style={styles.backButton} onPress={onClose}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <CreditCard />

                <Button title="Save Card" size="medium" onPress={() => {}} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        position: 'absolute',
        top: 10, // Adjust these values as needed
        left: 10,
        margin: 10, // Using margin for positioning
    },

    cardContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 20,
        width: '100%',
    },
    cardIcon: {
        alignSelf: 'flex-end',
    },
    cardNumber: {
        fontSize: 22,
        color: '#333',
        letterSpacing: 2,
        marginTop: 10,
    },
    cardHolder: {
        fontSize: 18,
        color: '#333',
        letterSpacing: 1,
        marginTop: 10,
    },
    cardExpiry: {
        fontSize: 16,
        color: '#333',
        letterSpacing: 1,
        marginTop: 10,
    },
    form: {
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputSmall: {
        flex: 1,
        marginRight: 10,
    },
});

export default CreditCardForm;
