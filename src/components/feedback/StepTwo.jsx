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

// UI etc.
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

  // Redux
  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio);
  const feedbackElement = useSelector(
    (state) => state.feedbackPost.feedbackElement,
  );

  // Local states
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [percentages, setPercentages] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // If you want to show a local toast before the redirect, keep it here
  // but in your requirement, you want to show the toast after you arrive at "/"
  // So we won't show it here. Instead we navigate with state.
  // const [showToast, setShowToast] = useState(false);

  const [translatedData, setTranslatedData] = useState([]);

  // Example fragrance notes
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

  useEffect(() => {
    // Translate your checkbox data
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

  // Helpers
  const getTotalSelectedCount = (optionsObj) =>
    Object.values(optionsObj).reduce((sum, arr) => sum + arr.length, 0);
  const getTotalPercentages = (pcts) =>
    Object.values(pcts).reduce((sum, val) => sum + (val || 0), 0);

  // Cleanup
  const resetSelections = () => {
    dispatch(resetStepTwoSelections());
    dispatch(resetFeedback());
    setSelectedOptions({});
    setPercentages({});
    setOpenAccordion(null);
  };

  // Toggle
  const handleAccordionToggle = (noteName) => {
    setOpenAccordion(openAccordion === noteName ? null : noteName);
  };

  // Remove selection
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

  // Add/Remove sub-options
  const handleOptionSelect = (noteName, option) => {
    // 1) Make shallow copies of local states so we can modify them safely
    const newSelections = { ...selectedOptions };
    // Also clone the specific array to avoid mutating the original
    newSelections[noteName] = [...(newSelections[noteName] || [])];

    const newPercentages = { ...percentages };

    // 2) We’ll decide what to dispatch at the end
    let actionToDispatch = null;

    // Check if the option is already selected
    const alreadySelected = newSelections[noteName].includes(option);

    if (alreadySelected) {
      // Deselect
      newSelections[noteName] = newSelections[noteName].filter(
        (o) => o !== option,
      );
      delete newPercentages[option];

      // Find index in the feedbackElement slice
      const index = feedbackElement.findIndex(
        (el) => el.elementName === option,
      );
      if (index !== -1) {
        actionToDispatch = removeFeedbackElement(index);
      }
    } else {
      // Limit selection to 2
      if (feedbackElement.filter((el) => el.elementName !== "").length >= 2) {
        setModalMessage("두 개 이상의 노트를 선택하실 수 없습니다. (최대 2개)");
        setShowModal(true);
        return; // Important: Exit early, no local state or dispatch
      }

      // Add new option locally
      newSelections[noteName].push(option);
      newPercentages[option] = 10;

      // Check ratio limit
      const newTotal = getTotalPercentages(newPercentages);
      if (stepOneRatio && newTotal > stepOneRatio) {
        setModalMessage(
          `사용자 지정 비율(${stepOneRatio}%)을 초과할 수 없습니다.`,
        );
        setShowModal(true);
        return; // Exit early again
      }

      // Update or add in Redux feedbackElement
      const existingIndex = feedbackElement.findIndex(
        (el) => el.elementName === option,
      );
      if (existingIndex !== -1) {
        // Already in the store, just update its ratio
        actionToDispatch = updateFeedbackElement({
          index: existingIndex,
          elementRatio: 10,
        });
      } else {
        // Find an empty slot
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
    }

    // 3) Now that we have our new local states, set them
    setSelectedOptions(newSelections);
    setPercentages(newPercentages);

    // 4) If we decided on a Redux action, dispatch it here
    if (actionToDispatch) {
      dispatch(actionToDispatch);
    }
  };

  // +/- ratio
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
      } else {
        // update in slice
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

  // Sync local changes to feedbackSlice
  useEffect(() => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
  }, [selectedOptions, percentages, dispatch]);

  // Attempt to proceed
  const handleNext = () => {
    if (!reportId) {
      setModalMessage("Report ID가 없습니다.");
      setShowModal(true);
      return;
    }

    mutate(reportId, {
      onSuccess: () => {
        // ** Redirect to "/" and pass from: "/feedback" **
        navigate("/", { state: { from: "/feedback" } });
      },
      onError: (error) => {
        console.error("Error submitting feedback:", error);
        setModalMessage("피드백 제출 중 오류가 발생했습니다.");
        setShowModal(true);
      },
    });
  };

  const handleBack = () => {
    resetSelections();
    onBack(); // call parent prop
  };

  // Calculation for enabling "피드백 저장하기"
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

      {/* Error Modal */}
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
