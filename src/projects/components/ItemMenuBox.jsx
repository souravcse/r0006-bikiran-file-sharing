/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import IconOpen from '../../assets/images/FolderOpen.svg';
import IconRename from '../../assets/images/Rename.svg';
import IconArrow from '../../assets/images/RightArrow.svg';

import IconDownload from '../../assets/images/Download.svg';
import IconMove from '../../assets/images/FileMove.svg';
import IconShare from '../../assets/images/user.svg';

function ItemMenuBox({
    selectId,
    showMenu,
    setShowMenu,
    setShowRename,
    setShowMove,
    setShareShow,
}) {
    return (
        <>
            <div
                tabIndex={0}
                role="button"
                className={['top-box-foreground', showMenu ? 'show' : ''].join(' ')}
                onClick={() => {
                    setShowMenu(false);
                }}
            />
            <div className={['drive-menu-box top-box', showMenu ? 'show' : ''].join(' ')}>
                <ul>
                    <li>
                        <Link to={`/user/drive/folder/${selectId}/`}>
                            <img src={IconOpen} alt="Open" /> <span>Open </span>
                            <img
                                src={IconArrow}
                                alt=""
                                style={{ float: 'right', width: 10, marginTop: 4 }}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setShowRename(true)}>
                            <img src={IconRename} alt="Rename" /> <span>Rename</span>
                        </Link>
                    </li>

                    <li>
                        <Link onClick={() => setShowMove(true)}>
                            <img src={IconMove} alt="Move to" /> <span>Move to</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setShareShow(true)}>
                            <img src={IconShare} alt="Share With" /> <span>Share With</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/logout/">
                            <img src={IconDownload} alt="Download" /> <span>Download</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ItemMenuBox;
