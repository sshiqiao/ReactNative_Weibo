

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
import {resetAction,refreshSuccessedAction,loadMoreSuccessedAction,failedAction} from '../actions/Actions';
import {BlogListData} from '../actions/API';
import { connect } from 'react-redux';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class MainContainer extends Component {
    
    componentDidMount() {
        this._onRefresh();
    }
    
    _onRefresh() {
        const {dispatch} = this.props;
        dispatch(resetAction());
        BlogListData(0,(response)=>{
            dispatch(refreshSuccessedAction(response));
        },(error)=>{
            dispatch(failedAction());
        });
    }
    
    _toEnd(){
        const {dispatch} = this.props;
        if(!this.props.loading){
            BlogListData(this.props.pageIndex,(response)=>{
                dispatch(loadMoreSuccessedAction(response));
            },(error)=>{
                dispatch(failedAction());
            });
        }
    }
    
    _renderRow(rowData) {
        if(rowData==-1){
            return (
                <Text style={styles.footerText}>{this.props.footer}</Text>
            )
        }else if(rowData==-2){
            return (
                <Text style={styles.footerText}>{this.props.footer}</Text>
            )
        }else{
           return (<Item data={rowData} navigator={this.props.navigator} store={this.props.store}/>
        ); 
        }
    }
    
    render() {
        return (
        <View style={styles.container}>
            <Header title={"特别关注"} showIconLeft={false}/>
            <ListView style={styles.listView}
                dataSource={this.props.dataSource}
                enableEmptySections={true}
                renderRow={this._renderRow.bind(this)}
                onEndReached={ this._toEnd.bind(this) }
                onEndReachedThreshold={10}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.loading}
                        onRefresh={this._onRefresh.bind(this)}/>
                }
            />
        </View>
        );
    }
}

function select(store){
  return {
      loading: store.ListReducer.loading,
      footer:store.ListReducer.footer,
      pageIndex:store.ListReducer.pageIndex,
      datas:store.ListReducer.data,
      dataSource:store.ListReducer.dataSource
  }
}
export default connect(select)(MainContainer);

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

