import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({options, label, id, selectedVal, handleChange}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[id]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="relative bg-light-white cursor-default">

      <form className="flex flex-col bg-white rounded-md p-1" onSubmit={e => e.preventDefault()}>
        <label htmlFor="searchField" className="input-label">Find Path:</label>
        <input
          className="input-field"
          id="searchField"
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
          }}
          onClick={toggle}
        />
      </form>

      <div className={`${isOpen ? "block" : "hidden"}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default SearchableDropdown;


