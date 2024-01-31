import 'react-native-url-polyfill/auto';
import { User } from '@supabase/supabase-js';
import supabase from '../../../lib/supabase';

// Function to initiate OTP verification

export const initiateOtpVerification = async (
    loginField: { phone: string } | { email: string }
): Promise<User | null> => {
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            ...loginField,
        });

        if (error) throw new Error(error.message);

        return data.user;
    } catch (error) {
        throw error;
    }
};

export const resendPhoneOtp = async (phone: string) => {
    try {
        const { data, error } = await supabase.auth.resend({
            type: 'sms', // Specify the type as 'sms' for phone OTP
            phone: '15555555555', // Replace with the actual phone number
        });

        if (error) {
            console.error('Error while resending phone OTP:', error.message);
            // erorr returned from supabase, incorect phone for instance
        } else {
            // do something with data returned
            console.log('DATA', data);
        }
    } catch (error) {
        console.error('Error:', error.message);
        // request/network related error
    }
};
export const formatToE164 = (countryCode: number, phoneNumber: string) => {
    const strippedNumber = phoneNumber.replace(/[^\d]/g, '');
    return `+${countryCode}${strippedNumber}`;
};
