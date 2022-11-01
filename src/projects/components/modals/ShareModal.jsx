import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import circleImg from '../../../assets/images/circleUser.svg';

import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function ShareModal({ fileAr, showShare, setShareShow, selectId, setSelectId }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [shareEmail, setShareEmail] = useState(null);
    const [shareMsg, setShareMsg] = useState(null);
    const [isNotify, setIsNotify] = useState(1);
    const [gStatus, setGStatus] = useState();
    const [shareSt, setShareSt] = useState('editor');
    const [accessType, setAccessType] = useState();
    const [sendError, setSendError] = useState();

    const handleShareEmail = (e) => {
        setShareEmail(e.target.value);
    };
    const handleNotify = () => {
        setIsNotify(!isNotify);
    };
    const handleMessage = (e) => {
        setShareMsg(e.target.value);
    };
    const handleGStatus = (e) => {
        setShareSt(e.target.value);
    };
    const handleDone = () => {
        setShareShow(false);
        setSelectId(null);
    };
    const handleFileGlobalView = (e) => {
        setGStatus(e.target.value);
        AxiosAuth.post(`${ConfigApi.FILE_GLOBAL_ST.replace(':fileSl', selectId)}`, {
            gStatus: e.target.value,
        }).then((response) => {
            NotificationPopup(response, dispatch);
        });
    };
    const handleFileAccessType = (e) => {
        setAccessType(e.target.value);
        AxiosAuth.post(`${ConfigApi.FILE_ACCESS_TYPE.replace(':fileSl', selectId)}`, {
            accessType: e.target.value,
        }).then((response) => {
            NotificationPopup(response, dispatch);
        });
    };

    const handleShareSend = () => {
        AxiosAuth.post(`${ConfigApi.FILE_SHARE_SEND.replace(':fileSl', selectId)}`, {
            shareEmail,
            isNotify,
            shareMsg,
            shareSt,
        }).then((response) => {
            if (response?.data?.error === 3) {
                setSendError(response?.data?.error);
                NotificationPopup(response, dispatch);
            }
            if (response?.data?.error === 0) {
                setShareShow(false);
                NotificationPopup(response, dispatch);
            }
        });
    };
    const handleShareSendNonAcc = () => {
        AxiosAuth.post(`${ConfigApi.FILE_SHARE_SEND_NON_ACC.replace(':fileSl', selectId)}`, {
            shareEmail,
            shareSt,
        }).then((response) => {
            if (response?.data?.error === 0) {
                setSendError(response?.data?.error);
                setShareShow(false);
                NotificationPopup(response, dispatch);
            }
        });
    };
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_DETAIL.replace(':fileSl', selectId)}`).then((response) => {
            setFile(response.data);
            setGStatus(response.data?.global_perm);
            setAccessType(response.data?.is_restricted);
        });
    }, [fileAr, selectId]);
    console.log(fileAr?.shareListAr?.length);
    return (
        <Modal size="md" show={showShare} onHide={() => setShareShow(false)} centered>
            <Modal.Body>
                <h5>{file?.title} </h5>
                <div className="share-modal-input">
                    <input
                        type="email"
                        value={shareEmail}
                        placeholder="Add Email"
                        onBlur={handleShareEmail}
                        style={{ width: shareEmail !== null ? '80%' : '100%' }}
                    />
                    {shareEmail !== null ? (
                        <>
                            <select value={shareSt} onChange={handleGStatus}>
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

                    {shareEmail !== null && isNotify ? (
                        <textarea placeholder="Message" value={shareMsg} onChange={handleMessage} />
                    ) : null}

                    {sendError === 3 ? (
                        <div className="share-modal-no-acc">
                            <h6>Share to non-account?</h6>
                            <p>
                                You are sending an invitation to {shareEmail}. Anyone holding this
                                invitation will have access.
                            </p>
                            <div className="share-modal-no-acc-btn">
                                <button type="button" onClick={() => setSendError(false)}>
                                    Cancel
                                </button>
                                <button type="button" onClick={handleShareSendNonAcc}>
                                    Share anyway
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
                {shareEmail === null ? (
                    <>
                        <div className="share-modal-access">
                            <h6>People with access</h6>
                            {file?.shareListAr?.map((sList) => (
                                <div className="share-modal-access-list" key={sList?.shareSl}>
                                    <img src={circleImg} alt="" />
                                    <p>
                                        <b>{sList?.userName}</b>
                                        <br />
                                        <small>{sList?.userEmail}</small>
                                    </p>
                                    <span>{sList?.status}</span>
                                </div>
                            ))}
                        </div>
                        <div className="share-modal-access">
                            <h6>General access</h6>
                            <div className="share-modal-access-list">
                                <img src={circleImg} alt="" />
                                <p>
                                    <b>
                                        <select value={accessType} onChange={handleFileAccessType}>
                                            <option value="1">Restricted</option>
                                            <option value="0">Anyone use link</option>
                                        </select>
                                    </b>
                                    <br />
                                    <small>Anyone on the internet with the link can view</small>
                                </p>
                                {accessType?.toString() === '0' ? (
                                    <span>
                                        <select value={gStatus} onChange={handleFileGlobalView}>
                                            <option value="viewer">Viewer</option>
                                            <option value="editor">Editor</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </>
                ) : null}

                <div className="folder-create-button">
                    <button type="button" onClick={() => setShareShow(false)}>
                        Cancel
                    </button>
                    {shareEmail !== null ? (
                        <button type="button" onClick={handleShareSend}>
                            Send
                        </button>
                    ) : (
                        <button type="button" onClick={handleDone}>
                            Done
                        </button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ShareModal;
