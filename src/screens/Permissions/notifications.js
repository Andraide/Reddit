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
    openSettings,
    requestNotifications,
    checkNotifications
  } from 'react-native-permissions';
import { permissionService  } from '../../_services/permissions.service'


var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
  

class NotificationPermissions extends React.Component {
  
     constructor(props) {
       super(props)
       
     }
    
    async componentDidMount() 
    {
        const { navigation } = this.props
         
        this.permissionSubscribe = permissionService.permissionSubscribe.subscribe( permissions => {
          console.log("Editable", permissions) 
          if(permissions.NOTIFICATIONS)
          {
              console.log("Entering!!!", permissions.NOTIFICATIONS)
              navigation.navigate(RouteIdentifiers.notificationPermissions.name)
          }
          //this.setState({ editable }) 
        })         
    }
     componentWillUnmount() {}

    async checkForPermissions()
    {
      checkNotifications().then(({ status, settings }) => 
      {
        console.log("Cheking", status, "Cheking Settings", settings)
      })
      //return isPermissionGranted
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
        
        /*request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            //setPermissionResult(result)
            if(checkResult(result))
            {
                if(result == 'granted')
                {
                    //this.setState({ disabled: true })
                  permissionService.setPermission('NOTIFICATIONS', true)
                  navigation.navigate(RouteIdentifiers.notificationPermissions.name)
                }
                this.settings()
            }
            else
            {
                //"No available"
            }
            console.log(result)
        });*/
        requestNotifications(['alert', 'sound']).then(({ status, settings }) => 
        {
          console.log("Status", status, "Settings", settings)
        })
    }

     render() {
       const { navigation } = this.props
        const isGranted = this.checkForPermissions()
        const title = isGranted ? 'Manage' : 'Allow'
       return (
         <View style={{ marginTop: 50, backgroundColor: 'blue' }}>
           <Text>Notification permission</Text>
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
  
  export { NotificationPermissions }