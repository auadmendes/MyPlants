import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../../contexts/auth';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Header } from '../../components/Header';
import { EnviromentButton } from '../../components/EnviromentButton';
import { PlantCard } from '../../components/PlantCard';
import { Load } from '../../components/Load';
import { ImageCard } from '../../components/ImageCard';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';


export default function Home() {
    const { getPlants, filteredPlants, unsplashSearch, getLoadPlant } = useContext(AuthContext);
    const [loadingMore, setLoadingMore] = useState(false);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const unsplashKey = 'MisIL79UNWm_MuKfikjXFNuLjXzP5RiyoOzpMQk1SV8';
    const unsplashSecretKey = '-T5iQHlrmol9kpSd3GwemFzpiampbDebPEaUkJlTxRg';
    const keyApi = '563492ad6f91700001000001f2f5c461e4e44e068e7bc6157e22a809';
    const [plantImages, setPlantImages] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [morePlants, setMoreplants] = useState([]);
    const [query, setQuery] = useState();

    useEffect(() => {
        getPlants();
        getImagefromUnsplash();
    }, [query])


    async function getImagefromUnsplash() {

        const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${unsplashKey}`;
        axios.get(url)
            .then((response) => {
                setPlantImages(response.data.results);
            })
    }

    function handleCallEnvironment() {
        setQuery(null);
        getPlants();
    }

    function handleFetchMore(distance) {

        if (distance > 1)
            return;

        //alert('teste');
        //setLoadingMore(true);

        setPerPage(oldvalue => oldvalue + 3);
        if (perPage >= 5) {
            setPerPage(1);
        }
        getImagefromUnsplash();
    }


    function handlePlantSelect(plant) {
        navigation.navigate('PlantSave', { plant });

    }

    if (filteredPlants === null)
        return <Load />

    return (
        <TouchableWithoutFeedback Keyboard={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header />
                    <Text style={styles.title}>Em qual ambiente</Text>
                    <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={(value) => setQuery(value)}
                        value={query}
                        lightTheme
                        cancelButtonProps={true}
                        containerStyle={styles.searchBar}
                        inputStyle={styles.inputSearch}
                        inputContainerStyle={styles.inputSearch}
                        onClear={handleCallEnvironment}
                        onCancel={() => setQuery(null)}
                    />
                </View>
                <View>
                    <EnviromentButton />
                </View>
                <View style={styles.plants}>
                    {query != null &&
                        <FlatList
                            data={plantImages}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => (
                                <ImageCard data={item}
                                //  onPress={() => handlePlantSelect(item)}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            onEndReachedThreshold={0.1}
                            onEndReached={({ distanceFromEnd }) =>
                                handleFetchMore(distanceFromEnd)
                            }
                            ListFooterComponent={
                                loadingMore
                                    ? <ActivityIndicator color={colors.green} />
                                    : <></>
                            }
                        />
                    }
                    {query == null &&
                        <FlatList
                            data={filteredPlants}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => (
                                <PlantCard data={item}
                                    onPress={() => handlePlantSelect(item)}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            onEndReachedThreshold={0.1}
                            onEndReached={({ distanceFromEnd }) =>
                                handleFetchMore(distanceFromEnd)
                            }
                            ListFooterComponent={
                                loadingMore
                                    ? <ActivityIndicator color={colors.green} />
                                    : <></>
                            }
                        />
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 30,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
    containerButtonEnvironment: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 5,
        marginHorizontal: 5,
    },
    containerButtonEnvironmentActive: {
        backgroundColor: colors.green_light,
    },
    titleEnvironment: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 18
    },
    titleEnvironmentActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    },
    searchBar: {
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 1,
        marginLeft: 32,
    },
    inputSearch: {
        borderRadius: 10,
        backgroundColor: colors.shape,
    }
})