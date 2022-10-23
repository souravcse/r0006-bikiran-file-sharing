import React, { useState } from 'react';

import DetailIcon from '../../assets/images/DetailIcon.svg';
import DotbarIcon from '../../assets/images/dotBar.svg';
import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';
import DeleteIcon from '../../assets/images/trash.svg';
import AdduserIcon from '../../assets/images/user.svg';
import MoveToTrashModal from './modals/MoveToTrashModal';
import ShareModal from './modals/ShareModal';

function MyDriveTitle({ disStyle, setDisStyle, selectId, setReloadId, setSelectId }) {
    const [showTrash, setTrashShow] = useState(false);
    const [showShare, setShareShow] = useState(false);

    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };
    console.log(showShare);
    return (
        <>
            <div className="my-drive-title">
                <h4>My Drive</h4>

                <div className="my-drive-title-option">
                    {selectId ? (
                        <div className="my-drive-select-option">
                            <button type="button" onClick={() => setShareShow(true)}>
                                <img src={AdduserIcon} alt="Grid Icon" />
                            </button>
                            <button type="button" onClick={() => setTrashShow(true)}>
                                <img style={{ height: 18 }} src={DeleteIcon} alt="Delete Icon" />
                            </button>
                            <button type="button">
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

                    <button type="button">
                        <img src={DetailIcon} alt="" />
                    </button>
                </div>
            </div>
            <MoveToTrashModal
                showTrash={showTrash}
                setTrashShow={setTrashShow}
                setReloadId={setReloadId}
                selectId={selectId}
                setSelectId={setSelectId}
            />
            <ShareModal
                showShare={showShare}
                setShareShow={setShareShow}
                setReloadId={setReloadId}
                selectId={selectId}
                setSelectId={setSelectId}
            />
        </>
    );
}

export default MyDriveTitle;
