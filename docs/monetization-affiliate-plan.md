# マネタイズ・アフィリエイト設計メモ

## 目的

有料アプリ以外の収益化案を整理する。Webサイトとして運営する場合、旅行前・移動前・困った時の自然な導線にアフィリエイトを置けるため、アプリ販売より広い収益導線を作れる。

ただし、このサービスの価値は「移動中に迷わせないこと」にある。緊急時、乗車直前、人に見せる画面では収益導線を強く出さない。

初期リリースは、英語Webサイト + スマホ対応Webツールを優先する。PWA化は初期候補に含め、ネイティブアプリ化はWebで流入・利用・収益導線を検証した後に判断する。

ネイティブアプリ化できた場合は、App Store / Google Play からの検索・カテゴリ露出をWebとは別の流入口として扱う。Webコンテンツからアプリへ、アプリから関連Webコンテンツへ送客し、流入経路を複線化する。

SEO記事とキーワード設計は、MVPのWeb/PWAツール骨子が固まった後に行う。先に記事量産へ進まず、交通手段別Flow、最小画面セット、見せる日本語、復帰導線の完成度を優先する。

## 基本方針

- ユーザー救済を収益性より優先する。
- 移動中の主画面に広告を常時表示しない。
- 収益導線は「困りごとの解決策」として出す。
- Webコンテンツ、旅行前準備、Google Mapsから戻った後、警告画面、その他の移動手段で表示する。
- 人に見せる日本語画面、運転手向け画面、乗車直前の短い確認画面には表示しない。
- アフィリエイト案件は変動するため、`AffiliateProvider` と `MonetizedActionSlot` で差し替え可能にする。

## おすすめ順

### 1. eSIM / SIM / Wi-Fi

最優先候補。Google Maps前提のサービスなので、通信手段はアプリ価値と直結する。

候補:
- Airalo
- Ubigi
- Japan Wireless
- Sakura Mobile / Sakura SIM
- Mobal
- Ninja WiFi

表示場所:
- Webコンテンツ: `Japan eSIM for Google Maps`
- Webコンテンツ: `How to use Google Maps in Japan`
- 初回オンボーディング後の旅行前準備
- Google Mapsから戻った後、通信不安定の説明
- オフライン最低表示の説明ページ

表示しない場所:
- 駅員・運転手に見せる画面
- 乗車直前確認
- バス乗車中・緊急時

表示例:

```text
Need internet for Google Maps?
Google Mapsには通信が必要。

Prepare an eSIM or pocket Wi-Fi before traveling.
旅行前にeSIMかポケットWi-Fiを準備。
```

評価:
- Webサイト収益との相性が高い。
- 英語ユーザーに自然。
- 旅行前ページで出しやすい。

### 2. タクシー / 空港送迎

困った時の救済導線として強い。タクシーアプリはUX価値を優先し、アフィリエイト案件があるものだけ収益候補として扱う。

候補:
- Uber
- GO
- DiDi
- S.RIDE
- Airport Taxi
- local taxi / ask staff

表示場所:
- `Switch to taxi` 後
- 夜間・本数少ない地域の `WarningBanner`
- バスが満員、来ない、乗り場が分からない時
- 空港発着、早朝深夜、大きな荷物がある時
- Webコンテンツ: `Best taxi apps in Japan for tourists`
- Webコンテンツ: `Airport transfer in Japan`

表示しない場所:
- タクシードライバーに見せる画面
- バス運転手に見せる画面
- 駅員・係員への確認文画面

評価:
- Uberは英語ユーザーとの相性が強いが、既存ユーザーが多い場合はアフィリエイト成果になりにくい。
- GOは国内カバー力が強いが、現時点ではアフィリエイトなし前提。UX候補として残す。
- DiDi / S.RIDE / Airport Taxi は案件がある場合に収益候補。

### 3. 荷物預かり / ラゲッジ配送

荷物が多いユーザー、チェックイン前後、駅構内移動、階段回避と相性がよい。

候補:
- Radical Storage
- ecbo cloak
- luggage delivery / airport luggage delivery
- coin locker guide

表示場所:
- Webコンテンツ: `Where to store luggage in Japan`
- タクシー切り替え画面の補足
- 最後の徒歩区間前
- 駅・バス停到着後に荷物が多い場合
- ホテル出発前、チェックイン前、チェックアウト後の準備ページ

