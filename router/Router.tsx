import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedRouter from './AuthenticatedRouter';

const Router = () => (
    <NavigationContainer>
        <AuthenticatedRouter />
    </NavigationContainer>
);

export default Router;
