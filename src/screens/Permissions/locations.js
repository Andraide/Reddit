import React from 'react'
import { StyleSheet , Modal , View, Button , Text , Image , Dimensions, Alert } from 'react-native'
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
  

class LocationPermissions extends React.Component {
  
     constructor(props) {
       super(props)
       this.state = {
           editable: false
       }
     }

     
    
    async componentDidMount() 
    {
         const { navigation } = this.props
         const { editable } = this.state
         
        

         if(editable)
         {
             //navigation.navigate(RouteIdentifiers.home.name)
         }

         

         this.editableLocationSubscribe = permissionService.editableLocation.subscribe( editable => {
            if(editable.toString() == 'true')
            {
                this.setState({editable: true})
            }
            else
            {
                this.setState({editable: false})
            }
          })

            this.locationPermissionSubscribe = permissionService.permissionSubscribe.subscribe( permissions => {
            if(permissions.LOCATION && permissionService.getEditableLocation == false )
            {
                permissionService.setEditable('LOCATION', true)
                //navigation.navigate(RouteIdentifiers.home.name)
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapShot) 
    {
        const { navigation } = this.props
        const { editable } = this.state
        if(editable && prevState.editable != this.state.editable)
        {
            //navigation.navigate(RouteIdentifiers.home.name)
        }
    }

     componentWillUnmount() 
     {
        this.locationPermissionSubscribe.unsubscribe()
        this.editableLocationSubscribe.unsubscribe()
     }

     async checkForPermissions()
     {
        const permissions =
        Platform.OS === 'ios'
          ? [PERMISSIONS.IOS.LOCATION_ALWAYS]
          : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

          /*
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          */
  
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
        
        requestMultiple(Platform.OS === 'ios' ? [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((results) => {
            //setPermissionResult(result)
            if(results[PERMISSIONS.IOS.LOCATION_ALWAYS] == 'granted' || results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == 'granted' || results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == 'granted')
            {
                    //this.setState({ editable: true })
                    permissionService.setPermission('LOCATION', true)
                    //navigation.navigate(RouteIdentifiers.home.name)
            }
            else
            {
                if(results[PERMISSIONS.IOS.LOCATION_ALWAYS] == 'blocked')
                {

                    //|| checkResult(results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]) || checkResult(results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])   
                    //this.settings()
                    Alert.alert("Please activate locations permissions on settings")
                    this.settings()
                    permissionService.setEditable('LOCATION', true)
                    //navigation.navigate(RouteIdentifiers.home.name)
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
                <View style={{ marginTop: 50, backgroundColor: 'red' }}>
                <Text>Location Permissions</Text>
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
            editable ? <View><Text>DONT MOUNT</Text></View> :
            <View style={{ marginTop: 50, backgroundColor: 'red' }}>
            <Text>Location Permissions</Text>
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

  
  export default LocationPermissions 