

export const validatePhoneNumber = (phone_number) => {

    if( phone_number.length >= 10 && phone_number.length <= 15){
        return true
    } else {
        return false
    }
}