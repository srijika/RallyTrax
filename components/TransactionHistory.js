
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
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  const TransactionHistory=({color_name})=>{
    
  
    return(
        <TouchableOpacity>
          
        <View style={[styles.card,{marginTop:windowHeight/60}]}>
       
    
    
<View style={styles.setText}>
   <Text style={{color:'white',fontSize:normalizeFont(21),paddingVertical:3,paddingTop:10}}>Event Name</Text>
   <View style={{ flexDirection:'row',justifyContent: 'space-between'}}>
   <Text style={{color:'white',fontSize:normalizeFont(17),paddingVertical:3,paddingBottom:10}}>Buy in:$90</Text>
 <View style={{flexDirection:'row'}}>
   <Text style={{color:'white', fontSize:normalizeFont(17),paddingVertical:3,paddingBottom:10,
}}>$ 20.00</Text>
<View style={{marginRight:10,marginLeft:5}}>
<Icon
type="MaterialCommunityIcons"
name="circle"
style={{
 color: "white",
 fontSize: 25
}}
/>
<Icon
type="MaterialCommunityIcons"
name={color_name=='red'?"arrow-down-circle":"arrow-up-circle"}
style={{
 color: color_name=='red'?"#ae2626":"#2ab240",
 fontSize: 25,
 top: 0,
 left: 0,
 position: "absolute"
 
}}
/>
</View>
</View>
   </View>
  
  
</View>
<View style={ styles.dateCard}>
      <Text style={{color:'white',textAlign:'center',fontSize:normalizeFont(11)}}>sept 20th,2020</Text>
  </View>
</View>
</TouchableOpacity>
    )
  }
export default TransactionHistory
const styles=StyleSheet.create({
  
   
    card:{
    
     // flexDirection: 'row',
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
    width:windowWidth*1/3.9,  backgroundColor:'#3c4343',paddingHorizontal:6,paddingVertical:6, borderRadius:20,position:'absolute',right: windowWidth/25,bottom:windowHeight/11
    }
  })