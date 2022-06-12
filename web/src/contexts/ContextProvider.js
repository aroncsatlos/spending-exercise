import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const ContextProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ apiUrl: "http://localhost:5001" }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => useContext(ApiContext);
