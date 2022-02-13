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
       this.state = {
         editable: false,
         isPermissionGranted: false
       }
       
     }
    
    async componentDidMount() 
    {
        const { navigation } = this.props
        const { editable } = this.state

        if(editable)
        {
          navigation.navigate(RouteIdentifiers.locationPermissions.name)
        }

        this.editableNotificationsSubscribe = permissionService.editableNotifications.subscribe( editable => {
          if(editable.toString() == 'true')
          {
              this.setState({editable: true})
          }
          else
          {
              this.setState({editable: false})
          }
        })
         
        this.notificationsPermissionSubscribe = permissionService.permissionSubscribe.subscribe( permissions => {
          
          if(permissions.NOTIFICATIONS && permissionService.getEditableNotifications == false)
          {
            permissionService.setEditable('NOTIFICATIONS', true)
              navigation.navigate(RouteIdentifiers.locationPermissions.name)
          }
        })
        
        let isPermissionGranted = await this.checkForPermissions()
        this.setState({ isPermissionGranted })
    }

    componentDidUpdate(prevProps, prevState, snapShot) 
    {
        const { navigation } = this.props
        const { editable } = this.state
        if(editable && prevState.editable != this.state.editable)
        {
            //navigation.navigate(RouteIdentifiers.locationPermissions.name)
        }
    }

     componentWillUnmount() 
     {
      this.notificationsPermissionSubscribe.unsubscribe()
      this.editableNotificationsSubscribe.unsubscribe()
     }

    async checkForPermissions()
    {
      let result = ''
      checkNotifications().then(({ status, settings }) => 
      {
        result = status
      })
      const isPermissionGranted = await checkResult(result)
      return isPermissionGranted
    }

    async settings()
    {
        await openSettings()
    }

    requestPermission()
    {
        const { navigation } = this.props
        
        requestNotifications(['alert', 'sound']).then(({ status, settings }) => 
        {
          if(status == 'granted')
            {
              permissionService.setEditable('NOTIFICATIONS', true)
              navigation.navigate(RouteIdentifiers.locationPermissions.name)
                
            }
            else
            {
                if(checkResult(status))
                {
                    this.settings()
                }
                else
                {
                    //"No available"
                }
            }
        })
    }

     render() {
       const { navigation } = this.props
       const { isPermissionGranted, editable } = this.state
        //const isGranted = this.checkForPermissions()
        const title = isPermissionGranted ? 'Manage' : 'Allow'
        if(this.state.editable)
        {
          return (
            <View><Text>DONT MOUNT</Text></View>
          )
        }
        else
        {
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
       return (
        editable ? null :
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