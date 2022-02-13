import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, AppStack } from './src/_navigation/rootNavigator';
import { permissionService  } from './src/_services/permissions.service'


class App extends Component<{}, State> {

  constructor(props: any) {
    super(props);

    this.state = {
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

  router() {
    const { editableCamera, editableNotification, editableLocation } = this.state
    
    return (
      <NavigationContainer>
        {(editableCamera&&editableNotification&&editableLocation) ? <AppStack /> : <AuthStack />}
        
      </NavigationContainer>
    )
  }

  render() {
    const { editableCamera, editableNotification, editableLocation } = this.state
    return (
        this.router()
    )
  }
  
};

export default App;




