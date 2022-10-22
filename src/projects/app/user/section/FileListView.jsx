/* eslint-disable no-unused-vars */
import React from 'react';
import FilePreview from '../../../utils/FilePreview';

function FileListView({ files, selectId, setSelectId }) {
    return (
        <>
            {files?.file?.map((fileAr) => (
                <tr
                    key={fileAr?.sl}
                    onClick={() => setSelectId(fileAr?.sl)}
                    className={`${selectId === fileAr?.sl ? 'my-drive-list-selected' : ''}`}
                >
                    <td>
                        <FilePreview
                            type={fileAr?.file_type}
                            url={`https://file.sourav.xyz${fileAr?.file_url}`}
                        />
                        {fileAr?.title}
                    </td>
                    <td>Own</td>
                    <td>Oct 22,2022</td>
                    <td>{fileAr?.file_size}</td>
                </tr>
            ))}
        </>
    );
}

export default FileListView;
