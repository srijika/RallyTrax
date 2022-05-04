import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import * as userActions from '../store/actions/users';
import BussinessHomeScreen from './Business/BussinessHomeScreen';
import UserHomeScreen from './User/SubScreens/UserHomeScreen';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const [userData, setUserData] = useState();
    const state = useSelector(state => state);
    const user_data = state?.user?.user;
    

    const getUser = async () => {

        dispatch(userActions.getUser())
    }; 

    useEffect(() => {  
        getUser();
    }, [isFocused]);


    useEffect(() => {
        setProfileData()
    }, [user_data]);

  

    const setProfileData= () => {
       
        // console.log('setProfileData',user_data)
        if (user_data && user_data.roles=="BUSINESS" && !user_data.business_name) {
            navigation.navigate('CreateProfileScreen')
        }
        if (user_data && user_data.roles=="USER" && !user_data.user_name) {
         //   console.log('hello user_name')
            navigation.navigate('CreateUserProfileScreen')
        }
        setIsLoading(false)
    }

    if(user_data?.roles == "BUSINESS") {
        return(
            <BussinessHomeScreen design={styles} /> 
        )
    }else if(user_data?.roles == "USER") {
        return(
            <UserHomeScreen design={styles} />
        )
    }


    return (
        <>
          

<Text>USER Debugger</Text>


        </>

    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper1: {
        flex: 1,
        backgroundColor: '#121515'
    },
    wrapper2: {
        //  backgroundColor:"#5b0b0b",
        flex: 1,
        alignItems: 'center',
        borderBottom: 2,
        borderColor: 'white',
        // borderBottomLeftRadius: width/2,
        // borderBottomRightRadius: width/2,

    },
    imageIcon: {
        backgroundColor: '#121515',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 4,
        zIndex: -1
    }
})