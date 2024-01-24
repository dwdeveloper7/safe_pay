import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';

import initiateOtpVerification from './auth';

const validateContact = value => {
    // Regular expression to match email pattern
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    // Regular expression to match phone pattern (very basic validation, you may need a more robust regex)
    const phonePattern =
        /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/;

    const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;

    return (
        emailPattern.test(value) ||
        phonePattern.test(value) ||
        dobPattern.test(value)
    );
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

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
    },
    formContainer: {
        width: '100%',
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

    function formatToE164(countryCode, phoneNumber) {
        const strippedNumber = phoneNumber.replace(/[^\d]/g, '');
        return `+${countryCode}${strippedNumber}`;
    }

    const onSubmit = newUserData => {
        try {
            // Calling the mutate function with new user data
            mutation.mutate(newUserData, {
                onSuccess: data => {
                    const formattedNumber = formatToE164(1, newUserData.phone);

                    // Handle the success scenario
                    // initiateOtpVerification(formattedNumber);
                    console.log('User created successfully', data);
                },
                onError: error => {
                    // Handle the error scenario
                    console.error('Error creating user', error);
                },
            });
        } catch (error) {
            console.error('Submission error', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {/* Contact Field */}
                <View style={styles.inputContainer}>
                    <Feather name="mail" size={20} style={styles.icon} />
                    <Controller
                        control={control}
                        rules={{
                            required: 'Contact information is required',
                            validate: validateContact,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email or Phone"
                                keyboardType="email-address"
                                accessibilityLabel="Contact Information"
                            />
                        )}
                        name="phone"
                        defaultValue="555-555-5555"
                    />
                </View>
                {errors.contact && (
                    <Text style={styles.errorText}>
                        Enter a valid email or phone number.
                    </Text>
                )}

                {/* Zipcode Field */}
                <View style={styles.inputContainer}>
                    <Feather name="map-pin" size={20} style={styles.icon} />
                    <Controller
                        control={control}
                        rules={{
                            required: 'Zipcode is required',
                            minLength: {
                                value: 5,
                                message: 'Zipcode must be at least 5 digits',
                            },
                            maxLength: {
                                value: 9,
                                message: 'Zipcode must be less than 10 digits',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Zipcode"
                                keyboardType="numeric"
                                accessibilityLabel="Zipcode"
                            />
                        )}
                        name="zipcode"
                        defaultValue="55403"
                    />
                </View>
                {errors.zipcode && (
                    <Text style={styles.errorText}>
                        {errors.zipcode.message}
                    </Text>
                )}

                <View style={styles.inputContainer}>
                    <Feather name="calendar" size={20} style={styles.icon} />
                    <Controller
                        control={control}
                        rules={{
                            required: 'Date of birth is required',
                            pattern: {
                                // This pattern matches dates in MM/DD/YYYY format
                                value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
                                message: 'MM/DD/YYYY format',
                            },
                            validate: {
                                // Additional validation to check for logical date consistency can be added here
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="MM/DD/YYYY"
                                keyboardType="numeric"
                                accessibilityLabel="Date of Birth"
                            />
                        )}
                        name="dateOfBirth"
                        defaultValue="01/01/1993"
                    />
                    {errors.dateOfBirth && (
                        <Text style={styles.errorText}>
                            {errors.dateOfBirth.message}
                        </Text>
                    )}
                </View>

                {/* Submit Button */}
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#0056b3' : '#007bff' },
                    ]}
                    accessibilityLabel="Register"
                    accessibilityHint="Register for a new account"
                >
                    <Text style={styles.buttonText}>Lets Go</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default SignupForm;
