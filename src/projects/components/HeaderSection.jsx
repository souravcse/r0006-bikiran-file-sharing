import React, { useState } from 'react';

import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import OptionBox from '../utils/OptionBox';
import SearchInputExitBtn from './SearchInputExitBtn';
import SearchInputSection from './SearchInputSection';
import UserInfo from './UserInfo';

function WebLogo() {
    return (
        <div className="cell cell-profile">
            <Link to="/">
                <img src={Logo} alt="Bikiran Banner web" />
            </Link>
        </div>
    );
}
function SearchBarArea({ handleSearchIcon }) {
    const navigate = useNavigate();
    const exitBtn = (
        <SearchInputExitBtn
            clickHandler={() => {
                navigate('/');
            }}
        />
    );

    return (
        <div className=" cell-7 cell-md-10 cell-sm-9">
            <div className="header-search-s">
                <SearchInputSection handleSearchIcon={handleSearchIcon} exitBtn={exitBtn} />
            </div>
        </div>
    );
}

function HeaderSection() {
    const [showUBox, setShowUBox] = useState(false);

    return (
        <div className="header header-section">
            <div className="container">
                <div className="line line-g3 line-no-wrap line-align-item-center">
                    <WebLogo />
                    <SearchBarArea />
                    <div className="cell cell-fill">
                        <div className="header-user ">
                            <FontAwesomeIcon size="lg" icon={faBell} />

                            <FontAwesomeIcon
                                size="lg"
                                onClick={() => {
                                    setShowUBox(true);
                                }}
                                icon={faUser}
                            />
                            {/* <SearchOption2 /> */}

                            {showUBox ? (
                                <OptionBox show={showUBox} setShowUBox={setShowUBox} customClass="">
                                    <UserInfo userInformation="" />
                                </OptionBox>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderSection;
