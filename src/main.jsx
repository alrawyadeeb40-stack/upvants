import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Bookmark, Layers3, UserRound, Search, Bell, Play, BookOpen, Star, ChevronLeft, ArrowUpRight, Plus, Clock3, Heart, Settings, LogIn, Menu, X, Sparkles, Eye, MessageCircle, Compass, ShieldCheck } from 'lucide-react';
import './style.css';

const navItems = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'space', label: 'MY SPACE', icon: Layers3 },
  { id: 'following', label: 'متابعتي', icon: Compass },
  { id: 'account', label: 'حسابي', icon: UserRound },
];

async function searchOpenSources(term) {
  const q = term.trim();
  const tasks = [
    fetch('https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(q) + '&gsrlimit=6&prop=extracts%7Cpageimages%7Cinfo&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=480&inprop=url&format=json&origin=*').then(r => { if (!r.ok) throw new Error('Wikipedia'); return r.json(); }).then(data => Object.values(data.query?.pages || {}).map(p => ({ id:'wiki-'+p.pageid, type:'article', title:p.title, summary:(p.extract||'').slice(0,360), url:p.fullurl || 'https://en.wikipedia.org/?curid='+p.pageid, source:'Wikipedia', image:p.thumbnail?.source || '' }))),
    fetch('https://api.gdeltproject.org/api/v2/doc/doc?query=' + encodeURIComponent(q) + '&mode=ArtList&maxrecords=10&format=json&sort=HybridRel').then(r => { if (!r.ok) throw new Error('GDELT'); return r.json(); }).then(data => (data.articles || []).map((a,i) => ({ id:'news-'+i+'-'+a.url, type:'article', title:a.title, summary:[a.domain,a.seendate ? 'تاريخ الرصد: '+a.seendate.slice(0,8) : ''].filter(Boolean).join(' · '), url:a.url, source:a.domain || a.sourceCountry || 'مصدر إخباري', image:a.socialimage || '' })))
  ];
  const settled = await Promise.allSettled(tasks);
  const results = settled.flatMap(x => x.status === 'fulfilled' ? x.value : []);
  const unique = [...new Map(results.filter(x=>x.title && x.url).map(x=>[x.url,x])).values()];
  return { results: unique, errors: settled.filter(x=>x.status==='rejected').length };
}

const sampleSaved = [
  { id: 1, type: 'video', title: 'كيف تبدأ التصميم الجرافيكي من الصفر؟', source: 'YouTube', meta: 'فيديو تعليمي' },
  { id: 2, type: 'read', title: 'دليل اختيار المنتج المناسب قبل الشراء', source: 'مقال', meta: 'قراءة محفوظة' },
];

function Brand() {
  return <div className="brand" aria-label="UPVANTS"><span className="brand-symbol"><b>U</b><i>↗</i></span><span>UPVANTS</span></div>;
}

function App() {
  const [page, setPage] = React.useState('home');
  const [query, setQuery] = React.useState('');
  const [submittedQuery, setSubmittedQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState('');
  const [saved, setSaved] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('upvants-saved') || '[]'); } catch { return []; }
  });
  const [history, setHistory] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('upvants-history') || '[]'); } catch { return []; }
  });
  const [accountMode, setAccountMode] = React.useState('login');
  const [loginValue, setLoginValue] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => { localStorage.setItem('upvants-saved', JSON.stringify(saved)); }, [saved]);
  React.useEffect(() => { localStorage.setItem('upvants-history', JSON.stringify(history)); }, [history]);

  const runSearch = async (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value || searchLoading) return;
    setSubmittedQuery(value);
    setSearchResults([]);
    setSearchError('');
    setSearchLoading(true);
    setHistory(old => [value, ...old.filter(x => x !== value)].slice(0, 20));
    setPage('home');
    try {
      const data = await searchOpenSources(value);
      setSearchResults(data.results);
      if (!data.results.length) setSearchError('لم نجد نتائج من المصادر المفتوحة لهذه العبارة. جرّب صياغة أخرى.');
      else if (data.errors) setSearchError('بعض مصادر البحث لم تستجب، لذلك قد تكون النتائج غير مكتملة.');
    } catch {
      setSearchError('تعذّر الاتصال بمصادر البحث. تأكد من الإنترنت وحاول مرة ثانية.');
    } finally { setSearchLoading(false); }
  };
  const toggleSaved = (item) => setSaved(old => old.some(x => x.id === item.id) ? old.filter(x => x.id !== item.id) : [item, ...old]);
  const isSaved = id => saved.some(x => x.id === id);

  const renderHome = () => <div className="page-content">
    <section className="welcome">
      <div className="welcome-copy">
        <div className="eyebrow"><span className="live-dot"/> عالمك المعرفي في مكان واحد</div>
        <h1>وش ودّك <span>تكتشف</span> اليوم؟</h1>
        <p>اكتب سؤالك أو فكرتك، وUPVANTS يرتّب لك طريق الوصول إلى المعرفة والفيديوهات والتجارب.</p>
      </div>
      <div className="welcome-orb"><span>U</span><i>↗</i></div>
    </section>

    <form className="search-box" onSubmit={runSearch}>
      <Search size={21}/>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن موضوع، سؤال، منتج أو تجربة..." aria-label="بحث"/>
      <button type="submit">اكتشف <ArrowUpRight size={17}/></button>
    </form>

    {submittedQuery && <section className="query-panel">
      <div className="query-title"><Sparkles size={18}/><div><b>تم تسجيل بحثك</b><small>«{submittedQuery}»</small></div><button onClick={() => setSubmittedQuery('')} aria-label="إغلاق"><X size={17}/></button></div>
      <p>{searchLoading ? 'نبحث الآن في المصادر المفتوحة ونرتّب ما وجدناه...' : 'هذه نتائج أولية من مصادر مفتوحة. بعض المنصات مثل YouTube وTikTok وInstagram تتطلب ربط واجهاتها الرسمية قبل عرض نتائجها.'}</p>
      {searchLoading && <div className="search-progress"><span/> جارٍ البحث...</div>}
      {!searchLoading && searchError && <div className="search-note">{searchError}</div>}
      {!searchLoading && searchResults.length > 0 && <div className="results-head"><b>{searchResults.length} نتيجة أولية</b><span>مقالات وأخبار ومراجع</span></div>}
      {!searchLoading && searchResults.length > 0 && <div className="results-list">{searchResults.map(item => <article className="result-card" key={item.id}>
        {item.image && <img src={item.image} alt="" loading="lazy" />}
        <div className="result-body"><span className="result-source"><BookOpen size={13}/>{item.source}</span><h3>{item.title}</h3><p>{item.summary || 'افتح المصدر لقراءة التفاصيل.'}</p><a href={item.url} target="_blank" rel="noreferrer">قراءة المصدر <ArrowUpRight size={14}/></a></div>
      </article>)}</div>}
      {!searchLoading && <div className="platform-note"><b>الفيديوهات والتجارب الاجتماعية</b><span>لم نضف لها نتائج وهمية. نحتاج مفاتيح وواجهات رسمية من المنصات لعرضها داخل التطبيق.</span></div>}
    </section>}

    <section className="section-block">
      <div className="section-heading"><div><span className="eyebrow muted">DISCOVER</span><h2>اكتشف بطريقتك</h2></div><span className="section-sub">كل ما يفيدك، في تجربة واحدة</span></div>
      <div className="discovery-grid">
        <article className="discovery-card watch"><div className="disc-icon"><Play size={22}/></div><span className="disc-en">WATCH</span><h3>شاهد</h3><p>فيديوهات وشروحات من منصات المحتوى.</p><button onClick={() => setSubmittedQuery(query || 'اكتشاف الفيديوهات')} aria-label="استكشف الفيديوهات"><ChevronLeft/></button></article>
        <article className="discovery-card read"><div className="disc-icon"><BookOpen size={22}/></div><span className="disc-en">READ</span><h3>اقرأ</h3><p>مقالات وأخبار ومعلومات من مصادر متنوعة.</p><button onClick={() => setSubmittedQuery(query || 'اكتشاف المقالات')} aria-label="استكشف المقالات"><ChevronLeft/></button></article>
        <article className="discovery-card reviews"><div className="disc-icon"><Star size={22}/></div><span className="disc-en">REAL REVIEWS</span><h3>تجارب وتقييمات</h3><p>آراء وتجارب أشخاص استخدموا المنتجات والخدمات.</p><button onClick={() => setSubmittedQuery(query || 'اكتشاف التجارب والتقييمات')} aria-label="استكشف التجارب"><ChevronLeft/></button></article>
      </div>
    </section>

    <section className="section-block">
      <div className="section-heading"><div><span className="eyebrow muted">YOUR SPACE</span><h2>مساحتك الخاصة</h2></div><button className="text-link" onClick={() => setPage('space')}>افتح MY SPACE <ChevronLeft size={16}/></button></div>
      <div className="space-preview">
        <div className="preview-icon"><Bookmark size={23}/></div>
        <div className="preview-copy"><b>احفظ كل ما يهمك</b><span>اجمع الفيديوهات والمقالات والتجارب في مكان ترجع له بأي وقت.</span></div>
        <button className="outline-btn" onClick={() => setPage('space')}>محفوظاتك <ChevronLeft size={16}/></button>
      </div>
    </section>
  </div>;

  const renderSpace = () => <div className="page-content inner-page">
    <div className="page-title"><span className="eyebrow muted">YOUR PERSONAL SPACE</span><h1>MY SPACE</h1><p>مساحتك الخاصة لكل ما تريد الاحتفاظ به والعودة إليه.</p></div>
    <div className="space-stats"><div><Bookmark/><b>{saved.length}</b><span>عنصر محفوظ</span></div><div><Clock3/><b>{history.length}</b><span>عملية بحث</span></div><div><Heart/><b>—</b><span>قوائمك</span></div></div>
    <section className="section-block"><div className="section-heading"><div><h2>المحفوظات</h2><span className="section-sub">كل ما حفظته في مكان واحد</span></div></div>
      {saved.length ? <div className="saved-list">{saved.map(item => <div className="saved-item" key={item.id}><div className="saved-type">{item.type === 'video' ? <Play/> : <BookOpen/>}</div><div className="saved-copy"><b>{item.title}</b><span>{item.source} · {item.meta}</span></div><button onClick={() => toggleSaved(item)} aria-label="إزالة من المحفوظات"><Bookmark fill="currentColor"/></button></div>)}</div> : <div className="empty-state"><Bookmark size={28}/><b>محفوظاتك بتكون هنا</b><p>لما تشوف محتوى يعجبك، اضغط حفظ عشان تلقاه هنا بسهولة.</p></div>}
    </section>
    <section className="section-block"><div className="section-heading"><div><h2>آخر عمليات البحث</h2><span className="section-sub">عمليات البحث السابقة على هذا الجهاز</span></div></div>
      {history.length ? <div className="history-list">{history.map((item,i)=><button key={i} onClick={()=>{setQuery(item);setSubmittedQuery(item);setPage('home')}}><Clock3 size={16}/>{item}<ChevronLeft size={16}/></button>)}</div> : <div className="empty-state compact"><p>ما عندك عمليات بحث سابقة للحين.</p></div>}
    </section>
  </div>;

  const renderFollowing = () => <div className="page-content inner-page">
    <div className="page-title"><span className="eyebrow muted">YOUR FEED</span><h1>متابعتي</h1><p>تابع المواضيع والمصادر التي تهمك، واجمع جديدها في مكان واحد.</p></div>
    <div className="empty-state following-empty"><Compass size={32}/><b>خلّ اهتماماتك تقود اكتشافك</b><p>قريبًا تقدر تتابع موضوعًا أو منصة أو مجالًا، وتشوف أحدث المحتوى المرتبط به هنا.</p><button className="outline-btn" onClick={()=>setPage('home')}>ابدأ من الرئيسية <ChevronLeft size={16}/></button></div>
  </div>;

  const renderAccount = () => <div className="page-content inner-page account-page">
    <div className="account-card">
      <div className="account-symbol"><UserRound size={30}/></div>
      <span className="eyebrow muted">YOUR UPVANTS ACCOUNT</span>
      <h1>{accountMode === 'login' ? 'أهلًا بعودتك' : 'انضم إلى UPVANTS'}</h1>
      <p>سجّل دخولك عشان تحفظ اهتماماتك ومحتواك وتزامنها مع حسابك.</p>
      <div className="auth-switch"><button className={accountMode==='login'?'active':''} onClick={()=>setAccountMode('login')}>تسجيل الدخول</button><button className={accountMode==='signup'?'active':''} onClick={()=>setAccountMode('signup')}>إنشاء حساب</button></div>
      <label htmlFor="account-input">البريد الإلكتروني أو رقم الجوال</label>
      <input id="account-input" className="auth-input" value={loginValue} onChange={e=>setLoginValue(e.target.value)} placeholder="أدخل البريد أو رقم الجوال"/>
      <button className="auth-submit" onClick={()=>alert('واجهة الحساب جاهزة مبدئيًا. سيتم تفعيل التحقق والرسائل بعد ربط خدمة المصادقة الآمنة.')}>{accountMode==='login'?'متابعة':'إنشاء حساب'} <ChevronLeft size={17}/></button>
      <div className="privacy-note"><ShieldCheck size={15}/> حسابك ومحتواك الخاص يبقى لك.</div>
      <small className="auth-hint">التسجيل والتحقق الفعلي يحتاج ربط خدمة حسابات آمنة قبل إطلاقه للمستخدمين.</small>
    </div>
  </div>;

  return <div className="app-shell">
    <header className="app-header">
      <button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen?<X/>:<Menu/>}</button>
      <Brand/>
      <div className="header-center"><span className="status-dot"/> اكتشف أكثر، وتشتّت أقل</div>
      <button className="header-bell" aria-label="الإشعارات"><Bell size={19}/></button>
    </header>
    {menuOpen && <div className="mobile-nav">{navItems.map(item=><button key={item.id} onClick={()=>{setPage(item.id);setMenuOpen(false)}}>{item.label}</button>)}</div>}
    <main className="app-main">{page==='home'?renderHome():page==='space'?renderSpace():page==='following'?renderFollowing():renderAccount()}</main>
    <nav className="bottom-nav" aria-label="التنقل الرئيسي">{navItems.map(item=>{const Icon=item.icon;return <button key={item.id} className={page===item.id?'active':''} onClick={()=>setPage(item.id)}><Icon size={21}/><span>{item.label}</span></button>})}</nav>
    <footer className="app-footer"><Brand/><span>UPVANTS · اكتشف عالمك</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
