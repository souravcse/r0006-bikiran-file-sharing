import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DragIcon from '../../../../assets/images/DragIcon.svg';
import folderImg from '../../../../assets/images/folder-icon.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import FilesIcons from '../../../../configs/FilesIcons';
import MyDriveTitle from '../../../components/MyDriveTitle';
import AxiosAuth from '../../../utils/AxiosAuth';
import FilePreview from '../../../utils/FilePreview';

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
            {files.length > 0 ? (
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
                    <div className="my-drive-sub-title">Files</div>
                    {files?.file?.map((fileAr) => (
                        <div className="my-drive-list-file" key={fileAr?.sl}>
                            <div className="my-drive-list-file-view">
                                <FilePreview
                                    type={fileAr?.file_type}
                                    url={`https://file.sourav.xyz${fileAr?.file_url}`}
                                />
                            </div>
                            <div className="my-drive-list-file-info">
                                <FilesIcons type={fileAr?.file_type} />
                                <span>{fileAr?.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="my-drive">
                    <div className="my-drive-empty">
                        <img src={DragIcon} alt="Drag Icon" />
                        <h6>Drop Files here</h6>
                        <small>or use Add New button</small>
                    </div>
                </div>
            )}
        </>
    );
}

export default UsersDrivePage;
