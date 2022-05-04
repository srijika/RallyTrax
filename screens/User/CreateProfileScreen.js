import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TextInput, Platform, Alert,
  ImageBackground, Dimensions, ActivityIndicator, KeyboardAvoidingView, Image,
  TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import { Avatar, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'react-native-axios';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userAction from '../../store/actions/users';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextErrorMessage from '../../components/TextErrorMessage';
import { BASEURL } from '../../constants/Helper';
import { staticBackImage } from '../../constants/Images'
import UserBackground from '../../components/UserBackground';
import ActionSheet from 'react-native-actionsheet'
import ScreenLoader from '../../components/ScreenLoader';
import { CameraPermission } from '../../constants/CameraPermission';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import input_styles from "../Auth/Styles"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const schema = yup.object({
  business_name: yup.string().required(),

  mobile_number: yup.string()
    .matches(/^\S*$/, 'Whitespace is not allowed')
    .required('mobile number is required ').max(10),
  bussiness_address: yup.string().required(),
}).required();


export default function CreateProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [userBackground, setUserBackground] = useState(staticBackImage);
  const [imgBackgrounds, setImgBackgrounds] = useState([]);
  const state = useSelector(state => state);
  const user_data = state?.user?.user;

  const [isFocused, setIsFocused] = useState({
    user_name: false,
    poker_skill_lavel: false,
    mobile_number: false,

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

  const handleUserBackground = (item) => {
    setUserBackground(item)
  }


  useEffect(() => {

    if (user_data) {

      setImageUri(user_data?.avatar);

      setValue('business_name', user_data?.business_name)
      setValue('bussiness_address', user_data?.bussiness_address)
      setValue('mobile_number', user_data?.mobile_number)
    }



  }, [])



  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const launchImageLibraryFun = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        const data = response.assets[0].uri;
        setImageUri(data);

      }
    });
  };


  const launchCameraFun = async () => {


    const granted = CameraPermission();
    launchCamera({
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.5,
    }, response => {
      if (response.assets) {
        const data = response.assets[0].uri;
        setImageUri(data);
      }
    });

  };



  const onSubmit = async data => {

    setIsloading(true);

    try {
      let formData = new FormData();
      if (imageUri) {
        let uri = imageUri;
        let fileType = uri.substring(uri.lastIndexOf('.') + 1);
        formData.append('avatar', {
          uri:
            Platform.OS === 'android'
              ? imageUri
              : imageUri.replace('file://', ''),
          name: `photo.${fileType}`,
          type: `image/*`,
        });
      }
      const storedUserData = await AsyncStorage.getItem('userAuthData');



      let userData = JSON.parse(storedUserData);

      formData.append('business_name', data.business_name);
      formData.append('bussiness_address', data.bussiness_address);
      formData.append('mobile_number', data.mobile_number);

      if (userData?.user?._id) {
        formData.append('user_id', userData?.user?._id);
      } else {
        formData.append('user_id', userData?.user);
      }

      formData.append('userType', "BUSINESS");


      await dispatch(userAction.editProfile(formData));

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert("", error.message)
      // setError(error.message);
    }
    setIsloading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);



  return (

    <ScrollView style={{ backgroundColor: "black" }}>
      <AuthStackGradientContainer>
        <View style={styles.avatarView, { marginTop: windowHeight / 15 }}>
          <ScreenHeader name="Create Business Profile" />
          <View style={{ alignSelf: 'center' }}>
            {imageUri ?
              <View style={styles.cardImage}>
                <TouchableOpacity onPress={() => {
                  this.ActionSheet.show()
                }} >
                  <Image style={styles.image} source={{ uri: imageUri }} resizeMode={"cover"} />
                </TouchableOpacity>
              </View>

              :
              <View>
                <View style={styles.plusIconImage}>
                  <Icon onPress={() => {
                    this.ActionSheet.show()
                  }} name="plus" size={80} color="#8B959A" />

                </View>
                <Text style={{ color: '#8B959A', marginTop: 10, justifyContent: 'center', alignSelf: 'center' }}>Add Image</Text>
              </View>
            }


            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'Which one do you like ?'}
              options={['Camera', 'Photo Library', 'Cancel']}
              cancelButtonIndex={2}
              onPress={(buttonIndex) => {
                switch (buttonIndex) {
                  case 0:
                    launchCameraFun()
                    break;
                  case 1:
                    launchImageLibraryFun()
                    break;
                  default:
                    break;
                }
              }}
            />



          </View>

        </View>

        <View >
          <View style={{ marginTop: 25 }}>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[[input_styles.input, { paddingLeft: 20, alignSelf: 'center' }], isFocused.business_name ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Business Name'
                  placeholderTextColor={isFocused.business_name ? "gray" : "white"}
                  onFocus={() => handleInputFocus('business_name')}
                  onBlur={() => handleInputBlur('business_name')}
                />
              )}
              name="business_name"
            />
            <TextErrorMessage error={errors?.business_name?.message ? 'Bussiness Name is required' : ''} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[[input_styles.input, { paddingLeft: 20, alignSelf: 'center' }], isFocused.mobile_number ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Moble Number'
                  placeholderTextColor={isFocused.mobile_number ? "gray" : "white"}
                  onFocus={() => handleInputFocus('mobile_number')}
                  onBlur={() => handleInputBlur('mobile_number')}
                  keyboardType={'numeric'}
                  maxLength={10}
                />
              )}
              name="mobile_number"
            />
            <TextErrorMessage error={errors?.mobile_number?.message} />
            {/* <TextErrorMessage error={errors?.mobile_number?.message ? 'Mobile Number is required' : ''} /> */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[[input_styles.input, { paddingLeft: 20, alignSelf: 'center' }], isFocused.bussiness_address ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Business Address'
                  placeholderTextColor={isFocused.bussiness_address ? "gray" : "white"}
                  onFocus={() => handleInputFocus('bussiness_address')}
                  onBlur={() => handleInputBlur('bussiness_address')}

                />
              )}
              name="bussiness_address"
            />

            <TextErrorMessage error={errors?.bussiness_address?.message ? 'Business Address is required' : ''} />
          </View>


        </View>


        <View>
          {!isLoading ? (
            <TouchableOpacity
              style={[styles.loginButton, { marginBottom: windowHeight / 50 }]}
              onPress={handleSubmit(onSubmit)}>
              <Text style={[styles.buttonText, { color: 'white', }]}> Create </Text>
            </TouchableOpacity>) : (<ActivityIndicator style={[styles.loginButton, { marginBottom: windowHeight / 50 }]} size="small" color="white" />)}
        </View>



      </AuthStackGradientContainer>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  mainHeading: {
    fontSize: 18, fontWeight: "700", color: "white", textAlign: "center"
  },
  avatarView: { marginTop: windowHeight / 35, marginBottom: windowHeight / 35 },


  loginButton: {
    width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: buttonColor, padding: windowWidth / 18, marginTop: windowHeight / 15, fontWeight: '700',
  },
  buttonText: {
    textAlign: "center", fontSize: 16, fontWeight: '700',
  },

  plusIconImage: {
    alignItems: 'center', width: windowWidth / 3, borderWidth: 1.5, justifyContent: 'center',
    borderColor: 'white',
    height: windowWidth / 3,
    borderRadius: windowWidth / 6,
    marginTop: 10
  },


  onfocusInput: {
    backgroundColor: "white",
    color: "gray",


  },
  onblurInput: {
    backgroundColor: "#761D1D",
    color: "white",

  },
  cardImage: {
    marginTop: windowHeight / 20,
    alignItems: 'center',
  },
  image: {
    width: windowWidth / 2.4,
    height: windowWidth / 2.4,
    borderWidth: 2,
    borderRadius: windowWidth / 4.8
  },


});