import React, { useState } from "react";
import downIcon from "../../assets/down.svg"; // Replace with your actual icon path
import PrimeModal from "../PrimeModal"; // Import your modal component
import cancelIcon from "../../assets/ax.svg"; // The new cancel icon path
import optionData from "../../feedbackoptions.json";

export const StepTwo = ({ onNext, onBack }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  // selectedOptions[noteName] = array of selected option names for that note
  const [selectedOptions, setSelectedOptions] = useState({});

  // percentages[optionName] = numeric percentage for that option
  const [percentages, setPercentages] = useState({});

  // Controls the "exceeded 2 selections" modal
  const [showModal, setShowModal] = useState(false);

  /**
   * We map the categoryId in optionData to the 6 main categories.
   */
  const fragranceNotes = [
    {
      name: "시트러스",
      content: "상큼한 과일 향이 가득한 시트러스 향.",
      options: optionData.filter((item) => item.categoryId === 1),
    },
    {
      name: "플로럴",
      content: "우아한 꽃향기가 조화를 이루는 플로럴 계열.",
      options: optionData.filter((item) => item.categoryId === 2),
    },
    {
      name: "우디",
      content: "고급스러운 나무 향이 특징인 우디 계열.",
      options: optionData.filter((item) => item.categoryId === 3),
    },
    {
      name: "머스크",
      content: "부드럽고 포근한 머스크 향.",
      options: optionData.filter((item) => item.categoryId === 4),
    },
    {
      name: "프루티",
      content: "달콤하고 신선한 과일 향이 나는 프루티 계열.",
      options: optionData.filter((item) => item.categoryId === 5),
    },
    {
      name: "스파이시",
      content: "강렬하고 매콤한 스파이시 향.",
      options: optionData.filter((item) => item.categoryId === 6),
    },
  ];

  /**
   * Toggle open/close for the accordion of a given note.
   */
  const handleAccordionToggle = (noteName) => {
    if (openAccordion === noteName) {
      setOpenAccordion(null);
      setSelectedNote(null);
    } else {
      setOpenAccordion(noteName);
      setSelectedNote(noteName);
    }
  };

  /**
   * Count how many total options are selected across ALL notes.
   */
  const getTotalSelectedCount = (optionsObj) => {
    return Object.values(optionsObj).reduce((sum, arr) => sum + arr.length, 0);
  };

  /**
   * Remove a single option from both selectedOptions and percentages.
   */
  const removeSelection = (noteName, option) => {
    setSelectedOptions((prev) => {
      const copy = { ...prev };
      if (!copy[noteName]) return copy;
      copy[noteName] = copy[noteName].filter((o) => o !== option);
      return copy;
    });
    setPercentages((prev) => {
      const copy = { ...prev };
      delete copy[option];
      return copy;
    });
  };

  /**
   * Handle selection/deselection within a note.
   * Multiple options per note allowed, but total across all notes <= 2.
   */
  const handleOptionSelect = (noteName, option) => {
    setSelectedOptions((prev) => {
      const newSelections = { ...prev };
      if (!newSelections[noteName]) {
        newSelections[noteName] = [];
      }

      const alreadySelected = newSelections[noteName].includes(option);

      if (alreadySelected) {
        // Deselect (undo)
        newSelections[noteName] = newSelections[noteName].filter(
          (o) => o !== option,
        );
        // Remove from percentages
        setPercentages((prevP) => {
          const copy = { ...prevP };
          delete copy[option];
          return copy;
        });
      } else {
        // Select new
        newSelections[noteName] = [...newSelections[noteName], option];

        const newTotal = getTotalSelectedCount(newSelections);
        if (newTotal > 2) {
          // Over limit
          setShowModal(true);
          return prev; // revert
        } else {
          // Within limit, default percentage
          setPercentages((prevP) => ({
            ...prevP,
            [option]: 10,
          }));
        }
      }
      return newSelections;
    });
  };

  /**
   * Adjust percentage by +/-5 for a selected option.
   */
  const adjustPercentage = (option, amount, e) => {
    e.stopPropagation();
    e.preventDefault();

    setPercentages((prev) => {
      const copy = { ...prev };
      const currentVal = copy[option] ?? 10;
      copy[option] = Math.max(0, Math.min(100, currentVal + amount));
      return copy;
    });
  };

  // For enabling the "Next" button only when there's at least 1 selection.
  const totalSelectedNow = getTotalSelectedCount(selectedOptions);
  const hasAnySelection = totalSelectedNow > 0;

  return (
    <>
      <div className="w-full">
        <h2 className="text-black text-lg mb-4">
          2단계: 어떤 향을 더 강조하고 싶으신가요?
        </h2>

        {/* Accordions for each note */}
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
                              {/* Cancel Icon for removing selection */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Don’t close accordion
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
                      ? "max-h-[1000px] opacity-100 p-4 bg-gray-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {/* Category description */}
                  <p className="text-black mb-3">{note.content}</p>

                  <div className="flex flex-col space-y-2">
                    {/* Now note.options is an array of objects from optionData */}
                    {note.options.map((optionObj) => {
                      const isSelected = currentSelections.includes(
                        optionObj.name,
                      );

                      return (
                        <button
                          key={optionObj.id}
                          type="button"
                          className="flex flex-col border border-black bg-white text-black w-full px-4 py-2"
                          onClick={() =>
                            handleOptionSelect(note.name, optionObj.name)
                          }
                        >
                          {/* Top row: dot + name + percentage controls */}
                          <div className="flex items-center justify-between">
                            {/* Dot + option name */}
                            <div className="flex items-center space-x-2">
                              <span className="inline-block w-4 text-center">
                                {isSelected ? "●" : ""}
                              </span>
                              <span>{optionObj.name}</span>
                            </div>

                            {/* If selected, show +/- controls */}
                            {isSelected && (
                              <div className="flex items-center space-x-2">
                                <span
                                  onClick={(e) =>
                                    adjustPercentage(optionObj.name, -5, e)
                                  }
                                  className="border border-black px-3 py-1 text-black cursor-pointer select-none"
                                >
                                  -
                                </span>
                                <span className="font-bold">
                                  {percentages[optionObj.name] ?? 10}%
                                </span>
                                <span
                                  onClick={(e) =>
                                    adjustPercentage(optionObj.name, 5, e)
                                  }
                                  className="border border-black px-3 py-1 text-black cursor-pointer select-none"
                                >
                                  +
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Show the description if selected */}
                          {isSelected && (
                            <div className="mt-2 text-sm text-gray-600">
                              {optionObj.desc}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-md"
            onClick={onBack}
          >
            이전 단계로 돌아가기
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              hasAnySelection
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={() => onNext(selectedOptions, percentages)}
            disabled={!hasAnySelection}
          >
            다음 단계로 이동하기
          </button>
        </div>
      </div>

      {/* Modal if user tries to select more than two total options */}
      <PrimeModal
        isOpen={showModal}
        title="알림"
        onClose={() => setShowModal(false)}
      >
        <p className="text-black">
          두 개 이상의 노트를 선택하실 수 없습니다. (최대 2개까지 가능)
        </p>
      </PrimeModal>
    </>
  );
};
