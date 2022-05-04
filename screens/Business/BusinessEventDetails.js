import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventAction from '../../store/actions/event'
import { useIsFocused } from '@react-navigation/native';


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

import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalizeFont } from '../../constants/Helper'
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ArrowBack from '../../components/ArrowBack';
const GOOGLE_PLACE_API = 'AIzaSyAn19Rmj_VfL5QUjn9vpTtBVKe3eEetx_I';
const BusinessEventDetails = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEvent, setIsEvent] = useState(false);
  const isFocused = useIsFocused();
  const state = useSelector(state => state);
  const data = route.params.data;

  const event_photo = data?.event_photo ? { uri: data.event_photo } : require('../../assets/images/card.jpeg')

  useEffect(() => {
    //get listing 
    if (isFocused) {


    }

  }, [isFocused]);



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
        <View style={styles.card} >
          <Image style={styles.image} source={event_photo} resizeMode={"cover"} />

          <View style={styles.setText}>
            <Text  numberOfLines={2} style={{ width: "80%", color: 'white', fontSize: normalizeFont(20), fontWeight: '900' }}>{data.event_name}</Text>
            <Text style={{ color: 'white', fontSize: normalizeFont(15), paddingVertical: 2 }}>Buy in:${data.amount}</Text>
            <Text style={{ color: 'white', paddingVertical: 2, fontSize: normalizeFont(13), fontWeight: '500' }}>Vacant seats: {data.no_of_vacant_seat}</Text>
            <TouchableOpacity 
            onPress={()=>{
              navigation.navigate("BusinessPokerRun",{
                data:data
              })
            }}
            style={{ width:windowWidth / 4.5, marginTop: 5, borderRadius: 30, padding: 5, backgroundColor: "#5b0b0b", fontWeight: '700', }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="edit" size={18} color="white" />
                <Text style={{ color: 'white', paddingLeft: 10, fontSize: normalizeFont(15) }}>Edit</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <ScrollView >
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
        
          <ScrollView nestedScrollEnabled={true} style={{ padding: 20, maxHeight: windowHeight / 4.5, minHeight: windowHeight / 4.5 }} >
            <View >
              <Text style={{ color: 'white' }}> {data.event_detail}</Text>
            </View>
          </ScrollView>
          <View >
            {
              <TouchableOpacity
                style={[styles.loginButton, { marginBottom: windowHeight / 40 }]}
                onPress={() => navigation.navigate('BusinessInvitePleyer')}
              >
                <Text style={[styles.buttonText, { color: 'white' }]}> Invite Players </Text>
              </TouchableOpacity>}
          </View>
          <View style={{ marginLeft: windowWidth / 20 }}>
            <Text style={{ color: 'white', fontSize: normalizeFont(23), fontWeight: '700', }}>Players So Far</Text>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ width: 60, height: 60 }}>
                <Image style={{
                  width: '100%',
                  height: '100%', borderRadius: 30,
                }} source={require('../../assets/images/lady.jpeg')} />

              </View>
              <View>
                <Text style={{ color: 'white', paddingLeft: 15, fontSize: normalizeFont(16) }}>Player Name</Text>
                <Text style={{ color: 'gray', paddingLeft: 15, fontSize: normalizeFont(12) }}>3 minutes ago</Text>
              </View>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ width: 60, height: 60 }}>
                <Image style={{
                  width: '100%',
                  height: '100%', borderRadius: 30,
                }} source={require('../../assets/images/lady.jpeg')} />

              </View>
              <View>
                <Text style={{ color: 'white', paddingLeft: 15, fontSize: normalizeFont(16) }}>Player Name</Text>
                <Text style={{ color: 'gray', paddingLeft: 15, fontSize: normalizeFont(12) }}>3 minutes ago</Text>
              </View>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ width: 60, height: 60 }}>
                <Image style={{
                  width: '100%',
                  height: '100%', borderRadius: 30,
                }} source={require('../../assets/images/lady.jpeg')} />

              </View>
              <View>
                <Text style={{ color: 'white', paddingLeft: 15, fontSize: normalizeFont(16) }}>Player Name</Text>
                <Text style={{ color: 'gray', paddingLeft: 15, fontSize: normalizeFont(12) }}>3 minutes ago</Text>
              </View>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <View style={{ width: 60, height: 60 }}>
                <Image style={{
                  width: '100%',
                  height: '100%', borderRadius: 30,
                }} source={require('../../assets/images/lady.jpeg')} />

              </View>
              <View>
                <Text style={{ color: 'white', paddingLeft: 15, fontSize: normalizeFont(16) }}>Player Name</Text>
                <Text style={{ color: 'gray', paddingLeft: 15, fontSize: normalizeFont(12) }}>3 minutes ago</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>

    </>

  )
}

export default BusinessEventDetails;

const styles = StyleSheet.create({
  wrapper1: {
    flex: 1,
    backgroundColor: '#232727',
  },
  wrapper2: {
    position: "absolute",
    zIndex: 1,
    alignItems: 'center',
    borderBottom: 2,
    alignSelf: 'center'


  },

  image: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    borderWidth: 2,
    borderRadius: windowWidth / 30,
  },
  card: {

    flexDirection: 'row',
    //   backgroundColor:'#232727',
    marginLeft: windowWidth / 20,
    borderRadius: windowWidth / 30,
    marginBottom: windowHeight / 50,
    marginTop: windowHeight / 5.5
  },
  setText: {
    //  margin:windowWidth/110,
    paddingLeft: 10,



  },
  loginButton: {
    width: "95%", alignSelf: "center", borderRadius: 30, backgroundColor: "#5b0b0b", padding: windowWidth / 18, marginTop: windowHeight / 120, fontWeight: '700',
  },
  buttonText: {
    textAlign: "center", fontSize: normalizeFont(16), fontWeight: '700',
  },
  map: {

    ...StyleSheet.absoluteFillObject,
    height: 200,

  },
})