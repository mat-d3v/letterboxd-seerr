// ==UserScript==
// @name         Letterboxd to Seerr
// @name:fr      Letterboxd vers Seerr
// @namespace    http://tampermonkey.net/
// @version      2.2.0
// @description  Add a button to request movies directly on Seerr from Letterboxd, with optional quality profile and per-request tag selection
// @description:fr  Ajoute un bouton pour demander des films sur Seerr directement depuis Letterboxd, avec profil qualité et choix de tag par demande
// @description:de  Fügt einen Button hinzu, um Filme direkt von Letterboxd auf Seerr anzufragen, mit Qualitätsprofil und Tag-Auswahl pro Anfrage
// @description:es  Añade un botón para solicitar películas en Seerr directamente desde Letterboxd, con perfil de calidad y etiqueta por solicitud
// @description:it  Aggiunge un pulsante per richiedere film su Seerr direttamente da Letterboxd, con profilo qualità e tag per richiesta
// @description:pt  Adiciona um botão para solicitar filmes no Seerr diretamente do Letterboxd, com perfil de qualidade e tag por pedido
// @description:ja  LetterboxdからSeerrに映画を直接リクエストするボタンを追加します（品質プロファイルとリクエストごとのタグ選択付き）
// @author       mat-d3v
// @match        https://letterboxd.com/film/*
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_registerMenuCommand
// @connect      *
// @updateURL    https://raw.githubusercontent.com/mat-d3v/letterboxd-seerr/main/letterboxd-seerr.user.js
// @downloadURL  https://raw.githubusercontent.com/mat-d3v/letterboxd-seerr/main/letterboxd-seerr.user.js
// @license      MIT
// ==/UserScript==

'use strict';

const LANG = navigator.language.startsWith('fr') ? 'fr'
  : navigator.language.startsWith('de') ? 'de'
    : navigator.language.startsWith('es') ? 'es'
      : navigator.language.startsWith('it') ? 'it'
        : navigator.language.startsWith('pt') ? 'pt'
          : navigator.language.startsWith('ja') ? 'ja'
            : 'en';

