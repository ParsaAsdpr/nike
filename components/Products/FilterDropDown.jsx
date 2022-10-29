import React from "react";

const FilterDropDown = (props) => {
  return (
    <div className="flex flex-row gap-3 items-center">
        <p className="text-stone-100 text-xl">{props.text}</p>
      <select
        className="py-3 px-4 text-lg rounded-md bg-stone-900 text-stone-300 border-l-8 border-l-transparent"
        value={props.defaultValue}
        onChange={props.changeHandler}
      >
        <option value="all">همه</option>
        {props.options &&
          props.options.map((option, index) => (
            <option key={index} value={index+1}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterDropDown;
