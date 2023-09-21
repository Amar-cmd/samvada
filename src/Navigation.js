import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/LoggedInScreens/HomeScreen';
import LoginScreen from './screens/LoggedOutScreens/LoginScreen';
import RegisterScreen from './screens/LoggedOutScreens/RegisterScreen';
import VerificationScreen from './screens/LoggedOutScreens/VerificationScreen';
import WelcomeScreen from './screens/LoggedOutScreens/WelcomeScreen';

const Stack = createStackNavigator();

export const SignedInStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const SignedOutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
