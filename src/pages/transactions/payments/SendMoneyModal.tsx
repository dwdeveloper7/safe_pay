import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

const SendMoneyModal = ({ isVisible, onClose, onSend }) => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');

    const [transactions, setTransactions] = useState([]); // Replace with actual transaction data
    const [selectedTransaction, setSelectedTransaction] = useState();

    const handleSend = () => {
        onSend(recipient, subject, selectedTransaction);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            style={{ margin: 0 }}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Send Money</Text>

                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Recipient"
                    value={recipient}
                    onChangeText={setRecipient}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                    value={subject}
                    onChangeText={setSubject}
                />

                <Picker
                    selectedValue={selectedTransaction}
                    style={styles.picker}
                    onValueChange={itemValue =>
                        setSelectedTransaction(itemValue)
                    }
                >
                    {transactions.map(transaction => (
                        <Picker.Item
                            key={transaction.id}
                            label={transaction.label}
                            value={transaction.id}
                        />
                    ))}
                </Picker>

                <TouchableOpacity style={styles.button} onPress={handleSend}>
                    <Text style={styles.buttonText}>Secure Pay</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '100%',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#90EE90',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SendMoneyModal;
