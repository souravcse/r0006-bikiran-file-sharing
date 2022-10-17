import ConfigApi from '../../configs/ConfigApi';
import store from '../store';
import AxiosAuth from '../utils/AxiosAuth';

function initSet(payload) {
    return {
        type: 'INIT_SET',
        payload,
    };
}

function shopInitSet(payload) {
    return {
        type: 'SHOP_INIT_SET',
        payload,
    };
}

export default function AppInitDispatch(dispatch, reset = false) {
    return new Promise((resolve, reject) => {
        const storeState = store.getState();

        if (!storeState.initData?.initId || reset === true) {
            AxiosAuth.get(`${ConfigApi.API_APP_INIT}/`, {
                params: {
                    shopId: process.env.REACT_APP_SHOP_ID,
                    initId: localStorage.getItem('init-id'),
                    locale: JSON.parse(localStorage.getItem('locale')),
                },
            })
                .then((response) => {
                    // Init Info
                    dispatch(initSet(response.data.initData));
                    localStorage.setItem('init-id', response.data.initData.initId);
                    localStorage.setItem('locale', JSON.stringify(response.data.initData.locale));
                    dispatch(shopInitSet(response.data.shopData));

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
