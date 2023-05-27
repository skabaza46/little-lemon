import { useState, useEffect } from "react"
import { TouchableHighlight, Text, View,Image, StyleSheet, Pressable, TextInput } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { saveLoginSession, getLoginSession, removeLoginSession } from "../utils/loginSessionManagement"
import { saveUserSettings, getUserSettings, removeUserSettings } from "../utils/userSettings"
import { removeNumbersAndSymbolds } from '../utils/cleanString';
import { validateEmail } from '../utils/validateEmail'
import { validatePhoneNumber } from '../utils/validatePhoneNumber'

const ProfileScreen = ({navigation}) => {
    const [ firstName, setFirstName ] = useState('')
    const [ isFirstNameValid, setIsFirstNameValid] = useState(true)
    const [ lastName, setLastName ] = useState('')
    const [ isLastNameValid, setIsLastNameValid] = useState(true)
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ isEmailValid, setIsEmailValid] = useState(false)
    const [ isFormValid, setIsFormValid ] = useState(false)
    const [ ischangePersonalInfo, setIsChangePersonalInfo] = useState(false)

    // Notifications statuses
    const [isOrderStatusesSelected, setOrderStatusesSelected] = useState(false)
    const [isPasswordChangesSelected, setPasswordChangesSelected] = useState(false)
    const [isSpecialOfferSelected, setSpecialOfferSelected] = useState(false)
    const [isNewsletterSelected, setNewsletterSelected] = useState(false)

    const onChangeFirstName = (first_name) => {
        const value = removeNumbersAndSymbolds(first_name)

        if(value.isValid){
            setFirstName(value.data)
        } else {
            if (!value.data.length > 0){
                setIsFormValid(false)
                setIsFirstNameValid(false)
            }
            setFirstName(value.data)
        }
    }

    const onChangeLastName = (last_name) => {
        const value = removeNumbersAndSymbolds(last_name)
        if(value.isValid){
            setLastName(value.data)
        } else {
            if (!value.data.length > 0){
                setIsFormValid(false)
                setIsLastNameValid(false)
            }
            setLastName(value.data)
        }

    }

    const onChangePhoneNumber = (phone_number) => {
        setPhoneNumber(phone_number)

        const isValid = validatePhoneNumber(phone_number)
        if (isValid){
            setIsPhoneNumberValid(true)
        } else {
            setIsPhoneNumberValid(false)
        }
    }


    const onChangeEmail = (email_address) => {
        setEmail(email_address)
        const isValid = validateEmail(email_address)
        if (isValid){
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    const onOrderStatusChangeSelected = () => {
        setOrderStatusesSelected(!isOrderStatusesSelected)
    }

    const onPasswordChangedSelected = () => {
        setPasswordChangesSelected(!isPasswordChangesSelected)
    }

    const onSpecialOfferSelected = () => {
        setSpecialOfferSelected(!isSpecialOfferSelected)
    }

    const onNewsletterSelected = () => {
        setNewsletterSelected(!isNewsletterSelected)
    }

    const onLogOutHandler = () => {
        removeLoginSession()
        removeUserSettings()
        // Redirect the user to the Onboarding page upon logging out
        navigation.navigate("Onboarding")

    }

    const onSaveChanges = async () => {
        // User settings payload
        const settings = {
            is_order_status: isOrderStatusesSelected,
            is_news_letter: isNewsletterSelected,
            is_password_changed: isPasswordChangesSelected,
            is_special_offer: isSpecialOfferSelected
        }

        // Save the settings changes
        await saveUserSettings(settings)


        // User personal information payload
        const personal_info = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email
        }
        // Save personal information changes
        await saveLoginSession(personal_info)
    }

    const onDiscardChanges = async () => {
        // Reset everything to their default, before changes were made
        const user_session = await getLoginSession();
        if (user_session){
            setFirstName(user_session.first_name)
            setLastName(user_session.last_name)
            setEmail(user_session.email)
            setPhoneNumber(user_session.phone_number)
            setIsEmailValid(true)
            setIsFormValid(true)

            const isValidPhone = validatePhoneNumber(user_session.phone_number)
            setIsPhoneNumberValid(isValidPhone)
        }

        const user_settings = await getUserSettings()
        if(user_settings){
            setSpecialOfferSelected(user_settings.is_special_offer)
            setOrderStatusesSelected(user_settings.is_order_status)
            setNewsletterSelected(user_settings.is_news_letter)
            setPasswordChangesSelected(user_settings.is_password_changed)
            setIsEmailValid(true)
            setIsFormValid(true)
        }
    }

    const onChangePersonalInfo = () => {
        setIsChangePersonalInfo(!ischangePersonalInfo)

        console.log(ischangePersonalInfo)
    }


    useEffect( () => {
        (async () => {
            await onDiscardChanges();
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

                    <TouchableHighlight style={styles.changeButton} onPress={onChangePersonalInfo}>
                        <Text style={styles.changeButtonText}>
                            {!ischangePersonalInfo? 'Enable Update Info': "Disabled Update Info"}
                        </Text>
                    </TouchableHighlight>

                </View>
            </View>

            <View style={styles.form}>
                <TextInput
                style={[isFirstNameValid? styles.inputValid : styles.inputInvalid]}
                placeholder='First Name'
                value={firstName}
                onChangeText={onChangeFirstName}
                editable={ischangePersonalInfo}
                />

                <TextInput
                style={[isLastNameValid? styles.inputValid : styles.inputInvalid]}
                placeholder='Last Name'
                value={lastName}
                onChangeText={onChangeLastName}
                editable={ischangePersonalInfo}
                />

                <TextInput
                style={[isEmailValid? styles.inputValid : styles.inputInvalid]}
                placeholder='E-Mail'
                keyboardType="email-address"
                autoCapitalize='none'
                value={email}
                onChangeText={onChangeEmail}
                editable={ischangePersonalInfo}
                />

            <TextInput
                style={isPhoneNumberValid? styles.inputValid : styles.inputInvalidWarnning}
                placeholder='Phone Number'
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
                editable={ischangePersonalInfo}
                maxLength={15}
                keyboardType={"number-pad"}
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
                disableBuiltInState
                />
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Password changes`}
                isChecked={isPasswordChangesSelected}
                onPress={onPasswordChangedSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                disableBuiltInState
                />
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Special offers`}
                isChecked={isSpecialOfferSelected}
                onPress={onSpecialOfferSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                disableBuiltInState
                />
                <BouncyCheckbox
                style={styles.checkbox}
                text={`Newsletter`}
                isChecked={isNewsletterSelected}
                onPress={onNewsletterSelected}
                textStyle={{textDecorationLine: "none", fontWeight: '300', color: 'black'}}
                disableBuiltInState
                />
            </View>
            <View style={styles.bottomButtonGroup}>
                <TouchableHighlight style={styles.buttonLogout} onPress={onLogOutHandler}>
                    <Text style={styles.textLogout}>Log Out</Text>
                </TouchableHighlight>
                {ischangePersonalInfo? (
                     <View style={styles.bottomButtonGroupChild}>
                     <TouchableHighlight style={styles.discardChangesButton} onPress={onDiscardChanges}>
                         <Text style={styles.textDiscardChanges}>Discard changes</Text>
                     </TouchableHighlight>
                     <TouchableHighlight style={styles.saveChangesButton} onPress={onSaveChanges}>
                         <Text style={styles.textSaveChanges}>Save Changes</Text>
                     </TouchableHighlight>
                 </View>
                ): null

                }

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
    },
    header: {
        fontSize: 20,
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
    inputValid: {
        fontSize: 18,
        borderWidth: 2,
        marginBottom: 20,
        width: 310,
        height: 50,
        borderRadius: 10,
        padding: 10,
        borderColor: 'green'
    },
    inputInvalid: {
        fontSize: 18,
        borderWidth: 2,
        marginBottom: 20,
        width: 310,
        height: 50,
        borderRadius: 10,
        padding: 10,
        borderColor: 'red'
    },
    inputInvalidWarnning: {
        fontSize: 18,
        borderWidth: 2,
        marginBottom: 20,
        width: 310,
        height: 50,
        borderRadius: 10,
        padding: 10,
        borderColor: '#F4CE14'
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