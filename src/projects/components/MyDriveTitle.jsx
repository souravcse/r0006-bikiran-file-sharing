import React from 'react';
import DetailIcon from '../../assets/images/DetailIcon.svg';
import DotbarIcon from '../../assets/images/dotBar.svg';
import GridIcon from '../../assets/images/GridIcon.svg';
import ListIcon from '../../assets/images/ListIcon.svg';
import DeleteIcon from '../../assets/images/trash.svg';
import AdduserIcon from '../../assets/images/user.svg';

function MyDriveTitle({ disStyle, setDisStyle, selectId }) {
    const handleStyle = (e) => {
        setDisStyle(e);
        localStorage.setItem('d-style', e);
    };

    return (
        <div className="my-drive-title">
            <h4>My Drive</h4>

            <div className="my-drive-title-option">
                {selectId ? (
                    <div className="my-drive-select-option">
                        <button type="button">
                            <img src={AdduserIcon} alt="Grid Icon" />
                        </button>
                        <button type="button">
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
    );
}

export default MyDriveTitle;
