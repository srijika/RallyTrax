import React from 'react';
import { Easing, Platform } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import UserTypeScreen from '../screens/Auth/UserTypeScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import UnlockScreen from '../screens/Auth/UnlockScreen';
import ForgetPasswordScreen from '../screens/Auth/ForgetPasswordScreen';
import { secondaryColor } from '../constants/Colors';
import OtpScreen from '../screens/Auth/OtpScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';
import SetMpinScreen from '../screens/Auth/SetMpinScreen';

const Stack = createStackNavigator();

const slideConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const titleBarHeader = title => {
  return {
    title: title,
    headerStyle: {  backgroundColor: secondaryColor },
    headerTintColor: '#fff',
    headerShadowVisible: false,
  };
};

const AuthStack = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          transitionSpec: {
            open: slideConfig,
            close: slideConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserTypeScreen"
          component={UserTypeScreen}
        />
        <Stack.Screen
         options={{ headerShown: false }}
          name="OtpScreen"
          component={OtpScreen}
        />

        <Stack.Screen 
         options={{ headerShown: false }} name="ChangePasswordScreen" component={ChangePasswordScreen} />

        <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          options={{ title: "Login", headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="UnlockScreen" component={UnlockScreen} />

        <Stack.Screen
          options={titleBarHeader('Mpin Screen')}
          name="SetMpinScreen"
          component={SetMpinScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}
        />
      

      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
