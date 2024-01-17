import React, { useState } from 'react';
import useAmountStore from '../../../stores/useAmountStore';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Picker } from '@react-native-picker/picker';
import SendMoneyModal from './SendMoneyModal';

const PaymentPage = () => {
    const { amount, setAmount, backspace } = useAmountStore();

    const [currency, setCurrency] = useState('USD'); // Default currency

    const apiUrl = 'http://192.168.0.187:8080/api/v1';

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

    const handleInput = num => {
        setAmount(amount + num);
    };

    const createDigits = () => {
        const digits = [];
        for (let i = 1; i < 10; i++) {
            digits.push(
                <TouchableOpacity
                    key={i}
                    style={styles.digit}
                    onPress={() => handleInput(i.toString())}
                >
                    <Text style={styles.digitText}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return digits;
    };

    const formatAmount = () => {
        // Separate the text into two parts: before and after the decimal point
        let [integerPart, decimalPart] = amount.split('.');

        // Remove non-numeric characters from the integer part
        integerPart = integerPart.replace(/[^0-9]/g, '');

        // Format the integer part with commas
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Reassemble the integer and decimal parts
        let formattedAmount = integerPart;
        if (decimalPart !== undefined) {
            // Limit the decimal part to 2 digits (optional, for standard currency format)
            decimalPart = decimalPart.substring(0, 2);

            // Append the decimal part back
            formattedAmount += '.' + decimalPart;
        }

        return formattedAmount;
    };

    const handleSendMoney = () => {
        // Logic for sending money to escrow
        toggleModal();
    };

    const handleRequestMoney = () => {
        // Logic for requesting money for a transaction
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <Text style={styles.amountText}>{formatAmount()}</Text>
            </View>

            <Picker
                selectedValue={currency}
                style={styles.picker}
                onValueChange={itemValue => setCurrency(itemValue)}
            >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="GBP" value="GBP" />
                {/* Add more currency options as needed */}
            </Picker>

            <View style={styles.keypad}>
                {createDigits()}
                <TouchableOpacity
                    style={styles.digit}
                    onPress={() => handleInput('0')}
                >
                    <Text style={styles.digitText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.digit}
                    onPress={() => handleInput('.')}
                >
                    <Text style={styles.digitText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.digit} onPress={backspace}>
                    <Text style={styles.digitText}>⌫</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSendMoney}
                >
                    <Text style={styles.buttonText}>Secure Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRequestMoney}
                >
                    <Text style={styles.buttonText}>Secure Request</Text>
                </TouchableOpacity>
            </View>

            <SendMoneyModal
                isVisible={isModalVisible}
                onClose={toggleModal}
                onSend={() => alert('Sent')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#007bff',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        maxWidth: 300,
        height: 50,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 42,
        marginLeft: 5,
        color: 'white',
        fontFamily: 'Inter-Bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#4da1ff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Inter-Bold',
    },
    clearButton: {
        marginLeft: 'auto',
        backgroundColor: '#ff5252',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
    clearButtonText: {
        color: '#fff',
    },
    currencySymbol: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Inter-Bold',
    },
    digit: {
        width: '30%',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 5,
    },
    digitText: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Inter-Bold',
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    picker: {
        width: '100%',
        marginBottom: 20,
        fontFamily: 'Inter-Bold',
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 300,
        marginBottom: 20,
    },
});

export default PaymentPage;
