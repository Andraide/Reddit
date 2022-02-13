import React from 'react'
import { View , Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CancelButton = ({onPress, title}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#BFBFBF' }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export { CancelButton }