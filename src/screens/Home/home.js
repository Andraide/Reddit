



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
  import { StyleSheet, Modal, View, Button, Text, Image, Dimensions, StatusBar, Platform, FlatList } from 'react-native'
  import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
  //import { SearchBar } from 'react-native-elements';
  import SearchInput from '../../components/searchInput'
  import SearchBar from "react-native-dynamic-search-bar"
  import { RouteIdentifiers } from '../../_navigation/rootNavigator';
  import DeviceInfo from 'react-native-device-info';
  import Bitmap from '../../_assets/buttons/configuration/Bitmap.png' 
  import { memesService } from '../../_services/memes.service'
//import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
  //import hoc from '../../_hocs/loading'
  var widthScreen = Dimensions.get('window').width
  var heightScreen = Dimensions.get('window').height
  
  
  const renderItem = ({ item }) => {
    
    const { link_flair_text, Shitposting, post_hint, image, title, url, score, num_comments } = item.data
    //console.log(Object.keys(item))
    return ( <View><Text>{title}</Text></View> )
  };



  class Home extends React.Component {
  
    constructor(props) {
      super(props)
    
      this.state = { 
  
        visible: true,
        hasNotch: false,
        marginNotchTop: 0,
        memes: null 
  
      }
    }
  
    componentDidMount() {
     
     
        let hasNotch = DeviceInfo.hasNotch();
        this.setState({ hasNotch })
        console.log("hasNotch", hasNotch, Platform.OS)
        if(Platform.OS == 'ios' && hasNotch)
        {
            
            this.setState({ marginNotchTop: heightScreen/20 })
        }
        else if(hasNotch)
        {
            this.setState({ marginNotchTop: StatusBar.currentHeight })
        }

        memesService.getMemes().then((memes) => {
            const { data } = memes
            //console.log(Object.keys(data.children))
            this.setState({ memes: data.children })
            

            
        })
  
    }
  
    componentWillUnmount() {
  
      
      
    }

    renderMemes(meme) 
    {
        //const { memes } = this.state
        return (
             
            <View><Text>Meme</Text></View>
        )
        /*
        memes.map((x) => { 
                const { data } = x
                const { link_flair_text, Shitposting, post_hint, image, title, url, score, num_comments } = data
                //console.log(typeof(data))
                //console.log(Object.keys(data))
                console.log(link_flair_text)
                //console.log(link_flair_text, Shitposting, post_hint, image, title, url)
            //console.log(Object.keys(obj))
                return (
                    <View><Text>Meme</Text></View>
                )
            })
        */
    }


  
    render() {
     const { navigation } = this.props
     const { hasNotch, marginNotchTop, memes } = this.state
     //console.log(Object.keys(memes))
     console.log("Margin top", marginNotchTop)
     
     return (
               <View style={{ flex: 1, flexDirection: 'column', marginTop: marginNotchTop }}>
                  <View style={{ flex: 0.05, backgroundColor: 'transparent', flexDirection: 'row' }}>
                      <View style= {{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                        source={Bitmap}
                        ></Image>
                      </View>
                      <View style= {{ flex: 0.8 }}>
                      </View>
                  </View>
                  <View style={{ flex: 0.08, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <SearchBar
                        placeholder="Search here"
                        onPress={() => alert("onPress")}
                        onChangeText={(text) => console.log(text)}
                    />
                  </View>
                  <View style={{ flex: 0.87, backgroundColor: 'transparent' }}>
                    {memes && <FlatList
                        data={memes}
                        renderItem={renderItem}
                        keyExtractor={item => item.title}
                    />}
                </View>


               </View>
       )
     }
  
   }
  /*
  <FlatList
                        data={memes}
                        renderItem={this.renderMemes()}
                        keyExtractor={item => item.id}
                      />
  */
  export { Home }