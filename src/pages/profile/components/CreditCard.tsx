import { useState } from 'react';
import { CreditCardInput } from 'react-native-credit-card-input';
import { StyleSheet, View } from 'react-native';

type CreditCardFormStatus = 'incomplete' | 'invalid' | 'valid';

type CreditCardFormData = {
    valid: boolean;
    values: {
        number: string;
        expiry: string;
        cvc: string;
        type:
            | 'visa'
            | 'master-card'
            | 'american-express'
            | 'diners-club'
            | 'discover'
            | 'jcb'
            | 'unionpay'
            | 'maestro'
            | null;
        name: string;
        postalCode: string;
    };
    status: {
        number: CreditCardFormStatus;
        expiry: CreditCardFormStatus;
        cvc: CreditCardFormStatus;
        name: CreditCardFormStatus;
        postalCode: CreditCardFormStatus;
    };
};

const CreditCard = () => {
    const [cardData, setCardData] = useState<CreditCardFormData | null>(null);

    const handleCardChange = (form: CreditCardFormData) => {
        setCardData(form);
        console.log(form);
    };

    return (
        <View style={styles.container}>
            <CreditCardInput
                onChange={handleCardChange}
                requiresName
                requiresCVC
                requiresPostalCode
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        width: 'auto',
        borderBottom: 'none',
        minWidth: 90,
        maxWidth: 290,
    },
    inputContainer: {
        borderWidth: 0,
    },
});

export default CreditCard;
