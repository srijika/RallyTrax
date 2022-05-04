import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack' ;
import AuthStack from './AuthStack' ;
import StartupScreen from '../screens/Auth/StartupScreen'

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);


  return (
    <NavigationContainer>
      {/* <AppStack /> */}
      {/* <AuthStack /> */}

      
      {isAuth && <AppStack />}
      {!isAuth && didTryAutoLogin && <AuthStack />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
