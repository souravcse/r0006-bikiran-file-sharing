import { useState } from 'react';
import { Link } from 'react-router-dom';
import MyDriveIcon from '../../assets/images/myDrive.svg';
import PlusIcon from '../../assets/images/PlusIcon.svg';
import ShareDriveIcon from '../../assets/images/shareDrive.svg';
import Trash from '../../assets/images/trash.svg';

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

const OptionList = ({ removeMenus = [], clickOnEndItem, menuL0, menuL1 }) => {
    const [openL0, setOpenL0] = useState(menuL0);
    const [openL1, setOpenL1] = useState(menuL1);

    return (
        <div className="option-list">
            <ul>
                <li className="add-new-li">
                    <button type="button" className="add-new-btn">
                        <img className="icon" src={PlusIcon} alt="Plus" /> Add New
                    </button>
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

function SidebarMenuSection({ hideProfile, clickOnEndItem }) {
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
            />
        </div>
    );
}

export default SidebarMenuSection;
