import 'react-native-url-polyfill/auto';
import { User } from '@supabase/supabase-js';
import supabase from '../../../lib/supabase';

// Function to initiate OTP verification

export const initiateOtpVerification = async (
    phone: string
): Promise<User | null> => {
    try {
        const { data, error } = await supabase.auth.signInWithOtp({ phone });

        if (error) throw new Error(error.message);

        return data.user;
    } catch (error) {
        throw error;
    }
};

export const formatToE164 = (countryCode: number, phoneNumber: string) => {
    const strippedNumber = phoneNumber.replace(/[^\d]/g, '');
    return `+${countryCode}${strippedNumber}`;
};
