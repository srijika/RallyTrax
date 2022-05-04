import React from 'react';
import {TouchableOpacity,Dimensions, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

const ArrowBack=()=>{
    const navigation=useNavigation()
    return(
        <TouchableOpacity style={{ position:'absolute',top: Platform.OS === 'android'? WindowHeight/32:WindowHeight/18,left:WindowWidth/20 }} onPress={()=>navigation.goBack() }>
        <Icon name='arrowleft' size={30} color="white"  />
        </TouchableOpacity>
    )
}
export default ArrowBack