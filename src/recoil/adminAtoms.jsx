import { atom } from 'recoil';


export const defaultAdminState = {
    isAuthenticated: false,
};

export const adminAtoms = atom({
    key: 'adminState',
    default: defaultAdminState,
});
