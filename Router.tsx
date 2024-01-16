import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigationBar from './src/pages/homepage/components/BottomNavigationBar';
import { RouteButtons } from './src/pages/dev';
import { HomePage } from './src/pages/homepage';
import { AboutUs } from './src/pages/about';
import { PageNotFound } from './src/pages/404';
import { Profile } from './src/pages/profile';
import { Transactions } from './src/pages/transactions';

export const routeNames = [
    'Home',
    'About',
    'NotFound',
    'Dev',
    'Profile',
    'Transactions',
] as const;

export type RootStackParamList = {
    Home: undefined;
    About: undefined;
    NotFound: undefined;
    Dev: undefined;
    Profile: undefined;
    Transactions: undefined;
    // Add other screens and their parameter types as needed
};

export type AppRoutes = keyof RootStackParamList;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

const Stack = createStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Transactions">
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="About"
                    component={AboutUs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NotFound"
                    component={PageNotFound}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dev"
                    component={RouteButtons}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Transactions"
                    component={Transactions}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
            <BottomNavigationBar />
        </NavigationContainer>
    );
};

export default Router;
