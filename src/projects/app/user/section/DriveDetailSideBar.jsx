import React, { useEffect, useState } from 'react';
import crossicon from '../../../../assets/images/CrossIcon.svg';
import folderImg from '../../../../assets/images/folder-icon.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import ShareModal from '../../../components/modals/ShareModal';
import AxiosAuth from '../../../utils/AxiosAuth';
import FilePreview from '../../../utils/FilePreview';

function DriveDetailSideBar({ reloadId, setReloadId, selectId, setSelectId }) {
    const [file, setFile] = useState(null);
    const [showShare, setShareShow] = useState(false);

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_DETAIL.replace(':fileSl', selectId)}`).then((response) => {
            setFile(response.data);
        });
    }, [selectId, reloadId]);

    return (
        <>
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
                            {file?.shareListAr?.map((sList) => (
                                <li>
                                    <div className="circle">{sList?.userName?.substring(0, 1)}</div>
                                    <div className="share-user-name">{sList?.userName}</div>
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={() => setShareShow(true)}>
                            Manage Access
                        </button>
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
            {showShare ? (
                <ShareModal
                    showShare={showShare}
                    setShareShow={setShareShow}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}
        </>
    );
}

export default DriveDetailSideBar;
