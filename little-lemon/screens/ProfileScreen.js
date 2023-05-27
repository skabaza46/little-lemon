import { useState, useEffect } from "react"
import { Text, View,Image, StyleSheet, Pressable, TextInput } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { getLoginSession, removeLoginSession } from "../utils/loginSessionManagement"
import { saveUserSettings, getUserSettings } from "../utils/userSettings"

const ProfileScreen = ({navigation}) => {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ email, setEmail ] = useState('')

    // Notifications statuses
    const [isOrderStatusesSelected, setOrderStatusesSelected] = useState(false)
    const [isPasswordChangesSelected, setPasswordChangesSelected] = useState(false)
    const [isSpecialOfferSelected, setSpecialOfferSelected] = useState(false)
    const [isNewsletterSelected, setNewsletterSelected] = useState(false)

    const onChangeFirstName = () => {

    }

    const onChangeLastName = () => {

        alert("Simen")

    }

    const onChangeEmail = () => {

    }

    const onOrderStatusChangeSelected = (isSelected) => {
        setOrderStatusesSelected(isSelected)
    }

    const onPasswordChangedSelected = (isSelected) => {
        setPasswordChangesSelected(isSelected)
    }

    const onSpecialOfferSelected = (isSelected) => {
        setSpecialOfferSelected(isSelected)
    }

    const onNewsletterSelected = (isSelected) => {

        setNewsletterSelected(isSelected)
    }

    const onLogOutHandler = () => {
        removeLoginSession()

        navigation.navigate("Onboarding")

    }


    useEffect( () => {
        (async () => {
            // Get the user login session
            const user_setting = await saveUserSettings({
                is_order_status: isOrderStatusesSelected,
                is_news_letter: isNewsletterSelected,
                is_password_changed: isPasswordChangesSelected,
                is_special_offer: isSpecialOfferSelected
            });

        })();

      }, [isNewsletterSelected, isOrderStatusesSelected, isPasswordChangesSelected, isSpecialOfferSelected]);

    useEffect( () => {
        (async () => {
            // Get the user login session
            const user_session = await getLoginSession();

            // Check to see if the user is logged in
            if (user_session){
                // Set the user login profile
                setFirstName(user_session.first_name)
                setLastName(user_session.last_name)
                setEmail(user_session.email)
                setPhoneNumber(user_session.phone_number)
            }

            const user_settings = await getUserSettings();
            if (user_settings){
                // Set the user settings
                setSpecialOfferSelected(user_settings.is_special_offer)
                setOrderStatusesSelected(user_settings.is_order_status)
                setNewsletterSelected(user_settings.is_news_letter)
                setPasswordChangesSelected(user_settings.is_password_changed)
            }
        })();

      }, []);


    return (
        <View style={styles.container}>
            <View>
                <Image
                style={styles.logo}
                resizeMode='contain'
                source={require("../assets/Logo.png")}
                />
                <Text style={styles.header}>Personal information</Text>

                <View style={styles.personalInfoButtonGroup}>

                    <Image
                    style={styles.profilePhoto}
                    source={require("../assets/Profile.png")}
                    />

                    <Pressable style={styles.changeButton}>
                        <Text style={styles.changeButtonText}>Change</Text>
                    </Pressable>

                    <Pressable style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </Pressable>

                </View>
            </View>

            <View style={styles.form}>
                <TextInput
                style={styles.input}
                placeholder='First Name'
                value={firstName}
                onChangeText={onChangeFirstName}
                />

                <TextInput
                style={styles.input}
                placeholder='Last Name'
                value={lastName}
                onChangeText={onChangeLastName}
                />

                <TextInput
                style={styles.input}
                placeholder='E-Mail'
                keyboardType="email-address"
                autoCapitalize='none'
                value={email}
                onChangeText={onChangeEmail}
                />

            <TextInput
                style={styles.input}
                placeholder='Phone Number'
                value={phoneNumber}
                onChangeText={onChangeFirstName}
                />
            </View>

            <View>
                <Text style={styles.header}>E-Mail notification</Text>
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Order statuses`}
                isChecked={isOrderStatusesSelected}
                onPress={onOrderStatusChangeSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                />
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Password changes`}
                isChecked={isPasswordChangesSelected}
                onPress={onPasswordChangedSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                />
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Special offers`}
                isChecked={isSpecialOfferSelected}
                onPress={onSpecialOfferSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                />
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Newsletter`}
                isChecked={isNewsletterSelected}
                onPress={onNewsletterSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                />
            </View>
            <View style={styles.bottomButtonGroup}>
                <Pressable style={styles.buttonLogout} onPress={onLogOutHandler}>
                    <Text style={styles.textLogout}>Log Out</Text>
                </Pressable>
                <View style={styles.bottomButtonGroupChild}>
                    <Pressable style={styles.discardChangesButton}>
                        <Text style={styles.textDiscardChanges}>Discard changes</Text>
                    </Pressable>
                    <Pressable style={styles.saveChangesButton}>
                        <Text style={styles.textSaveChanges}>Save Changes</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}


export default ProfileScreen;


const styles = StyleSheet.create({
    checkbox: {
        margin: 2
    },
    label: {
        margin: 8,
    },
    profilePhoto: {
        width: 60,
        height: 60,
        justifyContent: "flex-end"
    },
    logo: {
        width: 250,
        height: 50,
        textAlign: 'left'
    },
    header: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        fontWeight:"bold"
    },
    form: {
        padding: 5
    },
    input: {
        fontSize: 18,
        borderWidth: 2,
        marginBottom: 20,
        width: 310,
        height: 50,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#F4CE14',
        width: '90%',
        borderRadius: 10

    },
    buttonDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'grey',
    },
    bottomButtonGroup: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomButtonGroupChild: {
        flexDirection:"row",

    },
    personalInfoButtonGroup: {
        flexDirection:"row",
    },
    discardChangesButton: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderColor: '#495E57',
        borderWidth: 2,
        elevation: 3,
        backgroundColor: 'white',
        margin: 20

    },
    saveChangesButton: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#495E57',
        margin: 20

    },

    changeButton: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#495E57',
        margin: 20
    },
    removeButton: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 10,
        borderColor: '#495E57',
        borderWidth: 2,
        elevation: 3,
        backgroundColor: 'white',
        margin: 20
    },
    changeButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    removeButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#495E57',
    },
    textDiscardChanges: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#495E57',

    },
    textSaveChanges: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textLogout: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    }
})