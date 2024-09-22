import React from "react";
interface SpinnerProps {
  "aria-live"?: "polite" | "off" | "assertive";
}

const Spinner: React.FC<SpinnerProps> = ({
  "aria-live": ariaLive = "polite",
}) => {
  return (
    <div
      className="relative flex h-3 w-3"
      aria-live={ariaLive}
      data-testid="spinner"
    >
      <span className="sr-only">Loading...</span>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    </div>
  );
};

export default Spinner;
  