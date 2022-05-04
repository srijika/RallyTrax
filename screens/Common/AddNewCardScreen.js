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

} from 'react-native';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalizeFont } from '../../constants/Helper'
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '../../components/ScreenHeader';
import CheckBox from '../../components/CheckBox';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import input_styles from "../Auth/Styles"
import ArrowBack from '../../components/ArrowBack'
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),

  password: yup.string()
    .matches(/^\S*$/, 'Whitespace is not allowed')
    .required('password is required ').min(8),
}).required();

const AddNewCardScreen = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(false)
  const [isFocused, setIsFocused] = useState({
    event_name: false,
    buy_in_amount: false,
    Details: false,
    Location: false,
    Vacant_Seats: false,
    date: false,
    time: false,


  })
  const [isLoading, setIsloading] = useState(false);
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
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  return (
    <ScrollView style={{ backgroundColor: "black" }} >
      <AuthStackGradientContainer>
        <View>
          <KeyboardAvoidingView>
            <View style={styles.avatarView}>
              <ScreenHeader name="Add New Card" />

            </View>
            <ArrowBack />
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
                    value={value?.trim()}
                    placeholder={`Card Holder's Name`}
                    placeholderTextColor={isFocused.event_name ? "gray" : "#d6c9c8"}
                    onFocus={() => handleInputFocus('event_name')}
                    onBlur={() => handleInputBlur('event_name')}
                  />

                )}
                name="holder_name"
              />
            </View>




            <View>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20 }], isFocused.Vacant_Seats ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.trim()}
                    placeholder='Card Number'
                    placeholderTextColor={isFocused.Vacant_Seats ? "gray" : "#d6c9c8"}
                    onFocus={() => handleInputFocus('Vacant_Seats')}
                    onBlur={() => handleInputBlur('Vacant_Seats')}
                  />

                )}
                name="card_number"
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input, { paddingLeft: 20, width: "43.5%", }], isFocused.date ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.trim()}
                    placeholder='MM/YY'
                    placeholderTextColor={isFocused.date ? "gray" : "#d6c9c8"}
                    onFocus={() => handleInputFocus('date')}
                    onBlur={() => handleInputBlur('date')}
                  />

                )}
                name="date"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input, { alignSelf: 'center', paddingLeft: 20, width: "43.5%", marginLeft: 0, }], isFocused.time ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.trim()}
                    placeholder='CVV'
                    placeholderTextColor={isFocused.time ? "gray" : "#d6c9c8"}
                    onFocus={() => handleInputFocus('time')}
                    onBlur={() => handleInputBlur('time')}
                  />

                )}
                name="Cvv"
              />
            </View>



            <View >
              {!isLoading ? (
                <TouchableOpacity
                  style={[styles.loginButton, { marginBottom: WindowHeight / 40 }]}
                  onPress={() => navigation.navigate('BusinessInvitePleyer')}
                >
                  <Text style={[styles.buttonText, { color: '#ffffff' }]}> Add </Text>
                </TouchableOpacity>) : (<ActivityIndicator style={[styles.loginButton, { marginBottom: WindowHeight / 25 }]} size="small" color="white" />)}
            </View>
          </KeyboardAvoidingView>

        </View>
      </AuthStackGradientContainer>
    </ScrollView>
  )
}
export default AddNewCardScreen

const styles = StyleSheet.create({

  loginButton: {
    width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: 'black', padding: WindowWidth / 18, marginTop: WindowHeight / 2.7, fontWeight: '700',
  },
  buttonText: {
    textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
  },
  avatarView: { marginBottom: WindowHeight / 24, marginTop: WindowHeight / 40 },
  icon: {
    position: 'absolute',
    left: WindowWidth / 13.33,
    top: WindowHeight / 27.5,

    color: 'white',

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

});
