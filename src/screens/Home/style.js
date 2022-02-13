import { StyleSheet, Dimensions } from 'react-native'

var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height

export const styles = StyleSheet.create({
    renderItemContainer :{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', height: heightScreen/3, width: widthScreen - 40, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 20, borderColor: '#000', borderWidth: 0.1 },
    childContainer: { flex: 0.65, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: widthScreen - 40, borderRadius: 20 },
    paddingFlex: { flex: 0.05 },
    childContainerOne: { flex: 0.2, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'flex-start' },
    childContainerOneChildContainer:{ flex: 0.12, backgroundColor: 'transparent', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    arrowUp:{ flex: 0.12, alignItems: 'center', justifyContent: 'center' },
    text: { flex: 0.6, alignItems: 'center', justifyContent: 'center' },
    paddingFlexOne: { flex: 0.2 },
    paddingFlexTwo: { flex: 0.05 },
    childContainerOneChildOneContainer: { flex: 0.77, backgroundColor: 'transparent' },
    childContainerTwo: { flex: 0.1, flexDirection: 'row', alignItems: 'flex-start' },
    paddingFlexThree: { flex: 0.17 },
    childContainerTwoContainer: { flex: 0.77, flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' },
    score: { flex: 0.1, backgroundColor: 'transparent' },
    paddingFlexScore: { flex: 0.8 },
    renderItemVoidContainer: {flex: 1, backgroundColor: 'white', flexDirection: 'column', height: heightScreen/2, width: widthScreen - 40, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 20 },
    childContainerV: { flex: 0.7 },
    childContainerOneV: { flex: 0.3, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    childContainerTextContainerV: { flex: 0.5, alignItems: 'center',  justifyContent: 'center'},
    textRenderItemVoid: { fontSize: 25 },
    childContainerTextContainerOneV: { flex: 0.5, alignItems: 'center',  justifyContent: 'center'},
    textRenderItemVoidOne: { fontSize: 15, textAlign: 'center' },
    containerRender: { flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column' },
    childContainerRender: { flex: 0.05, backgroundColor: 'transparent', flexDirection: 'row' },
    configurationContainer:{ flex: 0.2, justifyContent: 'center', alignItems: 'center' },
    paddingFlexConfiguration: { flex: 0.8 },
    childContainerRenderOne: { flex: 0.08, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    childContainerRenderTwo: { flex: 0.87, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },

})