/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconColor from '../../assets/images/color-palette.svg';
import IconDownload from '../../assets/images/Download.svg';
import IconMove from '../../assets/images/FileMove.svg';
import IconOpen from '../../assets/images/FolderOpen.svg';
import IconHide from '../../assets/images/hide-icon.svg';
import IconLock from '../../assets/images/lock-icon.svg';
import IconRename from '../../assets/images/Rename.svg';
import IconArrow from '../../assets/images/RightArrow.svg';
import IconShare from '../../assets/images/user.svg';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';

const colorList = [
    {
        id: '1',
        color: '#7A7A7A',
    },
    {
        id: '2',
        color: '#F50303',
    },
    {
        id: '3',
        color: '#FFF600',
    },
    {
        id: '4',
        color: '#FFF600',
    },
    {
        id: '5',
        color: '#AE00B9',
    },
    {
        id: '6',
        color: '#F50303',
    },
];

function ItemMenuBox({
    fileAr,
    selectId,
    showMenu,
    setShowMenu,
    setShowRename,
    setShowMove,
    setShareShow,
    setReloadId,
    setShowHide,
    setShowLock,
}) {
    const [folderColor, setFolderColor] = useState(null);

    const handleFolderColor = (e) => {
        setFolderColor(e);
        AxiosAuth.post(`${ConfigApi.COLOR_CHANGE.replace(':folderSl', selectId)}`, {
            folder_color: e,
        }).then((response) => {
            if (response?.data?.error === 0) {
                setShowMenu(false);
                setReloadId(Math.random);
            }
        });
    };
    useEffect(() => {
        if (fileAr) {
            setFolderColor(fileAr?.folder_color);
        }
    }, [fileAr]);

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
                    {fileAr?.type === 'folder' ? (
                        <>
                            <li className="color-change">
                                <Link>
                                    <img src={IconColor} alt="Color Chnage" />{' '}
                                    <span>Change Color</span>
                                </Link>
                                <div className="color-change-box">
                                    {colorList.map((colo) => (
                                        <button
                                            type="button"
                                            style={{
                                                background: colo?.color,
                                                border:
                                                    folderColor === colo?.color
                                                        ? '3px solid'
                                                        : 'unset',
                                            }}
                                            key={colo?.id}
                                            onClick={() => handleFolderColor(colo?.color)}
                                        />
                                    ))}
                                </div>
                            </li>

                            <li>
                                <Link onClick={() => setShowLock(true)}>
                                    <img src={IconLock} alt="Share With" /> <span>Lock Folder</span>
                                </Link>
                            </li>
                        </>
                    ) : null}
                    <li>
                        <Link onClick={() => setShowHide(true)}>
                            <img src={IconHide} alt="Share With" />
                            <span>Hide Folder</span>
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
