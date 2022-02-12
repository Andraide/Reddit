



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
  import { StyleSheet, Modal, View, Button, Text, Image, Dimensions, StatusBar, Platform } from 'react-native'
  import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
  //import { SearchBar } from 'react-native-elements';
  import SearchInput from '../../components/searchInput'
  import { SearchBar } from 'react-native-elements';
  import { RouteIdentifiers } from '../../_navigation/rootNavigator';
  import DeviceInfo from 'react-native-device-info';
  import Bitmap from '../../_assets/buttons/configuration/Bitmap.png' 
//import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
  //import hoc from '../../_hocs/loading'
  var widthScreen = Dimensions.get('window').width
  var heightScreen = Dimensions.get('window').height
  
  
  class Home extends React.Component {
  
    constructor(props) {
      super(props)
    
      this.state = { 
  
        visible: true,
        hasNotch: false,
        marginNotchTop: 0 
  
      }
    }
  
    componentDidMount() {
     
     
        let hasNotch = DeviceInfo.hasNotch();
        this.setState({ hasNotch })
        console.log("hasNotch", hasNotch, Platform.OS)
        if(Platform.OS == 'ios' && hasNotch)
        {
            
            this.setState({ marginNotchTop: 24 })
        }
        else if(hasNotch)
        {
            this.setState({ marginNotchTop: StatusBar.currentHeight })
        }
  
    }
  
    componentWillUnmount() {
  
      
      
    }
  
    render() {
     const { navigation } = this.props
     const { hasNotch, marginNotchTop } = this.state
     console.log("Margin top", marginNotchTop)
     
     return (
               <View style={{ flex: 1, flexDirection: 'column', marginTop: marginNotchTop }}>
                  <View style={{ flex: 0.1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                      <View style= {{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                        source={Bitmap}
                        ></Image>
                      </View>
                      <View style= {{ flex: 0.8 }}>
                      
                      </View>
                  </View>
                  <View style={{ flex: 0.1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                      <SearchBar/>
                  </View>
                  <View style={{ flex: 0.8, backgroundColor: 'blue' }}></View>


               </View>
       )
     }
  
   }
  
  export { Home }