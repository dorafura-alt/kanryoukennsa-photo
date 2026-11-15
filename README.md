# 金物検査

現場ごとに金物などの写真を貼り、「何通りか」を記入してPDFに出力するアプリです。
`index.html` 1ファイルだけで動きます（サーバー不要）。

## GitHub Pages で公開する手順

1. GitHub で新しいリポジトリを作成する（例: `kanamono-kensa`）。
2. 「Add file」→「Upload files」で `index.html` と `README.md` をアップロードし、「Commit changes」を押す。
3. リポジトリの「Settings」→「Pages」を開く。
4. 「Source」を「Deploy from a branch」にし、「Branch」を `main`、フォルダを `/ (root)` にして「Save」を押す。
5. 1〜2分後、`https://（ユーザー名）.github.io/kanamono-kensa/` で開ける。

## iPad で使う

- Safari でそのURLを開く。
- 共有ボタン →「ホーム画面に追加」で、アプリのように起動できる。
- 一度ネットがある所で開いておけば、ネットがない現場でも開ける（PDF作成も可）。
- 新しい版を push したら、ネットがある所で開いた時に自動で新しい版になる。

## 注意

- 写真と現場のデータは、**開いた端末・ブラウザの中**に保存される。端末をまたいで共有されない。
- ブラウザの「履歴とWebサイトデータの消去」をすると、データも消える。
- URL（ドメイン）が変わると、別のアプリ扱いになり、以前のデータは見えない。
- 必要な写真は、こまめにPDFで保存しておく。

## 使っているもの

- PDF作成: jsPDF 2.5.1（`jspdf.umd.min.js` をフォルダに同梱）
- オフライン対応（PWA）: `manifest.webmanifest`（名前・アイコン）、`sw.js`（オフライン用の仕組み）、アイコン画像4枚
