/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';

function FolderCreateModal({ show, setFCreateShow }) {
    const [folderName, setFolderName] = useState('Untitled folder');
    const handleFolder = (e) => {
        setFolderName(e.target.value);
    };

    const handleCreateFolder = () => {
        AxiosAuth.currentUserAuth('kk')
            .post(`${ConfigApi.CREATE_FOLDER}`, { folderName })
            .then((response) => {
                if (response.data.error === 0) {
                    setFCreateShow(false);
                }
            });
    };

    return (
        <Modal size="sm" show={show} onHide={() => setFCreateShow(false)} centered>
            <Modal.Body>
                <h5>New Folder</h5>
                <div className="folder-create-input">
                    <input type="text" value={folderName} onChange={handleFolder} />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setFCreateShow(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleCreateFolder}>
                        Create
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default FolderCreateModal;
