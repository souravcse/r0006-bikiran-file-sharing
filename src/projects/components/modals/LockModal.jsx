/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function LockModal({ showLock, setShowLock, setReloadId, selectId, setShowMenu = '' }) {
    const dispatch = useDispatch();

    const [lockPass, setLockPass] = useState('');
    const handleLockPass = (e) => {
        setLockPass(e.target.value);
    };

    const handleLockFolder = () => {
        AxiosAuth.post(`${ConfigApi.LOCK_FOLDER.replace(':fileSl', selectId)}`, {
            lockPass,
            selectId,
        }).then((response) => {
            if (response.data.error === 0) {
                setShowLock(false);
                setReloadId(Math.random);
                setLockPass('');
                NotificationPopup(response, dispatch);
                setShowMenu(false);
            }
        });
    };

    return (
        <Modal size="sm" show={showLock} onHide={() => setShowLock(false)} centered>
            <Modal.Body>
                <h5>Set Lock Password</h5>
                <div className="folder-create-input">
                    <input
                        type="password"
                        value={lockPass}
                        onChange={handleLockPass}
                        placeholder="Type Lock Password"
                    />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowLock(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleLockFolder}>
                        Lock
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default LockModal;
