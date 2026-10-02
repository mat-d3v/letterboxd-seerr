# Letterboxd to Seerr — presentation video

Descriptive transcript (English). It contains everything that is said and everything important that is shown, so the video can be followed without sound or without the picture.

Duration: 2:10 · Narration: synthetic English voice · Background music and interface sounds only, no other speech. The titles shown ("Neon Harbor", "Paper Lanterns", "Midnight Ferry") are fictional examples.

## 0:01 — Introduction: the manual way

*On screen:* A browser shows a Letterboxd-style page for a fictional film, "Neon Harbor" (2024). The cursor clicks the heart (like) and gives the film five stars. A second tab opens on a Seerr server at 192.168.1.20:5055; the cursor types "Neon Harbor" in the search box, results appear, and the cursor clicks "Request" on the first poster, which turns into "Requested". The window shrinks while copies pile up behind it, under the large words "Every single time." The windows fly away and the question "What if it took one click?" appears word by word, "one click?" in orange.

**Narrator:** You've found the perfect film on Letterboxd. Now: open Seerr in a new tab, search for it, and request it. Every single time. What if it took one click?

## 0:13 — The userscript

*On screen:* A large orange "+ Seerr" button pops up. The cursor clicks it: it shows "Adding...", then turns green with a check mark, "✓ Seerr", and moves to the top of the screen. A card slides in: "Letterboxd → Seerr", repository letterboxd-seerr, version 2.2.0, for movies, with a mock Letterboxd row "107 mins, More at IMDB, TMDB" where an orange "+ Seerr" button pops in. Badges appear below: "Free", "Open source · MIT", "Userscript".

**Narrator:** Meet Letterboxd to Seerr: a free, open-source userscript that adds a Seerr button, right on Letterboxd.

## 0:20 — Where Seerr fits

*On screen:* A diagram titled "Where Seerr fits": "Your browser (+ Seerr button)" connects to "Seerr (request manager)", which leads to "Radarr (movies)" and then to "Your library (Plex · Jellyfin · Emby)". Glowing dots travel along the lines as each part is named.

**Narrator:** Seerr handles media requests for your home server, and hands movies over to Radarr.

## 0:27 — Chapter 1 · In action

*On screen:* Chapter label "01 In action". On the left, a browser shows the "Neon Harbor" film page; on the right, four key points appear one after the other: "Next to the TMDB link, on every film page"; "One click: ✓ No redirect, ✓ No search"; "Optional tag: pick one, or none, each time"; "Clear feedback: a notification with the title". The orange "+ Seerr" button appears next to the TMDB link and the view zooms in on it, with the TMDB link outlined. The cursor clicks the button, which reads "Adding...". A small window titled "Tag for this request" lists "No tag", "kids", "weekend" and "4k-fans"; the cursor picks "weekend". The button turns green ("✓ Seerr") and a green notification slides up in the bottom-right corner: "✅ Added to Seerr — Neon Harbor".

**Narrator:** On a Letterboxd film page, the button sits right next to the TMDB link. One click, and the request goes straight to Seerr. No redirect. No search. Using tags? Pick one, or none, for each request. A notification confirms it, with the film's title.

## 0:46 — Chapter 2 · Smart by default: button states

*On screen:* Chapter label "02 Smart by default". Title "Status at a glance — shown as soon as the page loads". Three large buttons, each with a written label: orange "+ Seerr", "Ready to request (one click sends it)"; green "✓ Seerr", "Already requested (no duplicates)"; blue "✓ Seerr", "In your library (ready to watch)". The cursor clicks the green button: it shakes and an amber notification says "⚠️ Already requested — Neon Harbor".

**Narrator:** The button shows the status as soon as the page loads. Orange: ready to request. Green: already requested. Blue: already in your library. Duplicates are checked before anything is sent.

## 1:00 — When the page has no TMDB link

*On screen:* Title "No TMDB link? No problem." Left: the film card "Neon Harbor, 2024", where the TMDB link is struck through with the note "No TMDB link on this page"; the "+ Seerr" button sits next to the title instead. Right: "Search on your Seerr, by title" with the query "Neon Harbor" and three results: Neon Harbor (1987), Neon Harbor (2024) and Neon Harbour (2019). The year "2024" flies from the film card to the matching result, which is highlighted in green with a "✓ Same year" badge.

