import React from 'react'
import { StyleSheet , Modal , View, Button , Text , Image , Dimensions } from 'react-native'
import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
import { RouteIdentifiers } from '../../_navigation/rootNavigator'
import { checkMultiplePermissions, checkResult } from '../../components/checkPermissions'
import {
    check,
    request,
    RESULTS,
    requestMultiple,
    PERMISSIONS,
    openSettings
  } from 'react-native-permissions';
import { permissionService  } from '../../_services/permissions.service'
var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
  

class Permissions extends React.Component {
  
     constructor(props) {
       super(props)
       this.state = {
       }
     }

     
    
    async componentDidMount() 
    {
         const { navigation } = this.props
         //const { editable } = this.state
         
        

         /*if(editable)
         {
             navigation.navigate(RouteIdentifiers.notificationPermissions.name)
         }*/

        this.permissionSubscribe = permissionService.permissionSubscribe.subscribe( permissions => {
            console.log("Editable", permissions) 
            if(permissions.CAMERA)
            {
                console.log("Entering!!!", permissions.CAMERA)
                navigation.navigate(RouteIdentifiers.notificationPermissions.name)
            }
            //this.setState({ editable }) 
        })
    }
     componentWillUnmount() {}

     async checkForPermissions()
     {
        const permissions =
        Platform.OS === 'ios'
          ? [PERMISSIONS.IOS.CAMERA]
          : [PERMISSIONS.ANDROID.CAMERA];
  
        // Call our permission service and check for permissions
        const isPermissionGranted = await checkPermission(permissions);
        return isPermissionGranted
    }

    async settings()
    {
        console.log("Calling openSettings")
        await openSettings()
    }

    requestPermission()
    {
        console.log("Pressed")
        const { navigation } = this.props
        
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            //setPermissionResult(result)
            if(result == 'granted')
            {
                    permissionService.setPermission('CAMERA', true)
                    navigation.navigate(RouteIdentifiers.notificationPermissions.name)
            }
            else
            {
                if(checkResult(result))
                {
                    this.settings()
                }
                else
                {
                    //"No available"
                }
            }
            console.log(result)
        });
    }

     render() {
        const { navigation } = this.props
        const { isPermissionGranted } = this.state
        const title = isPermissionGranted ? 'Manage' : 'Allow'
        return (
            <View style={{ marginTop: 50, backgroundColor: 'blue' }}>
            <Text>Camera permission</Text>
            <Button
                onPress = {() => { this.requestPermission() }}
                title = {title}
            />
            <Button
                onPress = {() => navigation.navigate(RouteIdentifiers.secondStack.name, { screen: RouteIdentifiers.childOne.name })}
                title = "Cancel"
            />
            </View>
        )
     }
   }

  
  export default Permissions 