import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{ title: 'Onboarding' }}
      />
      <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'User Profile'}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
