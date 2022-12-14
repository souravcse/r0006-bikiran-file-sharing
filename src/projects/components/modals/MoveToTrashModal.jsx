import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function MoveToTrashModal({ showTrash, setTrashShow, setReloadId, selectId, setSelectId }) {
    const dispatch = useDispatch();
    const handleTrash = () => {
        AxiosAuth.post(`${ConfigApi.FILE_TRASH.replace(':fileSl', selectId)}`).then((response) => {
            if (response.data.error === 0) {
                setReloadId(Math.random);
                setTrashShow(false);
                setSelectId(null);
                NotificationPopup(response, dispatch);
            }
        });
    };

    return (
        <Modal size="sm" show={showTrash} onHide={() => setTrashShow(false)} centered>
            <Modal.Body>
                <h5>Move to Trash ?</h5>
                <p>this file will be automatic deleted forever after 30 days.</p>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setTrashShow(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleTrash}>
                        Move to Trash
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default MoveToTrashModal;
