import useLoadingStore from '../../../stores/useLoadingStore';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Spinner from '../../../components/spinner';
import { useForm, Controller } from 'react-hook-form';
import {
    initiateOtpVerification,
    formatToE164,
} from '../../../util/supabase/util';

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
const LoginComponent: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { isLoading, setLoading } = useLoadingStore();

    const onSubmit = async (loginData: { phone: string }) => {
        const { phone } = loginData;
        const formattedNumber = formatToE164(1, phone);

        try {
            setLoading(true);
            await initiateOtpVerification(formattedNumber);
            setLoading(false);
            onSuccess();
        } catch (error) {
            setLoading(false);
            console.error('Login error', error);
        }
    };

    // if (isLoading) return <Spinner />;

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {/* Email/Phone Input Field */}
                <View style={styles.inputContainer}>
                    <Feather name="mail" size={20} style={styles.icon} />
                    <Controller
                        control={control}
                        rules={{
                            required: 'Contact information is required',
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
                {errors.phone && (
                    <Text style={styles.errorText}>
                        Enter a valid email or phone number.
                    </Text>
                )}

                {/* Login Button */}
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#0056b3' : '#007bff',
                        },
                    ]}
                    accessibilityLabel="Login"
                    accessibilityHint="Login to your account"
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginComponent;
