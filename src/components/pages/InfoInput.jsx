import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCheckboxData } from "../../store/checkboxDataSlice";
import { setCheckboxSelections } from "../../store/checkboxSelectionSlice";
import { ProcedureButton } from "../ProcedureButton";
import { useTranslation } from "react-i18next";

import { InputTextTop } from "../inputInfo/InputTextTop";
import { SelectForm } from "../inputInfo/SelectForm";
import { Checkbox } from "../inputInfo/CheckBox";
import { InputTextCenter } from "../inputInfo/InputTextCenter";
import checkboxDataJson from "../../data/checkboxdata.json"; // Import JSON data

export const InfoInput = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Translate JSON data dynamically
    const translatedData = checkboxDataJson.map((item) => ({
      ...item,
      label: t(item.label),
      description: t(item.description),
      additionalInfo: item.additionalInfo.map((info) => t(info)),
      chartData: item.chartData.map((data) => ({
        ...data,
        name: t(data.name),
      })),
    }));

    // Dispatch actions to set checkbox data
    dispatch(setCheckboxData(translatedData));

    const initialSelections = {
      preferences: {
        preferred: [],
        disliked: [],
      },
    };
    dispatch(setCheckboxSelections(initialSelections));
  }, [t, dispatch]);

  return (
    <div className="relative z-0 flex-col justify-center items-center min-h-screen w-full text-center">
      <InputTextTop />
      <SelectForm />
      <Checkbox componentId={1} />
      <InputTextCenter />
      <Checkbox componentId={2} />

      <div className="mt-10 mb-5">
        <ProcedureButton text={t("Next")} route="/inputTwo" confirm={true} />
      </div>
    </div>
  );
};
