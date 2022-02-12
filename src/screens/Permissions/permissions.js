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

           editable: false
       }
     }
x
     
    
    async componentDidMount() 
    {
         const { navigation } = this.props
         const { editable } = this.state
         

         if(editable)
         {
            navigation.navigate(RouteIdentifiers.notificationPermissions.name)
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
            //navigation.navigate(RouteIdentifiers.notificationPermissions.name)
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
        const { isPermissionGranted, editable } = this.state
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
        return (
            editable ? null :
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