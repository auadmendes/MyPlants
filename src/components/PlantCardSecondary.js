import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { AuthContext } from '../contexts/auth';

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Feather } from '@expo/vector-icons';


export const PlantCardSecondary = ({ data, handleRemove, ...rest }) => {
    const { dateTimeNow } = useContext(AuthContext);
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white}/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={[data.dataTimeNotification <= dateTimeNow? styles.containerOver : styles.container]}
                {...rest}
            >
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50}
                />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.detailsl}>
                    <Text style={styles.timeLabel}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.dataTimeNotification}
                    </Text>
                </View>
            </RectButton >
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    containerOver: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: colors.shape,
        borderColor: colors.red,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    detailsl: {
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15,
    }
});