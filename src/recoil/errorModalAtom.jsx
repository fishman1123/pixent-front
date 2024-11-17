// src/recoil/errorModalAtom.jsx

import { atom } from 'recoil';

export const errorModalAtom = atom({
    key: 'errorModal',
    default: {
        isOpen: false,
        message: '',
    },
});
