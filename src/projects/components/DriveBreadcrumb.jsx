import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';

function DriveBreadcrumb() {
    const params = useParams();
    const parentSl = params?.folderSl;
    const [breadcrumbAr, setBreadcrumbAr] = useState({});

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_BREADCRUMB?.replace(':folderSl', parentSl)}`).then(
            (response) => {
                setBreadcrumbAr(response?.data);
            }
        );
    }, [parentSl]);

    return (
        <div>
            {Object.values(breadcrumbAr)?.map((brCrumb) => (
                <b>
                    {`>`} {brCrumb?.title}
                </b>
            ))}
        </div>
    );
}

export default DriveBreadcrumb;
