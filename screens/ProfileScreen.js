
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import * as userActions from '../store/actions/users';
import * as authActions from '../store/actions/auth';

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
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [name, setName] = useState();
  const isFocused = useIsFocused();
  const state = useSelector(state => state);
  const user_data = state?.user?.user;
  console.log('try user',user_data);
  const profileImage = userData?.avatar?{uri :userData.avatar}:require('../assets/images/card.jpeg');
 

  const getUser = async () => {
      setIsLoading(true)
      await dispatch(userActions.getUser())
      setIsLoading(false)
  };

  useEffect(() => {
      setIsLoading(true)
      getUser();
  }, [isFocused]);

  useEffect(() => {
    console.log('coming..',user_data)
      setUserData(user_data)
   
      if(userData?.business_name){
        setName(userData.business_name);
      }
      if(userData?.user_name){
        setName(userData.user_name);
      }
      if ((user_data && user_data.roles=="BUSINESS") && !user_data.business_name) {
        navigation.navigate('CreateProfileScreen')
    }
  
    if ((user_data && user_data.roles=="USER") && !user_data.user_name) {
        navigation.navigate('CreateUserProfileScreen')
    }
      setIsLoading(false)
  }, [user_data]);

  return (
   <>
   <View  style={styles.wrapper1}>
    <View style={styles.wrapper2}>
      <Image style={{marginTop:-windowHeight/55.15}} source={require('../assets/images/f1.png')} />
      </View>
      <View style={styles.cardImage}>
      <Image style={styles.image} source={profileImage}  resizeMode={"cover"} />
      </View>
      <Text style={{ color:'white',textAlign:'center', marginTop:windowHeight/30,fontSize:normalizeFont(25) }}>{name}</Text>
      <Text style={{ color:'white',textAlign:'center', marginTop:windowHeight/60,color:'#7a7c7c',fontSize:normalizeFont(18)}}>{userData?.email}</Text>
      <TouchableOpacity style={{  width: '35%',alignSelf:'center' ,}}
        >
        <Text style={styles.button}
        onPress={() => { dispatch(authActions.logout()); }}
        >Sign Out</Text>
      </TouchableOpacity >
      <TouchableOpacity style={{  width: '80%',alignSelf:'center',borderBottomWidth:1,borderColor:'#7a7c7c'}}
        >
        <Text style={styles.button2}>Edit Accout Details 
        </Text>
        <Text style={styles.RightIcon}><Icon name="chevron-right" size={25} color="#7a7c7c" / ></Text>
      </TouchableOpacity >
     
        </View>
        </>
   
  )
  }

export default ProfileScreen;

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