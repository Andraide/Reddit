import * as React from 'react';
import { CommonActions, Route, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { TransitionSpec, StackCardStyleInterpolator } from '@react-navigation/stack/lib/typescript/src/types';
import { NavigationParams } from 'react-navigation';
import globalStyles from '../styles/globalStyles';
import ActivityIndicator from '../components/activityIndicator'
import colours from '../styles/colours'
import Hoc from '../_hocs/loading'

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
import Permissions from '../screens/Permissions/permissions' 
import { ChildOne } from '../screens/Child1/test'
import { NotificationPermissions } from '../screens/Permissions/notifications'

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
const HomeStackNavigator = () => (
    <HomeStack.Navigator
      initialRouteName={RouteIdentifiers.cameraPermissions.name}
      headerMode={"none"}
    >
        <HomeStack.Screen name={RouteIdentifiers.home.name} component={Hoc(Home)}/>
        <HomeStack.Screen name={RouteIdentifiers.cameraPermissions.name} component={Permissions}/>
        <HomeStack.Screen name={RouteIdentifiers.notificationPermissions.name} component={NotificationPermissions}/>
    </HomeStack.Navigator>
)

const SecondStack = createStackNavigator();
const SecondStackNavigator = () => (
    <SecondStack.Navigator
      initialRouteName={RouteIdentifiers.secondStack.name}
      headerMode={"none"}
    >
        <SecondStack.Screen name={RouteIdentifiers.secondStack.name} component={HomeSecond}/>
        <SecondStack.Screen name={RouteIdentifiers.childOne.name} component={ChildOne}/>
    </SecondStack.Navigator>
)


const RootStack = createStackNavigator();
const RootStackNavigator = (routeName: string, initialParams: NavigationParams, isLoading: boolean, isUpdating: boolean) => {

    return (
        <RootStack.Navigator
            initialRouteName={RouteIdentifiers.home.name}
            headerMode={"none"}
        >
            <RootStack.Screen name={RouteIdentifiers.home.name} component={HomeStackNavigator} initialParams={initialParams}/>
            <RootStack.Screen name={RouteIdentifiers.secondStack.name} component={SecondStackNavigator} initialParams={initialParams}/>
        </RootStack.Navigator>
    )

}

export { RootStackNavigator } 