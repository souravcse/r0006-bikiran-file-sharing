/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import CrossIcon from '../../../../assets/images/cross-white.svg';
import CompIcon from '../../../../assets/images/icon-tic.svg';
import FixedHeaderControl from '../../../components/FixedHeaderControl';
import HeaderSection from '../../../components/HeaderSection';
import SidebarMenuSection from '../../../components/SidebarMenuSection';

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
function UserAuthHandler({ setReloadId }) {
    const [uploadBox, setUploadBox] = useState(false);
    const [uploadComplete, setUploadComplete] = useState([]);
    const [uploadTitle, setUploadTitle] = useState([]);
    return (
        <div className={['h-100 user-h-area', 'browser browser-4xl'].join(' ')}>
            <FixedHeaderControl>
                <HeaderSection />
            </FixedHeaderControl>
            <div className="body-section">
                <div className="container h-100">
                    <div className="line line-no-wrap h-100">
                        <div className="cell cell-profile h-100 sidebar-menu-area">
                            <SidebarMenuSection
                                setUploadBox={setUploadBox}
                                setUploadComplete={setUploadComplete}
                                setUploadTitle={setUploadTitle}
                                setReloadId={setReloadId}
                            />
                        </div>
                        <div className="cell cell-content h-100">
                            <div className="content-section">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UploadingBox
                uploadBox={uploadBox}
                setUploadBox={setUploadBox}
                uploadComplete={uploadComplete}
                uploadTitle={uploadTitle}
            />
        </div>
    );
}

export default UserAuthHandler;
