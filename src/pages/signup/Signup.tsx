import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Pressable,
    Modal,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useForm, Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import validate from 'validate.js';
import RegistrationForm from './components/RegistrationForm';

import initiateOtpVerification from './auth';

const constraints = {
    name: {
        presence: { allowEmpty: false, message: 'Name is required' },
        // Additional validation rules if needed
    },
    dateOfBirth: {
        presence: { allowEmpty: false, message: 'Date of birth is required' },
        format: {
            pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
            message: 'Invalid date format (MM/DD/YYYY)',
        },
        // Additional date logic validation can be added here
    },
    address: {
        presence: { allowEmpty: false, message: 'Address is required' },
        // Additional validation rules if needed
    },
    ssn: {
        presence: {
            allowEmpty: false,
            message: 'Last 4 digits of SSN is required',
        },
        length: { is: 4, message: 'Must be exactly 4 digits' },
        numericality: { onlyInteger: true, message: 'Must be a number' },
    },
    tosAccepted: {
        inclusion: {
            within: [true],
            message: 'You must accept the terms of service',
        },
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f7',
    },
    button: {
        paddingVertical: 12,
        width: 120,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        alignSelf: 'center',
        // Other button styles...
    },
    buttonText: { color: 'white', fontSize: 18 },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#007bff',
    },
    checkboxCheckmark: {
        color: 'white',
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
    },
    formContainer: {
        flex: 1,
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: { marginRight: 12 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexItem: {
        flex: 1,
        marginHorizontal: 4,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

function SignupForm() {
    /// ///////////////////////////////
    // Assuming apiUrl is defined and valid

    const apiUrl = 'http://192.168.0.187:8080/api/v1/users';
    const createUser = async newUserdata => {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserdata),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };

    const mutation = useMutation({
        mutationFn: newUser => createUser(newUser),
    });

    // /////////////////////////////////

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [tosAccepted, setTosAccepted] = useState(false);

    const onSubmit = formData => {
        mutation;
    };

    // return (
    //     <Modal style={styles.container}>
    //         <View style={styles.formContainer}>
    //             {/* Name Field */}
    //             <Controller
    //                 name="name"
    //                 control={control}
    //                 rules={{
    //                     validate: value =>
    //                         validate(
    //                             { name: value },
    //                             { name: constraints.name }
    //                         ),
    //                 }}
    //                 render={({ field: { onChange, onBlur, value } }) => (
    //                     <TextInput
    //                         style={styles.input}
    //                         onBlur={onBlur}
    //                         onChangeText={onChange}
    //                         value={value}
    //                         placeholder="Name"
    //                         accessibilityLabel="Name"
    //                     />
    //                 )}
    //                 defaultValue=""
    //             />
    //             {errors.name && (
    //                 <Text
    //                     style={styles.errorText}
    //                 >{`${errors.name.message}`}</Text>
    //             )}

    //             {/* Date of Birth Field */}
    //             <Controller
    //                 name="dateOfBirth"
    //                 control={control}
    //                 rules={{
    //                     validate: value =>
    //                         validate(
    //                             { dateOfBirth: value },
    //                             { dateOfBirth: constraints.dateOfBirth }
    //                         ),
    //                 }}
    //                 render={({ field: { onChange, onBlur, value } }) => (
    //                     <TextInput
    //                         style={styles.input}
    //                         onBlur={onBlur}
    //                         onChangeText={onChange}
    //                         value={value}
    //                         placeholder="MM/DD/YYYY"
    //                         keyboardType="numeric"
    //                         accessibilityLabel="Date of Birth"
    //                     />
    //                 )}
    //                 defaultValue=""
    //             />
    //             {errors.dateOfBirth && (
    //                 <Text style={styles.errorText}>
    //                     {`${errors.dateOfBirth.message}`}
    //                 </Text>
    //             )}

    //             {/* Address Field */}
    //             <Controller
    //                 name="address"
    //                 control={control}
    //                 rules={{
    //                     validate: value =>
    //                         validate(
    //                             { address: value },
    //                             { address: constraints.address }
    //                         ),
    //                 }}
    //                 render={({ field: { onChange, onBlur, value } }) => (
    //                     <TextInput
    //                         style={styles.input}
    //                         onBlur={onBlur}
    //                         onChangeText={onChange}
    //                         value={value}
    //                         placeholder="Address"
    //                         accessibilityLabel="Address"
    //                     />
    //                 )}
    //                 defaultValue=""
    //             />
    //             {errors.address && (
    //                 <Text style={styles.errorText}>
    //                     {`${errors.address.message}`}
    //                 </Text>
    //             )}

    //             {/* SSN Field */}
    //             <Controller
    //                 name="ssn"
    //                 control={control}
    //                 rules={{
    //                     validate: value =>
    //                         validate({ ssn: value }, { ssn: constraints.ssn }),
    //                 }}
    //                 render={({ field: { onChange, onBlur, value } }) => (
    //                     <TextInput
    //                         style={styles.input}
    //                         onBlur={onBlur}
    //                         onChangeText={onChange}
    //                         value={value}
    //                         placeholder="Last 4 digits of SSN"
    //                         keyboardType="numeric"
    //                         accessibilityLabel="Last Four SSN"
    //                     />
    //                 )}
    //                 defaultValue=""
    //             />
    //             {errors.ssn && (
    //                 <Text
    //                     style={styles.errorText}
    //                 >{`${errors.ssn.message}`}</Text>
    //             )}

    //             {/* TOS Checkbox */}
    //             <View style={styles.checkboxContainer}>
    //                 <CheckBox
    //                     value={tosAccepted}
    //                     onValueChange={setTosAccepted}
    //                     accessibilityLabel="Accept Terms of Service"
    //                 />
    //                 <Text style={styles.label}>
    //                     I accept the Terms of Service
    //                 </Text>
    //             </View>
    //             {errors.tosAccepted && (
    //                 <Text style={styles.errorText}>
    //                     {`${errors.tosAccepted.message}`}
    //                 </Text>
    //             )}

    //             {/* Submit Button */}
    //             <Pressable
    //                 onPress={handleSubmit(onSubmit)}
    //                 style={({ pressed }) => [
    //                     styles.button,
    //                     { backgroundColor: pressed ? '#0056b3' : '#007bff' },
    //                 ]}
    //                 accessibilityLabel="Register"
    //                 accessibilityHint="Register for a new account"
    //             >
    //                 <Text style={styles.buttonText}>Register</Text>
    //             </Pressable>
    //         </View>
    //     </Modal>
    // );
    return <RegistrationForm />;
}

export default SignupForm;
