import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet , View , Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height

const FormInput = ({
   
        iconName,
        iconColor,
        returnKeyType,
        keyboardType,
        name,
        placeholder,
        addStyle ,
        value,
        width ,
        ...rest

}) => (

        <View style={[ styles.inputContainer , { width : width*2/3 } ]}>
          <Input 
            {...rest}
            leftIcon = {<Ionicons name={iconName} size={28} color={iconColor} />}
            leftIconContainerStyle={styles.iconStyle}
            placeholder={placeholder}
            inputContainerStyle = {{borderBottomWidth: 0 , borderBottomColor:'transparent' }} 
            style={[styles.input , { color : '#546E7A' }]}
            inputStyle={ { color : '#546E7A' } }
          />
        </View>

      )

const styles = StyleSheet.create({

                 inputContainer: {
              
                   margin : 15 ,
                   borderWidth: 0.3 ,
                   borderRadius: 20 ,
                   
                 
                 },
                 iconStyle: {
                 
                   marginRight : 10
                 
                 },
                 input: {
                   width:1000 , 
                   color: 'red' , 
                   fontSize:148 , 
                   borderBottomColor: 'transparent' , 
                   borderBottomWidth: 0 
                   
                 }

})

export default FormInput