import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Dimensions, ScrollView,TouchableOpacity } from 'react-native';
import { Button, Text, Overlay } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import input_styles from "../Auth/Styles"
import { ScreenHeader } from '../../components/ScreenHeader';
import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextErrorMessage from '../../components/TextErrorMessage';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
import ArrowBack from '../../components/ArrowBack'

const schema = yup.object({
  new_password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('new password is required').min(8),
  old_password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('old password is required').min(8),
  confirm_password: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').required('confirm_password is mendatory').oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();

export default function BusinessChangePassword({ navigation }) {
  const [hidePass, setHidePass] = useState(true);
  const [confirmHidePass, setConfirmHidePass] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState({
   
    old_password: false,
    new_password:false,
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

    setError(null);
    setIsloading(true);
    const storedOtp = await AsyncStorage.getItem('otpData');
    data['email'] = JSON.parse(storedOtp).email;


    try {

      await dispatch(authActions.resetPassord(data));
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
    <ScrollView style={{ backgroundColor: 'black' }} >
      <AuthStackGradientContainer>
      <View style={{ marginTop: WindowHeight / 40,}}>
              <ScreenHeader name="Change Password" />
            </View>
          
      <ArrowBack />
        <View style={styles.centeredView}>

          <Overlay isVisible={visible} >
            <View style={styles.alertModel}>
              <Icon name='check-circle' size={30} color="lime" style={{ textAlign: 'center' }} />
              <Text style={styles.modalAlertText}>Your password reset successfully</Text>
              <Button
                title="Okay"
                onPress={() => navigation.navigate('LoginScreen')}
                type="outline"

                containerStyle={{
                  marginTop: 20,
                  paddingHorizontal: 40
                }}
            
              />
            </View>
          </Overlay>

          <View >
          
     
            <View style={{ marginTop: WindowHeight / 9 }}>



</View>

            <View >

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input, { alignSelf: 'center',paddingLeft:20 }], isFocused.old_password ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.trim()}
                    secureTextEntry={hidePass ? true : false}
                    placeholder="Old Password"
                    placeholderTextColor={isFocused.old_password ? "gray" : "white"}
                    onFocus={() => handleInputFocus('old_password')}
                    onBlur={() => handleInputBlur('old_password')}
                    
                  />
                )}
                name="old_password"
              />
              {/* <Icon
                name={hidePass ? 'eye-slash' : 'eye'}
                size={20}
                color="#1A1A1A"
                onPress={() => setHidePass(!hidePass)}
                style={styles.passwordIcon}
              /> */}

              <TextErrorMessage error={errors?.old_password?.message} />

            </View>
            <Controller
  control={control}
  rules={{
    required: true,
  }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      style={[[input_styles.input, { alignSelf: 'center',paddingLeft:20 }], isFocused.new_password ? styles.onfocusInput : styles.onblurInput]}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value?.trim()}
      secureTextEntry={hidePass ? true : false}
      placeholder="New Password"
      placeholderTextColor={isFocused.new_password ? "gray" : "white"}
      onFocus={() => handleInputFocus('new_password')}
      onBlur={() => handleInputBlur('new_password')}
    />
  )}
  name="new_password"
/>
{/* <Icon
  name={hidePass ? 'eye-slash' : 'eye'}
  size={20}
  color="#1A1A1A"
  onPress={() => setHidePass(!hidePass)}
  style={styles.passwordIcon}
/> */}

<TextErrorMessage error={errors?.new_password?.message} />
            <View>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[[input_styles.input , { alignSelf: 'center',paddingLeft:20 }], isFocused.confirm_password ? styles.onfocusInput : styles.onblurInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.trim()}
                    secureTextEntry={confirmHidePass ? true : false}
                    placeholder="Confirm New Password"
                    placeholderTextColor={isFocused.confirm_password ? "gray" : "white"}
                    onFocus={() => handleInputFocus('confirm_password')}
                    onBlur={() => handleInputBlur('confirm_password')}
                  />
                )}
                name="confirm_password"
              />
              {/* <Icon
                name={confirmHidePass ? 'eye-slash' : 'eye'}
                size={20}
                color="#1A1A1A"
                onPress={() => setConfirmHidePass(!confirmHidePass)}
                style={styles.passwordIcon}
              /> */}
            </View>

            <TextErrorMessage error={errors?.confirm_password?.message} />
          </View>

          <View style={{ paddingBottom: WindowHeight/35, marginTop: WindowHeight / 3.9, }} >
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Save"
              buttonStyle={{
                width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: buttonColor, padding: WindowWidth / 18, fontWeight: '700',
              }}
              titleStyle={{ fontWeight: 'bold', color: 'white' }}
            />
          </View>
        </View>
      </AuthStackGradientContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: secondaryColor,
  },


  alertModel: {
    borderRadius: 45,
    backgroundColor: 'white',
    padding: 20,

  },

  modalAlertText: {
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold'
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
