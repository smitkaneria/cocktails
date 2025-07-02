import React from "react";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
    <div className="loader-spinner"></div>
  </div>
);

export default Loader; 