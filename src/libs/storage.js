export const DENGUE_DATA = "@app:user";
export const LEPTOSPIROSE_DATA = "@app:user";
export const TOXOPLASMOSE_DATA = "@app:user";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function dengueData() {
    try {
        var data = await AsyncStorage.getItem(DENGUE_DATA);
        if (!data) {
            return null;
        }
        try {
            data = JSON.parse(data);
        }
        catch { }
        return data;
    } catch { return null }
}

async function leptospiroseData() {
    try {
        var data = await AsyncStorage.getItem(LEPTOSPIROSE_DATA);
        if (!data) {
            return null;
        }
        try {
            data = JSON.parse(data);
        }
        catch { }
        return data;
    } catch { return null }
}

async function toxoplasmoseData() {
    try {
        var data = await AsyncStorage.getItem(TOXOPLASMOSE_DATA);
        if (!data) {
            return null;
        }
        try {
            data = JSON.parse(data);
        }
        catch { }
        return data;
    } catch { return null }
}


export { dengueData, leptospiroseData, toxoplasmoseData };