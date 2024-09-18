export const IntroCenter = () => {
    return (
        <div className="relative flex items-center justify-center w-full my-8">
            {/* Left Line with 20px gap on the left */}
            <div className="h-[1px] w-full bg-gray-400 ml-[20px]" />

            {/* Diamond */}
            <div className="absolute bg-white border border-gray-400 h-4 w-4 transform rotate-45" />

            {/* Right Line with 20px gap on the right */}
            <div className="h-[1px] w-full bg-gray-400 mr-[20px]" />
        </div>
    );
};
