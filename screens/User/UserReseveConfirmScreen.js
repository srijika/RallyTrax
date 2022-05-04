import React, { useState, useEffect } from 'react'
import {
  StyleSheet,

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
import { Button, Text, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalizeFont } from '../../constants/Helper'
import { useNavigation } from '@react-navigation/native';
import ArrowBack from '../../components/ArrowBack'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useIsFocused } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as eventAction from '../../store/actions/event';


const UserReseveConfirmScreen = ({ route }) => {
  const [visible, setVisible] = useState(false);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const user_data = state?.user?.user;
  const booking_data = state?.event?.bookingNumber;


  const data = route.params.data.events[0];
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const event_photo = data?.event_photo ? { uri: data.event_photo } : require('../../assets/images/card.jpeg')

  useEffect(() => {
    setIsloading(false);
  },[isFocused])

  const bookingHandler = async () => {
    setIsloading(true);
    setVisible(false)
    let bookingData = {
      'user_id': user_data._id,
      'event_id': data._id,
      'business_user_id': data.user_id,
      'booking_amount': data.amount,
      'event_name': data.event_name
    };
    try {

      const result = await dispatch(eventAction.addEventBooking(bookingData))
     
    
      if (result) {
        navigation.navigate('UserBookingConfirmScreen',{bookingNumber:result})
      }


    }
    catch (error) {

      Alert.alert("error", error.message)

    }

  }


  return (
    <>

      <View style={styles.wrapper1}>
        <View style={styles.wrapper2}>
          <Image
            style={{ marginTop: -windowHeight / 55.15, }}
            source={require('../../assets/images/f1.png')} />

        </View>
        <TouchableOpacity style={{ zIndex: 1, position: 'absolute', top: windowHeight / 17 }} onPress={() => navigation.goBack()}>
          <ArrowBack />
        </TouchableOpacity>
        <Overlay overlayStyle={{ width: "90%", padding: 0, borderRadius: 10, backgroundColor: '#e8e8e8' }}
          isVisible={visible} >
          <View style={styles.alertModel}>
            <View style={{ width: '55%', alignSelf: 'center', marginTop: 15 }}>
              <Text style={styles.modalAlertText}>Are you sure you want to reserve a seat?</Text>
            </View>

            <View style={{ borderRadius: 10, flexDirection: 'row', marginTop: 30, }}>
              <TouchableOpacity onPress={() => setVisible(false)} style={{ padding: 18, width: "50%", borderTopWidth: 0.5, borderRightWidth: 0.5, borderColor: '#7F000000 ' }}>
                <Text style={{ textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => bookingHandler()}
                style={{ padding: 18, width: "50%", borderTopWidth: 0.5, borderColor: '#7F000000 ' }}>
                <Text style={{ textAlign: 'center', fontWeight: '700' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>

        <ScrollView style={{ marginTop: windowHeight / 5.5 }}>
          <View style={styles.card}>
            <Image style={styles.image} source={event_photo} resizeMode={"cover"} />

            <View style={styles.setText}>
              <Text numberOfLines={2} style={{ width: "80%", color: 'white', fontSize: normalizeFont(20), fontWeight: '900' }}>{data.event_name}</Text>
              <Text style={{ color: 'white', fontSize: normalizeFont(15), paddingVertical: 2 }}>Buy in:${data.amount}</Text>
              <Text style={{ color: 'white', paddingVertical: 2, fontSize: normalizeFont(13), fontWeight: '500' }}>Vacant seats: {data.no_of_vacant_seat}</Text>
              <Text style={{ color: 'white', paddingVertical: 5, fontSize: normalizeFont(13) }}>Handling Charges: $2.00</Text>


            </View>
          </View>
        
          <View style={{ width: '100%', height: 200 }}>
            <MapView
              style={styles.map}
              region={{
                latitude: data.location.coordinates[1],
                longitude: data.location.coordinates[0],
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >
              <Marker
                coordinate={{ latitude: data.location.coordinates[1], longitude: data.location.coordinates[0] }}

              />

            </MapView>
          </View>
          <ScrollView nestedScrollEnabled={true} style={{ padding: 20, maxHeight: windowHeight / 6, minHeight: windowHeight / 6 }} >
            <View >
              <Text style={{ color: 'white' }}> {data.event_detail}</Text>
            </View>
          </ScrollView>
     <View style={{ backgroundColor:'#3c4343',width:'90%',marginTop:10,alignItems:'center', alignSelf: 'center',borderRadius:10 }}>
       <Text style={{ color:'white',paddingTop:15,fontWeight: '700',fontSize:normalizeFont(18)}}>Your Booking Id</Text>
       <Text style={{ color:'white',paddingVertical:8,paddingBottom:20,fontWeight: '500'}}>{route.params.data.booking_number}</Text>
     </View>
     <Text style={{ color:'white',textAlign:'center',fontSize:normalizeFont(22),fontWeight:'700',paddingTop:windowHeight/40,paddingBottom:windowHeight/40 }}>Reserved</Text>
     </ScrollView>
          </View>
          
          </>
     
    )
    }
  
  export default UserReseveConfirmScreen;
  
  const styles=StyleSheet.create({
    wrapper1:{
      flex: 1,
       backgroundColor:'#232727',
    },
    wrapper2: {
     position: "absolute",
     zIndex: 1,
      alignItems: 'center',
      borderBottom:2,
      alignSelf:'center'
    
    
    },

    
    image: {
      width: windowWidth/3,
      height: windowWidth/3,
      borderWidth: 2,
      borderRadius: windowWidth/30,
    },
    card:{
    
      flexDirection: 'row',
   //   backgroundColor:'#232727',
      marginLeft:windowWidth/20,
      borderRadius: windowWidth/30,
      marginBottom:windowHeight/35
    },
    setText: {
      margin:windowWidth/110,
      paddingLeft:10
      
   
    },
    loginButton: {
        width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: "#5b0b0b", padding: windowWidth / 18, marginTop: windowHeight / 60, fontWeight: '700',
      },
      buttonText: {
        textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
      },
      map: {

        ...StyleSheet.absoluteFillObject,
        height: 200,
    
      },
  })