import 'react-native-gesture-handler';

import SplashScreen from 'react-native-splash-screen';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator,  PermissionsStackNavigator, HomeStackNavigator, RouteIdentifiers } from './src/_navigation/rootNavigator';
import { NavigationParams } from 'react-navigation';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import globalStyles from './src/styles/globalStyles';
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { permissionService  } from './src/_services/permissions.service'

import { Home } from './src/screens/Home/home'
import { HomeSecond } from './src/screens/HomeSecond/test' 
import Permissions from './src/screens/Permissions/permissions' 
import { ChildOne } from './src/screens/Child1/test'
import { NotificationPermissions } from './src/screens/Permissions/notifications'
import LocationPermissions from './src/screens/Permissions/locations'





const HomeStack = createStackNavigator();
const SecondStack = createStackNavigator();
//const PermissionsStackNavigator = (routeName: string, initialParams: NavigationParams, isLoading: boolean, isUpdating: boolean) => (
    
//)
//const Stack = createStackNavigator()
//const RootStack = createStackNavigator()

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

type State = {
  isRestarting : boolean
  routeName: string;
  routeParams: Object
  routeKey: Object
  navStack: Object
  isConnected: any
  initialized: boolean
  isUpdating: boolean
};

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
            <SecondStack.Screen name={RouteIdentifiers.cameraPermissions.name} component={Permissions}/>
            <SecondStack.Screen name={RouteIdentifiers.notificationPermissions.name} component={NotificationPermissions}/>
            <SecondStack.Screen name={RouteIdentifiers.locationPermissions.name} component={LocationPermissions}/>
          </SecondStack.Navigator>
  );
};





class App extends Component<{}, State> {

  constructor(props: any) {
    super(props);

    
    //this.isUserSignedInCheckCount = 0;
    this.state = {
      isRestarting: false,
      routeName: '',
      routeParams: {},
      routeKey: '',
      navStack: [],
      isConnected: undefined,
      initialized: false,
      isUpdating: false,
      editableCamera: false,
      editableNotification: false,
      editableLocation: false,

    };
  }

  componentDidMount() {
    SplashScreen.hide()


    this.editableCameraSubscribe = permissionService.editableCamera.subscribe( editable => {
      if(editable.toString() == 'true')
      {
          this.setState({editableCamera: true})
      }
      else
      {
          this.setState({editableCamera: false})
      }
    })

    this.editableNotificationsSubscribe = permissionService.editableNotifications.subscribe( editable => {
      if(editable.toString() == 'true')
      {
          this.setState({editableNotification: true})
      }
      else
      {
          this.setState({editableNotification: false})
      }
    })

    this.editableLocationSubscribe = permissionService.editableLocation.subscribe( editable => {
      if(editable.toString() == 'true')
      {
          this.setState({editableLocation: true})
      }
      else
      {
          this.setState({editableLocation: false})
      }
    })
    
  }

  componentDidUpdate(prevProps: any, prevState: any, snapShot: any) 
    {
        
    }


  showLoadingState = () => {
    const {
      isRestarting, routeName, isUpdating
    } = this.state;
    const noInternet = this.state.isConnected === false;

    return isUpdating ? !isUpdating : !routeName || isRestarting || noInternet;
  }

  navigationStacks = () => {
    const {
      routeName, routeParams, routeKey, navStack, editableCamera, editableNotifications, editableLocation
    } = this.state;

    //let permissions = permissionService.getEditableCamera&&permissionService.getEditableNotifications&&permissionService.getEditableLocation
    return  <NavigationContainer>
              {RootStackNavigator(routeName, routeParams, this.showLoadingState(), this.state.isUpdating)}
            </NavigationContainer>
    console.log("CALLING THE STACK NAVIGATOR", permissionService.getEditableCamera&&permissionService.getEditableNotifications&&permissionService.getEditableLocation)

    /*if(permissionService.getEditableCamera&&permissionService.getEditableNotifications&&permissionService.getEditableLocation)
    {
      console.log("Returning home stack")
      return (
        <NavigationContainer>
              {HomeStackNavigator(routeName, routeParams, this.showLoadingState(), this.state.isUpdating)}
            </NavigationContainer>
      )
    }
    else
    {
      console.log("Returning permission stack")
      return (
        <NavigationContainer>
              {PermissionsStackNavigator(routeName, routeParams, this.showLoadingState(), this.state.isUpdating)}
            </NavigationContainer>
      )
    }*/
    /*return (
            permissionService.getEditableCamera&&permissionService.getEditableNotifications&&permissionService.getEditableLocation ? 
            <NavigationContainer>
              {HomeStackNavigator(routeName, routeParams, this.showLoadingState(), this.state.isUpdating)}
            </NavigationContainer>
            :
            <NavigationContainer>
              {PermissionsStackNavigator(routeName, routeParams, this.showLoadingState(), this.state.isUpdating)}
            </NavigationContainer>

        
    );*/
  }

  HomeStack = () => {
    return (
          <HomeStack.Navigator
            initialRouteName={RouteIdentifiers.home.name}
            headerMode={"none"}
          >
            <HomeStack.Screen name={RouteIdentifiers.home.name} component={Home}/>
          </HomeStack.Navigator>
    )
  }

  PermissionsStack = () => {
    return (
          <SecondStack.Navigator
            initialRouteName={RouteIdentifiers.cameraPermissions.name}
            headerMode={"none"}
          >
            <SecondStack.Screen name={RouteIdentifiers.cameraPermissions.name} component={Permissions}/>
            <SecondStack.Screen name={RouteIdentifiers.notificationPermissions.name} component={NotificationPermissions}/>
            <SecondStack.Screen name={RouteIdentifiers.locationPermissions.name} component={LocationPermissions}/>
          </SecondStack.Navigator>
    )
  }

  router() {
    const { editableCamera, editableNotification, editableLocation } = this.state
    return (
        
      <NavigationContainer>
        {(editableCamera&&editableNotification&&editableLocation) ? <AppStack /> : <AuthStack />}
        
      </NavigationContainer>
  
    )
  }

  render() {
    //return this.navigationStacks()
    const { editableCamera, editableNotification, editableLocation } = this.state
    console.log("EditableCamera on App", editableCamera, editableNotification, editableLocation)
    return (
        this.router()
    
    )
  }
  
};

export default App;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


