

import * as types from './ActionType';
export const resetAction = ()=>{
    return {
        type: types.RESET
    }
}
export const refreshSuccessedAction = (response)=>{
    return {
        type: types.REFRESH_SUCCESSED,
        response: response
    }
}
export const loadMoreSuccessedAction = (response)=>{
    return {
        type: types.LOAD_MORE_SUCCESSED,
        response: response
    }
}
export const failedAction = ()=>{
    return {
        type: types.FAILED
    }
}