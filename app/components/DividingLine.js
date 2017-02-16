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
  Image
} from 'react-native';

import * as Constants from '../common/Constants';
export default class DividingLine extends Component {
  
    constructor(props) {  
        super(props);  
        this.state = {
            lineWidth:this.props.lineWidth,
            orientation:this.props.orientation,
            color:this.props.color,
        };  
    }  
    
    render() {
        if(this.state.orientation==undefined||this.state.orientation=='horizontal'){
            return (
                <View style={{flex: 1, height:this.state.lineWidth, backgroundColor: this.state.color,}}/>
            );
        }else{
            return (
                <View style={{width:this.state.lineWidth, backgroundColor: this.state.color,}}/>
            );
        }
        
    }
}


