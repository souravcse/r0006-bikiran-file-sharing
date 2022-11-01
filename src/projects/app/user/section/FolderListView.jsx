import { faFolder, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FolderListView({ files, selectId, setSelectId }) {
    const navigate = useNavigate();
    const handleListFolder = (e) => {
        navigate(`/user/drive/folder/${e}/`);
    };
    return (
        <>
            {files?.folder?.map((fileAr) => (
                <tr
                    key={fileAr?.sl}
                    onClick={() => setSelectId(fileAr?.sl)}
                    onDoubleClick={() => handleListFolder(fileAr?.sl)}
                    className={selectId === fileAr?.sl ? 'my-drive-list-selected' : ''}
                >
                    <td>
                        {fileAr?.is_lock === 0 ? (
                            <FontAwesomeIcon
                                size="xl"
                                color={fileAr?.folder_color}
                                icon={faFolder}
                                style={{ marginRight: 21, marginLeft: 12 }}
                            />
                        ) : (
                            <FontAwesomeIcon
                                size="xl"
                                color={fileAr?.folder_color}
                                icon={faLock}
                                style={{ marginRight: 21, marginLeft: 12 }}
                            />
                        )}

                        {fileAr?.title}
                    </td>
                    <td>Own</td>
                    <td>Oct 22,2022</td>
                    <td>--</td>
                </tr>
            ))}
        </>
    );
}

export default FolderListView;
