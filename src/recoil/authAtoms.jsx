// src/recoil/authAtoms.jsx
import { atom } from 'recoil';

export const authAtom = atom({
    key: 'authAtom',
    default: {
        isAuthenticated: false,
        nickname: null,
    },
});
