import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function LogoutPage() {
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
        history.push('/login/');
    });

    return <div />;
}

export default LogoutPage;
