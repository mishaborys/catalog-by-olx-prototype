/* ═══════════════════════════════════════
   CATALOG BY OLX — PROTOTYPE JS
════════════════════════════════════════ */

/* ─── STATE ─── */
let currentScreen = 1;
let currentLang   = 'ua';

/* ─── COMMENTS DATA ─── */
const COMMENTS = {
  register_leftPanel: {
    ua: 'Зміна: Додано опис сервісу. Раніше тут були лише іконки. Тепер користувач одразу розуміє що це за сервіс — міграція запчастин з AVTO.pro/PROM.ua на OLX.',
    en: 'Change: Added service description. Previously this area only had icons. Now the user immediately understands what this service is — migrating auto parts from AVTO.pro/PROM.ua to OLX.'
  },
  register_title: {
    ua: 'Зміна: Дефолтна сторінка — реєстрація, а не логін (після уточнення терміну дії токена).',
    en: 'Change: The default page is registration, not login (following clarification of token lifetime).'
  },
  register_infoBlock: {
    ua: 'Зміна: Блок перенесено ПІД поле Email (не над формою). Додано посилання на реєстрацію всередині блоку.',
    en: 'Change: The info block has been moved UNDER the Email field (not above the form). A registration link has been added inside the block.'
  },
  registerPwStrengthBar: {
    ua: 'Баг виправлено: прогрес-бар не фарбувався в правильний колір навіть коли всі умови виконані.\n\nРеалізована правильна логіка:\n1/4 умов → червоний\n2/4 → помаранчевий\n3/4 → жовтий\n4/4 → зелений',
    en: 'Bug fixed: the progress bar was not displaying the correct color even when all conditions were met.\n\nCorrect logic implemented:\n1/4 conditions → red\n2/4 → orange\n3/4 → yellow\n4/4 → green'
  },
  login_infoBlock: {
    ua: 'Зміна: Додано інфо-блок на сторінці логіну. Користувач повинен знати що акаунти Content Manager і OLX — окремі.',
    en: 'Change: Info block added to the login page. The user must know that Content Manager and OLX accounts are separate.'
  },
  emailVerify_locked: {
    ua: 'Зміна: Після реєстрації користувач НЕ потрапляє в кабінет. Він бачить ТІЛЬКИ цей екран. Доступні лише: надіслати повторно + вийти.\n\nЗміна: Видалено окремий екран підтвердження з кнопкою "Увійти до кабінету" — він нічого не робив. Після кліку по посиланню в листі — одразу в кабінет + toast "Акаунт підтверджено".',
    en: 'Change: After registration, the user does NOT enter the cabinet. They see ONLY this screen. Only available: resend + sign out.\n\nChange: Removed the separate confirmation screen with "Enter cabinet" button — it did nothing. After clicking the email link — directly to cabinet + toast "Account confirmed".'
  },
  olxSync_instructions: {
    ua: 'Зміна: Текст опису зроблено нормальним читабельним шрифтом. Раніше він був майже невидимий.',
    en: 'Change: Description text made with a normal readable font. Previously it was almost invisible.'
  },
  olxSync_emailOrPhone: {
    ua: 'Важливо: Після синхронізації показуємо email АБО телефон (деякі акаунти OLX.ua мають тільки телефон, без email).',
    en: 'Important: After sync we show email OR phone number (some OLX.ua accounts have only a phone, no email).'
  },
  olxSync_separateAccounts: {
    ua: 'Зміна: Ці 2 кроки онбордингу повністю відокремлені від флоу імпорту. Раніше вони були частиною 5-кроківного wizard\'у — це неправильно.',
    en: 'Change: These 2 onboarding steps are completely separate from the import flow. Previously they were part of a 5-step wizard — that was incorrect.'
  },
  contacts_regionCityApi: {
    ua: 'Зміна: Дані автоматично підтягуються з OLX API. Поля передзаповнені але редаговані.',
    en: 'Change: Data is automatically pulled from the OLX API. Fields are pre-filled but editable.'
  },
  contactDistrict: {
    ua: 'Зміна: Поле "Район міста" з\'являється ТІЛЬКИ для міст що мають райони (напр. Київ). Для інших міст — не показувати.',
    en: 'Change: The "City district" field appears ONLY for cities that have districts (e.g. Kyiv). For other cities — do not show.'
  },
  contacts_phone: {
    ua: 'Зміна: Телефон — текстове поле (не числове). Без стрілок вгору/вниз. Підтримує кілька номерів через кому.\n\nТелефон 2 з\'являється тільки якщо заповнений Телефон 1. Телефон 3 — тільки якщо заповнений Телефон 2.',
    en: 'Change: Phone is a text field (not numeric). No up/down arrows. Supports multiple numbers separated by comma.\n\nPhone 2 appears only when Phone 1 is filled. Phone 3 — only when Phone 2 is filled.'
  },
  contacts_noSubmitBtn: {
    ua: 'Зміна: Кнопки "Зберегти інформацію" НЕ існує. Кнопка "Далі" одночасно валідує і зберігає.',
    en: 'Change: The "Save information" button does NOT exist. The "Next" button simultaneously validates and saves.'
  },
  import_platformSelection: {
    ua: 'Зміна: Вибір платформи і завантаження файлу — ОДИН екран з табами (а не 2 окремі кроки).\n\nЗміна: При першому відкритті жоден таб не вибраний. Вибір зберігається як дефолт в акаунті.',
    en: 'Change: Platform selection and file upload — ONE screen (not 2 separate steps).\n\nChange: On first open, no platform is selected. The selection is saved as default in the account.'
  },
  import_fileInstructions: {
    ua: 'Зміна: Інструкція відкривається в модальному вікні — з повним покроковим описом.',
    en: 'Change: Instructions open in a modal window — with a full step-by-step description.'
  },
  importDropZonezone: {
    ua: 'Зміна: Зона завантаження велика і красива (drag & drop), а не стандартний некрасивий input.',
    en: 'Change: The upload zone is large and visually appealing (drag & drop), not a standard ugly input.'
  },
  import_skipNoPhotoCheckbox: {
    ua: 'Зміна: Жодних фільтрів. Тільки один пре-вибраний чекбокс — не завантажувати без фото.',
    en: 'Change: No filters. Just one pre-selected checkbox — skip listings without photos.'
  },
  importAvtoExtraFields: {
    ua: 'Зміна: Для AVTO.pro — тільки 2 додаткові обов\'язкові поля: валюта і опис. Більше нічого.',
    en: 'Change: For AVTO.pro — only 2 additional required fields: currency and description. Nothing more.'
  },
  importProgress_redirect: {
    ua: 'Зміна: Після натискання "Імпортувати" — одразу переходимо на цю сторінку. Показуємо назву файлу і прогрес.',
    en: 'Change: After clicking "Import" — immediately navigate to this page. We show the file name and progress.'
  },
  failedListings_onlyFailed: {
    ua: 'Зміна: Показуємо ТІЛЬКИ зафейлені оголошення. Раніше показувались всі з акаунту OLX — це неправильно.',
    en: 'Change: We show ONLY failed listings. Previously all OLX account listings were shown — that was incorrect.'
  },
  failedListings_inlineError: {
    ua: 'Зміна: Причина помилки видна безпосередньо в рядку таблиці (не треба відкривати панель, щоб дізнатись).',
    en: 'Change: The error reason is visible directly in the table row (no need to open the panel to find out).'
  },
  failedListings_saveEdit: {
    ua: 'Зміна: Після виправлення — toast + оголошення зникає зі списку. Успішні оголошення НЕ зберігаємо в системі.',
    en: 'Change: After fixing — toast + listing disappears from the list. Successful listings are NOT stored in the system.'
  },
  settings_deleteAccount: {
    ua: 'Зміна: Видалено кнопку "Видалити акаунт" (рішення продукту — не включати в MVP).',
    en: 'Change: "Delete account" button removed (product decision — not included in MVP).'
  },
  settings_avtoDesc: {
    ua: 'Зміна: "Нестандартний опис" перейменовано і переміщено в секцію "Опис для AVTO.pro" — це поле ТІЛЬКИ для AVTO.pro.',
    en: 'Change: "Custom description" renamed and moved to the "AVTO.pro Description" section — this field is ONLY for AVTO.pro.'
  },
  settings_noImportBtn: {
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
  if (id === 3) startEmailVerifyCountdown();
  if (id === 6 && tab) switchDashTab(tab);
  if (id === 7) startImportProgress();
}

/* ════════════════════════════════
   COMMENTS TOGGLE
════════════════════════════════ */
let commentsVisible = true;
function toggleComments() {
  commentsVisible = !commentsVisible;
  document.body.classList.toggle('comments-hidden', !commentsVisible);
  const btn = document.getElementById('comments-btn');
  btn.classList.toggle('active', commentsVisible);
  btn.title = commentsVisible ? 'Hide design comments' : 'Show design comments';
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
  document.getElementById('commentBody').textContent = c.en;
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
  const email = document.getElementById('registerEmail').value.trim();
  const pw    = document.getElementById('registerPassword').value;
  if (!email.includes('@')) {
    toast(currentLang === 'ua' ? 'Введіть коректний email' : 'Enter a valid email', 'error');
    return;
  }
  if (pw.length < 8) {
    toast(currentLang === 'ua' ? 'Пароль занадто короткий' : 'Password is too short', 'error');
    return;
  }
  const s3el = document.getElementById('verifyEmailDisplay');
  if (s3el) s3el.textContent = email;
  showScreen(3);
}

/* ════════════════════════════════
   SCREEN 3 — EMAIL VERIFICATION
════════════════════════════════ */
let emailVerifyCountdownInterval = null;

function startEmailVerifyCountdown() {
  if (emailVerifyCountdownInterval) clearInterval(emailVerifyCountdownInterval);
  let secs = 90;
  const btn       = document.getElementById('emailVerifyResendBtn');
  const countdown = document.getElementById('emailVerifyCountdown');
  if (!btn || !countdown) return;
  btn.disabled = true;
  const tick = () => {
    const ua = currentLang === 'ua';
    countdown.textContent = ua
      ? `Повторний лист можна надіслати через ${secs} с`
      : `You can resend in ${secs}s`;
    secs--;
    if (secs < 0) {
      clearInterval(emailVerifyCountdownInterval);
      btn.disabled = false;
      countdown.textContent = '';
    }
  };
  tick();
  emailVerifyCountdownInterval = setInterval(tick, 1000);
}

function resendVerificationEmail() {
  toast(currentLang === 'ua' ? 'Лист надіслано повторно' : 'Email resent');
  startEmailVerifyCountdown();
}

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
  document.getElementById('olxSyncInitialState').style.display = 'none';
  document.getElementById('olxSyncDoneState').style.display  = 'block';
  document.getElementById('olxSyncNextBtn').disabled = false;
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

function updateContactCities() {
  const reg = document.getElementById('contactRegion').value;
  const sel = document.getElementById('contactCity');
  sel.innerHTML = (S5_CITIES[reg] || []).map((c, i) =>
    `<option value="${c.v}" data-ua="${c.ua}" data-en="${c.en}" data-d="${c.d}" ${i === 0 ? 'selected' : ''}></option>`
  ).join('');
  applyLang();
  updateContactDistrict();
}

function updateContactDistrict() {
  const sel = document.getElementById('contactCity');
  const opt = sel.options[sel.selectedIndex];
  const show = opt && opt.dataset.d === 'true';
  document.getElementById('contactDistrictWrap').style.display = show ? 'block' : 'none';
}

function onContactPhoneChange() {
  const ph1 = document.getElementById('contactPhone1').value.trim();
  const ph2 = document.getElementById('contactPhone2').value.trim();
  document.getElementById('contactPhone2Wrap').style.display = ph1 ? 'block' : 'none';
  document.getElementById('contactPhone3Wrap').style.display = ph2 ? 'block' : 'none';
}

function submitContactDetails() {
  const name   = document.getElementById('contactName').value.trim();
  const region = document.getElementById('contactRegion').value;
  const city   = document.getElementById('contactCity').value;
  const phone  = document.getElementById('contactPhone1').value.trim();
  if (!name || !region || !city || !phone) {
    toast(currentLang === 'ua' ? 'Заповніть усі обов\'язкові поля' : 'Fill in all required fields', 'error');
    return;
  }
  showScreen(6, 'hist');
}

/* ════════════════════════════════
   SCREEN 6 — DASHBOARD
════════════════════════════════ */
let selectedImportPlatform = null;
let importFileReady = false;

function switchDashTab(t) {
  const tabPanels = { hist: 'importHistoryTab',    imp: 'importNewTab'    };
  const tabBtns   = { hist: 'importHistoryTabBtn', imp: 'importNewTabBtn' };
  ['hist', 'imp'].forEach(id => {
    document.getElementById(tabPanels[id]).style.display = id === t ? 'block' : 'none';
    document.getElementById(tabBtns[id]).classList.toggle('active-tab', id === t);
  });
  if (t === 'imp') {
    selectedImportPlatform = null;
    importFileReady = false;
    document.getElementById('platformCardProm').classList.remove('selected');
    document.getElementById('platformCardAvto').classList.remove('selected');
    document.getElementById('importDropZoneEmpty').style.display = 'block';
    document.getElementById('importDropZoneDone').style.display  = 'none';
    document.getElementById('importDropZone').classList.remove('has-file');
    document.getElementById('importAvtoExtraFields').style.display = 'none';
    goToImportStep(1);
  }
  applyLang();
}

function goToImportStep(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById('importStepPanel' + i).style.display = i === n ? 'block' : 'none';
    const dot  = document.getElementById('importStepDot'  + i);
    const line = document.getElementById('importStepLine' + i);
    if (dot) {
      dot.classList.toggle('active', i === n);
      dot.classList.toggle('done',   i <  n);
    }
    if (line) line.classList.toggle('done', i < n);
  });
  if (n === 3) buildImportSummary();
  applyLang();
}

