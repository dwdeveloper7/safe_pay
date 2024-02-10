import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RouterStacks';
import useActivePageStore from '../src/stores/useActivePageStore';
import useAuthStore from '../src/stores/useAuthStore';
import useLoadingStore from '../src/stores/useLoadingStore';
import useCheckUserRegistration from './hooks/useCheckUserRegistration';
import supabase from '../lib/supabase';

import Spinner from '../src/components/spinner';
import {
    setIsRegisteredFlag,
    getIsRegisteredFlag,
} from '../src/util/storageUtils';

type SignInScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

const AuthCheckWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const { session, setSession } = useAuthStore();
    const { isLoading, setLoading } = useLoadingStore();

    const {
        data: isRegistered,
        isLoading: isLoadingRegistrationCheck,
        error,
    } = useCheckUserRegistration();

    const checkAuth = async () => {
        setLoading(true);

        const {
            data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        if (!session) {
            setLoading(false);
            navigation.navigate('Login');
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (!isLoadingRegistrationCheck && !error) {
            if (!isRegistered) {
                navigation.navigate('Register');
            } else {
                navigation.navigate('Transactions'); // Or another authenticated route
            }
        }
    }, [isRegistered, isLoadingRegistrationCheck, error]);

    if (isLoading || isLoadingRegistrationCheck) return <Spinner />;

    return <>{children}</>;
};

export default AuthCheckWrapper;
