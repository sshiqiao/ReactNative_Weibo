

import * as types from '../actions/ActionType';
import {
    ListView
} from 'react-native';
import { combineReducers } from 'redux' 
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const initialState = {
    loading: true,
    footer:"正在加载...",
    pageIndex:0,
    datas:null,
    dataSource: ds
};

let ListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RESET:
            return Object.assign({}, state, {
                loading: true,
                footer:"正在加载...",
                pageIndex:0,
                datas:null,
                dataSource: ds
            });
        case types.REFRESH_SUCCESSED:
            state.pageIndex = ++state.pageIndex;
            state.datas = action.response;
            state.datas.statuses.push(-1);
            state.dataSource = ds.cloneWithRows(state.datas.statuses);
            return Object.assign({}, state, {
                loading: false,
                footer:"正在加载..."
            });
        case types.LOAD_MORE_SUCCESSED:
            state.pageIndex = ++state.pageIndex;
            if(state.datas.statuses.length>0){
                state.datas.statuses.pop();
            }
            if(action.response.statuses.length==0){
                state.footer = "全部加载完毕";
                state.datas.statuses.push(-2);
            }else{
                action.response.statuses.forEach(function (value) {
                    state.datas.statuses.push(value);
                });
                state.footer = "正在加载...";
                state.datas.statuses.push(-1);
            }
            state.dataSource = ds.cloneWithRows(state.datas.statuses);
            return Object.assign({}, state, {
                loading: false
            });
        case types.FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state;
    }
}
const RootReducer = combineReducers({  
  ListReducer:ListReducer
})  
  
export default RootReducer;