import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RouterStacks';
import useActivePageStore from '../src/stores/useActivePageStore';
import useAuthStore from '../src/stores/useAuthStore';
import useLoadingStore from '../src/stores/useLoadingStore';
import supabase from '../lib/supabase';

type SignInScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

const AuthCheckWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const navigation = useNavigation<SignInScreenNavigationProp>();

    const { setSession } = useAuthStore();

    const { setLoading } = useLoadingStore();

    useEffect(() => {
        setLoading(true);

        supabase.auth.getSession().then(({ data: { session } }) => {
            setLoading(false);
            if (!session) {
                navigation.navigate('Login');
            }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);

                if (!session) {
                    navigation.navigate('Login');
                }
            }
        );
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return <>{children}</>;
};

export default AuthCheckWrapper;
