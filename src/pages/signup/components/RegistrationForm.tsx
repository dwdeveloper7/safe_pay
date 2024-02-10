import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { View, Modal, StyleSheet } from 'react-native';

import useAuthStore from '../../../stores/useAuthStore';

import { setIsRegisteredFlag } from '../../../util/storageUtils';

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

    const generateRegisterUserPayload = (formData: {
        dateOfBirth: string;
        username: string;
    }) => {
        const id = session.user.id;

        return { id, ...formData };
    };

    const postUserData = async (payload: {
        id: string;
        dateOfBirth: string;
        username: string;
    }) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(generateRegisterUserPayload(payload)),
            });

            return response.json();
        } catch (error) {
            throw new Error('Failed to post data');
        }
    };

    const mutation = useMutation({
        mutationFn: postUserData,
        onSuccess: async data => {
            try {
                await setIsRegisteredFlag(true);
                console.log('Data posted successfully:', data);
            } catch (error) {
                console.error('Error setting registered flag:', error);
            }
        },
        onError: error => {
            // Handle error
            console.error('Error posting data:', error);
        },
    });

    const apiUrl = 'http://192.168.0.187:8080/api/v1/users';

    const onSubmit = data => {
        const registerUserPayload = generateRegisterUserPayload(data);
        mutation.mutate(registerUserPayload);
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
