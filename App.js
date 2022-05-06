import React, { useEffect, useState } from 'react';
import ReduxThunk from 'redux-thunk';
import { LogBox, Text, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './routes/AppNavigator';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/users';
import eventReducer from './store/reducers/event';
import pageReducer from './store/reducers/page';
import { Provider } from 'react-redux';
//import { StatusBar } from 'react-native-web';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  event: eventReducer, 
  pages: pageReducer
});

//const store = createStore(rootReducers, applyMiddleware(ReduxThunk));
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(ReduxThunk)));

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'componentWillReceiveProps']);
  }, []);

  return (

    <Provider store={store}>
      <AppNavigator />


    </Provider>

  );
};

export default App;
