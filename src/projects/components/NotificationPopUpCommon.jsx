/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cross from '../../assets/images/cross-white.svg';
import store from '../store';

function PopUpClose() {
    return {
        type: 'SET_CLOSE_SNACKBAR',
        payload: {},
    };
}

export default function NotificationPopUpCommon() {
    const dispatch = useDispatch();
    const sbInfo = useSelector((state) => state.activeSnackbar);
    const [open, setOpen] = useState(sbInfo?.isOpen);
    const handleSnackbarClose = () => {
        dispatch(PopUpClose());
    };
    useEffect(() => {
        const unsubscribeMe = store.subscribe(() => {
            setOpen(store.getState().activeSnackbar?.isOpen);
        });
        // effect
        return () => {
            unsubscribeMe();
        };
    }, []);
    if (!open) {
        return null;
    }
    return (
        <div className="notication-popup">
            <p>{sbInfo?.message}</p>
            <button type="button" onClick={handleSnackbarClose}>
                <img src={Cross} alt="" />
            </button>
        </div>
    );
}
