
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import * as userActions from '../../store/actions/users';
import * as authActions from '../../store/actions/auth';

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
const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [name, setName] = useState();
  const isFocused = useIsFocused();
  const state = useSelector(state => state);
  const user_data = state?.user?.user;

  const profileImage = userData?.avatar ? { uri: userData.avatar } : require('../../assets/images/card.jpeg');


  const getUser = async () => {
    setIsLoading(true)
    await dispatch(userActions.getUser())
    setIsLoading(false)
  };

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true)
      getUser();
    }

  }, [isFocused]);

  useEffect(() => {

    setUserData(user_data)

    if (userData?.business_name) {
      setName(userData.business_name);
    }
    if (userData?.user_name) {
      setName(userData.user_name);
    }
    if ((user_data && user_data.roles == "BUSINESS") && !user_data.business_name) {
      navigation.navigate('CreateProfileScreen')
    }

    if ((user_data && user_data.roles == "USER") && !user_data.user_name) {
      navigation.navigate('CreateUserProfileScreen')
    }
    setIsLoading(false)
  }, [user_data]);

  return (
    <>
      <View style={styles.wrapper1}>
        <View style={styles.wrapper2}>
          <Image style={{ marginTop: -windowHeight / 55.15 }} source={require('../../assets/images/f1.png')} />
        </View>
        <View style={styles.cardImage}>
          <Image style={styles.image} source={profileImage} resizeMode={"cover"} />
        </View>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: windowHeight / 120, fontSize: normalizeFont(20) }}>{name}</Text>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: windowHeight / 120, color: '#7a7c7c', fontSize: normalizeFont(18) }}>{userData?.email}</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => { dispatch(authActions.logout()); }}
        >
          <Text
            style={{ color: 'white', textAlign: 'center' }}
          >Sign Out </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#7a7c7c' }}
          onPress={() => { navigation.navigate('BusinessEditProfile') }}
        >
          <Text style={styles.button2}>Profile
          </Text>
          <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#7a7c7c' }}
          onPress={() => { navigation.navigate(user_data.roles == "BUSINESS" ? 'BusinessTransactionHistory' : "UserTransactionHistoryScreen") }}
        >
          <Text style={styles.button2}>Transaction History
          </Text>
          <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" /></Text>
        </TouchableOpacity>
        {/* <View style={{ width: '80%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#7a7c7c' }}
        >
          <Text style={styles.button2}>User Mode
          </Text>
          <Text style={styles.RightIcon}>
            <TouchableOpacity onPress={() => setToggle(!toggle)}

            >
              <Icon name={toggle ? 'toggle-on' : "toggle-off"} size={22} color="#5a5c5c" />
            </TouchableOpacity>

          </Text>
        </View> */}
        <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#7a7c7c' }}
          onPress={() => { navigation.navigate(user_data.roles == "BUSINESS" ? 'BusinessNotificaton' : "UserNotificationScreen") }}
        >
          <Text style={styles.button2}>Notifications
          </Text>
          <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" /></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate(user_data.roles == "BUSINESS" ? 'BusinessPaymentMethods' : "UserPaymentmethodScreen") }} style={{ width: '80%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#7a7c7c' }}
        >
          <Text style={styles.button2}>Payment Methods
          </Text>
          <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" /></Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '80%', alignSelf: 'center', borderBottomWidth: 1, borderColor: '#7a7c7c' }}
          onPress={() => { navigation.navigate(user_data.roles == "BUSINESS" ? 'BusinessSettings' : "UserSettingScreen") }}
        >

          <Text style={styles.button2}>Settings
          </Text>
          <Text style={styles.RightIcon}><Icon name="chevron-right" size={15} color="#5a5c5c" /></Text>
        </TouchableOpacity>

      </View>
    </>

  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper1: {
    flex: 1,
    backgroundColor: '#121515'
  },
  wrapper2: {
    //  backgroundColor:"#5b0b0b",
    // flex:1,
    alignItems: 'center',
    borderBottom: 2,
    borderColor: 'white',
    // borderBottomLeftRadius: width/2,
    // borderBottomRightRadius: width/2,

  },

  cardImage: {
    marginTop: windowHeight / 40,
    alignItems: 'center',
  },
  image: {
    width: windowWidth / 3.4,
    height: windowWidth / 3.4,
    borderWidth: 2,
    borderRadius: windowWidth / 6.8
  },
  button: {

    borderRadius: windowWidth / 12,
    marginTop: windowWidth / 20,
    backgroundColor: '#5b0b0b',
    alignSelf: 'center',
    padding: 8,
    width: '30%'

  },
  button2: {
    fontSize: normalizeFont(20),
    color: '#ffffff',
    marginTop: windowWidth / 68,
    // backgroundColor: 'black',
    paddingTop: normalizeFont(10),
    paddingBottom: normalizeFont(10),
    fontWeight: '300'
  },
  RightIcon: {
    padding: 10,
    position: 'absolute',
    right: -10,
    top: 7,
    fontWeight: '300'

  },
})