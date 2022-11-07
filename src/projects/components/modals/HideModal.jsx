/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React from 'react';

import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function HideModal({ fileAr, showHide, setShowHide, setReloadId, selectId, setShowMenu }) {
    const dispatch = useDispatch();

    const handleHideFolder = (e) => {
        AxiosAuth.post(`${ConfigApi.HIDE_FILE.replace(':fileSl', selectId)}`, {
            is_hide: e,
            selectId,
        }).then((response) => {
            if (response.data.error === 0) {
                setShowHide(false);
                setReloadId(Math.random);
                NotificationPopup(response, dispatch);
                setShowMenu(false);
            }
        });
    };

    return (
        <Modal size="sm" show={showHide} onHide={() => setShowHide(false)} centered>
            <Modal.Body>
                <h5>Is Hide ?</h5>
                {fileAr?.is_hide === 0 ? (
                    <p>Do you want to Hidden this file</p>
                ) : (
                    <p>Do you want to Remove Form Hidden list</p>
                )}

                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowHide(false)}>
                        No
                    </button>
                    <button
                        type="button"
                        onClick={() => handleHideFolder(fileAr?.is_hide === 0 ? 1 : 0)}
                    >
                        Yes
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default HideModal;
