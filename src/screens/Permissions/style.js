import { StyleSheet, Dimensions } from 'react-native'

var widthScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column' },
    containerOne: { flex: 0.6, alignItems: 'center', justifyContent: 'center' },
    containerThree: { flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    childContainerThree: { flex: 0.3, alignItems: 'center', justifyContent: 'center' },
    text: { textAlign: 'center', fontSize: 20 },
    childContainerThreeOne: { flex: 0.7, alignItems: 'center', justifyContent: 'flex-start' },
    textOne: { textAlign: 'center' },
    childContainerFour: { backgroundColor: 'transparent',flex: 0.4, width: widthScreen - 200, alignItems: 'center', justifyContent: 'center', borderRadius: 60 },
    childContainerFourOne : { flex: 0.2 },
    childContainerFourTwo :{ flex: 0.4, alignItems: 'center', justifyContent: 'center' },
    containerFour: { flex: 0.1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
})