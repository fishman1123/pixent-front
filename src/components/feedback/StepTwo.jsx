// src/components/stepTwo/StepTwo.jsx
import React, { useState, useEffect } from "react";
import downIcon from "../../assets/down.svg";
import PrimeModal from "../PrimeModal";
import cancelIcon from "../../assets/ax.svg";
import chartIcon from "../../assets/newchart.svg";
import reservationIcon from "../../assets/reservation.svg";
import optionData from "../../../public/data/feedbackoptions.json";
import ScentProfile from "./ScentProfile";
import { useSelector, useDispatch } from "react-redux";
import {
  resetStepTwoSelections,
  setStepTwoSelections,
} from "../../store/feedbackSlice.js";

import rawCheckboxData from "../../../public/data/checkboxData.json";
import { InfoButton } from "../InfoButton";
import { useTranslation } from "react-i18next";

import ToastModal from "../ToastModal";
import FeedBackFinal from "./FeedBackFinal.jsx";

export const StepTwo = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio);

  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [percentages, setPercentages] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [translatedData, setTranslatedData] = useState([]);

  const rawFragranceNotes = [
    {
      nameKey: "fragranceNotes.citrusName",
      contentKey: "fragranceNotes.citrusContent",
      categoryId: 1,
    },
    {
      nameKey: "fragranceNotes.floralName",
      contentKey: "fragranceNotes.floralContent",
      categoryId: 2,
    },
    {
      nameKey: "fragranceNotes.woodyName",
      contentKey: "fragranceNotes.woodyContent",
      categoryId: 3,
    },
    {
      nameKey: "fragranceNotes.muskName",
      contentKey: "fragranceNotes.muskContent",
      categoryId: 4,
    },
    {
      nameKey: "fragranceNotes.fruityName",
      contentKey: "fragranceNotes.fruityContent",
      categoryId: 5,
    },
    {
      nameKey: "fragranceNotes.spicyName",
      contentKey: "fragranceNotes.spicyContent",
      categoryId: 6,
    },
  ];

  // Dynamically translate each note name/content
  const fragranceNotes = rawFragranceNotes.map((note) => ({
    name: t(note.nameKey),
    content: t(note.contentKey),
    categoryId: note.categoryId,
    options: optionData.filter((opt) => opt.categoryId === note.categoryId),
  }));

  useEffect(() => {
    const data = rawCheckboxData.map((item) => {
      const labelTranslated = t(item.label);
      const descTranslated = t(item.description);

      const additionalInfoTranslated = item.additionalInfo.map((info) =>
        t(info),
      );
      const chartDataTranslated = item.chartData.map((d) => ({
        ...d,
        name: t(d.name),
      }));

      return {
        ...item,
        label: labelTranslated,
        description: descTranslated,
        additionalInfo: additionalInfoTranslated,
        chartData: chartDataTranslated,
      };
    });

    setTranslatedData(data);
  }, [t]);

  const resetSelections = () => {
    dispatch(resetStepTwoSelections());
    setSelectedOptions({});
    setPercentages({});
    setOpenAccordion(null);
  };

  const handleAccordionToggle = (noteName) => {
    setOpenAccordion(openAccordion === noteName ? null : noteName);
  };

  const getTotalSelectedCount = (optionsObj) =>
    Object.values(optionsObj).reduce((sum, arr) => sum + arr.length, 0);

  const getTotalPercentages = (pcts) =>
    Object.values(pcts).reduce((sum, val) => sum + (val || 0), 0);

  const removeSelection = (noteName, option) => {
    setSelectedOptions((prev) => {
      const copy = { ...prev };
      copy[noteName] = copy[noteName].filter((o) => o !== option);
      return copy;
    });
    setPercentages((prev) => {
      const copy = { ...prev };
      delete copy[option];
      return copy;
    });
  };

  const handleOptionSelect = (noteName, option) => {
    setSelectedOptions((prev) => {
      const newSelections = { ...prev };
      if (!newSelections[noteName]) newSelections[noteName] = [];

      const alreadySelected = newSelections[noteName].includes(option);
      if (alreadySelected) {
        newSelections[noteName] = newSelections[noteName].filter(
          (o) => o !== option,
        );
        setPercentages((prevP) => {
          const copy = { ...prevP };
          delete copy[option];
          return copy;
        });
      } else {
        const totalIfWeAdd = getTotalSelectedCount({
          ...prev,
          [noteName]: [...newSelections[noteName], option],
        });
        if (totalIfWeAdd > 2) {
          setModalMessage(
            "두 개 이상의 노트를 선택하실 수 없습니다. (최대 2개)",
          );
          setShowModal(true);
          return prev; // revert
        }

        newSelections[noteName] = [...newSelections[noteName], option];

        const oldPcts = { ...percentages };
        const newPcts = { ...oldPcts, [option]: 10 };

        const newTotal = getTotalPercentages(newPcts);
        if (stepOneRatio && newTotal > stepOneRatio) {
          setModalMessage(
            `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
          );
          setShowModal(true);
          return prev;
        }

        setPercentages(newPcts);
      }
      return newSelections;
    });
  };

  const adjustPercentage = (option, amount, e) => {
    e.stopPropagation();
    e.preventDefault();

    setPercentages((prev) => {
      const copy = { ...prev };
      const oldVal = copy[option] ?? 10;
      const newVal = Math.max(10, Math.min(100, oldVal + amount));
      copy[option] = newVal;

      const totalPct = getTotalPercentages(copy);
      if (stepOneRatio && totalPct > stepOneRatio) {
        copy[option] = oldVal;
        setModalMessage(
          `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
        );
        setShowModal(true);
      }
      return copy;
    });
  };

  useEffect(() => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
  }, [selectedOptions, percentages, dispatch]);

  useEffect(() => {
    return () => {
      resetSelections();
    };
  }, [dispatch]);

  // The button handler
  const handleNext = () => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));

    // Convert the entire selection to a string
    const noteNames = Object.keys(selectedOptions);
    let firstSelectedNote = "";
    if (noteNames.length > 0) {
      firstSelectedNote = noteNames[0];
    }

    console.log("DEBUG => Passing a string to onNext:", firstSelectedNote);

    setShowToast(true);
  };

  const handleBack = () => {
    resetSelections();
    onBack();
  };

  const totalUsed = getTotalPercentages(percentages);
  const leftover = stepOneRatio - totalUsed;
  const totalNotes = getTotalSelectedCount(selectedOptions);
  const canProceed = leftover <= 0 && totalNotes > 0 && stepOneRatio > 0;

  return (
    <>
      <div className="w-full">
        <h2 className="text-black text-lg mb-4">
          {t("2단계: 어떤 향을 더 강조하고 싶으신가요?")}
        </h2>

        {/* Accordion List */}
        <div className="w-full border-t border-black mt-6">
          {fragranceNotes.map((note) => {
            const isOpen = openAccordion === note.name;
            const currentSelections = selectedOptions[note.name] || [];

            // matchingData used for InfoButton
            const matchingData = translatedData.find(
              (item) => item.id === note.categoryId,
            ) || {
              label: "Unknown Data",
              description: "No data found for this category ID.",
              additionalInfo: [],
              chartData: [],
            };

            return (
              <div
                key={note.categoryId}
                className="w-full border-b border-black"
              >
                <div className="flex flex-col">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : note.name)}
                    className="w-full flex justify-between items-center pl-[4px] pr-[4px] py-3 text-[16px] font-medium bg-white text-black"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{note.name}</span>
                      <div onClick={(e) => e.stopPropagation()}>
                        <InfoButton option={matchingData} />
                      </div>
                      {currentSelections.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2">
                          {currentSelections.map((opt) => (
                            <div
                              key={opt}
                              className="bg-white text-black border border-black pl-2 text-[10px] flex items-center space-x-1"
                            >
                              <span>{opt}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSelection(note.name, opt);
                                }}
                                className="p-1"
                              >
                                <img
                                  src={cancelIcon}
                                  alt="Cancel"
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <img
                      src={downIcon}
                      alt="Chevron"
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isOpen ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                </div>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "max-h-[1000px] opacity-100 p-4 bg-white"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col space-y-2">
                    {note.options.map((optionObj) => {
                      const isSelected = currentSelections.includes(
                        optionObj.name,
                      );
                      return (
                        <div key={optionObj.id}>
                          <div className="flex flex-col bg-white justify-center text-black w-full px-4 py-2 border border-black h-[52px]">
                            <button
                              type="button"
                              className="flex justify-between items-center w-full"
                              onClick={() =>
                                handleOptionSelect(note.name, optionObj.name)
                              }
                            >
                              <div className="flex items-center space-x-2">
                                <span className="inline-block w-4 text-center">
                                  {isSelected ? "●" : ""}
                                </span>
                                <span>{optionObj.name}</span>
                              </div>
                              {isSelected && (
                                <div className="flex items-center space-x-2">
                                  <span
                                    onClick={(e) =>
                                      adjustPercentage(optionObj.name, -10, e)
                                    }
                                    className="border border-black px-3 py-1 text-black cursor-pointer"
                                  >
                                    -
                                  </span>
                                  <span className="font-bold">
                                    {percentages[optionObj.name] ?? 10}%
                                  </span>
                                  <span
                                    onClick={(e) =>
                                      adjustPercentage(optionObj.name, 10, e)
                                    }
                                    className="border border-black px-3 py-1 text-black cursor-pointer"
                                  >
                                    +
                                  </span>
                                </div>
                              )}
                            </button>
                          </div>
                          {isSelected && <ScentProfile data={optionObj} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons at the bottom */}
        <div className="px-6">
          <div className="flex justify-between mt-4">
            <div className="min-w-[140px]">
              <button
                className="noanimationbutton flex items-center justify-center w-full"
                role="button"
                onClick={handleBack}
              >
                <span className="text">이전 단계로 돌아가기</span>
                <span className="text" />
              </button>
            </div>

            <div className="w-[145px]">
              <button
                className={`noanimationbutton flex items-center justify-center w-full ${
                  canProceed
                    ? "bg-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                role="button"
                onClick={handleNext}
                disabled={!canProceed}
              >
                <span className="text">피드백 저장하기</span>
                <span className="text" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for errors */}
      <PrimeModal
        isOpen={showModal}
        title="알림"
        onClose={() => setShowModal(false)}
      >
        <p className="text-black">{modalMessage}</p>
      </PrimeModal>

      {/* the contents inside of the toast wrapper needs to be separated */}
      {showToast && (
        <ToastModal onClose={() => setShowToast(false)}>
          <FeedBackFinal />
        </ToastModal>
      )}
    </>
  );
};
