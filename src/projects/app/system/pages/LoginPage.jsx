import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/Logo.svg';
import ConfigApi from '../../../../configs/ConfigApi';
import AxiosAuth from '../../../utils/AxiosAuth';

function authSet(payload) {
    return {
        type: 'AUTH_SET',
        payload,
    };
}

function LoginPage() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const handleUserName = (e) => {
        setUserName(e.target.value);
    };
    const handelPassword = (e) => {
        setpassword(e.target.value);
    };
    const handleLogin = () => {
        AxiosAuth.currentUserAuth('kk')
            .post(`${ConfigApi.LOGIN}`, { email: userName, password })
            .then((response) => {
                if (response.data.error === 0) {
                    dispatch(authSet(response.data.id));
                    localStorage.setItem('log-id', response.data.id);

                    navigate('/user/drive/');
                }
            });
    };
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
                                    <h3>Sign In</h3>
                                </div>
                                <div className="cell cell-12 input-grp mb-2">
                                    <div className="label">Email Address</div>
                                    <input
                                        type="text"
                                        className="form-input d-block w-100"
                                        placeholder="ex: username@email.com"
                                        value={userName}
                                        onChange={handleUserName}
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
                            </div>

                            <div className="forget-pass mb-3">
                                <a href="/">Forgot Password?</a>
                            </div>

                            <div className="mb-3">
                                <button
                                    className="button button-gr-pink w-100 login-btn"
                                    type="button"
                                    onClick={handleLogin}
                                >
                                    Sign In
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

export default LoginPage;
