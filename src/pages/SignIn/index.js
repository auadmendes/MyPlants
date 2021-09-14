import React, { useState, useContext} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Alert,
} from 'react-native';

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/core';
import { Button } from '../../components/Button';


import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function SignIn() {
    const [isfocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    
    const [data, setData] = useState(null);

    const { signInUser } = useContext(AuthContext);


    const navigation = useNavigation();

    function handleSubmit() {
        if (email != null) {
            try {
                signInUser(email, password)

            } catch {
                Alert.alert('Não foi possível salvar o seu nome😭');
            }
        } else {

            Alert.alert('Me diga seu nome 🥲');
        }
    }

    function handleImputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleImputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value) {
        setIsFilled(!!value)
        setName(value);
        console.log(name);
    }

    function handleNextPageSignUp() {
        navigation.navigate('SignUP');
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😃'}
                                </Text>
                                <Text style={styles.title}>
                                    Você já tem uma conta? {'\n'}Me fala qual seu email.
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isfocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu email"
                                onBlur={handleImputBlur}
                                onFocus={handleImputFocus}
                                onChangeText={(value)=> setEmail(value)}
                                autoCompleteType="email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isfocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite sua senha"
                                onBlur={handleImputBlur}
                                onFocus={handleImputFocus}
                                onChangeText={(value)=> setPassword(value)}
                                autoCapitalize="none"
                            />
                            <View style={styles.footer}>
                                <Button title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                            <View style={styles.signUp}>
                                <TouchableOpacity onPress={handleNextPageSignUp}>
                                    <Text style={styles.signUpText}>
                                        Criar uma conta
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        margin: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    signUp: {
        marginTop: 10,
    },
    signUpText: {
        fontFamily: fonts.text,
        color: colors.green,
        fontSize: 16,
    }
});