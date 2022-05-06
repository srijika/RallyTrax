import React, { useEffect, useState } from "react";
import { Overlay, Button } from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Platform, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconics from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';
import { secondaryColor } from "../../constants/Colors";
import RNLocation from 'react-native-location';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
import { normalizeFont } from '../../constants/Helper';





export default function UserTypeScreen({ navigation }) {

  // RNLocation.configure({
  //     distanceFilter: null
  //    })

  const [isAuth, setIsAuth] = useState(false);
  const [visible, setVisible] = useState(true);
  const chevRonIcon = <Icon name="chevron-right" style={{ marginTop: 5, fontSize: 16, color: secondaryColor }} />
  const handleRedirect = async (role) => {
    const storeRole = await AsyncStorage.setItem('userAuthData', JSON.stringify({
      role: role,
    }));

    navigation.navigate('LoginScreen')
  }



  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const permissionHandle = async () => {


    let location;
    let permission;
    const CheckPermission = await RNLocation.checkPermission(
      {
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      }
    );
      
    if (!permission) {
      console.log("not permission")
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      })
      console.log(permission)
      location = await RNLocation.getLatestLocation({ timeout: 100 })
      // console.log(location)
    } else {
      console.log("permission")
      location = await RNLocation.getLatestLocation({ timeout: 100 })
      //console.log(location)
    }

  }




  return (

    <View style={styles.centeredView}>
      <View style={{ backgroundColor: "#5b0b0b", borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>

        <Text style={{ color: '#fcfbfb', textAlign: 'center', marginTop: WindowHeight / 7, fontWeight: '700', fontSize: normalizeFont(25) }}>Select Account</Text>

        <View style={styles.contentBox}>
          <TouchableOpacity style={{ marginTop: WindowHeight / 16, }} onPress={() => {
            handleRedirect('USER')
          }}>
            <View style={styles.dropBox}>
              <Text style={styles.dropBoxText}> User </Text>

            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: WindowHeight / 30, marginBottom: WindowHeight / 3.6 }} onPress={() => {

            handleRedirect('BUSINESS')
            //   permissionHandle()
          }}>
            <View style={[styles.dropBox, { backgroundColor: "#5b0b0b", borderWidth: 1, borderColor: '#e5d9d9' }]}>
              <Text style={[styles.dropBoxText, { color: "#e5d9d9" }]}> Business</Text>

            </View>
          </TouchableOpacity>


        </View>

      </View>
      <TouchableOpacity
        onPress={() => {
          //handleRedirect('USER')
          navigation.navigate('RegisterScreen')
        }}
      ><Text style={{ color: "#b8baba", fontSize: normalizeFont(18), textAlign: 'center', marginTop: WindowHeight / 25 }}>NEW?{" "}
          <Text style={{ textDecorationLine: 'underline' }}>
            REGISTER HERE </Text></Text>
      </TouchableOpacity>
      {/*             
            <Overlay overlayStyle={{ width: "90%", paddingVertical:20,  borderRadius: 10, backgroundColor: '#e8e8e8' }}
          isVisible={visible} >
              <Iconics name="location-sharp" size={40} color="#5B0B0B" style={{alignSelf:"center"}}/>
          <View style={styles.alertModel}>
            <View style={{  alignSelf: 'center', marginTop: 15 }}>
              <Text style={{fontSize:  normalizeFont(20), fontWeight:"600", textAlign:"center"  }}>Allow Rally Trax </Text>
              <Text style={{fontSize:  normalizeFont(20), fontWeight:"600",  textAlign:"center"  }}> to access device's location?</Text>
            </View>

            <View style={{ borderRadius: 10, justifyContent:"center", alignItems:"center", marginTop: 30, }}>
              <TouchableOpacity onPress={() => setVisible(false)} style={{ padding: 10, borderBottomWidth:0.5, borderBottomColor:'gray', width:'70%'  }}>
                <Text style={{ textAlign: 'center', fontWeight: '900',  }}>Always</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)} style={{ padding: 10, borderBottomWidth:0.60, borderBottomColor:'gray', width:'70%'    }}>
                <Text style={{ textAlign: 'center', fontWeight: '900' }}>While Using the app</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => bookingHandler()}
                style={{ padding: 10, }}>
                <Text style={{ textAlign: 'center', fontWeight: '900' }}>Never</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay> */}





    </View>

  );
};



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    //  justifyContent: "center" ,

    //fontFamily: 'Roboto',
    backgroundColor: '#030b0b'
  },
  dropBox: {
    borderRadius: 30, backgroundColor: "#030b0b", flexDirection: "row", justifyContent: "center", padding: 16, marginTop: 10
  },
  dropBoxText: {
    fontSize: 16, color: "#a4a7a7", fontWeight: "bold",
  },
  contentBox: { paddingVertical: Platform.OS == "android" ? 40 : 60, width: '90%', alignSelf: 'center' }
});