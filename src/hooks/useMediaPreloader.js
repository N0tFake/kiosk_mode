import { useEffect, useRef, useCallback } from 'react';

export const useMediaPreloader = (itens, currentIndex) => {
  const preloadedElementsRef = useRef(new Map());
  const preloadInProgressRef = useRef(new Set());

  const getNextIndex = useCallback((index) => {
    if (!itens || itens.length === 0) return -1;
    return (index + 1) % itens.length;
  }, [itens]);

  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        console.log('🖼️ Imagem precarregada:', src);
        resolve(img);
      };
      img.onerror = () => {
        console.warn('⚠️ Erro ao precarregar imagem:', src);
        reject(new Error('Falha no preload da imagem'));
      };
      img.src = src;
    });
  }, []);

  const preloadVideo = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.style.display = 'none';
      
      const handleCanPlay = () => {
        console.log('🎬 Vídeo precarregado:', src);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        resolve(video);
      };

      const handleError = () => {
        console.warn('⚠️ Erro ao precarregar vídeo:', src);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        reject(new Error('Falha no preload do vídeo'));
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.src = src;
      
      document.body.appendChild(video);
      
      setTimeout(() => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      }, 30000); // 30 segundos timeout
    });
  }, []);

  const preloadItem = useCallback(async (item) => {
    if (!item || !item.src || !item.tipo) return null;

    const key = `${item.id}_${item.src}`;
    
    if (preloadInProgressRef.current.has(key)) {
      return null;
    }

    if (preloadedElementsRef.current.has(key)) {
      return preloadedElementsRef.current.get(key);
    }

    preloadInProgressRef.current.add(key);

    try {
      let preloadedElement = null;

      switch (item.tipo) {
        case 'imagem_web':
        case 'imagem_local':
          preloadedElement = await preloadImage(item.src);
          break;
          
        case 'video_web':
        case 'video_local':
          preloadedElement = await preloadVideo(item.src);
          break;
          
        case 'powerbi':
          const iframe = document.createElement('iframe');
          iframe.src = item.src;
          iframe.style.display = 'none';
          iframe.style.width = '1px';
          iframe.style.height = '1px';
          iframe.style.position = 'absolute';
          iframe.style.top = '-9999px';
          iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-top-navigation';
          
          document.body.appendChild(iframe);
          preloadedElement = iframe;
          
          console.log('📊 PowerBI precarregado - aparecerá instantaneamente:', item.nome);
          break;
          
        default:
          console.warn('Tipo de mídia não suportado para preload:', item.tipo);
          break;
      }

      if (preloadedElement) {
        preloadedElementsRef.current.set(key, preloadedElement);
      }

      return preloadedElement;
    } catch (error) {
      console.error('Erro no preload:', error);
      return null;
    } finally {
      preloadInProgressRef.current.delete(key);
    }
  }, [preloadImage, preloadVideo]);

  const getPreloadedElement = useCallback((item) => {
    if (!item) return null;
    const key = `${item.id}_${item.src}`;
    return preloadedElementsRef.current.get(key) || null;
  }, []);

  const cleanupOldPreloads = useCallback(() => {
    const currentItem = itens?.[currentIndex];
    const nextItem = itens?.[getNextIndex(currentIndex)];
    
    const keysToKeep = new Set();
    if (currentItem) keysToKeep.add(`${currentItem.id}_${currentItem.src}`);
    if (nextItem) keysToKeep.add(`${nextItem.id}_${nextItem.src}`);

    preloadedElementsRef.current.forEach((element, key) => {
      if (!keysToKeep.has(key)) {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        preloadedElementsRef.current.delete(key);
        console.log('🧹 Preload removido:', key);
      }
    });
  }, [itens, currentIndex, getNextIndex]);

  useEffect(() => {
    if (!itens || itens.length === 0) return;

    const nextIndex = getNextIndex(currentIndex);
    if (nextIndex === -1) return;

    const nextItem = itens[nextIndex];
    if (!nextItem) return;

    cleanupOldPreloads();

    preloadItem(nextItem).then(() => {
      if (nextItem.tipo === 'powerbi') {
        console.log('📊 Próximo PowerBI sendo precarregado - aparecerá instantaneamente:', nextItem.nome);
      } else {
        console.log('✅ Próximo item precarregado:', nextItem.nome);
      }
    }).catch(() => {
      console.log('❌ Falha no preload do próximo item:', nextItem.nome);
    });

  }, [currentIndex, itens, getNextIndex, preloadItem, cleanupOldPreloads]);

  useEffect(() => {
    return () => {
      preloadedElementsRef.current.forEach((element) => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      preloadedElementsRef.current.clear();
      preloadInProgressRef.current.clear();
    };
  }, []);

  return {
    getPreloadedElement,
    preloadItem,
    cleanupOldPreloads
  };
};
