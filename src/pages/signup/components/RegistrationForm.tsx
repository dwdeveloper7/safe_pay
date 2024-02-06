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

import useAuthStore from '../../../stores/useAuthStore';

import Button from '../../../components/Button';

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
        borderColor: 'red',
        borderWidth: 4,
    },
});

enum RegistrationStep {
    EnterUsername,
    EnterDateOfBirth,
}

const RegistrationForm = () => {
    const { session } = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [currentStep, setCurrentStep] = useState<RegistrationStep>(
        RegistrationStep.EnterUsername
    );
    const totalSteps = 2;

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const generateRegisterUserPayload = formData => {
        const id = session.user.id;

        return JSON.stringify({ id, ...formData });
    };

    const onSubmit = data => {
        const registerUserPayload = generateRegisterUserPayload(data);
    };

    return (
        <Modal style={styles.container}>
            <View style={styles.formContainer}>
                {currentStep === RegistrationStep.EnterUsername && (
                    <UserNameStep control={control} errors={errors} />
                )}
                {currentStep === RegistrationStep.EnterDateOfBirth && (
                    <DateOfBirthStep control={control} errors={errors} />
                )}

                {currentStep < totalSteps ? (
                    <Button onPress={goToNextStep} title="Next" size="medium" />
                ) : (
                    <Button
                        title="Finish"
                        onPress={handleSubmit(onSubmit)}
                        size="medium"
                    />
                )}
            </View>
        </Modal>
    );
};

export default RegistrationForm;
