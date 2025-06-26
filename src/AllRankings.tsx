import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
} from 'remotion';
import { MinecraftRanking } from './MinecraftRanking';
import { RankingType } from './types';

interface RankingConfig {
  id: string;
  title: string;
  type: RankingType;
}

const SECONDS_PER_RANKING = 10;

export const AllRankings: React.FC = () => {
  const { fps } = useVideoConfig();
  const framesPerRanking = SECONDS_PER_RANKING * fps;

  const rankings: RankingConfig[] = [
    { id: 'deaths', title: '死亡回数ランキング', type: 'deaths' },
    { id: 'player-kills', title: 'プレイヤーキル数ランキング', type: 'playerKills' },
    { id: 'mob-kills', title: 'モブキル数ランキング', type: 'mobKills' },
    { id: 'walk-distance', title: '歩行距離ランキング', type: 'walkDistance' },
    { id: 'fly-distance', title: '飛行距離ランキング', type: 'flyDistance' },
    { id: 'sleep-count', title: '睡眠回数ランキング', type: 'sleepCount' },
    { id: 'damage-dealt', title: '与えたダメージランキング', type: 'damageDealt' },
    { id: 'damage-taken', title: '受けたダメージランキング', type: 'damageTaken' },
    { id: 'fish-caught', title: '釣り回数ランキング', type: 'fishCaught' },
    { id: 'trades', title: '取引回数ランキング', type: 'trades' },
    { id: 'enchants', title: 'エンチャント回数ランキング', type: 'enchants' },
    { id: 'chests-opened', title: 'チェスト開閉回数ランキング', type: 'chestsOpened' },
    { id: 'blocks-mined', title: '採掘ブロック数ランキング', type: 'blocksMinedTotal' },
    { id: 'items-used', title: 'アイテム使用回数ランキング', type: 'itemsUsedTotal' },
    { id: 'death-causes', title: '死因ランキング', type: 'deathCauses' },
    { id: 'mob-kills-by-type', title: 'モブ種類別キル数ランキング', type: 'mobKillsByType' },
    { id: 'achievements', title: '獲得実績数ランキング', type: 'achievements' },
  ];

  return (
    <AbsoluteFill>
      {rankings.map((ranking, index) => (
        <Sequence
          key={ranking.id}
          from={index * framesPerRanking}
          durationInFrames={framesPerRanking}
        >
          <MinecraftRanking
            title={ranking.title}
            rankingType={ranking.type}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};