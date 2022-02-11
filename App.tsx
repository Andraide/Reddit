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
import { RootStackNavigator,  RouteIdentifiers } from './src/_navigation/rootNavigator';
//import { RootStackNavigator, RouteIdentifiers } from './src/_navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import globalStyles from './src/styles/globalStyles';
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './src/screens/Home/test'
import { connect } from 'react-redux'
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
      isUpdating: false
    };
  }

  componentDidMount() {
    SplashScreen.hide()
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
      routeName, routeParams, routeKey, navStack
    } = this.state;

    
    return (
        
            <NavigationContainer>
              {RootStackNavigator(routeName, routeParams, this.showLoadingState(), this.state.isUpdating)}
            </NavigationContainer>
        
    );
  }

  render() {
    return this.navigationStacks()
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


