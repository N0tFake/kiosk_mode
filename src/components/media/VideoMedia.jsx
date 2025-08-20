import React, { useEffect, useRef, useState, useCallback } from 'react';

const baseStyle = {
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  border: 'none',
  backgroundColor: '#000'
};

export const VideoMedia = ({ src, preloadedElement, isActive = true }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setupVideo = useCallback((videoElement) => {
    if (!videoElement) return;

    const handleLoadedData = () => {
      console.log('Vídeo carregado:', src);
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = (e) => {
      console.error('Erro ao carregar vídeo:', src, e);
      setHasError(true);
      setIsLoading(false);
    };

    const handleEnded = () => {
      videoElement.currentTime = 0;
      if (isActive) {
        videoElement.play().catch(console.error);
      }
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [src, isActive]);

  useEffect(() => {
    let cleanup;

    if (preloadedElement && preloadedElement.tagName === 'VIDEO') {
      console.log('🎬 Usando vídeo precarregado para:', src);
      
      const video = videoRef.current;
      if (video && preloadedElement) {
        video.src = preloadedElement.src;
        video.currentTime = preloadedElement.currentTime;
        
        cleanup = setupVideo(video);
        setIsLoading(false);
        
        if (isActive) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
      }
    } else {

      const video = videoRef.current;
      if (video) {
        cleanup = setupVideo(video);
        
        if (isActive) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
      }
    }

    return cleanup;
  }, [src, preloadedElement, setupVideo, isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isActive]);

  if (hasError) {
    return (
      <div style={{...baseStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ fontSize: '1.5rem' }}>Erro ao carregar vídeo</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', ...baseStyle }}>
      <video
        ref={videoRef}
        src={src}
        style={baseStyle}
        muted
        loop
        playsInline
        preload="metadata"
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
            <div>Carregando vídeo...</div>
          </div>
        </div>
      )}
    </div>
  );
};
