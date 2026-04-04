/* ═══════════════════════════════════════
   CATALOG BY OLX — PROTOTYPE JS
════════════════════════════════════════ */

/* ─── STATE ─── */
let currentScreen = 1;
let currentLang   = 'ua';

/* ─── COMMENTS DATA ─── */
const COMMENTS = {
  s1_left: {
    ua: 'Зміна: Додано опис сервісу. Раніше тут були лише іконки. Тепер користувач одразу розуміє що це за сервіс — міграція запчастин з AVTO.pro/PROM.ua на OLX.',
    en: 'Change: Added service description. Previously this area only had icons. Now the user immediately understands what this service is — migrating auto parts from AVTO.pro/PROM.ua to OLX.'
  },
  s1_title: {
    ua: 'Зміна: Дефолтна сторінка — реєстрація, а не логін (після уточнення терміну дії токена).',
    en: 'Change: The default page is registration, not login (following clarification of token lifetime).'
  },
  s1_infoblock: {
    ua: 'Зміна: Блок перенесено ПІД поле Email (не над формою). Додано посилання на реєстрацію всередині блоку.',
    en: 'Change: The info block has been moved UNDER the Email field (not above the form). A registration link has been added inside the block.'
  },
  s1_pwbar: {
    ua: 'Баг виправлено: прогрес-бар не фарбувався в правильний колір навіть коли всі умови виконані.\n\nРеалізована правильна логіка:\n1/4 умов → червоний\n2/4 → помаранчевий\n3/4 → жовтий\n4/4 → зелений',
    en: 'Bug fixed: the progress bar was not displaying the correct color even when all conditions were met.\n\nCorrect logic implemented:\n1/4 conditions → red\n2/4 → orange\n3/4 → yellow\n4/4 → green'
  },
  s2_infoblock: {
    ua: 'Зміна: Додано інфо-блок на сторінці логіну. Користувач повинен знати що акаунти Content Manager і OLX — окремі.',
    en: 'Change: Info block added to the login page. The user must know that Content Manager and OLX accounts are separate.'
  },
  s3_locked: {
    ua: 'Зміна: Після реєстрації користувач НЕ потрапляє в кабінет. Він бачить ТІЛЬКИ цей екран. Доступні лише: надіслати повторно + вийти.\n\nЗміна: Видалено окремий екран підтвердження з кнопкою "Увійти до кабінету" — він нічого не робив. Після кліку по посиланню в листі — одразу в кабінет + toast "Акаунт підтверджено".',
    en: 'Change: After registration, the user does NOT enter the cabinet. They see ONLY this screen. Only available: resend + sign out.\n\nChange: Removed the separate confirmation screen with "Enter cabinet" button — it did nothing. After clicking the email link — directly to cabinet + toast "Account confirmed".'
  },
  s4_text: {
    ua: 'Зміна: Текст опису зроблено нормальним читабельним шрифтом. Раніше він був майже невидимий.',
    en: 'Change: Description text made with a normal readable font. Previously it was almost invisible.'
  },
  s4_email_or_phone: {
    ua: 'Важливо: Після синхронізації показуємо email АБО телефон (деякі акаунти OLX.ua мають тільки телефон, без email).',
    en: 'Important: After sync we show email OR phone number (some OLX.ua accounts have only a phone, no email).'
  },
  s4_separate: {
    ua: 'Зміна: Ці 2 кроки онбордингу повністю відокремлені від флоу імпорту. Раніше вони були частиною 5-кроківного wizard\'у — це неправильно.',
    en: 'Change: These 2 onboarding steps are completely separate from the import flow. Previously they were part of a 5-step wizard — that was incorrect.'
  },
  s5_api: {
    ua: 'Зміна: Дані автоматично підтягуються з OLX API. Поля передзаповнені але редаговані.',
    en: 'Change: Data is automatically pulled from the OLX API. Fields are pre-filled but editable.'
  },
  s5_district: {
    ua: 'Зміна: Поле "Район міста" з\'являється ТІЛЬКИ для міст що мають райони (напр. Київ). Для інших міст — не показувати.',
    en: 'Change: The "City district" field appears ONLY for cities that have districts (e.g. Kyiv). For other cities — do not show.'
  },
  s5_phone: {
    ua: 'Зміна: Телефон — текстове поле (не числове). Без стрілок вгору/вниз. Підтримує кілька номерів через кому.\n\nТелефон 2 з\'являється тільки якщо заповнений Телефон 1. Телефон 3 — тільки якщо заповнений Телефон 2.',
    en: 'Change: Phone is a text field (not numeric). No up/down arrows. Supports multiple numbers separated by comma.\n\nPhone 2 appears only when Phone 1 is filled. Phone 3 — only when Phone 2 is filled.'
  },
  s5_nobtn: {
    ua: 'Зміна: Кнопки "Зберегти інформацію" НЕ існує. Кнопка "Далі" одночасно валідує і зберігає.',
    en: 'Change: The "Save information" button does NOT exist. The "Next" button simultaneously validates and saves.'
  },
  s6_platforms: {
    ua: 'Зміна: Вибір платформи і завантаження файлу — ОДИН екран з табами (а не 2 окремі кроки).\n\nЗміна: При першому відкритті жоден таб не вибраний. Вибір зберігається як дефолт в акаунті.',
    en: 'Change: Platform selection and file upload — ONE screen (not 2 separate steps).\n\nChange: On first open, no platform is selected. The selection is saved as default in the account.'
  },
  s6_instruction: {
    ua: 'Зміна: Інструкція відкривається в модальному вікні — з повним покроковим описом.',
    en: 'Change: Instructions open in a modal window — with a full step-by-step description.'
  },
  s6_dropzone: {
    ua: 'Зміна: Зона завантаження велика і красива (drag & drop), а не стандартний некрасивий input.',
    en: 'Change: The upload zone is large and visually appealing (drag & drop), not a standard ugly input.'
  },
  s6_checkbox: {
    ua: 'Зміна: Жодних фільтрів. Тільки один пре-вибраний чекбокс — не завантажувати без фото.',
    en: 'Change: No filters. Just one pre-selected checkbox — skip listings without photos.'
  },
  s6_avto_extra: {
    ua: 'Зміна: Для AVTO.pro — тільки 2 додаткові обов\'язкові поля: валюта і опис. Більше нічого.',
    en: 'Change: For AVTO.pro — only 2 additional required fields: currency and description. Nothing more.'
  },
  s7_redirect: {
    ua: 'Зміна: Після натискання "Імпортувати" — одразу переходимо на цю сторінку. Показуємо назву файлу і прогрес.',
    en: 'Change: After clicking "Import" — immediately navigate to this page. We show the file name and progress.'
  },
  s8_only_failed: {
    ua: 'Зміна: Показуємо ТІЛЬКИ зафейлені оголошення. Раніше показувались всі з акаунту OLX — це неправильно.',
    en: 'Change: We show ONLY failed listings. Previously all OLX account listings were shown — that was incorrect.'
  },
  s8_inline_err: {
    ua: 'Зміна: Причина помилки видна безпосередньо в рядку таблиці (не треба відкривати панель, щоб дізнатись).',
    en: 'Change: The error reason is visible directly in the table row (no need to open the panel to find out).'
  },
  s8_save: {
    ua: 'Зміна: Після виправлення — toast + оголошення зникає зі списку. Успішні оголошення НЕ зберігаємо в системі.',
    en: 'Change: After fixing — toast + listing disappears from the list. Successful listings are NOT stored in the system.'
  },
  s9_del_acc: {
    ua: 'Зміна: Видалено кнопку "Видалити акаунт" (рішення продукту — не включати в MVP).',
    en: 'Change: "Delete account" button removed (product decision — not included in MVP).'
  },
  s9_avto_desc: {
    ua: 'Зміна: "Нестандартний опис" перейменовано і переміщено в секцію "Опис для AVTO.pro" — це поле ТІЛЬКИ для AVTO.pro.',
    en: 'Change: "Custom description" renamed and moved to the "AVTO.pro Description" section — this field is ONLY for AVTO.pro.'
  },
  s9_no_import_btn: {
    ua: 'Зміна: Видалено кнопку "Імпортувати оголошення" з налаштувань — вона там не до місця.',
    en: 'Change: "Import listings" button removed from settings — it doesn\'t belong there.'
  }
};

