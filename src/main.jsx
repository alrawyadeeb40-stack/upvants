import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpLeft, BookOpen, Compass, Play, Sparkles, Search, Menu, X, ArrowLeft, Lightbulb, Globe2, Users, Star, ExternalLink, MessageSquareText, Video, FileText, Filter, ChevronDown } from 'lucide-react';
import './style.css';

const spaces = [
  { icon: Play, title: 'شاهد', en: 'WATCH', desc: 'أفضل الفيديوهات والشروحات المرئية من المنصات المختلفة.', tone: 'emerald' },
  { icon: BookOpen, title: 'اقرأ', en: 'READ', desc: 'مقالات وأدلة ومنشورات مكتوبة من مصادر موثوقة.', tone: 'teal' },
  { icon: Users, title: 'تجارب حقيقية', en: 'REAL EXPERIENCES', desc: 'آراء من جرّبوا المنتج أو الخدمة أو نفّذوا الفكرة بأنفسهم.', tone: 'mint' },
];

const sources = [
  { name: 'YouTube', url: q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q), type: 'video' },
  { name: 'TikTok', url: q => 'https://www.tiktok.com/search?q=' + encodeURIComponent(q), type: 'video' },
  { name: 'Google فيديو', url: q => 'https://www.google.com/search?tbm=vid&q=' + encodeURIComponent(q), type: 'video' },
  { name: 'Google مقالات', url: q => 'https://www.google.com/search?q=' + encodeURIComponent(q), type: 'read' },
  { name: 'Reddit', url: q => 'https://www.reddit.com/search/?q=' + encodeURIComponent(q), type: 'experience' },
  { name: 'منشورات X', url: q => 'https://x.com/search?q=' + encodeURIComponent(q), type: 'experience' },
  { name: 'تجارب ومراجعات', url: q => 'https://www.google.com/search?q=' + encodeURIComponent(q + ' تجربة مراجعة تقييم review'), type: 'experience' },
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  const [searched, setSearched] = React.useState(false);

  const search = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setActiveTab('all');
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredSources = sources.filter(source => activeTab === 'all' || source.type === activeTab);
  const reviewQuery = query.trim() + ' تجربة مستخدم تقييم مراجعة بعد الاستخدام';
  const videoQuery = query.trim() + ' شرح';
  const readQuery = query.trim() + ' مقال دليل شرح';
  const sourceQuery = source => source.type === 'video' ? videoQuery : source.type === 'read' ? readQuery : reviewQuery;

  return (
    <main>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar wrap">
        <a className="brand" href="#" aria-label="UPVANTS home"><span className="brand-mark">U<span>.</span></span><span>UPVANTS</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#explore">استكشف</a><a href="#spaces">مساحاتنا</a><a href="#about">عن المنصة</a>
        </nav>
        <div className="top-actions">
          <button className="icon-btn search-btn" aria-label="اذهب إلى البحث" onClick={() => document.getElementById('main-search')?.focus()}><Search size={19}/></button>
          <button className="sign-btn" onClick={() => document.getElementById('main-search')?.focus()}>ابدأ الاستكشاف <ArrowUpLeft size={17}/></button>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="hero wrap" id="explore">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> محركك لاكتشاف المعرفة والتجارب</div>
          <h1>كل ما تبحث عنه،<br/><span>في مكان واحد.</span></h1>
          <p className="hero-text">اكتب فكرة أو سؤالًا أو منتجًا. نساعدك في الوصول إلى الفيديوهات والمقالات وتجارب الناس لتكوّن صورة أوضح وتتخذ قرارك بثقة.</p>
          <form className="search-form" onSubmit={search}>
            <input id="main-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="مثلاً: أريد تعلم التصميم، هل هذا المنتج فخم؟" aria-label="اكتب ما تريد اكتشافه"/>
            <button type="submit" aria-label="ابحث"><Search size={22}/></button>
            <Sparkles className="search-spark" size={20}/>
          </form>
          <div className="search-hints"><span>جرّب:</span><button onClick={() => setQuery('تعلم التصميم الجرافيكي من الصفر')}>تعلم التصميم</button><button onClick={() => setQuery('تقييم جودة وفخامة هذا المنتج')}>تقييم منتج</button><button onClick={() => setQuery('كيف أبدأ مشروعًا صغيرًا')}>بدء مشروع</button></div>
          <div className="hero-note"><Sparkles size={15}/> معرفة أوسع، وتجارب أقرب للواقع.</div>
        </div>
        <div className="hero-art" aria-label="هوية UPVANTS">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="core"><span>U</span><i /></div>
          <div className="float-card card-top"><Globe2 size={17}/><span>مصادر متعددة</span></div>
          <div className="float-card card-bottom"><Lightbulb size={17}/><span>من السؤال إلى القرار</span></div>
          <div className="spark spark-a">✳</div><div className="spark spark-b">✦</div>
        </div>
      </section>

      {searched && <section className="results wrap" id="results">
        <div className="results-head"><div><div className="eyebrow muted">YOUR DISCOVERY</div><h2>نتائج البحث عن: <span>{query}</span></h2></div><button className="clear-btn" onClick={() => setSearched(false)}>إغلاق <X size={16}/></button></div>
        <div className="results-note"><Sparkles size={18}/><div><strong>استكشف المصادر المرتبطة ببحثك</strong><p>هذه النسخة تفتح عمليات بحث موجهة داخل المصادر. تجميع النتائج وترتيبها داخل UPVANTS تلقائيًا يحتاج ربط واجهات المصادر ومحرك البحث في المرحلة التالية.</p></div></div>
        <div className="filter-tabs">
          <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>الكل</button>
          <button className={activeTab === 'video' ? 'active' : ''} onClick={() => setActiveTab('video')}><Video size={15}/> شاهد</button>
          <button className={activeTab === 'read' ? 'active' : ''} onClick={() => setActiveTab('read')}><FileText size={15}/> اقرأ</button>
          <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}><Users size={15}/> تجارب حقيقية</button>
        </div>
        <div className="source-grid">{filteredSources.map(source => <a className="source-card" key={source.name} href={source.url(sourceQuery(source))} target="_blank" rel="noreferrer"><span className="source-icon">{source.type === 'video' ? <Play size={19}/> : source.type === 'read' ? <BookOpen size={19}/> : <Star size={19}/>}</span><span><strong>{source.name}</strong><small>{source.type === 'video' ? 'ابحث عن فيديوهات وشروحات' : source.type === 'read' ? 'ابحث عن مقالات ومصادر مكتوبة' : 'ابحث عن آراء وتجارب المستخدمين'}</small></span><ExternalLink size={16}/></a>)}</div>
      </section>}

      <section className="explore wrap" id="explore-spaces">
        <div className="section-head"><div><div className="eyebrow muted">YOUR NEXT STEP</div><h2>اختر طريق اكتشافك</h2></div><p>ثلاث مساحات، وهدف واحد:<br/>أن تصل إلى معرفة تفيدك.</p></div>
        <div className="area-grid" id="spaces">
          {spaces.map(({icon: Icon, title, en, desc, tone}, i) => <article className={'area-card ' + tone} key={en}>
            <div className="area-top"><span className="area-icon"><Icon size={22}/></span><span className="area-number">0{i+1}</span></div>
            <div><div className="area-en">{en}</div><h3>{title}</h3><p>{desc}</p></div>
            <button className="card-link" aria-label={'ابحث في ' + title} onClick={() => {setActiveTab(i === 0 ? 'video' : i === 1 ? 'read' : 'experience'); document.getElementById('main-search')?.focus(); document.getElementById('explore')?.scrollIntoView({behavior:'smooth'});}}><ArrowUpLeft size={19}/></button>
          </article>)}
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
