import { faFolder, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import LockOpenModal from '../../../components/modals/LockOpenModal';

function FolderListView({ files, selectId, setSelectId }) {
    const [openLock, setOpenLock] = useState(false);
    const location = useLocation();
    const q = new URLSearchParams(location.search).get('enCode');

    const navigate = useNavigate();
    const handleListFolder = (e) => {
        navigate(`/user/drive/folder/${e}/?enCode=${q}`);
    };
    return (
        <>
            {files?.folder?.map((fileAr) => (
                <tr
                    key={fileAr?.sl}
                    onClick={() => setSelectId(fileAr?.sl)}
                    onDoubleClick={
                        fileAr?.is_lock !== 0
                            ? () => setOpenLock(true)
                            : () => handleListFolder(fileAr?.sl)
                    }
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
            {openLock ? (
                <LockOpenModal openLock={openLock} setOpenLock={setOpenLock} selectId={selectId} />
            ) : null}
        </>
    );
}

export default FolderListView;
