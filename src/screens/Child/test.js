



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
 import { StyleSheet , Modal , View, Button , Text , Image , Dimensions } from 'react-native'
 import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
import { RouteIdentifiers } from '../../_navigation/rootNavigator'
 var widthScreen = Dimensions.get('window').width
 var heightScreen = Dimensions.get('window').height
 
 
 class Child extends React.Component {
 
    constructor(props) {
      super(props)
      this.state = {}
      //this.goBack = this.props.navigation.goBack()
      //this.navigation = this.props.navigation.navigate
    }
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
      const { navigation } = this.props

      return (
        <View>
          <Text>FIRST CHILD</Text>
          <Button
            onPress = {() => navigation.goBack()}
            title = "Go back"
          />
          <Button
            onPress = {() => navigation.navigate(RouteIdentifiers.secondStack.name, { screen: RouteIdentifiers.childOne.name })}
            title = "Go to Child 2"
          />
        </View>
      )
    }
  
  }
 
 export { Child }
 
 
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