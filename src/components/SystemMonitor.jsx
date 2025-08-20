import { useEffect } from 'react';

const SystemMonitor = () => {
  useEffect(() => {
    const handleError = (event) => {
      console.error('Erro global capturado:', event.error);
    };

    const handleUnhandledRejection = (event) => {
      console.error('Promise rejeitada não tratada:', event.reason);
      event.preventDefault();
    };

    const monitorPerformance = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        console.log('Uso de memória:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        });

        const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        if (usage > 0.8) {
          console.warn('Alto uso de memória detectado:', Math.round(usage * 100) + '%');
        }
      }
    };

    const monitorConnection = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        console.log('Status da conexão:', {
          type: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    const performanceInterval = setInterval(monitorPerformance, 300000); // 5 minutos
    const connectionInterval = setInterval(monitorConnection, 60000); // 1 minuto

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      clearInterval(performanceInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    const preventDrag = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', preventZoom);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDrag);

    return () => {
      document.removeEventListener('keydown', preventZoom);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDrag);
    };
  }, []);

  return null;
};

export default SystemMonitor;