**Narrator:** No TMDB link on the page? It searches Seerr by title, and picks the result from the right year.

## 1:08 — Chapter 3 · Built in: quality profile and updates

*On screen:* Chapter label "03 Built in". A window "Default quality profile" lists "Seerr default (no override)", "HD-1080p", "Ultra-HD" and "HD-720p"; the cursor picks "HD-1080p" and a notification says "✅ Profile saved". On the right, under "Every request uses it", three movie requests (Neon Harbor, Paper Lanterns, Midnight Ferry) each get an "HD-1080p" stamp. Next, a version chip changes from "letterboxd-seerr v2.1.0" to "v2.2.0" above a "Your settings" card (Seerr URL http://192.168.1.20:5055, hidden API key, quality profile HD-1080p) that stays unchanged; badges: "✓ Settings kept" and "Auto-updates from GitHub".

**Narrator:** Pick a default quality profile once, and every request uses it. Settings survive updates, and the script updates itself from GitHub.

## 1:18 — Seven languages

*On screen:* Title "Speaks your language — detected automatically from your browser". Seven green notifications, each labelled with its language: English "Added to Seerr", Français "Ajouté à Seerr", Deutsch "Zu Seerr hinzugefügt", Español "Añadido a Seerr", Italiano "Aggiunto a Seerr", Português "Adicionado ao Seerr", 日本語 (Japanese) "Seerrに追加しました". A chip "Browser language: fr-FR" appears and the French one is highlighted.

**Narrator:** Seven languages, detected from your browser.

## 1:22 — Works where you browse

*On screen:* Title "Works where you browse". A laptop, a tablet and a phone each show the film page with the orange "+ Seerr" button. Labels: "Chrome · Firefox · Safari, with Tampermonkey" under the laptop, with a "Userscript manager" badge on its toolbar; "iPhone & iPad, Safari + the Userscripts app" under the tablet and phone.

**Narrator:** Any browser with a userscript manager, even Safari on iPhone and iPad.

## 1:28 — Chapter 4 · Get started: requirement

*On screen:* Chapter label "04 Get started". Title "Reachable from your browser". A house outline contains "Your browser (at home)" linked by a green line, labelled "Home network", to "Seerr, 192.168.1.20:5055". Outside the house, "Your phone (away from home)" reaches the server through a dashed line with a padlock, labelled "VPN, e.g. Tailscale".

**Narrator:** Your Seerr just needs to be reachable from your browser: at home, or through a VPN like Tailscale.

## 1:36 — Setup in three steps

*On screen:* Title "Setup takes a minute" with a stopwatch icon. Three numbered cards: 1, "Install a userscript manager": Tampermonkey (Chrome · Firefox · Safari) and Userscripts (Safari on Mac, iPhone, iPad). 2, "Install the script": letterboxd-seerr.user.js, install link in the README, and an "Install" button that becomes "✓ Installed". 3, "Click + Seerr and enter your details": a dialog where "Seerr URL" receives http://192.168.1.20:5055 and "API key (Seerr → Settings → General)" receives a hidden key. Green check marks appear on the three cards. Below: "⇧ Shift + click + Seerr → Change settings".

**Narrator:** Setup takes a minute. Install a userscript manager, like Tampermonkey, or Userscripts. Install the script. Then click the button, and enter your Seerr URL and API key. That's it. Shift-click the button any time to change your settings.

## 1:53 — Outro

*On screen:* A card "Letterboxd → Seerr" (movies) with the link github.com/mat-d3v/letterboxd-seerr, which gets underlined. Badges: "Free", "Open source", "MIT License". A second card appears: "Sister project: IMDb → Seerr, github.com/mat-d3v/imdb-seerr". Finally the orange "+ Seerr" button is clicked once more and turns green, above the line "Made by mat-d3v · Free & open source". Fade to black.

**Narrator:** Letterboxd to Seerr. Free, open source, and MIT licensed. Find it on GitHub. And if you use IMDb too, try its sister project: IMDb to Seerr.

---

Project: https://github.com/mat-d3v/letterboxd-seerr · Sister project: https://github.com/mat-d3v/imdb-seerr
