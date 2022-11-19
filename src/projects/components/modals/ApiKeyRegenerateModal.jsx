import React, { useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';
import StringGenerate from '../../utils/StringGenerate';

function ApiKeyRegenerateModal({ showReApi, setShowReApi, apiCode, setReloadId, type }) {
    const [apiKey, setApiKey] = useState('');
    const dispatch = useDispatch();

    const handleApiKey = () => {
        if (type === 'public') {
            AxiosAuth.post(`${ConfigApi.API_PUBLIC_KEY_UPDATE.replace(':apiSl', apiCode?.sl)}`, {
                apiKey,
            }).then((response) => {
                if (response.data.error === 0) {
                    setReloadId(Math.random);
                    setShowReApi(false);
                    NotificationPopup(response, dispatch);
                }
            });
        } else {
            AxiosAuth.post(`${ConfigApi.API_PRIVATE_KEY_UPDATE.replace(':apiSl', apiCode?.sl)}`, {
                apiKey,
            }).then((response) => {
                if (response.data.error === 0) {
                    setReloadId(Math.random);
                    setShowReApi(false);
                    NotificationPopup(response, dispatch);
                }
            });
        }
    };
    useEffect(() => {
        setApiKey(apiCode?.apiKey);
    }, [apiCode.apiKey]);
    return (
        <Modal size="md" show={showReApi} onHide={() => setShowReApi(false)} centered>
            <Modal.Body>
                <h5>API Key Regenerate</h5>
                <div className="folder-create-input" style={{ display: 'flex' }}>
                    <input type="text" placeholder="Accepted IP 4" name="api4" value={apiKey} />
                    <button
                        type="button"
                        style={{ marginLeft: '10px' }}
                        onClick={() => setApiKey(StringGenerate(32))}
                    >
                        Generate
                    </button>
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowReApi(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleApiKey}>
                        Update
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ApiKeyRegenerateModal;
