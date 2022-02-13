
  import React from 'react'
  import { StyleSheet, Modal, View, Button, Text, Image, Dimensions, StatusBar, Platform, FlatList } from 'react-native'
  import { TouchableOpacity ,TouchableHighlight } from 'react-native-gesture-handler'
  import SearchBar from "react-native-dynamic-search-bar"
  import { RouteIdentifiers } from '../../_navigation/rootNavigator';
  import DeviceInfo from 'react-native-device-info';
  import Bitmap from '../../_assets/buttons/configuration/Bitmap.png' 
  import { memesService } from '../../_services/memes.service'
  import { permissionService } from '../../_services/permissions.service';
  import ArrowUp from '../../_assets/arrows/up/186407-512.png'
  import ArrowDown from '../../_assets/arrows/down/186407-512.png'
  import CommentsIcon from '../../_assets/comments/comment.png'
  import NoResultsImage from '../../_assets/images/no-results/Artwork.png'
  import { styles } from './style'
  var widthScreen = Dimensions.get('window').width
  var heightScreen = Dimensions.get('window').height
  
  
  const renderItem = ({ item }) => {
    
    const { post_hint, title, url, score } = item.data
    if(post_hint == 'image' && url)
    {
        return ( 
            <View style={styles.renderItemContainer}>
                <View style={styles.childContainer}>
                <Image
                    source={{uri: url}}
                    style={{ flex: 1, width: widthScreen - 40, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                    resizeMode = 'stretch'
                />  
                </View>
                <View style={styles.paddingFlex}></View>
                <View style={styles.childContainerOne}>
                    <View style={styles.childContainerOneChildContainer}>
                        <View style={styles.arrowUp}>
                            <Image
                                source={ArrowUp}
                            />
                        </View>
                        <View style={styles.text}><Text>{score}</Text></View>
                        <View style={styles.paddingFlexOne}>
                            <Image
                                source={ArrowDown}
                            />
                        </View>
                    </View>
                    <View style={styles.paddingFlexTwo}></View>
                    <View style={styles.childContainerOneChildOneContainer}><Text adjustsFontSizeToFit={true} style={{ fontSize: 20 }}>{title}</Text></View>
                </View>
                <View style={styles.childContainerTwo}>
                    <View style={styles.paddingFlexThree}></View>
                    <View style={styles.childContainerTwoContainer}>
                        <View style={{ flex: 0.1 }}>
                            <Image
                                source={CommentsIcon}
                            />
                        </View>
                        <View style={styles.score}>
                            <Text>{score}</Text>
                        </View>
                        <View style={styles.paddingFlexScore}></View>
                    </View>
                </View>
            </View> 
        )
    }
    
  };


  const renderItemVoid = ({ item }) => {
    
        return ( 
            <View style={styles.renderItemVoidContainer}>
                <View style={styles.childContainerV}>
                    <Image
                        source={NoResultsImage}
                    />
                </View>
                <View style={styles.childContainerOneV}>
                    <View style={styles.childContainerTextContainerV}>
                        <Text style={styles.textRenderItemVoid}>No Results</Text>
                    </View>
                    <View style={styles.childContainerTextContainerOneV}>
                        <Text style={styles.textRenderItemVoidOne}>Sorry, there are no results for this search, Please try another phrase</Text>
                    </View>
                </View>
            </View> 
        )
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
            let dataImages = data.children.filter(x => {
                const { post_hint } = x.data
                console.log(post_hint)
                if(post_hint == 'image')
                {
                    return true
                }
                else
                {
                    return false
                }
            })

            this.setState({ memes: dataImages, noResults: false })
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
                    let dataImages = data.children.filter(x => {
                        const { post_hint } = x.data
                        console.log(post_hint)
                        if(post_hint == 'image')
                        {
                            
                            return true
                        }
                        else
                        {
                            return false
                        }
                    })
                    this.setState({ memes: dataImages, noResults: false })
                    
                }
            })
        }

        if(this.state.refresh != prevState.refresh)
        {
            memesService.getMemes().then((memes) => {
            
                const { data } = memes
                let dataImages = data.children.filter(x => {
                    const { post_hint } = x.data
                    console.log(post_hint)
                    if(post_hint == 'image')
                    {
                        
                        return true
                    }
                    else
                    {
                        return false
                    }
                })
                this.setState({ memes: dataImages, noResults: false })
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
               <View style={[styles.containerRender, { marginTop: marginNotchTop }]}>
                  <View style={styles.childContainerRender}>
                      <View style= {styles.configurationContainer}>
                      <TouchableOpacity onPress={() => {
                                    permissionService.setEditable('CAMERA', false)
                                    permissionService.setEditable('NOTIFICATIONS', false)
                                    permissionService.setEditable('LOCATION', false)
                        }}
                      >
                        <Image
                        source={Bitmap}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                      <View style= {styles.paddingFlexConfiguration}>
                      </View>
                  </View>
                  <View style={styles.childContainerRenderOne}>
                    <SearchBar
                        placeholder="Search here"
                        onChangeText={this.handleChangeText}
                        onClearPress={() => this.setState({ refresh: !this.state.refresh})}
                    />
                  </View>
                  <View style={styles.childContainerRenderTwo}>
                    {memes && <FlatList
                        data={memes}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => 'key' + index }
                    />}
                    {noResults && <FlatList
                        data={[{data: { post_hint: null, title: null, url: null, score: null }}]}
                        renderItem={renderItemVoid}
                        keyExtractor={(item, index) => 'key' + index }
                    />}
                </View>
            </View>
       )
     }
  }
  
  export { Home }