function buildImportSummary() {
  const ua = currentLang === 'ua';
  document.getElementById('importSummaryPlatform').innerHTML =
    `<span class="badge-platform ${selectedImportPlatform}">${selectedImportPlatform === 'prom' ? 'PROM.ua' : 'AVTO.pro'}</span>`;
  const fname = selectedImportPlatform === 'prom' ? 'prom_export.xlsx' : 'avto_export.xlsx';
  document.getElementById('importSummaryFile').textContent = fname;
  const noPhoto = document.getElementById('importSkipNoPhoto').checked;
  document.getElementById('importSummaryNoPhoto').textContent = noPhoto
    ? (ua ? 'Пропускати оголошення без фото' : 'Skip listings without photos')
    : (ua ? 'Завантажувати всі оголошення'   : 'Upload all listings');
  const descWrap = document.getElementById('importSummaryDescWrap');
  if (selectedImportPlatform === 'avto') {
    const desc = document.getElementById('importAvtoDescription').value.trim();
    document.getElementById('importSummaryDesc').textContent = desc || (ua ? '(не вказано)' : '(not set)');
    descWrap.style.display = 'flex';
  } else {
    descWrap.style.display = 'none';
  }
}

function validateAndGoToImportStep3() {
  if (selectedImportPlatform === 'avto' && !document.getElementById('importAvtoDescription').value.trim()) {
    toast(currentLang === 'ua' ? 'Введіть опис оголошень' : 'Enter a listing description', 'error');
    return;
  }
  goToImportStep(3);
}

