import { useState } from 'react';
import VerifyCode from './VerifyOTPCode';
import { Login } from '../login/index';
import { Modal } from 'react-native';

enum AuthStep {
    EnterSMS,
    EnterOTP,
}

const Auth = () => {
    const [currentStep, setCurrentStep] = useState(AuthStep.EnterSMS);

    const incrementStep = () => {
        setCurrentStep(currentStep + 1);
    };
    return (
        <Modal>
            {currentStep === AuthStep.EnterSMS ? (
                <Login onSuccess={incrementStep} />
            ) : currentStep === AuthStep.EnterOTP ? (
                <VerifyCode onCodeFilled={() => {}} />
            ) : null}
        </Modal>
    );
};

export default Auth;
