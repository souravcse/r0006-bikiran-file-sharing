import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import AxiosAuth from '../utils/AxiosAuth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const initialState = {
    loginStatus: false,
    email: '',
    phoneNumber: '',
    displayName: '',
    photoUrl: '',
    lastLogin: 0,
    provider: '',
    refreshToken: '',
    userUid: '',
    firebase: null,
};

const initialModalProperty = {
    modalType: null, // sign-in, sign-up, forget-password, create-account, link-account
    onSuccess: null,
    onFailed: null,
};

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [loginHash, setLoginHash] = useState('');

    const [modalProperty, setModalProperty] = useState({ ...initialModalProperty });

    const makeAction = (modalType, onSuccess, onFailed) => {
        if (typeof onSuccess === 'function') {
            onSuccess();
        } else {
            setModalProperty((cVal) => {
                const nVal = { ...cVal, modalType };

                if (typeof onSuccess === 'function') {
                    nVal.onSuccess = onSuccess;
                }

                if (typeof onFailed === 'function') {
                    nVal.onFailed = onFailed;
                }

                return nVal;
            });
        }
    };

    const logOut = () =>
        new Promise((resolve, reject) => {
            signOut(firebaseAuth)
                .then(() => {
                    // --Updating State by Firebase
                    setCurrentUser({ ...initialState });

                    // todo: update bikiran server
                    resolve({ error: 0, message: 'Signed out successfully' });
                })
                .catch((err) => {
                    reject(err);
                });
        });

    const setExitModal = () => {
        if (typeof modalProperty.onFailed === 'function') {
            modalProperty.onFailed();
        }
        setModalProperty((cVal) => ({ ...cVal, modalType: null, onSuccess: null, onFailed: null }));
    };

    const setSuccessLogin = () => {
        if (typeof modalProperty.onSuccess === 'function') {
            modalProperty.onSuccess();
        }
        setModalProperty((cVal) => ({ ...cVal, modalType: null, onSuccess: null, onFailed: null }));
    };

    const setAction = (modalType) => {
        setModalProperty((cVal) => ({ ...cVal, modalType }));
    };

    const recheckLogin = () => {
        setLoginHash(Math.random());
    };

    const verifyProviderRecord = (user) =>
        new Promise((resolve, reject) => {
            const providerData = user?.providerData[0] || null;

            if (!providerData) {
                resolve({
                    error: 1,
                    message: `Technical Error`,
                });
            } else if (!providerData?.email) {
                resolve({
                    error: 2,
                    message: `Please set your ${providerData.providerId} email public or update email settings`,
                });
            } else {
                // --Updating State by Firebase
                setCurrentUser((cuVal) => ({
                    ...cuVal,
                    firebase: { ...providerData, userUid: user.uid },
                }));

                AxiosAuth.setApiUrl('AUTH', '/login/')
                    .post({
                        userUid: user?.uid || '',
                        refreshToken: user?.refreshToken || '',
                    })
                    .then(({ data }) => {
                        // --Updating State by BIKIRAN
                        setCurrentUser((cuData) => ({
                            ...cuData,
                            ...data.user,
                            loginStatus: !!data.loginStatus,
                        }));

                        // Sending final response
                        resolve(data);
                    })
                    .catch((err) => {
                        setCurrentUser((cuData) => ({ ...cuData, loginStatus: false }));
                        reject(err);
                    });
            }
        });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            verifyProviderRecord(user);
            setLoading(false);
            unsubscribe();
        });

        // return unsubscribe;
    }, [loginHash]);

    const value = {
        currentUser,
        signOut: logOut,
        makeAction,
        setExitModal,
        setSuccessLogin,
        loginHash,
        recheckLogin,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}

            <LoginController
                show={modalProperty.modalType === 'sign-in'}
                modalProperty={modalProperty}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setExitModal={setExitModal}
                setSuccessLogin={setSuccessLogin}
                makeAction={makeAction}
                verifyProviderRecord={verifyProviderRecord}
                setAction={setAction}
            />

            <RegistrationController
                show={modalProperty.modalType === 'sign-up'}
                modalProperty={modalProperty}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setExitModal={setExitModal}
                signOut={logOut}
                makeAction={makeAction}
                recheckLogin={recheckLogin}
                verifyProviderRecord={verifyProviderRecord}
                setAction={setAction}
                setSuccessLogin={setSuccessLogin}
            />

            <ForgetPasswordController
                show={modalProperty.modalType === 'forget-password'}
                modalProperty={modalProperty}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                makeAction={makeAction}
                setExitModal={setExitModal}
            />

            <LoginLinkAccount
                show={modalProperty.modalType === 'link-account'}
                setAction={setAction}
                firebase={currentUser.firebase}
                signOut={logOut}
                recheckLogin={recheckLogin}
                key={currentUser?.firebase?.userUid || ''}
            />

            <CreateAnAccountModal
                show={modalProperty.modalType === 'create-account'}
                firebase={currentUser.firebase}
                signOut={logOut}
                makeAction={makeAction}
            />
        </AuthContext.Provider>
    );
}
