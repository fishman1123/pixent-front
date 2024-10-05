
import { atom } from 'recoil';

export const modalTriggerAtom = atom({
    key: 'modalTriggerAtom',
    default: {
        isOpen: false,
    },
});