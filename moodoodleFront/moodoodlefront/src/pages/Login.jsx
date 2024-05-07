import React from "react";
import LoginComponent from "../components/LoginComponent";

export default function Login(){
    return(
        <div className="flex justify-center flex-col items-center w-[390px] h-screen bg-white">
            <div className="">
                <img src="/assets/moodoodleLogoBig.svg" alt="logo" />
            </div>
            <LoginComponent/>
        </div>
    );
}