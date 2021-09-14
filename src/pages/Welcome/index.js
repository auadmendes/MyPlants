import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';

import wateringImg from '../../assets/watering.png'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';



export default function Welcome() {

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('SignIn');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapp}>
                <Text style={styles.title}>
                    Gerencie {'\n'} suas plantas de {'\n'} forma fácil
                </Text>
                <Image
                    style={styles.image}
                    source={wateringImg}
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. {'\n'}
                    Nós cuidamos de lembrar você
                    sempre que precisar.
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={handleStart}
                >
                    <Entypo
                        name="chevron-thin-right" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const dHeight = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34,
    },
    image: {
        height: dHeight
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24
    },
});