表示しない場所:
- 乗車直前
- 人に見せる日本語画面

表示例:

```text
Carrying large luggage?
大きな荷物あり。

Store luggage before using buses or crowded trains.
バスや混雑した電車の前に荷物預かりを検討。
```

評価:
- 移動ストレス軽減と相性が高い。
- WebコンテンツでSEO流入を取りやすい。
- アプリ内では控えめに表示する。

### 4. 体験予約 / 観光チケット / 交通チケット

目的地到着後、または旅行前のWebコンテンツで使う。移動中には出しすぎない。

候補:
- Klook
- GetYourGuide
- Viator
- 各種空港送迎、観光パス、施設チケット

表示場所:
- Webコンテンツ: `How to get to [tourist spot]`
- 最後の徒歩区間確認の後、到着完了後
- 観光地別ページ
- 新幹線・空港・都市間移動の準備ページ
- その他の移動手段ページ

表示しない場所:
- 移動中の判断画面
- バス・電車乗車直前
- 警告画面

評価:
- Webサイト運営と相性が高い。
- アプリ内では到着後か旅行前に限定する。

### 5. 旅行保険 / 緊急サポート / 医療・紛失対応

単価は高い可能性があるが、信頼性と表現に注意が必要。MVPでは積極表示しない。

表示場所:
- Webコンテンツ: `What to do if you miss the last train in Japan`
- Webコンテンツ: `Emergency phrases for Japan travel`
- 後続拡張のトラブル対応ページ

表示しない場所:
- 緊急時の主画面
- ユーザーが焦っている画面

評価:
- 後続検討。
- 収益性より信頼性を優先する。

## Webサイトで用意するページ案

SEOとアフィリエイト導線を両立するページ。

| ページ | 主な導線 |
|---|---|
| `/en/japan-google-maps-esim/` | eSIM / Wi-Fi |
| `/en/japan-taxi-apps-tourists/` | Uber / DiDi / S.RIDE / GO / Airport Taxi |
| `/en/japan-airport-transfer/` | Airport Taxi / Klook / GetYourGuide |
| `/en/japan-luggage-storage/` | Radical Storage / ecbo cloak / coin locker guide |
| `/en/japan-bus-help/` | タクシー切替 / eSIM |
| `/en/kyoto-bus-survival-guide/` | タクシー切替 / eSIM / luggage |
| `/en/japan-shinkansen-ticket-help/` | Klook / GetYourGuide / eSIM |
| `/en/last-train-last-bus-japan/` | Taxi / Airport Taxi / eSIM |

## アプリ/サイト内の表示スロット

| スロット | 表示してよいもの | 注意 |
|---|---|---|
| `PreTripRecommendationSlot` | eSIM、Wi-Fi、空港送迎、荷物預かり | 旅行前・Web向け |
| `WarningRecoverySlot` | Taxi、Airport Taxi、local taxi | 夜間・本数少ない時だけ |
| `BackFromMapsSlot` | eSIM補足、次の便確認、Taxi | 控えめに表示 |
| `OtherTransportationSlot` | Klook、GetYourGuide、フェリー/ロープウェイ公式案内 | 詳細Flowにしない |
| `DestinationArrivalSlot` | 体験予約、チケット、荷物預かり | 到着後のみ |
| `LuggageContextSlot` | 荷物預かり、タクシー、空港送迎 | 荷物が多い時だけ |

表示しないスロット:
- `ShowJapaneseScreen`
- `DriverScreen`
- `BoardingConfirmationScreen`
- `EmergencyShortActionScreen`

## 優先実装

1. Webサイト向けの `PreTripRecommendationSlot`
2. アプリ/サイト共通の `TaxiProviderResolver`
3. `LuggageContextSlot`
4. `DestinationArrivalSlot`
5. 後続で旅行保険・緊急サポート

## 参照候補

- Airalo affiliate program: https://partners.airalo.com/solutions/affiliates
- Ubigi affiliate program: https://cellulardata.ubigi.com/pro/what-is-the-ubigi-affiliate-program/
- Japan Wireless affiliate program: https://www.japan-wireless.com/en/affiliate
- Radical Storage affiliate program: https://radicalstorage.com/affiliates
- GetYourGuide travel agents/partner portal: https://www.getyourguide.agency/
- Klook affiliate information: https://www.klook.com/en-US/blog/partner/tracking-your-performance/





