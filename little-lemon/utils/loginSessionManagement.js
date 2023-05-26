
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveLoginSession = async (user) => {

    try {
        await AsyncStorage.setItem(
            'USER_SESSION',
            JSON.stringify(user)
        )

        console.log(`Successfully saved user login session!`)
    } catch (error){
        console.error(error)
    }
}

export const getLoginSession = async () => {

    try {
        const user_session = await AsyncStorage.getItem("USER_SESSION");

        if (user_session !== null){
            const user_profile = JSON.parse(user_session)
            // The user is currently logged in
            console.log("Successfully retrieved user login session!")
            return user_profile
        }
    } catch (error){
        console.error(error)
    }
}


export const removeLoginSession = async () => {
    try{
        const user_session = await AsyncStorage.removeItem("USER_SESSION");
        console.log("Successfully removed user login session!")
    } catch (error){
        console.error(error)
    }
}
