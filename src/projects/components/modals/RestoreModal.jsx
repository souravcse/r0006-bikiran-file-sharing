import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function RestoreModal({ showRestore, setShowRestore, setReloadId, selectId, setSelectId }) {
    const dispatch = useDispatch();
    const handleTrash = () => {
        AxiosAuth.post(`${ConfigApi.FILE_RESTORE.replace(':fileSl', selectId)}`).then(
            (response) => {
                if (response.data.error === 0) {
                    setReloadId(Math.random);
                    setShowRestore(false);
                    setSelectId(null);
                    NotificationPopup(response, dispatch);
                }
            }
        );
    };

    return (
        <Modal size="sm" show={showRestore} onHide={() => setShowRestore(false)} centered>
            <Modal.Body>
                <h5>Restore File ?</h5>
                <p>this file will be automatic deleted forever after 30 days.</p>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowRestore(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleTrash}>
                        Restore
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default RestoreModal;
