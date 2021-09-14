import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/profileMan.json';

export function Load() {
    return (
        <View style={styles.container}>
            <LottieView
                source={loadAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    }
})