import clsx from "clsx";
import React from "react";
import { useAppSelector } from "../../hooks/redux/useRedux";

/* import packages */
import { ClimbingBoxLoader } from "react-spinners";

export default function Spinner() {
  let isLoading = useAppSelector((state) => state.spinnerReducer.isLoading);

  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={clsx(
        "spinner",
        "fixed left-0 top-0 bg-[#282c34] flex justify-center items-center z-[9999]",
        "h-screen w-screen",
        loadingClass,
        "transition-all duration-[1200ms]"
      )}
    >
      <ClimbingBoxLoader
        color="#ebbd60"
        loading
        size={80}
        speedMultiplier={0.7}
      />
    </div>
  );
}
