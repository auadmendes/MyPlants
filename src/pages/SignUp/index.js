import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import firebase from 'firebase';

import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../contexts/auth';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Button } from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { Load } from '../../components/LoadProfile';

export default function SignUP() {
    const [isfocused, setIsFocused] = useState(false); //name
    const [isFilled, setIsFilled] = useState(false); //name

    const [isfocusedEmail, setIsFocusedEmail] = useState(false); //email
    const [isFilledEmail, setIsFilledEmail] = useState(false); //email

    const [isfocusedPassword, setIsFocusedPassword] = useState(false); //email
    const [isFilledPasword, setIsFilledPassword] = useState(false); //email

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { signUpUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const [imageUploading, setImageUploading] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('Choose a photo');
    const [imageProfile, setImageProfile] = useState();

    const [image, setImage] = useState(null);

    function handleImputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);

    }
    function handleImputBlurEmail() {
        setIsFocusedEmail(false);
        setIsFilledEmail(!!email);
    }
    function handleImputBlurPassword() {
        setIsFocusedPassword(false);
        setIsFilledPassword(!!password);
    }
    function handleImputFocusName() {
        setIsFocused(true);

    }
    function handleImputFocusEmail() {
        setIsFocusedEmail(true);
    }
    function handleImputFocusPasword() {
        setIsFocusedPassword(true);
    }
    function handleInputChangeName(value) {
        setIsFilled(!!value)
        setName(value);
    }
    function handleInputChangeEmail(value) {

        setIsFilledEmail(!!value)
        setEmail(value);
    }
    function handleInputChangePasword(value) {
        setIsFilledPassword(!!value)
        setPassword(value);
    }

    async function handleSubmit() {
        if (!name){
            return Alert.alert('Me diz como chamar você 🥲');
        }
        if (!image) {
            Alert.alert('Atenção!', `Você realmente quer se cadastrar sem uma fotinha?`, [
                {
                    text: 'Não 🙏',
                    style: 'cancel'
                },
                {
                    text: 'Sim 😥',
                    onPress: async () => {
                        setImage(null);
                    }
                }
            ]);
        }
        await uploadImage();
        try {
            if(imageProfile != undefined){
                
                signUpUser(email, password, name, imageProfile);
                console.log('Usuário Em SignUp:', email, password, name, imageProfile);
            }else{
                alert('Mostrar carregamento.....');
            }

        } catch {
            Alert.alert('Não foi possível salvar o seu nome😭');
        }

    }

    function uploadProfile() {
        if (!image) {
            Alert.alert('Atenção!', `Você realmente quer se cadastrar sem uma fotinha?`, [
                {
                    text: 'Não 🙏',
                    style: 'cancel'
                },
                {
                    text: 'Sim 😥',
                    onPress: async () => {
                        setImage(null);
                    }
                }
            ]);
        }
        uploadImage();
    }

    async function uploadImage() {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network Request Failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });
        const ref = firebase.storage().ref().child(new Date().toISOString())
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
            setImageUploading(true)
        },
            (error) => {
                setImageUploading(false);
                console.log(error)
                blob.close()
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL()
                    .then((url) => {
                        setImageUploading(false);
                        setImageProfile(url);
                        console.log('Download URL: ', url)
                        blob.close();
                        return url;
                    })
            }
        );
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

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
                                {/* <Text style={styles.emoji}>
                                    {isFilled ? '🥰' : '😃'}
                                </Text> */}
                                <TouchableOpacity title={buttonTitle} onPress={pickImage}>
                                    {!image ? <Load /> : <Image source={{ uri: image }} style={styles.profilePhoto} />}
                                </TouchableOpacity>
                                <Text style={styles.title}>
                                    Vamos criar uma conta {'\n'}para você?
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isfocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleImputBlur}
                                onFocus={handleImputFocusName}
                                onChangeText={handleInputChangeName}
                                autoCompleteType="name"
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isfocusedEmail || isFilledEmail) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu email"
                                onBlur={handleImputBlurEmail}
                                onFocus={handleImputFocusEmail}
                                onChangeText={handleInputChangeEmail}
                                autoCompleteType="email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    (isfocusedPassword || isFilledPasword) && { borderColor: colors.red }
                                ]}
                                placeholder="Digite uma senha"
                                onBlur={handleImputBlurPassword}
                                onFocus={handleImputFocusPasword}
                                onChangeText={handleInputChangePasword}
                                secureTextEntry={true}
                                keyboardAppearance="dark"
                            />
                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={handleSubmit} />
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
    profilePhoto: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: colors.green,
        borderRadius: 100,
    },

});