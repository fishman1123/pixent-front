// src/components/stepTwo/StepTwo.jsx

import React, { useState, useEffect } from "react";
import downIcon from "../../assets/down.svg";
import PrimeModal from "../PrimeModal";
import cancelIcon from "../../assets/ax.svg";
import optionData from "../../feedbackoptions.json";
import ScentProfile from "./ScentProfile";
import { useSelector, useDispatch } from "react-redux";
import {
  resetStepTwoSelections,
  setStepTwoSelections,
} from "../../store/feedbackSlice.js";

// 1) Import the raw JSON data
import rawCheckboxData from "../../checkboxData.json";

// 2) Import your InfoButton
import { InfoButton } from "../InfoButton";

// 3) Import i18n
import { useTranslation } from "react-i18next";

export const StepTwo = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [percentages, setPercentages] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 4) Translated JSON data state
  const [translatedData, setTranslatedData] = useState([]);

  // Prepare fragrance notes
  const fragranceNotes = [
    {
      name: "시트러스",
      content: "상큼한 과일 향이 가득한 시트러스 향.",
      categoryId: 1,
    },
    {
      name: "플로럴",
      content: "우아한 꽃향기가 조화를 이루는 플로럴 계열.",
      categoryId: 2,
    },
    {
      name: "우디",
      content: "고급스러운 나무 향이 특징인 우디 계열.",
      categoryId: 3,
    },
    { name: "머스크", content: "부드럽고 포근한 머스크 향.", categoryId: 4 },
    {
      name: "프루티",
      content: "달콤하고 신선한 과일 향이 나는 프루티 계열.",
      categoryId: 5,
    },
    {
      name: "스파이시",
      content: "강렬하고 매콤한 스파이시 향.",
      categoryId: 6,
    },
  ].map((note) => ({
    ...note,
    options: optionData.filter(
      (option) => option.categoryId === note.categoryId,
    ),
  }));

  // 5) Translate `rawCheckboxData` on mount or language change
  useEffect(() => {
    const data = rawCheckboxData.map((item) => ({
      ...item,
      label: t(item.label),
      description: t(item.description),
      additionalInfo: item.additionalInfo.map((info) => t(info)),
      chartData: item.chartData.map((d) => ({
        ...d,
        name: t(d.name),
      })),
    }));
    setTranslatedData(data);
  }, [t]);

  // Helpers
  const resetSelections = () => {
    dispatch(resetStepTwoSelections());
    setSelectedOptions({});
    setPercentages({});
    setOpenAccordion(null);
  };

  const handleAccordionToggle = (noteName) => {
    setOpenAccordion(openAccordion === noteName ? null : noteName);
  };

  // Count how many note picks are selected
  const getTotalSelectedCount = (optionsObj) =>
    Object.values(optionsObj).reduce((sum, arr) => sum + arr.length, 0);

  // Sum of all assigned percentages
  const getTotalPercentages = (pcts) =>
    Object.values(pcts).reduce((sum, val) => sum + (val || 0), 0);

  // Remove a note selection and its percentage
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

  // Select / Deselect a note
  const handleOptionSelect = (noteName, option) => {
    setSelectedOptions((prev) => {
      const newSelections = { ...prev };
      if (!newSelections[noteName]) newSelections[noteName] = [];

      const alreadySelected = newSelections[noteName].includes(option);

      if (alreadySelected) {
        // Remove the note
        newSelections[noteName] = newSelections[noteName].filter(
          (o) => o !== option,
        );
        // Also remove from percentages
        setPercentages((prevP) => {
          const copy = { ...prevP };
          delete copy[option];
          return copy;
        });
      } else {
        // Ensure total note picks won't exceed 2
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

        // Add the new note
        newSelections[noteName] = [...newSelections[noteName], option];

        // Default to 10% for that note
        const oldPcts = { ...percentages };
        const newPcts = { ...oldPcts, [option]: 10 };

        const newTotal = getTotalPercentages(newPcts);
        if (stepOneRatio && newTotal > stepOneRatio) {
          setModalMessage(
            `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
          );
          setShowModal(true);
          return prev; // revert
        }

        setPercentages(newPcts);
      }
      return newSelections;
    });
  };

  // Adjust a note's percentage
  const adjustPercentage = (option, amount, e) => {
    e.stopPropagation();
    e.preventDefault();

    setPercentages((prev) => {
      const copy = { ...prev };
      const oldVal = copy[option] ?? 10;
      let newVal = Math.max(10, Math.min(100, oldVal + amount));
      copy[option] = newVal;

      // Check if we exceed stepOneRatio
      const totalPct = getTotalPercentages(copy);
      if (stepOneRatio && totalPct > stepOneRatio) {
        // Revert
        copy[option] = oldVal;
        setModalMessage(
          `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
        );
        setShowModal(true);
      }
      return copy;
    });
  };

  // Sync to Redux
  useEffect(() => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
  }, [selectedOptions, percentages, dispatch]);

  // Reset if unmounted
  useEffect(() => {
    return () => {
      resetSelections();
    };
  }, [dispatch]);

  // Step navigation
  const handleNext = () => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
    onNext(selectedOptions, percentages);
  };

  const handleBack = () => {
    resetSelections();
    onBack();
  };

  // =========== KEY CHANGE: "canProceed" if leftover is 0 OR bigNumber is 100 ===========
  // leftover = stepOneRatio - totalUsed
  const totalUsed = getTotalPercentages(percentages);
  const leftover = stepOneRatio - totalUsed;

  // If leftover <= 0 => means we've hit or exceeded 100% of the target
  // Also require at least one note has been selected
  const totalNotes = getTotalSelectedCount(selectedOptions);
  const canProceed = leftover <= 0 && totalNotes > 0 && stepOneRatio > 0;

  return (
    <>
      <div className="w-full">
        <h2 className="text-black text-lg mb-4">
          2단계: 어떤 향을 더 강조하고 싶으신가요?
        </h2>

        {/* Accordion List */}
        <div className="w-full border-t border-black mt-6">
          {fragranceNotes.map((note) => {
            const isOpen = openAccordion === note.name;
            const currentSelections = selectedOptions[note.name] || [];

            // Find the matching data in the translated array
            const matchingData = translatedData.find(
              (item) => item.id === note.categoryId,
            ) || {
              label: "Unknown Data",
              description: "No data found for this category ID.",
              additionalInfo: [],
              chartData: [],
            };

            return (
              <div key={note.name} className="w-full border-b border-black">
                {/* Accordion Header */}
                <div className="flex flex-col">
                  <button
                    onClick={() => handleAccordionToggle(note.name)}
                    className="w-full flex justify-between items-center pl-[4px] pr-[4px] py-3 text-[16px] font-medium bg-white text-black"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{note.name}</span>
                      {/* InfoButton */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <InfoButton option={matchingData} />
                      </div>
                      {/* Selected "chips" */}
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
                            {/* The button to select/deselect */}
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
                          {/* Show ScentProfile if selected */}
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

        {/* Bottom Buttons */}
        <div className="px-6">
          <div className="flex justify-between mt-4">
            {/* Go Back */}
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

            {/* Next / Save Feedback */}
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
    </>
  );
};
