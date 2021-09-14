import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../styles/colors';
import Home from '../pages/Home';
import PlantSave from '../pages/PlantSave';
import MyPlants from '../pages/MyPlants';
const AppTab = createBottomTabNavigator();

const AuthBottonRoutes = () => {
    return (
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.green,
                tabBarInactiveTintColor: colors.heading,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingVertical: 20,
                    height: 88
                },
                headerShown: false
            }}
        >
            <AppTab.Screen
                name="Nova Planta"
                component={Home}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons name="add-circle-outline" size={size} color={color} />
                    ))
                }}
            />
            <AppTab.Screen
                name="Minhas Plantas"
                component={MyPlants}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons name="format-list-bulleted" size={size} color={color} />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
}

export default AuthBottonRoutes;