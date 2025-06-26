import React, { useMemo, useState, useEffect } from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  continueRender,
  delayRender,
  staticFile,
} from 'remotion';
import { RankingType, RankingItem } from './types';
import { StaticDataProcessor } from './utils/staticDataProcessor';
import { ErrorDisplay } from './components/ErrorDisplay';
import { LoadingDisplay } from './components/LoadingDisplay';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './config';
import { BACKGROUND_IMAGES } from './data/backgroundImages';

interface MinecraftRankingProps {
  title: string;
  rankingType: RankingType;
}

export const MinecraftRanking: React.FC<MinecraftRankingProps> = ({
  title,
  rankingType,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    // 静的データを使用するため、非同期処理は不要
    setLoading(false);
    try {
      const processor = StaticDataProcessor.getInstance();
      const data = processor.getRanking(rankingType, 5);
      setRankingData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
    }
    continueRender(handle);
  }, [rankingType, handle]);

  // Get deterministic background image based on ranking type
  const backgroundImage = useMemo(() => {
    // Use a deterministic random based on the ranking type to ensure consistency
    const seed = rankingType.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomIndex = seed % BACKGROUND_IMAGES.length;
    // staticFile properly resolves the path during bundling
    return staticFile(`images/${BACKGROUND_IMAGES[randomIndex]}`);
  }, [rankingType]);

  const titleOpacity = interpolate(
    frame,
    [0, ANIMATION_CONFIG.titleFadeInDuration],
    [0, 1]
  );

  const titleScale = spring({
    frame,
    fps,
    from: ANIMATION_CONFIG.titleScaleFrom,
    to: ANIMATION_CONFIG.titleScaleTo,
    durationInFrames: ANIMATION_CONFIG.titleFadeInDuration,
  });

  // Show loading or error states
  if (loading) {
    return <LoadingDisplay title={title} />;
  }

  if (error) {
    return <ErrorDisplay error={error} title={title} />;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: STYLE_CONFIG.backgroundColor }}>
      {/* Background Image */}
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <Img
          src={backgroundImage}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: STYLE_CONFIG.overlayGradient,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: STYLE_CONFIG.titleTop,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: STYLE_CONFIG.titleFontSize,
            fontWeight: 'bold',
            color: STYLE_CONFIG.defaultTextColor,
            textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Ranking List - Display from bottom to top, but position 1st at top */}
      <div
        style={{
          position: 'absolute',
          top: STYLE_CONFIG.contentTop,
          left: STYLE_CONFIG.contentPadding.left,
          right: STYLE_CONFIG.contentPadding.right,
          bottom: STYLE_CONFIG.contentPadding.bottom,
        }}
      >
        {rankingData.map((item, index) => {
          // Display order: 5th -> 4th -> 3rd -> 2nd -> 1st
          const displayOrder = rankingData.length - 1 - index;
          return (
            <RankingRow
              key={item.playerName}
              item={item}
              index={index}
              displayPosition={index}
              startFrame={ANIMATION_CONFIG.rowStartDelay + displayOrder * ANIMATION_CONFIG.rowStaggerDelay}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

interface RankingRowProps {
  item: RankingItem;
  index: number;
  displayPosition: number;
  startFrame: number;
}

const RankingRow: React.FC<RankingRowProps> = ({ item, index, displayPosition, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + ANIMATION_CONFIG.rowFadeInDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Top 3 get special animation
  const isTop3 = index < 3;
  
  const translateX = spring({
    frame: frame - startFrame,
    fps,
    from: isTop3 ? ANIMATION_CONFIG.rowSlideDistance * 1.5 : ANIMATION_CONFIG.rowSlideDistance,
    to: 0,
    durationInFrames: isTop3 ? ANIMATION_CONFIG.rowSlideDuration * 1.2 : ANIMATION_CONFIG.rowSlideDuration,
  });

  const scale = spring({
    frame: frame - startFrame,
    fps,
    from: ANIMATION_CONFIG.rowScaleFrom,
    to: ANIMATION_CONFIG.rowScaleTo,
    durationInFrames: ANIMATION_CONFIG.rowScaleDuration,
  });

  // Glow effect for top 3
  const glowIntensity = isTop3 ? interpolate(
    frame,
    [startFrame + 20, startFrame + 40],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) : 0;

  const rankColor = index < STYLE_CONFIG.rankColors.length
    ? STYLE_CONFIG.rankColors[index]
    : STYLE_CONFIG.defaultTextColor;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${displayPosition * 120}px`,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        padding: STYLE_CONFIG.rowPadding,
        boxShadow: 'none',
      }}
    >
      {/* Rank */}
      <div
        style={{
          fontSize: STYLE_CONFIG.rankFontSize,
          fontWeight: 'bold',
          color: rankColor,
          width: 100,
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {item.rank}
      </div>

      {/* Player Name */}
      <div
        style={{
          flex: 1,
          fontSize: STYLE_CONFIG.nameFontSize,
          color: STYLE_CONFIG.defaultTextColor,
          paddingLeft: 40,
          textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {item.playerName}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: STYLE_CONFIG.valueFontSize,
          fontWeight: 'bold',
          color: rankColor,
          textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {item.value.toLocaleString()} {item.unit}
      </div>
    </div>
  );
};
