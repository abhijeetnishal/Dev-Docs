import { useRef, useState } from "react";
import useOnClickOutSide from "../custom-hooks/useOnClickOutSide";
import DropDownNew from "../hoc/DropDownNew";

const DropDown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef();

  const closeDropdown = () => setShowOptions(false);
  useOnClickOutSide(dropdownRef, closeDropdown);
  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setShowOptions(true)}
          className="bg-[#29c740] flex flex-row justify-center items-center py-2 px-4 ml-3 rounded-lg"
        >
          <span className="text-sm font-medium text-white">Assign this to</span>
          <ArrowDown fillColor={"white"} />
        </button>

        {showOptions ? (
          <DropDownNew ref={dropdownRef} className="md:w-auto right-0">
            <div className="w-full min-w-10">
              <button
                className="flex items-center py-3 px-4 hover:bg-gray-100 cursor-pointer w-full"
                onClick={() => {
                  setShowOptions(false);
                }}
              >
                <div className="ml-2 text-xs">Groups</div>
              </button>
              <button
                className="flex items-center py-3 px-4 hover:bg-gray-100 cursor-pointer w-full"
                onClick={() => {
                  setShowOptions(false);
                }}
              >
                <div className="ml-2 text-xs">Learners</div>
              </button>
            </div>
          </DropDownNew>
        ) : null}
      </div>
    </div>
  );
};

export default DropDown;
