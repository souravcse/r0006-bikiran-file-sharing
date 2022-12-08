import React, { useEffect } from 'react';
import ConfigApi from '../../../../configs/ConfigApi';
import AxiosAuth from '../../../utils/AxiosAuth';

export default function ErrorPage() {
    useEffect(() => {
        AxiosAuth.get(ConfigApi.TEST.replace(':sl', 10000001))
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
        AxiosAuth.get(ConfigApi.TEST.replace(':sl', 10000010))
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return <div>Error Page</div>;
}
