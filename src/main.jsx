import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpLeft, BookOpen, Compass, Play, Sparkles, Layers3, Search, Menu, X, ArrowLeft, Lightbulb, Rocket, Globe2 } from 'lucide-react';
import './style.css';

const areas = [
  { icon: Play, title: 'شاهد', en: 'WATCH', desc: 'اكتشف محتوى مرئيًا يفتح لك آفاقًا جديدة.', tone: 'violet' },
  { icon: BookOpen, title: 'اقرأ', en: 'READ', desc: 'أفكار ومعرفة ومصادر تستحق وقتك.', tone: 'blue' },
  { icon: Layers3, title: 'طبّق', en: 'REAL', desc: 'حوّل ما تتعلمه إلى تجارب ومشاريع حقيقية.', tone: 'orange' },
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar wrap">
        <a className="brand" href="#" aria-label="UPVANTS home"><span className="brand-mark">U<span>.</span></span><span>UPVANTS</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#explore">استكشف</a>
          <a href="#spaces">مساحاتنا</a>
          <a href="#about">عن المنصة</a>
        </nav>
        <div className="top-actions">
          <button className="icon-btn search-btn" aria-label="بحث"><Search size={19}/></button>
          <button className="sign-btn" onClick={() => document.getElementById('explore').scrollIntoView({behavior:'smooth'})}>ابدأ الاستكشاف <ArrowUpLeft size={17}/></button>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> مساحة جديدة للأفكار الكبيرة</div>
          <h1>معرفتك هي<br/><span>بداية كل شيء.</span></h1>
          <p className="hero-text">اكتشف ما يلهمك، تعلّم ما يطوّرك، وحوّل أفكارك إلى واقع. عالمك المعرفي يبدأ من هنا.</p>
          <div className="hero-buttons">
            <a className="primary-btn" href="#explore">اكتشف UPVANTS <ArrowUpLeft size={18}/></a>
            <a className="text-btn" href="#about">تعرّف علينا <ArrowLeft size={16}/></a>
          </div>
          <div className="hero-note"><Sparkles size={15}/> كل رحلة عظيمة تبدأ بفضول.</div>
        </div>
        <div className="hero-art" aria-label="تصميم تجريدي">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="core"><span>U</span><i /></div>
          <div className="float-card card-top"><Compass size={17}/><span>اكتشف آفاقًا جديدة</span></div>
          <div className="float-card card-bottom"><Lightbulb size={17}/><span>فكرة اليوم قد تغيّر غدك</span></div>
          <div className="spark spark-a">✳</div><div className="spark spark-b">✦</div>
        </div>
      </section>

      <section className="explore wrap" id="explore">
        <div className="section-head">
          <div><div className="eyebrow muted">YOUR NEXT STEP</div><h2>اختر طريق اكتشافك</h2></div>
          <p>ثلاث مساحات، وهدف واحد:<br/>أن تتقدم كل يوم.</p>
        </div>
        <div className="area-grid" id="spaces">
          {areas.map(({icon: Icon, title, en, desc, tone}, i) => (
            <article className={'area-card ' + tone} key={en}>
              <div className="area-top"><span className="area-icon"><Icon size={22}/></span><span className="area-number">0{i+1}</span></div>
              <div><div className="area-en">{en}</div><h3>{title}</h3><p>{desc}</p></div>
              <a href="#about" className="card-link" aria-label={'اكتشف ' + title}><ArrowUpLeft size={19}/></a>
            </article>
          ))}
        </div>
      </section>

      <section className="vanta wrap" id="about">
        <div className="vanta-icon"><Sparkles size={28}/></div>
        <div className="vanta-copy"><div className="eyebrow muted">MEET YOUR THINKING SPACE</div><h2>فكّر بشكل أوسع مع <span>VANTA</span></h2><p>مساحة ذكية لمساعدتك على ترتيب أفكارك، طرح الأسئلة، واستكشاف احتمالات جديدة. نعمل على بناء التجربة لتكون رفيقك في رحلة التعلّم والإنجاز.</p></div>
        <button className="vanta-btn" onClick={() => alert('قريبًا — نعمل على تجهيز VANTA.')}>اكتشف VANTA <ArrowUpLeft size={17}/></button>
      </section>

      <footer className="footer wrap"><a className="brand" href="#"><span className="brand-mark">U<span>.</span></span><span>UPVANTS</span></a><span>© 2026 UPVANTS. بداية عالمك.</span><span className="footer-tag">THINK BEYOND.</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);