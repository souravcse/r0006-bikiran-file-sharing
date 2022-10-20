import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import folderImg from '../../../../assets/images/folder-icon.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import MyDriveTitle from '../../../components/MyDriveTitle';
import AxiosAuth from '../../../utils/AxiosAuth';

function UsersDrivePage() {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_FILE}`).then((response) => {
            setFiles(response.data.fileList_ar);
        });
    }, []);
    return (
        <>
            <MyDriveTitle />
            <div className="my-drive">
                <div className="my-drive-sub-title">Folder</div>
                {files?.folder?.map((folAr) => (
                    <Link
                        to={`/user/drive/folder/${folAr?.sl}/`}
                        className="my-drive-list"
                        key={folAr?.sl}
                    >
                        <img src={folderImg} alt="Floder Img" />
                        <span>{folAr?.title}</span>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default UsersDrivePage;