const MESSAGES = {
  en: {
    added: '✅ Added to Seerr',
    exists: '⚠️ Already requested',
    available: '📺 Already available',
    error: '❌ Error',
    unreachable: '❌ Cannot reach Seerr',
    notFound: '❌ Not found on Seerr',
    button: 'Seerr',
    loading: 'Adding...',
    configure: 'Configure Seerr',
    promptUrl: 'Seerr URL (e.g. http://192.168.1.x:5055):',
    promptKey: 'API key (Seerr → Settings → General):',
    configSaved: '✅ Configuration saved',
    notConfigured: '⚙️ Set your Seerr URL and API key first',
    chooseProfileMenu: 'Choose default quality profile',
    chooseProfileTitle: 'Default quality profile',
    profileDefault: 'Seerr default (no override)',
    profileSaved: '✅ Profile saved',
    chooseTagTitle: 'Tag for this request',
    noTag: 'No tag',
    cancelled: 'Cancelled',
  },
  fr: {
    added: '✅ Ajouté à Seerr',
    exists: '⚠️ Déjà demandé',
    available: '📺 Déjà disponible',
    error: '❌ Erreur',
    unreachable: '❌ Seerr inaccessible',
    notFound: '❌ Introuvable sur Seerr',
    button: 'Seerr',
    loading: 'Ajout...',
    configure: 'Configurer Seerr',
    promptUrl: 'URL de Seerr (ex. http://192.168.1.x:5055) :',
    promptKey: 'Clé API (Seerr → Paramètres → Général) :',
    configSaved: '✅ Configuration enregistrée',
    notConfigured: '⚙️ Renseigne d\'abord l\'URL et la clé API Seerr',
    chooseProfileMenu: 'Choisir le profil qualité par défaut',
    chooseProfileTitle: 'Profil qualité par défaut',
    profileDefault: 'Défaut Seerr (aucune préférence)',
    profileSaved: '✅ Profil enregistré',
    chooseTagTitle: 'Tag pour cette demande',
    noTag: 'Aucun tag',
    cancelled: 'Annulé',
  },
  de: {
    added: '✅ Zu Seerr hinzugefügt',
    exists: '⚠️ Bereits angefragt',
    available: '📺 Bereits verfügbar',
    error: '❌ Fehler',
    unreachable: '❌ Seerr nicht erreichbar',
    notFound: '❌ Auf Seerr nicht gefunden',
    button: 'Seerr',
    loading: 'Wird hinzugefügt...',
    configure: 'Seerr konfigurieren',
    promptUrl: 'Seerr-URL (z. B. http://192.168.1.x:5055):',
    promptKey: 'API-Key (Seerr → Einstellungen → Allgemein):',
    configSaved: '✅ Konfiguration gespeichert',
    notConfigured: '⚙️ Zuerst Seerr-URL und API-Key eintragen',
    chooseProfileMenu: 'Standard-Qualitätsprofil wählen',
    chooseProfileTitle: 'Standard-Qualitätsprofil',
    profileDefault: 'Seerr-Standard (keine Vorgabe)',
    profileSaved: '✅ Profil gespeichert',
    chooseTagTitle: 'Tag für diese Anfrage',
    noTag: 'Kein Tag',
    cancelled: 'Abgebrochen',
  },
  es: {
    added: '✅ Añadido a Seerr',
    exists: '⚠️ Ya solicitado',
    available: '📺 Ya disponible',
    error: '❌ Error',
    unreachable: '❌ Seerr no disponible',
    notFound: '❌ No encontrado en Seerr',
    button: 'Seerr',
    loading: 'Añadiendo...',
    configure: 'Configurar Seerr',
    promptUrl: 'URL de Seerr (ej. http://192.168.1.x:5055):',
    promptKey: 'Clave API (Seerr → Ajustes → General):',
    configSaved: '✅ Configuración guardada',
    notConfigured: '⚙️ Configura primero la URL y la clave API',
    chooseProfileMenu: 'Elegir perfil de calidad por defecto',
    chooseProfileTitle: 'Perfil de calidad por defecto',
    profileDefault: 'Por defecto de Seerr (sin preferencia)',
    profileSaved: '✅ Perfil guardado',
    chooseTagTitle: 'Etiqueta para esta solicitud',
    noTag: 'Sin etiqueta',
    cancelled: 'Cancelado',
  },
  it: {
    added: '✅ Aggiunto a Seerr',
    exists: '⚠️ Già richiesto',
    available: '📺 Già disponibile',
    error: '❌ Errore',
    unreachable: '❌ Seerr non raggiungibile',
    notFound: '❌ Non trovato su Seerr',
    button: 'Seerr',
    loading: 'Aggiunta...',
    configure: 'Configura Seerr',
    promptUrl: 'URL di Seerr (es. http://192.168.1.x:5055):',
    promptKey: 'Chiave API (Seerr → Impostazioni → Generale):',
    configSaved: '✅ Configurazione salvata',
    notConfigured: '⚙️ Imposta prima URL e chiave API',
    chooseProfileMenu: 'Scegli profilo qualità predefinito',
    chooseProfileTitle: 'Profilo qualità predefinito',
    profileDefault: 'Predefinito Seerr (nessuna preferenza)',
    profileSaved: '✅ Profilo salvato',
    chooseTagTitle: 'Tag per questa richiesta',
    noTag: 'Nessun tag',
    cancelled: 'Annullato',
  },
  pt: {
    added: '✅ Adicionado ao Seerr',
    exists: '⚠️ Já solicitado',
    available: '📺 Já disponível',
    error: '❌ Erro',
    unreachable: '❌ Seerr indisponível',
    notFound: '❌ Não encontrado no Seerr',
    button: 'Seerr',
    loading: 'A adicionar...',
    configure: 'Configurar Seerr',
    promptUrl: 'URL do Seerr (ex. http://192.168.1.x:5055):',
    promptKey: 'Chave API (Seerr → Definições → Geral):',
    configSaved: '✅ Configuração guardada',
    notConfigured: '⚙️ Define primeiro o URL e a chave da API',
    chooseProfileMenu: 'Escolher perfil de qualidade padrão',
    chooseProfileTitle: 'Perfil de qualidade padrão',
    profileDefault: 'Padrão do Seerr (sem preferência)',
    profileSaved: '✅ Perfil guardado',
    chooseTagTitle: 'Tag para este pedido',
    noTag: 'Sem tag',
    cancelled: 'Cancelado',
  },
  ja: {
    added: '✅ Seerrに追加しました',
    exists: '⚠️ すでにリクエスト済み',
    available: '📺 視聴可能です',
    error: '❌ エラー',
    unreachable: '❌ Seerrに接続できません',
    notFound: '❌ Seerrで見つかりません',
    button: 'Seerr',
    loading: '追加中...',
    configure: 'Seerrを設定',
    promptUrl: 'SeerrのURL (例: http://192.168.1.x:5055):',
    promptKey: 'APIキー (Seerr → 設定 → 一般):',
    configSaved: '✅ 設定を保存しました',
    notConfigured: '⚙️ まずSeerrのURLとAPIキーを設定してください',
    chooseProfileMenu: 'デフォルトの品質プロファイルを選択',
    chooseProfileTitle: 'デフォルトの品質プロファイル',
    profileDefault: 'Seerrのデフォルト（指定なし）',
    profileSaved: '✅ プロファイルを保存しました',
    chooseTagTitle: 'このリクエストのタグ',
    noTag: 'タグなし',
    cancelled: 'キャンセルしました',
  },
};

