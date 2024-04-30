import React from "react";
import MainProfile from "../components/MainProfile";
import DiaryWritePopup from "../components/DiaryWritePopup";

export default function Main() {
  return (
    <div className="flex flex-col items-center">
      <MainProfile />
      <DiaryWritePopup />
    </div>
  );
}
