import { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import PageHeader from './components/PageHeader';
import Button from '../../components/Button';
import Spinner from '../../components/spinner';
import supabase from '../../../lib/supabase';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        marginLeft: 20,
        backgroundColor: 'white',
    },
});

const Profile: React.FC = () => {
    const navigation = useNavigation();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignout = async () => {
        setIsSigningOut(true); // Indicate that sign-out is in progress

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout failed:', error.message);
            setIsSigningOut(false);
            return;
        }

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    if (isSigningOut) return <Spinner />;

    return (
        <View style={styles.container}>
            <PageHeader />
            <View style={styles.buttonContainer}>
                <Button title={'Logout'} onPress={handleSignout} size="LG" />
            </View>
        </View>
    );
};

export default Profile;
