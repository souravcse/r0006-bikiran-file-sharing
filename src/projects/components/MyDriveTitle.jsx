import React, { useState } from 'react';

import DotbarIcon from '../../assets/images/dotBar.svg';
import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';
import DeleteIcon from '../../assets/images/trash.svg';
import AdduserIcon from '../../assets/images/user.svg';
import DriveBreadcrumb from './DriveBreadcrumb';
import ItemMenuBox from './ItemMenuBox';
import MoveModal from './modals/MoveModal';
import MoveToTrashModal from './modals/MoveToTrashModal';
import RenameModal from './modals/RenameModal';
import ShareModal from './modals/ShareModal';

function MyDriveTitle({ disStyle, setDisStyle, selectId, setReloadId, setSelectId }) {
    const [showTrash, setTrashShow] = useState(false);
    const [showShare, setShareShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [showMove, setShowMove] = useState(false);

    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };

    return (
        <>
            <div className="my-drive-title">
                <h4>My Drive</h4>
                <DriveBreadcrumb />
                <div className="my-drive-title-option">
                    {selectId ? (
                        <div className="my-drive-select-option">
                            <button type="button" onClick={() => setShareShow(true)}>
                                <img src={AdduserIcon} alt="Grid Icon" />
                            </button>
                            <button type="button" onClick={() => setTrashShow(true)}>
                                <img style={{ height: 18 }} src={DeleteIcon} alt="Delete Icon" />
                            </button>
                            <button type="button" onClick={() => setShowMenu(true)}>
                                <img src={DotbarIcon} alt="Dot Bar Icon" />
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

                    {/* <button type="button">
                        <img src={DetailIcon} alt="" />
                    </button> */}
                </div>
                {showMenu ? (
                    <ItemMenuBox
                        selectId={selectId}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        setShowRename={setShowRename}
                        setShowMove={setShowMove}
                    />
                ) : null}
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

            {showShare ? (
                <ShareModal
                    showShare={showShare}
                    setShareShow={setShareShow}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}

            {showRename ? (
                <RenameModal
                    showRename={showRename}
                    setShowRename={setShowRename}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setShowMenu={setShowMenu}
                />
            ) : null}

            {showMove ? (
                <MoveModal
                    showMove={showMove}
                    setShowMove={setShowMove}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setShowMenu={setShowMenu}
                    setSelectId={setSelectId}
                />
            ) : null}
        </>
    );
}

export default MyDriveTitle;