const MSG = MESSAGES[LANG];

// --- Compat Tampermonkey (GM_*) / Safari & iOS Userscripts (GM.*) ---

function gmRequest(opts) {
  if (typeof GM_xmlhttpRequest === 'function') return GM_xmlhttpRequest(opts);
  if (typeof GM !== 'undefined' && GM.xmlHttpRequest) return GM.xmlHttpRequest(opts);
  opts.onerror && opts.onerror(new Error('No GM request API available'));
}

async function storeGet(key, def) {
  if (typeof GM_getValue === 'function') return GM_getValue(key, def);
  if (typeof GM !== 'undefined' && GM.getValue) return await GM.getValue(key, def);
  return def;
}

async function storeSet(key, value) {
  if (typeof GM_setValue === 'function') return GM_setValue(key, value);
  if (typeof GM !== 'undefined' && GM.setValue) return await GM.setValue(key, value);
}

// --- Configuration persistante (survit aux mises à jour du script) ---

const config = { url: '', key: '' };

async function loadConfig() {
  config.url = (await storeGet('seerr_url', '')) || '';
  config.key = (await storeGet('seerr_key', '')) || '';
}

function isConfigured() {
  return config.url !== '' && config.key !== '';
}

async function promptConfig() {
  const url = prompt(MSG.promptUrl, config.url || 'http://');
  if (url === null) return false;
  const key = prompt(MSG.promptKey, config.key);
  if (key === null) return false;
  config.url = url.trim().replace(/\/+$/, '');
  config.key = key.trim();
  await storeSet('seerr_url', config.url);
  await storeSet('seerr_key', config.key);
  if (isConfigured()) showNotif(MSG.configSaved, '#16a34a');
  return isConfigured();
}

// --- Profil qualité par défaut (optionnel, persistant) ---

function fetchServiceOptions(onDone) {
  gmRequest({
    method: 'GET',
    url: `${config.url}/api/v1/service/radarr`,
    anonymous: true,
    headers: { 'Accept': 'application/json', 'X-Api-Key': config.key },
    onload: (res) => {
      let list = [];
      try { list = JSON.parse(res.responseText); } catch (e) { }
      const server = list.find(s => s.isDefault) || list[0];
      if (!server) return onDone(null);
      gmRequest({
        method: 'GET',
        url: `${config.url}/api/v1/service/radarr/${server.id}`,
        anonymous: true,
        headers: { 'Accept': 'application/json', 'X-Api-Key': config.key },
        onload: (res2) => {
          let detail = {};
          try { detail = JSON.parse(res2.responseText); } catch (e) { }
          onDone({
            serverId: server.id,
            profiles: detail.profiles || [],
            tags: detail.tags || [],
          });
        },
        onerror: () => onDone(null),
      });
    },
    onerror: () => onDone(null),
  });
}

