// src/components/stepTwo/StepTwo.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetStepTwoSelections,
  setStepTwoSelections,
} from "../../store/feedbackSlice.js";
import {
  addFeedbackElement,
  removeFeedbackElement,
  updateFeedbackElement,
  resetFeedback,
} from "../../store/feedbackPostSlice.js";
import { usePostFeedbackReport } from "../../hooks/usePostFeedbackReport.js";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ToastModal from "../ToastModal";
import FeedBackFinal from "./FeedBackFinal.jsx";
import ScentProfile from "./ScentProfile";
import PrimeModal from "../PrimeModal";
import downIcon from "../../assets/down.svg";
import cancelIcon from "../../assets/ax.svg";
import optionData from "../../data/feedbackchoice.json";
import rawCheckboxData from "../../data/checkboxdata.json";
import { InfoButton } from "../InfoButton";

export const StepTwo = ({ onBack, reportId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = usePostFeedbackReport();

  // Redux state
  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio);
  const feedbackElement = useSelector(
    (state) => state.feedbackPost.feedbackElement,
  );

  // Local UI state
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [percentages, setPercentages] = useState({});

  // Modal
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Data
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

  const fragranceNotes = rawFragranceNotes.map((note) => ({
    name: t(note.nameKey),
    content: t(note.contentKey),
    categoryId: note.categoryId,
    options: optionData.filter((opt) => opt.categoryId === note.categoryId),
  }));

  // Translate your checkbox data
  useEffect(() => {
    const data = rawCheckboxData.map((item) => {
      return {
        ...item,
        label: t(item.label),
        description: t(item.description),
        additionalInfo: item.additionalInfo.map((info) => t(info)),
        chartData: item.chartData.map((d) => ({ ...d, name: t(d.name) })),
      };
    });
    setTranslatedData(data);
  }, [t]);

  // Helper: total selected across all categories
  const getTotalSelectedCount = (optionsObj) =>
    Object.values(optionsObj).reduce((sum, arr) => sum + arr.length, 0);

  // Helper: sum of all percentages
  const getTotalPercentages = (pcts) =>
    Object.values(pcts).reduce((sum, val) => sum + (val || 0), 0);

  // Accordion expand/collapse
  const handleAccordionToggle = (noteName) => {
    setOpenAccordion(openAccordion === noteName ? null : noteName);
  };

  // Remove a previously selected note
  const removeSelection = (noteName, option) => {
    // Remove from local state
    setSelectedOptions((prev) => {
      const copy = { ...prev };
      if (copy[noteName]) {
        copy[noteName] = copy[noteName].filter((o) => o !== option);
        // Clean up empty array
        if (!copy[noteName].length) {
          delete copy[noteName];
        }
      }
      return copy;
    });

    // Remove from local percentages
    setPercentages((prev) => {
      const copy = { ...prev };
      delete copy[option];
      return copy;
    });

    // Remove from Redux feedbackElement
    const index = feedbackElement.findIndex((el) => el.elementName === option);
    if (index !== -1) {
      dispatch(removeFeedbackElement(index));
    }
  };

  // Select or unselect an option
  const handleOptionSelect = (noteName, option) => {
    const newSelections = { ...selectedOptions };
    const newPercentages = { ...percentages };
    newSelections[noteName] = [...(newSelections[noteName] || [])];
    let actionToDispatch = null;

    const alreadySelected = newSelections[noteName].includes(option);

    if (alreadySelected) {
      // If it's already selected, unselect it
      removeSelection(noteName, option);
      return; // We can exit early
    } else {
      // Count how many total are currently selected
      const totalSelected = getTotalSelectedCount(selectedOptions);

      // If user already has 2 selected, show error and do nothing
      if (totalSelected >= 2) {
        setModalMessage("노트는 최대 2개까지 선택할 수 있습니다.");
        setShowModal(true);
        return;
      }

      // Otherwise proceed to select
      newSelections[noteName].push(option);
      newPercentages[option] = 10;

      // Check if total percentages would exceed user-specified ratio
      const newTotal = getTotalPercentages(newPercentages);
      if (stepOneRatio && newTotal > stepOneRatio) {
        setModalMessage(
          `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
        );
        setShowModal(true);
        return;
      }

      // Check if feedbackElement has that option
      const existingIndex = feedbackElement.findIndex(
        (el) => el.elementName === option,
      );
      if (existingIndex !== -1) {
        // If it already exists, just update ratio
        actionToDispatch = updateFeedbackElement({
          index: existingIndex,
          elementRatio: 10,
        });
      } else {
        // If it doesn't exist, find an empty slot
        const emptyIndex = feedbackElement.findIndex(
          (el) => el.elementName === "",
        );
        if (emptyIndex !== -1) {
          actionToDispatch = updateFeedbackElement({
            index: emptyIndex,
            elementName: option,
            elementRatio: 10,
          });
        }
      }

      // Update local state
      setSelectedOptions(newSelections);
      setPercentages(newPercentages);

      // Update Redux if needed
      if (actionToDispatch) {
        dispatch(actionToDispatch);
      }
    }
  };

  // Adjust a selected note's percentage
  const adjustPercentage = (option, amount, e) => {
    e.stopPropagation();
    e.preventDefault();

    setPercentages((prev) => {
      const copy = { ...prev };
      const oldVal = copy[option] ?? 10;
      const newVal = Math.max(10, Math.min(100, oldVal + amount));
      copy[option] = newVal;

      // Check if new total exceeds user ratio
      const totalPct = getTotalPercentages(copy);
      if (stepOneRatio && totalPct > stepOneRatio) {
        copy[option] = oldVal; // revert
        setModalMessage(
          `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
        );
        setShowModal(true);
      } else {
        // Otherwise update Redux
        const index = feedbackElement.findIndex(
          (el) => el.elementName === option,
        );
        if (index !== -1) {
          dispatch(updateFeedbackElement({ index, elementRatio: newVal }));
        }
      }
      return copy;
    });
  };

  // Sync local state to Redux
  useEffect(() => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
  }, [selectedOptions, percentages, dispatch]);

  // Reset everything
  const resetSelections = () => {
    dispatch(resetStepTwoSelections());
    dispatch(resetFeedback());
    setSelectedOptions({});
    setPercentages({});
    setOpenAccordion(null);
  };

  // "Back" button
  const handleBack = () => {
    resetSelections();
    onBack();
  };

  // "Next" or "Save" button
  const handleNext = () => {
    if (!reportId) {
      setModalMessage("Report ID가 없습니다.");
      setShowModal(true);
      return;
    }

    mutate(reportId, {
      onSuccess: () => {
        navigate("/", { state: { from: "/feedback" } });
      },
      onError: (error) => {
        console.error("Error submitting feedback:", error);
        setModalMessage("피드백 제출 중 오류가 발생했습니다.");
        setShowModal(true);
      },
    });
  };

  // For enabling/disabling the "Save" button
  const totalUsed = getTotalPercentages(percentages);
  const leftover = stepOneRatio - totalUsed;
  const totalNotes = getTotalSelectedCount(selectedOptions);
  // Only allow "Save" if we've used the entire ratio (leftover <= 0)
  // AND we have at least 1 note selected,
  // AND there's a stepOneRatio in place
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

            // For the InfoButton content
            const matchingData = translatedData.find(
              (item) => item.id === note.categoryId,
            ) || {
              label: "Unknown Data",
              description: "No data found.",
              additionalInfo: [],
              chartData: [],
            };

            return (
              <div
                key={note.categoryId}
                className="w-full border-b border-black"
              >
                {/* Accordion Header */}
                <div className="flex flex-col">
                  <button
                    onClick={() => handleAccordionToggle(note.name)}
                    className="w-full flex justify-between items-center pl-[4px] h-[50px] pr-[4px] py-3 text-[16px] font-medium bg-white text-black"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{note.name}</span>
                      {/* InfoButton - stops click from closing/opening accordion */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <InfoButton option={matchingData} />
                      </div>

                      {/* Display currently selected items for this category */}
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

                    {/* Chevron icon */}
                    <img
                      src={downIcon}
                      alt="Chevron"
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isOpen ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                </div>

                {/* Accordion Body */}
                <div
                  // className={`overflow-hidden transition-all duration-500 ${
                  //transition 임시제거
                  className={`overflow-hidden ${
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

                              {/* If selected, show +/- to adjust percentage */}
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

                          {/* Scent profile if selected */}
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

        {/* Bottom Nav Buttons */}
        <div className="px-6">
          <div className="flex justify-between mt-4">
            <div className="min-w-[140px]">
              <button
                className="noanimationbutton flex items-center justify-center w-full"
                role="button"
                onClick={handleBack}
              >
                <span className="text">이전 단계로 돌아가기</span>
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
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
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
