let Utils = {
    get: (url, successCallback, failCallback) => {
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            successCallback(responseJson);
        })
        .catch((err) => {
            failCallback(err);
        });
    },
    post: (url, body, successCallback, failCallback) =>{
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            successCallback(responseJson);
        })
        .catch((err) => {
            failCallback(err);
        });
    }
}
export default Utils;