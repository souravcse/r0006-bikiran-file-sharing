import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import RigntArrow from '../../assets/images/RightArrow.svg';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';

function DriveBreadcrumb() {
    const params = useParams();
    const parentSl = params?.folderSl;
    const [breadcrumbAr, setBreadcrumbAr] = useState({});

    useEffect(() => {
        if (parentSl > 0) {
            AxiosAuth.get(`${ConfigApi.GET_BREADCRUMB?.replace(':folderSl', parentSl)}`).then(
                (response) => {
                    setBreadcrumbAr(response?.data);
                }
            );
        }
    }, [parentSl]);

    return (
        <div className="my-drive-title-breadcrumb">
            <Link to="/user/drive/"> My Drive</Link>
            {Object.values(breadcrumbAr)?.map((brCrumb) => (
                <Link to={`/user/drive/folder/${brCrumb?.sl}/`} key={brCrumb?.sl}>
                    <img src={RigntArrow} alt="" /> {brCrumb?.title}
                </Link>
            ))}
        </div>
    );
}

export default DriveBreadcrumb;
