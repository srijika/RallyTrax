
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import ArrowBack from '../../components/ArrowBack'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BusinessAboutUs = ({ navigation }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(true);



  return (
    <>
      <View style={styles.wrapper1}>
        <View style={styles.wrapper2}>
          <Image style={{ marginTop: -windowHeight / 54.15 }} source={require('../../assets/images/f1.png')} />
        </View>
        <View style={{ zIndex: 1, position: 'absolute', top: windowHeight / 17 }} >
          <ArrowBack />
        </View>
        <View>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: normalizeFont(22), fontWeight: '700' }}>About Us</Text>
        </View>
        <ScrollView style={{ padding: 13, }}>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised i
          </Text>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised i
          </Text>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised i
          </Text>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a

          </Text>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a

          </Text>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a

          </Text>
          <Text style={{ color: 'white', fontWeight: '300', marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a

          </Text>
        </ScrollView>

      </View>
    </>

  )
}

export default BusinessAboutUs;

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


})