import React, { useState } from 'react';

import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';
import RestoreIcon from '../../assets/images/Restore.svg';
import DeleteIcon from '../../assets/images/trash.svg';
import DriveBreadcrumb from './DriveBreadcrumb';
import MoveToTrashModal from './modals/MoveToTrashModal';

function MyDriveTitleRestore({ disStyle, setDisStyle, selectId, setReloadId, setSelectId }) {
    const [showTrash, setTrashShow] = useState(false);

    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };

    return (
        <>
            <div className="my-drive-title">
                <DriveBreadcrumb />
                <div className="my-drive-title-option">
                    {selectId ? (
                        <div className="my-drive-select-option">
                            <button type="button">
                                <img src={RestoreIcon} alt="Restore Icon" />
                            </button>
                            <button type="button" onClick={() => setTrashShow(true)}>
                                <img style={{ height: 18 }} src={DeleteIcon} alt="Delete Icon" />
                            </button>
                        </div>
                    ) : null}
                    {disStyle === '2' ? (
                        <button type="button" onClick={() => handleStyle('1')}>
                            <img src={GridIcon} alt="Grid Icon" />
                        </button>
                    ) : (
                        <button type="button" onClick={() => handleStyle('2')}>
                            <img src={ListIcon} alt="List Icon" />
                        </button>
                    )}
                </div>
            </div>

            {showTrash ? (
                <MoveToTrashModal
                    showTrash={showTrash}
                    setTrashShow={setTrashShow}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}
        </>
    );
}

export default MyDriveTitleRestore;
