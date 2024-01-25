import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import TopNav from './TopNav';
import BottomNavigationBar from './BottomNavigationBar';

import SignupForm from '../../signup/Signup';
import VerifyCode from '../../signup/VerifyOTPCode';
import LoginComponent from '../../login/components/Login';

const homeImage = require('../../../../assets/images/header_final.png');
const homeFooterImage = require('../../../../assets/images/footer_final.png');

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        flex: 1,
    },
    upperContainer: {
        flex: 1, // Take up as much space as possible within the container
        justifyContent: 'flex-start', // Align content to the top
    },
    middleContainer: {
        flex: 1, // Take up as much space as possible within the container
        // You can adjust justifyContent and alignItems for the middle container as needed
    },
    bottomContainer: {
        justifyContent: 'flex-end', // Align content to the bottom
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

const HomePage: React.FC = () => (
    <View style={styles.container}>
        <Text>Hi</Text>
    </View>
);

export default HomePage;
