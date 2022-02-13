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
    openSettings
  } from 'react-native-permissions';
import { permissionService  } from '../../_services/permissions.service'
import { CancelButton } from '../../components/cancelButton';
import Allow from '../../_assets/buttons/allow/Button.png'
import CameraImage from '../../_assets/images/camera/Artwork.png'
var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
  

class CameraPermission extends React.Component {
  
     constructor(props) {
       super(props)
       this.state = {

           editable: false,
           marginNotchTop: 0
       }
     }
x
     
    
    async componentDidMount() 
    {
         const { navigation } = this.props
         const { editable } = this.state

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
         
        console.log("Permission", permissionService.editableCamera)
         if(editable)
         {
            navigation.navigate(RouteIdentifiers.notificationPermissions.name)
         }

        if(Platform.OS === 'android')
        {
            navigation.navigate(RouteIdentifiers.locationPermissions.name)
        }

        this.editableCameraSubscribe = permissionService.editableCamera.subscribe( editable => {
            console.log("Seting camera state", editable)
            if(editable.toString() == 'true')
            {
                this.setState({editable: true})
                console.log("State!!!!",editable)
            }
            else
            {
                console.log("Setting false state!!!!!")
                this.setState({editable: false})
            }
        })

        this.cameraPermissionSubscribe = permissionService.permissionSubscribe.subscribe( permissions => {
            if(permissions.CAMERA && permissionService.getEditableCamera === false)
            {
                console.log("CAMERA SUBSCRIBER")
                permissionService.setEditable('CAMERA', true)
                console.log("permissionService.getEditable after setEditable", permissionService.getEditableCamera)
                if(Platform.OS === 'android')
                {
                    navigation.navigate(RouteIdentifiers.locationPermissions.name)
                }
                else
                {
                    console.log("Navigate to notifications Subscribe", permissionService.getEditableCamera)

                    navigation.navigate(RouteIdentifiers.notificationPermissions.name)
                }
            }

            
            
        })
    }

    componentDidUpdate(prevProps, prevState, snapShot) 
    {
        const { navigation } = this.props
        const { editable } = this.state
        console.log("EDITABLE STATE", editable)
        if(editable && prevState.editable != this.state.editable)
        {
            console.log("Navigate to notifications Update")
            navigation.navigate(RouteIdentifiers.notificationPermissions.name)
        }
    }

     componentWillUnmount() 
     {
         this.cameraPermissionSubscribe.unsubscribe()
         this.editableCameraSubscribe.unsubscribe()
     }

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
        await openSettings()
    }

    requestPermission()
    {
        
        const { navigation } = this.props
        
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            //setPermissionResult(result)
            if(result == 'granted')
            {
                permissionService.setEditable('CAMERA',true)
                permissionService.setPermission('CAMERA', true)
                if(Platform.OS === 'android')
                {
                    permissionService.setEditable('NOTIFICATIONS', true)
                    navigation.navigate(RouteIdentifiers.locationPermissions.name)
                }
                else
                {
                    navigation.navigate(RouteIdentifiers.notificationPermissions.name)
                }
            }
            else
            {
                if(checkResult(result))
                {
                    this.settings()
                    permissionService.setEditable('CAMERA',true)
                }
                else
                {
                    //"No available"
                }
            }
        });
    }

     render() {
        const { navigation } = this.props
        const { isPermissionGranted, editable, marginNotchTop } = this.state
        const title = isPermissionGranted ? 'Manage' : 'Allow'
        console.log("Render", editable)

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
                            source={CameraImage}
                         />
                     </View>
                     <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>Camera Access</Text>
                        </View>
                        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{ textAlign: 'center' }}>Please allow access to {"\n"} your camera to take {"\n"} photos</Text>

                        </View>

                     </View>
                     <View style={{ flex: 0.1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                         <View style={{ backgroundColor: 'transparent',flex: 0.4, width: widthScreen - 200, alignItems: 'center', justifyContent: 'center', borderRadius: 60 }}>
                            <TouchableOpacity onPress={() => { this.requestPermission() }}>
                                <Image
                                    source={Allow}
                                />
                            </TouchableOpacity>
                         </View>
                         <View style={{ flex: 0.2 }}></View>
                         <View style={{ flex: 0.4,alignItems: 'center', justifyContent: 'center' }}>
                             <CancelButton 
                                title={'Cancel'} 
                                onPress={() => {
                                    permissionService.setEditable('CAMERA', true)
                                    navigation.navigate(RouteIdentifiers.notificationPermissions.name)
                                }}
                            />
                         </View>
                            
                     </View>

                 </View>
            )
        }
        /*
        <TouchableOpacity>
                                 <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#BFBFBF' }}>Cancel</Text>
                                 </View>
                             </TouchableOpacity>
        */
        /*
        <Button
                                onPress = {() => { 
                                    permissionService.setEditable('CAMERA', true)
                                    navigation.navigate(RouteIdentifiers.notificationPermissions.name) 
                                }}
                                title = 'Cancel'
                                color = '#000'
                            />
        */
        
     }
   }

  
  export { CameraPermission }