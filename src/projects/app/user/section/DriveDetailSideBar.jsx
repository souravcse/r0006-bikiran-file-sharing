import React, { useEffect, useState } from 'react';
import circleImg from '../../../../assets/images/circleUser.svg';
import crossicon from '../../../../assets/images/CrossIcon.svg';
import folderImg from '../../../../assets/images/folder-icon.svg';

import ConfigApi from '../../../../configs/ConfigApi';
import AxiosAuth from '../../../utils/AxiosAuth';
import FilePreview from '../../../utils/FilePreview';

function DriveDetailSideBar({ reloadId, selectId, setSelectId }) {
    const [file, setFile] = useState(null);
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_DETAIL.replace(':fileSl', selectId)}`).then((response) => {
            setFile(response.data);
        });
    }, [selectId, reloadId]);

    return (
        <div className="my-drive-detail">
            <div className="my-drive-detail-title">
                <img src={folderImg} alt="" />
                <h4>{file?.title}</h4>
                <button type="button" onClick={() => setSelectId(null)}>
                    <img src={crossicon} alt="" />
                </button>
            </div>
            <div className="my-drive-detail-img">
                {file?.type === 'file' ? (
                    <FilePreview
                        type={file?.file_type}
                        url={`https://file.sourav.xyz${file?.file_url}`}
                    />
                ) : (
                    <img src={folderImg} alt="" />
                )}
            </div>
            <div className="my-drive-detail-properties">
                <div className="my-drive-detail-properties-access">
                    <h6>Who has access</h6>
                    <ul>
                        <li>
                            <img src={circleImg} alt="" />
                        </li>
                        <li>
                            <img src={circleImg} alt="" />
                        </li>
                        <li>
                            <img src={circleImg} alt="" />
                        </li>
                    </ul>
                    <button type="button">Manage Access</button>
                </div>
                <div className="my-drive-detail-properties-info">
                    <h6>System properties</h6>
                    <table>
                        <tr>
                            <td>Type</td>
                            <td>Bikiran Drive Folder</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>My Drive</td>
                        </tr>
                        <tr>
                            <td>Owner</td>
                            <td>Me</td>
                        </tr>
                        <tr>
                            <td>File Type</td>
                            <td>{file?.file_ext ? file?.file_ext : 'Folder'}</td>
                        </tr>
                        <tr>
                            <td>File Size</td>
                            <td>{file?.file_size ? file?.file_size : '--'}</td>
                        </tr>
                        <tr>
                            <td>Modified</td>
                            <td>{file?.time_updated}</td>
                        </tr>
                        <tr>
                            <td>Created</td>
                            <td>{file?.time_created}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DriveDetailSideBar;
