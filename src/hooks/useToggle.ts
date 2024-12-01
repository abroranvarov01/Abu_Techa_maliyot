import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = () => setIsToggled(!isToggled);

  return [isToggled, toggle] as const;
};
