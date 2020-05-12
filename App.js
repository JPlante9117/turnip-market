import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MarketNavigator from './navigation/MarketNavigator';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';
import postingsReducer from './store/reducers/postingsReducer';

const rootReducer = combineReducers({
  postings: postingsReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

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
    <Provider store={store}>
      <MarketNavigator />
    </Provider>
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
