# Minecraft Rankings Video Generator

Remotionを使用してMinecraftのプレイヤー統計データからランキング動画を生成するプロジェクトです。

## 機能

- 17種類のランキングを1つの動画に連続表示（各10秒）
- アニメーション付きランキング表示（下位から上位への表示）
- 背景画像のランダム表示
- エラーハンドリングとローディング表示

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. データの準備

**重要**: このリポジトリにはサンプルデータは含まれていません。以下の手順でデータを準備してください：

### データ配置方法

1. **Minecraftサーバーのデータを配置**
   ```
   public/data/
   ├── stats/           # プレイヤー統計JSONファイル ({UUID}.json)
   ├── advancements/    # プレイヤー実績JSONファイル ({UUID}.json)  
   └── whitelist.json   # プレイヤー情報
   ```

2. **背景画像を配置**
   ```
   public/images/
   └── *.jpg または *.png  # 任意の数の背景画像
   ```
   - 推奨サイズ: 1920x1080px
   - 最低1枚必要

3. **データを処理**
   ```bash
   npm run update-data
   ```
   これにより以下が自動生成されます：
   - `src/data/playerData.ts` - プレイヤー名とUUIDの対応
   - `src/data/fullPlayerStats.ts` - プレイヤー統計データ
   - `src/data/playerAchievements.ts` - 実績数データ
   - `src/data/backgroundImages.ts` - 背景画像リスト
   
   **注意**: src/data/内のファイルはすべてGit管理対象外です

## 使用方法

### 開発モード（Remotion Studio）
```bash
npm start
```

### 動画のビルド
```bash
npm run build
```

出力先: `out/minecraft-rankings.mp4`

## ランキング一覧

1. 死亡回数ランキング
2. プレイヤーキル数ランキング
3. モブキル数ランキング
4. プレイ時間ランキング
5. 歩行距離ランキング
6. 飛行距離ランキング
7. 睡眠回数ランキング
8. 与えたダメージランキング
9. 受けたダメージランキング
10. 釣り回数ランキング
11. 取引回数ランキング
12. エンチャント回数ランキング
13. チェスト開閉回数ランキング
14. 採掘ブロック数ランキング
15. アイテム使用回数ランキング
16. 死因ランキング
17. モブ種類別キル数ランキング
18. 獲得実績数ランキング

## プロジェクト構造

```
minecraft-rankings/
├── src/
│   ├── index.tsx              # エントリーポイント
│   ├── Root.tsx               # ルートコンポジション
│   ├── AllRankings.tsx        # 全ランキングのシーケンス
│   ├── MinecraftRanking.tsx   # 個別ランキングコンポーネント
│   ├── types.ts               # 型定義
│   ├── config.ts              # 設定値
│   ├── components/            # UIコンポーネント
│   ├── utils/                 # ユーティリティ
│   └── data/                  # 生成されたデータ (Git管理対象外)
├── public/
│   ├── data/                  # Minecraftサーバーデータ (要配置)
│   │   ├── stats/            # プレイヤー統計JSON
│   │   ├── advancements/     # プレイヤー実績JSON
│   │   └── whitelist.json    # プレイヤー情報
│   └── images/                # 背景画像 (要配置)
├── scripts/
│   ├── extract-stats.js       # 統計データ抽出スクリプト
│   └── update-images.js       # 画像リスト更新スクリプト
└── package.json
```

## データ形式

### whitelist.json
```json
[
  {
    "uuid": "player-uuid",
    "name": "PlayerName"
  }
]
```

### stats/{UUID}.json
Minecraftが生成する標準的な統計ファイル形式

## 注意事項

- Remotionの実行にはChrome/Chromiumが必要です
- WSL環境では追加の依存関係が必要な場合があります
- 背景画像は最低1枚必要です
- プレイヤーデータがない場合はランキングが空になります
- `public/data/`、`public/images/`、`src/data/` の内容はGit管理対象外です
- 初回実行時は必ず `npm run update-data` を実行してデータファイルを生成してください

## 開発時のコマンド

```bash
# データ更新（統計と実績の抽出 + 画像リスト更新）
npm run update-data

# 画像リストのみ更新
npm run update-images

# 開発サーバー起動
npm start

# 動画ビルド
npm run build
```
