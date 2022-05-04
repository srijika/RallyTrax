import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { headerBgColor } from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';


const MenuButton = () => (
    <Icon name="bars" size={20} color="white" />
);


export default function CustomDrawer(props) {

    const dispatch = useDispatch();

 
    const drawerItemStyle = { color: 'white', fontSize: 18, fontWeight: "bold", marginTop: -10 }
    return (
        <View style={{ flex: 1, backgroundColor: "#2e3133" }}>
            <DrawerContentScrollView {...props} style={{ marginTop: 50 }}>

                   

                <View style={{ flexDirection: "row", paddingBottom: 30, justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ marginRight: 30, padding: 10 }}
                    onPress={() => { props.navigation.closeDrawer() }} >
                        <MenuButton />
                    </TouchableOpacity>
                </View>

                <DrawerItem
                    label="Profile"
                    labelStyle={drawerItemStyle}
                    onPress={() => { props.navigation.navigate('ProfileScreen') }}
                />

                <DrawerItem
                    label="Logout"
                    labelStyle={drawerItemStyle}
                    onPress={() => { dispatch(authActions.logout()); }}
                />

            </DrawerContentScrollView>
        </View>
    )
}
