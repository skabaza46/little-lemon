import {useState, useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SplashScreen from '../screens/SplashScreen'

import { getLoginSession } from '../utils/loginSessionManagement'


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ userProfile, setUserProfile] = useState({})


    useEffect( () => {
        (async () => {
            // Get the user login session
            const user_session = await getLoginSession();

            // Check to see if the user is logged in
            if (user_session){
                // Set the user login profile
                setUserProfile(user_session)
                setIsLoggedIn(true)
       }
        })();

      }, []);

  return (
    <Stack.Navigator>

        {isLoggedIn ? (
            <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: `User Profile ${userProfile.first_name}`}}
            />
        ) : (

            <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ title: 'Onboarding' }}
            />
        )
        }


        <Stack.Screen
        name="Loading"
        component={SplashScreen}
        />

    </Stack.Navigator>
  );
};

export default RootNavigator;
