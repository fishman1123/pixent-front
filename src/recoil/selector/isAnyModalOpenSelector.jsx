// recoil/isAnyModalOpenSelector.js
import { selector } from 'recoil';
import { modalTriggerAtom } from '../modalTriggerAtom';
import { confirmationAtom } from '../confirmationAtom';

export const isAnyModalOpenSelector = selector({
    key: 'isAnyModalOpenSelector',
    get: ({ get }) => {
        const modalTriggerState = get(modalTriggerAtom);
        const confirmationState = get(confirmationAtom);

        return modalTriggerState.isOpen || confirmationState.isOpen;
    },
});
