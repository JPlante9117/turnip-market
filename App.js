import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';
import postingsReducer from './store/reducers/postingsReducer';
import islandPricesReducer from './store/reducers/islandPricesReducer';
import authReducer from './store/reducers/authReducer';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  postings: postingsReducer,
  islandPrices: islandPricesReducer,
  authentication: authReducer
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
      <AppNavigator />
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
