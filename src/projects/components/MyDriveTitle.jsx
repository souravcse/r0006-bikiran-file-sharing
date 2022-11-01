import React, { useEffect, useState } from 'react';

import DotbarIcon from '../../assets/images/dotBar.svg';
import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';
import DeleteIcon from '../../assets/images/trash.svg';
import AdduserIcon from '../../assets/images/user.svg';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';
import DriveBreadcrumb from './DriveBreadcrumb';
import ItemMenuBox from './ItemMenuBox';
import HideModal from './modals/HideModal';
import LockModal from './modals/LockModal';
import MoveModal from './modals/MoveModal';
import MoveToTrashModal from './modals/MoveToTrashModal';
import RenameModal from './modals/RenameModal';
import ShareModal from './modals/ShareModal';

function MyDriveTitle({ disStyle, setDisStyle, selectId, setReloadId, setSelectId }) {
    const [file, setFile] = useState(null);

    const [showTrash, setTrashShow] = useState(false);
    const [showShare, setShareShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [showMove, setShowMove] = useState(false);
    const [showHide, setShowHide] = useState(false);
    const [showLock, setShowLock] = useState(false);

    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_DETAIL.replace(':fileSl', selectId)}`).then((response) => {
            setFile(response.data);
        });
    }, [selectId]);
    return (
        <>
            <div className="my-drive-title">
                <DriveBreadcrumb />
                <div className="my-drive-title-option">
                    {selectId ? (
                        <div className="my-drive-select-option">
                            <button type="button" onClick={() => setShareShow(true)}>
                                <img src={AdduserIcon} alt="Share Icon" />
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
                        fileAr={file}
                        selectId={selectId}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        setShowRename={setShowRename}
                        setShowMove={setShowMove}
                        setShareShow={setShareShow}
                        setReloadId={setReloadId}
                        setShowHide={setShowHide}
                        setShowLock={setShowLock}
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
                    fileAr={file}
                    showShare={showShare}
                    setShareShow={setShareShow}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}

            {showRename ? (
                <RenameModal
                    fileAr={file}
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

            {showHide ? (
                <HideModal
                    showHide={showHide}
                    setShowHide={setShowHide}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setShowMenu={setShowMenu}
                    setSelectId={setSelectId}
                />
            ) : null}

            {showLock ? (
                <LockModal
                    showLock={showLock}
                    setShowLock={setShowLock}
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
