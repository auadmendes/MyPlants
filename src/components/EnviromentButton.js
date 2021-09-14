import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import firebase from '../services/firebaseconnection';
import firestore from 'firebase/firestore';

import { AuthContext } from "../contexts/auth";

import colors from "../styles/colors";
import fonts from "../styles/fonts";



export function EnviromentButton() {
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const { environments, getEnvironments, getEnviromentSelected } = useContext(AuthContext);

    useEffect(() => {
        getEnvironments();
    }, [])

    function handleEnviromentSelected(environment) {

        setEnviromentSelected(environment);
        getEnviromentSelected(environment);
    }

    return (

        <FlatList
            data={environments}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleEnviromentSelected(item.key)}
                    active={item.key == enviromentSelected}
                   
                    style={[
                       item.key == enviromentSelected ? styles.containerActive : styles.container
                    ]}
                >
                    <Text style={[
                       item.key == enviromentSelected ? styles.titleActive : styles.title
                    ]}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.enviromentList}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 5,
        marginHorizontal: 5,
    },
    containerActive: {
        backgroundColor: colors.green_light,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 5,
        marginHorizontal: 5,
    },
    title: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 17
    },
    titleActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 35,
        marginVertical: 5,
        paddingRight: 30,
        
    },
    branco: {
        backgroundColor: colors.white,
        color: 'black',
    },
    preto: {
        backgroundColor: 'black',
        color: colors.white
    }
});