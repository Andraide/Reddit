import React from 'react'
import { StyleSheet , Modal , View, Button , Text , Image , Dimensions } from 'react-native'
import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
import DeviceInfo from 'react-native-device-info';
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
import { CancelButton } from '../../components/cancelButton';
import NotificationImage from '../../_assets/images/notifications/Artwork.png'
import Enable from '../../_assets/buttons/enable/Button.png'





var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
  

class NotificationPermissions extends React.Component {
  
     constructor(props) {
       super(props)
       this.state = {
         editable: false,
         isPermissionGranted: false,
         marginNotchTop: 0
       }
       
     }
    
    async componentDidMount() 
    {
        const { navigation } = this.props
        const { editable, marginNotchTop } = this.state

        let hasNotch = DeviceInfo.hasNotch();
        this.setState({ hasNotch })
        if(Platform.OS == 'ios' && hasNotch)
        {
            
            this.setState({ marginNotchTop: heightScreen/20 })
        }
        else if(hasNotch)
        {
            this.setState({ marginNotchTop: StatusBar.currentHeight })
        }

        if(Platform.OS === 'android')
        {
            navigation.navigate(RouteIdentifiers.locationPermissions.name)
        }

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
       const { isPermissionGranted, editable, marginNotchTop } = this.state
        //const isGranted = this.checkForPermissions()
        const title = isPermissionGranted ? 'Manage' : 'Allow'
        console.log("Editable======>", editable)
        if(this.state.editable)
        {
          return (
            <View><Text>DONT MOUNT</Text></View>
          )
        }
        else
        {
          return (
            <View style={{ flex: 1, flexDirection: 'column', marginTop: marginNotchTop }}>
                     <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                         <Image
                            source={NotificationImage}
                         />
                     </View>
                     <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>Enable push notifications</Text>
                        </View>
                        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{ textAlign: 'center' }}>Enable push notifications {"\n"} to let {"\n"} send you personal news {"\n"} and updates</Text>

                        </View>

                     </View>
                     <View style={{ flex: 0.1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                         <View style={{ backgroundColor: 'transparent',flex: 0.4, width: widthScreen - 200, alignItems: 'center', justifyContent: 'center', borderRadius: 60 }}>
                            <TouchableOpacity onPress={() => { this.requestPermission() }}>
                                <Image
                                    source={Enable}
                                />
                            </TouchableOpacity>
                         </View>
                         <View style={{ flex: 0.2 }}></View>
                         <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                          <CancelButton 
                            title={'Cancel'} 
                            onPress={() => {
                              permissionService.setEditable('NOTIFICATIONS', true)
                              navigation.navigate(RouteIdentifiers.locationPermissions.name)
                            }}
                          />
                         </View>
                            
                     </View>

                 </View>
          )
        }
       
     }
   
   }
  
  export { NotificationPermissions }