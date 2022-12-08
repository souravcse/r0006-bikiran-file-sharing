import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './app/system/pages/ErrorPage';
import LoginPage from './app/system/pages/LoginPage';
import LogoutPage from './app/system/pages/LogoutPage';
import RegisterPage from './app/system/pages/RegisterPage';
import UserAuthHandler from './app/user/models/UserAuthHandler';
import UserDriveDevApiPrivatePage from './app/user/pages/UserDriveDevApiPrivatePage';
import UserDriveDevApiPublicPage from './app/user/pages/UserDriveDevApiPublicPage';
import UserDriveDeveloperPage from './app/user/pages/UserDriveDeveloperPage';
import UserDriveSharePage from './app/user/pages/UserDriveSharePage';
import UsersDriveFolderPage from './app/user/pages/UsersDriveFolderPage';
import UsersDriveHiddenPage from './app/user/pages/UsersDriveHiddenPage';
import UsersDrivePage from './app/user/pages/UsersDrivePage';
import UsersDriveTrashPage from './app/user/pages/UsersDriveTrashPage';
import NotificationPopUpCommon from './components/NotificationPopUpCommon';
import AppInitDispatch from './dispatches/AppInitDispatch';
import InitInfo from './utils/InitInfo';

export default function RouteHandler() {
    const dispatch = useDispatch();
    const { initData } = InitInfo();
    const [show, setShow] = useState(!!initData?.initId);
    const [reloadId, setReloadId] = useState(Math.random);
    const [selectId, setSelectId] = useState(null);
    const [disStyle, setDisStyle] = useState(
        localStorage.getItem('d-style') ? localStorage.getItem('d-style') : '1'
    );
    useEffect(() => {
        setDisStyle(localStorage.getItem('d-style') ? localStorage.getItem('d-style') : '1');
        AppInitDispatch(dispatch)
            .then((initStatus) => {
                setShow(initStatus);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch]);

    if (!show) {
        return null;
    }
    return (
        <>
            <BrowserRouter>
                <NotificationPopUpCommon />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/user/*" element={<UserAuthHandler setReloadId={setReloadId} />}>
                        <Route
                            path="drive/"
                            element={
                                <UsersDrivePage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/folder/:folderSl/"
                            element={
                                <UsersDriveFolderPage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/trash/"
                            element={
                                <UsersDriveTrashPage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/hide-list/"
                            element={
                                <UsersDriveHiddenPage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/share/"
                            element={
                                <UserDriveSharePage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/dev/"
                            element={
                                <UserDriveDeveloperPage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/dev/api-public/"
                            element={
                                <UserDriveDevApiPublicPage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                        <Route
                            path="drive/dev/api-private/"
                            element={
                                <UserDriveDevApiPrivatePage
                                    reloadId={reloadId}
                                    setReloadId={setReloadId}
                                    disStyle={disStyle}
                                    setDisStyle={setDisStyle}
                                    selectId={selectId}
                                    setSelectId={setSelectId}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
