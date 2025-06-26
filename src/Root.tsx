import React from 'react';
import { Composition } from 'remotion';
import { AllRankings } from './AllRankings';

const FRAME_RATE = 30;
const SECONDS_PER_RANKING = 10;
const TOTAL_RANKINGS = 17;
const TOTAL_DURATION_SECONDS = SECONDS_PER_RANKING * TOTAL_RANKINGS;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="minecraft-rankings"
      component={AllRankings}
      durationInFrames={TOTAL_DURATION_SECONDS * FRAME_RATE}
      fps={FRAME_RATE}
      width={1920}
      height={1080}
    />
  );
};