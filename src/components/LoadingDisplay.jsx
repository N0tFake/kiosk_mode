import React from 'react';

const LoadingDisplay = () => {
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
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        border: '8px solid #333',
        borderTop: '8px solid #4caf50',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '2rem'
      }}></div>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Carregando Sistema
      </h2>
      
      <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
        Aguarde enquanto o conteúdo é preparado...
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingDisplay;
