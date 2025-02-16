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

export const StepTwo = ({ onNext, onBack }) => {
  const dispatch = useDispatch();

  const stepOneRatio = useSelector((state) => state.feedback.stepOneRatio);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [percentages, setPercentages] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const resetSelections = () => {
    dispatch(resetStepTwoSelections()); // Reset Redux state
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
      let newSelections = { ...prev };
      if (!newSelections[noteName]) newSelections[noteName] = [];

      const alreadySelected = newSelections[noteName].includes(option);

      if (alreadySelected) {
        // Deselect
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
        // Before we finalize, check if total picks would exceed 2
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
      let newVal = Math.max(10, Math.min(100, oldVal + amount));
      copy[option] = newVal;

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

  useEffect(() => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
  }, [selectedOptions, percentages, dispatch]);

  useEffect(() => {
    return () => {
      resetSelections();
    };
  }, [dispatch]);

  const handleNext = () => {
    dispatch(setStepTwoSelections({ selectedOptions, percentages }));
    onNext(selectedOptions, percentages);
  };

  const handleBack = () => {
    resetSelections();
    onBack(); // Proceed to previous step
  };

  const totalSelected = getTotalSelectedCount(selectedOptions);
  const canProceed = totalSelected > 0;

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

            return (
              <div key={note.name} className="w-full border-b border-black">
                {/* Accordion Header */}
                <div className="flex flex-col">
                  <button
                    onClick={() => handleAccordionToggle(note.name)}
                    className="w-full flex justify-between items-center px-4 py-3 text-lg font-medium bg-white text-black"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{note.name}</span>
                      {/* If there's any selection for this note, show "chips" */}
                      {currentSelections.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2">
                          {currentSelections.map((opt) => (
                            <div
                              key={opt}
                              className="bg-white text-black border border-black pl-2 text-sm flex items-center space-x-1"
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

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-md"
            onClick={handleBack}
          >
            이전 단계로 돌아가기
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              canProceed
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={handleNext}
            disabled={!canProceed}
          >
            다음 단계로 이동하기
          </button>
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
