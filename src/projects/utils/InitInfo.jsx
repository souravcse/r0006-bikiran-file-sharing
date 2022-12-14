import store from '../store';

function InitInfo() {
    const storeStates = store.getState();
    return {
        storeStates,
        show: !!storeStates?.initData?.initId,
        initData: storeStates?.initData,
        initId: storeStates?.initData?.initId,
    };
}

export default InitInfo;
