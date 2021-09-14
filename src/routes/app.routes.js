import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import  Home  from '../pages/Home/index';
import MyPlants from '../pages/MyPlants';
import PlantSave  from '../pages/PlantSave/index';

import colors from '../styles/colors';
import AuthBottonRoutes from './tab.routes';

const AppStack = createStackNavigator();

function AppRoutes() {
    return (
        <AppStack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white,
                },
                headerShown: false
            }}
        >
            <AppStack.Screen
                name='Home'
                component={AuthBottonRoutes}
            />
            <AppStack.Screen
                name='PlantSave'
                component={PlantSave}
            />
            <AppStack.Screen
                name='MyPlants'
                component={AuthBottonRoutes}
            />
        </AppStack.Navigator>
    )
}

export default AppRoutes;