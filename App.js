import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MarketNavigator from './navigation/MarketNavigator';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'varela-round': require('./assets/fonts/VarelaRound-Regular.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

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
