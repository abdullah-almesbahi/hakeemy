import React from "react";

import { DefaultTheme } from "react-native-paper";

export const ThemeContext = React.createContext(null);

const useThemeContext = () => {
  const themeContext = React.useContext(ThemeContext);
  if (themeContext == null)
    throw Error("useThemeContext: Please provide ThemeContext value.");

  console.log("aaaa");
  return themeContext;
};

export default useThemeContext;
