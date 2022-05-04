import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import { buttonColor, headerBgColor, primaryColor, secondaryColor } from '../../constants/Colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import { normalizeFont } from '../../constants/Helper';
import ArrowBack from '../../components/ArrowBack'
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;


export default function OtpScreen({ navigation }) {
  const [isLoading, setIsloading] = useState(false);
  const [dummyOtp, setDummyOtp] = useState();
  const [userOtp, setUserOtp] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const storedOtp = await AsyncStorage.getItem('otpData');
    let otpData = JSON.parse(storedOtp);
    setDummyOtp(otpData.otp);
  };

  const handleCode = async () => {
    let code = userOtp;
    const storedOtp = await AsyncStorage.getItem('otpData');
    let storedUserData = await AsyncStorage.getItem('userdata');
    let otpData = JSON.parse(storedOtp);
    let role = await AsyncStorage.getItem('userAuthData');
    role = JSON.parse(role);
    storedUserData = JSON.parse(storedUserData);
    storedUserData.role = role.role;
   

    if (dummyOtp === code && otpData.type == 'register') {
      try {
        await dispatch(authActions.signup(storedUserData));
      } catch (error) {
        console.log("error----",error);
        setError(error.message);
      }
    } else if (dummyOtp === code && otpData.type == 'forgot') {
      navigation.navigate('ChangePasswordScreen');

      try {
        await dispatch(authActions.signup(JSON.parse(storedUserData)));
      } catch (error) {
        setError(error.message);
      }
    } else {
      Alert.alert('', 'Please enter valid otp');
    }
  };

  const [seconds, setSeconds] = React.useState(25);
  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  });

  const handleResendOtp = () => {
    setSeconds(25);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <AuthStackGradientContainer>
        <View style={styles.avatarView}>
          <ScreenHeader name="Verification" />
          
          <Text style={styles.instruction}> A 4-digit OTP</Text>
          <Text style={{  fontSize: normalizeFont(16), color: "white", textAlign: "center", paddingTop: 5, }}> was just sent to ****@gmail.com. </Text>

        </View>
    <ArrowBack  />
        <View
          style={{
         
            flex: 1,
            justifyContent: 'center',
           
          }}>
          {/* <Text style={{ color: 'white', fontSize: normalizeFont(17)}}> {dummyOtp} </Text> */}


          <View style={{ marginTop: WindowHeight/6, width:'60%',alignSelf:'center' }}>
            <OTPInputView
              style={[styles.inputView, { color: 'black', fontSize: normalizeFont(30) }]}
              pinCount={4}
              codeInputFieldStyle={styles.textBoxDesign}
              placeholderCharacter='-'
              placeholderTextColor='white'
              onCodeFilled={code => {

                setUserOtp(code);
               
              }}
            />

         
                    <View style={{ marginTop:WindowHeight/10}}>
            {seconds > 0 ? (
              <View
                style={{
               //   marginTop: 10,
                  justifyContent: 'center',
                //  alignItems: 'center',
                }}>
            
                <Text style={[styles.resendText,]}>Resend OTP : {seconds}</Text>
              </View>
            ) : (

              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  handleResendOtp();

                }}>
                  <View style={{ flexDirection: 'row'}}>
                <Text style={{ color: 'white',paddingTop:1}}> Didn't receive a text?{" "}
               
                </Text>
                <Text style={{ color: 'white',fontWeight: 'bold',paddingBottom:15,fontSize:normalizeFont(18)}}>

                 Resend Code
                </Text>
                </View>




              </TouchableOpacity>
            )}
          </View>
        </View>

      
        <View style={{ marginBottom:5, width: '95%', alignSelf: 'center' }}>
          {!isLoading ? (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleCode()} 
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>
                Continue
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="small" color="white" />
          )}
        </View>
        </View>
      </AuthStackGradientContainer>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  mainHeading: {
    fontSize: normalizeFont(15),
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  inputView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  button: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  
  textBoxDesign: {
    backgroundColor: '#761D1D',
    height: 60,
    width: 50,
    borderRadius: 8,
    borderColor: '#761D1D',
    color: 'white',
    fontSize: normalizeFont(35),


  },
  // textUnderline: {
  //   height: 0,
  //   width: 90,
  //   borderTopColor: 'white',
  //   borderTopWidth: 2,
  //   marginBottom: 20,
  // },
  bottomButton: {
    backgroundColor: buttonColor,
    justifyContent: 'center',
    width: "112%",
    height: 40
  },
  instruction: {
    fontSize: normalizeFont(16), color: "white",textAlign: "center", paddingTop:15
  },
  resendText: {fontSize:normalizeFont(18),paddingBottom:15,color: "white",textAlign: "center", },
  avatarView: { marginTop: WindowHeight/8, marginBottom: WindowHeight/100 },
  loginButton: {
    width:"95%",alignSelf: "center",   borderRadius: 30, backgroundColor: buttonColor, padding: WindowWidth/18, marginBottom: WindowHeight/60, fontWeight: '700',
     },
  link: {
    color: "white",fontSize :normalizeFont(25)
  },
});
