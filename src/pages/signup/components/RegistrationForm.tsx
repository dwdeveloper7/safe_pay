import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    View,
    TextInput,
    Text,
    Pressable,
    Modal,
    StyleSheet,
} from 'react-native';

import { DateOfBirthStep, UserNameStep } from './Steps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f7',
    },
});

enum RegistrationStep {
    EnterUsername,
    EnterDateOfBirth,
}

const RegistrationForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 2;

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onSubmit = data => {
        console.log(data); // Handle form submission
    };

    return (
        <Modal style={styles.container}>
            <View style={styles.formContainer}>
                {currentStep === 1 && (
                    <UserNameStep control={control} errors={errors} />
                )}
                {currentStep === 2 && (
                    <DateOfBirthStep control={control} errors={errors} />
                )}

                {currentStep < totalSteps ? (
                    <Pressable onPress={goToNextStep} style={styles.button}>
                        <Text style={styles.buttonText}>Next</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </Pressable>
                )}
            </View>
        </Modal>
    );
};

export default RegistrationForm;
