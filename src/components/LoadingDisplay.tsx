import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface LoadingDisplayProps {
  title?: string;
}

export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 60], [0, 360], {
    extrapolateRight: 'wrap',
  });

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
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          border: '8px solid #333',
          borderTopColor: '#fff',
          borderRadius: '50%',
          marginBottom: 40,
          transform: `rotate(${rotation}deg)`,
        }}
      />
      <div
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        データを読み込み中...
      </div>
      {title && (
        <div
          style={{
            fontSize: 24,
            color: '#aaa',
          }}
        >
          {title}
        </div>
      )}
    </AbsoluteFill>
  );
};