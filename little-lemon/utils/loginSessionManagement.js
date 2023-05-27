
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveLoginSession = async (user) => {
    if (isUserLoggedInAlready()){
        console.info("User is already logged in!")

        const user = await getLoginSession()

        console.info(`User: ${JSON.stringify(user)}`)

    } else {
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

        return null
    }
}


export const removeLoginSession = async () => {
    try{
        const user_session = await AsyncStorage.removeItem("USER_SESSION");
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