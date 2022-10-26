/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import CheckWhite from '../../../assets/images/check-white.svg';
import CrossWhite from '../../../assets/images/cross-white.svg';

import folderImg from '../../../assets/images/folder-icon.svg';
import FolderAdd from '../../../assets/images/folderAdd.svg';
import LeftArrow from '../../../assets/images/left-arrow.svg';

import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function MoveModal({ showMove, setShowMove, setReloadId, selectId, setShowMenu, setSelectId }) {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);
    const [movedId, setMovedId] = useState();
    const [isCreateFolder, setIsCreateFolder] = useState(false);
    const [folderName, setFolderName] = useState('Untitled folder');

    const handleFolderName = (e) => {
        setFolderName(e.target.value);
    };
    const handleFolder = (e) => {
        setMovedId(e);
        AxiosAuth.get(
            `${ConfigApi.GET_FILE_DETAIL?.replace(':folderSl', e !== 0 ? e : 'parentSl')}`
        ).then((response) => {
            setFiles(response.data.fileList_ar);
            setFile(response.data.file_ar);
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
    const handleCreateFolder = () => {
        AxiosAuth.post(`${ConfigApi.CREATE_FOLDER}`, {
            folderName,
            parentSl: selectedFile.parent_sl,
        }).then((response) => {
            if (response.data.error === 0) {
                setFolderName('Untitled folder');
                setIsCreateFolder(false);
                AxiosAuth.get(
                    `${ConfigApi.GET_FILE_DETAIL?.replace(':folderSl', selectedFile?.parent_sl)}`
                ).then((response2) => {
                    setFiles(response2.data.fileList_ar);
                });
            }
        });
    };
    const handleClose = () => {
        setReloadId(Math.random);
        setShowMove(false);
    };
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_FILE_DETAIL?.replace(':folderSl', selectId)}`).then(
            (response) => {
                setSelectedFile(response.data.file_ar);
            }
        );
        if (selectedFile?.parent_sl > 0) {
            AxiosAuth.get(
                `${ConfigApi.GET_FILE_DETAIL?.replace(':folderSl', selectedFile?.parent_sl)}`
            ).then((response) => {
                setFiles(response.data.fileList_ar);
                setFile(response.data.file_ar);
            });
        } else {
            AxiosAuth.get(`${ConfigApi.GET_FILE}`).then((response) => {
                setFiles(response.data.fileList_ar);
            });
        }
    }, [selectId, selectedFile.parent_sl, selectedFile.sl]);

    return (
        <Modal size="md" show={showMove} onHide={handleClose} centered>
            <Modal.Body>
                <h5 style={{ fontSize: 15, marginBottom: 20 }}>
                    {isCreateFolder ? (
                        <div className="move-modal-input">
                            <input
                                type="text"
                                placeholder="Type folder name"
                                value={folderName}
                                onChange={handleFolderName}
                            />
                            <button type="button" onClick={handleCreateFolder}>
                                <img src={CheckWhite} alt="" />
                            </button>
                            <button type="button" onClick={() => setIsCreateFolder(false)}>
                                {' '}
                                <img src={CrossWhite} alt="" />
                            </button>
                        </div>
                    ) : (
                        <>
                            {file?.parent_sl !== undefined ? (
                                <button
                                    type="button"
                                    style={{
                                        border: 'unset',
                                        backgroundColor: 'unset',
                                        paddingLeft: 0,
                                    }}
                                    onClick={() => handleFolder(file?.parent_sl)}
                                >
                                    <img src={LeftArrow} alt="" />
                                </button>
                            ) : null}
                            {file?.title ? file?.title : 'My Drive'}
                        </>
                    )}
                </h5>
                <>
                    <ul className="move-modal-ul">
                        {files?.folder?.map((row) => (
                            <li
                                onClick={() => handleFolder(row?.sl)}
                                key={row?.sl}
                                style={{
                                    pointerEvents: row?.sl === selectId ? 'none' : '',
                                }}
                            >
                                <img src={folderImg} alt="Floder Img" />
                                {row?.title}
                            </li>
                        ))}
                    </ul>
                </>
                <div className="folder-create-button">
                    <div style={{ width: '77%' }}>
                        <button
                            type="button"
                            onClick={() => setIsCreateFolder(true)}
                            style={{ border: 'unset', backgroundColor: 'unset' }}
                        >
                            <img src={FolderAdd} alt="" />
                        </button>
                    </div>

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
