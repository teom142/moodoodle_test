import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import LoginButton from "../components/LoginButton";
import Main from "./Main";
import SignUpComponent from "../components/SignUpComponent";


export default function SignUp(){
    return(
      <div className="flex flex-col items-center w-[390px] h-screen bg-white">
          <div className="mt-[10%]">
              <img src="/assets/moodoodleLogoBig.svg" alt="logo" />
          </div>
        <SignUpComponent/>
      </div>
    );
}