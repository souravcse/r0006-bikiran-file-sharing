import React from 'react';
import DetailIcon from '../../assets/images/DetailIcon.svg';
import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';

function MyDriveTitle() {
    return (
        <div className="my-drive-title">
            <h4>My Drive</h4>
            <div className="my-drive-title-option">
                <button type="button">
                    <img src={GridIcon} alt="" />
                </button>
                <button type="button">
                    <img src={ListIcon} alt="" />
                </button>
                <button type="button">
                    <img src={DetailIcon} alt="" />
                </button>
            </div>
        </div>
    );
}

export default MyDriveTitle;
