import { MinecraftStats, PlayerData, RankingItem, RankingType } from '../types';
import { whitelistData } from '../data/playerData';
import { fullPlayerStats } from '../data/fullPlayerStats';
import { playerAchievements } from '../data/playerAchievements';
import { 
  getCustomStat, 
  getMinedStat, 
  getUsedStat, 
  formatMinecraftName,
  cmToKm
} from './statsHelpers';

export class StaticDataProcessor {
  private static instance: StaticDataProcessor;
  private players: PlayerData[] = [];

  static getInstance(): StaticDataProcessor {
    if (!StaticDataProcessor.instance) {
      StaticDataProcessor.instance = new StaticDataProcessor();
      StaticDataProcessor.instance.loadData();
    }
    return StaticDataProcessor.instance;
  }

  private loadData(): void {
    this.players = whitelistData.map(player => ({
      uuid: player.uuid,
      name: player.name,
      stats: fullPlayerStats[player.uuid] || { stats: {} }
    }));
  }

  getRanking(type: RankingType, limit: number = 5): RankingItem[] {
    let rankings: Array<{ playerName: string; value: number }> = [];

    switch (type) {
      case 'deaths':
        rankings = this.getDeathsRanking();
        break;
      case 'playerKills':
        rankings = this.getPlayerKillsRanking();
        break;
      case 'mobKills':
        rankings = this.getMobKillsRanking();
        break;
      case 'walkDistance':
        rankings = this.getWalkDistanceRanking();
        break;
      case 'flyDistance':
        rankings = this.getFlyDistanceRanking();
        break;
      case 'sleepCount':
        rankings = this.getSleepCountRanking();
        break;
      case 'damageDealt':
        rankings = this.getDamageDealtRanking();
        break;
      case 'damageTaken':
        rankings = this.getDamageTakenRanking();
        break;
      case 'fishCaught':
        rankings = this.getFishCaughtRanking();
        break;
      case 'trades':
        rankings = this.getTradesRanking();
        break;
      case 'enchants':
        rankings = this.getEnchantsRanking();
        break;
      case 'chestsOpened':
        rankings = this.getChestsOpenedRanking();
        break;
      case 'blocksMinedTotal':
        rankings = this.getBlocksMinedTotalRanking();
        break;
      case 'itemsUsedTotal':
        rankings = this.getItemsUsedTotalRanking();
        break;
      case 'deathCauses':
        rankings = this.getDeathCausesRanking();
        break;
      case 'mobKillsByType':
        rankings = this.getMobKillsByTypeRanking();
        break;
      case 'achievements':
        rankings = this.getAchievementsRanking();
        break;
    }

    return rankings
      .sort((a, b) => b.value - a.value)
      .slice(0, limit)
      .map((item, index) => ({
        rank: index + 1,
        playerName: item.playerName,
        value: item.value,
        unit: this.getUnit(type)
      }));
  }

  private getUnit(type: RankingType): string {
    switch (type) {
      case 'deaths':
      case 'playerKills':
      case 'mobKills':
      case 'sleepCount':
      case 'fishCaught':
      case 'trades':
      case 'enchants':
      case 'chestsOpened':
      case 'blocksMinedTotal':
      case 'itemsUsedTotal':
        return '回';
      case 'walkDistance':
      case 'flyDistance':
        return 'km';
      case 'damageDealt':
      case 'damageTaken':
        return 'ダメージ';
      case 'achievements':
        return '個';
      default:
        return '';
    }
  }

  private getDeathsRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'deaths')
    }));
  }

  private getPlayerKillsRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'player_kills')
    }));
  }

  private getMobKillsRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'mob_kills')
    }));
  }

  private getWalkDistanceRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: cmToKm(getCustomStat(player.stats, 'walk_one_cm'))
    }));
  }

  private getFlyDistanceRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: cmToKm(getCustomStat(player.stats, 'fly_one_cm'))
    }));
  }

  private getSleepCountRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'sleep_in_bed')
    }));
  }

  private getDamageDealtRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'damage_dealt')
    }));
  }

  private getDamageTakenRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'damage_taken')
    }));
  }

  private getFishCaughtRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'fish_caught')
    }));
  }

  private getTradesRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'traded_with_villager')
    }));
  }

  private getEnchantsRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'enchant_item')
    }));
  }

  private getChestsOpenedRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getCustomStat(player.stats, 'open_chest')
    }));
  }

  private getBlocksMinedTotalRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getMinedStat(player.stats)
    }));
  }

  private getItemsUsedTotalRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: getUsedStat(player.stats)
    }));
  }

  private getDeathCausesRanking() {
    const allCauses: Map<string, number> = new Map();
    
    this.players.forEach(player => {
      if (!player.stats?.stats?.['minecraft:killed_by']) return;
      
      const killedBy = player.stats.stats['minecraft:killed_by'];
      Object.entries(killedBy).forEach(([cause, count]) => {
        const formattedCause = formatMinecraftName(cause);
        allCauses.set(formattedCause, (allCauses.get(formattedCause) || 0) + count);
      });
    });

    return Array.from(allCauses.entries()).map(([cause, count]) => ({
      playerName: cause,
      value: count
    }));
  }

  private getMobKillsByTypeRanking() {
    const allMobs: Map<string, number> = new Map();
    
    this.players.forEach(player => {
      if (!player.stats?.stats?.['minecraft:killed']) return;
      
      const killed = player.stats.stats['minecraft:killed'];
      Object.entries(killed).forEach(([mob, count]) => {
        const formattedMob = formatMinecraftName(mob);
        allMobs.set(formattedMob, (allMobs.get(formattedMob) || 0) + count);
      });
    });

    return Array.from(allMobs.entries()).map(([mob, count]) => ({
      playerName: mob,
      value: count
    }));
  }

  private getAchievementsRanking() {
    return this.players.map(player => ({
      playerName: player.name,
      value: playerAchievements[player.uuid] || 0
    }));
  }
}