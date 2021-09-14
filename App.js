import React, { useEffect } from 'react';

import Routes from './src/routes/index';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import Authprovider from './src/contexts/auth';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  }
  return (
    <NavigationContainer>
      <Authprovider>
        <Routes />
      </Authprovider>
    </NavigationContainer>

  );
}

