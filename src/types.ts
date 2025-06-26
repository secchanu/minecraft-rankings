export interface MinecraftStats {
  stats: {
    'minecraft:custom'?: {
      'minecraft:deaths'?: number;
      'minecraft:player_kills'?: number;
      'minecraft:mob_kills'?: number;
      'minecraft:play_time'?: number;
      'minecraft:walk_one_cm'?: number;
      'minecraft:fly_one_cm'?: number;
      'minecraft:sleep_in_bed'?: number;
      'minecraft:damage_dealt'?: number;
      'minecraft:damage_taken'?: number;
      'minecraft:fish_caught'?: number;
      'minecraft:traded_with_villager'?: number;
      'minecraft:enchant_item'?: number;
      'minecraft:open_chest'?: number;
      [key: string]: number | undefined;
    };
    'minecraft:killed'?: {
      [mobType: string]: number;
    };
    'minecraft:killed_by'?: {
      [source: string]: number;
    };
    'minecraft:mined'?: {
      [blockType: string]: number;
    };
    'minecraft:used'?: {
      [itemType: string]: number;
    };
  };
  DataVersion: number;
}

export interface PlayerData {
  uuid: string;
  name: string;
  stats?: MinecraftStats;
}

export interface RankingItem {
  rank: number;
  playerName: string;
  value: number;
  unit?: string;
}

export type RankingType = 
  | 'deaths'
  | 'playerKills'
  | 'mobKills'
  | 'walkDistance'
  | 'flyDistance'
  | 'sleepCount'
  | 'damageDealt'
  | 'damageTaken'
  | 'fishCaught'
  | 'trades'
  | 'enchants'
  | 'chestsOpened'
  | 'blocksMinedTotal'
  | 'itemsUsedTotal'
  | 'deathCauses'
  | 'mobKillsByType'
  | 'achievements';