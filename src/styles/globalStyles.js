import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

import colours from './colours';
import fonts from './fonts';
//import smartHomeColours from '../smartHome/theme/colours';

const { width } = Dimensions.get('window');
const cardWidth = width < (318 + 29 + 29) ? (width - 29 - 29) : 318;

const globalStyles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20
  },
  darkOverlayContainer: {
    flex: 1,
    position: 'absolute',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 100,
    backgroundColor: colours.black
  },
  listItemSeparator: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colours.grayDivider
  },
  grayDividerLine: {
    borderBottomColor: colours.grayDivider,
    borderBottomWidth: 1
  },
  listItemSeparatorSecondary: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colours.blueDivider
  },
  greenOverlayContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 100,
    backgroundColor: colours.transparentBrandGreen
  },
  brandGreenSafeArea: {
    flex: 1,
    backgroundColor: colours.brandGreen
  },
  darkGreenSafeArea: {
    flex: 1,
    backgroundColor: colours.darkGreen
  },
  whiteSafeArea: {
    flex: 1,
    backgroundColor: colours.white
  },
  graySafeArea: {
    flex: 1,
    backgroundColor: colours.gray
  },
  feedbackSafeArea: {
    flex: 1,
    backgroundColor: colours.feedbackBlue
  },
  optionListSeperator: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colours.white
  },
  androidNotchPadding: {
    paddingTop: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight
  },
  notificationCardContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: colours.blackTransparent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationCard: {

    width: cardWidth,
    borderRadius: 10,
    overflow: 'hidden'
  },
  notificationCardImage: {
    width: cardWidth,
    height: 188,
    resizeMode: 'stretch'
  },
  notificationCardCloseContainer: {
    height: 44,
    width: 44,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationCardClose: {
    height: 14,
    width: 14
  },
  notificationCardTextContainer: {
    maxHeight: 194,
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 30,
    paddingBottom: 30,
    width: cardWidth,
    backgroundColor: colours.white
  },
  notificationCardText: {
    ...fonts.title,
    lineHeight: 26,
    letterSpacing: 0,
    color: colours.lightBlack
  },
  paginationImage: {
    marginHorizontal: 7
  },
  paginationContainer: {
    marginTop: -10,
    marginBottom: -10
  },
  notification: {
    width
  },
  carouselContainer: {
    flexGrow: 0
  },
  appWaitContainer: {
    flex: 1,
    backgroundColor: smartHomeColours.cyprusLight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appWaitImage: {
    width: 200,
    resizeMode: 'contain'
  },
  appWaitText: {
    ...fonts.bodyHeavyNext,
    color: colours.white,
    marginTop: 30
  },
  appUpdateContainer: {
    flex: 1,
    backgroundColor: smartHomeColours.deepTeal,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default globalStyles;