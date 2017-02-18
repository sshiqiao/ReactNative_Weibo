/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import MainContainer from './app/containers/MainContainer'; 
import store from './app/store/Store';
export default class ReactNative_Weibo extends Component {
  render() {  
    return (  
        <Provider store={store}>  
        <Navigator  
            initialRoute={{ name: "MainContainer", component: MainContainer }}  
            configureScene={(route) => {  
            return Navigator.SceneConfigs.HorizontalSwipeJump;  
        }}  
        renderScene={(route, navigator) => {  
            let Component = route.component;  
            return <Component {...route.params} navigator={navigator} />  
        }}
        />  
        </Provider>
    );  
  }  
}

AppRegistry.registerComponent('ReactNative_Weibo', () => ReactNative_Weibo);
