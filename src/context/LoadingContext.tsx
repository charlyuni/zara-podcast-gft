"use client";
import React, { createContext, useState } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoadingState: (value: boolean) => void;
};

const loadingContextDefaultValues: LoadingContextType = {
  loading: false,
  setLoadingState: () => {
    throw new Error("setLoadingState debe ser utilizado dentro de un LoadingProvider");
  },
};

export const LoadingContext = createContext<LoadingContextType>(loadingContextDefaultValues);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (value: boolean) => {
    setLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};
