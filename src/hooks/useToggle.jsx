import { useState } from "react";
import { isBoolean } from "underscore";

const useToggle = (initValue = false) => {
  const [value, setValue] = useState(initValue);

  const toggleValue = (newValue) => {
    if (isBoolean(newValue)) {
      setValue(newValue);
    } else {
      setValue(!value);
    }
  };

  return [value, toggleValue];
};

export default useToggle;
