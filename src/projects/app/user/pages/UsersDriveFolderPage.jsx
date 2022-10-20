import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import folderImg from '../../../../assets/images/folder-icon.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import MyDriveTitle from '../../../components/MyDriveTitle';
import AxiosAuth from '../../../utils/AxiosAuth';

function UsersDriveFolderPage() {
    const [files, setFiles] = useState([]);
    const params = useParams();
    const parentSl = params?.folderSl ? params?.folderSl : 0;

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_FILE_DETAIL?.replace(':folderSl', parentSl)}`).then(
            (response) => {
                setFiles(response.data.fileList_ar);
            }
        );
    }, [parentSl]);
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

export default UsersDriveFolderPage;
