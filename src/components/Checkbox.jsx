import React, { useState } from "react";

const CheckboxSelect = () => {
  const [checked, setChecked] = useState({});

  const handleCheckboxChange = (event) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <div>
      {uniqueCategories.map((category) => (
        <div key={category} className="flex items-center mb-2">
          <input
            type="checkbox"
            name={category}
            checked={checked[category]}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>{category}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxSelect;
