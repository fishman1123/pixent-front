// confirmationAtom.js
import { atom } from 'recoil';

export const confirmationAtom = atom({
    key: 'confirmationAtom',
    default: {
        isOpen: false,
        isConfirm: false,
        preferences: {
            preferred: [],
            disliked: [],
        },
    },
});
