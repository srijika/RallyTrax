
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
//import * as userActions from '../store/actions/users';

import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Button,
  Dimensions
} from 'react-native'
import { normalizeFont } from '../constants/Helper'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SettingScreen = ({navigation}) => {
 
//  const [data,setData]=useState(form)

//const {navigate} = useNavigation();
  return (
   <>
   <View  style={styles.wrapper1}>
    <View style={styles.wrapper2}>
      <Image style={{marginTop:-windowHeight/55.15}} source={require('../../assets/images/f1.png')} />
      </View>
   
     
        </View>
        </>
   
  )
  }

export default SettingScreen;

const styles=StyleSheet.create({
  wrapper1:{
    flex: 1,
    backgroundColor:'#121515'
  },
  wrapper2: {
  //  backgroundColor:"#5b0b0b",
   // flex:1,
    alignItems: 'center',
    borderBottom:2,
    borderColor:'white',
    // borderBottomLeftRadius: width/2,
    // borderBottomRightRadius: width/2,
  
  },
  imageIcon:{
    backgroundColor:'#121515',
    justifyContent:'center',
    alignItems: 'center',
    flex:4,
  },
  cardImage:{
    marginTop:windowHeight/20,
    alignItems: 'center',
  },
  image: {
    width: windowWidth/2.4,
    height: windowWidth/2.4,
    borderWidth: 2,
    borderRadius: windowWidth/4.8
  },
  button: {
    fontSize: normalizeFont(20),
    color: '#ffffff',
    borderRadius: windowWidth/12,
    marginTop: windowWidth/18,
    backgroundColor: 'black',
    padding: normalizeFont(15),
    textAlign: 'center',
  },
  button2: {
    fontSize: normalizeFont(20),
    color: '#7a7c7c',
    marginTop: windowWidth/18,
    // backgroundColor: 'black',
    paddingTop:normalizeFont(15),
    paddingBottom:normalizeFont(15),
   
  },
  RightIcon: {
    padding: 10,
      position: 'absolute',
      right: 0,
      top:24
  },
})