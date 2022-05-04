import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
// import { Icon } from 'react-native-vector-icons/Icon';

export default function RNElementInput() {

    const [isFocused, setIsFocused] = useState(false);

    const onFocusChange = () => {
        setIsFocused(true)
    }
    const { placeholder } = props;

    return (
        <View style={[styles.container, { borderColor: isFocused ? '#0779ef' : '#eee' }]}>
            <Input
                placeholder={placeholder}
                onFocus={onFocusChange()}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                secureTextEntry={password}
                leftIcon={
                    <Icon
                        name={icon}
                        size={22}
                        color={isFocused ? '#0779e4' : '#eee'}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: 90, 
        height: 50, 
        borderRadius: 100, 
        marginVertical: 10, 
        borderWidth: 3.5
    }, 
    inputContainer: {
        borderBottomWidth: 0
    }, 
    inputText: {
        color: "#0779e4", 
        fontWeight: "bold",
        marginLeft: 5
    }
})