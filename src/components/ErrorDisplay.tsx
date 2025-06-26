import React from 'react';
import { AbsoluteFill } from 'remotion';

interface ErrorDisplayProps {
  error: string;
  title?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, title }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'sans-serif',
        padding: 50,
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 'bold',
          marginBottom: 30,
          color: '#ff4444',
        }}
      >
        ⚠️ エラーが発生しました
      </div>
      {title && (
        <div
          style={{
            fontSize: 40,
            marginBottom: 20,
            color: '#aaa',
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          fontSize: 24,
          color: '#ccc',
          textAlign: 'center',
          maxWidth: 800,
          lineHeight: 1.5,
        }}
      >
        {error}
      </div>
    </AbsoluteFill>
  );
};