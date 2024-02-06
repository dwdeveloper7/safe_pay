import { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
});
const apiUrl = 'http://192.168.0.187:8080/api/v1/users';
export const UserNameStep: React.FC<{ control: any; errors: any }> = ({
    control,
    errors,
}) => {
    const checkUsernameAvailability = async username => {
        try {
            const response = await fetch(
                `${apiUrl}/check-username/${username}`
            );

            if (!response.ok) {
                throw new Error(
                    `API responded with status code ${response.status}`
                );
            }

            return response.json();
        } catch (error) {
            console.error(
                'Error checking username availability:',
                error.message
            );
            throw error;
        }
    };

    const [username, setUsername] = useState('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['checkUsername', username],
        queryFn: () => checkUsernameAvailability(username),
        enabled: !!username && username.length > 3,
    });

    return (
        <View style={styles.inputContainer}>
            <Controller
                control={control}
                name="username"
                rules={{ required: 'username is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={text => {
                            setUsername(text);
                            onChange(text);
                        }}
                        value={value}
                        placeholder="username"
                        style={styles.input}
                        autoFocus={true}
                        multiline={true}
                        selectionColor="black"
                    />
                )}
            />

            {isLoading && <Text>Checking...</Text>}
            {username.length >= 4 && data?.data?.usernameAvailable && (
                <Text style={{ color: 'green' }}>Available</Text>
            )}
            {username.length >= 4 && data && !data.data.usernameAvailable && (
                <Text style={{ color: 'red' }}>Not Available</Text>
            )}
            {isError && <Text style={{ color: 'red' }}>{error.message}</Text>}
        </View>
    );
};

export const DateOfBirthStep = ({ control, errors }) => {
    const [dateValue, setDateValue] = useState('');

    const formatTextAsDate = text => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D+/g, '');

        // Extract parts of the date based on the length of the input
        const month = cleaned.slice(0, 2);
        const day = cleaned.length > 2 ? cleaned.slice(2, 4) : '';
        const year = cleaned.length > 4 ? cleaned.slice(4, 8) : '';

        // Construct the date string with slashes
        let formattedDate = month;
        if (month.length === 2 && day) {
            formattedDate += `/${day}`;
        }
        if (day.length === 2 && year) {
            formattedDate += `/${year}`;
        }
        return formattedDate;
    };

    return (
        <View style={styles.inputContainer}>
            <Controller
                control={control}
                name="dateOfBirth"
                rules={{ required: 'Date of Birth is required' }}
                render={({ field: { onChange, onBlur, value } }) => {
                    const handleDateChange = text => {
                        // Format the text (implement formatTextAsDate)
                        const formattedText = formatTextAsDate(text);

                        setDateValue(formattedText); // Update local state
                        onChange(formattedText); // Update React Hook Form state
                    };

                    return (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={handleDateChange}
                            value={dateValue}
                            placeholder="MM/DD/YYYY"
                            style={styles.input}
                            keyboardType="numeric"
                            autoFocus={true}
                            multiline={true}
                            selectionColor="black"
                        />
                    );
                }}
            />

            {errors.dateOfBirth && (
                <Text style={styles.errorText}>
                    {errors.dateOfBirth.message}
                </Text>
            )}
        </View>
    );
};

// export const AddressStep = ({ control, errors }) => (
//     <View>
//         <Controller
//             control={control}
//             name="address"
//             rules={{ required: 'Address is required' }}
//             render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                     onBlur={onBlur}
//                     onChangeText={onChange}
//                     value={value}
//                     placeholder="Address"
//                     style={styles.input}
//                 />
//             )}
//         />
//         {errors.address && (
//             <Text style={styles.errorText}>{errors.address.message}</Text>
//         )}
//     </View>
// );
