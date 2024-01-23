import { forwardRef } from "react";

const DropDownNew = forwardRef((props, ref) => {
  const { options, onSelectDropdown, className, onClose, isBottom } = props;
  return (
    <div
      ref={ref}
      className={`z-50 origin-top-left fixed bottom-0 w-full top-0 ${
        isBottom ? "" : "md:bottom-auto"
      } md:top-auto md:absolute mt-1 md:w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
        className || "left-0"
      }`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
      onClick={(e) => e.preventDefault()}
    >
      <div>
        <div className="py-1" role="none">
          {options ? (
            <div>
              {options.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      className="text-gray-700 block w-full text-left px-4 py-4 text-sm font-semibold hover:text-secondary-900"
                      role="menuitem"
                      onClick={(event) => {
                        onSelectDropdown(event, item);
                        if (onClose) {
                          onClose();
                        }
                      }}
                    >
                      {item}
                    </button>
                    {options.length - 1 !== index && (
                      <div className="h-px w-full bg-gray-400"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>{props.children}</div>
          )}
        </div>
      </div>
    </div>
  );
});

DropDownNew.displayName = "DropDownNew";

export default DropDownNew;
