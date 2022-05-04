import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvatarBox } from '../../components/AvatarBox';
import { addTripInputLabelColor, buttonColor, headerBgColor, primaryColor, secondaryColor, } from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextErrorMessage from '../../components/TextErrorMessage';
import input_styles from "./Styles"
import LinearGradient from 'react-native-linear-gradient';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import { Button, Overlay } from 'react-native-elements';
import { ScreenHeader } from '../../components/ScreenHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalizeFont } from '../../constants/Helper';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;


const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),
 
  password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('password is required').min(8),
//  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
}).required();


export default function RegisterScreen({ navigation }) {
  
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    confirm_password: false,
  })
  // handlers
  const handleInputFocus = (textinput) => {
    setIsFocused({
      [textinput]: true
    })
  }
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false
    })
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const onSubmit = async (data) => {


    const userData = JSON.stringify(data);
    await AsyncStorage.setItem('userdata', userData);

    try {
      // setIsloading(true);
      data['type'] = 'register';
      await dispatch(authActions.sendOtp(data));
      setIsloading(false);
      navigation.navigate('OtpScreen');

    } catch (error) {
      console.log('error message', error);
      setError(error.message);

    }
  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  return (

    <ScrollView style={{ flex: 1, backgroundColor: "black" }} >
      <AuthStackGradientContainer>
        <View>
          <View style={styles.avatarView}>
            <ScreenHeader name="Sign Up" />
          </View>


          <KeyboardAvoidingView>
            <View>
              <View>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[[input_styles.input, { alignSelf: 'center' }], isFocused.email ? styles.onfocusInput : styles.onblurInput]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.trim()}
                      placeholder='Email'
                      placeholderTextColor={isFocused.email ? "gray" : "white"}
                      onFocus={() => handleInputFocus('email')}
                      onBlur={() => handleInputBlur('email')}
                    />
                  )}
                  name="email"
                />
                <Icon name="envelope" style={[styles.icon, isFocused.email ? { color: "gray" } : { color: "white" }]} />
                <TextErrorMessage error={errors?.email?.message} />
              </View>

              <View>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    secureTextEntry={hidePass ? true : false}
                      style={[[input_styles.input, { alignSelf: 'center' }], isFocused.password ? styles.onfocusInput : styles.onblurInput]}
                    //  onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.trim()}
                      placeholder='Password'
                      placeholderTextColor={isFocused.password ? "gray" : "white"}
                      onFocus={() => handleInputFocus('password')}
                      onBlur={() => handleInputBlur('password')}
                    />
                  )}
                  name="password"
                />
                 
              <TouchableOpacity onPress={() => setHidePass(!hidePass)}
                  style={styles.passwordIcon}>
                <Icon
                  name={hidePass ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#1A1A1A"
                  // onPress={() => setHidePass(!hidePass)}
                  // style={styles.passwordIcon}
                />
                </TouchableOpacity>
               
                <Icon name="lock" style={[styles.icon, isFocused.password ? { color: "gray" } : { color: "white" }]} />
                <TextErrorMessage error={errors?.password?.message} />
              </View>

              {/* <View>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      secureTextEntry={true}
                      style={[[input_styles.input], isFocused.confirm_password? styles.onfocusInput:styles.onblurInput ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder='Confirm Password'
                      placeholderTextColor={isFocused.confirm_password?"gray":"white"}
                      onFocus={() => handleInputFocus('confirm_password')}
                      onBlur={() => handleInputBlur('confirm_password')}
                    />
                  )}
                  name="confirm_password"
                />
                <Icon name="lock" style={[styles.icon,isFocused.confirm_password?{color: "gray"}:{color:"white"}]} />
                <TextErrorMessage error={errors?.confirm_password?.message} />
              </View> */}


              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.common}>Enter via social networks</Text>
                <View style={styles.tinyLogo}>
                  <TouchableOpacity style={{ marginRight: WindowWidth / 30 }} >
                    <Image

                      source={require('../../assets/images/insta_button.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: WindowWidth / 30 }}>
                    <Image
                      source={require('../../assets/images/fb_button.png')}
                    />
                  </TouchableOpacity >
                  <TouchableOpacity style={{ marginRight: WindowWidth / 30, marginTop: -WindowHeight / 175 }}>
                    {/* <Icon name="apple" size={70}/> */}
                    <Image
                      source={require('../../assets/images/apple.png')}
                    />
                  </TouchableOpacity>

                </View>
              </View>


              <View style={{ marginTop: WindowHeight / 7 }}>
                {!isLoading ? (
                  <TouchableOpacity
                    style={[styles.loginButton, { marginBottom: WindowHeight / 30, }]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={[styles.buttonText, { color: 'white', }]}> Sign Up </Text>
                  </TouchableOpacity>) : (<ActivityIndicator style={{ marginBottom: WindowHeight / 30, }} size="small" color="white" />)}
              </View>

            </View>
          </KeyboardAvoidingView>

        </View>

      </AuthStackGradientContainer>

      <View style={styles.footerView}>

        <TouchableOpacity style={styles.bottomButton} onPress={() => { navigation.navigate('LoginScreen') }}>
          <Text style={{ color: "white", textAlign: "center", fontWeight: '700', }}> LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: secondaryColor,
  },
  topBox: {
    paddingTop: 60,
    alignItems: 'center'
  },
  mainHeading: {
    fontSize: 18, fontWeight: "700", color: "white", textAlign: "center"
  },
  name: {
    fontSize: 12, fontWeight: "700", color: "white", textAlign: "center", paddingTop: 6
  },
  loginButton: {
    width: '95%', alignSelf: 'center', borderRadius: 30, backgroundColor: buttonColor, padding: 20, marginTop: 15,
  },
  buttonText: {
    textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
  },
  link: {
    color: "white", marginLeft: 10, textAlign: "center", textDecorationLine: "none",
  },
  textUnderline: {
    height: 0,
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
  footerView: { flexDirection: 'row', justifyContent: 'center' },
  avatarView: { marginTop: 40, marginBottom: WindowHeight / 10 },
  icon: {
    position: 'absolute',
    left: WindowWidth/13.33,
    top: WindowHeight/28.12,
    fontSize: 16,
    color: 'white'

  },
  common: {

    color: '#ffffff',
    paddingTop: 20,
  },
  passwordIcon: {
    position: 'absolute',
    right: WindowWidth / 12,
    top: WindowHeight /28.12,
  //  zIndex:1000
    
  },
  tinyLogo: {

    flexDirection: 'row',
    marginTop: 15,

  },
  bottomButton: {
    //  backgroundColor: buttonColor,
    justifyContent: 'center',

    height: WindowHeight / 9.41

  },
  onfocusInput: {
    backgroundColor: "white",
    color: "gray",


  },
  onblurInput: {
    backgroundColor: "#761D1D",
    color: "white",

  }

});
