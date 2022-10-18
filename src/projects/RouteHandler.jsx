import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './app/system/pages/LoginPage';
import UserAuthHandler from './app/user/models/UserAuthHandler';
import UserProfilePage from './app/user/pages/UserProfilePage';
import UsersDrivePage from './app/user/pages/UsersDrivePage';
import AppInitDispatch from './dispatches/AppInitDispatch';
import InitInfo from './utils/InitInfo';

export default function RouteHandler() {
    const dispatch = useDispatch();
    const { initData } = InitInfo();
    const [show, setShow] = useState(!!initData?.initId);

    useEffect(() => {
        AppInitDispatch(dispatch)
            .then((initStatus) => {
                setShow(initStatus);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch]);
    console.log('show');
    if (!show) {
        return null;
    }
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/user/*" element={<UserAuthHandler />}>
                        <Route path="drive/" element={<UsersDrivePage />} />
                        <Route path="profile/" element={<UserProfilePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
