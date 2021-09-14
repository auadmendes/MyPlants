import React from "react";
import {
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const ImageCard = ({ data, ...rest }) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <Image
                source={{ uri: data.urls.small }}
                style={[styles.plantImages, {width: 145, height: 120}]}
            />
            <Text style={styles.text}>
                {data.user.name} ♥️ {data.likes}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 1,
        alignItems: 'center',
        margin: 10,
       
    },
    text: {
        color: colors.body_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },
    plantImages: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 1,
        alignItems: 'center',
    }
});