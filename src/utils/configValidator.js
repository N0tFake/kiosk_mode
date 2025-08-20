// Utilitários para validação de configuração do quiosque

export const validateConfig = (config) => {
  const errors = [];

  if (!config || typeof config !== 'object') {
    errors.push('Configuração deve ser um objeto válido');
    return { isValid: false, errors };
  }

  if (!config.modo) {
    errors.push('Campo "modo" é obrigatório');
  } else if (!['Lista', 'Manual'].includes(config.modo)) {
    errors.push('Modo deve ser "Lista" ou "Manual"');
  }

  if (!config.itens || !Array.isArray(config.itens)) {
    errors.push('Campo "itens" deve ser um array');
  } else if (config.itens.length === 0) {
    errors.push('Deve haver pelo menos um item');
  } else {
    config.itens.forEach((item, index) => {
      const itemErrors = validateItem(item, index);
      errors.push(...itemErrors);
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateItem = (item, index) => {
  const errors = [];
  const prefix = `Item ${index + 1}:`;

  if (!item || typeof item !== 'object') {
    errors.push(`${prefix} deve ser um objeto válido`);
    return errors;
  }

  if (!item.id) {
    errors.push(`${prefix} campo "id" é obrigatório`);
  }

  const validTypes = ['imagem_web', 'imagem_local', 'video_web', 'video_local', 'powerbi'];
  if (!item.tipo) {
    errors.push(`${prefix} campo "tipo" é obrigatório`);
  } else if (!validTypes.includes(item.tipo)) {
    errors.push(`${prefix} tipo "${item.tipo}" não é válido. Tipos válidos: ${validTypes.join(', ')}`);
  }

  if (!item.src) {
    errors.push(`${prefix} campo "src" é obrigatório`);
  } else if (item.tipo.includes('web') && !isValidUrl(item.src)) {
    errors.push(`${prefix} "src" deve ser uma URL válida para tipo web`);
  }

  if (!item.tempo) {
    errors.push(`${prefix} campo "tempo" é obrigatório`);
  } else if (typeof item.tempo !== 'number' || item.tempo <= 0) {
    errors.push(`${prefix} "tempo" deve ser um número positivo`);
  } else if (item.tempo < 5) {
    errors.push(`${prefix} "tempo" deve ser pelo menos 5 segundos`);
  }

  return errors;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const sanitizeConfig = (config) => {
  if (!config || !config.itens) return config;

  const activeItems = config.itens.filter(item => {
    return item && item.ativo !== false && item.src && item.tipo && item.tempo;
  });

  return {
    ...config,
    itens: activeItems
  };
};

export const getConfigDefaults = () => {
  return {
    modo: 'Lista',
    configuracoes: {
      reload_config_interval: 300,
      transicao_tempo: 300,
      retry_max: 5,
      retry_interval: 30
    },
    itens: []
  };
};
