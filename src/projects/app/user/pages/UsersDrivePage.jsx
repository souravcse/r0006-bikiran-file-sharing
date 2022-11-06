import React, { useEffect, useState } from 'react';
import ConfigApi from '../../../../configs/ConfigApi';
import MyDriveTitle from '../../../components/MyDriveTitle';
import AxiosAuth from '../../../utils/AxiosAuth';
import DragDropFile from '../../../utils/DragDropFile';
import UploadingBox from '../../../utils/UploadingBox';
import DriveDetailSideBar from '../section/DriveDetailSideBar';
import FileGridView from '../section/FileGridView';
import FileListView from '../section/FileListView';
import FolderGridView from '../section/FolderGridView';
import FolderListView from '../section/FolderListView';

function UsersDrivePage({ reloadId, setReloadId, disStyle, setDisStyle, selectId, setSelectId }) {
    const [files, setFiles] = useState([]);
    const [uploadBox, setUploadBox] = useState(false);
    const [uploadComplete, setUploadComplete] = useState([]);
    const [uploadTitle, setUploadTitle] = useState([]);

    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.GET_FILE}`).then((response) => {
            setFiles(response.data.fileList_ar);
        });
    }, [reloadId]);

    if (!disStyle) {
        return null;
    }

    return (
        <>
            <MyDriveTitle
                disStyle={disStyle}
                setDisStyle={setDisStyle}
                selectId={selectId}
                setSelectId={setSelectId}
                setReloadId={setReloadId}
            />
            {files?.folder?.length > 0 || files?.file?.length > 0 ? (
                <div className="my-drive" style={{ width: selectId !== null ? '81%' : '100%' }}>
                    {disStyle === '1' ? (
                        <>
                            <FolderGridView
                                files={files}
                                selectId={selectId}
                                setSelectId={setSelectId}
                            />
                            <FileGridView
                                files={files}
                                selectId={selectId}
                                setSelectId={setSelectId}
                                setReloadId={setReloadId}
                            />
                        </>
                    ) : null}
                    {disStyle === '2' ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Owner</td>
                                        <td>Last Modified Date</td>
                                        <td>Size</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <FolderListView
                                        files={files}
                                        selectId={selectId}
                                        setSelectId={setSelectId}
                                    />
                                    <FileListView
                                        files={files}
                                        selectId={selectId}
                                        setSelectId={setSelectId}
                                        setReloadId={setReloadId}
                                    />
                                </tbody>
                            </table>
                        </>
                    ) : null}
                </div>
            ) : (
                <div className="my-drive">
                    <div className="my-drive-empty">
                        {/* <img src={DragIcon} alt="Drag Icon" />
                        <h6>Drop Files here</h6>
                        <small>or use Add New button</small> */}
                        <DragDropFile
                            setReloadId={setReloadId}
                            setUploadComplete={setUploadComplete}
                            setUploadTitle={setUploadTitle}
                            setUploadBox={setUploadBox}
                        />
                    </div>
                </div>
            )}
            {selectId !== null ? (
                <DriveDetailSideBar
                    reloadId={reloadId}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setSelectId={setSelectId}
                />
            ) : null}
            {uploadBox ? (
                <UploadingBox
                    uploadBox={uploadBox}
                    setUploadBox={setUploadBox}
                    uploadComplete={uploadComplete}
                    uploadTitle={uploadTitle}
                />
            ) : null}
        </>
    );
}

export default UsersDrivePage;
