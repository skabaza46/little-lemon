
import { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable, Alert } from 'react-native'
import { validateEmail } from '../utils/validateEmail'
import { saveLoginSession, getLoginSession } from '../utils/loginSessionManagement'
import { removeNumbersAndSymbolds } from '../utils/cleanString';

const OnboardingScreen = () => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    const onChangeEmail = (email) => {
        setEmail(email)
        const isValid = validateEmail(email)
        if (isValid){
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }

      }
    

    const onChangeFirstName = (firstName) => {
        const value = removeNumbersAndSymbolds(firstName)
        if(value.isValid){
            setFirstName(firstName)
        } else {
            if (!value.data.length > 0){
                setIsFormValid(false)
            }
            setFirstName(value.data)
        }

    }
    const onChangeLastName = (lastName) => {
        const value = removeNumbersAndSymbolds(lastName)
        if(value.isValid){
            setLastName(lastName)
        } else {
            if (!value.data.length > 0){
                setIsFormValid(false)
            }
            setLastName(value.data)
        }

    }

    const onChangePhoneNumber = (phoneNumber) => {
        setPhoneNumber(phoneNumber)
    }

    const checkFormValidity = ()=> {

        if (firstName.length > 0 && isEmailValid){
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }

    const onSubmit = () => {

        if (isFormValid){
            const userProfile = {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                email: email,
            }
            saveLoginSession(userProfile)

            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setEmail('')
            setIsEmailValid(false)

            const user_session = getLoginSession()

            // Alert.alert(user_session)
        } else {
            Alert.alert("Form is invalid !")
        }
    }

    useEffect(() => {
        // Check to see if form is valid
        checkFormValidity()
      }, [firstName, email]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={require('../assets/Logo.png')}
            />

            <Text style={styles.header}> Let us get to know you </Text>


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
                placeholder='Phone Number'
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
                />

                <TextInput
                style={styles.input}
                placeholder='E-Mail'
                keyboardType="email-address"
                autoCapitalize='none'
                value={email}
                onChangeText={onChangeEmail}
                />
            </View>

            onChangeLastName
        <Pressable
        style={[styles.buttonDisabled, isFormValid? styles.button : styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!isFormValid}
        >
            <Text style={styles.text}>Next</Text>
        </Pressable>

        </View>
    )
}



export default OnboardingScreen;



const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems: "center",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        position: 'relative',
        flex: .5,
        width: 250,
        height: 50,
        marginTop: -100,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 100

    },
    form: {
        padding: 50
    },
    input: {
        fontSize: 18,
        borderWidth: 2,
        marginBottom: 50,
        width: 300,
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
    buttonDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'grey',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
})