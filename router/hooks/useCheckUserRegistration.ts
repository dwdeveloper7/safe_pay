// useCheckUserRegistration.js
import { useQuery } from '@tanstack/react-query';
import { getIsRegisteredFlag } from '../../src/util/storageUtils';
import AppSecureLocalStorage from '../../lib/largeSecureStore';
import { checkUserExists } from '../../src/pages/signup/VerifyOTPCode';

import useAuthStore from '../../src/stores/useAuthStore';

const useCheckUserRegistration = () => {
    const { session } = useAuthStore();

    const uuid = session?.user.id;
    const fetchRegistrationStatus = async () => {
        // Check local storage first
        const localStatus = await getIsRegisteredFlag();
        console.log('local', localStatus);
        if (localStatus !== null) {
            return localStatus === 'true';
        }

        // If not in local storage, fetch from API
        const res = await checkUserExists(uuid);
        const apiStatus = res.data.exists;

        await AppSecureLocalStorage.setItem('isRegistered', `${apiStatus}`);

        return apiStatus;
    };

    return useQuery({
        queryKey: ['registrationStatus', uuid],
        queryFn: fetchRegistrationStatus,
        enabled: !!uuid,
    });
};

export default useCheckUserRegistration;
