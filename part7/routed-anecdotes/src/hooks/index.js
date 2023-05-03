import { useState } from "react";

export function useField(type) {
  const [value, setValue] = useState("");

  function onChange(event) {
    setValue(event.target.value);
  }

  function reset() {
    setValue("");
  }

  return {
    type,
    value,
    onChange,
    reset,
  };
}
