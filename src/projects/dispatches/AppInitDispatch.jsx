import ConfigApi from '../../configs/ConfigApi';
import store from '../store';
import AxiosAuth from '../utils/AxiosAuth';

function initSet(payload) {
    return {
        type: 'INIT_SET',
        payload,
    };
}

export default function AppInitDispatch(dispatch, reset = false) {
    return new Promise((resolve, reject) => {
        const storeState = store.getState();
        if (!storeState.initData?.initId || reset === true) {
            AxiosAuth.get(`${ConfigApi.API_APP_INIT}`, {
                params: {
                    initId: localStorage.getItem('init-id'),
                },
            })
                .then((response) => {
                    // Init Info
                    dispatch(initSet(response.data.initData));
                    localStorage.setItem('init-id', response.data.initData.initId);

                    resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        } else {
            resolve(true);
        }
    });
}