/* ════════════════════════════════
   CORE NAVIGATION
════════════════════════════════ */
function showScreen(id, tab) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  currentScreen = id;
  refreshNavHighlight();
  applyLang();
  document.getElementById('nav-panel').classList.remove('open');
  closeDrop();
  if (id === 6 && tab) switchDashTab(tab);
  if (id === 7) s7StartProgress();
}

/* ════════════════════════════════
   LANGUAGE
════════════════════════════════ */
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
  applyLang();
}

function applyLang() {
  const ua = currentLang === 'ua';
  document.querySelectorAll('[data-ua]').forEach(el => {
    const val = ua ? el.dataset.ua : el.dataset.en;
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-ua-placeholder]').forEach(el => {
    el.placeholder = ua ? el.dataset.uaPlaceholder : el.dataset.enPlaceholder;
  });
}

/* ════════════════════════════════
   COMMENT BUBBLES
════════════════════════════════ */
function showComment(key) {
  const c = COMMENTS[key];
  if (!c) return;
  document.getElementById('commentBody').textContent =
    currentLang === 'ua' ? c.ua : c.en;
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById('commentModal')
  ).show();
}

/* ════════════════════════════════
   TOAST
════════════════════════════════ */
function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast-item toast-${type}`;
  el.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>${msg}`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .4s'; }, 2700);
  setTimeout(() => el.remove(), 3200);
}

