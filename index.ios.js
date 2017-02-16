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

import MainContainer from './app/containers/MainContainer'; 
export default class ReactNative_Weibo extends Component {
  render() {  
    return (  
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
    );  
  }  
}

AppRegistry.registerComponent('ReactNative_Weibo', () => ReactNative_Weibo);
