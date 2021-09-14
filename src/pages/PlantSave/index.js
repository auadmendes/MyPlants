import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import waterdrop from '../../assets/waterdrop.png';
import { Button } from '../../components/Button';


import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { SvgFromUri } from 'react-native-svg';

import { useNavigation } from '@react-navigation/core';
import { format } from 'date-fns';

import { Entypo } from '@expo/vector-icons';

import { savePlant } from '../../libs/storage';

export default function PlantSave({ route }) {

    const { plant } = route.params;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    const [dateTimeNow, setDateTimeNow] = useState(new Date());
    const navigation = useNavigation();


    const [date, setDate] = useState(new Date(1598051730000));

    function goBackPlantSelect() {
        navigation.goBack();
    }

    function handleChangeTime(event, dateTime) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }
        if (dateTime < dateTimeNow) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }
        if (dateTime)
            setSelectedDateTime(dateTime);
        //alert(format(dateTime, 'HH:mm'));
    }

    function handleOpenDatetimePickerForAndroid(dateTime) {
        setShowDatePicker(oldstate => !oldstate);
    }

    function handleSave() {
        savePlant({
            ...plant,
            dataTimeNotification: format(selectedDateTime, 'HH:mm')
        });
       navigation.navigate('MyPlants');
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >

            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <TouchableOpacity onPress={goBackPlantSelect}>
                        <Entypo
                            name="chevron-thin-left" style={styles.buttonIcon} />
                    </TouchableOpacity>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>

                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLable}>
                        Escolha o melhor horário para ser lembrado.
                    </Text>

                    {
                        showDatePicker && (
                            <DateTimePicker
                                value={selectedDateTime}
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                            />
                        )
                    }
                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                onPress={handleOpenDatetimePickerForAndroid}
                                style={styles.dateTimePickerButton}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    <Button
                        title="Cadastrar Planta"
                        onPress={handleSave}
                    />
                </View>
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 17,
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 70,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLable: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
    buttonIcon: {
        fontSize: 30,
        alignItems: 'center',
        color: colors.green,
        marginBottom: 10,
        marginTop: 45,
    },
});