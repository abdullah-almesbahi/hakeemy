import React from "react";

export const DrawerContext = React.createContext(null);

const useDrawerContext = () => {
  const drawerContext = React.useContext(DrawerContext);
  if (drawerContext == null)
    throw Error("useDrawerContext: Please provide DrawerContext value.");

  return drawerContext;
};

export default useDrawerContext;