/* ════════════════════════════════
   SCREEN NAVIGATOR
════════════════════════════════ */
function toggleNav() {
  document.getElementById('nav-panel').classList.toggle('open');
}
function refreshNavHighlight() {
  document.querySelectorAll('.nav-item-s').forEach(el => {
    el.classList.toggle('current', +el.dataset.screen === currentScreen);
  });
}

/* ════════════════════════════════
   PASSWORD HELPERS
════════════════════════════════ */
function togglePw(id, btn) {
  const inp = document.getElementById(id);
  const show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  btn.innerHTML = `<i class="bi bi-eye${show ? '-slash' : ''}"></i>`;
}

function evalPw(inputId, barId) {
  const pw = document.getElementById(inputId).value;
  const checks = [
    pw.length >= 8,
    /[A-Z]/.test(pw),
    /[a-z]/.test(pw),
    /[0-9]/.test(pw)
  ];
  const score = checks.filter(Boolean).length;
  const colors = { 0: '#e0e0e0', 1: '#e53935', 2: '#fb8c00', 3: '#fdd835', 4: '#43a047' };
  const bar = document.getElementById(barId);
  [...bar.children].forEach((seg, i) => {
    seg.style.background = i < score ? colors[score] : '#e0e0e0';
  });
}

/* ════════════════════════════════
   SCREEN 1 — REGISTRATION
════════════════════════════════ */
function submitRegister() {
  const email = document.getElementById('s1_email').value.trim();
  const pw    = document.getElementById('s1_pw').value;
  if (!email.includes('@')) {
    toast(currentLang === 'ua' ? 'Введіть коректний email' : 'Enter a valid email', 'error');
    return;
  }
  if (pw.length < 8) {
    toast(currentLang === 'ua' ? 'Пароль занадто короткий' : 'Password is too short', 'error');
    return;
  }
  const s3el = document.getElementById('s3_email');
  if (s3el) s3el.textContent = email;
  showScreen(3);
}

/* ════════════════════════════════
   SCREEN 3 — EMAIL VERIFICATION
════════════════════════════════ */
function simulateEmailConfirm() {
  toast(currentLang === 'ua' ? '✓ Акаунт підтверджено' : '✓ Account confirmed');
  setTimeout(() => showScreen(4), 900);
}

/* ════════════════════════════════
   SCREEN 4 — OLX SYNC
════════════════════════════════ */
function openOAuthModal() {
  bootstrap.Modal.getOrCreateInstance(document.getElementById('oauthModal')).show();
}
function completeOAuth() {
  bootstrap.Modal.getInstance(document.getElementById('oauthModal'))?.hide();
  document.getElementById('s4_initial').style.display = 'none';
  document.getElementById('s4_synced').style.display  = 'block';
  document.getElementById('s4_next').disabled = false;
  toast(currentLang === 'ua' ? '✓ Синхронізовано з OLX' : '✓ Synced with OLX');
  applyLang();
}

