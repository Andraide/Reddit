import React from 'react'
import { StyleSheet , Modal , View, Button , Text , Image , Dimensions, Alert } from 'react-native'
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
import LocationImage from '../../_assets/images/locations/Artwork.png'
import Enable from '../../_assets/buttons/enable/Button.png'
var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
  

class LocationPermissions extends React.Component {
  
     constructor(props) {
       super(props)
       this.state = {
           editable: false,
           marginNotchTop: 0
       }
     }

     
    
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
                            source={LocationImage}
                         />
                     </View>
                     <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>Enable location services</Text>
                        </View>
                        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{ textAlign: 'center' }}>We wants to access your {"\n"} location only to provide a {"\n"} better experience by </Text>

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
                                    permissionService.setPermission('LOCATION', true)
                                    //navigation.navigate(RouteIdentifiers.home.name)
                                }}
                            />
                         </View>
                     </View>

                 </View>    
            )
        }
     }
   }

  
  export default LocationPermissions 