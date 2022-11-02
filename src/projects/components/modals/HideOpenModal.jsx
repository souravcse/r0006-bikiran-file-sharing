/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';

function HideOpenModal({ openHide, setOpenHide, setIsPageShow }) {
    const [lockPass, setLockPass] = useState('');
    const handleLockPass = (e) => {
        setLockPass(e.target.value);
    };
    const handleHideFolder = () => {
        AxiosAuth.post(`${ConfigApi.HIDE_FILE_CHECK.replace(':fileSl', 123)}`, {
            lockPass,
        }).then((response) => {
            if (response.data.error === 0) {
                setIsPageShow(true);
                setOpenHide(false);
            }
        });
    };
    return (
        <Modal size="sm" show={openHide} onHide={() => setOpenHide(false)} centered>
            <Modal.Body>
                <h5>Is UnHide ?</h5>
                <div className="folder-create-input">
                    <input
                        type="password"
                        value={lockPass}
                        onChange={handleLockPass}
                        placeholder="Type User Password"
                    />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setOpenHide(false)}>
                        No
                    </button>
                    <button type="button" onClick={() => handleHideFolder(1)}>
                        Yes
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default HideOpenModal;
