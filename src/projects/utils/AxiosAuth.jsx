import axios from 'axios';
import ConfigApi from '../../configs/ConfigApi';

class AxiosAuth {
    url = '';

    setAuth = () => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Secure-Access'] = localStorage.getItem('Secure-Access');
        axios.defaults.headers.common['Init-Id'] = localStorage.getItem('init-id');
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    };

    setUrl = (url) => {
        this.url = url;
        return this;
    };

    setApiUrl = (apiName, path = '', params = {}) => {
        let url = `${ConfigApi[apiName]}/${path}`;

        Object.keys(params).forEach((keyName) => {
            url = url.replace(`:${keyName}`, params[keyName]);
        });

        url = url
            .split('/')
            .filter((item) => !!item)
            .join('/');

        this.url = `${process.env.REACT_APP_API_URL}/${url}/`;
        return this;
    };

    get = (options) => {
        this.setAuth();

        return new Promise((resolve, reject) => {
            axios
                .get(this.url, options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    post = (params, options) => {
        this.setAuth();

        return new Promise((resolve, reject) => {
            axios
                .post(this.url, params, options)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    currentUserAuth = (currentUser) => {
        axios.defaults.headers.common['user-uid'] = currentUser?.userUid || '';
        axios.defaults.headers.common['refresh-token'] = currentUser?.refreshToken || '';
        return this;
    };
}
export default new AxiosAuth();
