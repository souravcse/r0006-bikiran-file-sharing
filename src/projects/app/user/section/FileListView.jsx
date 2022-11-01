/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PreviewModal from '../../../components/modals/PreviewModal';
import FilePreview from '../../../utils/FilePreview';

function FileListView({ files, selectId, setSelectId, setReloadId }) {
    const [previewShow, setPreviewShow] = useState(false);

    return (
        <>
            {files?.file?.map((fileAr) => (
                <tr
                    key={fileAr?.sl}
                    onClick={() => setSelectId(fileAr?.sl)}
                    className={`${selectId === fileAr?.sl ? 'my-drive-list-selected' : ''}`}
                    onDoubleClick={() => setPreviewShow(true)}
                >
                    <td style={{ display: 'flex', alignItems: 'center' }}>
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
            {previewShow ? (
                <PreviewModal
                    files={files?.file}
                    selectId={selectId}
                    setSelectId={setSelectId}
                    show={previewShow}
                    setShow={setPreviewShow}
                    setReloadId={setReloadId}
                />
            ) : null}
        </>
    );
}

export default FileListView;
