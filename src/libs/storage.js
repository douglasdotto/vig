export const AUTH_DATA_KEY = "@siddmanager:user";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function isAuthenticated() {
    try {
        var json = JSON.parse(await AsyncStorage.getItem(AUTH_DATA_KEY));
        if (json !== null) {
            if (new Date(json.expiration) >= new Date()) {
                return true;
            }
            else {
                AsyncStorage.removeItem(AUTH_DATA_KEY)
                return false;
            }
        } else {
            return false;
        }
    } catch { return false; }
}

async function getData() {
    try {
        var data = await AsyncStorage.getItem(AUTH_DATA_KEY);
        try {
            data = JSON.parse(data);
        }
        catch { }
        return data;
    } catch { return null }
}

export { isAuthenticated, getData };