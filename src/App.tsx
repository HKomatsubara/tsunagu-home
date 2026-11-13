import { useMemo, useRef, useState } from "react";

type Home = {
  id: number;
  name: string;
  area: string;
  address: string;
  disabilities: string[];
  description: string;
  image: string;
  roomImage: string;
  feature: string;
};

const homes: Home[] = [
  {
    id: 1,
    name: "ひだまりハウス 千種",
    area: "名古屋市",
    address: "愛知県名古屋市千種区春岡2丁目",
    disabilities: ["精神障がい", "知的障がい"],
    description:
      "緑の多い静かな住宅街にある、定員6名の小さなホームです。スタッフが毎日の食事や服薬、暮らしの相談を丁寧にサポートします。",
    image:
      "https://images.unsplash.com/photo-1747892736982-ee5fb3f6481f?auto=format&fit=crop&w=1200&q=85",
    roomImage:
      "https://images.unsplash.com/photo-1632790929202-a79cd10d9076?auto=format&fit=crop&w=700&q=85",
    feature: "夜間スタッフ常駐",
  },
  {
    id: 2,
    name: "そよかぜホーム 神戸",
    area: "神戸市",
    address: "兵庫県神戸市東灘区本山北町3丁目",
    disabilities: ["知的障がい", "発達障がい"],
    description:
      "明るいリビングに自然とみんなが集まる、あたたかな住まいです。最寄り駅やスーパーも近く、地域での自立した生活を応援します。",
    image:
      "https://images.unsplash.com/photo-1610375233775-6e0166927193?auto=format&fit=crop&w=1200&q=85",
    roomImage:
      "https://images.unsplash.com/photo-1712232907812-4bd219a99a49?auto=format&fit=crop&w=700&q=85",
    feature: "駅から徒歩8分",
  },
  {
    id: 3,
    name: "つむぎの家 伏見",
    area: "京都市",
    address: "京都府京都市伏見区深草西浦町4丁目",
    disabilities: ["精神障がい"],
    description:
      "自分のペースを大切にできる、全室個室のホームです。落ち着いた環境のなかで、経験豊かなスタッフが新しい暮らしを支えます。",
    image:
      "https://images.unsplash.com/photo-1610333684078-c89bd57f2e46?auto=format&fit=crop&w=1200&q=85",
    roomImage:
      "https://images.unsplash.com/photo-1682787283049-d37de81646b4?auto=format&fit=crop&w=700&q=85",
    feature: "全室個室",
  },
  {
    id: 4,
    name: "よりそいテラス 天王寺",
    area: "大阪市",
    address: "大阪府大阪市天王寺区清水谷町6丁目",
    disabilities: ["身体障がい", "知的障がい"],
    description:
      "段差の少ない住環境と、ゆったりした共有スペースが魅力です。一人ひとりの「できること」を一緒に増やしていきます。",
    image:
      "https://images.unsplash.com/photo-1712232907812-4bd219a99a49?auto=format&fit=crop&w=1200&q=85",
    roomImage:
      "https://images.unsplash.com/photo-1610375233775-6e0166927193?auto=format&fit=crop&w=700&q=85",
    feature: "バリアフリー対応",
  },
  {
    id: 5,
    name: "おかえりの家 名東",
    area: "名古屋市",
    address: "愛知県名古屋市名東区高針1丁目",
    disabilities: ["発達障がい", "精神障がい"],
    description:
      "「ただいま」と帰りたくなる家庭的な雰囲気を大切にしています。生活リズムづくりから就労まで、切れ目なくサポートします。",
    image:
      "https://images.unsplash.com/photo-1695150940824-abf3c50755cc?auto=format&fit=crop&w=1200&q=85",
    roomImage:
      "https://images.unsplash.com/photo-1632790929202-a79cd10d9076?auto=format&fit=crop&w=700&q=85",
    feature: "就労サポートあり",
  },
  {
    id: 6,
    name: "こもれびホーム 阿倍野",
    area: "大阪市",
    address: "大阪府大阪市阿倍野区昭和町3丁目",
    disabilities: ["身体障がい", "発達障がい"],
    description:
      "陽の光が入る開放的なホーム。栄養バランスのよい手づくりごはんと、24時間の見守りで安心できる毎日をつくります。",
    image:
      "https://images.unsplash.com/photo-1632790929202-a79cd10d9076?auto=format&fit=crop&w=1200&q=85",
    roomImage:
      "https://images.unsplash.com/photo-1712232907812-4bd219a99a49?auto=format&fit=crop&w=700&q=85",
    feature: "手づくりの食事",
  },
];

