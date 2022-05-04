import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import input_styles from "./Styles"
import { AvatarBox } from '../../components/AvatarBox';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import TextErrorMessage from '../../components/TextErrorMessage';
import { Button, Text, Overlay } from 'react-native-elements';
import { ScreenHeader } from '../../components/ScreenHeader';
import ArrowBack from '../../components/ArrowBack'
import { addTripInputLabelColor, buttonColor, headerBgColor, primaryColor, secondaryColor } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'
import { normalizeFont } from '../../constants/Helper';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
console.log(WindowHeight, 'windowWidth' , WindowWidth)
const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),
}).required();


export default function ForgetPasswordScreen({ navigation }) {

  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dummyEmail, setDummyemail] = useState(false);

  const [isFocused, setIsFocused] = useState({
    email: false,
   
  
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
    console.log('sendLinkdata',data)
    setError(null);
    setIsloading(true);
    setDummyemail(data.email);
    try {
      data['type'] = 'forgot';
      await dispatch(authActions.sendOtp(data));
      setVisible(true);
    } catch (error) {
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
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
    <AuthStackGradientContainer>
      <KeyboardAvoidingView>
    <View style={styles.avatarView}>
            <ScreenHeader name="Forgot Password" />
            <Text style={styles.instruction}>Enter email/phone associated with your account</Text>
          </View>
     <ArrowBack  />    
      <Overlay isVisible={visible} >
        <View style={styles.alertModel}>
          <Icon name='check-circle' size={30} color="lime" style={{ textAlign: 'center' }} />
          <Text style={styles.modalAlertText}> A 4-digit verification code was sent to {dummyEmail}. kindly check your email inbox.</Text>
          <Button
            title="Okay"
            onPress={() => navigation.navigate('OtpScreen')}
            type="outline"

            containerStyle={{ 
              marginTop: WindowHeight/37.5, 
              paddingHorizontal: 40
            }}
           
          />
        </View>
      </Overlay>



      <View>
        <View>
          
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={[[input_styles.input],{alignSelf:'center'}, isFocused.email? styles.onfocusInput:styles.onblurInput ]}
              onBlur={onBlur}
                onChangeText={onChange}
                value={value?.trim()}
                placeholder='Email'
                placeholderTextColor={isFocused.email?"gray":"white"}
                onFocus={() => handleInputFocus('email')}
                onBlur={() => handleInputBlur('email')}
              />
            )}
            name="email"
          />
             <Icon name="envelope" style={[styles.icon,isFocused.email?{color: "gray"}:{color:"white"}]} />
          <TextErrorMessage error={errors?.email?.message} />
        </View>

        
      </View>
      <View style={{ paddingBottom:20, marginTop:WindowHeight/4.5 }}>
          {!isLoading ? (
            <TouchableOpacity
              style={[styles.sendLinkButton]}
              onPress={handleSubmit(onSubmit)}>
              <Text style={[styles.buttonText, { color: 'white' }]}>
                Send Link
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="small" color="white" style={{ marginTop: WindowHeight/30,padding: WindowWidth/18 }} />
          )}
        </View>
        </KeyboardAvoidingView>
    </AuthStackGradientContainer>
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  avatarView: { marginBottom: WindowHeight/12,marginTop:WindowHeight/8,},
  
  instruction: {
    fontSize: 16,  color: "white", textAlign: "center", paddingTop: 15, 
    paddingBottom: WindowHeight/12,
    justifyContent:'center', 
    width:'70%', 
    alignSelf:'center'
  },
  sendLinkButton: {
    width:"95%",alignSelf: "center",   borderRadius: 30, backgroundColor: buttonColor, padding: WindowWidth/18, marginTop: WindowHeight/30, fontWeight: '700',
     },
     buttonText: {
      textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
    },
  alertModel: {
    borderRadius: 45,
    backgroundColor: 'white',
    padding: WindowWidth/18,
    marginHorizontal: 10
  },

  modalAlertText: {
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  icon: {
    position: 'absolute',
    left: WindowWidth/13.33,
    top: Platform.OS=="ios"? WindowHeight / 36.12 :WindowHeight / 28.12,
    fontSize: normalizeFont(18),
    color: 'white',
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
