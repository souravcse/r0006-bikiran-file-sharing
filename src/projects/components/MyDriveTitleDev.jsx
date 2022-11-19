import React from 'react';
import { Link } from 'react-router-dom';

import DriveBreadcrumb from './DriveBreadcrumb';

function MyDriveTitleDev({ title = 'Drive Develop' }) {
    return (
        <>
            <div className="my-drive-title">
                <DriveBreadcrumb title={title} />
                <div style={{ width: '25%' }}>
                    <div className="my-drive-select-option">
                        <Link to="/user/drive/dev/api-public/" style={{ width: 100 }}>
                            Public Api
                        </Link>
                        <Link to="/user/drive/dev/api-private/" style={{ width: 100 }}>
                            Private Api
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyDriveTitleDev;
