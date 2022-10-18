/* eslint-disable class-methods-use-this */
import axios from 'axios';

class AxiosAuth {
    setAuth() {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Secure-Access'] = localStorage.getItem('Secure-Access');
        axios.defaults.headers.common['Init-Id'] = localStorage.getItem('init-id');
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    }

    get(url, headers) {
        this.setAuth();

        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    post(url, data, headers) {
        this.setAuth();

        return new Promise((resolve, reject) => {
            axios
                .post(url, data, headers)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    currentUserAuth(currentUser) {
        axios.defaults.headers.common.Uid = currentUser?.localUid;
        axios.defaults.headers.common['Refresh-Token'] = currentUser?.refreshToken;
        return this;
    }
}
export default new AxiosAuth();
