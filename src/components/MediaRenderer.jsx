import React from 'react';
import { ImageMedia } from './media/ImageMedia';
import { VideoMedia } from './media/VideoMedia';
import { PowerBIMedia } from './media/PowerBIMedia';

const MediaRenderer = ({ item, preloadedElement, isActive = true }) => {
  if (!item || !item.tipo || !item.src) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: 'white'
      }}>
        <p>Item de mídia inválido</p>
      </div>
    );
  }

  const renderMedia = () => {
    switch (item.tipo) {
      case 'imagem_web':
      case 'imagem_local':
        return (
          <ImageMedia 
            src={item.src} 
            alt={`Slide ${item.id}`} 
            preloadedElement={preloadedElement}
          />
        );
        
      case 'video_web':
      case 'video_local':
        return (
          <VideoMedia 
            src={item.src} 
            preloadedElement={preloadedElement}
            isActive={isActive}
          />
        );

      case 'powerbi':
        return (
          <PowerBIMedia 
            src={item.src} 
            id={item.id}
            preloadedElement={preloadedElement}
          />
        );

      default:
        console.warn('Tipo de mídia não suportado:', item.tipo);
        return (
          <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: 'white'
          }}>
            <p>Tipo de mídia não suportado: {item.tipo}</p>
          </div>
        );
    }
  };

  return (
    <div key={item.id} style={{ width: '100vw', height: '100vh' }}>
      {renderMedia()}
    </div>
  );
};

export default MediaRenderer;
