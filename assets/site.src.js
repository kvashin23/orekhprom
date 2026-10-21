/* =========================================================
   ОРЕХПРОМ — общий скрипт макетов:
   переключатель страниц, шапка, подвал, попапы, cookie,
   плюс мелкие взаимодействия (reveal, FAQ, табы, формы).
   Страница задаёт <body data-page="id" data-nav="b2b|brands|...">
   ========================================================= */
(function(){
const LOGO = `__LOGO__`;
const IMG = 'https://orekhprom.ru';

const PAGES = [
  {id:'home',        t:'Главная',              href:'https://orekhprom.ru/', ext:true},
  {id:'em',          t:'Пасты ЕМ!',            href:'em.html'},
  {id:'about',       t:'О компании',           href:'about.html'},
  {id:'b2b',         t:'B2B',                  href:'b2b.html'},
  {id:'nuts',        t:'B2B · Орехи',          href:'b2b-nuts.html'},
  {id:'pastes',      t:'B2B · Пасты',          href:'b2b-pastes.html'},
  {id:'ingredients', t:'B2B · Ингредиенты',    href:'b2b-ingredients.html'},
  {id:'fillings',    t:'B2B · Начинки',        href:'b2b-fillings.html'},
  {id:'brands',      t:'Бренды',               href:'brands.html'},
  {id:'kraft',       t:'Линейка «Крафт»',      href:'brand-kraft.html'},
  {id:'blog',        t:'Блог',                 href:'blog.html'},
  {id:'article',     t:'Статья',               href:'article.html'},
  {id:'recipes',     t:'Рецепты',              href:'recipes.html'},
  {id:'recipe',      t:'Рецепт',               href:'recipe.html'},
  {id:'career',      t:'Карьера',              href:'career.html'},
  {id:'awards',      t:'Награды',              href:'awards.html'},
  {id:'uikit',       t:'UI-kit',               href:'ui-kit.html'},
];

const NAV = [
  {id:'about', t:'О компании', href:'about.html'},
  {id:'b2b', t:'B2B', href:'b2b.html', dd:[
    ['Орехи','b2b-nuts.html'],['Пасты','b2b-pastes.html'],['Ингредиенты','b2b-ingredients.html'],['Начинки','b2b-fillings.html']
  ], all:['Весь раздел B2B','b2b.html']},
  {id:'brands', t:'Бренды', href:'brands.html', dd:[
    ['Твердый знак','brands.html#tz'],['Твердый знак · Крафт','brand-kraft.html'],['Ем!','brands.html#em'],['Ем! · Пасты и начинки','em.html']
  ], all:['Все бренды','brands.html']},
  {id:'sneki', t:'Гастро-снеки', href:'https://orekhprom.ru/sneki/'},
  {id:'stm', t:'СТМ', href:'https://orekhprom.ru/stm/'},
  {id:'rd', t:'R&D', href:'https://orekhprom.ru/rd/'},
  {id:'recipes', t:'Рецепты', href:'recipes.html'},
  {id:'blog', t:'Блог', href:'blog.html'},
];

const body = document.body;
const pageId = body.dataset.page || '';
const navId = body.dataset.nav || '';

/* ---------- switcher ---------- */
function switcher(){
  const idx = PAGES.findIndex(p=>p.id===pageId);
  const prev = PAGES[(idx-1+PAGES.length)%PAGES.length];
  const next = PAGES[(idx+1)%PAGES.length];
  const links = PAGES.map((p,i)=>`<a href="${p.href}" class="${p.id===pageId?'active':''} ${p.ext?'ext':''}" ${p.ext?'target="_blank" rel="noopener"':''}><span class="n">${String(i+1).padStart(2,'0')}</span>${p.t}</a>`).join('');
  const opts = PAGES.map((p,i)=>`<option value="${p.href}" ${p.id===pageId?'selected':''}>${String(i+1).padStart(2,'0')} · ${p.t}</option>`).join('');
  return `<div class="pg-switch" role="navigation" aria-label="Переключатель макетов"><div class="wrap row">
    <div class="lbl"><b></b><span>Макеты страниц</span></div>
    <div class="list" id="pgList">${links}</div>
    <select id="pgSel" aria-label="Выбор страницы">${opts}</select>
    <div class="nav"><a href="${prev.href}" title="Назад" aria-label="Листать назад">‹</a><a href="${next.href}" title="Вперёд" aria-label="Листать вперёд">›</a></div>
  </div></div>`;
}

/* ---------- header ---------- */
function header(){
  const items = NAV.map(n=>{
    const cur = n.id===navId ? 'cur' : '';
    const ext = /^https?:/.test(n.href) ? 'target="_blank" rel="noopener"' : '';
    if(!n.dd) return `<div class="it"><a class="${cur}" href="${n.href}" ${ext}>${n.t}</a></div>`;
    return `<div class="it"><a class="${cur}" href="${n.href}">${n.t} <span class="caret">▾</span></a>
      <div class="dd">${n.dd.map(d=>`<a href="${d[1]}">${d[0]}<span>→</span></a>`).join('')}<hr><a class="all" href="${n.all[1]}">${n.all[0]}</a></div></div>`;
  }).join('');
  const mob = NAV.map(n=>{
    if(!n.dd) return `<a href="${n.href}">${n.t}</a>`;
    return `<details><summary>${n.t}</summary>${n.dd.map(d=>`<a href="${d[1]}">${d[0]}</a>`).join('')}<a href="${n.all[1]}">${n.all[0]}</a></details>`;
  }).join('');
  return `<header class="site" id="siteHeader"><div class="wrap hdr">
      <a href="https://orekhprom.ru/" class="logo" aria-label="ОРЕХПРОМ — на главную">${LOGO}</a>
      <nav class="mnav" aria-label="Основное меню">${items}</nav>
      <div class="hdr-right">
        <span class="lang">Ru</span><span class="divider"></span>
        <a href="https://orekhprom.shop/" target="_blank" rel="noopener" class="btn sm">Интернет-магазин</a>
        <button class="burger" id="burger" aria-label="Открыть меню"><i></i><i></i><i></i></button>
      </div>
    </div></header>
    <div class="offc" id="offc" aria-hidden="true"><div class="wrap" style="display:flex;flex-direction:column;min-height:100%">
      <div class="top"><a href="https://orekhprom.ru/" class="logo" style="width:130px">${LOGO}</a><button class="x" id="offcX" aria-label="Закрыть">✕</button></div>
      <nav>${mob}</nav>
      <div class="bottom">
        <a class="phone" href="tel:88005554161">8 (800) 555 41 61</a>
        <div class="small">Краснодар, ул. Красных Партизан, д. 2/4 А</div>
        <a href="https://orekhprom.shop/" class="btn">Интернет-магазин</a>
        <button class="btn outline" data-modal="request">Оставить заявку</button>
      </div>
    </div></div>`;
}

/* ---------- footer ---------- */
function footer(){
  return `<footer class="site"><div class="wrap">
    <div class="ft-top">
      <div>
        <a href="https://orekhprom.ru/" class="logo">${LOGO}</a>
        <p class="tag">Фабрика полного цикла переработки орехов и производитель пищевых ингредиентов с 1998 года</p>
        <div class="ft-social"><a href="https://vk.com/orekhprom" target="_blank" rel="noopener" aria-label="ВКонтакте">VK</a><a href="https://t.me/orekhprom" target="_blank" rel="noopener" aria-label="Telegram">TG</a><a href="https://dzen.ru/" target="_blank" rel="noopener" aria-label="Дзен">ДЗ</a></div>
      </div>
      <div class="ft-col"><h4>Компания</h4><a href="about.html">О компании</a><a href="awards.html">Награды</a><a href="career.html">Карьера</a><a href="https://orekhprom.ru/rd/">R&amp;D</a><a href="blog.html">Блог</a><a href="recipes.html">Рецепты</a></div>
      <div class="ft-col"><h4>B2B</h4><a href="b2b-nuts.html">Орехи</a><a href="b2b-pastes.html">Пасты</a><a href="b2b-ingredients.html">Ингредиенты</a><a href="b2b-fillings.html">Начинки</a><a href="https://orekhprom.ru/stm/">СТМ</a></div>
      <div class="ft-col"><h4>Бренды</h4><a href="brands.html#tz">Твердый знак</a><a href="brands.html#em">Ем!</a><a href="em.html">Пасты и начинки ЕМ!</a><a href="https://orekhprom.ru/sneki/">Гастро-снеки</a><a href="https://orekhprom.shop/">Интернет-магазин</a></div>
      <div class="ft-contacts">
        <a class="phone" href="tel:88005554161">8 (800) 555 41 61</a>
        <div class="note">Бесплатно по России, пн–пт 9:00–18:00</div>
        <div>8 (861) 212 54 60</div>
        <div>info@orekh.com</div>
        <div>350012, г. Краснодар,<br>ул. Красных Партизан, д. 2/4 А</div>
        <button class="btn light sm" data-modal="request">Оставить заявку</button>
      </div>
    </div>
    <div class="ft-big" aria-hidden="true">ОРЕХПРОМ</div>
    <div class="ft-bottom">
      <span>АО «Орехпром» © 1998 — 2026. Все права защищены</span>
      <div class="links"><a href="#">Политика конфиденциальности</a><a href="#">Договор-оферта для юр. лиц</a><a href="#">Карта сайта</a></div>
    </div>
  </div></footer>`;
}

/* ---------- modals ---------- */
const DEPTS = ['Отдел продаж делового и кондитерского рынка','Отдел продаж фасованной продукции БРЕНД','Отдел продаж СТМ (федеральные сети)','Отдел маркетинга','Отдел закупок ингредиентов','Отдел закупок орехов и сухофруктов','Отдел качества и безопасности продукции','Отдел логистики','Отдел персонала','Общие вопросы'];
function fld(name,label,type='text',cls=''){ return `<div class="field ${cls}"><input type="${type}" name="${name}" placeholder=" " ${type!=='text'||name==='name'?'required':''}><label>${label}</label></div>`; }
function consent(){ return `<label class="check full"><input type="checkbox" required checked><span>Даю согласие на обработку <a href="#">персональных данных</a></span></label>`; }
function okBlock(t,s){ return `<div class="form-ok"><div class="ic">✓</div><h3>${t}</h3><p class="muted">${s}</p></div>`; }
function modals(){
  return `
  <div class="modal" id="m-request" role="dialog" aria-modal="true" aria-label="Оставить заявку"><div class="box wide">
    <div class="side" style="background-image:url(${IMG}/upload/iblock/1bf/2g1da57ncq2ptdo5tnncsbi00szkr212.jpg)"></div>
    <div class="main"><button class="x" data-close>✕</button>
      <h3>Оставить заявку</h3><p class="sub">Менеджер свяжется с вами в течение рабочего дня и подготовит предложение под задачу вашего производства.</p>
      <form class="form" novalidate>
        ${fld('name','Ваше имя')}${fld('company','Компания')}
        ${fld('phone','Телефон','tel')}${fld('email','E-mail','email')}
        <div class="field sel full"><select name="dept">${DEPTS.map(d=>`<option>${d}</option>`).join('')}</select><label>Отдел</label></div>
        <div class="field full"><textarea name="msg" placeholder=" "></textarea><label>Комментарий: продукт, объём, фасовка</label></div>
        <label class="file-drop full"><input type="file" hidden>📎 <span>Приложить файл (ТЗ, спецификация)</span></label>
        ${consent()}
        <div class="submit full"><button class="btn" type="submit">Отправить запрос</button></div>
      </form>${okBlock('Заявка отправлена','Спасибо! Мы получили ваш запрос и свяжемся с вами в ближайшее время.')}
    </div></div></div>

  <div class="modal" id="m-price" role="dialog" aria-modal="true" aria-label="Запрос ассортимента"><div class="box"><button class="x" data-close>✕</button>
    <h3>Ассортимент с ценами</h3><p class="sub">Пришлём актуальный прайс-лист и спецификации на e-mail.</p>
    <form class="form" novalidate>${fld('name','Ваше имя')}${fld('company','Компания / сеть')}${fld('phone','Телефон','tel')}${fld('email','E-mail','email')}${consent()}<div class="submit full"><button class="btn" type="submit">Получить прайс</button></div></form>
    ${okBlock('Прайс уже в пути','Проверьте почту — письмо придёт в течение 15 минут.')}
  </div></div>

  <div class="modal" id="m-cv" role="dialog" aria-modal="true" aria-label="Отправить резюме"><div class="box"><button class="x" data-close>✕</button>
    <h3>Откликнуться</h3><p class="sub">Расскажите о себе — HR-служба ответит в течение 3 рабочих дней.</p>
    <form class="form" novalidate>${fld('name','ФИО')}${fld('phone','Телефон','tel')}
      <div class="field full"><input name="pos" placeholder=" "><label>Желаемая должность</label></div>
      <label class="file-drop full"><input type="file" hidden>📎 <span>Прикрепить резюме (PDF, DOC)</span></label>
      ${consent()}<div class="submit full"><button class="btn" type="submit">Отправить резюме</button></div></form>
    ${okBlock('Резюме получено','Спасибо за интерес к ОРЕХПРОМ! Мы свяжемся с вами.')}
  </div></div>

  <div class="modal" id="m-sub" role="dialog" aria-modal="true" aria-label="Подписка"><div class="box"><button class="x" data-close>✕</button>
    <h3>Дайджест для отрасли</h3><p class="sub">Раз в месяц: тренды кондитерского рынка, урожаи и цены на орехи, новинки ингредиентов.</p>
    <form class="form" novalidate><div class="field full"><input type="email" required placeholder=" "><label>E-mail</label></div>${consent()}<div class="submit full"><button class="btn" type="submit">Подписаться</button></div></form>
    ${okBlock('Вы подписаны','Первый выпуск придёт в начале следующего месяца.')}
  </div></div>

  <div class="cookie" id="cookie"><span>Сайт использует cookie-файлы для стабильной работы. Продолжая, вы соглашаетесь с <a href="#">политикой обработки</a>.</span><button class="btn light" id="cookieOk">Принять</button></div>
  <div class="toast" id="toast"></div>`;
}

/* switcher: активная страница по центру ленты; стрелки листают ленту
   (когда лента видна) или переключают страницу (на мобильном, где вместо ленты select) */
function initSwitcher(){
  const list = document.getElementById('pgList');
  const [prevA, nextA] = document.querySelectorAll('.pg-switch .nav a');
  const act = list.querySelector('a.active');
  const center = ()=>{
    if(!act) return;
    list.style.scrollBehavior = 'auto';
    const off = act.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
    list.scrollLeft = off - (list.clientWidth - act.offsetWidth) / 2;
    sync();
  };
  const listShown = ()=> getComputedStyle(list).display !== 'none';
  const sync = ()=>{
    const max = list.scrollWidth - list.clientWidth - 2;
    const fits = max <= 0;
    prevA.classList.toggle('off', listShown() && !fits && list.scrollLeft <= 2);
    nextA.classList.toggle('off', listShown() && !fits && list.scrollLeft >= max);
  };
  [[prevA,-1],[nextA,1]].forEach(([a,dir])=>a.addEventListener('click', e=>{
    if(!listShown() || list.scrollWidth <= list.clientWidth + 2) return; // переход по ссылке на соседнюю страницу
    e.preventDefault();
    /* своя анимация: нативный smooth-scroll на странице ЕМ гасится её скриптами */
    const from = list.scrollLeft;
    const to = Math.max(0, Math.min(list.scrollWidth - list.clientWidth, from + dir * list.clientWidth * .7));
    const t0 = performance.now(), dur = 350;
    list.style.scrollBehavior = 'auto';
    (function step(t){
      const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
      list.scrollLeft = from + (to - from) * ease;
      if(k < 1) requestAnimationFrame(step); else sync();
    })(t0);
  }));
  list.addEventListener('scroll', sync, {passive:true});
  window.addEventListener('resize', sync);
  center();
  window.addEventListener('load', center); // ширина пунктов меняется после загрузки шрифтов
  document.getElementById('pgSel').addEventListener('change', e=>{ location.href = e.target.value; });
}

/* ---------- mount ---------- */
/* data-chrome="min": страница со своей шапкой (ЕМ) — монтируем только переключатель */
if(body.dataset.chrome === 'min'){
  body.insertAdjacentHTML('afterbegin', switcher());
  initSwitcher();
  return;
}
body.insertAdjacentHTML('afterbegin', switcher() + header());
body.insertAdjacentHTML('beforeend', footer() + modals());
initSwitcher();

/* header shadow */
const hdr = document.getElementById('siteHeader');
const onScroll = ()=> hdr.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

/* offcanvas */
const offc = document.getElementById('offc');
document.getElementById('burger').onclick = ()=>{ offc.classList.add('open'); offc.setAttribute('aria-hidden','false'); body.style.overflow='hidden'; };
document.getElementById('offcX').onclick = ()=>{ offc.classList.remove('open'); offc.setAttribute('aria-hidden','true'); body.style.overflow=''; };

/* modals */
function openModal(id){
  const m = document.getElementById('m-'+id); if(!m) return;
  offc.classList.remove('open');
  m.classList.add('open'); body.style.overflow='hidden';
}
function closeModal(m){ m.classList.remove('open'); body.style.overflow=''; }
window.openModal = openModal;
document.addEventListener('click', e=>{
  const t = e.target.closest('[data-modal]');
  if(t){ e.preventDefault(); openModal(t.dataset.modal); return; }
  const c = e.target.closest('[data-close]');
  if(c){ closeModal(c.closest('.modal')); return; }
  if(e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') document.querySelectorAll('.modal.open').forEach(closeModal); });

/* forms (демо: валидация + экран успеха) */
document.addEventListener('submit', e=>{
  const f = e.target; if(!f.classList.contains('form')) return;
  e.preventDefault();
  let ok = true;
  f.querySelectorAll('[required]').forEach(i=>{
    const bad = i.type==='checkbox' ? !i.checked : !i.value.trim() || (i.type==='email' && !/.+@.+\..+/.test(i.value));
    i.closest('.field') && i.closest('.field').classList.toggle('err', bad);
    if(bad) ok = false;
  });
  if(ok) f.classList.add('sent');
});
document.addEventListener('change', e=>{
  if(e.target.type==='file' && e.target.files[0]){ const s=e.target.parentElement.querySelector('span'); if(s) s.textContent = e.target.files[0].name; }
});

/* cookie */
const ck = document.getElementById('cookie');
let ckSeen = false; try{ ckSeen = localStorage.getItem('orh-cookie')==='1'; }catch(e){}
if(!ckSeen) setTimeout(()=>ck.classList.add('show'), 1200);
document.getElementById('cookieOk').onclick = ()=>{ ck.classList.remove('show'); try{ localStorage.setItem('orh-cookie','1'); }catch(e){} };

/* toast */
window.toast = (msg)=>{ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2200); };

/* reveal */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} }),{rootMargin:'0px 0px -8% 0px'}) : null;
window.observeReveal = (root=document)=> root.querySelectorAll('.rv:not(.in)').forEach(el=> io ? io.observe(el) : el.classList.add('in'));
observeReveal();

/* FAQ */
document.addEventListener('click', e=>{
  const q = e.target.closest('.faq-q'); if(!q) return;
  const it = q.parentElement, a = it.querySelector('.faq-a');
  const open = it.classList.toggle('open');
  a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
});

/* hscroll arrows: <div class="arrows" data-for="id"> */
document.querySelectorAll('.arrows[data-for]').forEach(ar=>{
  const sc = document.getElementById(ar.dataset.for);
  const step = ()=> (sc.firstElementChild ? sc.firstElementChild.getBoundingClientRect().width + 20 : 300);
  ar.children[0].onclick = ()=> sc.scrollBy({left:-step(), behavior:'smooth'});
  ar.children[1].onclick = ()=> sc.scrollBy({left: step(), behavior:'smooth'});
});
})();
