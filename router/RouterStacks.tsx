import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigationBar from '../src/pages/homepage/components/BottomNavigationBar';

import { HomePage } from '../src/pages/homepage';
import { AboutUs } from '../src/pages/about';
import { PageNotFound } from '../src/pages/404';
import { Profile } from '../src/pages/profile';
import { Transactions } from '../src/pages/transactions';
import { Login } from '../src/pages/login/index';
import Auth from '../src/pages/signup/auth';
import SignupForm from '../src/pages/signup/Signup';

export const routeNames = [
    'Home',
    'About',
    'NotFound',
    'Profile',
    'Transactions',
    'SignIn',
    'Register',
] as const;

export type RootStackParamList = {
    Home: undefined;
    About: undefined;
    NotFound: undefined;
    Dev: undefined;
    Profile: undefined;
    Transactions: undefined;
    Login: undefined;
    Register: undefined;
    // Add other screens and their parameter types as needed
};

export type AppRoutes = keyof RootStackParamList;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

const Stack = createStackNavigator<RootStackParamList>();

const RouterStacks = () => (
    <>
        <Stack.Navigator initialRouteName="Register">
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
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Transactions"
                component={Transactions}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Auth}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={SignupForm}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        <BottomNavigationBar visible={true} />
    </>
);

export default RouterStacks;
