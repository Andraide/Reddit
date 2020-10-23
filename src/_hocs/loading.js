// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default (Comp: ReactClass<*>) => {
  console.log("Saying hi from the HOC!")
  return ({ spinner, children, ...props }: Object) => (
    <Comp {...props}></Comp>
  );
};