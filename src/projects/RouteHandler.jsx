import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './app/system/pages/LoginPage';
import RegisterPage from './app/system/pages/RegisterPage';
import UserAuthHandler from './app/user/models/UserAuthHandler';
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
                    <Route path="/register" element={<RegisterPage />} />
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
