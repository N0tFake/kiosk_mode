import { useState, useEffect, useCallback } from 'react';
import { validateConfig, sanitizeConfig } from '../utils/configValidator';

const RETRY_INTERVAL = 30000; // 30 segundos
const MAX_RETRIES = 5;

export const useKioskConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/config_routes_pages.json', {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`Falha ao carregar configuração: ${response.status}`);
      }

      const rawData = await response.json();
  
      const validation = validateConfig(rawData);
      if (!validation.isValid) {
        throw new Error(`Configuração inválida: ${validation.errors.join(', ')}`);
      }

      const sanitizedData = sanitizeConfig(rawData);
      
      if (!sanitizedData.itens || sanitizedData.itens.length === 0) {
        throw new Error('Nenhum item válido encontrado na configuração');
      }

      setConfig(sanitizedData);
      setRetryCount(0);
      setLoading(false);
      
      console.log('Configuração carregada com sucesso:', sanitizedData);
    } catch (err) {
      console.error('Erro ao carregar configuração:', err);
      setError(err.message);
      setLoading(false);
      
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchConfig();
        }, RETRY_INTERVAL);
      }
    }
  }, [retryCount]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchConfig();
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, [fetchConfig]);

  return {
    config,
    loading,
    error,
    retryCount,
    refetch: fetchConfig
  };
};
