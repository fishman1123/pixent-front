export const Footer = () => {
  return (
    <footer className="bg-white text-white">
      <div className="w-full border-t border-gray-300 py-[38px] flex-col pl-7">
        <div className="flex-col">
          <p className="text-black">NEANDER CO.,LTD</p>
          <p className="text-gray-400 text-[14px]">AC'SCENT</p>
        </div>
        <div className="flex mt-[30px]">
          <div className="text-black text-[14px] mr-20 xs:mr-5">
            <p>TERMS OF SERVICES</p>
            <p>PRIVACY POLICY</p>
          </div>
          <div className="text-gray-400 text-[14px]">
            <p>이용약관</p>
            <p>개인정보처리방침</p>
          </div>
        </div>
        <div className="flex-col mt-[30px] text-black text-[14px]">
          <p>SNS</p>
          <p className="text-gray-400">INSTAGRAM @AC_SCENT</p>
        </div>
        <div className="flex-col mt-[30px] text-black text-[14px]">
          <p>CONTACT</p>
          <p className="text-gray-400">T. 02-336-3368</p>
          <p className="text-gray-400">E. neander@neander.co.kr</p>
        </div>
        <div className="flex-col mt-[30px] text-black text-[14px]">
          <div>
            <p>HONGDAE STORE</p>
            <p className="text-gray-400">
              서울특별시 마포구 와우산로29라길 22 지하 1층
            </p>
          </div>
          <div className="mt-[30px]">
            <p className="text-gray-400">Business License. 683-86-02812</p>
            <p className="text-gray-400 pt-1">
              통신판매신고번호: 2033-서울서대문-1558
            </p>
            <p className="text-gray-400 pt-1">CEO. 유재영, 이동주</p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-300 text-center py-[38px] flex-col">
        <p className="text-gray-400">© 2024 AC'SCENT. All rights reserved.</p>
        <p className="text-gray-400">A BRAND BY NEANDER CO.LTD</p>
      </div>
    </footer>
  );
};
