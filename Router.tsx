import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RouteButtons } from './src/pages/dev';
import { HomePage } from './src/pages/homepage';
import { AboutUs } from './src/pages/about';
import { PageNotFound } from './src/pages/404';

export const routeNames = ['Home', 'About', 'NotFound', 'Dev'] as const;

export type RootStackParamList = {
    Home: undefined;
    About: undefined;
    NotFound: undefined;
    Dev: undefined;
    // Add other screens and their parameter types as needed
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

const Stack = createStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dev">
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="About" component={AboutUs} />
                <Stack.Screen name="NotFound" component={PageNotFound} />
                <Stack.Screen name="Dev" component={RouteButtons} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
