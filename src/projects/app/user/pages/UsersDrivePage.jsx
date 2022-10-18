import React from 'react';
import folderImg from '../../../../assets/images/folder-icon.svg';
import MyDriveTitle from '../../../components/MyDriveTitle';
import InitInfo from '../../../utils/InitInfo';

function UsersDrivePage() {
    const { logInId } = InitInfo();
    console.log(logInId);
    return (
        <>
            <MyDriveTitle />
            <div className="my-drive">
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
        </>
    );
}

export default UsersDrivePage;