function selectImportPlatform(p) {
  selectedImportPlatform = p;
  document.getElementById('platformCardProm').classList.toggle('selected', p === 'prom');
  document.getElementById('platformCardAvto').classList.toggle('selected', p === 'avto');
  document.getElementById('importSelectedPlatform').textContent = p === 'prom' ? 'PROM.ua' : 'AVTO.pro';
  importFileReady = false;
  document.getElementById('importDropZoneEmpty').style.display = 'block';
  document.getElementById('importDropZoneDone').style.display  = 'none';
  document.getElementById('importDropZone').classList.remove('has-file');
  document.getElementById('importAvtoExtraFields').style.display = 'none';
  document.getElementById('importNextBtn1').disabled = false;
  applyLang();
}

function simulateImportFile() {
  if (!selectedImportPlatform) return;
  importFileReady = true;
  const fname = selectedImportPlatform === 'prom' ? 'prom_export.xlsx' : 'avto_export.xlsx';
  document.getElementById('importFileName').textContent = fname;
  document.getElementById('importDropZoneEmpty').style.display = 'none';
  document.getElementById('importDropZoneDone').style.display  = 'block';
  document.getElementById('importDropZone').classList.add('has-file');
  if (selectedImportPlatform === 'avto') {
    document.getElementById('importAvtoExtraFields').style.display = 'block';
  }
  document.getElementById('importNextBtn2').disabled = false;
  applyLang();
}

