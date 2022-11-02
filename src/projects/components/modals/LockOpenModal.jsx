/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';

function LockOpenModal({ openLock, setOpenLock, selectId }) {
    const [lockPass, setLockPass] = useState('');
    const handleLockPass = (e) => {
        setLockPass(e.target.value);
    };
    const navigate = useNavigate();
    const handleLockOpenFolder = () => {
        AxiosAuth.post(`${ConfigApi.OPEN_LOCK_FOLDER.replace(':fileSl', selectId)}`, {
            lockPass,
            selectId,
        }).then((response) => {
            if (response.data.error === 0) {
                setOpenLock(false);
                navigate(`/user/drive/folder/${selectId}/?enCode=${response.data.enCode}`);
                setLockPass('');
            }
        });
    };

    return (
        <Modal size="sm" show={openLock} onHide={() => setOpenLock(false)} centered>
            <Modal.Body>
                <h5>Lock Password</h5>
                <div className="folder-create-input">
                    <input
                        type="password"
                        value={lockPass}
                        onChange={handleLockPass}
                        placeholder="Type Lock Password"
                    />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setOpenLock(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleLockOpenFolder}>
                        Open
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default LockOpenModal;
