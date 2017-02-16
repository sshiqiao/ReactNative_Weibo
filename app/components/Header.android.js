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
import DividingLine from '../components/DividingLine';
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
                <View style={styles.header}>
                    {
                    this.state.showIconLeft ? 
                        <TouchableOpacity onPress = {() =>this._onBack()} underlayColor = "transparent">
                            <Image source={require('./img/ic_back/ic_back.png')} style={styles.iconLeft}/> 
                        </TouchableOpacity>     
                        : 
                        <TouchableOpacity>
                            <Image style={styles.iconRight} source={require('./img/ic_blank/ic_blank.png')}/>
                        </TouchableOpacity>
                    }
                    <Text style={styles.titleText}>{this.state.title}</Text>
                    <TouchableOpacity>
                        <Image style={styles.iconRight} source={require('./img/ic_blank/ic_blank.png')}/>
                    </TouchableOpacity>
                    
                </View>
                <DividingLine lineWidth={1} color={'#F0F0F0'}/>
                <DividingLine lineWidth={1} color={'#F6F6F6'}/>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
        height:52
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:50, 
        backgroundColor: '#FFFFFF'
    },
    iconLeft: {
        width:36,
        height:36,
        marginLeft:5
    },
    iconRight: {
        width:36,
        height:36,
        marginRight:5
    },
    titleText: {
        fontSize:18,
        color:'#000000',
        textAlign: 'auto',  
        lineHeight: 20
    },
});