const areas = ["名古屋市", "大阪市", "神戸市", "京都市"];
const disabilityTypes = ["身体障がい", "知的障がい", "精神障がい", "発達障がい"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export default function App() {
  const [area, setArea] = useState("");
  const [disability, setDisability] = useState("");
  const [applied, setApplied] = useState({ area: "", disability: "" });
  const [selectedHome, setSelectedHome] = useState<Home | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const results = useMemo(
    () =>
      homes.filter(
        (home) =>
          (!applied.area || home.area === applied.area) &&
          (!applied.disability || home.disabilities.includes(applied.disability)),
      ),
    [applied],
  );

  const handleSearch = () => {
    setApplied({ area, disability });
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleClear = () => {
    setArea("");
    setDisability("");
    setApplied({ area: "", disability: "" });
  };

  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#3d342d]">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label="つなぐHome トップ">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>
              <strong>つなぐHome</strong>
              <small>障がい者グループホーム検索</small>
            </span>
          </a>
          <div className="header-right">
            <p>
              <span>はじめての方もお気軽に</span>
              <strong>ぴったりの住まい探しをお手伝い</strong>
            </p>
            <a href="#guide" className="header-link">
              ご利用ガイド
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">自分らしく、安心して暮らせる場所へ</p>
            <h1>
              まずは<span>見学</span>から、
              <br />
              あなたに合う住まい探し。
            </h1>
            <p className="hero-lead">
              気になるホームの雰囲気や暮らしを、
              <br />
              実際に見て、ゆっくり確かめてみませんか。
            </p>
          </div>

          <div className="search-panel">
            <div className="search-heading">
              <span className="search-heading-icon">
                <SearchIcon />
              </span>
              <div>
                <p>かんたん2項目</p>
                <h2>グループホームを探す</h2>
              </div>
            </div>
            <div className="search-fields">
              <label>
                <span>
                  <b>1</b> 対象地域
                </span>
                <select value={area} onChange={(event) => setArea(event.target.value)}>
                  <option value="">選択してください</option>
                  {areas.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>
                  <b>2</b> 対応障がい種別
                </span>
                <select value={disability} onChange={(event) => setDisability(event.target.value)}>
                  <option value="">選択してください</option>
                  {disabilityTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <button className="search-button" onClick={handleSearch}>
                <SearchIcon />
                この条件で探す
              </button>
            </div>
            {(area || disability || applied.area || applied.disability) && (
              <button className="clear-button" onClick={handleClear}>
                条件をクリア
              </button>
            )}
          </div>
        </section>

        <section className="results-section" ref={resultsRef}>
          <div className="section-heading">
            <div>
              <p className="section-kicker">GROUP HOMES</p>
              <h2>あなたに合う住まいを見つけよう</h2>
            </div>
            <p className="result-count">
              <strong>{results.length}</strong>
              <span>件のホームが見つかりました</span>
            </p>
          </div>

          {(applied.area || applied.disability) && (
            <div className="active-filters" aria-label="現在の検索条件">
              <span>検索条件</span>
              {applied.area && <b>{applied.area}</b>}
              {applied.disability && <b>{applied.disability}</b>}
              <button onClick={handleClear}>すべて解除</button>
            </div>
          )}

          {results.length > 0 ? (
            <div className="home-list">
              {results.map((home) => (
                <article className="home-card" key={home.id}>
                  <div className="home-gallery">
                    <img src={home.image} alt={`${home.name}の施設外観・共有スペース`} />
                    <img src={home.roomImage} alt={`${home.name}の居室`} />
                    <span className="photo-label">施設写真</span>
                    <span className="room-label">居室</span>
                  </div>
                  <div className="home-content">
                    <div className="home-title-row">
                      <div>
                        <p className="address">
                          <PinIcon />
                          {home.address}
                        </p>
                        <h3>{home.name}</h3>
                      </div>
                      <span className="feature">{home.feature}</span>
                    </div>
                    <div className="tag-row">
                      <span className="tag-label">対応障がい</span>
                      {home.disabilities.map((item) => (
                        <span className="tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="description">{home.description}</p>
                    <div className="card-bottom">
                      <p>
                        写真だけではわからないことも、
                        <br />
                        <strong>見学</strong>でゆっくり確かめられます。
                      </p>
                      <button className="visit-button" onClick={() => setSelectedHome(home)}>
                        <span>
                          このホームを
                          <b>見学する</b>
                        </span>
                        <ArrowIcon />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <SearchIcon />
              <h3>条件に合うホームが見つかりませんでした</h3>
              <p>条件を変更して、もう一度探してみてください。</p>
              <button onClick={handleClear}>条件をクリアする</button>
            </div>
          )}
        </section>

        <section className="guide" id="guide">
          <div>
            <p>見学は、住まい選びの大切な第一歩。</p>
            <h2>気になることは、現地でゆっくり確認できます。</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              ホームを探す
            </li>
            <li>
              <span>02</span>
              見学を申し込む
            </li>
            <li>
              <span>03</span>
              現地で相談する
            </li>
          </ol>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>
            <strong>つなぐHome</strong>
            <small>障がい者グループホーム検索</small>
          </span>
        </a>
        <p>安心できる住まいとの出会いを、わかりやすく。</p>
        <small>掲載されている施設情報はデモ用のサンプルです。</small>
      </footer>

      {selectedHome && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedHome(null)}
        >
          <div
            className="visit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedHome(null)}
              aria-label="閉じる"
            >
              ×
            </button>
            <p className="modal-kicker">見学のご案内</p>
            <h2 id="modal-title">{selectedHome.name}</h2>
            <img src={selectedHome.image} alt="" />
            <div className="modal-message">
              <strong>見学リクエストを受け付けました</strong>
              <p>
                これはデモ画面です。実際のサービスでは、このあとご希望の日程や連絡先を入力します。
              </p>
            </div>
            <button className="modal-done" onClick={() => setSelectedHome(null)}>
              ホームの一覧に戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
