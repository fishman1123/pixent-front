import plusIcon from "../../assets/plus.svg";
import leftIcon from "../../assets/newleft.svg";
import rightIcon from "../../assets/newright.svg";
import React, { useState } from "react";
import { Summarychart } from "../result/SummaryChart.jsx";
import barChart from "../../assets/newchart.svg";
import icon from "../../assets/newplus.svg";
import upIcon from "../../assets/up.svg";

export const CollectionTop = ({ dataOne, dataTwo }) => {
  // We'll have exactly 2 slides => one for ID=451, one for ID=452.
  const slides = dataOne.user_report.map((report) => {
    const matched = dataTwo.user_report.filter((item) => item.id === report.id);

    // Build "items"
    const items = [
      { name: report.perfumeName, subName: "", date: "2024.01.10" },
      ...matched.map((mItem, mIndex) => ({
        name: mItem.perfumeName,
        subName: `from ${report.perfumeName}`,
        date: `2024.0${mIndex + 2}.15`,
      })),
    ];

    // Build chartSet
    const chartSet = [];
    chartSet.push({
      id: "chartOne",
      data: {
        perfumeName: report.perfumeName,
        mainNote: report.mainNote,
        middleNote: report.middleNote,
        baseNote: report.baseNote,
        citrus: report.citrus ?? 0,
        floral: report.floral ?? 0,
        woody: report.woody ?? 0,
        musk: report.musk ?? 0,
        fruity: report.fruity ?? 0,
        spicy: report.spicy ?? 0,
      },
    });
    matched.forEach((mItem, idx) => {
      chartSet.push({
        id: `chartTwo-${idx}`,
        data: {
          perfumeName: mItem.perfumeName,
          mainNote: mItem.mainNote,
          middleNote: mItem.middleNote,
          baseNote: mItem.baseNote,
          citrus: mItem.citrus ?? 0,
          floral: mItem.floral ?? 0,
          woody: mItem.woody ?? 0,
          musk: mItem.musk ?? 0,
          fruity: mItem.fruity ?? 0,
          spicy: mItem.spicy ?? 0,
        },
      });
    });

    return {
      title: report.perfumeName,
      subtitle: `${report.mainNote} 블렌드`,
      items,
      chartSet,
    };
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  // Keep track of expand/collapse per slide
  const [expandStates, setExpandStates] = useState(slides.map(() => false));

  // The currently active slide
  const activeSlide = slides[currentSlide];

  // Arrow nav
  const prevSlide = () => {
    if (currentSlide > 0) {
      // Reset expansions
      setExpandStates(slides.map(() => false));
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      // Reset expansions
      setExpandStates(slides.map(() => false));
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const toggleExpand = (slideIndex) => {
    setExpandStates((prev) => {
      const copy = [...prev];
      copy[slideIndex] = !copy[slideIndex];
      return copy;
    });
  };

  return (
    <div className="w-full max-w-md text-white pb-4 overflow-hidden relative">
      {/* PREV Button */}
      <button
        onClick={prevSlide}
        className={`absolute top-[45px] left-4 z-10 flex items-center justify-center
          w-16 h-16 p-2
          ${currentSlide === 0 ? "hidden" : ""}`}
      >
        <img
          alt="left"
          src={leftIcon}
          className="w-[25px] h-[25px]"
          style={{ filter: "invert(1)" }}
        />
      </button>

      {/* NEXT Button */}
      <button
        onClick={nextSlide}
        className={`absolute top-[45px] right-4 z-10 flex items-center justify-center
          w-16 h-16 p-2
          ${currentSlide === slides.length - 1 ? "hidden" : ""}`}
      >
        <img
          alt="right"
          src={rightIcon}
          className="w-[25px] h-[25px]"
          style={{ filter: "invert(1)" }}
        />
      </button>

      {/* Slides Wrapper */}
      <div className="bg-black pb-4 px-4">
        <div className="relative w-full h-auto overflow-hidden pt-3">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => {
              const isExpanded = expandStates[index];

              return (
                <div key={index} className="w-full shrink-0 flex flex-col px-2">
                  {/* Example 'ADD' Button */}
                  <div className="w-[80px] ml-[40px] flex justify-center">
                    <button
                      className="noanimationbutton flex items-center justify-center min-w-[80px]
                        min-h-[30px] px-2 py-1 bg-black border border-white text-white"
                    >
                      <span className="text-sm font-medium tracking-wide">
                        ADD
                      </span>
                      <svg
                        className="w-5 h-5 ml-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                        <path
                          d="M12 2C6.486 2 2 6.486 2 12
                             C2 17.514 6.486 22 12 22
                             C17.514 22 22 17.514 22 12
                             C22 6.486 17.514 2 12 2ZM12 20
                             C7.589 20 4 16.411 4 12
                             C4 7.589 7.589 4 12 4
                             C16.411 4 20 7.589 20 12
                             C20 16.411 16.411 20 12 20Z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Slide Title, subtitle */}
                  <div className="mb-2">
                    <h1 className="text-[40px] text-center font-headerTitle">
                      {slide.title}
                    </h1>
                    <p className="pl-12 text-sm">{slide.subtitle}</p>
                  </div>

                  <hr className="border-white mb-4" />

                  {/* Collapsible Container for ALL items */}
                  <div
                    className={`overflow-hidden transition-all duration-500 
                      ${
                        isExpanded
                          ? // fully expanded
                            "max-h-[1000px]"
                          : // collapsed height for 3 items
                            "max-h-[150px]"
                      }
                    `}
                  >
                    {slide.items.map((item, idx2) => (
                      <div
                        key={idx2}
                        className="flex items-center justify-between bg-[#333] p-3 mb-6"
                      >
                        <div>
                          <span className="mr-2">•</span>
                          <span className="font-[inter]">{item.name}</span>
                          {item.subName && (
                            <p className="text-gray-400 text-sm">
                              {item.subName}
                            </p>
                          )}
                        </div>
                        <div className="text-sm">{item.date}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expand/Collapse Button (only if more than 3 items) */}
                  {slide.items.length > 3 && (
                    <div className="flex justify-center mt-2">
                      <button
                        className="noanimationbutton border bg-black border-white px-3 py-1 flex items-center justify-center w-full"
                        onClick={() => toggleExpand(index)}
                      >
                        <span className="text-white">
                          {isExpanded ? "COLLAPSE" : "EXPAND"}
                        </span>
                        <img
                          src={upIcon}
                          alt="arrow"
                          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          {slides.map((_, dotIndex) => (
            <div
              key={dotIndex}
              onClick={() => {
                // Reset expansions if user clicks a dot
                setExpandStates(slides.map(() => false));
                setCurrentSlide(dotIndex);
              }}
              className={
                dotIndex === currentSlide
                  ? "w-2 h-2 rounded-full bg-white cursor-pointer"
                  : "w-2 h-2 rounded-full bg-gray-600 cursor-pointer"
              }
            />
          ))}
        </div>
      </div>

      {/* Perfume Name + Radar Charts + main/middle/base notes */}
      <div className="mt-8 flex flex-col gap-8">
        {activeSlide.chartSet.map((chart) => (
          <div key={`wrapper-${chart.id}`} className="rounded-md bg-white">
            <div className="text-black ml-3 m-4">SCENT PROFILE</div>

            {/* Radar Chart */}
            <Summarychart
              key={`slide-${currentSlide}-${chart.id}`}
              inputCitrus={chart.data.citrus}
              inputFloral={chart.data.floral}
              inputWoody={chart.data.woody}
              inputMusk={chart.data.musk}
              inputFresh={chart.data.fruity}
              inputSpicy={chart.data.spicy}
            />

            {/* Perfume Info */}
            <div className="text-black mb-2 border-t border-b border-black">
              <div className="m-[20px]">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    {/* Perfume Name */}
                    <div className="font-bold text-lg">
                      {chart.data.perfumeName}
                    </div>
                    <div className="text-gray-400">2025.01.01</div>
                  </div>

                  {/* Example ADD button */}
                  <div className="w-[80px] ml-[40px] flex justify-center">
                    <button
                      className="noanimationbutton flex items-center justify-center min-w-[80px]
                        min-h-[30px] px-2 py-1 border border-gray-600 text-black font-light"
                    >
                      <span className="text-sm tracking-wide">ADD</span>
                      <svg
                        className="w-5 h-5 ml-2 text-black font-light"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                        <path
                          d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22
                               C17.514 22 22 17.514 22 12
                               C22 6.486 17.514 2 12 2ZM12 20
                               C7.589 20 4 16.411 4 12
                               C4 7.589 7.589 4 12 4
                               C16.411 4 20 7.589 20 12
                               C20 16.411 16.411 20 12 20Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Main/Middle/Base Notes */}
            <div className="text-gray-400 m-4">
              <div>Top: {chart.data.mainNote}</div>
              <div>Middle: {chart.data.middleNote}</div>
              <div>Base: {chart.data.baseNote}</div>
            </div>

            <div className="mx-[20px]">
              <div className="flex gap-4 mt-6">
                <div className="w-full">
                  <button className="noanimationbutton flex border flex-col items-center p-4 min-w-32 w-full h-auto">
                    <span className="text-sm text-gray-700">
                      <img
                        src={barChart}
                        alt="chart"
                        className="w-[30px] h-[30px] font-light"
                      />
                    </span>
                    <span className="text-[12px] text-black">
                      피드백 확인하기
                    </span>
                  </button>
                </div>
                <div className="w-full">
                  <button
                    className="noanimationbutton border flex flex-col items-center p-4 min-w-32 w-full h-auto"
                    disabled=""
                    onClick={() => {}}
                  >
                    <span className="text-sm text-black">
                      <img
                        src={icon}
                        alt="collection-icon"
                        className="w-[30px] h-[30px] font-light text-black"
                      />
                    </span>
                    <span className="text-[12px] text-black">
                      피드백 기록하기
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Navigation Button */}
              <div className="mt-4">
                <button
                  className="noanimationbutton flex items-center justify-center w-full h-[60px] px-5 py-4"
                  role="button"
                  onClick=""
                  disabled=""
                >
                  <span className="text-black text-[16px] pt-1">구매하기</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
