import React from 'react';
import AuthCheckWrapper from './AuthCheckWrapper';
import RouterStacks from './RouterStacks';
import BottomNavigationBar from '../src/pages/homepage/components/BottomNavigationBar';
const AuthenticatedRouter = () => (
    <AuthCheckWrapper>
        {RouterStacks()}
        {/* <BottomNavigationBar /> */}
    </AuthCheckWrapper>
);

export default AuthenticatedRouter;
