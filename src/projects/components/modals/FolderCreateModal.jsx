import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';

function FolderCreateModal({ show, setFCreateShow }) {
    const [folderName, setFolderName] = useState('Untitled folder');
    const handleFolder = (e) => {
        setFolderName(e.target.value);
    };
    return (
        <Modal size="sm" show={show} onHide={() => setFCreateShow(false)} centered>
            <Modal.Body>
                <h5>New Folder</h5>
                <div className="folder-create-input">
                    <input type="text" value={folderName} onChange={handleFolder} />
                </div>
                <div className="folder-create-button">
                    <button type="button" onClick={() => setFCreateShow(false)}>
                        Cancel
                    </button>
                    <button type="button">Create</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default FolderCreateModal;
