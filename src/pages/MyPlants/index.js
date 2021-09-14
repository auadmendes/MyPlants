import React, { useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/auth'
import { removePlant } from '../../libs/storage';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import waterdrop from '../../assets/waterdrop.png';
import { Header } from '../../components/Header';
import { PlantCardSecondary } from '../../components/PlantCardSecondary';
import { Load } from '../../components/Load';
import format from 'date-fns/format';


export default function MyPlants() {

    const { minhasPlantas, getLoadPlanta, notificationHour} = useContext(AuthContext);

    async function getListPlant() {
        getLoadPlanta();
    }

    function handleRemove(plant) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😥',
                onPress: async () => {
                    try {
                        await removePlant(plant.id)
                        Alert(`${plant.name} removida 😥`)
                    } catch (error) {
                        //Alert.alert('Não foi possível remover! 😥');
                    }
                }
            }
        ])
    }

    async function loadPlanta() {
        try {
            const data = await AsyncStorage.getItem('@plantmanager:plants');
            const plants = data ? (JSON.parse(data)) : {};

            const plantsSorted = Object
                .keys(plants)
                .map((plant) => {
                    return {
                        ...plants[plant].data,
                    }
                })

            setPlantList(plantsSorted);

            const firstData = new Date(plantsSorted[0]);
            const firstName = firstData.dataTimeNotification;
                
                console.log('NotificationTime', format(firstName));

            return plantsSorted;

        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {

    }, [minhasPlantas])

    if (!notificationHour)
        return <Load />

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {notificationHour}  
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={minhasPlantas}
                    keyExtractor={(item) => (item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary data={item}
                            handleRemove={() => { handleRemove(item) }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background,
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify',
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
})