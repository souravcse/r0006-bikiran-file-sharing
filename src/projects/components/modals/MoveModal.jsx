/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import folderImg from '../../../assets/images/folder-icon.svg';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function MoveModal({ showMove, setShowMove, setReloadId, selectId, setShowMenu, setSelectId }) {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [movedId, setMovedId] = useState();

    const handleFolder = (e) => {
        setMovedId(e);
        AxiosAuth.get(`${ConfigApi.GET_FILE_DETAIL?.replace(':folderSl', e)}`).then((response) => {
            setFiles(response.data.fileList_ar);
        });
    };

    const handleMove = () => {
        AxiosAuth.post(`${ConfigApi.MOVE_FILE.replace(':fileSl', selectId)}`, {
            moveFolderSl: movedId,
        }).then((response) => {
            if (response.data.error === 0) {
                setShowMove(false);
                setReloadId(Math.random);
                NotificationPopup(response, dispatch);
                setShowMenu(false);
                setSelectId(null);
            }
        });
    };
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_FILE}`).then((response) => {
            setFiles(response.data.fileList_ar);
        });
    }, []);
    return (
        <Modal size="md" show={showMove} onHide={() => setShowMove(false)} centered>
            <Modal.Body>
                <h5>My Drive</h5>
                <>
                    <ul className="move-modal-ul">
                        {files?.folder?.map((row) => (
                            <li onClick={() => handleFolder(row?.sl)}>
                                <img src={folderImg} alt="Floder Img" />
                                {row?.title}
                            </li>
                        ))}
                    </ul>
                </>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowMove(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleMove}>
                        Move
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default MoveModal;
