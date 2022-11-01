/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DotIcon from '../../../assets/images/Dot-white.svg';
import DownloadIcon from '../../../assets/images/download-white.svg';
import LeftArrow from '../../../assets/images/left-arrow-white.svg';
import LeftIcon from '../../../assets/images/LeftArrowWhite.svg';
import PrintIcon from '../../../assets/images/print-white.svg';
import RightIcon from '../../../assets/images/RightArrowWhite.svg';
import ConfigApi from '../../../configs/ConfigApi';
import AxiosAuth from '../../utils/AxiosAuth';

import FilePreview from '../../utils/FilePreview';
import ItemMenuBox from '../ItemMenuBox';
import MoveModal from './MoveModal';
import RenameModal from './RenameModal';
import ShareModal from './ShareModal';

function PreviewModal({ files, show, setShow, selectId, setSelectId, setReloadId }) {
    const [fileAr, setFileAr] = useState();
    const [prevId, setPrevId] = useState();
    const [nextId, setNextId] = useState();
    const [showShare, setShareShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [showMove, setShowMove] = useState(false);

    const handleFileDownload = () => {
        AxiosAuth.get(`${ConfigApi.FILE_DOWNLOAD.replace(':fileSl', selectId)}`).then(
            (response) => {
                console.log(response);
            }
        );
    };
    useEffect(() => {
        if (selectId) {
            setFileAr(files?.filter((rowFil) => rowFil?.sl === selectId)[0]);
        }
        if (fileAr) {
            setPrevId(
                files?.reverse()?.filter((rowFil) => rowFil?.time_created < fileAr?.time_created)[0]
                    ?.sl
            );
            setNextId(
                files?.reverse()?.filter((rowFil) => rowFil?.time_created > fileAr?.time_created)[0]
                    ?.sl
            );
        }
    }, [fileAr, files, selectId]);

    return (
        <Modal
            size="xl"
            show={show}
            onHide={() => setShow(false)}
            centered
            dialogClassName="preview-modal-dialog"
            interval={null}
            prevIcon={false}
            indicators={false}
            controls={false}
            nextIcon=""
            nextLabel=""
        >
            <Modal.Header>
                <div className="preview-modal-header">
                    <div className="preview-modal-header-title">
                        <button type="button" onClick={() => setShow(false)}>
                            <img src={LeftArrow} alt="" />
                        </button>
                        <button type="button" onClick={() => setShowRename(true)}>
                            <span>{fileAr?.title}</span>
                        </button>
                    </div>
                    <div className="preview-modal-header-option">
                        <button type="button">
                            <img src={PrintIcon} alt="" />
                        </button>
                        <button type="button" onClick={() => handleFileDownload()}>
                            <img src={DownloadIcon} alt="" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowMenu(true);
                            }}
                        >
                            <img src={DotIcon} alt="" />
                        </button>
                        {showMenu ? (
                            <ItemMenuBox
                                fileAr={fileAr}
                                selectId={selectId}
                                showMenu={showMenu}
                                setShowMenu={setShowMenu}
                                setShowRename={setShowRename}
                                setShowMove={setShowMove}
                                setShareShow={setShareShow}
                                setReloadId={setReloadId}
                            />
                        ) : null}
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="preview-modal-body">
                    <FilePreview
                        type={fileAr?.file_type}
                        url={`https://file.sourav.xyz${fileAr?.file_url}`}
                    />
                </div>
                <div className="preview-modal-arrow">
                    {prevId > 0 ? (
                        <button type="button" onClick={() => setSelectId(prevId)}>
                            <img src={LeftIcon} alt="Left" />
                        </button>
                    ) : null}
                    {nextId > 0 ? (
                        <button
                            className="preview-modal-arrow-right"
                            type="button"
                            onClick={() => setSelectId(nextId)}
                        >
                            <img src={RightIcon} alt="Right" />
                        </button>
                    ) : null}
                </div>
                <RenameModal
                    fileAr={fileAr}
                    showRename={showRename}
                    setShowRename={setShowRename}
                    setReloadId={setReloadId}
                    selectId={selectId}
                    setShowMenu={setShowMenu}
                />
                {showMove ? (
                    <MoveModal
                        showMove={showMove}
                        setShowMove={setShowMove}
                        setReloadId={setReloadId}
                        selectId={selectId}
                        setShowMenu={setShowMenu}
                        setSelectId={setSelectId}
                    />
                ) : null}
                {showShare ? (
                    <ShareModal
                        fileAr={fileAr}
                        showShare={showShare}
                        setShareShow={setShareShow}
                        setReloadId={setReloadId}
                        selectId={selectId}
                        setSelectId={setSelectId}
                    />
                ) : null}
            </Modal.Body>
        </Modal>
    );
}

export default PreviewModal;
