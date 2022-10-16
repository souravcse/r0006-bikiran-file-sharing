import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';

const menu = [
    {
        id: 'home',
        title: 'Domain',
        path: '/domain/',
    },
    {
        id: 'services',
        title: 'Services',
        path: '/services/',
    },
    {
        id: 'clients',
        title: 'Clients',
        path: '/clients/',
    },
    {
        id: 'about',
        title: 'About',
        path: '/about-us/',
    },
];

function MenuItem({ item, cPath }) {
    return (
        <li key={item.id} className={cPath === item.path ? 'menu-top-active' : ''}>
            <Link to={item?.path}>
                <span>{item?.title}</span>
            </Link>
        </li>
    );
}

function Menu({ cPath }) {
    return (
        <div className="cell cell-fill">
            <ul className="menu-top menu-top-area">
                {menu.map((item) => (
                    <MenuItem item={item} key={item.id} cPath={cPath} />
                ))}
            </ul>
        </div>
    );
}

function WebLogo() {
    return (
        <div className="cell cell-profile">
            <Link to="/">
                <img src={Logo} alt="Bikiran Banner web" />
            </Link>
        </div>
    );
}
function HeaderSection() {
    const [isSearch, setIsSearch] = useState(false);
    const handleSearchIcon = () => setIsSearch(!isSearch);
    const cPath = window.location.pathname;
    const urlMatchCart = cPath.match('/user/');

    return (
        <div className="header header-section">
            <div className="container">
                <div className="line line-g3 line-no-wrap line-align-item-center">
                    <WebLogo />
                    <Menu
                        handleSearchIcon={handleSearchIcon}
                        urlMatchCart={urlMatchCart}
                        cPath={cPath}
                    />
                    <div className="cell cell-fill d-md-none">xzsdc</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderSection;
