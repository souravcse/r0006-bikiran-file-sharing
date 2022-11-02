import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DragIcon from '../../../../assets/images/DragIcon.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import HideOpenModal from '../../../components/modals/HideOpenModal';
import MyDriveTitle from '../../../components/MyDriveTitle';
import AxiosAuth from '../../../utils/AxiosAuth';
import DriveDetailSideBar from '../section/DriveDetailSideBar';
import FileGridView from '../section/FileGridView';
import FileListView from '../section/FileListView';
import FolderGridView from '../section/FolderGridView';
import FolderListView from '../section/FolderListView';

function UsersDriveHiddenPage({
    reloadId,
    setReloadId,
    disStyle,
    setDisStyle,
    selectId,
    setSelectId,
}) {
    const [files, setFiles] = useState([]);
    const [openHide, setOpenHide] = useState(true);
    const [isPageShow, setIsPageShow] = useState(false);

    const params = useParams();
    const parentSl = params?.folderSl ? params?.folderSl : 'folderSl';

    useEffect(() => {
        setSelectId(null);
        if (isPageShow) {
            AxiosAuth.get(`${ConfigApi.GET_HIDE_FILE_DETAIL?.replace(':folderSl', parentSl)}`).then(
                (response2) => {
                    setFiles(response2.data.fileList_ar);
                    setIsPageShow(true);
                }
            );
        }
    }, [isPageShow, parentSl, setSelectId]);

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
                <div className="my-drive" style={{ width: selectId !== null ? '70%' : '100%' }}>
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
                        <img src={DragIcon} alt="Drag Icon" />
                        <h6>Drop Files here</h6>
                        <small>or use Add New button</small>
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
            {openHide ? (
                <HideOpenModal
                    openHide={openHide}
                    setOpenHide={setOpenHide}
                    selectId={parentSl}
                    setIsPageShow={setIsPageShow}
                />
            ) : null}
        </>
    );
}

export default UsersDriveHiddenPage;
