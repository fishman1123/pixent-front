// src/components/PersonalAgreement.jsx

import React from 'react';

export const PersonalAgreement = () => {
    return (
        <div className="text-left">
            <h1 className="text-xl pb-4">개인정보처리방침</h1>
            <p>
                주식회사 네안데르(이하 '회사'라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와
                관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립,
                공개합니다.
            </p>

            <h2 className="pt-4">제1조 (개인정보의 처리목적)</h2>
            <p>
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
                조치를 이행할 예정입니다.
            </p>

            <ol className="list-decimal list-inside pl-4 pt-2">
                <li className="pt-2">
                    <strong>홈페이지 회원 가입 및 관리</strong>
                    <ul className="list-disc list-inside pl-4 pt-2">
                        <li>회원 가입 의사 확인</li>
                        <li>회원제 서비스 제공에 따른 본인 식별․인증</li>
                        <li>회원자격 유지․관리</li>
                        <li>서비스 부정 이용 방지</li>
                        <li>만 14세 미만 아동의 개인정보처리 시 법정대리인의 동의 여부 확인</li>
                        <li>각종 고지․통지, 고충 처리</li>
                    </ul>
                </li>
                <li className="pt-2">
                    <strong>재화 또는 서비스 제공</strong>
                    <ul className="list-disc list-inside pl-4 pt-2">
                        <li>물품 배송</li>
                        <li>서비스 제공</li>
                        <li>계약서 및 청구서 발송</li>
                        <li>AI 기반 맞춤형 향수 추천 서비스 제공</li>
                        <li>이용자 이미지 분석을 통한 개인화된 제품 추천</li>
                        <li>본인인증</li>
                        <li>요금 결제 및 정산</li>
                        <li>채권추심</li>
                    </ul>
                </li>
                <li className="pt-2">
                    <strong>고충 처리</strong>
                    <ul className="list-disc list-inside pl-4 pt-2">
                        <li>민원인의 신원 확인</li>
                        <li>민원사항 확인</li>
                        <li>사실조사를 위한 연락․통지</li>
                        <li>처리 결과 통보</li>
                    </ul>
                </li>
            </ol>

            <h2 className="pt-4">제2조 (개인정보의 처리 및 보유기간)</h2>
            <p>
                ① 회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보
                보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.
            </p>
            <p>
                ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </p>

            <ol className="list-decimal list-inside pl-4 pt-2">
                <li className="pt-2">
                    <strong>홈페이지 회원 가입 및 관리</strong>: 사업자/단체 홈페이지 탈퇴 시까지
                    <p>
                        다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
                    </p>
                    <ol className="list-decimal list-inside pl-4 pt-2">
                        <li>
                            관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지
                        </li>
                        <li>
                            홈페이지 이용에 따른 채권 및 채무관계 잔존 시에는 해당 채권, 채무 관계 정산 시까지
                        </li>
                    </ol>
                </li>
                <li className="pt-2">
                    <strong>재화 또는 서비스 제공</strong>: 재화․서비스 공급완료 및 요금결제․정산 완료 시까지
                    <p>
                        다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지
                    </p>
                    <ol className="list-decimal list-inside pl-4 pt-2">
                        <li>
                            「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시․광고, 계약내용 및 이행 등 거래에 관한
                            기록
                            <ul className="list-disc list-inside pl-4 pt-2">
                                <li>표시․광고에 관한 기록 : 6월</li>
                                <li>계약 또는 청약 철회, 대금결제, 재화 등의 공급기록 : 5년</li>
                                <li>소비자 불만 또는 분쟁 처리에 관한 기록 : 3년</li>
                            </ul>
                        </li>
                        <li>
                            「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관
                            <ul className="list-disc list-inside pl-4 pt-2">
                                <li>
                                    가입자 전기통신일시, 개시․종료 시간, 상대방 가입자 번호, 사용도수, 발신기지국 위치추적자료 :
                                    1년
                                </li>
                                <li>컴퓨터 통신, 인터넷 로그 기록자료, 접속지 추적자료 : 3개월</li>
                            </ul>
                        </li>
                    </ol>
                </li>
                <li className="pt-2">
                    <strong>AI 분석용 이미지 데이터</strong>: 분석 완료 즉시 파기
                </li>
            </ol>

            <h2 className="pt-4">제3조 (개인정보의 제3자 제공)</h2>
            <p>
                ① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며,
                정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를
                제3자에게 제공합니다.
            </p>
            <p>
                ② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
            </p>
            <ul className="list-disc list-inside pl-4 pt-2">
                <li>개인정보를 제공받는 자 : 현재 없음</li>
                <li>제공받는 자의 개인정보 이용목적 : 현재 없음</li>
                <li>제공하는 개인정보 항목 : 현재 없음</li>
                <li>제공받는 자의 보유, 이용기간 : 현재 없음</li>
            </ul>

            <h2 className="pt-4">제5조(이용자 및 법정대리인의 권리와 그 행사 방법)</h2>
            <p>
                ① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ol className="list-decimal list-inside pl-4 pt-2">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제요구</li>
                <li>처리정지 요구</li>
            </ol>
            <p>
                ② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며
                회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
            <p>
                ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할
                때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
            </p>
            <p>
                ④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.
                이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </p>

            <h2 className="pt-4">제6조(처리하는 개인정보 항목)</h2>
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <ol className="list-decimal list-inside pl-4 pt-2">
                <li className="pt-2">
                    <strong>홈페이지 회원 가입 및 관리</strong>
                    <ul className="list-disc list-inside pl-4 pt-2">
                        <li>필수항목 : 성명, 연락처, 이메일 주소, 성별</li>
                        <li>선택항목 : 없음</li>
                    </ul>
                </li>
                <li className="pt-2">
                    <strong>재화 또는 서비스 제공</strong>
                    <ul className="list-disc list-inside pl-4 pt-2">
                        <li>필수항목 :</li>
                        <ul className="list-disc list-inside pl-4">
                            <li>성명, 연락처, 이메일주소, 아이디, 비밀번호, 주소</li>
                            <li>신용카드번호 및 은행계좌정보 등 결제정보</li>
                            <li>
                                서비스 이용 시 제공하는 이용자 이미지 데이터
                                <br />
                                (AI 기반 맞춤형 향수 추천을 위한 분석 용도로만 사용되며, 분석 완료 후 즉시 파기)
                            </li>
                        </ul>
                        <li>선택항목 : 관심분야, 과거 구매내역</li>
                    </ul>
                </li>
                <li className="pt-2">
                    <strong>인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.</strong>
                    <ul className="list-disc list-inside pl-4 pt-2">
                        <li>IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등</li>
                    </ul>
                </li>
            </ol>

            <h2 className="pt-4">제7조(개인정보의 파기)</h2>
            <p>
                ① 회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
                개인정보를 파기합니다.
            </p>
            <p>
                ② 정보주체로부터 동의받은 개인정보 보유 기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에
                따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나
                보관장소를 달리하여 보존합니다.
            </p>
            <p>
                ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
            </p>
            <ol className="list-decimal list-inside pl-4 pt-2">
                <li className="pt-2">
                    <strong>파기 절차</strong>
                    <p>
                        회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를
                        파기합니다.
                    </p>
                </li>
                <li className="pt-2">
                    <strong>파기 방법</strong>
                    <p>
                        회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 로우레밸포멧(Low Level
                        Format) 등의 방법을 이용하여 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나
                        소각하여 파기합니다.
                    </p>
                </li>
            </ol>
            <p>
                ④ <strong>AI 분석용 이미지 데이터의 처리</strong>
            </p>
            <ul className="list-disc list-inside pl-4 pt-2">
                <li>이용자가 제공한 이미지는 향수 추천을 위한 AI 분석 완료 후 즉시 파기됩니다</li>
                <li>
                    AI 분석 결과값은 이용자 식별이 불가능한 형태로 서비스 개선 목적으로만 활용될 수 있습니다
                </li>
            </ul>

            <h2 className="pt-4">제8조(개인정보의 안전성 확보조치)</h2>
            <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.</p>
            <ol className="list-decimal list-inside pl-4 pt-2">
                <li>관리적 조치 : 내부관리계획 수립 및 시행, 정기적 직원 교육 등</li>
                <li>
                    기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근통제시스템 설치, 고유 식별정보 등의 암호화,
                    보안프로그램 설치
                </li>
                <li>물리적 조치 : 전산실, 자료보관실 등의 접근통제</li>
            </ol>

            <h2 className="pt-4">
                제9조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)
            </h2>
            <p>
                ① 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는
                '쿠키(cookie)'를 사용합니다.
            </p>
            <p>
                ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며
                이용자들의 컴퓨터 내의 하드디스크에 저장되기도 합니다.
            </p>
            <ul className="list-disc list-inside pl-4 pt-2">
                <li>
                    쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어,
                    보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                </li>
                <li>
                    쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을
                    통해 쿠키 저장을 거부 할 수 있습니다.
                </li>
                <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
            </ul>
            <p>
                ③ <strong>AI 기반 서비스 제공에 관한 사항</strong>
            </p>
            <ul className="list-disc list-inside pl-4 pt-2">
                <li>AI 분석의 목적: 이용자 맞춤형 향수 추천 서비스 제공</li>
                <li>수집하는 정보: 이용자가 제공하는 이미지 데이터</li>
                <li>보관 및 파기: 분석 완료 후 즉시 파기</li>
                <li>
                    이용자 권리: 이용자는 언제든지 AI 분석을 위한 이미지 제공을 거부할 수 있으며, 이 경우 AI 기반 맞춤형
                    추천 서비스 이용이 제한될 수 있습니다
                </li>
            </ul>

            <h2 className="pt-4">제10조(개인정보 보호책임자)</h2>
            <p>
                ① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <p>
                ▶ 개인정보 보호책임자
                <br />
                성명 : 유재영
                <br />
                직책 : 대표자
                <br />
                연락처 : ok@neander.co.kr
            </p>
            <p>
                ② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리,
                피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의
                문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
            </p>

            <h2 className="pt-4">제11조(개인정보 열람청구)</h2>
            <p>
                정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는
                정보주체의 개인정보 열람 청구가 신속하게 처리되도록 노력하겠습니다.
            </p>
            <p>
                ▶ 개인정보 열람청구 접수․처리 부서
                <br />
                부서명 : 웹관리팀
                <br />
                담당자 : 이동주
                <br />
                연락처 : movingzoo@neander.co.kr
            </p>

            <h2 className="pt-4">제12조(권익침해 구제 방법)</h2>
            <p>
                정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
            </p>
            <p>
                ▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)
                <br />
                소관 업무 : 개인정보 침해사실 신고, 상담 신청
                <br />
                홈페이지 : privacy.kisa.or.kr
                <br />
                전화 : (국번없이) 118
                <br />
                주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터
            </p>
            <p>
                ▶ 개인정보 분쟁조정위원회
                <br />
                소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
                <br />
                홈페이지 : www.kopico.go.kr
                <br />
                전화 : (국번없이) 1833-6972
                <br />
                주소 : (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층
            </p>
            <p>
                ▶ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)
                <br />
                ▶ 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)
            </p>

            <h2 className="pt-4">제13조(개인정보 처리방침 시행 및 변경)</h2>
            <p>이 개인정보 처리방침은 2024. 6. 1부터 적용됩니다.</p>
        </div>
    );
};
