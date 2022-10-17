import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './app/system/pages/IndexPage';
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

    if (show) {
        return null;
    }
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/user/*" element={<UserAuthHandler />}>
                        <Route path="drive/" element={<UsersDrivePage />} />
                        <Route path="profile/" element={<UserProfilePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
