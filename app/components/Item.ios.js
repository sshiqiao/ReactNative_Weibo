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
import GridView from '../components/GridView';
import DividingLine from '../components/DividingLine';
import DetailContainer from '../containers/DetailContainer'; 
export default class Item extends Component {
  
    constructor(props) {  
        super(props);  
        this.state = {
            data:this.props.data
        };  
    }  
    _onPressItem(data) {    
        const navigator = this.props.navigator;
        if(navigator) {  
            navigator.push({  
                name: 'DetailContainer',  
                component: DetailContainer,
                params:{  
                    data:data
                } 
            })  
        }  
    }
    render() {
        return (
            <TouchableOpacity onPress = {() =>this._onPressItem(this.state.data)} >
                <DividingLine lineWidth={0.5} color={'#F0F0F0'}/>
                <View style={styles.listItemView}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image source={{uri: this.state.data.user.profile_image_url}} style={styles.profileImage} />
                        <View style={{flex: 1, justifyContent: 'space-between', margin: 2}}>
                            <Text numberOfLines={1} style={styles.userName}>{this.state.data.user.name}</Text>
                            <Text numberOfLines={1} style={styles.createTime}>{this.state.data.created_at}  来自{this.state.data.source_from}</Text>
                        </View>
                    </View>
                    {
                        this.props.isDetail?<Text style={styles.textContent}>{this.state.data.text}</Text>:
                        <Text numberOfLines={3} style={styles.textContent}>{this.state.data.text}</Text>
                    }
                    
                    <GridView data={this.state.data.image_url} columNum={3} itemMargin={2}/>
                </View>
                <DividingLine lineWidth={0.5} color={'#D1D1D1'}/>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconItemContainer}>
                        <Image source={require('./img/ic_lauch/ic_lauch.png')} style={styles.iconImage} />
                        <Text numberOfLines={1} style={styles.iconText}>{this.state.data.reposts_count}</Text>
                    </TouchableOpacity>
                    <DividingLine lineWidth={0.3} color={'#D1D1D1'} orientation={'vertical'}/>
                    <TouchableOpacity style={styles.iconItemContainer}>
                        <Image source={require('./img/ic_chat/ic_chat.png')} style={styles.iconImage} />
                        <Text numberOfLines={1} style={styles.iconText}>{this.state.data.comments_count}</Text>
                    </TouchableOpacity>
                    <DividingLine lineWidth={0.3} color={'#D1D1D1'} orientation={'vertical'}/>
                    <TouchableOpacity style={styles.iconItemContainer}>
                        <Image source={require('./img/ic_favorite/ic_favorite.png')} style={styles.iconImage} />
                        <Text numberOfLines={1} style={styles.iconText}>{this.state.data.likes_count}</Text>
                    </TouchableOpacity>
                </View>
                <DividingLine lineWidth={0.5} color={'#F0F0F0'}/>
                <DividingLine lineWidth={10} color={'#FFFFFF00'}/>
            </TouchableOpacity>
        );
        
    }
}
const styles = StyleSheet.create({

  listItemView: {
      padding: 15,
      backgroundColor: '#FFFFFF',
  },
  profileImage: {
      width:50,
      height:50,
      borderRadius:25,
      marginRight:15
  },
  userName: {
      fontSize:18,
      color:'#FF4500',
      textAlign: 'auto',  
      lineHeight: 22, 
      width:Constants.SCREEN_WIDTH-100
  },
  createTime: {
      fontSize:12,
      color:'#666666',
      textAlign: 'auto',  
      lineHeight: 12, 
      width:Constants.SCREEN_WIDTH-100
  },
  textContent: {
      fontSize:18,
      textAlign: 'auto',  
      lineHeight: 24,
      width:Constants.SCREEN_WIDTH-30,
      padding:3,
      marginTop:5
  },
  iconContainer: {
      flex: 1,
      flexDirection: 'row', 
      backgroundColor: '#FFFFFF',
      padding: 10
  },
  iconItemContainer: {
      flex: 1, flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center'
  },
  iconImage: {
      width:16,
      height:16,
      marginRight:5
  },
  iconText: {
      fontSize:12,
      color:'#666666',
      textAlign: 'auto',  
      lineHeight: 12
  },
  footerText: {
      flex:1,
      fontSize:16,
      color:'#666666',
      textAlign: 'center',
      height:30
  }
});


