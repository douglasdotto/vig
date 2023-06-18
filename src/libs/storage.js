export const PRONTO = "@app:pronto";
export const DENGUE_DATA = "@app:dengue";
export const LEPTOSPIROSE_DATA = "@app:lepto";
export const TOXOPLASMOSE_DATA = "@app:toxo";
import AsyncStorage from "@react-native-async-storage/async-storage";


async function prontoData() {
    try {
        var data = await AsyncStorage.getItem(PRONTO);
        if (!data) {
            return null;
        }
        return data;
    } catch { return null }
}


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


export { prontoData, dengueData, leptospiroseData, toxoplasmoseData };