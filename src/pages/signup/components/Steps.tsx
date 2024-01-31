import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const styles = StyleSheet.create({
    container: {
        // Container styles (flex, align, etc.)
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
    // If you need a tail for the thinking cloud, you can add styles here
});

export const UserNameStep = ({ control, errors }) => (
    <View style={styles.inputContainer}>
        <Controller
            control={control}
            name="username"
            rules={{ required: 'userame is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="username"
                    style={styles.input}
                    autoFocus={true}
                    multiline={true}
                    selectionColor="black"
                />
            )}
        />
        <View style={styles.tail} />
        {errors.name && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
        )}
    </View>
);

export const DateOfBirthStep = ({ control, errors }) => (
    <View style={styles.inputContainer}>
        <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: 'Date of Birth is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="MM/DD/YYYY"
                    style={styles.input}
                    keyboardType="numeric"
                    autoFocus={true}
                    multiline={true}
                    selectionColor="black"
                />
            )}
        />
        <View style={styles.tail} />
        {errors.dateOfBirth && (
            <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>
        )}
    </View>
);

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
