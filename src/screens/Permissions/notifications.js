import React from 'react'
import { StyleSheet , Modal , View, Button , Text , Image , Dimensions } from 'react-native'
import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
import DeviceInfo from 'react-native-device-info';
import { RouteIdentifiers } from '../../_navigation/rootNavigator'
import { checkResult } from '../../components/checkPermissions'
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
import { styles } from './style'
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

        let isPermissionGranted = await this.checkForPermissions()
        this.setState({ isPermissionGranted })
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
              permissionService.setPermission('NOTIFICATIONS', true)
              navigation.navigate(RouteIdentifiers.locationPermissions.name)
            }
            else
            {
                if(checkResult(status))
                {
                    this.settings()
                    navigation.navigate(RouteIdentifiers.locationPermissions.name)
                }
                else
                {
                    navigation.navigate(RouteIdentifiers.locationPermissions.name)
                }
            }
        })
    }

    render() {
      const { navigation } = this.props
      const { isPermissionGranted, editable, marginNotchTop } = this.state
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
            <View style={[styles.container, { marginTop: marginNotchTop }]}>
                     <View style={styles.containerOne}>
                         <Image
                            source={NotificationImage}
                         />
                     </View>
                     <View style={styles.containerThree}>
                        <View style={styles.childContainerThree}>
                            <Text style={styles.text}>Enable push notifications</Text>
                        </View>
                        <View style={styles.childContainerThreeOne}>
                            <Text style={styles.textOne}>Enable push notifications {"\n"} to let {"\n"} send you personal news {"\n"} and updates</Text>

                        </View>
                     </View>
                     <View style={styles.containerFour}>
                         <View style={styles.childContainerFour}>
                            <TouchableOpacity onPress={() => { this.requestPermission() }}>
                                <Image
                                    source={Enable}
                                />
                            </TouchableOpacity>
                         </View>
                         <View style={styles.childContainerFourOne}></View>
                         <View style={styles.childContainerFourTwo}>
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