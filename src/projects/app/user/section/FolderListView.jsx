import React from 'react';
import { useNavigate } from 'react-router-dom';
import folderImg from '../../../../assets/images/folder-icon.svg';

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
                        <img style={{ height: 15 }} src={folderImg} alt="Folder Img" />
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
