
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveUserSettings = async (settings) => {

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


export const getUserSettings = async () => {
    try {
        const  user_settings = await AsyncStorage.getItem("USER_SETTINGS")
        if (user_settings !== null){
            const settings = JSON.parse(user_session)
            console.log("Successfully retrieved user settings!")

            console.log(user_settings)
            return settings
        }
    } catch (error){
        console.error(error)
    }
}