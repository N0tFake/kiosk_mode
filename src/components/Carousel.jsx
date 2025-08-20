import React, { useState, useEffect, useCallback } from 'react';
import MediaRenderer from './MediaRenderer';
import { useMediaPreloader } from '../hooks/useMediaPreloader';

export const Carousel = ({ modo, itens }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { getPreloadedElement } = useMediaPreloader(itens, currentIndex);

  const nextItem = useCallback(() => {
    if (!itens || itens.length === 0) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itens.length);
      setIsTransitioning(false);
    }, 300);
  }, [itens]);

  useEffect(() => {
    if (modo !== 'Lista' || !itens || itens.length === 0) return;

    const currentItem = itens[currentIndex];
    if (!currentItem || !currentItem.tempo) {
      console.warn('Item sem tempo definido:', currentItem);
      return;
    }

    const timer = setTimeout(() => {
      nextItem();
    }, currentItem.tempo * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, itens, modo, nextItem]);

  if (!itens || itens.length === 0) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontSize: '2rem'
      }}>
        Nenhum conteúdo disponível
      </div>
    );
  }

  const currentItem = itens[currentIndex];
  
  if (!currentItem) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontSize: '2rem'
      }}>
        Item inválido
      </div>
    );
  }

  const preloadedElement = getPreloadedElement(currentItem);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        opacity: isTransitioning ? 0.7 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <MediaRenderer 
          item={currentItem} 
          preloadedElement={preloadedElement}
          isActive={!isTransitioning}
        />
      </div>
    </div>
  );
};