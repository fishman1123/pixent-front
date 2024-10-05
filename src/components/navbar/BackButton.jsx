import backIcon from "../../assets/leftarrow.svg";
import {useNavigate} from "react-router-dom";


export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="relative ml-[4px] mt-[4px]">
                <button
                    className="text-black focus:ring-4 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={()=>navigate(-1)}
                >
                    <img
                        src={backIcon}
                        alt="Back Icon"
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </>
    )
}