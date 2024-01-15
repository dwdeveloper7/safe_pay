import React, { useState } from 'react';
import useAmountStore from '../../../stores/useAmountStore';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PaymentPage = () => {
    const { amount, setAmount, backspace } = useAmountStore();

    const [currency, setCurrency] = useState('USD'); // Default currency

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

    const handleSendMoney = () => {
        // Logic for sending money to escrow
    };

    const handleRequestMoney = () => {
        // Logic for requesting money for a transaction
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Amount</Text>

            <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <Text style={styles.amountText}>{amount}</Text>
            </View>

            <Text style={styles.label}>Select Currency:</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    amountLabel: {
        fontSize: 18,
        marginRight: 10,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
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
        fontSize: 20,
    },
    digit: {
        width: '30%',
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 5,
    },
    digitText: {
        fontSize: 20,
    },
    amountText: {
        fontSize: 24,
        marginLeft: 5,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    picker: {
        width: '100%',
        marginBottom: 20,
    },
    dialPad: {
        width: 220, // Adjust the width of the dial pad
    },
    dialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    digitButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
    },
    digitButtonText: {
        fontSize: 24,
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
