import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './app/system/pages/IndexPage';
import UserAuthHandler from './app/user/models/UserAuthHandler';
import UserProfilePage from './app/user/pages/UserProfilePage';
import UsersDrivePage from './app/user/pages/UsersDrivePage';

export default function RouteHandler() {
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
