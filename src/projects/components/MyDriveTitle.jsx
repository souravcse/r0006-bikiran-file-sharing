import React from 'react';
import DetailIcon from '../../assets/images/DetailIcon.svg';
import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';

function MyDriveTitle({ disStyle, setDisStyle }) {
    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };

    return (
        <div className="my-drive-title">
            <h4>My Drive</h4>
            <div className="my-drive-title-option">
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
    );
}

export default MyDriveTitle;
