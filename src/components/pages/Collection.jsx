import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CollectionTop } from "../collection/CollectionTop";
import { CollectionCenter } from "../collection/CollectionCenter";
import { useGetUserCollection } from "../../hooks/useGetUserCollection";
import { useGetSecondCollection } from "../../hooks/useGetSecondCollection";

import { resetFeedback } from "../../store/feedbackPostSlice.js";
import { resetStepTwoSelections } from "../../store/feedbackSlice.js";
import { setUuidList } from "../../store/uuidSlice.js";

import { LoadingData } from "./LoadingData.jsx";
import PrimeModal from "../PrimeModal.jsx";

export const Collection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: collectionData,
    isLoading,
    isError,
  } = useGetUserCollection(true);

  const [reconstructedData, setReconstructedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(resetFeedback());
    dispatch(resetStepTwoSelections());
  }, [dispatch]);

  useEffect(() => {
    if (!collectionData) return;

    const isEmptyList =
      !Array.isArray(collectionData.reportList) ||
      collectionData.reportList.length === 0;

    if (isEmptyList) {
      setShowModal(true);
      return;
    }

    const newObject = {
      user_uuid: collectionData.userId,
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
        hasFeedback: report.hasFeedback,
        collection: report.collection,
        createdAt: report.createdAt,
      })),
    };

    setReconstructedData(newObject);

    const uuids = newObject.user_report.map((r) => r.uuid);
    dispatch(setUuidList(uuids));
    //
    // console.log("Collection -> Original serverData:", collectionData);
    // console.log("Collection -> Reconstructed:", newObject);
  }, [collectionData, dispatch]);

  // 5) Query for second collection
  const uuidList = useSelector((state) => state.uuid.uuidList);
  const { data: secondCollectionData, isLoading: isSecondLoading } =
    useGetSecondCollection(uuidList.length > 0 ? uuidList : []);

  // 6) Handle loading / error
  if (isLoading || isSecondLoading) {
    return <LoadingData />;
  }
  if (isError) {
    return <div>Failed to load user collection.</div>;
  }

  // 7) If the user had *some* data, we built `reconstructedData`.
  //    If we STILL don't have it, we show loading again
  //    (this can happen if `collectionData` was null or undefined).
  if (!reconstructedData && !showModal) {
    return <LoadingData />;
  }

  // Close the modal => navigate home
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  // Example "disable" array
  const checkDisableList = [];

  // 8) Render
  return (
    <div className="flex-col min-h-screen w-full pt-[10px] scrollbar-hide">
      {/* If we have valid data (reconstructedData) and NO modal, render <CollectionTop> */}
      {!showModal && reconstructedData && (
        <CollectionTop
          dataOne={reconstructedData}
          isDisabledList={checkDisableList}
          arrayData={secondCollectionData}
        />
      )}

      {/* If user_report was empty, or some empty scenario => show modal */}
      <PrimeModal
        isOpen={showModal}
        title="컬렉션 조회결과"
        onClose={handleCloseModal}
      >
        <p>컬렉션으로 추가한 향이 없습니다.</p>
      </PrimeModal>
    </div>
  );
};
