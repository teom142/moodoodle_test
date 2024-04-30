import React from "react";
import MainProfile from "../components/MainProfile";
import DiaryWriting from "../components/DiaryWriting";

export default function DiaryWritePage() {
  return (
    <div className="flex flex-col items-center">
      <MainProfile />
      <DiaryWriting />
    </div>
  );
}
