
import { atom } from 'recoil';

export const responseDataAtom = atom({
    key: 'responseDataAtom', // Unique ID (with respect to other atoms/selectors)
    default: null,           // Default value (initial state)
});
