import { useState } from 'react';
import useLoadingStore from '../../../stores/useLoadingStore';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Spinner from '../../../components/spinner';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../../components/Button';
import {
    initiateOtpVerification,
    formatToE164,
} from '../../../util/supabase/util';

import validate from 'validate.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f7',
        zIndex: 1000,
    },
    button: {
        paddingVertical: 12,
        width: 120,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        alignSelf: 'center',
    },
    buttonText: { color: 'white', fontSize: 18 },
    buttonContainer: {
        // Align children in a row
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        color: 'blue',
        // justifyContent: 'center', // Center children vertically
        // Add any additional styling for the button container
    },
    buttonDisabled: {
        // Styles for the disabled state
        opacity: 0.5, // Example style
        color: 'gray',
    },

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
    submitText: {
        color: 'blue',
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10, // Adds vertical space above and below the button
    },
    toggleButtonText: {
        color: 'white',
    },
});

const Login: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { isLoading, setLoading } = useLoadingStore();

    const [loginError, setLoginError] = useState('');

    const [isPhoneLogin, setIsPhoneLogin] = useState(true);

    const constraints = {
        email: {
            presence: { allowEmpty: false, message: 'Email is required' },
            email: { message: 'Invalid email address' },
        },
        phone: {
            presence: {
                allowEmpty: false,
                message: 'Phone number is required',
            },
            format: {
                pattern: '[0-9]+',
                flags: 'i',
                message: 'can only contain numbers',
            },
            length: {
                minimum: 10,
                maximum: 15,
                message: 'must be 10 to 15 digits',
            },
        },
    };

    const determineLoginText = () => {
        return isPhoneLogin ? ' Email Login' : ' Phone Login';
    };

    const onSubmit = async (loginData: { contact: string }) => {
        if (hasErrors) {
            return;
        }
        const { contact } = loginData;
        let loginField: { phone: string } | { email: string };

        if (isPhoneLogin) {
            loginField = { phone: formatToE164(1, contact) };
        } else {
            loginField = { email: contact };
        }

        try {
            setLoading(true);
            await initiateOtpVerification(loginField);

            // await login or create
            setLoading(false);
            onSuccess();
        } catch (error) {
            setLoading(false);
            setLoginError(error.message);
        }
    };

    const toggleLoginMethod = () => {
        setIsPhoneLogin(!isPhoneLogin);
    };

    const hasErrors = Object.keys(errors).length > 0;

    if (isLoading) return <Spinner />;

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Pressable
                    onPress={toggleLoginMethod}
                    style={styles.toggleButton}
                >
                    <Text style={styles.toggleButtonText}>
                        Switch to {determineLoginText()}
                    </Text>
                </Pressable>

                {/* Email/Phone Input Field */}
                <View style={styles.inputContainer}>
                    <Feather
                        name={isPhoneLogin ? 'phone' : 'mail'}
                        size={20}
                        style={styles.icon}
                    />
                    <Controller
                        control={control}
                        rules={{
                            validate: async value => {
                                const validationErrors = validate(
                                    {
                                        [isPhoneLogin ? 'phone' : 'email']:
                                            value,
                                    },
                                    {
                                        [isPhoneLogin ? 'phone' : 'email']:
                                            constraints[
                                                isPhoneLogin ? 'phone' : 'email'
                                            ],
                                    }
                                );
                                return validationErrors === undefined
                                    ? true
                                    : validationErrors[
                                          isPhoneLogin ? 'phone' : 'email'
                                      ][0];
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={
                                    isPhoneLogin
                                        ? 'Phone Number'
                                        : 'Email Address'
                                }
                                keyboardType={
                                    isPhoneLogin ? 'phone-pad' : 'email-address'
                                }
                                accessibilityLabel={
                                    isPhoneLogin
                                        ? 'Phone Number'
                                        : 'Email Address'
                                }
                            />
                        )}
                        name="contact"
                        defaultValue=""
                    />
                </View>
                {errors.contact && (
                    <Text style={styles.errorText}>
                        {`${errors.contact.message}`}
                    </Text>
                )}

                {loginError && (
                    <Text style={styles.errorText}>{`${loginError}`}</Text>
                )}
                <View>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ad suscipit aspernatur deleniti, tenetur,
                        repudiandae perferendis aliquam similique, praesentium
                        hic distinctio enim asperiores tempora sint? Totam in
                        similique sint excepturi aspernatur.
                    </Text>
                </View>
                <View>
                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        style={({ pressed }) => [
                            styles.buttonContainer,
                            hasErrors ? styles.buttonDisabled : null,
                            {},
                        ]}
                    >
                        <Text style={styles.submitText}>Next </Text>
                        <MaterialIcons
                            name="navigate-next"
                            size={34}
                            color={hasErrors ? 'gray' : 'blue'}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Login;
