import React from 'react'

export default function Header() {
    return (
        <View style={styles.headContainer}>
            <Text style={{ color: "white", fontSize: 20 }}> Add Trip</Text>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text style={{ color: "white", fontSize: 16, marginTop: 5 }}> Cancel </Text>
            </TouchableOpacity>
        </View>

    )
}
