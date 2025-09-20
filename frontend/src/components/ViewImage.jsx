import React from "react";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl p-4">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
        >
          ✕
        </button>

        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={url}
            alt="preview"
            className="max-h-[70vh] max-w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
