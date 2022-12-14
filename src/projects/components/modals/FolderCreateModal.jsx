/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function FolderCreateModal({ show, setFCreateShow, setReloadId }) {
    const dispatch = useDispatch();
    const params = useParams();
    const parentSl = params?.folderSl ? params?.folderSl.slice(params?.folderSl.length - 8) : 0;

    const [folderName, setFolderName] = useState('Untitled folder');
    const handleFolder = (e) => {
        setFolderName(e.target.value);
    };

    const handleCreateFolder = () => {
        AxiosAuth.post(`${ConfigApi.CREATE_FOLDER}`, { folderName, parentSl }).then((response) => {
            if (response.data.error === 0) {
                setFCreateShow(false);
                setReloadId(Math.random);
                setFolderName('Untitled folder');
                NotificationPopup(response, dispatch);
            }
        });
    };
    const onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            handleCreateFolder();
        }
    };
    return (
        <Modal size="sm" show={show} onHide={() => setFCreateShow(false)} centered>
            <Modal.Body>
                <h5>New Folder</h5>
                <div className="folder-create-input">
                    <input
                        type="text"
                        value={folderName}
                        onChange={handleFolder}
                        onKeyDown={onKeyDownHandler}
                    />
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