/* ════════════════════════════════
   SCREEN 5 — CONTACTS
════════════════════════════════ */
const S5_CITIES = {
  kyiv:    [{ v:'kyiv',    ua:'Київ',      en:'Kyiv',      d:true  },
            { v:'boryspil',ua:'Бориспіль', en:'Boryspil',  d:false },
            { v:'brovary', ua:'Бровари',   en:'Brovary',   d:false }],
  kharkiv: [{ v:'kharkiv', ua:'Харків',    en:'Kharkiv',   d:true  },
            { v:'izium',   ua:'Ізюм',      en:'Izium',     d:false }],
  odesa:   [{ v:'odesa',   ua:'Одеса',     en:'Odesa',     d:true  },
            { v:'bilhorod',ua:'Білгород-Дністровський', en:'Bilhorod-Dnistrovskyi', d:false }],
  dnipro:  [{ v:'dnipro',  ua:'Дніпро',    en:'Dnipro',    d:true  },
            { v:'kryvyi',  ua:'Кривий Ріг',en:'Kryvyi Rih',d:false }],
  lviv:    [{ v:'lviv',    ua:'Львів',     en:'Lviv',      d:false },
            { v:'trusk',   ua:'Трускавець',en:'Truskavets', d:false }]
};

function s5UpdateCities() {
  const reg = document.getElementById('s5_region').value;
  const sel = document.getElementById('s5_city');
  sel.innerHTML = (S5_CITIES[reg] || []).map((c, i) =>
    `<option value="${c.v}" data-ua="${c.ua}" data-en="${c.en}" data-d="${c.d}" ${i === 0 ? 'selected' : ''}></option>`
  ).join('');
  applyLang();
  s5UpdateDistrict();
}

function s5UpdateDistrict() {
  const sel = document.getElementById('s5_city');
  const opt = sel.options[sel.selectedIndex];
  const show = opt && opt.dataset.d === 'true';
  document.getElementById('s5_district_wrap').style.display = show ? 'block' : 'none';
}

function s5PhoneChange() {
  const ph1 = document.getElementById('s5_ph1').value.trim();
  const ph2 = document.getElementById('s5_ph2').value.trim();
  document.getElementById('s5_ph2_wrap').style.display = ph1 ? 'block' : 'none';
  document.getElementById('s5_ph3_wrap').style.display = ph2 ? 'block' : 'none';
}

function s5Submit() {
  const name   = document.getElementById('s5_name').value.trim();
  const region = document.getElementById('s5_region').value;
  const city   = document.getElementById('s5_city').value;
  const phone  = document.getElementById('s5_ph1').value.trim();
  if (!name || !region || !city || !phone) {
    toast(currentLang === 'ua' ? 'Заповніть усі обов\'язкові поля' : 'Fill in all required fields', 'error');
    return;
  }
  showScreen(6, 'hist');
}

/* ════════════════════════════════
   SCREEN 6 — DASHBOARD
════════════════════════════════ */
let s6Platform = null;
let s6FileReady = false;

function switchDashTab(t) {
  ['hist', 'imp'].forEach(id => {
    document.getElementById('tab6_' + id).style.display = id === t ? 'block' : 'none';
    document.getElementById('tab6_' + id + '_btn').classList.toggle('active-tab', id === t);
  });
}

function s6SelectPlatform(p) {
  s6Platform = p;
  document.getElementById('plt_prom').classList.toggle('selected', p === 'prom');
  document.getElementById('plt_avto').classList.toggle('selected', p === 'avto');
  document.getElementById('s6_after').style.display = 'block';
  document.getElementById('s6_plt_name').textContent = p === 'prom' ? 'PROM.ua' : 'AVTO.pro';
  s6FileReady = false;
  document.getElementById('s6_drop_empty').style.display = 'block';
  document.getElementById('s6_drop_done').style.display  = 'none';
  document.getElementById('s6_drop').classList.remove('has-file');
  document.getElementById('s6_avto_extra').style.display = 'none';
  applyLang();
}

function s6SimulateFile() {
  s6FileReady = true;
  const fname = s6Platform === 'prom' ? 'prom_export.xlsx' : 'avto_export.xlsx';
  document.getElementById('s6_fname').textContent = fname;
  document.getElementById('s6_drop_empty').style.display = 'none';
  document.getElementById('s6_drop_done').style.display  = 'block';
  document.getElementById('s6_drop').classList.add('has-file');
  if (s6Platform === 'avto') {
    document.getElementById('s6_avto_extra').style.display = 'block';
  }
  applyLang();
}

