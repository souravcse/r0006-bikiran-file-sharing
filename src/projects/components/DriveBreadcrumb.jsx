import React, { useEffect, useState } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import RigntArrow from '../../assets/images/RightArrow.svg';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';

function DriveBreadcrumb({ title }) {
    const params = useParams();
    const parentSl = params?.folderSl?.slice(params?.folderSl?.length - 8);
    const [breadcrumbAr, setBreadcrumbAr] = useState({});
    const location = useLocation();
    const q = new URLSearchParams(location.search).get('enCode');

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
            <Link to="/user/drive/"> {title}</Link>
            {Object.values(breadcrumbAr)?.map((brCrumb) => (
                <Link to={`/user/drive/folder/${brCrumb?.sl}/?enCode=${q}`} key={brCrumb?.sl}>
                    <img src={RigntArrow} alt="" /> {brCrumb?.title}
                </Link>
            ))}
        </div>
    );
}

export default DriveBreadcrumb;
