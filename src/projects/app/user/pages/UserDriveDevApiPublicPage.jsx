/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import ConfigApi from '../../../../configs/ConfigApi';
import ApiCreateModal from '../../../components/modals/ApiCreateModal';
import ApiGetCodeModal from '../../../components/modals/ApiGetCodeModal';
import ApiKeyRegenerateModal from '../../../components/modals/ApiKeyRegenerateModal';
import MyDriveTitleDev from '../../../components/MyDriveTitleDev';
import AxiosAuth from '../../../utils/AxiosAuth';

function UserDriveDevApiPublicPage({ setReloadId }) {
    const [showApi, setShowApi] = useState(false);
    const [showGetApi, setShowGetApi] = useState(false);
    const [showReApi, setShowReApi] = useState(false);
    const [apiAr, setApiAr] = useState([]);
    const [apiCode, setApiCode] = useState([]);

    const handleGetCode = (e) => {
        AxiosAuth.get(`${ConfigApi.API_PUBLIC_CODE.replace(':apiSl', e)}`).then((response) => {
            setApiCode(response.data);
            setShowGetApi(true);
        });
    };

    const handleReGetCode = (e) => {
        AxiosAuth.get(`${ConfigApi.API_PUBLIC_CODE.replace(':apiSl', e)}`).then((response) => {
            setApiCode(response.data);
            setShowReApi(true);
        });
    };
    useEffect(() => {
        AxiosAuth.get(`${ConfigApi.API_PUBLIC_LIST}`).then((response) => {
            setApiAr(response.data);
        });
    }, []);

    return (
        <>
            <MyDriveTitleDev title="Drive Develop Public Api" />
            <div className="content-section p-15">
                <div className="line w-100">
                    <div className="cell-12">
                        {apiAr?.map((row) => (
                            <div className="card mb-4" key={row?.sl}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h5>
                                                Domain:{' '}
                                                <b title="Copy" className="domainCopy">
                                                    {row?.domain_name}
                                                </b>
                                            </h5>
                                        </div>
                                        <div className="col-6 text-right">
                                            <h5>
                                                WEB API ID: <b>{row?.sl}</b>
                                            </h5>
                                        </div>
                                        <div className="col-12 col-lg-3 mt-3">
                                            <h3>API KEY:</h3>
                                        </div>
                                        <div className="col-12 col-lg-9 text-right mt-3">
                                            <h3>{row?.unique_key}</h3>
                                            <div className="api-options">
                                                <button
                                                    type="button"
                                                    className="keyCopy cursor-pointer text-primary"
                                                >
                                                    Copy
                                                </button>{' '}
                                                |
                                                <button
                                                    type="button"
                                                    className="regenerate"
                                                    data-title="Regenerate Key"
                                                    onClick={() => handleReGetCode(row?.sl)}
                                                >
                                                    Regenerate API
                                                </button>
                                                |
                                                <button
                                                    type="button"
                                                    className="smsSend"
                                                    data-title="Send SMS"
                                                    onClick={() => handleGetCode(row?.sl)}
                                                >
                                                    Get Code{' '}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="subscription-info">
                                                <span className="info-table-title font-weight-bold">
                                                    API Information:
                                                </span>
                                                <table width="100%" className="info-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="150">API Created Date</td>
                                                            <td>{row?.time}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="device-info">
                                                <span className="info-table-title font-weight-bold">
                                                    Configuration Information:
                                                    <a
                                                        href="/"
                                                        className="float-right api-edit"
                                                        data-title="Send Email"
                                                    >
                                                        Change
                                                    </a>
                                                </span>
                                                <table width="100%" className="info-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="150">Domain</td>
                                                            <td>{row?.domain_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="150">IP </td>
                                                            <td />
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cell-12">
                        <button
                            type="button"
                            className="btn btn-info btn-lg btn-block custom-btn-add-device text-center"
                            onClick={() => setShowApi(true)}
                        >
                            <i className="fas fa-plus-circle" />
                            Add new API for Website or Software
                        </button>
                    </div>
                </div>
            </div>

            <ApiCreateModal
                showApi={showApi}
                setShowApi={setShowApi}
                setReloadId={setReloadId}
                type="public"
            />

            <ApiGetCodeModal
                showGetApi={showGetApi}
                setShowGetApi={setShowGetApi}
                setReloadId={setReloadId}
                apiCode={apiCode}
                type="public"
            />
            <ApiKeyRegenerateModal
                showReApi={showReApi}
                setShowReApi={setShowReApi}
                apiCode={apiCode}
                setReloadId={setReloadId}
                type="public"
            />
        </>
    );
}

export default UserDriveDevApiPublicPage;
