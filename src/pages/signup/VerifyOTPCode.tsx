import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import Spinner from '../../components/spinner';
import { useNavigation } from '@react-navigation/native';
import useLoadingStore from '../../stores/useLoadingStore';

import supabase from '../../../lib/supabase';

type VerifyCodeProps = {
    onCodeFilled: (code: string) => void;
};

const OTP_LENGTH = 6;

function formatToE164(countryCode, phoneNumber) {
    const strippedNumber = phoneNumber.replace(/[^\d]/g, '');
    return `+${countryCode}${strippedNumber}`;
}

//

export const VerifyOTPCode: React.FC<VerifyCodeProps> = ({ onCodeFilled }) => {
    const [code, setCode] = useState(Array(OTP_LENGTH).fill(''));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const [error, setError] = useState(null);

    const { isLoading, setLoading } = useLoadingStore();

    const navigation = useNavigation();

    const inputRefs = useRef<React.RefObject<TextInput>[]>(
        new Array(OTP_LENGTH).fill(null).map(() => React.createRef<TextInput>())
    );

    for (let i = 0; i < OTP_LENGTH; i++) {
        inputRefs.current[i] =
            inputRefs.current[i] || React.createRef<TextInput>();
    }

    useEffect(() => {
        const firstInput = inputRefs.current[0];
        if (firstInput.current) {
            setTimeout(() => firstInput.current?.focus(), 100);
        }
    }, []);

    const handleTextChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length === 1 && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].current?.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }, index) => {
        if (key === 'Backspace' && code[index] === '') {
            const prevIndex = index > 0 ? index - 1 : 0;
            if (prevIndex >= 0) {
                setCode(prevCode => {
                    const updatedCode = [...prevCode];
                    updatedCode[prevIndex] = '';
                    return updatedCode;
                });
                inputRefs.current[prevIndex].current?.focus();
            }
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.verifyOtp({
                phone: formatToE164(1, '555-555-5555'),
                token: code.join(''),
                type: 'sms',
            });

            if (error) throw error;

            navigation.navigate('Transactions');
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <View style={styles.container}>
            <Text style={styles.otpText}>Enter OTP Code</Text>
            <View style={styles.inputContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs.current[index]}
                        style={[
                            styles.input,
                            focusedIndex === index && styles.inputFocused,
                        ]}
                        onChangeText={text => handleTextChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        value={digit}
                        maxLength={1}
                        keyboardType="numeric"
                        accessibilityLabel={`input-otp-${index}`}
                        returnKeyType="done"
                        blurOnSubmit={false}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        selectionColor="blue"
                    />
                ))}
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : {},
                ]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Verify OTP</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    otpText: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: 240,
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        marginRight: 12,
    },
    inputFocused: {
        outlineColor: 'blue',
        borderColor: 'blue', // Or any other color
        borderWidth: 2, // Adjust the border width as needed
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonPressed: {
        opacity: 0.75,
    },
});

export default VerifyOTPCode;
