/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function RenameModal({ showRename, setShowRename, setReloadId, selectId, setShowMenu }) {
    const dispatch = useDispatch();

    const [folderName, setFolderName] = useState('Untitled folder');
    const handleFolder = (e) => {
        setFolderName(e.target.value);
    };

    const handleRenameFolder = () => {
        AxiosAuth.post(`${ConfigApi.RENAME_FILE.replace(':fileSl', selectId)}`, {
            file_name: folderName,
            selectId,
        }).then((response) => {
            if (response.data.error === 0) {
                setShowRename(false);
                setReloadId(Math.random);
                setFolderName('');
                NotificationPopup(response, dispatch);
                setShowMenu(false);
            }
        });
    };
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_DETAIL.replace(':fileSl', selectId)}`).then((response) => {
            setFolderName(response.data?.title);
        });
    }, [selectId]);

    return (
        <Modal size="sm" show={showRename} onHide={() => setShowRename(false)} centered>
            <Modal.Body>
                <h5>Rename</h5>
                <div className="folder-create-input">
                    <input type="text" value={folderName} onChange={handleFolder} />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowRename(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleRenameFolder}>
                        Ok
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default RenameModal;