function setImportCurrency(c) {
  ['uah', 'usd', 'eur'].forEach(id => {
    document.getElementById('cur_' + id).classList.toggle('active-cur', id === c);
  });
}

function startImport() {
  showScreen(7);
}

function openInstModal() {
  const isProm = selectedImportPlatform === 'prom';
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
let importProgressInterval = null;

function startImportProgress() {
  let n = 0;
  document.getElementById('importProgressCount').textContent = '0';
  document.getElementById('importProgressBar').style.width = '0%';
  document.getElementById('importProgressSpinner').classList.add('spinning');
  if (importProgressInterval) clearInterval(importProgressInterval);
  importProgressInterval = setInterval(() => {
    n += Math.floor(Math.random() * 4) + 1;
    if (n >= 87) { n = 87; clearInterval(importProgressInterval); }
    document.getElementById('importProgressCount').textContent = n;
    document.getElementById('importProgressBar').style.width = Math.round(n / 146 * 100) + '%';
  }, 70);
}

/* ════════════════════════════════
   SCREEN 8 — FAILED LISTINGS
════════════════════════════════ */
const FAILED_LISTING_ERRORS = [
  { ua: 'Не вказана категорія',              en: 'Category not specified'       },
  { ua: 'Назва занадто довга > 70 символів', en: 'Title too long > 70 chars'    },
  { ua: 'Відсутнє фото',                     en: 'Missing photo'                }
];
let failedListingOpenRow  = null;
let failedListingsRemaining = 3;

function openFailedListingEdit(idx) {
  failedListingOpenRow = idx;
  const err = FAILED_LISTING_ERRORS[idx];
  document.getElementById('failedListingErrorText').textContent = currentLang === 'ua' ? err.ua : err.en;
  document.getElementById('failedListingsEditPanel').classList.add('open');
  document.getElementById('failedListingsOverlay').style.display = 'block';
  onFailedListingTitleChange();
  applyLang();
}

function closeFailedListingEdit() {
  document.getElementById('failedListingsEditPanel').classList.remove('open');
  document.getElementById('failedListingsOverlay').style.display = 'none';
  failedListingOpenRow = null;
}

function saveFailedListingEdit() {
  const row = document.getElementById('failedListingRow' + failedListingOpenRow);
  if (!row) return;
  closeFailedListingEdit();
  toast(currentLang === 'ua'
    ? '✓ Оголошення пройшло валідацію. Тепер ви можете побачити його в акаунті OLX.'
    : '✓ Listing passed validation. You can now see it in your OLX account.');
  row.style.transition = 'opacity .4s';
  row.style.opacity = '0';
  setTimeout(() => {
    row.remove();
    failedListingsRemaining--;
    document.getElementById('failedListingsCount').textContent = failedListingsRemaining;
    if (failedListingsRemaining === 0) {
      document.getElementById('failedListingsTable').style.display = 'none';
      document.getElementById('failedListingsEmpty').style.display = 'block';
    }
  }, 420);
}

function onFailedListingTitleChange() {
  const inp = document.getElementById('failedListingTitleInput');
  const cnt = document.getElementById('failedListingCharCount');
  if (!inp || !cnt) return;
  const len = inp.value.length;
  cnt.textContent = len + '/70';
  cnt.style.color = len > 70 ? '#c62828' : '#aaa';
}

function setFailedListingCondition(c) {
  document.getElementById('conditionUsedBtn').classList.toggle('active-cur', c === 'used');
  document.getElementById('conditionNewBtn').classList.toggle('active-cur', c === 'new');
}

/* ════════════════════════════════
   SCREEN 9 — SETTINGS
════════════════════════════════ */
function switchSettingsTab(t) {
  const panels = { olx: 'settingsPanelOlx', contacts: 'settingsPanelContacts', avto: 'settingsPanelAvto', pw: 'settingsPanelPassword' };
  const navs   = { olx: 'settingsNavOlx',   contacts: 'settingsNavContacts',   avto: 'settingsNavAvto',   pw: 'settingsNavPassword'   };
  Object.keys(panels).forEach(id => {
    document.getElementById(panels[id]).style.display = id === t ? 'block' : 'none';
    document.getElementById(navs[id]).classList.toggle('active-sett', id === t);
  });
  applyLang();
}

/* ════════════════════════════════
   COMPONENTS
════════════════════════════════ */

/* App header — used on all logged-in screens (4–9).
   Place <div data-component="app-header"></div> in any screen. */
function renderAppHeader(screenId) {
  const dropId = `drop${screenId}`;
  return `
  <div class="app-header">
    <span class="app-logo">Content manager<span class="dot">.</span><span class="by"> by OLX</span></span>
    <div class="hdr-dropdown">
      <button class="hdr-dropdown-btn" onclick="toggleDrop('${dropId}')">
        <span data-ua="Мій профіль" data-en="My Profile"></span>
        <i class="bi bi-chevron-down" style="font-size:.7rem;"></i>
      </button>
      <div class="hdr-dropdown-menu" id="${dropId}">
        <div class="hdr-drop-item" onclick="showScreen(6);closeDrop()">
          <i class="bi bi-house me-2"></i><span data-ua="Кабінет" data-en="Cabinet"></span>
        </div>
        <div class="hdr-drop-item" onclick="showScreen(9);closeDrop()">
          <i class="bi bi-gear me-2"></i><span data-ua="Налаштування" data-en="Settings"></span>
        </div>
        <div class="hdr-drop-item" onclick="showScreen(1);closeDrop()">
          <i class="bi bi-box-arrow-right me-2"></i><span data-ua="Вийти" data-en="Sign out"></span>
        </div>
      </div>
    </div>
  </div>`;
}

/* Left panel — used on auth screens (1–2).
   Place <div data-component="left-panel" data-grid-id="iconGridN"></div> in any screen. */
function renderLeftPanel(gridId) {
  return `
  <div class="split-left">
    <div class="icon-grid" id="${gridId}"></div>
    <div class="left-content cb-host">
      <div class="logo-text">Content manager<span class="dot">.</span></div>
      <div class="logo-by">by OLX</div>
      <div class="left-tagline"
        data-ua="Перенесіть свої оголошення на OLX"
        data-en="Transfer your listings to OLX"></div>
      <div class="left-sub"
        data-ua="Переносьте свої запчастини з AVTO.pro і PROM.ua на OLX — швидко, без ручного заповнення."
        data-en="Move your auto parts from AVTO.pro and PROM.ua to OLX — fast, no manual data entry."></div>
      <ul class="left-features">
        <li>
          <i class="bi bi-check-circle-fill"></i>
          <span data-ua="Завантажте файл з платформи конкурента"
                data-en="Upload a file from the competitor platform"></span>
        </li>
        <li>
          <i class="bi bi-check-circle-fill"></i>
          <span data-ua="Ми опублікуємо ваші оголошення на OLX"
                data-en="We will publish your listings on OLX"></span>
        </li>
        <li>
          <i class="bi bi-check-circle-fill"></i>
          <span data-ua="Слідкуйте за прогресом в особистому кабінеті"
                data-en="Track progress in your personal cabinet"></span>
        </li>
      </ul>
      <button class="cb" onclick="showComment('register_leftPanel')"><i class="bi bi-chat-fill"></i></button>
    </div>
  </div>`;
}

/* Icon-only left panel — dark bg + icon grid, no text content.
   Place <div data-component="icon-panel" data-grid-id="iconGridN"></div> in any screen. */
function renderIconPanel(gridId) {
  return `
  <div class="split-left">
    <div class="icon-grid" id="${gridId}"></div>
  </div>`;
}

/* Scan DOM for data-component placeholders and replace with rendered HTML. */
function mountComponents() {
  document.querySelectorAll('[data-component="app-header"]').forEach(el => {
    const screenId = el.closest('[id^="screen-"]')?.id.replace('screen-', '') || '';
    el.outerHTML = renderAppHeader(screenId);
  });
  document.querySelectorAll('[data-component="left-panel"]').forEach(el => {
    const gridId = el.dataset.gridId || 'iconGrid';
    el.outerHTML = renderLeftPanel(gridId);
  });
  document.querySelectorAll('[data-component="icon-panel"]').forEach(el => {
    const gridId = el.dataset.gridId || 'iconGrid';
    el.outerHTML = renderIconPanel(gridId);
  });
}

/* ════════════════════════════════
   SCREEN 10 — FORGOT PASSWORD
════════════════════════════════ */
function submitForgotPassword() {
  const email = document.getElementById('forgotPasswordEmail').value.trim();
  if (!email) {
    toast(currentLang === 'ua' ? 'Введіть email' : 'Enter your email', 'error');
    return;
  }
  document.getElementById('forgot-password-form').style.display = 'none';
  document.getElementById('forgot-password-sent-to').textContent = email;
  document.getElementById('forgot-password-success').style.display = 'block';
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
  const SCREEN_FILES = [
    'register',
    'login',
    'email-verify',
    'onboarding-sync',
    'onboarding-contacts',
    'dashboard',
    'import-progress',
    'failed-listings',
    'settings',
    'forgot-password',
  ];
  const fetches = SCREEN_FILES.map(name =>
    fetch(`screens/${name}.html`).then(r => r.text())
  );
  const htmls = await Promise.all(fetches);
  container.innerHTML = htmls.join('\n');

  // Inject shared components before anything else
  mountComponents();

  // Make screen-1 active by default
  const first = document.getElementById('screen-1');
  if (first) first.classList.add('active');

  buildGrid('iconGrid1');
  buildGrid('iconGrid2');
  buildGrid('iconGrid10');
  updateContactCities();
  updateContactDistrict();
  onContactPhoneChange();
  refreshNavHighlight();
  applyLang();
  document.getElementById('comments-btn').classList.add('active');
}

loadScreens();
