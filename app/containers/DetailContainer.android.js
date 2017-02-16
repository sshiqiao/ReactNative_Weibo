/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import Header from '../components/Header';
import Item from '../components/Item';
export default class DetailContainer extends Component {
  
    constructor(props) {  
        super(props);  
        this.state = {  
            data:this.props.data
        };  
    }    
    
    render() {
        return (
            <View style={styles.container}>
                <Header title={"微博详情"} showIconLeft={true} navigator={this.props.navigator}/>
                <ScrollView style={styles.ScrollView}>
                    <Item style={styles.Item} data={this.state.data} isDetail={true}/>
                </ScrollView>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
  },
  ScrollView: {
      flex: 1
  },
  Item: {
      flex: 1
  }
});