function s6SetCur(c) {
  ['uah', 'usd', 'eur'].forEach(id => {
    document.getElementById('cur_' + id).classList.toggle('active-cur', id === c);
  });
}

function s6StartImport() {
  if (!s6FileReady) {
    toast(currentLang === 'ua' ? 'Спочатку оберіть файл' : 'Please select a file first', 'error');
    return;
  }
  if (s6Platform === 'avto' && !document.getElementById('s6_desc').value.trim()) {
    toast(currentLang === 'ua' ? 'Введіть опис оголошень' : 'Enter a listing description', 'error');
    return;
  }
  showScreen(7);
}

function openInstModal() {
  const isProm = s6Platform === 'prom';
  const ua = currentLang === 'ua';
  document.getElementById('instModal_title').textContent =
    ua ? (isProm ? 'Інструкція PROM.ua' : 'Інструкція AVTO.pro')
       : (isProm ? 'PROM.ua Instructions' : 'AVTO.pro Instructions');

  const avtoSteps = ua ? [
    'Авторизуйтесь на сайті avto.pro',
    'У боковому меню оберіть розділ <strong>Склади</strong>',
    'Відкрийте один зі своїх складів',
    'У правому верхньому куті натисніть <strong>Експортувати склад</strong>',
    'Оберіть формат <strong>Excel</strong>',
    'Завантажте файл на пристрій',
    'Прикріпіть файл у нашій системі'
  ] : [
    'Sign in to avto.pro',
    'In the sidebar, select <strong>Warehouses</strong>',
    'Open one of your warehouses',
    'Click <strong>Export warehouse</strong> in the top-right corner',
    'Select <strong>Excel</strong> format',
    'Download the file to your device',
    'Attach the file in our system'
  ];

  const promSteps = ua ? [
    'Авторизуйтесь на сайті prom.ua',
    'Товари та послуги → <strong>Товари</strong>',
    'Натисніть кнопку <strong>Експорт</strong>',
    'Оберіть <strong>Excel (.xlsx)</strong>, мова полів — українська',
    'Натисніть <strong>Експортувати</strong>',
    'Ви отримаєте листа з посиланням для завантаження',
    'Завантажте файл та прикріпіть у нашій системі'
  ] : [
    'Sign in to prom.ua',
    'Products & Services → <strong>Products</strong>',
    'Click the <strong>Export</strong> button',
    'Select <strong>Excel (.xlsx)</strong>, field language — Ukrainian',
    'Click <strong>Export</strong>',
    'You will receive an email with a download link',
    'Download the file and attach it in our system'
  ];

  const steps = isProm ? promSteps : avtoSteps;
  const warn = ua
    ? '⚠️ Важливо: Не змінюйте структуру файлу. Не переставляйте та не видаляйте колонки. Рядки можна видаляти.'
    : '⚠️ Important: Do not change the file structure. Do not reorder or delete columns. Rows can be deleted.';

  document.getElementById('instModal_body').innerHTML =
    `<ol class="mb-3">${steps.map(s => `<li class="mb-2">${s}</li>`).join('')}</ol>
     <div class="alert alert-warning py-2 mb-0">${warn}</div>`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById('instModal')).show();
}

/* ════════════════════════════════
   SCREEN 7 — IMPORT PROGRESS
════════════════════════════════ */
let s7Interval = null;

function s7StartProgress() {
  let n = 0;
  document.getElementById('s7_count').textContent = '0';
  document.getElementById('s7_bar').style.width = '0%';
  document.getElementById('s7_spin').classList.add('spinning');
  if (s7Interval) clearInterval(s7Interval);
  s7Interval = setInterval(() => {
    n += Math.floor(Math.random() * 4) + 1;
    if (n >= 87) { n = 87; clearInterval(s7Interval); }
    document.getElementById('s7_count').textContent = n;
    document.getElementById('s7_bar').style.width = Math.round(n / 146 * 100) + '%';
  }, 70);
}

/* ════════════════════════════════
   SCREEN 8 — FAILED LISTINGS
════════════════════════════════ */
const S8_ERRORS = [
  { ua: 'Не вказана категорія',              en: 'Category not specified'       },
  { ua: 'Назва занадто довга > 70 символів', en: 'Title too long > 70 chars'    },
  { ua: 'Відсутнє фото',                     en: 'Missing photo'                }
];
let s8OpenRow  = null;
let s8Remaining = 3;

