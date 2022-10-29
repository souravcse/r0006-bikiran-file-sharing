/* eslint-disable jsx-a11y/no-static-element-interactions */
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FolderGridView({ files, selectId, setSelectId }) {
    const navigate = useNavigate();
    const handleListFolder = (e) => {
        navigate(`/user/drive/folder/${e}/`);
    };
    return (
        <>
            {files?.folder?.length > 0 ? <div className="my-drive-sub-title">Folder</div> : null}
            {files?.folder?.map((folAr) => (
                <div
                    onClick={() => setSelectId(folAr?.sl)}
                    onDoubleClick={() => handleListFolder(folAr?.sl)}
                    className={`my-drive-list  ${selectId ? 'my-drive-list-2' : ''} ${
                        selectId === folAr?.sl ? 'my-drive-list-selected' : ''
                    }`}
                    key={folAr?.sl}
                >
                    <FontAwesomeIcon color={folAr?.folder_color} icon={faFolder} />
                    <span>{folAr?.title}</span>
                </div>
            ))}
        </>
    );
}

export default FolderGridView;
