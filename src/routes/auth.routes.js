import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import SignUP from '../pages/SignUp/index';
import SignIn from '../pages/SignIn/index';

import colors from '../styles/colors';

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white,
                },
                headerShown: false
            }}
        >
            <AuthStack.Screen
                name='Welcome'
                component={Welcome}
            />
            <AuthStack.Screen
                name='SignIn'
                component={SignIn}
            />
            <AuthStack.Screen
                name='SignUP'
                component={SignUP}
            />
            
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;