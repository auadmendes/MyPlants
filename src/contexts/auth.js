import React, { createContext, useEffect, useState } from 'react';
import firebase from '../services/firebaseconnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import format from 'date-fns/format';
export const AuthContext = createContext({});

function Authprovider({ children }) {

    const [user, setUser] = useState(null);
    const [environments, setEnvironments] = useState([]);
    const [plants, setPlants] = useState([]);

    const ref = firebase.firestore().collection('plants_environments');
    const refPlants = firebase.firestore().collection('plants');
    const refUsers = firebase.firestore().collection('users');

    const [filteredPlants, setFilteredPlants] = useState([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [getPlantToSave, setGetPlantToSave] = useState([]);
    const [unsplashSearch, setUnsplahSearch] = useState();
    const navigation = useNavigation();
    const [minhasPlantas, setMinhasPlantas] = useState([]);
    const [dateTimeNow, setDateTimeNow] = useState();
    const [notificationHour, setNotificationHour] = useState();

    const [loadPlants, setLoadPlants] = useState([]);

    async function signInUser(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                refUsers.where('uid', '==', uid)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let data = {
                                name: doc.data().name,
                                email: doc.data().email,
                                uid: doc.data().uid,
                                profile: doc.data().profile
                            }
                            setUser(data);
                            storageUser(data);
                            console.log(user);
                        })
                    });


                // console.log('REF: ' + refUsers);
            })
            .catch((error) => {
                alert('Erro: ' + error)
            })
    }

    //cadstro de usuário
    async function signUpUser(email, password, name, imageProfile) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                console.log(uid);
                firebase.firestore().collection('users').add({
                    name: name,
                    email: email,
                    uid: uid,
                    profile: imageProfile
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                            profile: profile
                        };
                        setUser(data);
                        storageUser(data);
                        console.log('Data SignUPUser', data);
                    })
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@plantmanager:user', JSON.stringify(data));
    }

    async function LogoutUser() {
        await AsyncStorage.removeItem('@plantmanager:user');
        setUser(null);
    }

    //busca os locais onde as plantas podem ficar
    function getEnvironments() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...items
            ]);
        })
    }
    //get all the plants on db
    async function getPlants() {
        refPlants.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPlants(items);
            setFilteredPlants(items);
        });
    }

    function getEnviromentSelected(environment) {
        setEnviromentSelected(environment);
        if (environment == 'all')

            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );
        if (environment === 'vegetable_garden') {
            setUnsplahSearch(' vegetable');
            console.log(environment + ' vegetable garden');
        }
        setUnsplahSearch(environment + ' plants')
        setFilteredPlants(filtered);
    }

    async function getSavePlant(plantSave) {
        console.log('Planta pronta para salvar' + plantSave);
        setGetPlantToSave(plantSave);
        navigation.navigate('PlantSave');
    }

    async function getLoadPlant() {
        try {
            const myLoadPlants = await AsyncStorage.getItem('@plantmanager:plants');
            const plantsLoaded = myLoadPlants ? (JSON.parse(myLoadPlants)) : {};
            setLoadPlants(plantsLoaded);

        } catch (error) {
            throw new Error(error);
        }
    }

    async function getLoadPlanta() {
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

            //setMinhasPlantas(plantsSorted);


            const sortted = plantsSorted.sort(function (a, b) {
                return (a.dataTimeNotification > b.dataTimeNotification)
            })
            //console.log(sortted);
            setMinhasPlantas(sortted);


            if (sortted.length > 0) {
                const firstData = (plantsSorted[0].name);
                const secondData = (plantsSorted[0].dataTimeNotification);
                setDateTimeNow(format(new Date, 'HH:mm'));
                setNotificationHour(`Não esqueça de regar a ${firstData} as ${secondData}h`);
            }
            else {
                setNotificationHour(null);
                return;
            }
            return plantsSorted;

        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        async function loadStorageUser() {
            const storageUser = await AsyncStorage.getItem('@plantmanager:user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }
        loadStorageUser();

    }, []);

    useEffect(() => {
        getLoadPlanta();

    }, [minhasPlantas]);

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            environments,
            plants,
            filteredPlants,
            getPlantToSave,
            unsplashSearch,
            loadPlants,
            minhasPlantas,
            dateTimeNow,
            notificationHour,
            getLoadPlanta,
            getLoadPlant,
            signUpUser,
            getEnvironments,
            signInUser,
            getPlants,
            LogoutUser,
            getEnviromentSelected,
            getSavePlant
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default Authprovider;