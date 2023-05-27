import { useState, useEffect } from "react"
import { CheckBox, Text, View,Image, StyleSheet, Pressable, TextInput } from "react-native"

const ProfileScreen = () => {
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


    useEffect( () => {
        (async () => {
            // Get the user login session
            const user_session = await getLoginSession();

            // Check to see if the user is logged in
            if (user_session){
                // Set the user login profile
                setUserProfile(user_session)
                setFirstName(user_session.first_name)
                setLastName(user_session.last_name)
                setEmail(user_session.email)
                setPhoneNumber(user_session.phone_number)
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
                <Text>Email notification</Text>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={isOrderStatusesSelected}
                    onValueChange={setOrderStatusesSelected}
                    style={styles.checkbox}
                    />
                    <Text style={styles.label}>Order statuses</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={isPasswordChangesSelected}
                    onValueChange={setPasswordChangesSelected}
                    style={styles.checkbox}
                    />
                    <Text style={styles.label}>Password changes</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={isSpecialOfferSelected}
                    onValueChange={setSpecialOfferSelected}
                    style={styles.checkbox}
                    />
                    <Text style={styles.label}>Special offers</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={isNewsletterSelected}
                    onValueChange={setNewsletterSelected}
                    style={styles.checkbox}
                    />
                    <Text style={styles.label}>Newsletter</Text>
                </View>
            </View>
            <View style={styles.bottomButtonGroup}>
                <Pressable style={styles.buttonLogout}>
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
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

    },
    removeButtonText: {

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