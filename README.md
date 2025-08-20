# Sistema de Quiosque - Modo 24/7

Um sistema robusto de quiosque desenvolvido em React para execução contínua 24 horas por dia, 7 dias por semana.

## 🚀 Características

- **Operação 24/7**: Sistema projetado para funcionar continuamente sem intervenção
- **Auto-recuperação**: Sistema de retry automático em caso de falhas
- **Monitoramento**: Monitoramento de performance, memória e conectividade
- **Configuração dinâmica**: Recarregamento automático de configurações
- **Suporte a múltiplas mídias**: Imagens, vídeos e dashboards Power BI
- **Prevenção de interferências**: Bloqueia zoom, menu de contexto e seleção de texto

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── media/
│   │   ├── ImageMedia.jsx      # Componente para imagens
│   │   ├── VideoMedia.jsx      # Componente para vídeos
│   │   └── PowerBIMedia.jsx    # Componente para Power BI
│   ├── Carousel.jsx            # Carrossel principal
│   ├── MediaRenderer.jsx       # Renderizador de mídia
│   ├── ErrorDisplay.jsx        # Exibição de erros
│   ├── LoadingDisplay.jsx      # Tela de carregamento
│   └── SystemMonitor.jsx       # Monitor do sistema
├── context/
│   └── KioskContext.jsx        # Contexto global do quiosque
├── hooks/
│   └── useKioskConfig.js       # Hook para configuração
├── utils/
│   └── configValidator.js      # Validação de configuração
└── App.jsx                     # Componente principal
```

## ⚙️ Configuração

### Arquivo de Configuração

Edite o arquivo `public/config_routes_pages.json`:

```json
{
  "modo": "Lista",
  "configuracoes": {
    "reload_config_interval": 300,
    "transicao_tempo": 300,
    "retry_max": 5,
    "retry_interval": 30
  },
  "itens": [
    {
      "id": 1,
      "tipo": "powerbi",
      "src": "https://app.powerbi.com/view?r=...",
      "tempo": 20,
      "ativo": true,
      "nome": "Dashboard Principal"
    },
    {
      "id": 2,
      "tipo": "imagem_web",
      "src": "https://exemplo.com/imagem.jpg",
      "tempo": 10,
      "ativo": true,
      "nome": "Imagem Promocional"
    }
  ]
}
```

### Parâmetros de Configuração

- **modo**: `"Lista"` ou `"Manual"`
- **reload_config_interval**: Intervalo de recarregamento da configuração em segundos (padrão: 300)
- **transicao_tempo**: Tempo de transição entre itens em milissegundos (padrão: 300)
- **retry_max**: Número máximo de tentativas de reconexão (padrão: 5)
- **retry_interval**: Intervalo entre tentativas em segundos (padrão: 30)

### Tipos de Mídia Suportados

1. **imagem_web**: Imagens de URLs remotas
2. **imagem_local**: Imagens locais (pasta public)
3. **video_web**: Vídeos de URLs remotas
4. **video_local**: Vídeos locais (pasta public)
5. **powerbi**: Dashboards do Power BI

### Parâmetros por Item

- **id**: Identificador único (obrigatório)
- **tipo**: Tipo de mídia (obrigatório)
- **src**: URL ou caminho do arquivo (obrigatório)
- **tempo**: Tempo de exibição em segundos (mínimo: 5)
- **ativo**: true/false para ativar/desativar o item
- **nome**: Nome descritivo do item (opcional)

## 🔧 Instalação e Execução

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

### Produção

```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

### Instalação em Sistema de Quiosque

1. **Build da aplicação**:
```bash
npm run build
```

2. **Configurar servidor web** (nginx, apache, etc.) para servir os arquivos da pasta `dist`

3. **Configurar navegador em modo quiosque**:
```bash
# Chrome/Chromium
chromium-browser --kiosk --autoplay-policy=no-user-gesture-required --disable-web-security --disable-features=TranslateUI --disable-ipc-flooding-protection http://localhost

# Firefox
firefox --kiosk http://localhost
```

## 🛡️ Recursos de Segurança e Estabilidade

### Prevenção de Interferências
- Cursor oculto
- Bloqueio de menu de contexto
- Prevenção de zoom (Ctrl +/-)
- Seleção de texto desabilitada
- Drag & drop bloqueado

### Monitoramento Automático
- Monitoramento de uso de memória
- Alertas de performance
- Log de erros centralizados
- Monitoramento de conectividade

### Sistema de Recuperação
- Retry automático em falhas de rede
- Recarregamento de configuração
- Fallbacks para conteúdo indisponível

## 🔍 Logs e Debugging

O sistema gera logs detalhados no console do navegador:

- Carregamento de configuração
- Erros de mídia
- Informações de performance
- Status de conectividade
- Atividade do usuário

Para acessar os logs em produção, use as ferramentas de desenvolvedor do navegador (F12).

## 📱 Suporte a Dispositivos

- **Desktop**: Windows, macOS, Linux
- **Tablets**: Android, iOS (com limitações de autoplay)
- **TVs/Displays**: Android TV, webOS, Tizen

### Recomendações de Hardware

- **RAM**: Mínimo 4GB (recomendado 8GB+)
- **CPU**: Dual-core 2GHz+
- **Rede**: Conexão estável de banda larga
- **Display**: Resolução mínima 1920x1080

## 🚨 Solução de Problemas

### Problemas Comuns

1. **Vídeos não reproduzem automaticamente**:
   - Verifique se o atributo `muted` está ativo
   - Configure o navegador para permitir autoplay

2. **Power BI não carrega**:
   - Verifique as URLs dos relatórios
   - Confirme permissões de acesso
   - Verifique conexão com internet

3. **Sistema trava ou fica lento**:
   - Monitore uso de memória nos logs
   - Reinicie o navegador
   - Verifique configuração de hardware

4. **Configuração não recarrega**:
   - Verifique sintaxe JSON
   - Confirme que o arquivo está acessível
   - Verifique logs de erro

### Manutenção Preventiva

- Reiniciar o sistema semanalmente
- Monitorar logs de erro regularmente
- Atualizar configurações conforme necessário
- Verificar conectividade de rede
- Limpar cache do navegador mensalmente

## 📄 Licença

Este projeto está licenciado sob a MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
