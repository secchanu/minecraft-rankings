import { MinecraftStats } from '../types';

export function getCustomStat(stats: MinecraftStats | undefined, statKey: string): number {
  if (!stats?.stats?.['minecraft:custom']) {
    return 0;
  }
  
  const customStats = stats.stats['minecraft:custom'];
  const key = `minecraft:${statKey}` as keyof typeof customStats;
  return customStats[key] ?? 0;
}

export function getMinedStat(stats: MinecraftStats | undefined, blockType?: string): number {
  if (!stats?.stats?.['minecraft:mined']) {
    return 0;
  }
  
  const mined = stats.stats['minecraft:mined'];
  
  if (!blockType) {
    // Return total mined blocks
    return Object.values(mined).reduce((sum, count) => sum + count, 0);
  }
  
  const key = `minecraft:${blockType}` as keyof typeof mined;
  return mined[key] ?? 0;
}

export function getUsedStat(stats: MinecraftStats | undefined, itemType?: string): number {
  if (!stats?.stats?.['minecraft:used']) {
    return 0;
  }
  
  const used = stats.stats['minecraft:used'];
  
  if (!itemType) {
    // Return total used items
    return Object.values(used).reduce((sum, count) => sum + count, 0);
  }
  
  const key = `minecraft:${itemType}` as keyof typeof used;
  return used[key] ?? 0;
}

export function formatMinecraftName(name: string): string {
  return name
    .replace('minecraft:', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export function cmToKm(cm: number): number {
  return Math.round(cm / 100000);
}