/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';

function MoveModal({ showMove, setShowMove }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_FILE}`).then((response) => {
            setFiles(response.data.fileList_ar);
        });
    });
    return (
        <Modal size="sm" show={showMove} onHide={() => setShowMove(false)} centered>
            <Modal.Body>
                <h5>My Drive</h5>
                <>
                    {files?.folder?.map((row) => (
                        <h6>{row?.title}</h6>
                    ))}
                </>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowMove(false)}>
                        Cancel
                    </button>
                    <button type="button">Move</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default MoveModal;
