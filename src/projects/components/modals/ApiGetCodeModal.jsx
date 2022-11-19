import React from 'react';

import { Modal } from 'react-bootstrap';

function ApiGetCodeModal({ showGetApi, setShowGetApi, apiCode }) {
    return (
        <Modal size="md" show={showGetApi} onHide={() => setShowGetApi(false)} centered>
            <Modal.Body>
                <h5>API Code</h5>
                {apiCode?.code}
                <div className="folder-create-button">
                    <button type="button" onClick={() => setShowGetApi(false)}>
                        Cancel
                    </button>
                    <button type="button">Copy</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ApiGetCodeModal;
