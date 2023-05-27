import {useState, useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SplashScreen from '../screens/SplashScreen'

import { getLoginSession } from '../utils/loginSessionManagement'


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect( () => {
        (async () => {
            // Get the user login session
            const user_session = await getLoginSession();

            // Check to see if the user is logged in
            if (user_session){
                // Set the user is logged in
                setIsLoggedIn(true)
       }
        })();

      }, []);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn? "Profile": "Onboarding"}>
         <Stack.Screen
             name="Profile"
             component={ProfileScreen}
             options={{title: `User Profile`, headerBackVisible: false}}
             />

        <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ title: 'Onboarding', headerBackVisible: false}}
            />
        <Stack.Screen
        name="Loading"
        component={SplashScreen}
        options={{title: 'Splash Screen',headerBackVisible: false}}
        />

    </Stack.Navigator>
  );
};

export default RootNavigator;
