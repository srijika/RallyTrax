import React from 'react'
import { View, ImageBackground } from 'react-native';
import { isEmpty } from '../constants/Helper';

export default function UserBackground({ background }) {

    return (
        <View>  
            {
                !isEmpty.includes(background)
                    ?
                        <ImageBackground source={{ uri: background }} style={{ height: 140 }} />
                    :
                    <ImageBackground source={require('../assets/user-backgrounds/img1.jpeg')} style={{ height: 140 }} />
            }
        </View>

    )
}
