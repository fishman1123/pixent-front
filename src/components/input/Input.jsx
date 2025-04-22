import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserState } from "../../store/userSlice"; // Update path as needed
import { CenterLine } from "../input/CenterLine.jsx";
import { TopTextBox } from "../input/TopTextBox.jsx";
import { SerialNumberBox } from "../input/SerialNumberBox.jsx";
import { TipBox } from "../input/TipBox.jsx";

export const Input = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserState({
      currentPage: "input",
    }));
  }, [dispatch]);

  return (
    <div className="flex-col justify-center items-center min-h-screen w-full text-center">
      <TopTextBox />
      <CenterLine />
      <SerialNumberBox path="/secured/which" />
      <TipBox />
    </div>
  );
};
