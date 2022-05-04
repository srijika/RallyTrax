import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Dimensions, 
 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AvatarBox } from '../../components/AvatarBox';
import { ScreenHeader } from '../../components/ScreenHeader';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextErrorMessage from '../../components/TextErrorMessage';
import input_styles from "./Styles"
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import { normalizeFont } from '../../constants/Helper';
import Styles from './Styles';
// import { Input, Icon } from 'react-native-elements';

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;


const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),
 
 password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('password is required ').min(8),
}).required();

export default function LoginScreen({ navigation }) {

  const [hidePass, setHidePass] = useState(true);


  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,

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

  const { control,register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setError(null);
    setIsloading(true);
    try {
      await dispatch(authActions.signin(data));

    } catch (error) {
      console.log("error msg---------------", error);
      setError(error.message);
    }

    setIsloading(false);

  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  return (
    <ScrollView style={{ flex:1,backgroundColor: "black" }} 
    keyboardShouldPersistTaps="always"
  >
      <AuthStackGradientContainer>

          <KeyboardAvoidingView>
            <View style={styles.avatarView}>
              <ScreenHeader name="Log In" />

            </View>
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
 
              <View  >
           
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[[input_styles.input, { alignSelf: 'center' }], isFocused.password ? styles.onfocusInput : styles.onblurInput]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.trim()}
                      secureTextEntry={hidePass ? true : false}
                      placeholder='Password'
                      placeholderTextColor={isFocused.password ? "gray" : "white"}
                      onFocus={() => handleInputFocus('password')}
                      onBlur={() => handleInputBlur('password')}
                   
                    />
                  )}
                 
                  name="password"
                />
                
                <Icon
                  name={hidePass ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#1A1A1A"
                  onPress={() => setHidePass(!hidePass)}
                  style={styles.passwordIcon}
                 
                />
                <Icon name="lock" style={[styles.icon, isFocused.password ? { color: "gray" } : { color: "white" }]} />
                <TextErrorMessage error={errors?.password?.message} />
                   
              </View>
           


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


              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', marginTop: WindowHeight / 10 }}
                onPress={() => {
                  navigation.navigate('ForgetPasswordScreen');
                }}>
                <Text style={styles.link}> Forget Password? </Text>

              </TouchableOpacity>

              <View >
                {!isLoading ? (
                  <TouchableOpacity
                    style={[styles.loginButton, { marginBottom: WindowHeight / 25 }]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={[styles.buttonText, { color: 'white' }]}> Login </Text>
                  </TouchableOpacity>) : (<ActivityIndicator style={[styles.loginButton, { marginBottom: WindowHeight / 25 }]} size="small" color="white" />)}
              </View>


            </View>
          </KeyboardAvoidingView>
        

      </AuthStackGradientContainer>

      <View style={styles.footerView}>

        <TouchableOpacity style={styles.bottomButton} onPress={() => { navigation.navigate('RegisterScreen') }}>
          <Text style={{ color: "white", textAlign: "center", fontWeight: '700', }}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>



  );
}

const styles = StyleSheet.create({
  mainHeading: {
    fontWeight: "700", color: "white", textAlign: "center"
  },

  loginButton: {
    width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: buttonColor, padding: WindowWidth / 18, marginTop: WindowHeight / 45, fontWeight: '700',
  },
  buttonText: {
    textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
  },
  link: {
    color: "white", textAlign: "center", textDecorationLine: "none",
  },

  avatarView: { marginBottom: WindowHeight / 12, marginTop: WindowHeight / 15 },
  icon: {
    position: 'absolute',
    left: WindowWidth / 13.33,
    top: Platform.OS=="ios"? WindowHeight / 36.12 :WindowHeight / 28.12,
    fontSize: normalizeFont(18),
    color: 'white',


  },
  passwordIcon: {
    position: 'absolute',
    right: WindowWidth / 12,
    top: WindowHeight / 33,
  },
  common: {

    color: '#ffffff',
    paddingTop: WindowHeight / 50,
  },
  tinyLogo: {

    flexDirection: 'row',
    marginTop: WindowHeight / 20,

  },
  bottomButton: {
    justifyContent: 'center',
    paddingTop: WindowHeight / 23

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
