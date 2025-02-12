import { CollectionTop } from "../collection/CollectionTop.jsx";
import { CollectionCenter } from "../collection/CollectionCenter.jsx";

export const Collection = () => {
  const dummyDataOne = {
    user_uuid: "10101010", //user_id
    user_report: [
      {
        user_uuid: "10101010", //user_id
        id: 451,
        userName: "카리나",
        perfumeName: "AC'SCENT17",
        mainNote: "레몬페퍼",
        middleNote: "인센스",
        baseNote: "오리스",
        userImageUrl:
          "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2025-02-05-16-15-28-asdasd.jpg",
        citrus: 10,
        floral: 10,
        woody: 70,
        musk: 10,
        fruity: 10,
        spicy: 70,
        uuid: "xxxxxxxxx",
        hasfeedback: true,
        hasCollection: true,
        createdAt: "2025-02-05T00:00:00.000Z",
      },
      {
        id: 452,
        userName: "아리아",
        perfumeName: "AC'SCENT12",
        mainNote: "로즈마리",
        middleNote: "화이트 머스크",
        baseNote: "샌달우드",
        userImageUrl:
          "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2025-02-05-16-15-28-asdasd.jpg",
        citrus: 30,
        floral: 50,
        woody: 40,
        musk: 60,
        fruity: 20,
        spicy: 20,
        uuid: "yyyyyyyyy",
        hasfeedback: true,
        hasCollection: true,
      },
      {
        id: 453,
        userName: "아메리카",
        perfumeName: "AC'SCENT13",
        mainNote: "로즈마리",
        middleNote: "화이트 머스크",
        baseNote: "샌달우드",
        userImageUrl:
          "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2025-02-05-16-15-28-asdasd.jpg",
        citrus: 10,
        floral: 10,
        woody: 10,
        musk: 90,
        fruity: 10,
        spicy: 10,
        uuid: "yyyyyyyyy",
        hasfeedback: false,
        hasCollection: true,
      },
    ],
  };
  const dummyDataTwo = {
    user_uuid: "10101010", //user_id
    user_report: [
      {
        user_uuid: "10101010", //user_id
        id: 451,
        subId: 45101,
        userName: "카리나",
        perfumeName: "AC'SCENT17.1",
        hasfeedback: false,
        feedbackelement: [
          {
            elementName: "AC'SCENT17",
            elementRatio: 75,
          },
          {
            elementName: "시더우드",
            elementRatio: 15,
          },
          {
            elementName: "시티은행",
            elementRatio: 10,
          },
        ],
        citrus: 60,
        floral: 10,
        woody: 80,
        musk: 30,
        fruity: 10,
        spicy: 70,
        createdAt: "2025-02-05T00:00:00.000Z",
      },
      {
        user_uuid: "10101010",
        id: 452,
        subId: 45201,
        userName: "아리아",
        perfumeName: "AC'SCENT12.1",
        hasfeedback: true,
        feedbackelement: [
          {
            elementName: "AC'SCENT12",
            elementRatio: 75,
          },
          {
            elementName: "시더우드",
            elementRatio: 15,
          },
          {
            elementName: "시티은행",
            elementRatio: 10,
          },
        ],
        citrus: 30,
        floral: 50,
        woody: 40,
        musk: 60,
        fruity: 20,
        spicy: 40,
        createdAt: "2025-02-05T00:00:00.000Z",
      },
      {
        user_uuid: "10101010",
        id: 452,
        subId: 45202,
        userName: "아리아",
        perfumeName: "AC'SCENT12.2",
        hasfeedback: true,
        feedbackelement: [
          {
            elementName: "AC'SCENT12",
            elementRatio: 75,
          },
          {
            elementName: "시더우드",
            elementRatio: 15,
          },
          {
            elementName: "시티은행",
            elementRatio: 10,
          },
        ],
        citrus: 10,
        floral: 10,
        woody: 10,
        musk: 90,
        fruity: 90,
        spicy: 90,
        createdAt: "2025-02-05T00:00:00.000Z",
      },
      {
        user_uuid: "10101010",
        id: 452,
        subId: 45203,
        userName: "아리아",
        perfumeName: "AC'SCENT12.3",
        hasfeedback: false,
        feedbackelement: [
          {
            elementName: "AC'SCENT12",
            elementRatio: 75,
          },
          {
            elementName: "시더우드",
            elementRatio: 15,
          },
          {
            elementName: "시티은행",
            elementRatio: 10,
          },
        ],
        citrus: 10,
        floral: 90,
        woody: 90,
        musk: 90,
        fruity: 90,
        spicy: 90,
        createdAt: "2025-02-05T00:00:00.000Z",
      },
    ],
  };

  return (
    <div className="flex-col min-h-screen w-full pt-[10px] scrollbar-hide">
      <CollectionTop dataOne={dummyDataOne} dataTwo={dummyDataTwo} />
    </div>
  );
};
