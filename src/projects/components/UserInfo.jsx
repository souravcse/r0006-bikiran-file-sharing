/* eslint-disable prettier/prettier */
import {
    faEyeSlash,
    faHome,
    faQuestionCircle,
    faSignOutAlt, faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function UserInfo({ userInformation }) {
    return (
        <div className="profile-sidebar">
            <div className="profile-userpic">
                <div className="profile-user-circle">
                    <FontAwesomeIcon size='xl' icon={faUserCircle} />
                </div>
            </div>
            <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                    {userInformation?.displayName ? userInformation?.displayName : 'Set Your Name'}
                </div>
                <div className="profile-usertitle-job">
                    {userInformation?.phoneNumber
                        ? userInformation?.phoneNumber
                        : userInformation?.email}
                </div>
            </div>

            <hr />
            <div className="profile-usermenu">
                <ul>
                    <li className="active">
                        <Link to="/user/profile/">
                            <FontAwesomeIcon icon={faHome} />
                            <span>My Account</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/user/support/">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                            <span>Support</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/drive/hide-list/">
                            <FontAwesomeIcon icon={faEyeSlash} />
                            <span>Hidden List</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout/">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserInfo;
