import {useRecoilState} from "recoil";
import {userAtoms} from "../../recoil/userAtoms.jsx";
import {useNavigate} from "react-router-dom";


export const Input = () => {
    const navigate = useNavigate();
    const userStatusState = useRecoilState(userAtoms);


    return (
        <>
            <div>
                input page
            </div>
        </>
    )
}