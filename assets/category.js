/* Шаблон категории B2B. Страница объявляет window.CAT = {...} и подключает этот файл
   ПЕРЕД site.js. Разметка собирается в <main id="cat">. */
(function(){
const C = window.CAT, U = 'https://orekhprom.ru';
const src = s => /^https?:|^assets/.test(s) ? s : U + s;
const OTHER = [
  {id:'nuts', t:'Орехи', d:'Целые, дроблёные, обжаренные и в карамели', img:'/upload/iblock/9d3/4apmcnwkawuz0y1hgjkl48tehi36ifw9.jpg', href:'b2b-nuts.html'},
  {id:'pastes', t:'Пасты', d:'Ореховые пасты и пасты из семян, 12–300 мкм', img:'/upload/iblock/a02/coqlhho8zivlvasfe5zo0jzbza9k14r9.jpg', href:'b2b-pastes.html'},
  {id:'ingredients', t:'Ингредиенты', d:'Печенье, жемчужины, гранола, кокос, попкорн', img:'/upload/iblock/bb1/we84g6b3ff7g1gwwm4lbuz2lk1s7y5my.jpg', href:'b2b-ingredients.html'},
  {id:'fillings', t:'Начинки', d:'На жировой и водной основе, пралине', img:'/upload/iblock/bc2/el74lzbmqj2wos279f620hf4kboj3nbr.jpg', href:'b2b-fillings.html'},
];

const all = C.groups.flatMap(g=>g.items.map(i=>({...i, g:g.id})));
const tile = i => `<a class="ptile rv" ${i.shop?`href="${i.shop}" target="_blank" rel="noopener"`:'href="#" data-modal="request"'}>
  <div class="ph"><img loading="lazy" src="${src(i.img)}" alt="${i.t}"><span class="shop">${i.shop?'В магазин ↗':'Запросить'}</span></div>
  <div class="nm">${i.t}</div>${i.m?`<div class="meta">${i.m}</div>`:''}</a>`;

const html = `
<div class="wrap crumbs"><a href="https://orekhprom.ru/">Главная</a><span class="sep">/</span><a href="b2b.html">B2B</a><span class="sep">/</span><span class="cur">${C.crumb}</span></div>

<section class="phero"><div class="wrap">
  <div class="phero-grid">
    <div>
      <span class="eyebrow">${C.eyebrow}</span>
      <h1 class="h-xl">${C.title}</h1>
      <p class="lead">${C.lead}</p>
      <div class="btn-row"><button class="btn" data-modal="request">Запросить образцы</button><a href="#catalog" class="btn outline">Ассортимент <span class="arr">↓</span></a></div>
    </div>
    <div class="collage">
      <div class="big"><img src="${src(C.hero[0])}" alt=""></div>
      <div class="col">${C.hero.slice(1,4).map(h=>`<div><img src="${src(h)}" alt=""></div>`).join('')}</div>
    </div>
  </div>
  <div class="stats" style="margin-top:72px">${C.stats.map(s=>`<div><div class="k">${s[0]}</div><div class="v">${s[1]}</div></div>`).join('')}</div>
</div></section>

<section class="panel"><div class="wrap split">
  <div class="rv">
    <span class="eyebrow">${C.about.eyebrow}</span>
    <h2 class="h-l" style="margin:18px 0 28px">${C.about.title}</h2>
    <div class="prose">${C.about.text.map(p=>`<p>${p}</p>`).join('')}</div>
  </div>
  <div class="rv about-card">
    <ul>${C.about.points.map(p=>`<li>${p}</li>`).join('')}</ul>
    ${C.about.note?`<p>${C.about.note}</p>`:''}
  </div>
</div></section>

<section id="catalog"><div class="wrap">
  <div class="sec-head">
    <div><span class="eyebrow">ассортимент</span><h2 class="h-l">${C.catTitle}</h2></div>
  </div>
  <div class="tabs" id="catTabs" style="margin-bottom:40px">
    <button class="active" data-g="*">Все <span class="cnt">${all.length}</span></button>
    ${C.groups.map(g=>`<button data-g="${g.id}">${g.t} <span class="cnt">${g.items.length}</span></button>`).join('')}
  </div>
  <div id="catBody"></div>
</div></section>

<section class="dark cat-dark"><div class="wrap">
  <div class="sec-head"><div><h2 class="h-l">Фасовка и применение</h2></div></div>
  <div class="specs">${C.specs.map(s=>`<div class="spec rv"><div class="k">${s.k}</div>${s.vals?`<div class="vals">${s.vals.map(v=>`<span>${v}</span>`).join('')}</div>`:''}${s.big?`<div class="big">${s.big}</div>`:''}${s.list?`<ul>${s.list.map(v=>`<li>${v}</li>`).join('')}</ul>`:''}${s.note?`<p class="small" style="margin-top:14px">${s.note}</p>`:''}</div>`).join('')}</div>
</div></section>

<section><div class="wrap">
  <div class="sec-head"><div><h2 class="h-l">От запроса до регулярных поставок</h2></div><button class="btn outline" data-modal="request">Обсудить задачу</button></div>
  <div class="grid-4">${[
    ['01','Запрос','Фиксируем задачу: продукт, рецептура, объём, требования к фракции и упаковке.'],
    ['02','Образцы','Технологи инновационного центра подбирают позиции и отправляют образцы на тест.'],
    ['03','Спецификация','Согласуем параметры, документы качества и график отгрузок.'],
    ['04','Поставки','Отгружаем со своих складов — регулярно и в нужном объёме по всей России.']
  ].map(s=>`<div class="spec rv" style="background:var(--panel)"><div class="big" style="font-size:28px;color:var(--ink-35)">${s[0]}</div><h3 class="h-s" style="margin:40px 0 10px">${s[1]}</h3><p class="muted" style="font-size:15px">${s[2]}</p></div>`).join('')}</div>
</div></section>

<section class="tight"><div class="wrap">
  <div class="sec-head"><div><h2 class="h-l">Ингредиенты B2B</h2></div><a href="b2b.html" class="link-arrow">Весь раздел B2B →</a></div>
  <div class="grid-3">${OTHER.filter(o=>o.id!==C.id).map(o=>`<a class="dcard rv" href="${o.href}"><div class="ph"><img loading="lazy" src="${src(o.img)}" alt=""></div><div class="bd"><h3>${o.t}</h3><p>${o.d}</p><div class="go">Перейти <i>→</i></div></div></a>`).join('')}</div>
</div></section>

<section style="padding-top:20px"><div class="wrap">
  <div class="cta-box">
    <div>
      <span class="eyebrow" style="color:rgba(255,255,255,.55)">запрос на производство</span>
      <h2 style="margin-top:18px">${C.ctaTitle||'Подберём ингредиенты под ваш продукт'}</h2>
      <p>Опишите задачу — технологи предложат позиции из ассортимента или разработают индивидуальную рецептуру.</p>
      <div class="contacts"><a href="tel:88612125460">8 (861) 212 54 60</a><span>Отдел продаж делового и кондитерского рынка</span></div>
    </div>
    <div class="on-dark">
      <form class="form" novalidate>
        <div class="field"><input name="name" required placeholder=" "><label>Имя</label></div>
        <div class="field"><input name="company" placeholder=" "><label>Компания</label></div>
        <div class="field"><input type="tel" name="phone" required placeholder=" "><label>Телефон</label></div>
        <div class="field"><input type="email" name="email" required placeholder=" "><label>E-mail</label></div>
        <div class="field full"><textarea placeholder=" "></textarea><label>Что нужно: позиции, объём, фасовка</label></div>
        <label class="check full"><input type="checkbox" required checked><span>Даю согласие на обработку <a href="#">персональных данных</a></span></label>
        <div class="submit full"><button class="btn light" type="submit">Отправить запрос</button></div>
      </form>
      <div class="form-ok"><div class="ic">✓</div><h3>Запрос отправлен</h3><p style="color:rgba(255,255,255,.7)">Менеджер свяжется с вами в течение рабочего дня.</p></div>
    </div>
  </div>
</div></section>`;

document.getElementById('cat').innerHTML = html;

/* каталог: «Все» — группы подряд с заголовками; конкретная вкладка — только её сетка */
const body = document.getElementById('catBody');
function render(g){
  const groups = g==='*' ? C.groups : C.groups.filter(x=>x.id===g);
  body.innerHTML = groups.map(gr=>`<div class="cat-group" style="margin-bottom:64px">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:32px;align-items:end;margin-bottom:28px;padding-top:24px;border-top:1px solid var(--line)" class="cg-head">
        <h3 class="h-m">${gr.t}</h3>${gr.d?`<p class="muted cg-d" style="font-size:15px;max-width:52ch">${gr.d}</p>`:'<span></span>'}
      </div>
      <div class="grid-4">${gr.items.map(tile).join('')}</div></div>`).join('');
  window.observeReveal && window.observeReveal(body);
}
render('*');
document.getElementById('catTabs').addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  [...e.currentTarget.children].forEach(x=>x.classList.toggle('active', x===b));
  render(b.dataset.g);
});
const st = document.createElement('style');
st.textContent = `
  /* описание группы — прижато к правому краю */
  .cg-d{justify-self:end; text-align:right;}
  @media (max-width:720px){.cg-head{grid-template-columns:1fr!important;gap:12px!important} .cg-d{justify-self:start; text-align:left;}}
  /* список преимуществ — яркая тёмная карточка */
  .about-card{background:var(--ink); color:#fff; border-radius:24px; padding:36px 40px;}
  .about-card ul{list-style:none; margin:0; padding:0;}
  .about-card li{display:flex; gap:16px; align-items:baseline; padding:16px 0; border-bottom:1px solid rgba(255,255,255,.14); font-family:var(--font-head); font-size:21px; line-height:1.25;}
  .about-card li:first-child{padding-top:0;}
  .about-card li::before{content:"→"; font-family:var(--font-sans); color:rgba(255,255,255,.5);}
  .about-card p{margin-top:20px; color:rgba(255,255,255,.62); font-size:14px;}
  @media (max-width:720px){ .about-card{padding:26px 22px;} .about-card li{font-size:17px;} }
  /* тёмный блок: фасовка и применение + как мы работаем */
  .cat-dark .spec{background:rgba(255,255,255,.06); color:#fff;}
  .cat-dark .spec .k{color:rgba(255,255,255,.5);}
  .cat-dark .spec .vals span{background:rgba(255,255,255,.1); color:#fff;}
  .cat-dark .spec ul li{border-color:rgba(255,255,255,.12);}
  .cat-dark .spec .small{color:rgba(255,255,255,.55);}
  .cat-dark .spec .muted{color:rgba(255,255,255,.65);}
  .cat-dark .h-l{color:#fff;}
  @media (max-width:900px){ .cat-dark .sec-head[style]{margin-top:64px!important;} }
`;
document.head.appendChild(st);
})();
