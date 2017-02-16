/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    PropTypes,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    RefreshControl,
    ListView
} from 'react-native';
import * as Constants from '../common/Constants';
import Header from '../components/Header';
import Item from '../components/Item';
import GridView from '../components/GridView';
import DividingLine from '../components/DividingLine';
export default class MainContainer extends Component {
    
    constructor(props) {  
        super(props);  
        this.state = {  
            loading: false,
            footer:"正在加载...",
            pageIndex:0,
            datas:null,
            dataSource: new ListView.DataSource({  
                rowHasChanged: function(row1, row2) {return row1 !== row2},  
            })
        };
    }
    
    componentDidMount() {
        this._onRefresh();
    }
    
    _onRefresh() {
        this.state.loading = true;
        this.state.pageIndex = 0;
        fetch("http://116.62.49.210/InstagramServer/reactNativeTestUrl",{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=0&pageIndex='+this.state.pageIndex,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.state.loading = false;
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.state.datas = responseJson;
            this.state.footer = "正在加载...";
            this.state.datas.statuses.push(-1);
            this.setState({dataSource: ds.cloneWithRows(this.state.datas.statuses)});
        }).catch(err => {
            this.state.loading = false;
        });
    }
    _toEnd(){
        if(!this.state.loading){
            this.state.pageIndex = ++this.state.pageIndex;
            fetch("http://116.62.49.210/InstagramServer/reactNativeTestUrl",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=0&pageIndex='+this.state.pageIndex,
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.loading = false;
                let data = responseJson;
                
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                if(this.state.datas.statuses.length>0){
                    this.state.datas.statuses.pop();
                }
                for(var i=0;i<data.statuses.length;i++){
                    this.state.datas.statuses.push(data.statuses[i]);
                }
                
                if(data.statuses.length==0){
                    this.state.footer = "全部加载完毕";
                    this.state.datas.statuses.push(-2);
                }else{
                    this.state.footer = "正在加载...";
                    this.state.datas.statuses.push(-1);
                }
                
                this.setState({dataSource: ds.cloneWithRows(this.state.datas.statuses)});
            }).catch(err => {
                this.state.loading = false;
                this.state.pageIndex = --this.state.pageIndex;
            }); 
        }
    }
    
    _renderRow(rowData) {
        if(rowData==-1){
            return (
                <Text style={styles.footerText}>{this.state.footer}</Text>
            )
        }else if(rowData==-2){
            return (
                <Text style={styles.footerText}>{this.state.footer}</Text>
            )
        }else{
           return (<Item data={rowData} navigator={this.props.navigator}/>
        ); 
        }
    }
    
    render() {
        return (
        <View style={styles.container}>
            <Header title={"特别关注"} showIconLeft={false}/>
            <ListView style={styles.listView}
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={this._renderRow.bind(this)}
                onEndReached={ this._toEnd.bind(this) }
                onEndReachedThreshold={10}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this._onRefresh.bind(this)}/>
                }
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#F7F7F7',
  },
  listView: {
      flex: 1,
      marginTop:2,
      paddingTop:10
  },
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

