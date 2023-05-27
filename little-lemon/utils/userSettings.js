
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isUserLoggedInAlready } from "./loginSessionManagement"

export const saveUserSettings = async (settings) => {
    const isLoggedIn = await isUserLoggedInAlready()
    // Don't do nothing, since there is no user session
    if (!isLoggedIn){
        console.log("No user session detected. Please login first!")
        console.log("Unable to save settings!")
    } else {
        try {
            await AsyncStorage.setItem(
                'USER_SETTINGS',
                JSON.stringify(settings)
            )

        } catch (error){
            console.error(error)
        }
    }
}


export const getUserSettings = async () => {
    const isLoggedIn = await isUserLoggedInAlready()
    if (!isLoggedIn){
        return null
    } else {
        try {
            const  user_settings = await AsyncStorage.getItem("USER_SETTINGS")
            if (user_settings !== null && user_settings !== undefined){
                const settings = JSON.parse(user_settings)
                return settings
            }
        } catch (error){
            console.error(error)
            return null
        }
    }
}

export const removeUserSettings = async () => {
    try{
        await AsyncStorage.removeItem("USER_SETTINGS");
        console.log("Successfully logged user out!")
    } catch (error){
        console.error(error)
    }
}