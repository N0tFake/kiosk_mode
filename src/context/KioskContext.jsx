import React, { createContext, useContext } from 'react';
import { useKioskConfig } from '../hooks/useKioskConfig';

const KioskContext = createContext();

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk deve ser usado dentro de um KioskProvider');
  }
  return context;
};

export const KioskProvider = ({ children }) => {
  const { config, loading, error, retryCount, refetch } = useKioskConfig();

  const value = {
    config,
    loading,
    error,
    retryCount,
    refetch
  };

  return (
    <KioskContext.Provider value={value}>
      {children}
    </KioskContext.Provider>
  );
};
