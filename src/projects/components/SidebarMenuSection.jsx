/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { createRef, useEffect, useRef, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import FileAdd from '../../assets/images/fileAdd.svg';
import FolderAdd from '../../assets/images/folderAdd.svg';
import FolderUp from '../../assets/images/folderUp.svg';
import MyDriveIcon from '../../assets/images/myDrive.svg';
import PlusIcon from '../../assets/images/PlusIcon.svg';
import ShareDriveIcon from '../../assets/images/shareDrive.svg';
import Trash from '../../assets/images/trash.svg';
import ConfigApi from '../../configs/ConfigApi';
import AxiosAuth from '../utils/AxiosAuth';
import FolderCreateModal from './modals/FolderCreateModal';

const list = [
    {
        id: 'myDrive',
        title: 'My Drive',
        path: '/user/drive/',
        icon: MyDriveIcon,
    },
    {
        id: 'shareDrive',
        title: 'Shared Drive',
        path: '/user/share/drive/',
        icon: ShareDriveIcon,
    },
    {
        id: 'trash',
        title: 'Trash',
        path: '/user/trash/',
        icon: Trash,
    },
];

function AddBox({
    show,
    myRef,
    setShow,
    setFCreateShow,
    setUploadBox,
    setUploadComplete,
    setUploadTitle,
}) {
    const uploadRef = createRef();
    const params = useParams();
    const parentSl = params?.folderSl ? params?.folderSl : 1;

    const handlefCreate = () => {
        setFCreateShow(true);
        setShow(false);
    };
    const handleOnFileChange = async ({ target }) => {
        setUploadBox(true);
        setShow(false);
        const { files } = target;
        for (let xx = 0; xx < files.length; xx += 1) {
            setUploadTitle((oldItems) => [...oldItems, files[xx]?.name]);
        }
        for (let x = 0; x < files.length; x += 1) {
            const formData = new FormData();
            formData.append('upload_file', files[x]);
            await AxiosAuth.post(ConfigApi.FILE_UPLOAD.replace(':folderSl', parentSl), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                parentSl,
            })
                .then((response) => {
                    if (response.data.error === 0) {
                        setUploadComplete((oldItemsx) => [...oldItemsx, files[x]?.name]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    if (!show) {
        return null;
    }
    return (
        <>
            <div ref={myRef} className="add-box-modal">
                <ul>
                    <li onClick={handlefCreate}>
                        <img src={FolderAdd} alt="" />
                        <span>Folder Create</span>
                    </li>
                    <li
                        style={{
                            background: '#E6E2EB',
                            height: 1,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    />
                    <li
                        onClick={() => {
                            uploadRef.current.click();
                        }}
                    >
                        <img src={FileAdd} alt="" /> <span>File Upload</span>
                    </li>
                    <li>
                        <img src={FolderUp} alt="" /> <span>Folder Upload</span>
                    </li>
                    <input
                        ref={uploadRef}
                        type="file"
                        name="file"
                        onChange={handleOnFileChange}
                        multiple
                        style={{ display: 'none' }}
                    />
                </ul>
            </div>
        </>
    );
}

const OptionSubList = ({ clickOnEndItem, subMenu, openL1, setOpenL1 }) => {
    if (!subMenu.length) {
        return null;
    }

    return (
        <ul className="label-1">
            {subMenu.map((item) => (
                <li key={item.id} className={openL1 === item.id ? 'open' : ''}>
                    <Link
                        to={item.path}
                        onClick={(ev) => {
                            setOpenL1(item.id);

                            if (typeof clickOnEndItem === 'function') clickOnEndItem(ev);
                        }}
                    >
                        <img className="icon" src={item.icon} alt={item.title} />
                        <span>{item.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const OptionList = ({
    removeMenus = [],
    clickOnEndItem,
    menuL0,
    menuL1,
    setUploadBox,
    setUploadComplete,
    setUploadTitle,
}) => {
    const [openL0, setOpenL0] = useState(menuL0);
    const [openL1, setOpenL1] = useState(menuL1);
    const [addBoxShow, setAddBoxShow] = useState(false);
    const [fCreateShow, setFCreateShow] = useState(false);

    const ref = useRef();
    const handleClickOutside = (ev) => {
        if (!(ref && ref.current?.contains(ev.target))) {
            // alert('You clicked outside of me!');
            setAddBoxShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div className="option-list">
            <ul>
                <li className="add-new-li">
                    <button
                        type="button"
                        className="add-new-btn"
                        onClick={() => setAddBoxShow(true)}
                    >
                        <img
                            className="icon"
                            src={PlusIcon}
                            alt="Plus"
                            style={{ width: 15, marginRight: 10 }}
                        />{' '}
                        Add New
                    </button>
                    <br />

                    <AddBox
                        show={addBoxShow}
                        setShow={setAddBoxShow}
                        myRef={ref}
                        setFCreateShow={setFCreateShow}
                        setUploadBox={setUploadBox}
                        setUploadComplete={setUploadComplete}
                        setUploadTitle={setUploadTitle}
                    />
                    <FolderCreateModal show={fCreateShow} setFCreateShow={setFCreateShow} />
                </li>
                {list
                    .filter((item) => removeMenus.indexOf(item.id) === -1)
                    .map((item) => {
                        if (item.subMenu?.length) {
                            return (
                                <li key={item.id} className={openL0 === item.id ? 'open' : ''}>
                                    <a
                                        href={item.path}
                                        onClick={(ev) => {
                                            ev.preventDefault();

                                            setOpenL0(openL0 === item.id ? null : item.id);
                                        }}
                                    >
                                        <img className="icon" src={item.icon} alt={item.title} />
                                        <span>{item.title}</span>

                                        {item.subMenu?.length ? (
                                            <img className="arrow" src="" alt="arrow" />
                                        ) : null}
                                    </a>

                                    {item.subMenu?.length ? (
                                        <OptionSubList
                                            subMenu={item.subMenu}
                                            openL1={openL1}
                                            setOpenL1={setOpenL1}
                                            clickOnEndItem={clickOnEndItem}
                                        />
                                    ) : null}
                                </li>
                            );
                        }
                        return (
                            <li key={item.id} className={openL0 === item.id ? 'open' : ''}>
                                <Link
                                    to={item.path}
                                    onClick={(ev) => {
                                        setOpenL0(item.id);

                                        if (typeof clickOnEndItem === 'function')
                                            clickOnEndItem(ev);
                                    }}
                                >
                                    <img className="icon" src={item.icon} alt={item.title} />
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

function SidebarMenuSection({
    hideProfile,
    clickOnEndItem,
    setUploadBox,
    setUploadComplete,
    setUploadTitle,
}) {
    const removeMenus = [];
    if (hideProfile) {
        removeMenus.push('dashboard');
    }

    return (
        <div className="profile-section">
            <OptionList
                menuL0="dashboard"
                menuL1="server_vps"
                removeMenus={removeMenus}
                clickOnEndItem={clickOnEndItem}
                setUploadBox={setUploadBox}
                setUploadComplete={setUploadComplete}
                setUploadTitle={setUploadTitle}
            />
        </div>
    );
}

export default SidebarMenuSection;
