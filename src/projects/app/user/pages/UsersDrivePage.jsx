import React from 'react';
import folderImg from '../../../../assets/images/folder-icon.svg';
import MyDriveTitle from '../../../components/MyDriveTitle';

function UsersDrivePage() {
    return (
        <div className="my-drive">
            <MyDriveTitle />
            <div className="my-drive-sub-title">Folder</div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
            <div className="my-drive-list">
                <img src={folderImg} alt="Floder Img" />
                <span>Personal</span>
            </div>
        </div>
    );
}

export default UsersDrivePage;
