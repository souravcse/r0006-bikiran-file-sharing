/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import CrossIcon from '../../assets/images/cross-white.svg';
import CompIcon from '../../assets/images/icon-tic.svg';

function UploadingBox({ uploadBox, setUploadBox, uploadComplete, uploadTitle }) {
    if (!uploadBox) {
        return null;
    }
    return (
        <>
            <div className="upload-box-modal">
                <ul>
                    <li
                        style={{
                            background: '#AE00B9',
                            paddingTop: 10,
                            paddingBottom: 10,
                            color: 'white',
                            display: 'flex',
                        }}
                    >
                        <span style={{ width: 'calc(100% - 14px)' }}>
                            {uploadComplete.length > 0
                                ? `${uploadComplete?.length} file upload complete`
                                : `${uploadTitle?.length} file uploading`}
                        </span>
                        <img onClick={() => setUploadBox(false)} src={CrossIcon} alt="Cross" />
                    </li>
                    {uploadTitle?.map((rr) => (
                        <li
                            style={{
                                paddingTop: 10,
                                color: 'black',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            key={rr}
                        >
                            <span style={{ width: 'calc(100% - 30px)' }}>{rr}</span>
                            {uploadComplete.filter((obj) => obj === rr)[0] ? (
                                <img style={{ width: 20 }} src={CompIcon} alt="Complete" />
                            ) : (
                                <div className="lds-ring">
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default UploadingBox;
