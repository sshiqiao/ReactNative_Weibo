

import Utils from '../common/Utils';
export let BlogListData = (pageIndex, successCallback, failCallback) => {
    let url = 'http://116.62.49.210/InstagramServer/reactNativeTestUrl';
    let body = 'action=0&pageIndex='+pageIndex;
    return Utils.post(url, body, successCallback, failCallback);
}