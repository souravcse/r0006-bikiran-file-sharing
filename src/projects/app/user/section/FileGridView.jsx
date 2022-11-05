/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import FilesIcons from '../../../../configs/FilesIcons';
import PreviewModal from '../../../components/modals/PreviewModal';
import FilePreview from '../../../utils/FilePreview';

function FileGridView({ files, selectId, setSelectId, setReloadId }) {
    const [previewShow, setPreviewShow] = useState(false);

    return (
        <>
            {files?.file?.length > 0 ? <div className="my-drive-sub-title">Files</div> : null}
            {files?.file?.map((fileAr) => (
                <div
                    className={`my-drive-list-file ${selectId ? 'my-drive-list-file-2' : ''} ${
                        selectId === fileAr?.sl ? 'my-drive-list-selected' : ''
                    }`}
                    onClick={() => setSelectId(fileAr?.sl)}
                    key={fileAr?.sl}
                    onDoubleClick={() => setPreviewShow(true)}
                >
                    <div
                        className="my-drive-list-file-view"
                        onClick={() => setSelectId(fileAr?.sl)}
                        onDoubleClick={() => setPreviewShow(true)}
                    >
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

export default FileGridView;
