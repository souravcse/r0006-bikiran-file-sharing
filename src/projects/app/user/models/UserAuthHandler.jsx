import React from 'react';
import { Outlet } from 'react-router-dom';
import FixedHeaderControl from '../../../components/FixedHeaderControl';
import HeaderSection from '../../../components/HeaderSection';
import SidebarMenuSection from '../../../components/SidebarMenuSection';

function UserAuthHandler() {
    return (
        <div className={['h-100 user-h-area', 'browser browser-4xl'].join(' ')}>
            <FixedHeaderControl>
                <HeaderSection />
            </FixedHeaderControl>
            <div className="body-section">
                <div className="container h-100">
                    <div className="line line-no-wrap h-100">
                        <div className="cell cell-profile h-100 sidebar-menu-area">
                            <SidebarMenuSection currentUser="" />
                        </div>
                        <div className="cell cell-content h-100">
                            <div className="content-section">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAuthHandler;
