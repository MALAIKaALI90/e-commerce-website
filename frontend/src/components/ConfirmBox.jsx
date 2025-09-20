import React from "react";

const ConfirmBox = ({ close, cancel, confirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
   
      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
     
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

       
        <p className="text-gray-900 text-lg font-semibold mb-2">
          Delete  Sub Category
        </p>
        <p className="text-gray-600 mb-6 text-sm">
          Are you sure you want to delete this Sub  category? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={cancel}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
