import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import circleImg from '../../../assets/images/circleUser.svg';

import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';

function ShareModal({ showShare, setShareShow, setReloadId, selectId, setSelectId }) {
    const [file, setFile] = useState(null);
    const [shareEmail, setShareEmail] = useState(null);
    const [isNotify, setIsNotify] = useState(1);

    const handleShareEmail = (e) => {
        setShareEmail(e.target.value);
    };
    const handleNotify = () => {
        setIsNotify(!isNotify);
    };
    const handleTrash = () => {
        AxiosAuth.post(`${ConfigApi.FILE_TRASH.replace(':fileSl', selectId)}`).then((response) => {
            if (response.data.error === 0) {
                setReloadId(Math.random);
                setShareShow(false);
                setSelectId(null);
            }
        });
    };
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_DETAIL.replace(':fileSl', selectId)}`).then((response) => {
            setFile(response.data);
        });
    }, [selectId]);
    return (
        <Modal size="md" show={showShare} onHide={() => setShareShow(false)} centered>
            <Modal.Body>
                <h5>{file?.title} </h5>
                <div className="share-modal-input">
                    <input
                        type="email"
                        value={shareEmail}
                        placeholder="Add Email"
                        onChange={handleShareEmail}
                        style={{ width: shareEmail !== null ? '80%' : '100%' }}
                    />
                    {shareEmail !== null ? (
                        <>
                            <select>
                                <option value="viewer">Viewer</option>
                                <option value="editor">Editor</option>
                                <option value="manager">Manager</option>
                            </select>
                            <div className="share-modal-input-check">
                                <input
                                    type="checkbox"
                                    onClick={handleNotify}
                                    checked={!!isNotify}
                                />
                                <span>Notify People</span>
                            </div>
                        </>
                    ) : null}

                    {shareEmail !== null && isNotify ? <textarea placeholder="Message" /> : null}
                </div>
                {shareEmail === null ? (
                    <div className="share-modal-access">
                        <h6>People with access</h6>
                        <div className="share-modal-access-list">
                            <img src={circleImg} alt="" />
                            <p>
                                <b>Sourav Mallick</b>
                                <br />
                                <small>souravcmt@gmail.com </small>
                            </p>
                            <span>Owner</span>
                        </div>
                    </div>
                ) : null}
                <div className="share-modal-access">
                    <h6>General access</h6>
                    <div className="share-modal-access-list">
                        <img src={circleImg} alt="" />
                        <p>
                            <b>
                                <select>
                                    <option value="restricted">Restricted</option>
                                    <option value="anyone">Anyone use link</option>
                                </select>
                            </b>
                            <br />
                            <small>Anyone on the internet with the link can view</small>
                        </p>
                        <span>
                            <select>
                                <option value="viewer">Viewer</option>
                                <option value="editor">Editor</option>
                                <option value="manager">Manager</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShareShow(false)}>
                        Cancel
                    </button>
                    {shareEmail !== null ? (
                        <button type="button" onClick={handleTrash}>
                            Send
                        </button>
                    ) : (
                        <button type="button" onClick={handleTrash}>
                            Done
                        </button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ShareModal;
