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
  Image,
  DeviceEventEmitter
} from 'react-native';

import * as Constants from '../common/Constants';
export default class GridView extends Component {
  
    constructor(props) {  
        super(props);  
        this.state = {
            data:this.props.data,
            columNum:this.props.columNum,
            itemMargin:this.props.itemMargin,
        };  
    }  
  
    componentDidMount() {  
        
    }    
    _onPressButton() {
    }
    
    render() {
        var rows =[];
        var colums =[];
        for (var i=0; i<this.state.data.length; i=i+this.state.columNum) {
            rows =[];
            for(var j=i;j<this.state.data.length&&j<i+this.state.columNum;j++){
                rows.push(
                    <Image 
                    key={j}
                    source={{uri: this.state.data[j]}} 
                    style={{
                        width: (Constants.SCREEN_WIDTH-30-this.state.itemMargin*2*this.state.columNum)/this.state.columNum,
                        height: (Constants.SCREEN_WIDTH-30-this.state.itemMargin*2*this.state.columNum)/this.state.columNum,
                        margin:this.state.itemMargin,
                    }}  />
                );
            }
            colums.push(
                <View style={{flexDirection: 'row'}} key={"row"+i/this.state.columNum}>
                    {rows}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                {colums}
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

