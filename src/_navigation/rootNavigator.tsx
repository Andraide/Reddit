import * as React from 'react';
import { CommonActions, Route, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { TransitionSpec, StackCardStyleInterpolator } from '@react-navigation/stack/lib/typescript/src/types';
import globalStyles from '../styles/globalStyles';
import ActivityIndicator from '../components/activityIndicator'
import colours from '../styles/colours'
import Hoc from '../_hocs/loading'
import { NavigationContainer } from '@react-navigation/native';

import {
    Animated,
    Easing,
    Platform,
    View,
    Image,
    Text
  } from 'react-native';

import { Home } from '../screens/Home/test'
import { HomeSecond } from '../screens/HomeSecond/test' 
import { CameraPermission } from '../screens/Permissions/camera' 
import { ChildOne } from '../screens/Child1/test'
import { NotificationPermissions } from '../screens/Permissions/notifications'
import LocationPermissions from '../screens/Permissions/locations'

export const RouteIdentifiers = {
    //Stacks
    home: { name: 'home', key: 'myStackKey' },
    secondStack: { name: 'secondStack', key: 'secondStackKey' },
    
    //Screens
    child: { name: 'child', key: 'myScreenKey' },
    childOne: { name: 'childOne', key: 'myChildOne' },
    cameraPermissions: { name: 'cameraPermission' },
    notificationPermissions: { name: 'notificationPermissions' },
    locationPermissions: { name: 'locationPermissions' }
};

const HomeStack = createStackNavigator();
const HomeStackNavigator = (routeName: string, initialParams: NavigationParams, isLoading: boolean, isUpdating: boolean) => (
    <HomeStack.Navigator
      initialRouteName={RouteIdentifiers.home.name}
      headerMode={"none"}
    >
        <HomeStack.Screen name={RouteIdentifiers.home.name} component={Hoc(Home)}/>
    </HomeStack.Navigator>
)

const SecondStack = createStackNavigator();
const PermissionsStackNavigator = (routeName: string, initialParams: NavigationParams, isLoading: boolean, isUpdating: boolean) => (
    <SecondStack.Navigator
      initialRouteName={RouteIdentifiers.cameraPermissions.name}
      headerMode={"none"}
    >
        <SecondStack.Screen name={RouteIdentifiers.home.name} component={Hoc(Home)}/>
        <SecondStack.Screen name={RouteIdentifiers.cameraPermissions.name} component={Permissions}/>
        <SecondStack.Screen name={RouteIdentifiers.notificationPermissions.name} component={NotificationPermissions}/>
        <SecondStack.Screen name={RouteIdentifiers.locationPermissions.name} component={LocationPermissions}/>
        

    </SecondStack.Navigator>
)


const RootStack = createStackNavigator();
const RootStackNavigator = (routeName: string, initialParams: NavigationParams, isLoading: boolean, isUpdating: boolean, permissions: boolean) => {
    /*console.log(permissions)
    if(permissions)
    {
        console.log("Returning home stack")
        return (
            <RootStack.Navigator
            initialRouteName={RouteIdentifiers.home.name}
            headerMode={"none"}
        >   
            <RootStack.Screen name={RouteIdentifiers.home.name} component={HomeStackNavigator} initialParams={initialParams}/>
        </RootStack.Navigator>
        )
    }
    else
    {
        console.log("Returning permission stack")
        return (
        <RootStack.Navigator
            initialRouteName={RouteIdentifiers.secondStack.name}
            headerMode={"none"}
        >   
            <RootStack.Screen name={RouteIdentifiers.secondStack.name} component={PermissionsStackNavigator} initialParams={initialParams}/>
            <RootStack.Screen name={RouteIdentifiers.home.name} component={HomeStackNavigator} initialParams={initialParams}/>

        </RootStack.Navigator>
        )
    }*/
    
    return (
        <RootStack.Navigator
            initialRouteName={RouteIdentifiers.secondStack.name}
            headerMode={"none"}
        >   
            <RootStack.Screen name={RouteIdentifiers.home.name} component={HomeStackNavigator} initialParams={initialParams}/>
            <RootStack.Screen name={RouteIdentifiers.secondStack.name} component={PermissionsStackNavigator} initialParams={initialParams}/>
        </RootStack.Navigator>
    )
    

}

export { RootStackNavigator, HomeStackNavigator, PermissionsStackNavigator } 