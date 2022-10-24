import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/Logo.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import AxiosAuth from '../../../utils/AxiosAuth';

function RegisterPage() {
    const { search } = useLocation();
    const code = new URLSearchParams(search).get('code');
    const userEmail = new URLSearchParams(search).get('email');
    const shareFileSl = new URLSearchParams(search).get('fileSl');

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [token, setToken] = useState('');
    const [fileSl, setFileSl] = useState('');

    const navigate = useNavigate();

    const handelPassword = (e) => {
        setpassword(e.target.value);
    };
    const handelName = (e) => {
        setFullName(e.target.value);
    };
    const handelRePassword = (e) => {
        setRePassword(e.target.value);
    };
    const handelMobile = (e) => {
        setMobile(e.target.value);
    };
    const handleRegister = () => {
        AxiosAuth.post(ConfigApi.REGISTER, {
            email,
            password,
            token,
            fullName,
            mobile,
            rePassword,
            fileSl,
        })
            .then((response) => {
                console.log(response);
                // --Adding Secure Token
                if (response.headers['secure-access']) {
                    localStorage.setItem('Secure-Access', response.headers['secure-access']);
                }
                if (response.data.error === 0) {
                    navigate('/user/drive/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (code) {
            setToken(code);
        }
        if (userEmail) {
            setEmail(userEmail);
        }
        if (shareFileSl) {
            setFileSl(shareFileSl);
        }
    }, [code, shareFileSl, userEmail]);
    return (
        <div className={['h-100 user-h-area', 'browser browser-4xl'].join(' ')}>
            <div className="body-section">
                <div className="container h-100 pt-5">
                    <div className="line">
                        <div className="cell-12 text-center">
                            <img src={Logo} alt="Bikiran Banner web" className="mb-7" />
                        </div>
                        <div className="cell-4" />
                        <div className="cell-4">
                            <div className="line line-g2">
                                <div className="cell cell-12 input-grp mb-2">
                                    <h3>Sign Up</h3>
                                </div>
                                <div className="cell cell-12 input-grp mb-2">
                                    <div className="label">Full Name</div>
                                    <input
                                        type="text"
                                        className="form-input d-block w-100"
                                        placeholder="Type Full Name"
                                        value={fullName}
                                        onChange={handelName}
                                    />
                                </div>

                                <div className="cell cell-12 input-grp mb-2">
                                    <div className="label">Email Address</div>
                                    <input
                                        type="text"
                                        className="form-input d-block w-100"
                                        placeholder="ex: username@email.com"
                                        value={email}
                                        readOnly
                                    />
                                </div>
                                <div className="cell cell-12 input-grp mb-2">
                                    <div className="label">Mobile Number</div>
                                    <input
                                        type="text"
                                        className="form-input d-block w-100"
                                        placeholder="Type Mobile Number"
                                        value={mobile}
                                        onChange={handelMobile}
                                    />
                                </div>

                                <div className="cell cell-12 input-grp login-pass mb-2">
                                    <div className="label">Password</div>
                                    <input
                                        type="password"
                                        className="form-input d-block w-100"
                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                        value={password}
                                        onChange={handelPassword}
                                    />
                                </div>
                                <div className="cell cell-12 input-grp login-pass mb-2">
                                    <div className="label">Re-Password</div>
                                    <input
                                        type="password"
                                        className="form-input d-block w-100"
                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                        value={rePassword}
                                        onChange={handelRePassword}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <button
                                    className="button button-gr-pink w-100 login-btn"
                                    type="button"
                                    onClick={handleRegister}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div className="cell-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