// Petite fenêtre de choix (remplace prompt() pour une liste d'options cliquables)
function showChoiceModal(title, items, noneLabel) {
  return new Promise((resolve) => {
    const existing = document.getElementById('jls-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'jls-modal';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      z-index: 100000; display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, sans-serif;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background: #14181c; color: #fff; border-radius: 10px; padding: 18px;
      min-width: 240px; max-width: 320px; max-height: 70vh; overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    `;

    const h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-size: 14px; font-weight: 700; margin-bottom: 12px;';
    panel.appendChild(h);

    const makeBtn = (label, value) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = `
        display: block; width: 100%; text-align: left; background: #2c3440;
        color: #fff; border: none; border-radius: 6px; padding: 8px 10px;
        margin-bottom: 6px; font-size: 13px; cursor: pointer;
      `;
      b.onmouseenter = () => { b.style.background = '#3a4552'; };
      b.onmouseleave = () => { b.style.background = '#2c3440'; };
      b.onclick = () => { overlay.remove(); resolve(value); };
      return b;
    };

    if (noneLabel) panel.appendChild(makeBtn(noneLabel, null));
    items.forEach((it) => panel.appendChild(makeBtn(it.name || it.label, it.id)));

    overlay.onclick = (e) => {
      if (e.target === overlay) { overlay.remove(); resolve(undefined); }
    };
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  });
}

async function promptProfile() {
  if (!isConfigured()) {
    showNotif(MSG.notConfigured, '#d97706');
    return;
  }
  const opts = await new Promise((resolve) => fetchServiceOptions(resolve));
  if (!opts || opts.profiles.length === 0) {
    showNotif(MSG.error, '#dc2626', 'No profiles found');
    return;
  }
  const chosen = await showChoiceModal(MSG.chooseProfileTitle, opts.profiles, MSG.profileDefault);
  if (chosen === undefined) return; // fermé sans choisir : on ne change rien
  await storeSet('seerr_profile_id', chosen === null ? '' : String(chosen));
  showNotif(MSG.profileSaved, '#16a34a');
}

if (typeof GM_registerMenuCommand === 'function') {
  GM_registerMenuCommand(MSG.configure, () => promptConfig());
  GM_registerMenuCommand(MSG.chooseProfileMenu, () => promptProfile());
}

// --- Helpers page Letterboxd ---

function getTmdbLink() {
  return document.querySelector('a[data-track-action="TMDB"]');
}

function getTmdbId() {
  const link = getTmdbLink();
  if (!link) return null;
  const match = link.href.match(/movie\/(\d+)/);
  return match ? match[1] : null;
}

function getMovieTitle() {
  const el = document.querySelector('.headline-1');
  return el ? el.textContent.trim() : '';
}

function getMovieYear() {
  const el = document.querySelector('.releasedate a, a[href*="/films/year/"]');
  const m = el && el.textContent.match(/\d{4}/);
  return m ? m[0] : '';
}

// Résolution de l'identifiant TMDB.
//
// Cas normal : Letterboxd expose un lien TMDB dans la page, on y lit l'id
// directement. Mais ce lien manque sur certaines fiches (films obscurs, pas
// encore sortis), et sans lui le script était auparavant totalement inerte :
// aucun bouton, aucun message. Le repli interroge donc la recherche Seerr sur
// le titre, en préférant le résultat dont l'année correspond à la fiche.
let resolvedTmdbId = null;

function resolveTmdbByTitle(onDone) {
  const title = getMovieTitle();
  if (!title) return onDone(null);
  const year = getMovieYear();
  gmRequest({
    method: 'GET',
    url: `${config.url}/api/v1/search?query=${encodeURIComponent(title)}&page=1`,
    anonymous: true,
    headers: { 'Accept': 'application/json', 'X-Api-Key': config.key },
    onload: (res) => {
      let data = {};
      try { data = JSON.parse(res.responseText); } catch (e) { }
      const movies = (data.results || []).filter(r => r.mediaType === 'movie');
      if (movies.length === 0) return onDone(null);
      const sameYear = year
        ? movies.find(m => (m.releaseDate || '').startsWith(year))
        : null;
      onDone((sameYear || movies[0]).id);
    },
    onerror: () => onDone(null),
  });
}

// Renvoie l'id TMDB via le lien de la page, sinon via la recherche Seerr.
// Le résultat est mémorisé pour la durée de la page.
function resolveMovie(onDone) {
  if (resolvedTmdbId) return onDone(resolvedTmdbId);
  const fromLink = getTmdbId();
  if (fromLink) {
    resolvedTmdbId = fromLink;
    return onDone(fromLink);
  }
  if (!isConfigured()) return onDone(null);
  resolveTmdbByTitle((id) => {
    if (id) resolvedTmdbId = String(id);
    onDone(resolvedTmdbId);
  });
}

function showNotif(msg, color, subtitle) {
  const existing = document.getElementById('jls-notif');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.id = 'jls-notif';
  n.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    max-width: 320px;
    background: ${color};
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    z-index: 99999;
    font-family: -apple-system, sans-serif;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  `;
  const main = document.createElement('div');
  main.textContent = msg;
  main.style.cssText = 'font-size: 13px; font-weight: 600; line-height: 1.3;';
  n.appendChild(main);
  if (subtitle) {
    const sub = document.createElement('div');
    sub.textContent = subtitle;
    sub.style.cssText = 'font-size: 12px; font-weight: 400; opacity: 0.85; margin-top: 2px; line-height: 1.3;';
    n.appendChild(sub);
  }
  document.body.appendChild(n);
  requestAnimationFrame(() => {
    n.style.opacity = '1';
    n.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    n.style.opacity = '0';
    n.style.transform = 'translateY(8px)';
    setTimeout(() => n.remove(), 300);
  }, 3500);
}

// --- États visuels du bouton ---

function setBtnState(btn, state) {
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  if (state === 'requested') {
    btn.textContent = '✓ ' + MSG.button;
    btn.style.background = '#16a34a';
    btn.style.color = '#fff';
    btn.dataset.state = 'requested';
  } else if (state === 'available') {
    btn.textContent = '✓ ' + MSG.button;
    btn.style.background = '#3b82f6';
    btn.style.color = '#fff';
    btn.dataset.state = 'available';
  } else {
    btn.textContent = '+ ' + MSG.button;
    btn.style.background = '#f59e0b';
    btn.style.color = '#000';
    btn.dataset.state = 'idle';
  }
}

function shakeBtn(btn) {
  btn.style.transition = 'transform 0.1s ease';
  const shake = [0, -4, 4, -4, 4, -2, 2, 0];
  shake.forEach((x, i) => {
    setTimeout(() => { btn.style.transform = `translateX(${x}px)`; }, i * 60);
  });
  setTimeout(() => { btn.style.transform = ''; }, shake.length * 60);
}

// mediaInfo.status Seerr : 4 = partiellement dispo, 5 = disponible
function mediaState(data) {
  const status = data.mediaInfo?.status || 0;
  if (status >= 4) return 'available';
  const requests = data.mediaInfo?.requests || [];
  if (requests.some(r => !r.is4k && r.status !== 3)) return 'requested';
  return 'idle';
}

// --- Appels Seerr ---

function fetchMovie(tmdbId, onDone, onFail) {
  gmRequest({
    method: 'GET',
    url: `${config.url}/api/v1/movie/${tmdbId}`,
    anonymous: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Key': config.key
    },
    onload: (res) => {
      let data = {};
      try { data = JSON.parse(res.responseText); } catch (e) { }
      onDone(res.status, data);
    },
    onerror: onFail
  });
}

// Affiche l'état (demandé / disponible) dès le chargement de la page
function checkInitialState(tmdbId, btn) {
  fetchMovie(tmdbId, (status, data) => {
    if (status === 200) setBtnState(btn, mediaState(data));
  }, () => { /* silencieux : l'état par défaut reste cliquable */ });
}

// Construit le corps de la requête (profil sauvegardé + tag choisi) puis l'envoie
async function submitRequest(tmdbId, btn, title, tagId) {
  // profileId : lu à chaque demande (persistant, modifiable via le menu
  // "Choisir le profil qualité par défaut"), envoyé tel quel à Seerr — son
  // API accepte profileId directement dans le corps de /api/v1/request.
  const savedProfileId = await storeGet('seerr_profile_id', '');

  gmRequest({
    method: 'POST',
    url: `${config.url}/api/v1/request`,
    anonymous: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Key': config.key
    },
    data: JSON.stringify({
      mediaType: 'movie',
      mediaId: parseInt(tmdbId),
      ...(tagId ? { tags: [tagId] } : {}),
      ...(savedProfileId ? { profileId: parseInt(savedProfileId) } : {}),
    }),
    onload: (res2) => {
      let data2 = {};
      try { data2 = JSON.parse(res2.responseText); } catch (e) { }
      if (res2.status === 201) {
        setBtnState(btn, 'requested');
        showNotif(MSG.added, '#16a34a', title);
      } else {
        setBtnState(btn, 'idle');
        showNotif(MSG.error, '#dc2626', data2.message || `Code ${res2.status}`);
      }
    },
    onerror: () => {
      setBtnState(btn, 'idle');
      showNotif(MSG.unreachable, '#dc2626');
    }
  });
}

async function requestMovie(tmdbId, btn) {
  const title = btn.dataset.title || '';
  btn.textContent = MSG.loading;
  btn.style.opacity = '0.7';
  btn.style.cursor = 'wait';

  fetchMovie(tmdbId, async (status, data) => {
    if (status === 401 || status === 403) {
      setBtnState(btn, 'idle');
      showNotif(MSG.error, '#dc2626', data.message || `Code ${status}`);
      promptConfig();
      return;
    }

    const state = mediaState(data);

    if (state === 'available') {
      setBtnState(btn, 'available');
      shakeBtn(btn);
      showNotif(MSG.available, '#3b82f6', title);
      return;
    }

    if (state === 'requested') {
      setBtnState(btn, 'requested');
      shakeBtn(btn);
      showNotif(MSG.exists, '#d97706', title);
      return;
    }

    // Demande le tag à chaque fois (jamais mémorisé), contrairement à
    // l'URL/clé/profil qui sont persistants.
    const opts = await new Promise((resolve) => fetchServiceOptions(resolve));
    let tagId = null;
    if (opts && opts.tags.length > 0) {
      const chosen = await showChoiceModal(MSG.chooseTagTitle, opts.tags, MSG.noTag);
      if (chosen === undefined) {
        setBtnState(btn, 'idle');
        showNotif(MSG.cancelled, '#6b7280', title);
        return;
      }
      tagId = chosen;
    }

    submitRequest(tmdbId, btn, title, tagId);
  }, () => {
    setBtnState(btn, 'idle');
    showNotif(MSG.unreachable, '#dc2626');
  });
}

// --- Insertion du bouton ---

function addButton() {
  if (document.getElementById('jls-btn')) return true;
  // Ancrage : à côté du lien TMDB quand il existe, sinon à côté du titre.
  // Sans ce repli, une fiche sans lien TMDB n'affichait aucun bouton.
  const tmdbLink = getTmdbLink();
  const anchor = tmdbLink || document.querySelector('.headline-1');
  if (!anchor) return false;

  const btn = document.createElement('a');
  btn.id = 'jls-btn';
  // Titre mis en cache une fois pour toutes (cohérent avec imdb-seerr, où
  // le bouton vit dans le titre et doit impérativement être lu avant insertion)
  btn.dataset.title = getMovieTitle();
  btn.style.cssText = `
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
    padding: 2px 7px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    letter-spacing: 0.5px;
    font-family: -apple-system, sans-serif;
    vertical-align: middle;
    height: 22px;
    line-height: 1;
    transition: background 0.2s ease, opacity 0.2s ease;
  `;
  setBtnState(btn, 'idle');

  btn.onmouseenter = () => { if (btn.style.cursor !== 'wait') btn.style.opacity = '0.85'; };
  btn.onmouseleave = () => { btn.style.opacity = '1'; };
  btn.onclick = async (e) => {
    e.preventDefault();
    if (btn.style.cursor === 'wait') return;
    // Maj+clic : reconfigurer (utile sur desktop ; sur iOS la config
    // se déclenche seule tant qu'elle est vide ou invalide)
    if (e.shiftKey) { promptConfig(); return; }
    if (!isConfigured()) {
      showNotif(MSG.notConfigured, '#d97706');
      const ok = await promptConfig();
      if (!ok) return;
    }
    // L'id peut n'être connu qu'après la recherche de repli : on le résout
    // au clic, en signalant explicitement l'échec plutôt que de ne rien faire.
    btn.textContent = MSG.loading;
    btn.style.opacity = '0.7';
    btn.style.cursor = 'wait';
    resolveMovie((tmdbId) => {
      if (!tmdbId) {
        setBtnState(btn, 'idle');
        showNotif(MSG.notFound, '#dc2626', btn.dataset.title || '');
        return;
      }
      requestMovie(tmdbId, btn);
    });
  };

  anchor.parentNode.insertBefore(btn, anchor.nextSibling);

  if (isConfigured()) {
    resolveMovie((tmdbId) => {
      if (tmdbId) checkInitialState(tmdbId, btn);
    });
  }
  return true;
}

async function init() {
  await loadConfig();
  if (addButton()) return;
  // Le bloc TMDB peut arriver après le premier rendu : on observe brièvement
  const obs = new MutationObserver(() => {
    if (addButton()) obs.disconnect();
  });
  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => {
    obs.disconnect();
    // Plus aucun point d'ancrage après 10 s : on trace en console plutôt que
    // d'abandonner sans laisser de trace. Pas de notification ici, elle
    // s'afficherait sans que l'utilisateur ait rien demandé.
    if (!document.getElementById('jls-btn')) {
      console.warn('[letterboxd-seerr] no anchor found on this page, button not inserted');
    }
  }, 10000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
