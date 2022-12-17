export const DENGUE_DATA = "@app:user";
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

export { dengueData };