

export const removeNumbersAndSymbolds = (value) => {
    const regMatch = /^[a-zA-Z]*$/.test(value);
    if(regMatch){
        return {data: value, isValid: true}
    } else {
        const cleanedValue = value.replace(/[^a-zA-Z ]/g, "");

       return {data: cleanedValue, isValid: false}
    }

}