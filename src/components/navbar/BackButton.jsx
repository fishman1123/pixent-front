import backIcon from "../../assets/leftarrow.svg";


export const BackButton = () => {

    return (
        <>
            <div className="relative ml-[4px] mt-[4px]">
                {/* Translator Icon with Dropdown */}
                <button
                    className="text-black focus:ring-4 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    <img
                        src={backIcon}
                        alt="Back Icon"
                        className="w-7 h-7"
                    />
                </button>
            </div>
        </>
    )
}