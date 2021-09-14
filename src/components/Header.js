import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AuthContext } from '../contexts/auth';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const { user, LogoutUser } = useContext(AuthContext);
   
   function handleLogoutUser(){
    LogoutUser();
   }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{user.name}</Text>
            </View>
            <View>
                <TouchableOpacity
                onPress={handleLogoutUser}
                >
                    <Image style={styles.userImg} source={{uri: user.profile}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: getStatusBarHeight(),
        height: 200,
    },
    greeting: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 32,
    },
    userName: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 32,
        lineHeight: 40,
    },
    userImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})