import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/Home/home'
import { CameraPermission } from '../screens/Permissions/camera' 
import { NotificationPermissions } from '../screens/Permissions/notifications'
import LocationPermissions from '../screens/Permissions/locations'

export const RouteIdentifiers = {
    //Stacks
    home: { name: 'home', key: 'myStackKey' },
    secondStack: { name: 'secondStack', key: 'secondStackKey' },
    
    //Screens
    cameraPermissions: { name: 'cameraPermission' },
    notificationPermissions: { name: 'notificationPermissions' },
    locationPermissions: { name: 'locationPermissions' }
};

const HomeStack = createStackNavigator();
const SecondStack = createStackNavigator();

const AppStack = () => {
    return (
      <HomeStack.Navigator
              initialRouteName={RouteIdentifiers.home.name}
              headerMode={"none"}
            >
        <HomeStack.Screen name={RouteIdentifiers.home.name} component={Home}/>
      </HomeStack.Navigator>
    );
  };
  
const AuthStack = () => {
    return (
            <SecondStack.Navigator
              initialRouteName={RouteIdentifiers.cameraPermissions.name}
              headerMode={"none"}
            >
              <SecondStack.Screen name={RouteIdentifiers.cameraPermissions.name} component={CameraPermission}/>
              <SecondStack.Screen name={RouteIdentifiers.notificationPermissions.name} component={NotificationPermissions}/>
              <SecondStack.Screen name={RouteIdentifiers.locationPermissions.name} component={LocationPermissions}/>
            </SecondStack.Navigator>
    );
  };
  

export { AppStack, AuthStack } 