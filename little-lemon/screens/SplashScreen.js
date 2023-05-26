import { View, Image, StyleSheet } from "react-native"


const SplashScreen = () => {

    return (
        <View style={styles.container}>
            <Image 
            style={styles.logo}
            resizeMode='contain'
            source={require("../assets/Logo.png")} />
        </View>
    )
}


export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 300,
      height: 600,
    },
  });