
  import React from 'react'
  import { StyleSheet, Modal, View, Button, Text, Image, Dimensions, StatusBar, Platform, FlatList } from 'react-native'
  import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
  import SearchBar from "react-native-dynamic-search-bar"
  import { RouteIdentifiers } from '../../_navigation/rootNavigator';
  import DeviceInfo from 'react-native-device-info';
  import Bitmap from '../../_assets/buttons/configuration/Bitmap.png' 
  import { memesService } from '../../_services/memes.service'
  import ArrowUp from '../../_assets/arrows/up/186407-512.png'
  import ArrowDown from '../../_assets/arrows/down/186407-512.png'
  import CommentsIcon from '../../_assets/comments/comment.png'
  import NoResultsImage from '../../_assets/images/no-results/Artwork.png'

  var widthScreen = Dimensions.get('window').width
  var heightScreen = Dimensions.get('window').height
  
  
  const renderItem = ({ item }) => {
    
    const { post_hint, title, url, score } = item.data
    if(post_hint == 'image' && url)
    {
        return ( 
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column', height: heightScreen/3, width: widthScreen - 40, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 20, borderColo: '#000', borderWidth: 0.1 }}>
                <View style={{ flex: 0.65, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: widthScreen - 40, borderRadius: 20 }}>
                <Image
                    source={{uri: url}}
                    style={{ flex: 1, width: widthScreen - 40, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                    resizeMode = 'stretch'
                />  
                </View>
                <View style={{ flex: 0.05 }}></View>
                <View style={{ flex: 0.2, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 0.1, backgroundColor: 'transparent', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.12, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={ArrowUp}
                            />

                        </View>
                        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}><Text>{score}</Text></View>
                        <View style={{ flex: 0.2 }}>
                            <Image
                                source={ArrowDown}
                            />
                        </View>


                    </View>
                    <View style={{ flex: 0.9, backgroundColor: 'transparent' }}><Text adjustsFontSizeToFit={true} style={{ fontSize: 20 }}>{title}</Text></View>
                </View>
                <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 0.1 }}></View>
                    <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 0.1 }}>
                            <Image
                                source={CommentsIcon}
                            />
                        </View>
                        <View style={{ flex: 0.1, backgroundColor: 'transparent' }}>
                            <Text>{score}</Text>
                        </View>
                        <View style={{ flex: 0.8 }}></View>

                    </View>
                </View>
            </View> 
        )
    }
    else if(post_hint == null && title == null && url == null && score == null)
    {
        return ( 
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column', height: heightScreen/2, width: widthScreen - 40, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 20 }}>
                <View style={{ flex: 0.7 }}>
                    <Image
                        source={NoResultsImage}
                    />
                </View>
                <View style={{ flex: 0.3, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 0.5, alignItems: 'center',  justifyContent: 'center'}}>
                        <Text style={{ fontSize: 25 }}>No Results</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center',  justifyContent: 'center'}}>
                        <Text style={{ fontSize: 15, textAlign: 'center' }}>Sorry, there are no results for this search, Please try another phrase</Text>
                    </View>

                </View>

            </View> 
        )
    }
    
  };



  class Home extends React.Component {
  
    constructor(props) {
      super(props)
    
      this.state = { 
  
        visible: true,
        hasNotch: false,
        noResults: false,
        marginNotchTop: 0,
        memes: null,
        search: null,
        refresh: false 
  
      }


      this.handleChangeText = this.handleChangeText.bind(this)

      
    }
  
    componentDidMount() {
     
     
        let hasNotch = DeviceInfo.hasNotch();
        this.setState({ hasNotch })
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
            this.setState({ memes: data.children, noResults: false })
        })

        
  
    }

    componentDidUpdate(prevProps, prevState, snapShot)
    {
        const { search } = this.state
        if(this.state.search != prevState.search)
        {
            memesService.getMemesByFilter(search).then((memes) => {
                const { data } = memes
                if(data.children.length == 0)
                {
                    this.setState({ memes: [], noResults: true })
                }
                else
                {
                    this.setState({ memes: data.children, noResults: false })
                    
                }
            })
        }

        if(this.state.refresh != prevState.refresh)
        {
            memesService.getMemes().then((memes) => {
            
                const { data } = memes
                this.setState({ memes: data.children, noResults: false })
            })
        }
    }
  
    handleChangeText(search)
    {
        this.setState({ search })
    }

    render() {
        const { navigation } = this.props
        const { hasNotch, marginNotchTop, memes, noResults } = this.state
     
        return (
               <View style={{ flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column', marginTop: marginNotchTop }}>
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
                        onChangeText={this.handleChangeText}
                        onClearPress={() => this.setState({ refresh: !this.state.refresh})}
                    />
                  </View>
                  <View style={{ flex: 0.87, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                    {memes && <FlatList
                        data={memes}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />}
                    {noResults && <FlatList
                        data={[{data: { post_hint: null, title: null, url: null, score: null }}]}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />}
                </View>
            </View>
       )
     }
  }
  
  export { Home }