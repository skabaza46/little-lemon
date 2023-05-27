
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
        if (user_session !== null || user_session !== undefined ){
            const user_profile = JSON.parse(user_session)
            // The user is currently logged in
            return user_profile
        }
    } catch (error){
        console.error(error)

        return null
    }
}


export const removeLoginSession = async () => {
    try{
        await AsyncStorage.removeItem("USER_SESSION");
        console.log("Successfully logged user out!")
    } catch (error){
        console.error(error)
    }
}


export const isUserLoggedInAlready = async () => {
    const user_login_session =  await getLoginSession();
    if (user_login_session === null || user_login_session === undefined){
        return false
    } else {
        return true
    }
}