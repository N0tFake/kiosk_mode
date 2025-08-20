import React from 'react';

const ErrorDisplay = ({ error, retryCount, onRetry }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff6b6b' }}>
        Sistema Temporariamente Indisponível
      </h1>
      
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '1rem 0'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Detalhes do Erro:</h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{error}</p>
        
        {retryCount > 0 && (
          <p style={{ fontSize: '0.9rem', color: '#ffd93d' }}>
            Tentativa {retryCount} de reconexão...
          </p>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          O sistema tentará reconectar automaticamente.
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
          >
            Tentar Novamente
          </button>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        fontSize: '0.8rem',
        color: '#888'
      }}>
        Sistema de Quiosque v1.0 | {new Date().toLocaleString('pt-BR')}
      </div>
    </div>
  );
};

export default ErrorDisplay;
