
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLoginSession, isUserLoggedInAlready } from "./loginSessionManagement"

export const saveUserSettings = async (settings) => {
    // Get the user login session first
    const user_login_session =  await getLoginSession();

    // Don't do nothing, since there is no user session
    if (user_login_session === null || user_login_session === undefined){
        console.log("No user session detected. Please login first!")
        console.log("Unable to save settings!")
    } else {
        try {
            await AsyncStorage.setItem(
                'USER_SETTINGS',
                JSON.stringify(settings)
            )
            console.log(`Successfully saved user settings!`)
        } catch (error){
            console.error(error)
        }
    }
}


export const getUserSettings = async () => {
    if (!isUserLoggedInAlready()){
        return null
    } else {
        try {
            const  user_settings = await AsyncStorage.getItem("USER_SETTINGS")
            if (user_settings !== null && user_settings !== undefined){
                const settings = JSON.parse(user_settings)
                console.log("Successfully retrieved user settings!")
                console.log(user_settings)
                return settings
            }
        } catch (error){
            console.error(error)
            return null
        }
    }
}