import React, { useState, useEffect, useRef } from 'react';

const baseStyle = {
  width: '100vw',
  height: '100vh',
  border: 'none',
  backgroundColor: '#000'
};

export const PowerBIMedia = ({ src, id, preloadedElement }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setHasError(false);
    
    if (preloadedElement && preloadedElement.tagName === 'IFRAME') {
      console.log('📊 Usando PowerBI precarregado para:', id);
      setIsLoading(false);
      setIsContentReady(true);
      return;
    }

    setIsLoading(true);
    setIsContentReady(false);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsContentReady(true);
      console.log('📊 PowerBI timeout - assumindo carregado:', id);
    }, 8000); // 8 segundos de timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src, id, preloadedElement]);

  const handleLoad = () => {
    console.log('📊 PowerBI onLoad disparado:', id);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (preloadedElement && preloadedElement.tagName === 'IFRAME') {
      setIsLoading(false);
      setIsContentReady(true);
      setHasError(false);
      console.log('📊 PowerBI precarregado pronto:', id);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsContentReady(true);
      setHasError(false);
      console.log('📊 PowerBI pronto para exibição:', id);
    }, 2000); // 2 segundos após onLoad para estabilizar
  };

  const handleError = () => {
    console.error('❌ Erro ao carregar PowerBI:', src);
    setHasError(true);
    setIsLoading(false);
    setIsContentReady(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  if (hasError) {
    return (
      <div style={{...baseStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column'}}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2>Erro ao carregar relatório</h2>
        <p>ID: {id}</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', ...baseStyle }}>
      <iframe
        ref={iframeRef}
        title={`Power BI Report - ${id}`}
        src={src}
        style={{
          ...baseStyle,
          opacity: isContentReady ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        allowFullScreen={true}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation allow-popups"
      />
    </div>
  );
};
