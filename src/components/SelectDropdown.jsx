import { useState } from "react";
import { ArrowDown } from "./svg/Icon";

export default function SelectDropdown({ list }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="py-4 relative flex w-[90%] m-auto cursor-pointer">
      <select
        className="ring-2 ring-blue-500 border rounded-full appearance-none form-select px-4 py-3 pl-3 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        onChange={handleChange}
        value={selectedValue}
      >
        {/* <option value="">Set of {list.length}</option> */}
        {list.map((item, index) => {
          return <option key={index} value={item.style_name}>{item.style_name}</option>;
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none cursor-pointer">
        <ArrowDown />
      </div>
    </div>
  );
}
