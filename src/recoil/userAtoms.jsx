import { atom } from 'recoil';

export const userAtoms = atom({
    key: 'userState',
    default: {
        isAuthenticated: false,
        userName: null,
        userBirth: null,
        securityNumber: null,
        userLanguage: 'Korean', // Default language set to Korean
        userImageName: null,
        currentPage: "/intro",
    },
});


