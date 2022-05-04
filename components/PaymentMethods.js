
import React, { useEffect, useState } from 'react'
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
  import { normalizeFont } from '../constants/Helper'
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import AntDesign from 'react-native-vector-icons/AntDesign';

  const PaymentMethods=()=>{
    const [icon_name,setIcon_name]=useState(true)
    return(
        <TouchableOpacity>
        <View style={[styles.card,{marginTop:windowHeight/60}]}>
       
    
    
<View style={styles.setText}>
<View style={{ flexDirection:'row', alignSelf: "flex-end"}}>
   <Text style={{color:'white',fontSize:normalizeFont(21),paddingTop:10}}>xxxx xxxx2144</Text>
   <Icon onPress={()=>setIcon_name(!icon_name)} name={icon_name?"radio-button-unchecked":"check-circle"} size={22} color={icon_name?"#686b6b":"#2cac3e"} style={{paddingTop:10,alignSelf: 'center',paddingLeft:windowWidth/2.1}} />
   {/* <Icon name='' size={20} color="#686b6b" style={{paddingTop:10,alignSelf: 'center',}} /> */}
   </View>
  
   <Text style={{color:'white',fontSize:normalizeFont(17),paddingVertical:3,paddingBottom:10}}>packy jerry</Text>

</View>
</View>
</TouchableOpacity>
    )
  }
export default PaymentMethods
const styles=StyleSheet.create({
  
   
    card:{
    
      flexDirection: 'row',
      backgroundColor:'#232727',
      marginLeft:windowWidth/30,
      marginRight:windowWidth/30,
      borderRadius: 10,
      marginBottom:windowHeight/35
    },
    setText: {
      margin:windowWidth/110,
      paddingLeft:10
    },
    dateCard:{
    width:"25%",  backgroundColor:'#3c4343',padding:6,borderRadius:20,position:'absolute',right: windowWidth/25,bottom:windowHeight/11
    }
  })