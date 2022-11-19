import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';
import NotificationPopup from '../../utils/NotificationPopup';

function ApiCreateModal({ showApi, setShowApi, setReloadId, type }) {
    const dispatch = useDispatch();
    const [domain, setDomain] = useState('');

    const [api1, setApi1] = useState('');
    const [api2, setApi2] = useState('');
    const [api3, setApi3] = useState('');
    const [api4, setApi4] = useState('');

    const handleInput = (e) => {
        if (e.target.name === 'domain') {
            console.log('ok');
            setDomain(e.target.value);
        } else if (e.target.name === 'api1') {
            setApi1(e.target.value);
        } else if (e.target.name === 'api2') {
            setApi2(e.target.value);
        } else if (e.target.name === 'api3') {
            setApi3(e.target.value);
        } else if (e.target.name === 'api4') {
            setApi4(e.target.value);
        }
    };
    const handleApi = () => {
        if (type === 'public') {
            AxiosAuth.post(`${ConfigApi.API_PUBLIC_CREATE}`, {
                domain,
                api1,
                api2,
                api3,
                api4,
            }).then((response) => {
                if (response.data.error === 0) {
                    setReloadId(Math.random);
                    setShowApi(false);
                    NotificationPopup(response, dispatch);
                }
            });
        } else {
            AxiosAuth.post(`${ConfigApi.API_PRIVATE_CREATE}`, {
                domain,
                api1,
                api2,
                api3,
                api4,
            }).then((response) => {
                if (response.data.error === 0) {
                    setReloadId(Math.random);
                    setShowApi(false);
                    NotificationPopup(response, dispatch);
                }
            });
        }
    };

    return (
        <Modal size="md" show={showApi} onHide={() => setShowApi(false)} centered>
            <Modal.Body>
                <h5>Create New Api</h5>
                <div className="folder-create-input">
                    <input
                        type="text"
                        placeholder="Domain"
                        name="domain"
                        onChange={handleInput}
                        value={domain}
                    />
                </div>
                <div className="folder-create-input">
                    <input
                        type="text"
                        placeholder="Accepted IP 1"
                        name="api1"
                        onChange={handleInput}
                        value={api1}
                    />
                </div>
                <div className="folder-create-input">
                    <input
                        type="text"
                        placeholder="Accepted IP 2"
                        name="api2"
                        onChange={handleInput}
                        value={api2}
                    />
                </div>
                <div className="folder-create-input">
                    <input
                        type="text"
                        placeholder="Accepted IP 3"
                        name="api3"
                        onChange={handleInput}
                        value={api3}
                    />
                </div>
                <div className="folder-create-input">
                    <input
                        type="text"
                        placeholder="Accepted IP 4"
                        name="api4"
                        onChange={handleInput}
                        value={api4}
                    />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowApi(false)}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleApi}>
                        Save
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ApiCreateModal;
