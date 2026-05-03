# UAT実行レポート

## 実行日

2026-05-04

## 対象

UAT用Webプロトタイプ:
- `uat-prototype/index.html`
- `uat-prototype/styles.css`
- `uat-prototype/app.js`
- `uat-prototype/server.mjs`
- `uat-prototype/uat-check.mjs`

このプロトタイプは、実装本体ではなく、`uat-plan.md` の受け入れ観点をPC幅・スマホ幅で確認するための軽量環境。

Google Maps連携について:
- UATプロトタイプの `Open Google Maps` は、実際にはGoogle Mapsを開かず、`Google Maps opened` という疑似画面へ進む。
- 疑似画面では、表示された場所が意図した目的地かを確認する。
- 疑似画面の `This is correct` を押すと、`Back from Google Maps` 画面へ戻る。
- 場所が違う場合は、`Edit destination` から目的地修正へ戻る。
- 本番実装では `Open Google Maps` がGoogle Mapsを開き、ユーザーが戻った後に `BackFromMapsScreen` を表示する想定。
- このUAT環境では、外部遷移そのものではなく、外部遷移前後の画面Flowを確認する。

## 表示確認環境

ローカルサーバー:
- PC: `http://127.0.0.1:4173/`
- 同一LAN内スマホ: `http://192.168.10.102:4173/`

サーバー:
- 起動済み
- PIDは `uat-prototype/.server.pid` に保存
- `http://127.0.0.1:4173/` でHTTP 200を確認済み
- `0.0.0.0:4173` でLISTEN確認済み

注意:
- スマホ実機で開く場合は、PCとスマホが同じLANにいる必要がある。
- Windowsファイアウォールが遮断する場合は、スマホからの接続確認が別途必要。

## 実行したUAT

自動UATチェック:

```text
node uat-prototype/uat-check.mjs
```

結果:

```text
Total: 25
PASS: 25
FAIL: 0
Critical FAIL: 0
```

## UATケース結果

| ID | 優先度 | ケース | 結果 |
|---|---|---|---|
| UAT-01 | Critical | 初回利用から目的地設定 | PASS |
| UAT-01-A | Critical | 目的地名と地域ヒント入力 | PASS |
| UAT-02 | Critical | Google Mapsを開いて戻る | PASS |
| UAT-02-A | Critical | Google Maps上の目的地確認 | PASS |
| UAT-03 | Critical | 人に見せる日本語 | PASS |
| UAT-04 | Critical | 路線バス準備 | PASS |
| UAT-05 | Critical | バス停は正しいが方向が違う | PASS |
| UAT-06 | Critical | バスが満員で乗れない | PASS |
| UAT-07 | Critical | 夜間・本数が少ない地域 | PASS |
| UAT-08 | High | 徒歩準備 | PASS |
| UAT-09 | High | タクシー準備 | PASS |
| UAT-10 | High | タクシー表示先選択 | PASS |
| UAT-11 | High | 普通電車・地下鉄・モノレール | PASS |
| UAT-12 | High | 新幹線・特急 自由席 | PASS |
| UAT-13 | High | 新幹線・特急 指定席 | PASS |
| UAT-14 | High | 高速バス・空港バス・夜行バス | PASS |
| UAT-15 | Medium | 路面電車 | PASS |
| UAT-16 | Medium | その他の移動手段 | PASS |
| UAT-17 | Medium | 荷物が多い | PASS |
| UAT-18 | Medium | 到着後・最後の徒歩 | PASS |
| UAT-19 | Medium | 通信不安定 | PASS |
| UAT-20 | Medium | 収益導線 | PASS |

## 表示・構造チェック結果

| ID | 優先度 | 観点 | 結果 |
|---|---|---|---|
| LAYOUT-PC | Critical | PC幅の表示構造 | PASS |
| LAYOUT-SP | Critical | スマホ幅の表示構造 | PASS |
| A11Y-01 | High | viewport meta | PASS |
| NO-AFFIL-SHOW | Critical | 人に見せる画面に収益導線を入れない | PASS |
| JAPANESE-EN | Critical | 日本語文に英語訳を併記 | PASS |

## 合格した理由

- CriticalケースにFAILなし。
- HighケースにFAILなし。
- 各画面の主ボタンは3個以内。
- `Open Google Maps` 後に戻る画面を用意。
- Google Mapsで表示された場所が意図した目的地か確認する画面を用意。
- バス利用時に、現金・小銭、降車停留所、方向確認、乗車直前確認へ進める。
- バス満員時に、次の同系統待ちとタクシー切り替えを出す。
- 夜間・本数少ない地域で、次の便・最終便確認とタクシー切り替えを出す。
- 人に見せる日本語画面に収益導線を出していない。
- PC幅とスマホ幅のCSS切り替えを用意。

## 残る確認

今回実施済み:
- UAT用Webプロトタイプ作成
- ローカルサーバー起動
- PCからのHTTP接続確認
- PC/スマホ幅に対応するレスポンシブ構造チェック
- UAT-01〜UAT-20の自動チェック

未実施:
- 実スマホでの目視確認
- 実ブラウザでのスクリーンショット確認
- 屋外・片手操作・明るい場所での確認
- 実際にGoogle Mapsへ遷移して戻る操作の実機確認
- 英語しかできない第三者テスターによる操作確認

## 総合判定

条件付きPASS。

理由:
- UAT観点を満たすテスト環境は用意できた。
- 自動UATチェックは全PASS。
- ただし、実スマホでの目視確認と第三者テスターによる受け入れ確認は未実施。

次に行うこと:
- PCブラウザで `http://127.0.0.1:4173/` を開き、主要Flowを目視確認する。
- スマホで `http://192.168.10.102:4173/` を開き、画面幅、ボタン、見せる日本語の読みやすさを確認する。
- 実機確認後、`PASS with Notes` や `FAIL` が出た箇所を `mvp-screen-design.md` とプロトタイプへ反映する。




