import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Menu } from './navbar/Menu';
import { TranslateButton } from './navbar/TranslateButton';
import { BackButton } from './navbar/BackButton.jsx';
import { userAtoms } from '../recoil/userAtoms';
import { modalTriggerAtom } from '../recoil/modalTriggerAtom';
import { confirmationAtom } from '../recoil/confirmationAtom.jsx';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentPage } = useRecoilValue(userAtoms);
    const modalState = useRecoilValue(modalTriggerAtom);
    const confirmationState = useRecoilValue(confirmationAtom);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="max-w-[480px] mx-auto">
            <div className={`fixed top-0 left-0 w-full text-black ${modalState.isOpen || confirmationState.isOpen ? 'z-10' : 'z-30'}`}>
                <div className="max-w-[480px] mx-auto bg-white flex items-center justify-between p-5">
                    {currentPage === '/intro' ? <TranslateButton /> : <BackButton />}
                    <div className="flex-1 text-[24px] font-headerTitle text-center">
                        AC'SCENT
                    </div>
                    <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
            </div>
        </div>
    );
};
