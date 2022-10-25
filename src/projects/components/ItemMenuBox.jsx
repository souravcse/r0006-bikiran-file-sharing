/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

function ItemMenuBox({ selectId, showMenu, setShowMenu, setShowRename, setShowMove }) {
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
                            <span>Open </span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setShowRename(true)}>
                            <span>Rename</span>
                        </Link>
                    </li>

                    <li>
                        <Link onClick={() => setShowMove(true)}>
                            <span>Move to</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/logout/">
                            <span>Download</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ItemMenuBox;
