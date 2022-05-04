import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
 
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native' ;

//import Colors from '../constants/Colors';
import * as authActions from '../../store/actions/auth';

const StartupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation() ;

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userAuthData');
       const transformedData = JSON.parse(userData);
       if(!transformedData){
       
        dispatch(authActions.setDidTryAL()) ;
        //props.navigation.navigate('LoginScreen');
        return;
       }else{
      
        const { token,  user } = transformedData;
      
      if (!user) {

        dispatch(authActions.setDidTryAL()) ;
        //props.navigation.navigate('LoginScreen');
        return;
      }
   
      
      dispatch(authActions.authenticate(user._id,  token));
       }
      
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
