import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MarketNavigator from './navigation/MarketNavigator';

export default function App() {
  return (
    <MarketNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
