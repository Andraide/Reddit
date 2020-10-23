import React, { Component } from 'react';
import {
  Animated,
  View, Text } from 'react-native';

import activityIndicatorStyle from './activityIndicatorStyle';

type Props = {
  loadingText?: Object,
  backgroundColor?: Object
};
export default class ActivityIndicator extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.pulseDot1 = new Animated.Value(0);
    this.pulseDot2 = new Animated.Value(0);
    this.pulseDot3 = new Animated.Value(0);
    this.pulseDot4 = new Animated.Value(0);
    this.state = {
      timer: null
    };
  }

  componentWillMount() {
    const timer = setInterval(() => {
      this.animate();
    }, 1000);
    this.setState({ timer });
    this.animate();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  animate() {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(
          this.pulseDot1,
          {
            toValue: 1,
            duration: 350
          }
        ),
        Animated.timing(
          this.pulseDot1,
          {
            toValue: 0,
            duration: 350
          }
        )
      ]),
      Animated.sequence([
        Animated.timing(
          this.pulseDot2,
          {
            toValue: 1,
            duration: 350,
            delay: 150
          }
        ),
        Animated.timing(
          this.pulseDot2,
          {
            toValue: 0,
            duration: 350
          }
        )
      ]),
      Animated.sequence([
        Animated.timing(
          this.pulseDot3,
          {
            toValue: 1,
            duration: 350,
            delay: 250
          }
        ),
        Animated.timing(
          this.pulseDot3,
          {
            toValue: 0,
            duration: 350
          }
        )
      ]),
      Animated.sequence([
        Animated.timing(
          this.pulseDot4,
          {
            toValue: 1,
            duration: 350,
            delay: 320
          }
        ),
        Animated.timing(
          this.pulseDot4,
          {
            toValue: 0,
            duration: 350
          }
        )
      ])
    ]).start();
  }

  render() {
    const pulseDot1 = this.pulseDot1.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    });
    const pulseDot2 = this.pulseDot2.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    });
    const pulseDot3 = this.pulseDot3.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    });
    const pulseDot4 = this.pulseDot4.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0]
    });
    return (
      <View style={[activityIndicatorStyle.container, this.props.backgroundColor]}>
        <View style={activityIndicatorStyle.upperContainer}>
          <Animated.View
            style={[activityIndicatorStyle.pulseIndicator,
            { transform: [{ translateY: pulseDot1 }] }]}
          />
          <Animated.View
            style={[activityIndicatorStyle.pulseIndicator,
            { transform: [{ translateY: pulseDot2 }] }]}
          />
          <Animated.View
            style={[activityIndicatorStyle.pulseIndicator,
            { transform: [{ translateY: pulseDot3 }] }]}
          />
          <Animated.View
            style={[activityIndicatorStyle.pulseIndicator,
            { transform: [{ translateY: pulseDot4 }] }]}
          />
        </View>
        <View style={activityIndicatorStyle.bottomContainer}>
          <Text style={activityIndicatorStyle.loadingText}>{this.props.loadingText}</Text>
        </View>
      </View>
    );
  }
}