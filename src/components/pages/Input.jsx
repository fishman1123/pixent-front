import { useRecoilValue } from 'recoil';
import { userAtoms } from '../../recoil/userAtoms.jsx';
import { useEffect } from 'react';

export const Input = () => {
    const userState = useRecoilValue(userAtoms); // Access Recoil state

    useEffect(() => {
        // Log current page value
        console.log('Current Page:', userState.currentPage);
    }, [userState.currentPage]);

    return (
        <>
            <div>
                input page
            </div>
        </>
    );
};