function s8OpenEdit(idx) {
  s8OpenRow = idx;
  const err = S8_ERRORS[idx];
  document.getElementById('s8_err_txt').textContent = currentLang === 'ua' ? err.ua : err.en;
  document.getElementById('s8_panel').classList.add('open');
  document.getElementById('s8_overlay').style.display = 'block';
  s8CharCount();
  applyLang();
}

function s8CloseEdit() {
  document.getElementById('s8_panel').classList.remove('open');
  document.getElementById('s8_overlay').style.display = 'none';
  s8OpenRow = null;
}

function s8SaveEdit() {
  const row = document.getElementById('s8r_' + s8OpenRow);
  if (!row) return;
  s8CloseEdit();
  toast(currentLang === 'ua'
    ? '✓ Оголошення пройшло валідацію. Тепер ви можете побачити його в акаунті OLX.'
    : '✓ Listing passed validation. You can now see it in your OLX account.');
  row.style.transition = 'opacity .4s';
  row.style.opacity = '0';
  setTimeout(() => {
    row.remove();
    s8Remaining--;
    document.getElementById('s8_failcount').textContent = s8Remaining;
    if (s8Remaining === 0) {
      document.getElementById('s8_table').style.display = 'none';
      document.getElementById('s8_empty').style.display = 'block';
    }
  }, 420);
}

function s8CharCount() {
  const inp = document.getElementById('s8_title_inp');
  const cnt = document.getElementById('s8_char_cnt');
  if (!inp || !cnt) return;
  const len = inp.value.length;
  cnt.textContent = len + '/70';
  cnt.style.color = len > 70 ? '#c62828' : '#aaa';
}

function s8SetCond(c) {
  document.getElementById('cond_used').classList.toggle('active-cur', c === 'used');
  document.getElementById('cond_new').classList.toggle('active-cur', c === 'new');
}

/* ════════════════════════════════
   SCREEN 9 — SETTINGS
════════════════════════════════ */
function s9Tab(t) {
  ['olx', 'contacts', 'avto', 'pw'].forEach(id => {
    document.getElementById('s9_' + id).style.display = id === t ? 'block' : 'none';
    document.getElementById('s9nav_' + id).classList.toggle('active-sett', id === t);
  });
  applyLang();
}

/* ════════════════════════════════
   HEADER DROPDOWN
════════════════════════════════ */
function toggleDrop(id) {
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  closeDrop();
  if (!wasOpen) el.classList.add('open');
}

function closeDrop() {
  document.querySelectorAll('.hdr-dropdown-menu').forEach(m => m.classList.remove('open'));
}

/* ════════════════════════════════
   ICON GRID
════════════════════════════════ */
function buildGrid(id) {
  const icons = ['wrench', 'gear', 'tools', 'car', 'truck', 'speedometer2',
                 'fuel-pump', 'battery', 'nut', 'lightning-charge', 'cpu', 'tools'];
  document.getElementById(id).innerHTML =
    Array.from({ length: 72 }, (_, i) =>
      `<i class="bi bi-${icons[i % icons.length]}"></i>`
    ).join('');
}

/* ════════════════════════════════
   GLOBAL EVENT LISTENERS
════════════════════════════════ */
document.addEventListener('click', e => {
  if (!e.target.closest('.hdr-dropdown')) closeDrop();
  if (!e.target.closest('#nav-panel') && !e.target.closest('#nav-btn'))
    document.getElementById('nav-panel').classList.remove('open');
});

/* ════════════════════════════════
   LOAD SCREENS & INIT
════════════════════════════════ */
async function loadScreens() {
  const container = document.getElementById('screens-container');
  const total = 9;
  const fetches = Array.from({ length: total }, (_, i) =>
    fetch(`screens/screen-${i + 1}.html`).then(r => r.text())
  );
  const htmls = await Promise.all(fetches);
  container.innerHTML = htmls.join('\n');

  // Make screen-1 active by default
  const first = document.getElementById('screen-1');
  if (first) first.classList.add('active');

  buildGrid('iconGrid1');
  buildGrid('iconGrid2');
  s5UpdateCities();
  s5UpdateDistrict();
  s5PhoneChange();
  refreshNavHighlight();
  applyLang();
}

loadScreens();
