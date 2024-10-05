

export const TipBox = () => {
    return (
        <>
            <div className="text-left text-[14px] ml-5 mr-5 pl-2 pt-4 pb-4 bg-[#F8F8F8]">
                <div className="font-bold ">시리얼 코드는 일회성입니다.</div>
                <div className="mt-3">
                    <div>만약 시리얼 코드가 없다면,</div>
                    <div>직원에게 문의 부탁드립니다.</div>
                </div>
            </div>
            <div className="text-left text-[14px] mt-4 ml-5 mr-5 pl-2 pt-4 pb-4 bg-[#F8F8F8]">
                <div className="font-bold ">보고서 생성중에 새로고침을 하시면 안됩니다.</div>
                <div className="mt-3">
                    <div>실수로 새로고침/브라우저를 닫으셨다면,</div>
                    <div>직원에게 문의 부탁드립니다</div>
                </div>
            </div>
            <div className="text-left text-[14px] mt-4 ml-5 mr-5 mb-2 pl-2 pt-4 pb-4 bg-[#F8F8F8]">
                <div className="font-bold ">시리얼 코드는 아래의 사항들을 참고하세요</div>
                <div className="mt-3">
                    <div>주문내역 / 주문번호 / 주문알림 이메일</div>
                    <div>도움은 직원에게 문의 부탁 드립니다.</div>
                </div>
            </div>
        </>

    )
}