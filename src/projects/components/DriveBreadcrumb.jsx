import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';

function DriveBreadcrumb() {
    const params = useParams();
    const parentSl = params?.folderSl;

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_BREADCRUMB?.replace(':folderSl', parentSl)}`).then(
            (response) => {
                console.log(response);
            }
        );
    }, [parentSl]);

    return <div>{`>`}</div>;
}

export default DriveBreadcrumb;
