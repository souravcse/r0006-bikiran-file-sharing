/* eslint-disable jsx-a11y/no-static-element-interactions */
import { faFolder, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FolderGridView({ files, selectId, setSelectId }) {
    const navigate = useNavigate();
    const location = useLocation();
    const q = new URLSearchParams(location.search).get('enCode');

    const handleListFolder = (e) => {
        navigate(`/user/drive/folder/${e}${selectId}/?enCode=${q}`);
    };
    return (
        <>
            {files?.folder?.length > 0 ? <div className="my-drive-sub-title">Folder</div> : null}
            {files?.folder?.map((folAr) => (
                <div
                    onClick={() => setSelectId(folAr?.sl)}
                    onDoubleClick={() => handleListFolder(folAr?.keyId)}
                    className={`my-drive-list  ${selectId ? 'my-drive-list-2' : ''} ${
                        selectId === folAr?.sl ? 'my-drive-list-selected' : ''
                    }`}
                    key={folAr?.sl}
                >
                    {folAr?.is_lock === 0 ? (
                        <FontAwesomeIcon color={folAr?.folder_color} icon={faFolder} />
                    ) : (
                        <FontAwesomeIcon color={folAr?.folder_color} icon={faLock} />
                    )}

                    <span>{folAr?.title}</span>
                </div>
            ))}
        </>
    );
}

export default FolderGridView;
