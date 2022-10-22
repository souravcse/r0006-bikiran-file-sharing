/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React from 'react';
import FilesIcons from '../../../../configs/FilesIcons';
import FilePreview from '../../../utils/FilePreview';

function FileGridView({ files, selectId, setSelectId }) {
    return (
        <>
            {files?.file?.length > 0 ? <div className="my-drive-sub-title">Files</div> : null}
            {files?.file?.map((fileAr) => (
                <div
                    className={`my-drive-list-file ${
                        selectId === fileAr?.sl ? 'my-drive-list-selected' : ''
                    }`}
                    onClick={() => setSelectId(fileAr?.sl)}
                    key={fileAr?.sl}
                >
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
        </>
    );
}

export default FileGridView;
