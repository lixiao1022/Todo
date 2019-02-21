import axios from 'axios';

function ajaxCallback(callback) {
    return res => {
        const data = res.data;
        if (data.code == 0) {
            callback(data.data);
        } else {
            alert(data.msg);
        }
    }
};

export default function (obj) {
    obj._ajax = function (type, url, callback, params) {
        switch (type) {
            case 'get':
                axios.get(url, {
                    params
                }).then(
                    ajaxCallback(callback)
                ).catch(err => {
                    console.error(err);
                });
                break;
            case 'post':
                axios.post(url, params)
                    .then(ajaxCallback(callback))
                    .catch(err => {
                        console.error(err);
                    });
                break;
            case 'put':
                axios.put(url, params)
                    .then(ajaxCallback(callback))
                    .catch(err => {
                        console.error(err);
                    });
                break;
            case 'delete':
                axios.delete(url, { params })
                    .then(ajaxCallback(callback))
                    .catch(err => {
                        console.error(err);
                    });
                break;

            default:
                break;
        }
    };
}