import React from 'react';
import TopNav from './TopNav';
import BottomNavigationBar from './BotttomNavigationBar';
import { View, Text, Image, StyleSheet } from 'react-native';
const homeImage = require('../../../../assets/images/header_final.png');
const homeFooterImage = require('../../../../assets/images/footer_final.png');

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: '#FEF6E5',
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

const HomePage: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* <TopNav /> */}
            <View style={styles.upperContainer}>
                <Image
                    source={homeImage}
                    style={{ width: '100%', height: 155 }}
                />
            </View>
            {/* <View style={styles.middleContainer}>
                <Text style={styles.headerText}>Peace Pay</Text>
            </View> */}

            <View style={styles.middleContainer}>
                <Text>main content</Text>
            </View>

            <View style={styles.bottomContainer}>
                <Image
                    source={homeFooterImage}
                    style={{ width: '100%', height: 144 }}
                />
            </View>
            <BottomNavigationBar />
        </View>
    );
};

export default HomePage;
