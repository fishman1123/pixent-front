import {InputTextTwoImageUpload} from "../infoInputTwo/InputTextTwoImageUpload.jsx";
import {InputTwoTextUpload} from "../infoInputTwo/InputTwoTextUpload.jsx";
import {UploadButton} from "../infoInputTwo/UploadButton.jsx";


export const InfoInputTwo = () => {


    return (
        <div className="flex-col justify-center items-center min-h-screen w-full text-center">
            <InputTextTwoImageUpload/>
            <InputTwoTextUpload/>
            <UploadButton/>
        </div>
    )
}