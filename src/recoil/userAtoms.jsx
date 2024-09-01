import {atom} from 'recoil';

export const userAtoms = atom({
    key: 'userState',
    default: {
        isAuthenticated: false,
        userName: null,
        userBirth: null,
        securityNumber: null,
        userLanguage: null,
        userImageName: null,
    },
});