
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import * as userActions from '../../store/actions/users';
import * as authActions from '../../store/actions/auth';
import ArrowBack from '../../components/ArrowBack'
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
import { normalizeFont } from '../../constants/Helper'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BusinessSettings = ({navigation}) => {
  const dispatch = useDispatch();
  const [toggle,setToggle]=useState(false)
  const [isLoading, setIsLoading] = useState(true);
  

  return (
   <>
   <View  style={styles.wrapper1}>
    <View style={styles.wrapper2}>
      <Image style={{marginTop:-windowHeight/55.15}} source={require('../../assets/images/f1.png')} />
      </View>
      <View  style={{ zIndex:1,position:'absolute',top:windowHeight/17 }} >
     <ArrowBack />
     </View>
      <View style={{  width: '90%',alignSelf:'center',borderBottomWidth:1,borderColor:'#7a7c7c'}}
        >
        <Text style={styles.button2}>Push Notifications 
        </Text>
        <Text style={styles.RightIcon}>
        <TouchableOpacity onPress={()=>setToggle(!toggle)}
        
        >  
         <Icon name={toggle?'toggle-on':"toggle-off"} size={22} color="#5a5c5c" / >
         </TouchableOpacity>
         
         </Text>
      </View >
      <TouchableOpacity style={{  width: '90%',alignSelf:'center',borderBottomWidth:1,borderColor:'#7a7c7c'}}
      onPress={() => {navigation.navigate('BusinessTermsCondtions')}}
        >
        <Text style={styles.button2}>Terms $ Conditions </Text>
       
        <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" / ></Text>
      </TouchableOpacity >
      <TouchableOpacity style={{  width: '90%',alignSelf:'center',borderBottomWidth:1,borderColor:'#7a7c7c'}}
         onPress={() => {navigation.navigate('BusinessPrivacyPolicy')}}
        >
        <Text style={styles.button2}>Privacy Policy
        </Text>
        <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" / ></Text>
      </TouchableOpacity >
      
      <TouchableOpacity style={{  width: '90%',alignSelf:'center',borderBottomWidth:1,borderColor:'#7a7c7c'}}
       onPress={() => {navigation.navigate('BusinessAboutUs')}}
        >
        <Text style={styles.button2}>About Us
        </Text>
        <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" / ></Text>
      </TouchableOpacity >
      
      
    
     
        </View>
        </>
   
  )
  }

export default BusinessSettings;

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

  cardImage:{
    marginTop:windowHeight/40,
    alignItems: 'center',
  },
  image: {
    width: windowWidth/3.4,
    height: windowWidth/3.4,
    borderWidth: 2,
    borderRadius: windowWidth/6.8
  },
  button: {
   
    borderRadius: windowWidth/12,
    marginTop: windowWidth/20,
    backgroundColor: '#5b0b0b',
   alignSelf:'center',
    padding:8,
    width:'30%'
    
  },
  button2: {
    fontSize: normalizeFont(20),
    color: '#ffffff',
    marginTop: windowWidth/68,
    // backgroundColor: 'black',
    paddingTop:normalizeFont(10),
    paddingBottom:normalizeFont(10),
   fontWeight: '300'
  },
  RightIcon: {
    padding: 10,
      position: 'absolute',
      right: -10,
      top:7,
      fontWeight:'300'
    
  },
})