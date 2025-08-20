import React, { useState, useEffect } from 'react';

const baseStyle = {
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  border: 'none',
  backgroundColor: '#000'
};

export const ImageMedia = ({ src, preloadedElement, alt = "Imagem do carrossel" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    console.error('Erro ao carregar imagem:', src);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('Imagem carregada:', src);
    setIsLoading(false);
    setHasError(false);
  };

  useEffect(() => {
    if (preloadedElement && preloadedElement.tagName === 'IMG') {
      console.log('🖼️ Usando imagem precarregada para:', src);
      setIsLoading(false);
      setHasError(false);
    }
  }, [preloadedElement, src]);

  if (hasError) {
    return (
      <div style={{...baseStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ fontSize: '1.5rem' }}>Erro ao carregar imagem</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', ...baseStyle }}>
      <img
        src={src}
        alt={alt}
        style={baseStyle}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
      />

      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <div>Carregando imagem...</div>
          </div>
        </div>
      )}
    </div>
  );
};
