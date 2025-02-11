import React, { useState } from "react";
import downIcon from "../../assets/down.svg"; // Replace with your actual icon path

export const StepTwo = ({ onNext, onBack }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Stores arrays of selected options for each note
  // For example: { 시트러스: ["상큼한"], 프루티: ["블루베리", "자두"] }
  const [selectedOptions, setSelectedOptions] = useState({});

  // Stores a numeric percentage for each *selected* option
  // For example: { 상큼한: 10, 블루베리: 10, 자두: 10 }
  const [percentages, setPercentages] = useState({});

  const fragranceNotes = [
    {
      name: "시트러스",
      content: "상큼한 과일 향이 가득한 시트러스 향.",
      options: ["상큼한", "달콤한", "청량한"],
    },
    {
      name: "플로럴",
      content: "우아한 꽃향기가 조화를 이루는 플로럴 계열.",
      options: ["우아한", "로맨틱한", "신선한"],
    },
    {
      name: "우디",
      content: "고급스러운 나무 향이 특징인 우디 계열.",
      options: ["깊은", "부드러운", "세련된"],
    },
    {
      name: "머스크",
      content: "부드럽고 포근한 머스크 향.",
      options: ["은은한", "강렬한", "몽환적인"],
    },
    {
      name: "프루티",
      content: "달콤하고 신선한 과일 향이 나는 프루티 계열.",
      options: ["블루베리", "자두"],
    },
    {
      name: "스파이시",
      content: "강렬하고 매콤한 스파이시 향.",
      options: ["따뜻한", "강렬한", "중후한"],
    },
  ];

  /**
   * Toggle accordion open/close.
   * No automatic selection here — user must click inside the accordion.
   */
  const handleSelectNote = (noteName) => {
    if (openAccordion === noteName) {
      // Close if already open
      setOpenAccordion(null);
      setSelectedNote(null);
    } else {
      // Open this note
      setOpenAccordion(noteName);
      setSelectedNote(noteName);
    }
  };

  /**
   * Toggle selection of an option:
   * If already selected => unselect
   * Otherwise => select with default percentage (10%)
   */
  const handleOptionSelect = (noteName, option) => {
    // First, update the selectedOptions state
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      if (!newOptions[noteName]) {
        newOptions[noteName] = [];
      }

      if (newOptions[noteName].includes(option)) {
        // If it's already selected, unselect it
        newOptions[noteName] = newOptions[noteName].filter((o) => o !== option);
      } else {
        // Otherwise, select it
        newOptions[noteName].push(option);
      }
      return newOptions;
    });

    // Then, update (add or remove) the corresponding percentage
    setPercentages((prevPercentages) => {
      const newPercentages = { ...prevPercentages };
      if (newPercentages[option]) {
        // If it already exists, remove it
        delete newPercentages[option];
      } else {
        // Otherwise, set a default 10%
        newPercentages[option] = 10;
      }
      return newPercentages;
    });
  };

  /**
   * Adjust the percentage for a selected option by +/-5.
   * e.stopPropagation() keeps the click from toggling the entire button.
   */
  const adjustPercentage = (option, amount, e) => {
    e.stopPropagation();
    e.preventDefault();

    setPercentages((prev) => {
      const updated = { ...prev };
      const current = updated[option] ?? 10;
      let newVal = current + amount;

      // Clamp the value between 0% and 100%
      newVal = Math.max(0, Math.min(100, newVal));
      updated[option] = newVal;
      return updated;
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-black text-lg mb-4">
        2단계: 어떤 향을 더 강조하고 싶으신가요?
      </h2>

      {/* Accordions for each note */}
      <div className="w-full border-t border-black mt-6">
        {fragranceNotes.map((note) => {
          const isOpen = openAccordion === note.name;
          return (
            <div key={note.name} className="w-full border-b border-black">
              {/* Accordion Header */}
              <button
                onClick={() => handleSelectNote(note.name)}
                className="w-full flex justify-between items-center px-4 py-3 text-lg font-medium bg-white text-black"
              >
                <span>{note.name}</span>
                <img
                  src={downIcon}
                  alt="Chevron"
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isOpen
                    ? "max-h-[1000px] opacity-100 p-4 bg-gray-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-black mb-3">{note.content}</p>

                {/* Render multiple options if they exist (like "프루티") */}
                <div className="flex flex-wrap gap-2">
                  {note.options.map((option) => {
                    // Check whether this option is selected
                    const isSelected =
                      selectedOptions[note.name]?.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleOptionSelect(note.name, option)}
                        className="w-full py-3 px-4 rounded-md border border-black flex justify-between items-center bg-white text-black"
                      >
                        {/* Show a black dot if selected */}
                        <span>{isSelected ? `● ${option}` : option}</span>

                        {isSelected && (
                          <div className="flex items-center space-x-2">
                            <span
                              onClick={(e) => adjustPercentage(option, -5, e)}
                              className="border border-black px-3 py-1 text-black rounded-md cursor-pointer select-none"
                            >
                              -
                            </span>
                            <span className="font-bold">
                              {percentages[option]}%
                            </span>
                            <span
                              onClick={(e) => adjustPercentage(option, 5, e)}
                              className="border border-black px-3 py-1 text-black rounded-md cursor-pointer select-none"
                            >
                              +
                            </span>
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
            Object.keys(selectedOptions).length > 0
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={() => onNext(selectedOptions, percentages)}
          disabled={Object.keys(selectedOptions).length === 0}
        >
          다음 단계로 이동하기
        </button>
      </div>
    </div>
  );
};
