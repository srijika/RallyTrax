import React, { useState, useEffect } from 'react'
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
  SafeAreaView,
  Button,
  Platform


} from 'react-native';
import { CameraPermission } from '../../constants/CameraPermission';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

import TextErrorMessage from '../../components/TextErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalizeFont } from '../../constants/Helper'
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '../../components/ScreenHeader';
import CheckBox from '../../components/CheckBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import * as eventAction from '../../store/actions/event';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ActionSheet from 'react-native-actionsheet'

import moment from 'moment';

import input_styles from "../Auth/Styles"
import ArrowBack from '../../components/ArrowBack'
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import { FlatList } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//const GOOGLE_PLACE_API = 'AIzaSyA06723l5OYrbyObAOTOiButMPAhVYtPVw';
const GOOGLE_PLACE_API = 'AIzaSyDcvbfbNnJV17H21MeohzMTJug4IM2oI7k';




const schema = yup.object({
  event_name: yup.string().required(),
  amount: yup.string().required(),
  event_detail: yup.string().required(),
  //event_address: yup.string().required(),
  no_of_vacant_seat: yup.string().required(),
  event_date: yup.string().required(),
  event_time: yup.string().required(),


}).required();

const BusinessPokerRun = ({route}) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false)
  const [poker, setPoker] = useState({})
  const [imageUri, setImageUri] = useState('');
  const [pokerId, setPokerId] = useState('');
  const pokerData = route?.params?.data;
  

  useEffect(() => {
    if(pokerData){
      
      setImageUri(pokerData?.event_photo);
      setValue('event_name', pokerData?.event_name)
      setValue('amount', pokerData?.amount)
      setValue('event_detail', pokerData?.event_detail)
      setValue('no_of_vacant_seat', pokerData?.no_of_vacant_seat)
      setValue('event_address', pokerData?.event_address)
      setValue('no_of_vacant_seat', pokerData?.no_of_vacant_seat)
      setValue('event_date', pokerData?.event_date)
      setValue('event_time', pokerData?.event_time)
      setPokerId(pokerData?._id)
    }
   
  },[])
  
  
  const [selectLocation, setSelectLocation] = useState({
    lat: '',
    long: '',
    address: ''
  })



  // code for date picker 

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
   
    const Date = moment.utc(date).format('DD/MM/YYYY')
    setValue('event_date', Date)
    hideDatePicker();
  };
  // for time
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const Time = moment.utc(time).format('HH:MM')
    setValue('event_time', Time)
    hideTimePicker();
  };

  const [isFocused, setIsFocused] = useState({
    event_name: false,
    amount: false,
    event_detail: false,
    //event_address: false,
    no_of_vacant_seat: false,
    event_date: false,
    event_time: false,


  })
  const [isLoading, setIsloading] = useState(false);
  const handleInputFocus = (textinput) => {
    setIsFocused({
      [textinput]: true
    })
    if (textinput == "event_date") {
      setDatePickerVisibility(true);
    }
    if (textinput == "event_time") {
      setTimePickerVisibility(true);
    }


  }
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false
    })
  }
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({

    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {

   // setIsloading(true);



    try {

      const storedUserData = await AsyncStorage.getItem('userAuthData');
      let userData = JSON.parse(storedUserData);
      const user_id = userData.user._id;
      data['user_id'] = user_id;
      data['long'] = selectLocation.long;
      data['lat'] = selectLocation.lat;
      data['event_address'] = selectLocation.address;
      if(pokerId){
        data['_id']=pokerId;
      }

      // add image ---------------------------

      let formData = new FormData();
      if (imageUri) { 
        let uri = imageUri;
        let fileType = uri.substring(uri.lastIndexOf('.') + 1);
        formData.append('event_photo', {
          uri:
            Platform.OS === 'android'
              ? imageUri
              : imageUri.replace('file://', ''),
          name: `photo.${fileType}`,
          type: `image/*`,
        });
      }
      
      
     
       for (key in data){
        formData.append(key, data[key])
      }

      
           
      await dispatch(eventAction.addEvent(formData));

      navigation.navigate('BusinessInvitePleyer');
    } catch (error) {

      Alert.alert("", error.message)

    }
    setIsloading(false);
  };
  return (


    <ScrollView style={{ flex: 1, backgroundColor: "black" }} keyboardShouldPersistTaps='always'>
      <AuthStackGradientContainer>


        <View style={styles.avatarView}>
          <ScreenHeader name="Create Poker Run" />

        </View>

        <ArrowBack />
        <View>
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

        <View>
          <View>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20 }], isFocused.event_name ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Event Name'
                  placeholderTextColor={isFocused.event_name ? "gray" : "#d6c9c8"}
                  onFocus={() => handleInputFocus('event_name')}
                  onBlur={() => handleInputBlur('event_name')}
                />

              )}
              name="event_name"
            />
            <TextErrorMessage error={errors?.event_name?.message ? 'Event Name is required' : ''} />


          </View>

          <View>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
          
               
              
                <TextInput
                  style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20 }], isFocused.amount ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={`${value? value:""}`}
                  placeholder='Buy In Amount($)'
                  placeholderTextColor={isFocused.amount ? "gray" : "#d6c9c8"}
                  onFocus={() => handleInputFocus('amount')}
                  onBlur={() => handleInputBlur('amount')}
                />
               
              )}
              name="amount"
            />
            <TextErrorMessage error={errors?.amount?.message ? 'Buy In Amount($) is required' : ''} />

          </View>
          <View>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20, textAlignVertical: 'top', }], isFocused.event_detail ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Details..'
                  placeholderTextColor={isFocused.event_detail ? "gray" : "#d6c9c8"}
                  onFocus={() => handleInputFocus('event_detail')}
                  onBlur={() => handleInputBlur('event_detail')}
                  multiline={true}
                  numberOfLines={5}
                  
                  minHeight={(Platform.OS === 'ios') ? (100) : null}
                />

              )}
              name="event_detail"
            />
            <TextErrorMessage error={errors?.event_detail?.message ? 'Details is required' : ''} />

          </View>
          <View style={{ width: '90%', alignSelf: "center", }}>


            <GooglePlacesAutocomplete
              //minLength={15}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}


              styles={{
                textInput: {

                  borderRadius: 10,
                  backgroundColor: '#761D1D',
                  color: "#ffffff",
                  fontWeight: "bold",
                  height: 55,
                  paddingLeft: 20,
                  marginTop: WindowHeight / 142,
                  marginBottom: WindowHeight / 40
                },
                listView: {
                  position: 'absolute',
                  bottom: WindowHeight / 10,

                  width: '100%',

                },
                separator: {
                  flex: 1,
                  height: 1,
                  backgroundColor: '#5B0B0B',
                },

              }}
              textInputProps={{
                placeholderTextColor: '#d6c9c8',
                returnKeyType: "search"
              }}

              placeholder='Location'
              // placeholderTextColor={isFocused.event_detail ? "gray" : "#d6c9c8"}
              fetchDetails={true}
              onPress={async (data, details = null) => {
                // console.log('data', data)
                console.log('details', data)
                setSelectLocation({
                  lat: details.geometry.location.lat,
                  long: details.geometry.location.lng,
                  address: data.description

                })
               

              }}
              query={{
                key: GOOGLE_PLACE_API,
                language: 'en',
              }}
              onFail={(error) => {
                console.error(error)
                console.log('error')
                setSelectLocation({
                  lat: 45.2245,
                  long: 56.25455,
                  address: "mansarovar jaipur"

                })
              }
              }

            />

          </View>

          {/*
<View>


<Controller
control={control}
rules={{
required: true,
}}
render={({ field: { onChange, onBlur, value } }) => (
<TextInput
style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20 }], isFocused.event_address ? styles.onfocusInput : styles.onblurInput]}
onBlur={onBlur}
onChangeText={onChange}
value={value}
placeholder='Location'
placeholderTextColor={isFocused.event_address ? "gray" : "#d6c9c8"}
onFocus={() => handleInputFocus('event_address')}
onBlur={() => handleInputBlur('event_address')}
/>

)}
name="event_address"
/>
<TextErrorMessage error={errors?.event_address?.message ? 'Location is required' : ''} />

</View> */}
          <View>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20, }], isFocused.no_of_vacant_seat ? styles.onfocusInput : styles.onblurInput]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType='numeric'
                  value={`${value? value : ""}`}
                  placeholder='No. Of Vacant Seats'
                  placeholderTextColor={isFocused.no_of_vacant_seat ? "gray" : "#d6c9c8"}
                  onFocus={() => handleInputFocus('no_of_vacant_seat')}
                  onBlur={() => handleInputBlur('no_of_vacant_seat')}
                />

              )}
              name="no_of_vacant_seat"
            />
            <TextErrorMessage error={errors?.no_of_vacant_seat?.message ? 'No. Of Vacant Seats is required' : ''} />

          </View>

          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
            <View style={{ width: '47.5%', }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input, { paddingLeft: WindowWidth / 18, alignSelf: 'center' }], isFocused.event_date ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={`${value ? value : 'DD/MM/YYYY'}`}
                    showSoftInputOnFocus={false}
                    // placeholder='DD/MM/YYYY'
                    placeholderTextColor={isFocused.event_date ? "gray" : "#d6c9c8"}
                    onFocus={() => handleInputFocus('event_date')}
                    onBlur={() => handleInputBlur('event_date')}

                  />


                )}
                name="event_date"
              />
              <TextErrorMessage customMarignLeft={WindowWidth / 36} error={errors?.event_date?.message ? 'Event Date is required' : ''} />
            </View>



            <View style={{ width: '47.5%', }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input, { paddingLeft: 20, alignSelf: 'center' }], isFocused.event_time ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    showSoftInputOnFocus={false}
                    value={`${value ? value : 'HH:MM'}`}
                    placeholder='HH:MM'
                    placeholderTextColor={isFocused.event_time ? "gray" : "#d6c9c8"}
                    onFocus={() => handleInputFocus('event_time')}
                    onBlur={() => handleInputBlur('event_time')}
                  />

                )}
                name="event_time"
              />

              <TextErrorMessage customMarignLeft={8} error={errors?.event_time?.message ? 'Event Time is required' : ''} />

            </View>

          </View>


          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </View>

        </View>




        <View >

        </View>




        <View  >
          {!isLoading ? (
            <TouchableOpacity
              style={[styles.loginButton, { marginBottom: WindowHeight / 40 }]}
              //onPress={() => navigation.navigate('BusinessInvitePleyer')}
              onPress={handleSubmit(onSubmit)}

            >
              <Text style={[styles.buttonText, { color: '#ffffff' }]}> create </Text>
            </TouchableOpacity>) : (<ActivityIndicator style={[styles.loginButton, { marginBottom: WindowHeight / 25 }]} size="small" color="white" />)}
        </View>

      </AuthStackGradientContainer>

    </ScrollView>

  )
}
export default BusinessPokerRun

const styles = StyleSheet.create({

  loginButton: {
    width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: 'black', padding: WindowWidth / 18, marginTop: WindowHeight / 60, fontWeight: '700',
  },
  buttonText: {
    textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
  },
  avatarView: { marginBottom: WindowHeight / 24, marginTop: Platform.OS==="android" ? WindowHeight / 40 :WindowHeight / 18  },

  onfocusInput: {
    backgroundColor: "white",
    color: "gray",
  },
  onblurInput: {
    backgroundColor: "#761D1D",
    color: "white",

  }
  ,

  hairline: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: 50
  },

  loginButtonBelowText1: {

    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: 'white'
  },
  plusIconImage: {
    alignItems: 'center', width: WindowWidth / 4, borderWidth: 1, justifyContent: 'center',
    borderColor: 'white',
    height: WindowWidth / 4,
    borderRadius: WindowWidth / 6,

  },
  cardImage: {
    marginTop: windowHeight / 80,
    marginBottom: windowHeight / 80,
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    width: windowWidth / 4,
    height: windowWidth / 4,
    borderWidth: 1,
    borderRadius: windowWidth / 6
  },


});
