import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Button({ title, ...rest } ){
    return(
        <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.7}
        {...rest}
        >
            <Text style={styles.buttonText}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    },
})