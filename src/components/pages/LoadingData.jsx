import React, { useState, useEffect } from "react";

export const LoadingData = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-5 min-h-screen">
      <div className="flex justify-center items-center mb-12 mt-10">
        <h1 className="text-[30px] font-bold tracking-wider">
          잠시만 기다려 주세요...
        </h1>
      </div>
      <div className="flex w-full h-[300px] justify-center items-center">
        <div className="flex-col">
          <img
            src="/warning.png"
            alt="User Image"
            className="max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
};
