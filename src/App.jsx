import React from 'react';
import { KioskProvider, useKiosk } from './context/KioskContext';
import { Carousel } from './components/Carousel';
import LoadingDisplay from './components/LoadingDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import SystemMonitor from './components/SystemMonitor';
import './App.css';

const KioskApp = () => {
  const { config, loading, error, retryCount, refetch } = useKiosk();

  if (loading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        retryCount={retryCount} 
        onRetry={refetch} 
      />
    );
  }

  if (!config) {
    return (
      <ErrorDisplay 
        error="Configuração não encontrada" 
        retryCount={0} 
        onRetry={refetch} 
      />
    );
  }

  return (
    <>
      <SystemMonitor />
      <Carousel 
        modo={config.modo} 
        itens={config.itens}
      />
    </>
  );
};

function App() {
  return (
    <KioskProvider>
      <div className="App">
        <KioskApp />
      </div>
    </KioskProvider>
  );
}

export default App;