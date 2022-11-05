import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfigApi from '../../../../configs/ConfigApi';
import AxiosAuth from '../../../utils/AxiosAuth';

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        AxiosAuth.post(`${ConfigApi.LOGOUT}`).then((response) => {
            if (response.data.error === 0) {
                localStorage.clear();
                navigate('/');
            }
        });
    });

    return <div />;
}

export default LogoutPage;
