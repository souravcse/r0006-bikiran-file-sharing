/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FixedHeaderControl from '../../../components/FixedHeaderControl';
import HeaderSection from '../../../components/HeaderSection';
import SidebarMenuSection from '../../../components/SidebarMenuSection';
import UploadingBox from '../../../utils/UploadingBox';

function UserAuthHandler({ setReloadId }) {
    const [uploadBox, setUploadBox] = useState(false);
    const [uploadComplete, setUploadComplete] = useState([]);
    const [uploadTitle, setUploadTitle] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('Secure-Access')) {
            navigate('/');
        }
    });
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
                        <div className="cell cell-content h-100" style={{ position: 'relative' }}>
                            <Outlet />
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
