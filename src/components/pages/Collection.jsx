// Collection.jsx
import React, { useEffect, useState } from "react";
import { CollectionTop } from "../collection/CollectionTop";
import { CollectionCenter } from "../collection/CollectionCenter";
import { useGetUserCollection } from "../../hooks/useGetUserCollection";
import { useDispatch } from "react-redux";
import { resetFeedback } from "../../store/feedbackPostSlice.js";
import { resetStepTwoSelections } from "../../store/feedbackSlice.js";

export const Collection = () => {
  // 1) Fetch data from /api/user/report/collection
  const {
    data: collectionData,
    isLoading,
    isError,
  } = useGetUserCollection(true);
  const dispatch = useDispatch();
  // 1) Reset feedback slices as soon as user arrives here
  useEffect(() => {
    // Clear out any leftover data from a previous feedback session
    dispatch(resetFeedback());
    dispatch(resetStepTwoSelections());
  }, [dispatch]);

  // 2) We'll store our reconstructed data in local state
  const [reconstructedData, setReconstructedData] = useState(null);

  // 3) Once collectionData is available, reconstruct it in useEffect
  useEffect(() => {
    if (!collectionData) return;

    // Reconstruct data object in "dummyDataOne" style
    const newObject = {
      user_uuid: collectionData.userId, // from 'userId'
      user_report: collectionData.reportList.map((report) => ({
        id: report.id,
        userName: report.userName,
        perfumeName: report.perfumeName,
        mainNote: report.mainNote,
        middleNote: report.middleNote,
        baseNote: report.baseNote,
        userImageUrl: report.userImageUrl,
        citrus: report.citrus,
        floral: report.floral,
        woody: report.woody,
        musk: report.musk,
        fruity: report.fruity,
        spicy: report.spicy,
        uuid: report.uuid,
        hasFeedback: report.hasFeedback, // rename 'hasFeedback' to 'hasfeedback' if needed
        collection: report.collection, // rename 'collection' to 'hasCollection' if needed
        createdAt: report.createdAt,
      })),
    };

    // Store it in state
    setReconstructedData(newObject);

    // Log both the server data & reconstructed object
    console.log("Collection -> Original serverData:", collectionData);
    console.log("Collection -> Reconstructed (dummyDataOne style):", newObject);
  }, [collectionData]);

  // 4) Handle loading / error states
  if (isLoading) return <div>Loading user collection...</div>;
  if (isError) return <div>Failed to load user collection.</div>;

  // 5) Our existing dummy data
  const dummyDataOne = {
    user_uuid: "10101010",
    user_report: [
      {
        user_uuid: "10101010",
        id: 450,
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
        user_uuid: "10101010",
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
    user_uuid: "10101010",
    user_report: [
      {
        user_uuid: "10101010",
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

  // 6) Log your dummy data as well
  // console.log("Collection -> dummyDataOne:", dummyDataOne);
  // console.log("Collection -> dummyDataTwo:", dummyDataTwo);

  // 7) If reconstructedData is still null (before useEffect runs), handle that
  if (!reconstructedData) {
    // Possibly show a small loading or "no data" message
    return <div>Reconstructing collection data...</div>;
  }

  // 8) Render
  return (
    <div className="flex-col min-h-screen w-full pt-[10px] scrollbar-hide">
      {/* Now pass your dummyDataOne or reconstructedData to your child components */}
      {/*<CollectionTop dataOne={dummyDataOne} dataTwo={dummyDataTwo} />*/}

      <CollectionTop dataOne={reconstructedData} dataTwo={dummyDataTwo} />
    </div>
  );
};
