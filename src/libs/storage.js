import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns';

// const PlantProps = {
//     id: string,
// }

export async function savePlant(plant) {

    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data ? (JSON.parse(data)) : {};

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }
        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants,
            }));
        //console.log(oldPlants);

    } catch (error) {
        throw new Error(error);
    }
}
export async function loadPlant() {
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
        //setPlantList(plantsSorted);

        return plantsSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function removePlant(id) {

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data)) : {};

    //await Notifications.cancelScheduledNotificationAsync(plants[id].notificationID);

    delete plants[id];

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));

    alert('Removido, depois não reclama')
}
