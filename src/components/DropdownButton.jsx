import { useState } from "react";
function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Opciones
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="mx-1 w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute origin-top-right left-0 mt-2 w-40 rounded-md shadow-lg bg-white font-normal text-xs">
          <div className="py-1">
            <span>Ayuda palabra muy larga</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
