import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function EmptyTrashModal({ showEmTrash, setEmTrashShow, setReloadId, selectId, setSelectId }) {
    const dispatch = useDispatch();
    const handleTrash = () => {
        AxiosAuth.post(`${ConfigApi.FILE_REMOVE_FOREVER}`, { selectId }).then((response) => {
            if (response.data.error === 0) {
                setReloadId(Math.random);
                setEmTrashShow(false);
                setSelectId(null);
                NotificationPopup(response, dispatch);
            }
        });
    };

    return (
        <Modal size="md" show={showEmTrash} onHide={() => setEmTrashShow(false)} centered>
            <Modal.Body>
                <h5>Remove forever ?</h5>
                <p>
                    All Item will be removed forever from trash and you wont{`'`}t be able to
                    restore them
                </p>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setEmTrashShow(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleTrash}>
                        Remove Forever
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default EmptyTrashModal;
