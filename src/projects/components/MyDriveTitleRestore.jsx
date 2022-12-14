import React, { useState } from 'react';

import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';
import RestoreIcon from '../../assets/images/Restore.svg';
import DeleteIcon from '../../assets/images/trash.svg';
import DriveBreadcrumb from './DriveBreadcrumb';
import EmptyTrashModal from './modals/EmptyTrashModal';
import RestoreModal from './modals/RestoreModal';

function MyDriveTitleRestore({
    disStyle,
    setDisStyle,
    selectId,
    setReloadId,
    setSelectId,
    isFile,
}) {
    const [showRestore, setShowRestore] = useState(false);
    const [showEmTrash, setEmTrashShow] = useState(false);

    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };

    return (
        <>
            <div className="my-drive-title">
                <DriveBreadcrumb title="Trash Drive" />
                <div className="my-drive-title-option">
                    {selectId ? (
                        <div className="my-drive-select-option">
                            <button type="button" onClick={() => setShowRestore(true)}>
                                <img src={RestoreIcon} alt="Restore Icon" />
                            </button>
                            <button type="button" onClick={() => setEmTrashShow(true)}>
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
                    {isFile > 0 ? (
                        <button
                            type="button"
                            className="empty-trash"
                            onClick={() => setEmTrashShow(true)}
                        >
                            Empty Trash
                        </button>
                    ) : null}
                </div>
            </div>

            {showRestore ? (
                <RestoreModal
                    showRestore={showRestore}
                    setShowRestore={setShowRestore}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}

            {showEmTrash ? (
                <EmptyTrashModal
                    showEmTrash={showEmTrash}
                    setEmTrashShow={setEmTrashShow}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}
        </>
    );
}

export default MyDriveTitleRestore;
