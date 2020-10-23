



/*function mapStateToProps(state, props) {
    return {
      filterPostData: state.homeDashboardConfig.filterPostData,
      filterApplied: state.homeDashboardConfig.filterApplied,
      homeDashboardRefresh: state.homeDashboardConfig.homeDashboardRefresh
    };
  }
  function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }
  export default connect(mapStateToProps, mapDispatchToProps)(HomeDashboard);

  */


import React from 'react'
import { StyleSheet, Modal, View, Button, Text , Image, Dimensions } from 'react-native'
import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
import { RouteIdentifiers } from '../../_navigation/rootNavigator';
var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
 
 
 class ChildOne extends React.Component {
 
   constructor(props) {
     super(props)
   
     this.state = { 
 
       visible : true 
 
     }
   }
 
   componentDidMount() {
    
    
 
 
   }
 
   componentWillUnmount() {
 
     
     
   }
 
   render() {
    const { navigation } = this.props

     return (
              <View>
                  <Text>CHILD 2</Text>
                  <Button
                    onPress = {() =>  navigation.goBack()}
                    title = "go Back"
                  />
                  <Button
                    onPress = {() =>  navigation.navigate(RouteIdentifiers?.child)}
                    title = "Try to go to child"
                  />
              </View> 
                 
     )
 
   }
 
 }
 
 export { ChildOne }
 
 
 /*
 function mapStateToProps(state, props) {
   return {
     filterPostData: state.homeDashboardConfig.filterPostData,
     filterApplied: state.homeDashboardConfig.filterApplied,
     homeDashboardRefresh: state.homeDashboardConfig.homeDashboardRefresh
   };
 }
 function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }
 export default connect(mapStateToProps, mapDispatchToProps)(HomeDashboard);
 */