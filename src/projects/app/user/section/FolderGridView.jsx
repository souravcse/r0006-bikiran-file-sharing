/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import folderImg from '../../../../assets/images/folder-icon.svg';

function FolderGridView({ files, selectId, setSelectId }) {
    const navigate = useNavigate();
    const handleListFolder = (e) => {
        navigate(`/user/drive/folder/${e}/`);
    };
    console.log(selectId);
    return (
        <>
            {files?.folder?.length > 0 ? <div className="my-drive-sub-title">Folder</div> : null}
            {files?.folder?.map((folAr) => (
                <div
                    onClick={() => setSelectId(folAr?.sl)}
                    onDoubleClick={() => handleListFolder(folAr?.sl)}
                    className={`my-drive-list ${
                        selectId === folAr?.sl ? 'my-drive-list-selected' : ''
                    }`}
                    key={folAr?.sl}
                >
                    <img src={folderImg} alt="Floder Img" />
                    <span>{folAr?.title}</span>
                </div>
            ))}
        </>
    );
}

export default FolderGridView;
