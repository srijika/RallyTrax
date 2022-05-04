
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import ArrowBack from '../../components/ArrowBack'
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
  Dimensions,
  TouchableOpacityBase
} from 'react-native'
import { normalizeFont } from '../../constants/Helper'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import TransactionHistory from '../../components/TransactionHistory';
const BusinessTransactionHistory = ({navigation}) => {
 
//  const [data,setData]=useState(form)

//const {navigate} = useNavigation();
  return (
   <>
    <View  style={styles.wrapper1}>
    <View style={styles.wrapper2}>
      <Image 
      style={{marginTop:-windowHeight/55.15,}} 
      source={require('../../assets/images/f1.png')} />
      
      </View>
      <TouchableOpacity style={{ zIndex:1,position:'absolute',top:windowHeight/17 }} onPress={()=>navigation.goBack() }>
     <ArrowBack  />
     </TouchableOpacity>
      <ScrollView style={{marginTop:windowHeight/9.5}}>
     
      <Text style={{ color:'white',marginTop:windowHeight/12, marginLeft:windowWidth/30,fontSize:normalizeFont(22),fontWeight:'700' }}>Transaction History</Text>
     <TransactionHistory />
     <TransactionHistory />
     <TransactionHistory />
     <TransactionHistory />
     <TransactionHistory />
     <TransactionHistory />
     </ScrollView>
        </View>
        
        </>
   
  )
  }

export default BusinessTransactionHistory;

const styles=StyleSheet.create({
  wrapper1:{
    flex: 1,
     backgroundColor:'#121515',
  },
  wrapper2: {
   position: "absolute",
   zIndex: 1,
    alignItems: 'center',
    borderBottom:2,
    alignSelf:'center'
  
  
  },
//   cardImage:{
//     marginTop:windowHeight/20,
//     alignItems: 'center',
//   },
  image: {
    width: windowWidth/2.8,
    height: windowWidth/2.8,
    borderWidth: 2,
    borderRadius: windowWidth/30,
  },
  card:{
  
    flexDirection: 'row',
    backgroundColor:'#232727',
    marginLeft:windowWidth/30,
    marginRight:windowWidth/30,
    borderRadius: 20,
    marginBottom:windowHeight/35
  },
  setText: {
    margin:windowWidth/110,
    paddingLeft:10
  },
  dateCard:{
  width:"25%",  backgroundColor:'#3c4343',padding:6,borderRadius:20,position:'absolute',right: windowWidth/25,bottom:windowHeight/9.5
  }
})