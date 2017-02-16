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
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import * as Constants from '../common/Constants';
export default class Header extends Component {
  
    constructor(props) {  
        super(props);  
        this.state = {
            title:this.props.title,
            showIconLeft:this.props.showIconLeft,
        };  
    }  
    _onBack() {
        const navigator = this.props.navigator;
        if(navigator) {  
            navigator.pop(); 
        } 
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.showIconLeft ? 
                        <TouchableOpacity onPress = {() =>this._onBack()} underlayColor = "transparent">
                            <Image source={require('./img/ic_back/ic_back.png')} style={styles.iconLeft}/> 
                        </TouchableOpacity>     
                        : <Image style={styles.iconLeft} />
                }
                <Text style={styles.titleText}>{this.state.title}</Text>
                <Image style={styles.iconRight} />
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:70, 
      paddingTop: 20,
      backgroundColor: '#FFFFFF',
      shadowOffset:{width:0,height:2},
      shadowColor:'#E5E5E5',
      shadowOpacity:1.0
  },
  iconLeft: {
      width:36,
      height:36,
      marginLeft:10
  },
  iconRight: {
      width:36,
      height:36,
      marginRight:10
  },
  titleText: {
      fontSize:20,
      color:'#000000',
      textAlign: 'auto',  
      lineHeight: 20
  },
});


