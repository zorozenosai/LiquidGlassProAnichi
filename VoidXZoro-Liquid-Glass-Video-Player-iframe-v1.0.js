// ==UserScript==
// @name         VoidXZoro Liquid Glass for Video Player iframe
// @namespace    liquid-glass
// @version      1.0
// @description  8.10.161: Settings > Subtitle: the “thumbnails” row is gone from the Track list (it is the site’s seek-preview sprite track, not subtitles). Delay can now be typed (tap the number under “Delay”, type e.g. -15.4 or +2, press Done). Delay presets remodelled as slim capsules in two tidy rows (earlier / later), full width. 8.10.160: Audio-only .m4a is now a seekable progressive MP4 (moov first, real sample tables) instead of a fragmented file, so you can scrub/seek in Musicolet/VLC/any player. Audio blob is typed audio/mp4, which stops Android saving it as “name.m4a.mp4”. 8.10.159: Fixed the fake 13h15m21s length on audio/MP4 downloads. mux.js writes the “unknown duration” value 0xFFFFFFFF into the MP4 header (at 90 kHz that is exactly 13:15:21) and players like Musicolet trust it. The real length from the playlist is now written into mvhd/tkhd/mdhd/mehd. 8.10.158: Fix dead Video/Audio only / format pills — restored click+pointerup handlers (were missing so mobile taps did nothing). Bigger tap targets. 8.10.157: Dead-accurate audio/fMP4 timestamps — rewrite TS PTS and fMP4 tfdt from playlist durations (kills 10h+/13h fake lengths in Musicolet/VLC). 8.10.156: Audio language picker fixed (unique track ids, uri-based pref, live hls switch on tap). Audio only saves .m4a (AAC remux — no broken MP3 encode). 8.10.155: Fix mobile save — never open blob: tabs (Cannot Complete Request); deliver via Share sheet / Save picker / download attribute after OPFS stream. 8.10.154: Audio only download — Smart tab Video / Audio only toggle; saves selected HLS audio as .m4a/.ts (streamed on low-RAM). 8.10.153: Low-RAM mode for ≤4GB phones — stream each segment straight to disk/OPFS (never hold the whole movie), 1 download worker, no mux.js MP4 convert (that was crashing phones), A/V still merged into one .ts. Desktop keeps optional MP4 under ~400MB. 8.10.151: Audio track pick for Download + Settings→Audio (from HLS master EXT-X-MEDIA). Selected language is remuxed into one video file (not a separate audio). TS video+audio packets interleaved; optional MP4 via mux.js. Preference remembered. 8.10.150: Quality / settings reachability — stop leaving the site’s quality menu (Auto / 1080p) floating mid-video after a scan; dismiss it again. Settings sheet always sits just above the control bar (thumb zone) instead of drifting to the top of a tall player. 8.10.149: Audio tracks debug — Smart tab “Audio tracks (debug)” dumps every audio source the stream exposes (HTML audioTracks, hls.js audioTracks with id/lang/group/url/default/current, master playlist EXT-X-MEDIA AUDIO groups, separate audio playlists from detection, muted/volume). Audio fold now lists hls.js tracks too (not only video.audioTracks) and marks the active one. 8.10.148: Season download remade. One clean bottom sheet on the top page (collapses to a small pill that shows the overall %), a single determinate progress bar for the whole season, per-episode chips (done / current / failed), Stop, Copy log. The old Bulk section in Settings is gone. Fixed the download hanging on the last part (every segment request now has a timeout + retries, and a stalled episode restarts itself, 3 tries then skips). The player Settings sheet no longer pops open during AFK. 8.10.147: Bulk season download FIXED. The video player lives in a cross-origin iframe (/stream/…), which cannot read the top page’s localStorage, so it never saw the queue (log: video=none, no tryQueueAuto lines). Top page and player iframe now talk through postMessage (queue, status, debug, advance, navigate). The iframe no longer navigates itself to the episode page. 8.10.146: Bulk season is a full-screen floating panel on the TOP page (not stuck in the video iframe). Queue uses localStorage so parent + iframe share state. AFK: open ep → auto-download .ts+.srt → next. 8.10.145: Queue debug panel is a fixed-height scrollable textarea + Copy debug button (like Video info). Referrer fallback for watchBase/ep when iframe can’t read top. 8.10.144: Episode discovery uses top/parent page (video iframe is /stream/… without ep list). Fixes “Could not detect episodes” on anichi embeds. 8.10.143: Season queue debug log (Show queue debug) + watchdog every 15s + honest status (no fake “downloading”) + navigate when on wrong ep instead of silent skip. 8.10.142: Bulk season download always visible inside Smart tab (never hidden). Float panel removed on watch pages so it doesn’t block controls. Rescan ↻ + delayed detection. AFK queue uses Smart progress. 8.10.141: AFK season queue — auto-opens Smart tab, forces .ts + softcoded .srt, taps server if needed, names files “{Series from site} - [0N] - VOIDXZORO”. Fully hands-off. 8.10.140: Season list detects real episode count from the page + anichi episode API (no fixed/guessed totals). Shows “Detected N episodes”. 8.10.139: Season queue actually drives the same Download pipeline (retries stream detect, auto-play to attach HLS, opens Smart tab, shows Queue X/Y · Ep N progress). Cleaner panel design with done/current marks. 8.10.138: Season bulk download — from the anime/season page or watch page, pick episodes and queue them one-by-one (opens each ep, downloads video+.srt, advances). Anichi-style /ep-N lists supported. 8.10.137: Subtitle export uses ONLY the track you have selected (or Auto’s English dialogue) — no more Italian/hash dumps of every language. One clean VideoName.srt. 8.10.136: Smart download pills fixed for mobile — 2-column grid, short labels (.ts Original / MP4 Convert / + Subtitles / Video only), no mid-word wrap. 8.10.135: Subtitle download no longer uses CDN hash filenames — primary file is always VideoName.srt; status shows the real path in Downloads. Clearer messages so episode vs .srt is obvious. 8.10.134: Delay presets UI fixed (full-width grid under the slider, not a squeezed side column) and ±10 s chips added. 8.10.133: Subtitle Delay actually works now. Cues are cached from both the full track list and activeCues, then filtered by (currentTime − delay), so streams that only expose activeCues no longer ignore Delay. Changing a preset/slider forces an immediate refresh. Softcoded .srt export uses the same cache + delay. 8.10.132: Softcoded subtitles always (separate .srt next to the video, never burned in). Download can include or skip subtitles. Subtitle Delay now has quick presets (−5 / −2 / −1 / −0.5 / 0 / +0.5 / +1 / +2 / +5 s) so you can fix sync without fighting the slider. Exported .srt applies your current Delay so the file matches what you see on screen (e.g. Delay −10 → SRT times shifted −10 s). Timestamp rewrite is stricter: every segment is forced onto a continuous timeline from 0 using the playlist durations, so VLC / MX no longer show a 13-hour length or refuse to seek. 8.10.131: Download rebuilt after VLC / MX showed a 13-hour length and could not seek: the stream timestamps are now rewritten (start near 0, continuous, jumps between segments joined) and the file is saved as plain .ts by default (MP4 convert is optional). Subtitles are saved as .srt next to the video (also a separate Download subtitles button), file name can be edited, and the debug report now lists segment timestamps. 8.10.130: Download fixed for hosts that disguise video segments as images (junk bytes in front of each segment are cut off, so the file is a real video), a master playlist is preferred over a single stream, quality shown from the playing video, and very large videos skip the MP4 conversion to save memory. 8.10.129: Smart tab: Download video (plain files and HLS streams: parallel segments, retries, AES-128, MP4 conversion with .ts fallback, separate audio saved too) and Video info (debug) with a copyable report. Subtitles untouched. 8.10.128: Subtitle Delay reaches +/-2 minutes. The slider covers +/-30 s; the -/+ buttons step 0.1 s per tap and speed up while held (1 s, then 5 s steps) to reach the far end. 8.10.127: Subtitle Delay (Settings > Subtitle): shift subtitles and signs later (+) or earlier (-), with a slider, -/+ buttons and reset; saved between visits. 8.10.126: With only one subtitle track (no separate signs track) no line is ever treated as a sign any more: every line stays on the bottom strip, so dialogue can no longer jump to the right-centre sign overlay. Subtitle fetching is unchanged. 8.10.125: Dialogue lines with an apostrophe (Sasakibe's lightning) are no longer mistaken for sign cards: an apostrophe inside a word is not a quote mark. Plain sentences with is/are/was... also count as speech. 8.10.124: Seek toast: every back / forward step shows a chip on the left (backward) or right (forward) side of the video, adding up (+10s, +20s, +30s). 8.10.123: Fullscreen bar: clear space between the seek bar and the buttons (comfortable taps on Play/Pause), seek bar a bit higher, whole bar lifted a little more. 8.10.122: Fullscreen bar a tiny bit taller (extended upwards, more room above the seek bar) and lifted slightly higher off the bottom. 8.10.121: Fullscreen bar: seek bar a little lower, icons slightly bigger (about the size of the time text, a touch more). 8.10.120: Fullscreen bar restored to the original button order (back, play, forward, volume, subtitles, settings, fullscreen, lock) with the windowed bar button look, 50% of the player wide, equal gaps, no shaded press look. 8.10.113: Fullscreen icon group about 80% wider (pill-shaped slim buttons, roomier gaps, tighter on small players so it always fits). 8.10.112: Fullscreen bar remodel, still slim: bigger icons with real spacing, two groups (back / play / forward, then volume / subtitles / settings / fullscreen / lock) split by a hairline, play in a soft glass disc, slightly larger times. Bar thickness unchanged. 8.10.111: Seek-bar buffer shows only the unbroken run that starts at the playhead (old buffered islands from seeking around are no longer drawn); the number in Settings uses the same run. The extended fullscreen bar is slimmer: same bar thickness, thumb and text size as the windowed bar, just wider. 8.10.110: Settings info box "Buffered ahead" is now the truth: only the unbroken run of buffered video from the playhead (it used the end of the last buffered range, so after seeking it could say 380 s while the real buffer was a few seconds). Shown in s / m / h / d (45s, 2m 05s, 1h 04m). 8.10.109: Seek bar rebuilt. Played part is solid white (no blue fade). Intro / outro are solid blue and stay on the bar for the whole episode (they used to be hidden under the played fill and dropped when a source went quiet; now latched per episode). Buffered range is drawn in light grey-white. In fullscreen the control bar is extended: wider, thicker bar, bigger evenly spaced icons; windowed / portrait is unchanged. Settings info box shows where the intro / outro times came from. 8.10.108: Intro / outro now show on the seek bar as yellow segments (like the site's own player). Found from the site's own data (fetch, XHR and JSON.parse), chapter tracks, the site's coloured bar segment, or learned when its Skip button appears (remembered per episode). Debug overlay removed. A black-frame brightness read no longer sticks the glass at the wrong dimming. 8.10.106: Two-line subtitles fixed for real. The diagnostics showed the subtitle data was fine and the overlay built a <br>, but the site's own CSS was hiding it, so lines glued together. Line breaks are now real newline characters with white-space: pre-line (!important), which site CSS does not hide. 8.10.105: Subtitle diagnostics on the phone. Settings > the info box (Resolution / Bitrate ...) now also shows the raw text of the live subtitle with invisible characters written out, and what the overlay built from it. 8.10.104: Word-join fix, round 2: line breaks hidden as HTML entities, control characters, zero-width characters between words, or {\\N} blocks are now turned into real breaks / spaces. Set window.LGV_DEBUG_CUES = true in the console to log each raw cue. 8.10.103: Two fixes. (1) Subtitle words no longer glue together ("confinedQuincy"): <br>, block tags, literal \\N and Unicode line separators are now real line breaks instead of being stripped. (2) Glass stays readable on bright / white video: every glass surface darkens what is behind it (backdrop brightness), auto-adjusted from the live picture brightness, with a solid fallback when backdrop-filter is unavailable. Tune with --lgv-dim. 8.10.102: Fold value chips (Auto · eng-2 (signs) …) are full pills, not soft boxes — clearer gap between the TRACK / Quality heading and the summary. Section cards and option rows unchanged. 8.10.101: Selected rows (Track, Quality, Font, Audio) stay full capsules in every state — older 0.95em rules no longer win on .active. Auto-detected dialogue tracks now show (dialogue) in the Track list the same way signs show (signs); user-forced roles still underline. 8.10.100: Auto Detect hard-excludes AI when any usable non-AI track exists. Previously AI was only demoted in the sort key, so if eng-2 / eng-3 looked empty for a moment (cues still loading, or dialogue regex miss) AI could still win. Now: (1) first pass only non-AI, non-partial, non-Signs tracks; (2) among those prefer ones with real spoken lines; (3) AI is considered only when that pool has zero usable dialogue tracks. Cache also re-evaluates as soon as a non-AI track gains cues. Console still lists every candidate. 8.10.99: Selected rows keep their shape. In Settings the selected / Off track, font, quality and audio rows used to snap from a rounded capsule to a blocky box when selected (an older, more specific corner rule won). Every row now has the same capsule shape in every state, and pressing a row no longer shrinks it. One variable, --lgv-row-r, still sets the roundness (99em = capsule, 1.1em = softer box). 8.10.98: Auto Detect is now pure detection. Your Signs / Dialogue picks (made by holding a track) used to be saved on the site and silently overrode Auto on every visit, which is why the AI track kept being picked. They now live only for the current page and only count in a manual pick; tapping Auto Detect clears them. Holding a track and choosing Signs or Dialogue also ticks that track. Track rows now show (signs), (dialogue) for a forced one, and (AI) for AI tracks, so nothing is hidden. The browser console lists every track Auto looked at and why. 8.10.97: Auto Detect now prefers cleanly formatted tracks and treats AI tracks as a last resort. Order: spoken lines, English, NOT an AI track, cleanly formatted (plain text, no typesetting markup or shouting), not SDH, then more lines. An AI / machine track ("AI", "English (AI)", auto-generated) is used only when no other usable track exists. A separate signs track still goes to the right as before. With a long list of tracks the clean one wins. Subtitle fetching is unchanged. 8.10.96: Screenshot removed (button, menu, thumbnail and all its code are gone). Auto Detect now finds the AI track: a track called "AI" (or "English (AI)") counts as English and, when it has real dialogue and at least half the cues of the biggest track, is picked as the dialogue track, with the signs track (eng-2) on the right as before. Auto Detect and the Track list now share one picker, so ticks and "(signs)" tags always match what is on screen. A cleaner-formatted track wins ties. Subtitle fetching is unchanged. 8.10.95: Auto Detect is now a full reset. Tapping it clears every Signs / Dialogue pick you made by holding a track, so swapped tracks go straight back to what Auto detects. Subtitle fetching is unchanged. 8.10.94: Two fixes. (1) Signs and dialogue no longer overlap: when the signs box would sit on top of the dialogue box, the signs box slides up just clear of it (and drops back when the dialogue ends). (2) The Auto / Signs / Dialogue pill now opens right on the track you hold, not in the top-left corner (the track list refreshes while you hold, so the pill now finds the live row). Subtitle fetching is unchanged. 8.10.93: Dialogue now works both ways. A track you set to Dialogue shows every one of its lines on the bottom strip, even ones that look like sign cards (time, date, place, a bracketed block), which used to be dropped. So swapping the two tracks by hand works: the old signs track can be shown as dialogue, and the old dialogue track as signs. In Auto, a track you set to Dialogue is preferred as the dialogue track. 8.10.92: Signs, your way. Hold any subtitle track in Settings > Subtitle > Track and a tiny pill appears: Auto / Signs / Dialogue. A track you set to Signs always goes to the right-centre sign overlay (with the Sign Style, highlights and everything else the signs have), and Auto Detect stops using it as dialogue. Dialogue forces a track to stay dialogue. Your picks are remembered per site by track name. Also fixed: with subtitles Off, a sign card could stay stuck on screen; Off now clears it straight away (the Sign Style preview still shows). Tick only a Signs track to see signs without dialogue. 8.10.91: Screenshot rebuilt to actually work. The saved file is no longer revoked after 4 s (that could cancel the download on a slow phone; now 30 s). A cross-origin frame is detected up front and retried through a CORS copy of the video when the source allows it. Waits for a real frame. With Subtitles / With Everything now also paint the sign text (right-centre, in the chosen Sign Style) as well as the dialogue. A small thumbnail appears after each shot: tap it to Share (or Save again where sharing is not available), so a blocked download is never a dead end. 8.10.90: Settings polish pass. Cards get a lit rim (bright top-left, dim bottom-right) instead of a flat border. Labels, fold titles and inactive tabs are brighter so they read on bright scenes. The active tab is a lit glass chip. Sliders are a touch thicker with a ringed handle that grows when held. Reset Playback and the value chips match the capsule rows. Soft transitions on rows, tabs and buttons. 8.10.89: Dropdown option rows (1080p, Outline, Neon, Track, Font, Audio) are fully rounded capsules again, not squarer boxes. One variable, --lgv-row-r, sets the roundness (99em = full capsule, 1.1em = softer box). 8.10.88: The option rows inside the dropdowns (Quality 1080p / 720p, Track, Font, Style Outline / Neon / Glass / Clean, Audio) are lighter and slimmer: a faint see-through fill, no border, a hairline ring, tighter padding and a squarer corner. The selected row is a light blue fill with a blue ring. Tune with --lgv-row-a (0.05 = light, 0.09 = the old look). 8.10.87: Settings boxes are lighter. The section cards (sliders, Track, Font, Style, Sign Style, Audio, Quality) are a thin, flat, see-through plate: much less dark tint, no drop shadow, no gradient slab, a hairline edge. Option rows inside are a soft light fill with a thin ring, and the selected one a light blue fill with a blue ring. Two variables, --lgv-plate-dark and --lgv-plate-white, set the tint. 8.10.86: Glass boxes (subtitle and signs): a one-line box no longer ends in full half-circles. The corner radius is capped to about a third of the box height, so one-line boxes get squarer ends while taller boxes keep exactly the roundness they had. 8.10.85: The signs box in Glass is as light as the Glass subtitle, and the same --lgv-glass-a variable controls both. 8.10.84: Glass subtitle is far more see-through (tint about a third of before, fainter rim), with a stronger text shadow so the words stay readable. One variable, --lgv-glass-a, sets the tint. 8.10.83: The subtitle box (Glass look especially) is hidden whenever there is no line on screen, so no empty capsule is left behind after the dialogue ends. 8.10.82: Settings sections are rounded cards (sliders, Track, Font, Style, Sign Style, Audio, Quality, info), with option rows as boxes inside; all sizes in em. Glass subtitle no longer gets an empty line at the top: blank lines are dropped and the padding is even. 8.10.81: Quote rule restored — " / ' / 「」 alone no longer force a cue onto the bottom dialogue strip. Short non-speech quoted cards and title-card lines are ignored there and can surface on the signs overlay; real spoken dialogue is unchanged. 8.10.80: Fold value chip uses margin-left:auto (no ::after spacer) so title stays left and the compact chip sits right. 8.10.79: Fold headers no longer stretch an empty bar — the current-value chip (Clean / Glass / Ubuntu …) is compact on the right. 8.10.78: Fold headings (Style, Sign Style, Font, Track, …) are no longer the same capsule as the option rows — headers are quiet section labels; Outline/Neon/Glass/Clean and other picks stay as the filled rounded boxes. 8.10.77: Every on-screen Glass box (subtitle capsule + sign capsule) and every Settings row uses the same goated liquid-glass radius family (--lgv-r-box / --lgv-r-row). Glass style no longer needs the interactive class to show its frosted rounded box. 8.10.76: Subtitle Track list is now multi-select. Every row has a tick circle; tap a row to turn that track on or off, so you can show dialogue plus signs, two languages together, or switch the signs off. Tracks detected as signs are tagged "(signs)" on the right of the row (for example "Eng-2      (signs)"). Auto Detect is exactly as in 8.10.74; tapping a row while on Auto starts from what Auto picked. Subtitle fetching is unchanged. 8.10.74: Settings > Subtitle has two new fold lists, Style (normal subtitles) and Sign Style (sign / on-screen text), each with Outline, Neon, Glass and Clean. Your pick is remembered and shows a short sample. Screenshots follow the subtitle style. 8.10.73: Sign text is now the cyan #1CCEE6 accent, and there are four styles to choose from with LGV_SIGN_STYLE at the top (outline, neon, glass, clean). 8.10.72: Sign text redone: no box over the picture, dark outline painted under the letters, bolder italic headline, bracketed block grouped and smaller, key times and countdown figures highlighted. 8.10.71: Sign text is bold italic with a gold highlight, thick outline, soft fade and accent bar; bracketed lines are smaller and white. 8.10.70: Settings sheet 10% wider (height and font unchanged). 8.10.69: Settings tabs are full pills (same size). Sign text no longer shows grey boxes. 8.10.68: Sizes back to the original (8.10.64), in em, with one LGV_UI_SCALE knob at the top. Fullscreen locks to landscape for landscape video. 8.10.67: Sizes are em; Settings sheet smaller (16:9 card in fullscreen); sign overlay stays while its cue is live and re-shows on rewind, and also catches oddly-placed non-speech cues. 8.10.66: Remodel — shape and size only: larger rounder control bar and buttons, bigger readable Settings sheet, roomier rows, larger HUD/toast text. 8.10.65: Signs overlay only appears when another track is scored as a real signs track (label, cue count, speech vs sign-card pattern, positioning, timing vs dialogue); dialogue/SDH/other-language twins are rejected. 8.10.64: Dual-track Auto — dialogue track for bottom + separate signs track for right-centre when a real signs/forced track exists. 8.10.63: Sign meanings. 8.10.62: strict. 8.10.53: Scrubber first-load + no outer shadows + cleaner glass. 8.10.52: More transparent panels. 8.10.51: Strict sign overlay. 8.10.50: Lighter glass. 8.10.49: Subtitle defaults 1.0. 8.10.48: Quiet quality flush. 8.10.41: Clean liquid glass. The control bar, Settings sheet, screenshot menu, skip button, lock button, brightness/volume HUD, 2x badge and the small messages are all more see-through (lower opacity). The shine is fine detail instead of glare: a thin rim light (brighter top-left, softer bottom-right), a very soft top light, a faint inner glow and a soft shadow, with no wide gloss band. Blue accents keep a gentle glow. 8.10.40: Dialogue is back. Auto subtitles no longer pick a signs/songs-only track (those are heavily styled, so they used to win and only signs showed); dialogue tracks win, and signs-only tracks are used only if nothing else has cues. Subtitle fetching is unchanged. Settings are more compact: sliders are one line each, long lists (Subtitle Track, Font, Audio, Quality) fold behind a one-line header that shows the current choice, rows are tighter, and the portrait sheet is a little taller so tabs need less scrolling. 8.10.39: Quality is quick again. A quality read from the site's own menu is now switched by pressing that item directly (the way it used to work), instead of opening the site menu first; the pick starts at once (no 0.3 s wait), and checks poll 2x faster. Other routes are still tried after it if the picture does not change. 8.10.38: Settings sheet has a fixed size: 0.75 zoomed out (portrait / embedded) and 1.00 in fullscreen 16:9. The Settings Size slider is gone. Quality is back to the 8.10.34 engine (the 8.10.35 slow-load waiting is removed). Look from 8.10.37 is kept. 8.10.37: Settings look, second try, calmer and cleaner. No more glossy highlights or white glare (they looked bad over dark scenes): the sheet is a dark, clear glass with a thin edge, no boxes inside boxes, and every row (quality, subtitle tracks, fonts) is a rounded capsule with a thin blue ring when selected. Tabs are a flat capsule switcher, sliders are a thin line with a white fill and a round handle, buttons are capsules. The top and bottom edges of the scroll area still fade out.
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  // UI size knob: 1 = the original (8.10.64) sizes. 0.9 = 10% smaller, 1.1 = 10% bigger.
  // It scales the control bar, the Settings sheet and the small floating pieces together.
  const LGV_UI_SCALE = 1;
  // Default look for sign / on-screen text: 'outline', 'neon', 'glass' or 'clean'.
  // You can change both looks any time in Settings > Subtitle (Style / Sign Style).
  const LGV_SIGN_STYLE = 'outline';

  if (window.__lgv8917) return;
  window.__lgv8917 = true;

  const CONFIG = {
    hideDelay: 3600,
    seek: 10,
    targetBufferAhead: 75,
    scanEvery: 2200
  };

  // ======================================================================
  // 8.10.108: Intro / outro discovery.
  // Runs at document-start, so it can watch the page's own requests. Sites get intro/outro times
  // from an API (Aniskip-style {skipType, interval:{startTime,endTime}} or {intro:{start,end},
  // outro:{start,end}}) and often decrypt the payload with JSON.parse, so we look at fetch,
  // XHR and JSON.parse results. Nothing is changed on the page; we only read.
  // ======================================================================
  const SKIPSEGS = [];                       // { kind: 'intro'|'outro', start, end, src, at }
  const SKIP_HINT = /intro|outro|opening|ending|skipType|skip_?times?|recap|credits|"op"|"ed"/i;
  const _jsonParse = JSON.parse;
  let _hrefSeen = location.href, _hrefAt = Date.now() - 1;
  function skipKindOf(label) {
    const l = String(label || '');
    if (/outro|ending|(^|[^a-z])ed([^a-z]|$)|credits|preview|epilogue|mixed-?ed/i.test(l)) return 'outro';
    if (/intro|opening|(^|[^a-z])op([^a-z]|$)|recap|prologue|mixed-?op/i.test(l)) return 'intro';
    return '';
  }
  function pushSkip(kind, start, end, src) {
    if (!kind || !(start >= 0) || !(end > start)) return;
    const at = Date.now();
    for (const s of SKIPSEGS) if (s.kind === kind && s.start === start && s.end === end) { s.at = at; return; }
    SKIPSEGS.push({ kind, start, end, src, at });
    if (SKIPSEGS.length > 60) SKIPSEGS.shift();
  }
  function scanSkips(node, src, keyHint, depth) {
    if (!node || typeof node !== 'object' || depth > 8) return;
    if (Array.isArray(node)) {
      if (node.length === 2 && typeof node[0] === 'number' && typeof node[1] === 'number') {
        pushSkip(skipKindOf(keyHint), node[0], node[1], src);
        return;
      }
      if (node.length > 400) return;
      for (const n of node) scanSkips(n, src, keyHint, depth + 1);
      return;
    }
    const iv = (node.interval && typeof node.interval === 'object') ? node.interval : node;
    const num = (...ks) => {
      for (const k of ks) {
        const x = iv[k];
        if (typeof x === 'number' && isFinite(x)) return x;
        if (typeof x === 'string' && /^\d+(\.\d+)?$/.test(x)) return parseFloat(x);
      }
      return null;
    };
    const s = num('start', 'startTime', 'start_time', 'begin', 'from');
    const e = num('end', 'endTime', 'end_time', 'to', 'stop');
    if (s != null && e != null && e > s) {
      const kind = skipKindOf(node.skipType || node.type || node.label || node.name || node.title || node.kind || keyHint);
      if (kind) pushSkip(kind, s, e, src);
    }
    for (const k of Object.keys(node)) {
      const v = node[k];
      if (v && typeof v === 'object') scanSkips(v, src, k, depth + 1);
    }
  }
  const MEDIA_URL_RE = /\.(ts|m4s|mp4|m3u8|vtt|srt|ass|jpe?g|png|webp|gif|woff2?|css|js|svg|mp3|aac|ico)(\?|#|$)/i;
  function scanSkipText(t, src) {
    if (typeof t !== 'string' || t.length > 1500000 || !/^\s*[\[{]/.test(t) || !SKIP_HINT.test(t)) return;
    try { scanSkips(_jsonParse.call(JSON, t), src, '', 0); } catch (e) {}
  }
  try {
    JSON.parse = function (text) {
      const v = _jsonParse.apply(this, arguments);
      try { if (typeof text === 'string' && text.length < 600000 && SKIP_HINT.test(text)) scanSkips(v, 'json', '', 0); } catch (e) {}
      return v;
    };
  } catch (e) {}
  try {
    const _fetch = window.fetch;
    if (typeof _fetch === 'function') {
      window.fetch = function () {
        const p = _fetch.apply(this, arguments);
        try {
          p.then(r => {
            try {
              if (!r || MEDIA_URL_RE.test(r.url || '')) return;
              const ct = (r.headers && r.headers.get('content-type')) || '';
              if (ct && !/json|text|javascript/i.test(ct)) return;
              if ((+(r.headers.get('content-length')) || 0) > 1500000) return;
              r.clone().text().then(t => scanSkipText(t, 'fetch')).catch(() => {});
            } catch (e) {}
          }).catch(() => {});
        } catch (e) {}
        return p;
      };
    }
  } catch (e) {}
  try {
    const xo = XMLHttpRequest.prototype.open, xs = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (m, u) { try { this.__lgvU = String(u || ''); } catch (e) {} return xo.apply(this, arguments); };
    XMLHttpRequest.prototype.send = function () {
      try {
        this.addEventListener('load', () => {
          try {
            if (MEDIA_URL_RE.test(this.__lgvU || '')) return;
            if (this.responseType && this.responseType !== 'text') return;
            scanSkipText(this.responseText, 'xhr');
          } catch (e) {}
        });
      } catch (e) {}
      return xs.apply(this, arguments);
    };
  } catch (e) {}
  // Segments found for the page that is open now, as seconds clamped to the video length.
  function netSkipSegs(dur) {
    if (location.href !== _hrefSeen) { _hrefSeen = location.href; _hrefAt = Date.now(); }
    const out = [];
    ['intro', 'outro'].forEach(kind => {
      const mine = SKIPSEGS.filter(s => s.kind === kind && s.at >= _hrefAt - 4000);
      if (!mine.length) return;
      const top = Math.max.apply(null, mine.map(s => s.at));
      mine.filter(s => s.at >= top - 1500).forEach(s => {
        let a = s.start, b = s.end;
        if (b > dur * 3) { a /= 1000; b /= 1000; }          // milliseconds
        if (b > dur + 2 || b - a < 3 || b - a > dur * 0.5) return;
        out.push({ kind, start: a, end: Math.min(b, dur), src: 'net' });
      });
    });
    return out;
  }

  // UI + subtitle fonts (no mono / display / serif clutter). Each option
  // renders its own name in that face. Ubuntu stays the default.
  const FONT_OPTIONS = [
    { id: 'ubuntu', label: 'Ubuntu', stack: '"Ubuntu", system-ui, sans-serif' },
    { id: 'inter', label: 'Inter', stack: '"Inter", system-ui, sans-serif' },
    { id: 'roboto', label: 'Roboto', stack: '"Roboto", system-ui, sans-serif' },
    { id: 'opensans', label: 'Open Sans', stack: '"Open Sans", system-ui, sans-serif' },
    { id: 'nunito', label: 'Nunito', stack: '"Nunito", system-ui, sans-serif' },
    { id: 'poppins', label: 'Poppins', stack: '"Poppins", system-ui, sans-serif' },
    { id: 'lato', label: 'Lato', stack: '"Lato", system-ui, sans-serif' },
    { id: 'sourcesans', label: 'Source Sans', stack: '"Source Sans 3", system-ui, sans-serif' },
    { id: 'notosans', label: 'Noto Sans', stack: '"Noto Sans", system-ui, sans-serif' },
    { id: 'outfit', label: 'Outfit', stack: '"Outfit", system-ui, sans-serif' }
  ];
  const FONT_DEFAULT = 'ubuntu';
  // Look presets, used twice: one for normal subtitles, one for sign / on-screen text.
  const STYLE_PRESETS = [
    { id: 'outline', label: 'Outline', hint: 'Classic' },
    { id: 'neon',    label: 'Neon',    hint: 'Cyan glow' },
    { id: 'glass',   label: 'Glass',   hint: 'Frosted' },
    { id: 'clean',   label: 'Clean',   hint: 'Crisp' }
  ];
  const SUB_STYLE_DEFAULT = 'outline';
  const SIGN_STYLE_DEFAULT = STYLE_PRESETS.some(p => p.id === LGV_SIGN_STYLE) ? LGV_SIGN_STYLE : 'outline';

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&family=Inter:wght@500;600;700&family=Roboto:wght@500;700&family=Open+Sans:wght@500;600;700&family=Nunito:wght@600;700&family=Poppins:wght@500;600;700&family=Lato:wght@400;700&family=Source+Sans+3:wght@500;600;700&family=Noto+Sans:wght@500;600;700&family=Outfit:wght@500;600;700&display=swap');

    video::-webkit-media-controls,
    video::-webkit-media-controls-enclosure,
    .vjs-control-bar, .vjs-big-play-button,
    .ytp-chrome-bottom, .ytp-chrome-top,
    .jw-controls, .plyr__controls,
    [class*="control-bar"], [class*="player-controls"], [class*="big-play"] {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      height: 0 !important;
    }
    video { outline: none !important; }

    .vjs-text-track-display,
    .ytp-caption-window-container,
    .plyr__captions,
    .jw-text-track-container,
    .shaka-text-container,
    .dplayer-subtitle,
    .art-subtitle,
    .vds-captions,
    .hls-subtitle {
      opacity: 0 !important;
      visibility: hidden !important;
    }

    /* Belt-and-suspenders: force off the browser's own built-in caption
       rendering box on every video we might attach to, regardless of what
       sets a TextTrack's mode to "showing" (ours, the site's own player, or
       the browser itself) — this is what was leaking a second, unstyled
       copy of the real player's subtitles behind our own overlay. */
    video::-webkit-media-text-track-display,
    video::-webkit-media-text-track-container {
      display: none !important;
      opacity: 0 !important;
    }
    video::cue {
      opacity: 0 !important;
    }

    .lgv-subs {
      position: absolute;
      left: 0; right: 0;
      z-index: 2147483645;
      pointer-events: none;
      text-align: center;
      padding: 0 4%;
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
      font-weight: 700;
      color: #fff;
      line-height: 1.32;
      white-space: pre-wrap;
      transition: bottom 0.40s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: bottom;
    }

    /* Inner wrapper around the actual cue text. Sized to hug the text
       (inline-block, not the full-width strip .lgv-subs spans) and only
       made touchable when it actually has text in it (see setSubsText) --
       that's what keeps the two-finger resize/reposition gesture scoped to
       "the subtitle, when a line is on screen" and nothing else: a pinch
       anywhere else on the video never reaches this element, and a pinch
       during a silent gap has no interactive target to land on at all. */
    .lgv-subs-text {
      display: inline-block;
      pointer-events: none;
      touch-action: none;
      /* Keep long single-line dialogue from stretching edge-to-edge (which
         is what let it run under the Skip button on the right). Capping
         the width forces an early wrap onto a second/third line well
         before it reaches either side, instead of one very long line. */
      max-width: 76%;
    }
    .lgv-subs-text.lgv-subs-interactive {
      pointer-events: auto;
    }

    .lgv-root {
      --lgv-tick: #7dd3fc;   /* accent for the in-use subtitle tick */
      --lgv-dim: 0.62;      /* 8.10.103: backdrop-filter brightness() behind every glass surface; auto-lowered on bright video */
      --lgv-glass-a: 0.15;   /* tint strength of the Glass subtitle and the Glass signs box (was about 0.5) */
      --lgv-tick-soft: rgba(125,211,252,0.16);
      position: absolute;
      inset: 0;
      z-index: 2147483646;
      pointer-events: none;
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .lgv-root,
    .lgv-root .lgv-panel,
    .lgv-root .lgv-settings,
    .lgv-root .lgv-subs,
    .lgv-root .lgv-skip,
    .lgv-root .lgv-unlock,
    .lgv-root .lgv-side-hud,
    .lgv-root .lgv-hold-ring {
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
    }

    .lgv-panel {
      position: absolute;
      left: 50%;
      bottom: 2.4%;
      transform: translateX(-50%) translateY(8px) scale(0.97);
      z-index: 3;
      width: fit-content;
      max-width: 96%;
      box-sizing: border-box;
      padding: 0.45em 0.85em 0.6em;
      background:
        linear-gradient(rgba(255,255,255,0.16), rgba(255,255,255,0) 46%),
        rgba(24,24,28,0.38);
      backdrop-filter: blur(30px) saturate(165%);
      -webkit-backdrop-filter: blur(30px) saturate(165%);
      border-radius: 1.05em;
      border: 1px solid rgba(255,255,255,0.22);
      box-shadow: 0 0.6em 2em rgba(0,0,0,0.22), 0 0.05em 0.2em rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
      opacity: 0;
      transition: opacity 0.22s ease, transform 0.22s ease, font-size 0.18s ease;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 0.25em;
      /* Fallback for engines without container query units: scale off the
         viewport so the bar is compact for a small embedded player and
         noticeably bigger/wider once the page (or fullscreen) is actually
         wide. Overridden below by the cqw-based rule, which tracks the
         player's own box instead of the page. */
      font-size: clamp(11px, 2.6vw, 22px);
    }
    .lgv-root.show .lgv-panel {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
      pointer-events: auto;
    }

    .lgv-timeline {
      position: relative;
      height: 0.95em;
      display: flex;
      align-items: center;
      cursor: pointer;
      touch-action: none;
    }
    .lgv-timeline::before {
      content: '';
      position: absolute;
      left: 0; right: 0;
      top: -0.8em; bottom: -0.8em;
    }
    .lgv-bar {
      width: 100%;
      height: 0.18em;
      background: rgba(255,255,255,0.16);
      border-radius: 99px;
      position: relative;
      transition: height 0.14s ease;
    }
    /* 8.10.109: buffered ranges, a light grey-white between the dim track and the bright played fill */
    .lgv-buf {
      position: absolute;
      top: 0; bottom: 0;
      left: 0; width: 0%;
      background: rgba(255,255,255,0.46);
      border-radius: 99px;
      z-index: 1;
      pointer-events: none;
    }
    .lgv-skip-mark {
      position: absolute;
      top: 0; bottom: 0;
      left: 0; width: 0%;
      background: #3b9eff;
      border-radius: 0.12em;
      opacity: 0;
      transition: opacity 0.28s ease;
      z-index: 3;
      pointer-events: none;
    }
    /* 8.10.109: intro / outro = one constant blue, drawn ABOVE the played fill so it never disappears once played */
    .lgv-skip-mark.lgv-skip-seg {
      background: #3b9eff;
      min-width: 2px;
      box-shadow: 0 0 0.4em rgba(59,158,255,0.55);
    }
    .lgv-skip-mark.lgv-skip-seg.show { opacity: 1; }
    .lgv-fill {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 0%;
      background: #fff;
      border-radius: 99px;
      z-index: 2;
    }
    .lgv-thumb {
      position: absolute;
      top: 50%;
      width: 0.68em;
      height: 0.68em;
      background: #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
      transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.25s ease;
      pointer-events: none;
      box-shadow: 0 0 0 0.15em rgba(255,255,255,0.18), 0 1px 4px rgba(0,0,0,0.3);
      opacity: 1;
      z-index: 4;
    }
    .lgv-thumb.lgv-dot-hidden { opacity: 0; }
    .lgv-root.scrubbing .lgv-thumb {
      transform: translate(-50%, -50%) scale(1.35);
      box-shadow: 0 0 0 0.24em rgba(255,255,255,0.24), 0 1px 5px rgba(0,0,0,0.32);
      opacity: 1 !important;
    }

    .lgv-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35em;
    }
    .lgv-time {
      font-size: 0.65em;
      font-weight: 600;
      color: rgba(255,255,255,0.93);
      min-width: 2.4em;
      text-align: center;
      cursor: pointer;
      flex-shrink: 0;
    }
    .lgv-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.06em;
    }
    .lgv-btn {
      width: 1.65em;
      height: 1.65em;
      flex-shrink: 0;
      border: none;
      background: transparent;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    /* No shaded circle / pill when a button is pressed (it stuck after a tap on phones). */
    .lgv-btn { outline: none; -webkit-tap-highlight-color: transparent; }
    .lgv-btn:focus, .lgv-btn:focus-visible { outline: none; box-shadow: none; }
    .lgv-btn:active { transform: scale(0.9); background: transparent; }
    .lgv-btn svg {
      width: 0.85em;
      height: 0.85em;
      fill: currentColor;
    }
    .lgv-btn.cc-on::after {
      content: '';
      position: absolute;
      bottom: 0.14em;
      left: 50%;
      transform: translateX(-50%);
      width: 0.6em;
      height: 0.1em;
      background: #7dd3fc;
      border-radius: 2px;
    }

    .lgv-zone {
      position: absolute;
      top: 0;
      bottom: 15%;
      width: 40%;
      z-index: 2;
      pointer-events: auto;
    }
    .lgv-zone-l { left: 0; }
    .lgv-zone-r { right: 0; }
    /* Middle strip between the two seek zones: a double tap here toggles
       play/pause (a single tap does nothing, same as zoneL/zoneR).
       Percentage-based like the other zones, so it tracks the player's
       own box (and therefore stays centered on the visible frame whether
       the video is zoomed in or out) rather than being pinned to fixed
       pixels. */
    .lgv-zone-c { left: 40%; width: 20%; }
    .lgv-zone-l, .lgv-zone-r { touch-action: none; }

    /* Compact MX-style brightness/volume HUD — sized to the player box
       (cqw / em), not the screen. Appears on the OPPOSITE side of the swipe
       so your finger never covers the indicator. */
    .lgv-side-hud {
      position: absolute;
      top: 50%;
      z-index: 2147483645;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.28em;
      padding: 0.4em 0.38em 0.45em;
      /* Tiny — scales purely off the player box (cqw), no pixel anchor. */
      font-size: 2.2cqw;
      width: auto;
      min-width: 0;
      border-radius: 1.1em;
      background:
        linear-gradient(165deg, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 55%, transparent 85%),
        rgba(18, 20, 26, 0.58);
      backdrop-filter: blur(18px) saturate(150%);
      -webkit-backdrop-filter: blur(18px) saturate(150%);
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 0.25em 0.9em rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.16);
      opacity: 0;
      pointer-events: none;
      color: #fff;
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
      transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.22, 1, 0.36, 1);
    }
    /* Hold-for-2x badge. The wrapper's font-size tracks the player box
       (cqw, same as the side HUD), and everything inside is in em of that,
       so it scales with zoom and screen size instead of fixed pixels. */
    .lgv-speed-wrap {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: 2147483645;
      display: flex;
      justify-content: center;
      padding-top: 2.4em;
      font-size: 2vw;
      font-size: 1.4cqw;
      pointer-events: none;
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
    }
    .lgv-speed-badge {
      padding: 0.3em 0.85em;
      border-radius: 999em;
      font-size: 1em;
      line-height: 1;
      white-space: nowrap;
      font-weight: 600;
      letter-spacing: 0.03em;
      color: rgba(255,255,255,0.95);
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(8px) saturate(140%);
      -webkit-backdrop-filter: blur(8px) saturate(140%);
      border: 1px solid rgba(255,255,255,0.22);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 0.1em 0.4em rgba(0,0,0,0.18);
      text-shadow: 0 0.05em 0.2em rgba(0,0,0,0.35);
      opacity: 0;
      transform: translateY(-0.3em);
      transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .lgv-speed-badge.show { opacity: 1; transform: translateY(0); }
    .lgv-root.lgv-locked .lgv-speed-wrap { display: none; }
    .lgv-zone { -webkit-touch-callout: none; user-select: none; -webkit-user-select: none; }

    /* Swipe left (brightness) → HUD on the right */
    .lgv-side-hud.side-right {
      left: auto;
      right: 3.5%;
      transform: translateY(-50%) translateX(6px) scale(0.94);
    }
    .lgv-side-hud.side-right.show {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
    /* Swipe right (volume) → HUD on the left */
    .lgv-side-hud.side-left {
      right: auto;
      left: 3.5%;
      transform: translateY(-50%) translateX(-6px) scale(0.94);
    }
    .lgv-side-hud.side-left.show {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
    .lgv-side-hud-icon {
      width: 1.15em;
      height: 1.15em;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .lgv-side-hud-icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
      opacity: 0.95;
    }
    .lgv-side-hud-icon.bright svg {
      overflow: visible;
    }
    .lgv-sun-core {
      transform-origin: 12px 12px;
      animation: lgv-sun-glow 1.15s ease-in-out infinite;
    }
    .lgv-sun-rays {
      transform-origin: 12px 12px;
      animation: lgv-sun-rays 2.4s ease-in-out infinite;
    }
    @keyframes lgv-sun-glow {
      0%, 100% { opacity: 0.92; }
      50% { opacity: 1; }
    }
    @keyframes lgv-sun-rays {
      0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.88; }
      50% { transform: rotate(8deg) scale(1.08); opacity: 1; }
    }
    .lgv-side-hud-bar {
      position: relative;
      width: 0.28em;
      height: 3.4em;
      border-radius: 1.1em;
      background: rgba(255,255,255,0.16);
      overflow: hidden;
      flex-shrink: 0;
    }
    .lgv-side-hud-fill {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 50%;
      border-radius: 99px;
      background: linear-gradient(180deg, #c8efff, #7dd3fc 50%, #38bdf8);
      box-shadow: 0 0 6px rgba(125,211,252,0.4);
      transition: height 0.04s linear;
    }
    .lgv-side-hud-val {
      font-size: 0.72em;
      font-weight: 700;
      /* Tabular numerals + a fixed em width (sized for the widest case,
         "100%") instead of min-width — previously this only had a
         min-width, so once the reading crossed from 2 digits (99%) to 3
         (100%) the text's natural width exceeded that minimum and the
         whole HUD pill visibly grew to fit it. A fixed width, wide enough
         for 100% up front, means every reading from 0% to 100% renders at
         the exact same box size — nothing resizes as the number changes. */
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      color: rgba(255,255,255,0.92);
      line-height: 1;
      text-align: center;
      width: 2.6em;
      flex-shrink: 0;
    }
    @supports not (font-size: 1cqw) {
      .lgv-side-hud { font-size: 2.4vw; }
    }

    .lgv-skip {
      position: absolute;
      right: 2.5%;
      /* Fallback only — updateSubsGap() overrides this inline with a value
         computed from the control panel's real rendered height, so the
         two never collide regardless of screen size/orientation. */
      bottom: 14%;
      z-index: 4;
      font: inherit;
      font-size: 0.74em;
      font-weight: 700;
      color: #fff;
      padding: 0.45em 0.85em;
      border: 1px solid rgba(255,255,255,0.22);
      border-radius: 0.65em;
      background:
        linear-gradient(rgba(255,255,255,0.16), rgba(255,255,255,0) 48%),
        rgba(26,26,30,0.32);
      backdrop-filter: blur(22px) saturate(165%);
      -webkit-backdrop-filter: blur(22px) saturate(165%);
      box-shadow: 0 0.35em 1.1em rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22);
      opacity: 0;
      transform: translateY(6px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.18s ease, transform 0.18s ease;
      cursor: pointer;
      white-space: nowrap;
    }
    .lgv-skip.show {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* 8.10.124: seek toast. Every back / forward step (buttons or double tap) shows a glass chip on that side
       of the video: backward on the left, forward on the right. Repeated steps add up: +10s, +20s, +30s ... */
    .lgv-seekfx {
      position: absolute;
      top: 50%;
      z-index: 5;
      display: flex;
      align-items: center;
      gap: 0.35em;
      font-size: calc(4.2 * 1cqh);
      font-weight: 700;
      color: #fff;
      padding: 0.4em 0.8em;
      border-radius: 999px;
      background:
        linear-gradient(rgba(255,255,255,0.16), rgba(255,255,255,0) 48%),
        rgba(26,26,30,0.34);
      backdrop-filter: blur(22px) saturate(165%);
      -webkit-backdrop-filter: blur(22px) saturate(165%);
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 0.3em 1em rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2);
      opacity: 0;
      transform: translateY(-50%) scale(0.92);
      transition: opacity 0.16s ease, transform 0.16s ease;
      pointer-events: none;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .lgv-seekfx.lgv-seekfx-l { left: 9%; }
    .lgv-seekfx.lgv-seekfx-r { right: 9%; }
    .lgv-seekfx.show { opacity: 1; transform: translateY(-50%) scale(1); }
    .lgv-seekfx svg { width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }

    /* 8.10.127: Smart tab download + debug */
    .lgv-dl { margin-top: 0.7em; display: flex; flex-direction: column; gap: 0.5em; }
    .lgv-dl [hidden] { display: none !important; }
    .lgv-dl-opts { display: flex; flex-direction: column; gap: 0.35em; }
    .lgv-dl-opt {
      font: inherit; font-size: 0.8em; font-weight: 600; text-align: left; color: #fff;
      padding: 0.55em 0.9em; border-radius: 99em; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.07);
      -webkit-tap-highlight-color: transparent;
    }
    .lgv-dl-opt.cur { border-color: rgba(125,211,252,0.7); background: rgba(125,211,252,0.16); }
    .lgv-dl-name {
      font: inherit; font-size: 0.78em; color: #fff; padding: 0.5em 0.9em; border-radius: 99em; box-sizing: border-box; width: 100%;
      border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.07); outline: none;
    }
    .lgv-dl-fmt {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0.4em; width: 100%;
    }
    .lgv-dl-pill {
      font: inherit; font-size: 0.7em; font-weight: 600; color: #fff;
      padding: 0.7em 0.4em; border-radius: 0.85em; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06);
      text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      line-height: 1.2; min-width: 0; width: 100%; box-sizing: border-box;
      min-height: 2.4em;
      position: relative; z-index: 2;
      touch-action: manipulation;
      -webkit-user-select: none; user-select: none;
      -webkit-tap-highlight-color: rgba(125,211,252,0.35);
      pointer-events: auto;
    }
    .lgv-dl-fmt { position: relative; z-index: 2; pointer-events: auto; }
    .lgv-dl-pill.cur { border-color: rgba(125,211,252,0.75); background: rgba(125,211,252,0.2); }
    .lgv-dl-status { font-size: 0.72em; line-height: 1.45; color: rgba(255,255,255,0.88); word-break: break-word; white-space: pre-line; }
    .lgv-dl-bar { height: 0.4em; border-radius: 99em; background: rgba(255,255,255,0.14); overflow: hidden; }
    .lgv-dl-fill { height: 100%; width: 0; background: #7dd3fc; transition: width 0.25s ease; }
    .lgv-dl-dbg {
      width: 100%; height: 11em; box-sizing: border-box; resize: none; font-size: 0.6em; line-height: 1.35;
      color: #d7e6f2; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.14);
      border-radius: 0.9em; padding: 0.6em 0.7em; font-family: ui-monospace, Menlo, Consolas, monospace;
    }
    /* 8.10.161: Delay card = one line (label, typeable value, reset), the slider full width
       under it, then the presets as two rows of capsules (earlier / later). */
    .lgv-root .lgv-ctl.lgv-ctl-delay { flex-wrap: wrap; align-items: center; gap: 0.5em 0.5em; }
    .lgv-root .lgv-delay-head { flex: 0 0 100%; min-width: 0; display: flex; align-items: center; gap: 0.4em; }
    .lgv-root .lgv-delay-head .lgv-label { margin: 0 auto 0 0; white-space: nowrap; }
    .lgv-root .lgv-delay-field {
      display: inline-flex; align-items: baseline; gap: 0.15em; flex: 0 0 auto;
      padding: 0.22em 0.7em 0.22em 0.5em; border-radius: 99em; font-size: 0.74em;
      background: rgba(255,255,255,0.08); box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.14);
      transition: background 0.16s ease, box-shadow 0.16s ease;
    }
    .lgv-root .lgv-delay-field:focus-within {
      background: rgba(125,211,252,0.16); box-shadow: inset 0 0 0 0.07em rgba(125,211,252,0.75);
    }
    .lgv-root .lgv-delay-input {
      font: inherit; font-weight: 700; font-variant-numeric: tabular-nums; color: rgba(190,234,255,1);
      width: 3.9em; min-width: 0; padding: 0; margin: 0; border: 0; border-radius: 0; outline: none;
      background: transparent; box-shadow: none; text-align: right;
      -webkit-appearance: none; appearance: none;
      -webkit-user-select: text; user-select: text; pointer-events: auto;
    }
    .lgv-root .lgv-delay-input::placeholder { color: rgba(190,234,255,0.5); opacity: 1; }
    .lgv-root .lgv-delay-unit { color: rgba(190,234,255,0.7); font-weight: 600; }
    .lgv-root .lgv-ctl.lgv-ctl-delay > .lgv-slider-row { flex: 0 0 100%; }
    .lgv-root .lgv-delay-presets {
      flex: 0 0 100%; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.35em 0.4em;
    }
    .lgv-root .lgv-delay-chip {
      font: inherit; font-size: 0.74em; font-weight: 650; font-variant-numeric: tabular-nums;
      color: rgba(255,255,255,0.9); text-align: center; white-space: nowrap; line-height: 1.2;
      padding: 0.5em 0; border: 0; border-radius: 99em; cursor: pointer;
      background: rgba(255,255,255,0.08); box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.12);
      transition: background 0.16s ease, box-shadow 0.16s ease, transform 0.1s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .lgv-root .lgv-delay-chip.cur {
      color: #fff; background: rgba(125,211,252,0.24); box-shadow: inset 0 0 0 0.07em rgba(125,211,252,0.8);
    }
    .lgv-root .lgv-delay-chip:active { transform: scale(0.95); background: rgba(125,211,252,0.3); }

    /* ---- Player lock ----
       Lock button lives in the control bar (same size family as the other
       .lgv-btn icons, so it scales with the panel's em-based font-size /
       container-query width). When locked, everything interactive is
       disabled via .lgv-locked on the root; only the unlock chip on the
       right edge stays clickable. */
    .lgv-root.lgv-locked .lgv-panel,
    .lgv-root.lgv-locked .lgv-zone,
    .lgv-root.lgv-locked .lgv-skip,
    .lgv-root.lgv-locked .lgv-settings,
    .lgv-root.lgv-locked .lgv-subs-text,
    .lgv-root.lgv-locked .lgv-side-hud {
      pointer-events: none !important;
    }
    .lgv-root.lgv-locked .lgv-side-hud { opacity: 0 !important; }
    .lgv-lock-catch {
      display: none;
      position: absolute;
      inset: 0;
      z-index: 2147483644;
      background: transparent;
      /* Without this, a double-tap here falls through to the browser's
         own default double-tap-to-zoom gesture (no JS listener on this
         div calls preventDefault for it) — on a fixed/absolute-positioned
         player that shows up as a jarring zoomed-in black/letterboxed
         flash instead of anything the player itself is doing. */
      touch-action: none;
    }
    .lgv-root.lgv-locked .lgv-lock-catch {
      display: block;
      pointer-events: auto;
    }
    .lgv-root.lgv-locked .lgv-panel {
      opacity: 0 !important;
      transform: translateX(-50%) translateY(8px) scale(0.97) !important;
    }
    .lgv-root.lgv-locked .lgv-settings.open {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* Compact icon-only unlock — circular liquid-glass, auto-hides while
       locked (shown briefly on lock / on any touch, then fades out). */
    /* Unlock wrap — chip + hold ring share one anchor on the right edge */
    .lgv-unlock-wrap {
      position: absolute;
      right: 1.4%;
      top: 50%;
      transform: translateY(-50%) translateX(6px) scale(0.92);
      z-index: 2147483647;
      width: clamp(38px, 7.2cqw, 48px);
      height: clamp(38px, 7.2cqw, 48px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.26s ease, transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .lgv-root.lgv-locked .lgv-unlock-wrap.lgv-unlock-show {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
      pointer-events: auto;
    }
    .lgv-unlock {
      position: relative;
      z-index: 2;
      width: 68%;
      height: 68%;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,0.26);
      border-radius: 50%;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 48%, rgba(255,255,255,0) 75%),
        rgba(24, 26, 32, 0.40);
      backdrop-filter: blur(22px) saturate(165%);
      -webkit-backdrop-filter: blur(22px) saturate(165%);
      box-shadow:
        0 0.35em 1em rgba(0,0,0,0.24),
        inset 0 1px 0 rgba(255,255,255,0.26);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .lgv-unlock:active {
      transform: scale(0.94);
    }
    .lgv-unlock svg {
      width: 52%;
      height: 52%;
      fill: currentColor;
      color: #fff;
      filter: drop-shadow(0 0 3px rgba(125,211,252,0.4));
    }
    @keyframes lgv-unlock-pulse {
      0%, 100% { box-shadow: 0 0.35em 1em rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.26), 0 0 0 0 rgba(125,211,252,0); }
      50% { box-shadow: 0 0.35em 1em rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.26), 0 0 0 0.28em rgba(125,211,252,0.14); }
    }
    .lgv-root.lgv-locked .lgv-unlock-wrap.lgv-unlock-show .lgv-unlock {
      animation: lgv-unlock-pulse 2.2s ease-in-out infinite;
    }

    /* Progress ring sits around the chip with a small gap */
    .lgv-hold-ring {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.16s ease;
    }
    .lgv-hold-ring.show {
      opacity: 1;
    }
    .lgv-hold-ring svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .lgv-hold-ring-track {
      fill: none;
      stroke: rgba(255,255,255,0.2);
      stroke-width: 2.2;
    }
    .lgv-hold-ring-prog {
      fill: none;
      stroke: #7dd3fc;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-dasharray: 100.53;
      stroke-dashoffset: 100.53;
      transform: rotate(-90deg);
      transform-origin: 20px 20px;
      filter: drop-shadow(0 0 3px rgba(125,211,252,0.55));
    }

    /* Responsive liquid-glass settings sheet — compact, proportional to the
       player box itself (via container query units) rather than the page
       viewport, so it stays correctly sized under page zoom, on small
       windowed desktop players, and in mobile-browser "desktop mode". */
    .lgv-settings {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.94);
      z-index: 2147483647;
      width: min(58%, 180px);
      max-height: min(44%, 300px);
      min-height: 0;
      box-sizing: border-box;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 42%, rgba(255,255,255,0) 70%),
        rgba(28, 30, 38, 0.46);
      backdrop-filter: blur(38px) saturate(165%);
      -webkit-backdrop-filter: blur(38px) saturate(165%);
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.28);
      box-shadow: 0 1.4em 3.4em rgba(0,0,0,0.28), 0 0.15em 0.4em rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(255,255,255,0.06);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
      font-size: clamp(9.5px, 1.5vw, 11px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .lgv-settings.anchored { left: 50%; top: auto; transform: translateX(-50%) scale(0.94); }
    .lgv-settings.anchored.open { transform: translateX(-50%) scale(1); }
    .lgv-settings.open {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      pointer-events: auto;
    }

    .lgv-settings-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5em 0.7em 0.3em;
      border-bottom: 1px solid rgba(255,255,255,0.12);
      flex-shrink: 0;
      cursor: move;
      touch-action: none;
      position: relative;
    }
    .lgv-settings-header::before {
      content: '';
      position: absolute;
      top: 0.4em;
      left: 50%;
      width: 28px;
      height: 3px;
      transform: translateX(-50%);
      border-radius: 99px;
      background: rgba(255,255,255,0.32);
    }
    .lgv-settings-title {
      font-size: 0.82em;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      letter-spacing: 0.01em;
    }
    .lgv-close {
      width: 1.45em;
      height: 1.45em;
      border: none;
      background: rgba(255,255,255,0.12);
      border-radius: 50%;
      color: #fff;
      font-size: 0.85em;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      line-height: 1;
    }
    .lgv-close:active { background: rgba(255,255,255,0.18); }

    .lgv-settings-tabs {
      display: flex;
      padding: 0.3em 0.5em 0.1em;
      gap: 0.2em;
      flex-shrink: 0;
    }
    .lgv-tab {
      flex: 1 1 0;
      min-width: 0;
      text-align: center;
      padding: 0.22em 0.2em;
      font-size: 0.66em;
      font-weight: 600;
      color: rgba(255,255,255,0.48);
      border: 1px solid transparent;
      border-radius: 0.7em;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
    }
    .lgv-tab.active {
      color: #fff;
      background: rgba(255,255,255,0.16);
      border-color: rgba(255,255,255,0.14);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.13);
    }

    .lgv-settings-body {
      padding: 0.4em 0.6em 0.55em;
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1;
      min-height: 0;
      overscroll-behavior: contain;
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.25) transparent;
    }

    .lgv-section {
      display: none;
      flex-direction: column;
      gap: 0.4em;
    }
    .lgv-section.active { display: flex; }

    .lgv-label {
      font-size: 0.76em;
      font-weight: 600;
      color: rgba(255,255,255,0.62);
      margin-bottom: 0.25em;
      letter-spacing: 0.01em;
    }

    .lgv-slider-row {
      display: flex;
      align-items: center;
      gap: 0.5em;
      min-height: 1.4em;
      min-width: 0;
      max-width: 100%;
    }
    .lgv-slider {
      flex: 1 1 auto;
      min-width: 0;
      -webkit-appearance: none;
      appearance: none;
      height: 0.35em;
      background: rgba(255,255,255,0.18);
      border-radius: 99em;
      outline: none;
      touch-action: pan-y;
    }
    .lgv-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.25em;
      height: 1.25em;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0.08em 0.28em rgba(0,0,0,0.35), 0 0 0 0.1em rgba(255,255,255,0.18);
      cursor: pointer;
    }
    .lgv-slider::-moz-range-thumb {
      width: 1.25em;
      height: 1.25em;
      background: #fff;
      border: none;
      border-radius: 50%;
      box-shadow: 0 0.08em 0.28em rgba(0,0,0,0.35), 0 0 0 0.1em rgba(255,255,255,0.18);
      cursor: pointer;
    }
    /* Brightness overlay — fills the player box (100% of .lgv-root = video
       size, not the screen). Sits above video + glass + subs so the whole
       picture dims/brightens together without CSS filter on panels. */
    .lgv-bright-overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      /* Tied with .lgv-unlock-wrap / .lgv-settings (both 2147483647, the
         practical z-index ceiling) and appended last in the DOM, so ties
         resolve in its favor — it paints above literally every other
         layer: video, control panel, skip button, side HUD, lock-catch,
         the settings sheet, and the unlock chip. That's deliberate: this
         script never leaves any surface exempt from the dim veil, so
         "brightness" dims the whole composite consistently, panels and
         subtitles included, exactly like it visually looks like it should.
         pointer-events stays none so it's purely visual — nothing under it
         loses the ability to be tapped/dragged. Starts display:none (JS
         only ever switches it to block while actually dimming) rather than
         a permanently-present opacity:0 layer — some WebKit builds treat
         an always-present blend-capable element sitting over backdrop-
         filter panels as reason to isolate/re-composite them, which is
         what was turning the glass panels' frosted blur into a blocky
         "mosaic" look and flattening their transparency at full (max)
         brightness even though the overlay was invisible. Fully removing
         it from the render tree at max/neutral brightness — not just
         fading it to 0 — guarantees the settings sheet, control bar, etc.
         render exactly as if this overlay didn't exist at all. */
      display: none;
      z-index: 2147483647;
      pointer-events: none;
      opacity: 0;
      background: #000;
      transition: opacity 0.1s linear, background-color 0.1s linear;
    }
    .lgv-val {
      font-size: 0.75em;
      font-weight: 700;
      color: #7dd3fc;
      /* flex-shrink: 0 is load-bearing here: the old rule let this shrink
         and then hid whatever didn't fit behind an ellipsis, which is what
         turned "Medium" into "Medi…". The slider next to it (flex: 1 1 auto)
         absorbs any width pressure instead, so this always renders at its
         full natural width no matter how narrow the panel gets. */
      flex: 0 0 auto;
      min-width: 2.6em;
      max-width: 50%;
      text-align: right;
      white-space: nowrap;
    }
    /* Tiny per-slider reset — sits after the value, resets only that control */
    .lgv-reset-one {
      flex: 0 0 auto;
      width: 1.35em;
      height: 1.35em;
      padding: 0;
      margin: 0;
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.7);
      font-size: 0.72em;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .lgv-reset-one:active {
      background: rgba(125,211,252,0.25);
      color: #fff;
      border-color: rgba(125,211,252,0.4);
    }
    .lgv-reset-one svg {
      width: 0.75em;
      height: 0.75em;
      fill: currentColor;
    }

    /* This used to be its own independently-scrollable box (its own
       max-height + overflow-y), nested inside .lgv-settings-body which is
       also scrollable. Two scrollers stacked like that is what made the
       sheet feel like separate chopped-up boxes instead of one panel --
       whichever one a touch landed on would grab the gesture and clip
       everything else at its own edge (a track row cut in half at the
       boundary, the size/position sliders above it unreachable until you
       specifically scrolled *that* inner box first). Now it's just a plain
       flex column with no height cap or scroll of its own, so it's part of
       the exact same continuous scroll as everything else in the sheet --
       one scrollbar, nothing nested, nothing gets cut off mid-row. */
    .lgv-track-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .lgv-font-list {
      display: flex;
      flex-direction: column;
      gap: 0.28em;
      margin-top: 0.15em;
    }
    .lgv-font-item {
      padding: 0.48em 0.7em;
      border-radius: 0.55em;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.92);
      font-size: 0.88em;
      font-weight: 600;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .lgv-font-item:active {
      background: rgba(125,211,252,0.18);
    }
    .lgv-font-item.active {
      background: rgba(125,211,252,0.22);
      border-color: rgba(125,211,252,0.45);
      color: #e8f7ff;
    }
    .lgv-track-item {
      padding: 0.55em 0.7em;
      border-radius: 0.95em;
      font-size: 0.78em;
      color: rgba(255,255,255,0.85);
      background: rgba(255,255,255,0.075);
      border: 1px solid rgba(255,255,255,0.07);
      cursor: pointer;
    }
    .lgv-track-item.active {
      background: rgba(125,211,252,0.22);
      color: #fff;
    }
    .lgv-track-item.off { opacity: 0.55; }
    .lgv-track-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6em;
    }
    .lgv-track-item .lgv-track-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lgv-track-tick {
      flex: 0 0 auto;
      width: 1.6em;
      height: 1.6em;
      border-radius: 50%;
      background: var(--lgv-tick-soft);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .lgv-track-tick svg { width: 0.9em; height: 0.9em; }
    /* 8.10.75: multi-select rows. Label left, "(signs)" tag right, tick circle last. */
    .lgv-root .lgv-track-item .lgv-track-label { flex: 1 1 auto; }
    .lgv-root .lgv-track-item .lgv-track-tag {
      flex: 0 0 auto; margin-left: auto; font-size: 0.86em; font-weight: 600;
      letter-spacing: 0.02em; color: #1CCEE6; opacity: 0.92; white-space: nowrap;
    }
    .lgv-root .lgv-track-tick.empty { background: transparent; box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.3); }

    /* Frame = the picture itself (16:9 area inside the player). It's a size
       container so the subtitle can be sized in em of a share of its height. */
    .lgv-frame {
      position: absolute;
      pointer-events: none;
      container-type: size;
    }
    /* On-screen text (signs, times, places) at the right-centre of the picture.
       8.10.72: outline-first (dark stroke painted under the fill), no box over the
       picture, soft halo, slim accent pill, key figures highlighted. Tweak the
       --lgv-sign-* values below to taste. */
    .lgv-sign {
      --lgv-sign-main: #1CCEE6;      /* headline colour (cyan) */
      --lgv-sign-sub: #ffffff;       /* bracketed second block */
      --lgv-sign-accent: #1CCEE6;    /* accent pill + highlighted figures */
      --lgv-sign-edge: #0a0d14;      /* outline colour */
      --lgv-sign-right: 3%;
      --lgv-sign-top: 50%;
      position: absolute;
      right: var(--lgv-sign-right);
      top: calc(var(--lgv-sign-top) + var(--lgv-sign-dy, 0px));
      transform: translateY(-50%) translateX(0.6em);
      max-width: 40%;
      box-sizing: border-box;
      padding: 0 0.95em 0 0;
      text-align: right;
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
      font-style: italic;
      font-weight: 800;
      font-size: calc(3.8 * 1cqh);
      line-height: 1.25;
      letter-spacing: 0.01em;
      font-variant-numeric: tabular-nums;
      color: var(--lgv-sign-main);
      /* soft halo under the glyphs only (not a box) */
      filter: drop-shadow(0 0.04em 0.18em rgba(0,0,0,0.6));
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.45s ease, transform 0.45s cubic-bezier(.2,.8,.2,1), top 0.25s ease;
    }
    .lgv-sign.show { opacity: 1; transform: translateY(-50%) translateX(0); }
    /* slim accent pill on the right edge */
    .lgv-sign::after {
      content: "";
      position: absolute;
      right: 0; top: 0.12em; bottom: 0.12em;
      width: 0.16em;
      border-radius: 99em;
      background: var(--lgv-sign-accent);
      box-shadow: 0 0 0 0.05em var(--lgv-sign-edge);
    }
    .lgv-sign .lgv-sign-line {
      display: block;
      text-wrap: balance;
      /* stroke is painted UNDER the fill, so the letters keep their full weight */
      -webkit-text-stroke: 0.2em var(--lgv-sign-edge);
      paint-order: stroke fill;
      stroke-linejoin: round;
    }
    .lgv-sign .lgv-sign-line + .lgv-sign-line { margin-top: 0.3em; }
    /* bracketed block, e.g. "(Remaining Time Until ...)": smaller, white */
    .lgv-sign .lgv-sign-sub {
      color: var(--lgv-sign-sub);
      font-size: 0.78em;
      font-weight: 700;
      line-height: 1.3;
    }
    /* key figures inside the bracketed block (times, "7 Days", "12 Hours") */
    .lgv-sign .lgv-sign-hl {
      color: var(--lgv-sign-accent);
      font-weight: 800;
    }
    @supports not (paint-order: stroke fill) {
      .lgv-sign .lgv-sign-line {
        -webkit-text-stroke: 0;
        text-shadow: 0 0 0.09em var(--lgv-sign-edge), 0 0 0.09em var(--lgv-sign-edge),
                     0 0 0.09em var(--lgv-sign-edge), 0 0.05em 0.2em rgba(0,0,0,0.8);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .lgv-sign, .lgv-sign.show { transform: translateY(-50%); transition: opacity 0.3s ease; }
    }

    /* ---- Sign styles. Pick one with LGV_SIGN_STYLE at the top of the script. ---- */
    /* neon: light text, cyan glow, thin dark edge (cyberpunk) */
    .lgv-sign[data-style="neon"] { --lgv-sign-main: #e6fcff; }
    .lgv-sign[data-style="neon"] .lgv-sign-line {
      -webkit-text-stroke: 0.14em rgba(3,12,22,0.9);
      text-shadow: 0 0 0.22em rgba(28,206,230,0.95), 0 0 0.6em rgba(28,206,230,0.55);
    }
    .lgv-sign[data-style="neon"] .lgv-sign-sub { color: #cfeff5; }
    .lgv-sign[data-style="neon"] .lgv-sign-hl { color: #1CCEE6; text-shadow: 0 0 0.3em rgba(28,206,230,1), 0 0 0.7em rgba(28,206,230,0.7); }
    .lgv-sign[data-style="neon"]::after { box-shadow: 0 0 0 0.05em rgba(3,12,22,0.9), 0 0 0.7em 0.1em rgba(28,206,230,0.8); }
    /* glass: frosted capsule behind the text (covers some of the picture) */
    .lgv-sign[data-style="glass"] {
      padding: 0.5em 1.15em 0.5em 0.9em;
      border-radius: 1.05em;
      background: linear-gradient(135deg, rgba(10,24,38,var(--lgv-glass-a)), rgba(10,24,38,calc(var(--lgv-glass-a) * 0.55)));
      -webkit-backdrop-filter: blur(0.42em) saturate(1.5) brightness(calc(var(--lgv-dim, 0.62) + 0.18));
      backdrop-filter: blur(0.42em) saturate(1.5) brightness(calc(var(--lgv-dim, 0.62) + 0.18));
      border: 1px solid rgba(28,206,230,0.3);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
      filter: none;
    }
    .lgv-sign[data-style="glass"]::after { top: 0.55em; bottom: 0.55em; right: 0.4em; box-shadow: none; }
    .lgv-sign[data-style="glass"] .lgv-sign-line { -webkit-text-stroke: 0; text-shadow: 0 0.04em 0.14em rgba(0,0,0,0.85), 0 0 0.3em rgba(0,0,0,0.5); }
    .lgv-sign[data-style="glass"] { padding-right: 1.5em; }
    /* clean: white headline, cyan only as the accent, thin outline */
    .lgv-sign[data-style="clean"] { --lgv-sign-main: #ffffff; font-weight: 700; }
    .lgv-sign[data-style="clean"] .lgv-sign-line { -webkit-text-stroke: 0.16em var(--lgv-sign-edge); }
    .lgv-sign[data-style="clean"] .lgv-sign-sub { color: #e8f1f5; font-weight: 600; }

    /* ---- Subtitle styles (Settings > Subtitle > Style). Outline = the classic look. ---- */
    .lgv-subs[data-style="neon"] { color: #e6fcff; }
    .lgv-subs[data-style="neon"] .lgv-subs-text {
      -webkit-text-stroke: calc(0.14em * var(--lgv-ol, 1)) rgba(3,12,22,0.9);
      paint-order: stroke fill;
      stroke-linejoin: round;
      text-shadow: 0 0 0.22em rgba(28,206,230,0.9), 0 0 0.6em rgba(28,206,230,0.5);
    }
    .lgv-subs[data-style="clean"] .lgv-subs-text {
      -webkit-text-stroke: calc(0.16em * var(--lgv-ol, 1)) rgba(0,0,0,0.92);
      paint-order: stroke fill;
      stroke-linejoin: round;
      text-shadow: 0 0.04em 0.16em rgba(0,0,0,0.45);
    }
    .lgv-subs[data-style="glass"] .lgv-subs-text {
      box-sizing: border-box;
      padding: 0.22em 0.8em 0.26em;
      border-radius: 1.05em;
      background: linear-gradient(135deg, rgba(10,24,38,var(--lgv-glass-a)), rgba(10,24,38,calc(var(--lgv-glass-a) * 0.55)));
      -webkit-backdrop-filter: blur(10px) saturate(1.4);
      backdrop-filter: blur(10px) saturate(1.4);
      border: 1px solid rgba(28,206,230,0.26);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
      text-shadow: 0 0.04em 0.14em rgba(0,0,0,0.85), 0 0 0.3em rgba(0,0,0,0.5);
    }
    @supports not (paint-order: stroke fill) {
      .lgv-subs[data-style="neon"] .lgv-subs-text,
      .lgv-subs[data-style="clean"] .lgv-subs-text {
        -webkit-text-stroke: 0;
        text-shadow: 0 0 0.09em #000, 0 0 0.09em #000, 0 0 0.09em #000, 0 0.05em 0.2em rgba(0,0,0,0.8);
      }
    }
    /* preset rows in Settings: name left, short hint right */
    .lgv-root .lgv-preset-item { display: flex; align-items: center; justify-content: space-between; gap: 0.6em; }
    .lgv-root .lgv-preset-hint { font-size: 0.82em; font-weight: 500; color: rgba(255,255,255,0.5); white-space: nowrap; }

    .lgv-qtrace {
      font-size: 0.85em;
      line-height: 1.35;
      opacity: 0.55;
      margin: 0.4em 0.2em 0;
      word-break: break-word;
    }

    /* Quality message: a small pill that disappears on its own */
    .lgv-qtoast {
      position: absolute;
      top: 7%;
      left: 50%;
      z-index: 2147483646;
      padding: 0.3em 0.8em;
      border-radius: 999em;
      font-size: 1.9vw;
      font-size: 1.4cqw;
      line-height: 1.2;
      white-space: nowrap;
      color: rgba(255,255,255,0.95);
      font-family: var(--lgv-font, "Ubuntu", system-ui, sans-serif);
      background:
        linear-gradient(165deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 60%, transparent 85%),
        rgba(18, 20, 26, 0.5);
      backdrop-filter: blur(10px) saturate(140%);
      -webkit-backdrop-filter: blur(10px) saturate(140%);
      border: 1px solid rgba(255,255,255,0.18);
      opacity: 0;
      pointer-events: none;
      transform: translate(-50%, -0.3em);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .lgv-qtoast.show { opacity: 1; transform: translate(-50%, 0); }

    .lgv-meta {
      padding: 0.7em;
      border-radius: 10px;
      background: rgba(255,255,255,0.065);
      border: 1px solid rgba(255,255,255,0.08);
      font-size: 0.76em;
      color: rgba(255,255,255,0.75);
      line-height: 1.45;
    }
    .lgv-meta b { color: #7dd3fc; font-weight: 700; }

    .lgv-smart-btn {
      margin-top: 1px;
      padding: 0.65em 0.8em;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.07);
      color: #fff;
      font: inherit;
      font-size: 0.8em;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
    }
    .lgv-smart-btn:active { transform: scale(0.98); }
    .lgv-smart-btn.active {
      background: rgba(125,211,252,0.2);
      border-color: rgba(125,211,252,0.35);
    }
    .lgv-smart-btn:disabled { opacity: 0.58; cursor: wait; }

    .lgv-toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6em;
      padding: 0.2em 0;
    }
    .lgv-toggle {
      position: relative;
      width: 2.4em;
      height: 1.35em;
      flex-shrink: 0;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.12);
      cursor: pointer;
      transition: background 0.18s ease, border-color 0.18s ease;
      padding: 0;
    }
    .lgv-toggle::after {
      content: '';
      position: absolute;
      top: 0.12em;
      left: 0.12em;
      width: 0.95em;
      height: 0.95em;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.18s ease;
    }
    .lgv-toggle[aria-checked="true"] {
      background: rgba(125,211,252,0.55);
      border-color: rgba(125,211,252,0.7);
    }
    .lgv-toggle[aria-checked="true"]::after {
      transform: translateX(1.05em);
    }

    /* Container-query refinement: size the settings sheet relative to the
       actual player box (not the page viewport). This is what keeps it
       correctly proportioned under browser zoom, in small windowed desktop
       players, and in mobile "Desktop site" mode, where viewport width and
       the player's real rendered size diverge. Falls back to the min()/vw
       rules above on engines without container query unit support. */
    @supports (container-type: size) {
      .lgv-root { container-type: size; container-name: lgv; }
      .lgv-settings {
        width: clamp(130px, 30cqw, 170px);
        max-height: clamp(160px, 40cqh, 300px);
        font-size: clamp(8px, 2cqw, 9px);
      }
      /* Control bar scales off the player box's own width, not the page:
         a small non-fullscreen/embedded player stays thin (low cqw ->
         near the floor, so padding/buttons/timeline all shrink together
         since everything below is sized in em), while a wide fullscreen
         landscape player climbs toward the ceiling and the whole bar
         (and thus its fit-content width) grows to match. Portrait
         fullscreen keeps roughly the same width as non-fullscreen since
         a phone's logical width doesn't change with orientation-only
         fullscreen, which is intentional -- only this bar's *width*
         basis changes here; subtitle sizing is handled separately below
         since it has to react to vertical cropping, not just width. */
      .lgv-panel {
        font-size: clamp(9px, 1.7cqw, 19px);
      }
      .lgv-unlock-wrap {
        width: clamp(36px, 6.6cqw, 46px);
        height: clamp(36px, 6.6cqw, 46px);
      }
    }

    /* 8.10.28: settings sheet polish. Size and font come from JS (_placeSettings). */
    .lgv-settings { will-change: opacity, transform; }
    .lgv-settings-body { padding-bottom: 0.7em; }
    .lgv-track-item {
      -webkit-tap-highlight-color: transparent;
      transition: background 0.16s ease, border-color 0.16s ease, transform 0.1s ease;
      min-height: 1.5em;
    }
    .lgv-track-item:active { transform: scale(0.985); }
    .lgv-track-item.active {
      border-color: rgba(125,211,252,0.38);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .lgv-track-tick { box-shadow: inset 0 0 0 1px rgba(125,211,252,0.28); }

    /* 8.10.29: compact tabs. Everything is in em, so it follows the sheet's font size. */
    .lgv-settings-header { padding: 0.4em 0.65em 0.22em; }
    .lgv-settings-header::before { top: 0.3em; width: 2.6em; height: 0.26em; }
    .lgv-settings-title { font-size: 0.8em; }
    .lgv-close { width: 1.35em; height: 1.35em; font-size: 0.78em; }
    .lgv-settings-tabs { padding: 0.25em 0.45em 0.05em; gap: 0.15em; }
    .lgv-tab { padding: 0.17em 0.15em; font-size: 0.64em; border-radius: 0.85em; }
    .lgv-settings-body { padding: 0.3em 0.5em 0.5em; }
    .lgv-section { gap: 0.3em; }
    .lgv-label { font-size: 0.68em; margin-bottom: 0.12em; }
    .lgv-slider-row { min-height: 0; gap: 0.4em; }
    .lgv-slider { height: 0.32em; }
    .lgv-slider::-webkit-slider-thumb { width: 1.2em; height: 1.2em; }
    .lgv-slider::-moz-range-thumb { width: 1.2em; height: 1.2em; }
    .lgv-val { font-size: 0.68em; min-width: 2.2em; }
    .lgv-reset-one { width: 1.25em; height: 1.25em; }
    .lgv-track-list { gap: 0.22em; }
    .lgv-track-item { padding: 0.3em 0.5em; border-radius: 0.95em; font-size: 0.72em; min-height: 0; gap: 0.4em; }
    .lgv-track-tick { width: 1.35em; height: 1.35em; }
    .lgv-font-list { gap: 0.2em; margin-top: 0.1em; }
    .lgv-font-item { padding: 0.3em 0.55em; border-radius: 0.95em; font-size: 0.78em; }
    .lgv-smart-btn { padding: 0.42em 0.6em; border-radius: 0.95em; font-size: 0.72em; }
    .lgv-meta { padding: 0.5em 0.6em; border-radius: 0.95em; font-size: 0.7em; line-height: 1.35; }
    .lgv-qtrace { font-size: 0.7em; margin: 0.25em 0.15em 0; line-height: 1.25; }

    /* 8.10.54: unified squircle language — one curve family, no pill balloons,
       no heavy bottom mask (that made a weird blue bar under the list). */
    .lgv-root .lgv-settings {
      border-radius: 1.55em;
      border: 1px solid rgba(255,255,255,0.14);
      background: rgba(20,22,30,0.14);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      box-shadow: none;
    }

    .lgv-root .lgv-settings-header {
      border-bottom: 0;
      padding: 0.55em 0.85em 0.25em;
      background: none;
    }
    .lgv-root .lgv-settings-header::before { top: 0.32em; width: 2.2em; height: 0.22em; background: rgba(255,255,255,0.30); border-radius: 99px; }
    .lgv-root .lgv-settings-header::after {
      content: '';
      position: absolute;
      left: 10%; right: 10%; bottom: 0;
      height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0));
    }
    .lgv-root .lgv-settings-title { font-size: 0.86em; font-weight: 700; color: rgba(255,255,255,0.94); }
    .lgv-root .lgv-close {
      width: 1.45em; height: 1.45em;
      border: 0;
      border-radius: 0.7em;
      background: rgba(255,255,255,0.10);
      box-shadow: none;
    }
    .lgv-root .lgv-close:active { background: rgba(255,255,255,0.20); }

    /* Tabs: continuous segment control, moderate squircle */
    .lgv-root .lgv-settings-tabs {
      margin: 0.45em 0.8em 0.1em;
      padding: 0.14em;
      gap: 0.06em;
      border-radius: 0.95em;
      background: rgba(255,255,255,0.06);
      box-shadow: none;
    }
    .lgv-root .lgv-tab {
      padding: 0.36em 0.2em;
      font-size: 0.68em;
      font-weight: 600;
      border: 0;
      border-radius: 0.8em;
      color: rgba(255,255,255,0.52);
    }
    .lgv-root .lgv-tab.active {
      color: #fff;
      background: rgba(255,255,255,0.18);
      box-shadow: none;
      text-shadow: none;
    }

    /* Body: light top fade only — no deep bottom mask (avoids the weird strip) */
    .lgv-root .lgv-settings-body {
      padding: 0.65em 0.8em 1.1em;
      scrollbar-width: none;
      -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0) 0, #000 0.4em, #000 100%);
      mask-image: linear-gradient(180deg, rgba(0,0,0,0) 0, #000 0.4em, #000 100%);
    }
    .lgv-root .lgv-settings-body::-webkit-scrollbar { display: none; }
    .lgv-root .lgv-section { gap: 0.85em; }
    .lgv-root .lgv-label { font-size: 0.7em; font-weight: 650; letter-spacing: 0.03em; color: rgba(255,255,255,0.58); margin: 0 0 0.45em 0.25em; }

    /* Rows: same squircle family as tabs (~0.65–0.7em), not capsules */
    .lgv-root .lgv-track-list { gap: 0.32em; }
    .lgv-root .lgv-font-list { gap: 0.32em; }
    .lgv-root .lgv-track-item,
    .lgv-root .lgv-font-item {
      padding: 0.48em 0.85em;
      border-radius: 0.9em;
      border: 0;
      background: rgba(255,255,255,0.09);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
    }
    .lgv-root .lgv-track-item.active,
    .lgv-root .lgv-font-item.active {
      color: #fff;
      background: rgba(125,211,252,0.16);
      box-shadow: inset 0 0 0 1px rgba(125,211,252,0.45);
    }
    .lgv-root .lgv-track-item.off { opacity: 0.5; }
    .lgv-root .lgv-track-tick {
      width: 1.35em; height: 1.35em;
      background: rgba(125,211,252,0.26);
      box-shadow: none;
    }

    /* Sliders: thin line with a white fill (set from JS as --p) and a round handle.
       Everything in em so the dot scales with the sheet at any size / mode. */
    .lgv-root .lgv-slider {
      font-size: inherit;
      height: 0.35em;
      margin: 0.35em 0;
      border-radius: 99em;
      background: linear-gradient(90deg, rgba(255,255,255,0.88) 0, rgba(255,255,255,0.88) var(--p, 50%), rgba(255,255,255,0.18) var(--p, 50%), rgba(255,255,255,0.18) 100%);
      box-shadow: none;
    }
    .lgv-root .lgv-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.25em; height: 1.25em;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0.08em 0.32em rgba(0,0,0,0.38);
    }
    .lgv-root .lgv-slider::-moz-range-thumb {
      width: 1.25em; height: 1.25em;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0.08em 0.32em rgba(0,0,0,0.38);
    }
    .lgv-root .lgv-val { font-size: 0.72em; color: rgba(170,226,255,0.98); font-variant-numeric: tabular-nums; }
    .lgv-root .lgv-reset-one {
      width: 1.5em; height: 1.5em;
      border: 0;
      background: rgba(255,255,255,0.12);
      box-shadow: none;
    }

    /* Buttons — same squircle as rows */
    .lgv-root .lgv-smart-btn {
      padding: 0.55em 0.85em;
      border-radius: 0.9em;
      border: 0;
      background: rgba(255,255,255,0.10);
      box-shadow: none;
    }
    .lgv-root .lgv-smart-btn:active { background: rgba(125,211,252,0.24); }
    .lgv-root .lgv-meta {
      padding: 0.7em 0.95em;
      border-radius: 1.3em;
      line-height: 1.55;
      background: rgba(255,255,255,0.06);
      border: 0;
      box-shadow: none;
    }
    .lgv-root .lgv-qtrace { margin: 0.5em 0.3em 0; opacity: 0.65; }

    /* 8.10.40: less scrolling. One-line sliders, folded lists, tighter rows. */
    .lgv-root .lgv-section { gap: 0.5em; }
    .lgv-root .lgv-settings-body { padding: 0.45em 0.8em 1.1em; }
    .lgv-root .lgv-ctl { display: flex; align-items: center; gap: 0.5em; min-width: 0; }
    .lgv-root .lgv-ctl > .lgv-label { flex: 0 0 5.2em; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .lgv-root .lgv-ctl > .lgv-slider-row { flex: 1 1 auto; min-width: 0; gap: 0.4em; }
    .lgv-root .lgv-slider { margin: 0.15em 0; }
    .lgv-root .lgv-val { min-width: 2em; }
    .lgv-root .lgv-track-list, .lgv-root .lgv-font-list { gap: 0.3em; }
    .lgv-root .lgv-track-item, .lgv-root .lgv-font-item { padding: 0.38em 0.8em; }
    .lgv-root .lgv-smart-btn { padding: 0.45em 0.8em; }
    .lgv-root .lgv-meta { padding: 0.55em 0.85em; line-height: 1.4; }
    .lgv-root .lgv-qtrace { margin: 0.35em 0.3em 0; }
    /* Fold headers = section labels (not the same capsule as option rows).
       Option rows (Outline/Neon/Glass/Clean, fonts, tracks) keep the filled box. */
    .lgv-root .lgv-fold-head {
      display: flex; align-items: center; gap: 0.4em;
      padding: 0.28em 0.2em;
      border-radius: 0;
      background: transparent;
      border: 0;
      box-shadow: none !important;
      cursor: pointer; user-select: none; -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .lgv-root .lgv-fold-head:active { background: transparent; opacity: 0.85; }
    .lgv-root .lgv-fold-title {
      flex: 0 0 auto;
      font-size: 0.66em; font-weight: 700;
      letter-spacing: 0.06em; text-transform: uppercase;
      color: rgba(255,255,255,0.48);
    }
    /* margin-left:auto parks the chip + chevron on the right; chip stays content-sized */
    .lgv-root .lgv-fold-sum {
      flex: 0 1 auto;
      max-width: 58%;
      margin-left: auto;
      text-align: right;
      font-size: 0.68em; font-weight: 600;
      color: rgba(190,234,255,1);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      padding: 0.28em 0.72em;
      border-radius: 99em;
      background: rgba(255,255,255,0.10);
      box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.12);
      line-height: 1.25;
    }
    .lgv-root .lgv-fold-chev {
      flex: 0 0 auto; font-size: 0.8em; line-height: 1;
      color: rgba(255,255,255,0.42);
      transition: transform 0.15s ease;
    }
    .lgv-root .lgv-fold.open .lgv-fold-chev { transform: rotate(90deg); }
    .lgv-root .lgv-fold-body { display: none; padding-top: 0.35em; padding-left: 0.1em; }
    .lgv-root .lgv-fold.open .lgv-fold-body { display: block; }

    /* 8.10.41: clean liquid glass. More see-through than before, and the shine is
       fine detail instead of glare: a thin rim light (brighter top-left, softer
       bottom-right), a very soft top light, a faint inner glow and a soft ambient
       shadow. No wide diagonal gloss band. Accents (blue) keep a gentle glow. */
    .lgv-root {
      --lgv-rim: inset 1px 1px 0 rgba(255,255,255,0.22), inset -1px -1px 0 rgba(255,255,255,0.07), inset 0 0 1.3em rgba(255,255,255,0.035);
      --lgv-rim-soft: inset 1px 1px 0 rgba(255,255,255,0.15), inset -1px -1px 0 rgba(255,255,255,0.05);
      --lgv-sheen: linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.015) 55%, rgba(255,255,255,0) 100%);
    }
    .lgv-root .lgv-panel,
    .lgv-root .lgv-skip,
    .lgv-root .lgv-speed-badge,
    .lgv-root .lgv-unlock,
    .lgv-root .lgv-settings,
    .lgv-root .lgv-side-hud,
    .lgv-root .lgv-qtoast {
      border: 1px solid rgba(255,255,255,0.09);
    }
    /* 8.10.53: cleaner liquid glass — no outer drop shadows (they looked dirty when paused),
       sharper rim, slightly stronger blur; fill stays very transparent */
    .lgv-root {
      --lgv-rim: inset 1px 1px 0 rgba(255,255,255,0.28), inset -1px -1px 0 rgba(255,255,255,0.06), inset 0 0 1.1em rgba(255,255,255,0.04);
      --lgv-rim-soft: inset 1px 1px 0 rgba(255,255,255,0.18), inset -1px -1px 0 rgba(255,255,255,0.05);
      --lgv-sheen: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 50%, rgba(255,255,255,0) 100%);
    }
    .lgv-root .lgv-panel,
    .lgv-root .lgv-skip,
    .lgv-root .lgv-speed-badge,
    .lgv-root .lgv-unlock,
    .lgv-root .lgv-settings,
    .lgv-root .lgv-side-hud,
    .lgv-root .lgv-qtoast {
      border: 1px solid rgba(255,255,255,0.14);
      backdrop-filter: blur(36px) saturate(180%) brightness(var(--lgv-dim, 0.62));
      -webkit-backdrop-filter: blur(36px) saturate(180%) brightness(var(--lgv-dim, 0.62));
    }
    .lgv-root .lgv-panel       { background: var(--lgv-sheen), rgba(22,24,30,0.10); box-shadow: var(--lgv-rim); }
    .lgv-root .lgv-side-hud    { background: var(--lgv-sheen), rgba(18,20,26,0.14); box-shadow: var(--lgv-rim); }
    .lgv-root .lgv-speed-badge { background: var(--lgv-sheen), rgba(22,24,30,0.10); box-shadow: var(--lgv-rim-soft); }
    .lgv-root .lgv-skip        { background: var(--lgv-sheen), rgba(22,24,30,0.10); box-shadow: var(--lgv-rim); }
    .lgv-root .lgv-unlock      { background: var(--lgv-sheen), rgba(22,24,30,0.12); box-shadow: var(--lgv-rim); }
    .lgv-root .lgv-settings    { background: var(--lgv-sheen), rgba(20,22,30,0.12); box-shadow: var(--lgv-rim); }
    .lgv-root .lgv-qtoast      { background: var(--lgv-sheen), rgba(22,24,30,0.12); box-shadow: var(--lgv-rim-soft); }
    /* 8.10.103: bright-scene legibility. .lgv-bright is set from a live luminance
       reading of the video; it lifts the tint floor so white icons/text keep contrast on white frames. */
    .lgv-root.lgv-bright .lgv-panel       { background: var(--lgv-sheen), rgba(18,20,28,0.30); }
    .lgv-root.lgv-bright .lgv-side-hud    { background: var(--lgv-sheen), rgba(18,20,28,0.32); }
    .lgv-root.lgv-bright .lgv-speed-badge,
    .lgv-root.lgv-bright .lgv-skip,
    .lgv-root.lgv-bright .lgv-unlock,
    .lgv-root.lgv-bright .lgv-qtoast      { background: var(--lgv-sheen), rgba(18,20,28,0.30); }
    .lgv-root.lgv-bright .lgv-settings    { background: var(--lgv-sheen), rgba(18,20,28,0.34); }
    .lgv-root.lgv-bright .lgv-panel,
    .lgv-root.lgv-bright .lgv-settings,
    .lgv-root.lgv-bright .lgv-side-hud { text-shadow: 0 0.05em 0.18em rgba(0,0,0,0.45); }
    /* No backdrop-filter (some privacy / low-power modes): solid-ish floor instead of see-through white-on-white */
    @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
      .lgv-root .lgv-panel, .lgv-root .lgv-skip, .lgv-root .lgv-speed-badge, .lgv-root .lgv-unlock,
      .lgv-root .lgv-settings, .lgv-root .lgv-side-hud, .lgv-root .lgv-qtoast { background: rgba(20,22,30,0.82); }
    }
    @media (prefers-reduced-transparency: reduce) {
      .lgv-root .lgv-panel, .lgv-root .lgv-skip, .lgv-root .lgv-speed-badge, .lgv-root .lgv-unlock,
      .lgv-root .lgv-settings, .lgv-root .lgv-side-hud, .lgv-root .lgv-qtoast { background: rgba(20,22,30,0.88); backdrop-filter: none; -webkit-backdrop-filter: none; }
    }
    /* small controls inside the sheet get the fine rim too */
    .lgv-root .lgv-tab.active  { box-shadow: var(--lgv-rim-soft), 0 0.1em 0.35em rgba(0,0,0,0.22); }
    .lgv-root .lgv-close,
    .lgv-root .lgv-reset-one,
    .lgv-root .lgv-smart-btn,
    /* fold-head is a label now — no rim capsule */
    /* blue accents keep a gentle glow */
    .lgv-root .lgv-unlock svg { filter: drop-shadow(0 0 3px rgba(125,211,252,0.3)); }
    .lgv-root .lgv-hold-ring-prog { filter: drop-shadow(0 0 3px rgba(125,211,252,0.45)); }
    .lgv-root .lgv-side-hud-fill { box-shadow: 0 0 6px rgba(125,211,252,0.35); }
    @keyframes lgv-unlock-pulse {
      0%, 100% { box-shadow: var(--lgv-rim), 0 0.35em 1em rgba(0,0,0,0.2), 0 0 0 0 rgba(125,211,252,0); }
      50% { box-shadow: var(--lgv-rim), 0 0.35em 1em rgba(0,0,0,0.2), 0 0 0 0.28em rgba(125,211,252,0.12); }
    }

    /* 8.10.60: every box — including subtitle tracks, fonts, quality, audio */
    .lgv-root {
      --lgv-r-sheet: 1.55em;
      --lgv-r-box: 1.05em;
      --lgv-r-row: 99em;   /* 8.10.101: same capsule as --lgv-row-r (was 0.95em → selected rows looked blocky) */
      --lgv-r-chip: 0.85em;
    }
    .lgv-root .lgv-panel,
    .lgv-root .lgv-settings,
    .lgv-root .lgv-side-hud,
    .lgv-root .lgv-skip,
    .lgv-root .lgv-unlock,
    .lgv-root .lgv-qtoast,
    .lgv-root .lgv-speed-badge,
    .lgv-root .lgv-subs[data-style="glass"] .lgv-subs-text,
    .lgv-root .lgv-sign[data-style="glass"] {
      border-radius: var(--lgv-r-box) !important;
    }
    .lgv-root .lgv-settings {
      border-radius: var(--lgv-r-sheet) !important;
    }
    /* All list rows: subtitle tracks, fonts, quality, audio, fold headers */
    .lgv-root .lgv-track-item,
    .lgv-root .lgv-track-item.active,
    .lgv-root .lgv-track-item.off,
    .lgv-root .lgv-font-item,
    .lgv-root .lgv-font-item.active,
    .lgv-root .lgv-smart-btn,
    .lgv-root .lgv-meta,
    .lgv-root .lgv-close,
    .lgv-root .lgv-reset-one,
    .lgv-root .lgv-settings-tabs,
    .lgv-root .lgv-tab,
    .lgv-root .lgv-tab.active {
      border-radius: var(--lgv-r-row) !important;
    }
    /* Fold headings stay label-shaped (no row capsule radius) */
    .lgv-root .lgv-fold-head {
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    .lgv-root .lgv-settings-tabs {
      border-radius: var(--lgv-r-box) !important;
    }
    .lgv-root .lgv-tab,
    .lgv-root .lgv-tab.active {
      border-radius: var(--lgv-r-chip) !important;
    }
    /* Base (non-root) list rows too — same curve if ever used outside */
    .lgv-track-item,
    .lgv-font-item,
    .lgv-smart-btn,
    .lgv-meta {
      border-radius: 99em !important;
    }
    .lgv-fold-head {
      border-radius: 0 !important;
      background: transparent !important;
    }

    /* 8.10.68: back to the original sizes, written in em. 1em of .lgv-root is the
       browser default size ("medium"). The only non-em term is cqw inside clamp(),
       which tells em how big the player box is. --lgv-ui comes from LGV_UI_SCALE. */
    .lgv-root {
      font-size: medium;
      --lgv-ui: ${LGV_UI_SCALE};
    }
    .lgv-root .lgv-panel {
      font-size: calc(var(--lgv-ui) * clamp(0.6875em, 2.6vw, 1.375em));
      font-size: calc(var(--lgv-ui) * clamp(0.5625em, 1.7cqw, 1.1875em));
    }
    .lgv-root .lgv-unlock-wrap {
      width: calc(var(--lgv-ui) * clamp(2.25em, 6.6cqw, 2.875em));
      height: calc(var(--lgv-ui) * clamp(2.25em, 6.6cqw, 2.875em));
    }
    /* Settings tabs: full pill shape (radius only, no size change) */
    .lgv-root .lgv-settings-tabs,
    .lgv-root .lgv-settings-tabs .lgv-tab,
    .lgv-root .lgv-settings-tabs .lgv-tab.active {
      border-radius: 99em !important;
    }
    /* 8.10.112: fullscreen control bar, extended. Wider than the windowed bar but just as slim: same bar
       thickness and thumb. Only while .lgv-fs is set (real fullscreen, or a landscape page that fills the
       screen). Layout: time under the left end of the bar, icons centred, time under the right end.
       Icons: bigger, evenly spaced, two groups - transport (back, play, forward) and tools (volume, subtitles,
       settings, fullscreen, lock) - split by a hairline; play sits in a soft glass disc. */
    .lgv-root.lgv-fs .lgv-panel {
      width: 50%;
      max-width: none;
      padding: 0.8em 1.2em 0.5em;
      gap: 0.55em;
      bottom: 6%;
    }
    .lgv-root.lgv-fs .lgv-timeline { height: 0.8em; }
    .lgv-root.lgv-fs .lgv-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      column-gap: 0.6em;
    }
    .lgv-root.lgv-fs .lgv-row .lgv-cur { justify-self: start; text-align: left; }
    .lgv-root.lgv-fs .lgv-row .lgv-dur { justify-self: end; text-align: right; }
    .lgv-root.lgv-fs .lgv-time { font-size: 0.8em; min-width: 3.2em; font-variant-numeric: tabular-nums; }
    /* 8.10.120: back to the original button order and the windowed bar's own button look (same sizes, no
       disc behind Play, no divider). The bar is 50% of the player; the buttons only get a slightly roomier,
       equal gap. */
    .lgv-root.lgv-fs .lgv-btns { gap: 0.6em; }
    .lgv-root.lgv-fs .lgv-btn { font-size: inherit; }
    /* 8.10.121: icons a tiny bit bigger than the time text; seek bar sits a little lower in the bar */
    .lgv-root.lgv-fs .lgv-btn svg { width: 1.05em; height: 1.05em; }

    /* Sign overlay: a little larger so it can be read */
    .lgv-sign { font-size: calc(3.8 * 1cqh); max-width: 40%; }

    /* 8.10.82 — Settings cards. Every group (sliders, Track, Font, Style, Sign
       Style, Audio, Quality, info) is its own rounded box, and the option rows
       are smaller boxes inside it. All sizes are em, so the same layout holds
       in fullscreen and out of it. */
    .lgv-root .lgv-settings-body { padding: 0.55em 0.65em 0.8em; }
    .lgv-root .lgv-section { gap: 0.55em; }
    /* 8.10.87 — lighter boxes. The cards were a dark slab (28% dark tint + gradient +
       drop shadow). Now they are a thin flat plate: a faint dark tint (keeps white
       text readable on bright scenes), a faint white lift, a hairline edge and no
       shadow or extra blur (glass on glass looked heavy). Tune with the two vars. */
    .lgv-root {
      --lgv-plate-dark: 0.10;   /* 0 = fully clear, 0.28 = the old heavy look */
      --lgv-plate-white: 0.06;  /* light lift on top of the tint */
    }
    .lgv-root .lgv-ctl,
    .lgv-root .lgv-fold,
    .lgv-root .lgv-meta {
      box-sizing: border-box;
      border-radius: var(--lgv-r-box) !important;
      background:
        linear-gradient(rgba(255,255,255,var(--lgv-plate-white)), rgba(255,255,255,var(--lgv-plate-white))),
        rgba(12, 18, 30, var(--lgv-plate-dark)) !important;
      border: 0.06em solid rgba(255,255,255,0.13) !important;
      box-shadow: inset 0 0.06em 0 rgba(255,255,255,0.1) !important;
    }
    .lgv-root .lgv-ctl .lgv-label,
    .lgv-root .lgv-fold-title { text-shadow: 0 0.05em 0.25em rgba(0,0,0,0.28); }
    .lgv-root .lgv-ctl { padding: 0.5em 0.75em; gap: 0.6em; }
    .lgv-root .lgv-meta { padding: 0.7em 0.9em; }
    .lgv-root .lgv-fold-head {
      box-sizing: border-box;
      min-height: 2.2em;
      padding: 0.55em 0.75em !important;
      gap: 0.5em;
    }
    .lgv-root .lgv-fold-sum { max-width: 58%; }
    .lgv-root .lgv-fold.open > .lgv-fold-head { border-bottom: 0.06em solid rgba(255,255,255,0.08) !important; }
    .lgv-root .lgv-fold-body { padding: 0.1em 0.55em 0.6em; }
    .lgv-root .lgv-fold.open > .lgv-fold-body { padding-top: 0.55em; }
    .lgv-root .lgv-track-list, .lgv-root .lgv-font-list { gap: 0.4em; }
    /* 8.10.88: option rows inside the dropdowns (1080p, Outline, Auto Detect, fonts...).
       Slim, faint boxes: see-through fill, no border, hairline ring. Selected = light
       blue fill + blue ring. --lgv-row-a sets how strong the fill is. */
    .lgv-root { --lgv-row-a: 0.05; --lgv-row-r: 99em; }
    .lgv-root .lgv-track-list, .lgv-root .lgv-font-list { gap: 0.28em; }
    .lgv-root .lgv-track-item, .lgv-root .lgv-font-item {
      box-sizing: border-box;
      min-height: 0;
      padding: 0.42em 1em;
      border: 0 !important;
      border-radius: var(--lgv-row-r) !important;
      background: rgba(255,255,255,var(--lgv-row-a));
      box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.07);
    }
    .lgv-root .lgv-track-item:active, .lgv-root .lgv-font-item:active {
      background: rgba(255,255,255,0.1);
    }
    .lgv-root .lgv-track-item.active, .lgv-root .lgv-font-item.active {
      background: rgba(125,211,252,0.15);
      box-shadow: inset 0 0 0 0.06em rgba(125,211,252,0.5);
    }
    .lgv-root .lgv-fold-body { padding: 0.1em 0.5em 0.55em; }

    /* 8.10.90 — polish pass. One light direction (top-left), brighter small text,
       lit active states, calm transitions. Glass stays on the sheet only; cards
       and rows stay flat so nothing is glass-on-glass. */
    .lgv-root .lgv-ctl,
    .lgv-root .lgv-fold,
    .lgv-root .lgv-meta {
      border: 0.05em solid rgba(255,255,255,0.07) !important;
      box-shadow:
        inset 0.06em 0.06em 0 rgba(255,255,255,0.20),
        inset -0.06em -0.06em 0 rgba(255,255,255,0.05) !important;
    }
    /* small text: brighter so it holds up over bright scenes */
    .lgv-root .lgv-label { color: rgba(255,255,255,0.86); text-shadow: 0 0.05em 0.25em rgba(0,0,0,0.25); }
    .lgv-root .lgv-fold-title { color: rgba(255,255,255,0.78); letter-spacing: 0.07em; }
    .lgv-root .lgv-fold-sum {
      color: rgba(190,234,255,1);
      background: rgba(255,255,255,0.10);
      border-radius: 99em !important;
      box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.12);
    }
    .lgv-root .lgv-fold-chev { color: rgba(255,255,255,0.6); }
    .lgv-root .lgv-val { color: rgba(190,234,255,1); font-weight: 600; }
    /* tabs: lit glass chip for the active one */
    .lgv-root .lgv-settings-tabs {
      background: rgba(255,255,255,0.08);
      box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.08);
    }
    .lgv-root .lgv-tab {
      color: rgba(255,255,255,0.74);
      transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
    }
    .lgv-root .lgv-settings-tabs .lgv-tab.active {
      color: #fff;
      background: rgba(255,255,255,0.22);
      box-shadow:
        inset 0.06em 0.06em 0 rgba(255,255,255,0.3),
        inset -0.06em -0.06em 0 rgba(255,255,255,0.06),
        0 0.1em 0.3em rgba(0,0,0,0.16);
    }
    /* sliders: slightly thicker, ringed handle that grows while held */
    .lgv-root .lgv-slider {
      height: 0.4em;
      background: linear-gradient(90deg, rgba(255,255,255,0.92) 0, rgba(255,255,255,0.92) var(--p, 50%), rgba(255,255,255,0.22) var(--p, 50%), rgba(255,255,255,0.22) 100%);
    }
    .lgv-root .lgv-slider::-webkit-slider-thumb {
      box-shadow: 0 0.08em 0.3em rgba(0,0,0,0.32), 0 0 0 0.07em rgba(255,255,255,0.55);
      transition: transform 0.12s ease;
    }
    .lgv-root .lgv-slider:active::-webkit-slider-thumb { transform: scale(1.12); }
    .lgv-root .lgv-reset-one {
      background: rgba(255,255,255,0.1);
      box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.1);
    }
    /* rows + buttons: same capsule family, soft transitions */
    .lgv-root .lgv-track-item, .lgv-root .lgv-font-item {
      transition: background 0.16s ease, box-shadow 0.16s ease, transform 0.1s ease;
    }
    .lgv-root .lgv-track-item.active, .lgv-root .lgv-font-item.active { color: #fff; }
    .lgv-root .lgv-smart-btn {
      border-radius: var(--lgv-row-r) !important;
      background: rgba(255,255,255,0.08);
      box-shadow: inset 0 0 0 0.05em rgba(255,255,255,0.1);
      text-align: center;
      transition: background 0.16s ease, transform 0.1s ease;
    }
    .lgv-root .lgv-smart-btn:active { background: rgba(125,211,252,0.22); transform: scale(0.985); }
    .lgv-root .lgv-smart-btn { padding: 0.65em 0.9em; margin-top: 0.15em; }
    .lgv-root .lgv-qtrace { margin: 0.5em 0.3em 0; }

    /* Glass subtitle: even padding, em blur and border (they scale with the
       subtitle), and the box is only ever as tall as its lines. */
    .lgv-root .lgv-subs-text { white-space: pre-line !important; vertical-align: bottom; }
    .lgv-root .lgv-subs-text br { display: inline !important; }
    .lgv-root .lgv-subs-text > br:first-child,
    .lgv-root .lgv-subs-text > br:last-child { display: none; }
    /* Glass boxes: radius from setCapRadius() (never above 1.05em, about a third
       of the height for one-line boxes). */
    .lgv-root .lgv-subs[data-style="glass"] .lgv-subs-text,
    .lgv-root .lgv-sign[data-style="glass"] {
      border-radius: var(--lgv-cap-r, 1.05em) !important;
    }
    /* No line on screen = no box. Glass padding and border would otherwise
       still draw an empty capsule once the dialogue is over. */
    .lgv-root .lgv-subs-text:empty { display: none !important; }
    .lgv-root .lgv-subs[data-style="glass"] .lgv-subs-text {
      padding: 0.3em 0.9em;
      border-width: 0.06em;
      -webkit-backdrop-filter: blur(0.4em) saturate(1.4) brightness(calc(var(--lgv-dim, 0.62) + 0.18));
      backdrop-filter: blur(0.4em) saturate(1.4) brightness(calc(var(--lgv-dim, 0.62) + 0.18));
    }

    /* 8.10.92: hold a track -> tiny Auto / Signs / Dialogue pill. Keep it small. */
    .lgv-root .lgv-track-item[data-tidx] { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
    .lgv-root .lgv-track-item.lgv-hold { box-shadow: inset 0 0 0 0.07em rgba(255,255,255,0.5) !important; }
    .lgv-root .lgv-track-tag.user { text-decoration: underline dotted; text-underline-offset: 0.15em; opacity: 1; }
    .lgv-root .lgv-track-tag.ai { color: rgba(255,255,255,0.55); }
    .lgv-root .lgv-track-tag.dlg { color: #fff; }
    .lgv-root .lgv-track-hint {
      font-size: 0.62em; letter-spacing: 0.02em; text-align: center;
      color: rgba(255,255,255,0.5); padding: 0.25em 0 0; pointer-events: none;
    }
    .lgv-role-pop {
      position: absolute;
      z-index: 2147483647;
      display: flex;
      gap: 0.1em;
      padding: 0.18em;
      box-sizing: border-box;
      border-radius: 99em;
      background: rgba(24,28,38,0.58);
      -webkit-backdrop-filter: blur(1.2em) saturate(180%) brightness(var(--lgv-dim, 0.62));
      backdrop-filter: blur(1.2em) saturate(180%) brightness(var(--lgv-dim, 0.62));
      border: 0.06em solid rgba(255,255,255,0.14);
      box-shadow: inset 0.06em 0.06em 0 rgba(255,255,255,0.2), inset -0.06em -0.06em 0 rgba(255,255,255,0.05);
      opacity: 0;
      transform: translateY(0.25em) scale(0.96);
      transition: opacity 0.14s ease, transform 0.14s ease;
      pointer-events: none;
    }
    .lgv-role-pop.show { opacity: 1; transform: none; pointer-events: auto; }
    .lgv-role-chip {
      margin: 0; border: 0; outline: 0;
      padding: 0.32em 0.8em;
      border-radius: 99em;
      background: transparent;
      color: rgba(255,255,255,0.82);
      font: inherit; font-size: 0.68em; font-weight: 650; letter-spacing: 0.01em;
      line-height: 1.2; white-space: nowrap; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.14s ease, color 0.14s ease;
    }
    .lgv-role-chip:active { background: rgba(255,255,255,0.14); }
    .lgv-role-chip.on { background: rgba(125,211,252,0.2); box-shadow: inset 0 0 0 0.06em rgba(125,211,252,0.5); color: #fff; }
    .lgv-role-chip.signs.on { color: #1CCEE6; }

    /* 8.10.101: one shape for every option row in every state (Track, Quality, Font,
       Audio, Style, Off, selected, held). Older 0.95em / 0.9em rules no longer win on
       .active. Pressing a row no longer shrinks it either. */
    .lgv-root .lgv-track-item,
    .lgv-root .lgv-track-item.active,
    .lgv-root .lgv-track-item.off,
    .lgv-root .lgv-track-item.lgv-hold,
    .lgv-root .lgv-font-item,
    .lgv-root .lgv-font-item.active,
    .lgv-root .lgv-smart-btn,
    .lgv-root .lgv-smart-btn.active {
      border-radius: var(--lgv-row-r) !important;
    }
    .lgv-root .lgv-track-item:active,
    .lgv-root .lgv-font-item:active,
    .lgv-root .lgv-smart-btn:active { transform: none !important; }

    /* 8.10.102: fold value chip is always a full pill; heading stays a quiet label
       so TRACK / Quality / Font read clearly apart from the Auto · … summary. */
    .lgv-root .lgv-fold-sum {
      border-radius: 99em !important;
      padding: 0.28em 0.75em !important;
      max-width: 60%;
    }
    .lgv-root .lgv-fold-head {
      border-radius: 0 !important;
      background: transparent !important;
    }
  `;
  document.documentElement.appendChild(style);

  // 8.10.110: buffered time in the biggest sensible units: 45s, 2m 05s, 1h 04m, 2d 3h.
  function formatBufAhead(sec) {
    if (!(sec >= 0) || !isFinite(sec)) return '—';
    const n = Math.floor(sec);
    if (n < 60) return n + 's';
    if (n < 3600) return Math.floor(n / 60) + 'm ' + String(n % 60).padStart(2, '0') + 's';
    if (n < 86400) return Math.floor(n / 3600) + 'h ' + String(Math.floor((n % 3600) / 60)).padStart(2, '0') + 'm';
    return Math.floor(n / 86400) + 'd ' + Math.floor((n % 86400) / 3600) + 'h';
  }
  function formatTime(t) {
    if (!isFinite(t) || t < 0) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function formatBytes(n) {
    if (!n || !isFinite(n) || n <= 0) return 'Unknown';
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return n.toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
  }

  // ---- Pause-intent persistence ----
  // Remembers whether the viewer's last real action was pausing this
  // episode, keyed per page path and kept in localStorage so it survives a
  // full browser close/reopen (not just a backgrounded tab). This is what
  // stops the "closed it paused, reopened it playing" bug: something other
  // than the viewer — the site's own resume-on-load script, a stray
  // autoplay attribute, a bfcache quirk — starts playback again right
  // after the page loads, and the guard below silently puts it back.
  function pauseIntentKey() {
    return 'lgv-pause-intent:' + location.pathname;
  }
  function savePauseIntent(paused) {
    try { localStorage.setItem(pauseIntentKey(), paused ? '1' : '0'); } catch (e) {}
  }
  function readPauseIntent() {
    try {
      const v = localStorage.getItem(pauseIntentKey());
      return v === null ? null : v === '1';
    } catch (e) { return null; }
  }

  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }

  // Settings sheet size in px from the picture height (fh) and player box.
  // big = fullscreen landscape (taller, about 3:4); otherwise portrait / embedded:
  // narrower horizontally and taller so tabs need less scrolling.
  function settingsSheetSize(fh, rootW, rootH, big) {
    // Original (8.10.64) proportions. Only the em conversion happens in
    // _placeSettings: width / max-height in em of the sheet's own font, the
    // font in em of the player root.
    let h, w, font;
    if (big) {
      h = clamp(fh * 0.62, 190, 380);
      w = clamp(h * 0.74, 160, 270);
      font = clamp(h * 0.038, 8.5, 12);
    } else {
      const h0 = clamp(fh * 0.54, 104, 230);
      w = clamp(h0 * 1.05, 120, 158);
      font = clamp(h0 * 0.056, 7.5, 9);
      h = clamp(fh * 0.74, 150, 290);
    }
    w *= 1.1;   // 8.10.70: a tiny bit wider so the content can breathe (height and font unchanged)
    h = Math.min(h, Math.max(90, rootH - 16));
    w = Math.min(w, Math.max(110, rootW - 16));
    // 0.75 zoomed out (portrait / embedded), 1.00 in fullscreen 16:9, times the UI knob.
    const k = (big ? 1 : 0.75) * LGV_UI_SCALE;
    return { w: Math.round(w * k), h: Math.round(h * k), font: font * k };
  }

  // ---- General settings persistence ----
  // Unlike pause-intent above (deliberately keyed per episode path), these
  // are meant to survive a refresh AND carry over to the next episode -
  // panel position, the quality lock, tab choice - so they're keyed by
  // hostname only, not the full path.
  function settingsKey(name) {
    return 'lgv-setting:' + location.hostname + ':' + name;
  }
  function saveSetting(name, value) {
    try { localStorage.setItem(settingsKey(name), JSON.stringify(value)); } catch (e) {}
  }
  function loadSetting(name, fallback) {
    try {
      const raw = localStorage.getItem(settingsKey(name));
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function clearSetting(name) {
    try { localStorage.removeItem(settingsKey(name)); } catch (e) {}
  }
  // Is this element actually rendered right now (not display:none /
  // visibility:hidden / detached)? Used before reading text off of a guessed
  // subtitle/caption element, so a closed menu never gets mistaken for one.
  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    if (el.offsetParent === null && cs.position !== 'fixed') return false;
    return true;
  }

  // Plain el.click() only ever fires a 'click' event. That's enough for a
  // simple <button onclick>, but a lot of custom-built menus (quality
  // pickers, server/source lists) are components that open/select on
  // pointerdown or mousedown instead, and never see a bare click. Firing
  // the full realistic sequence covers both kinds of listener.
  // ===================== Quality engine =====================
  // Every way we know to change a video's quality, tried in order and each
  // one checked against the real picture. Hooks start at document-start so
  // players the page builds later (hls.js) can be captured as they appear.
  const lgvHooks = { hls: [], manifests: [] };

  (function installPlayerHooks() {
    const wrapped = new WeakSet();
    const wrapHls = (Ctor) => {
      if (typeof Ctor !== 'function' || wrapped.has(Ctor)) return Ctor;
      try {
        const proxy = new Proxy(Ctor, {
          construct(target, args, newTarget) {
            const inst = Reflect.construct(target, args, newTarget);
            try {
              lgvHooks.hls.push(inst);
              if (lgvHooks.hls.length > 8) lgvHooks.hls.shift();
            } catch (e) {}
            return inst;
          }
        });
        wrapped.add(proxy);
        wrapped.add(Ctor);
        return proxy;
      } catch (e) { return Ctor; }
    };
    try {
      let current = window.Hls;
      if (current) {
        try { window.Hls = wrapHls(current); } catch (e) {}
      } else {
        Object.defineProperty(window, 'Hls', {
          configurable: true,
          enumerable: true,
          get() { return current; },
          set(v) { current = wrapHls(v); }
        });
      }
    } catch (e) {}
    // Remember every stream playlist the page asks for. The browser's own
    // resource list only keeps the first ~250 requests, so a playlist
    // loaded at the start would be gone by the time you pick a quality.
    try {
      new PerformanceObserver((list) => {
        list.getEntries().forEach(e => {
          if (/\.(m3u8|mpd)(\?|#|$)/i.test(e.name) && !lgvHooks.manifests.includes(e.name)) {
            lgvHooks.manifests.push(e.name);
            if (lgvHooks.manifests.length > 30) lgvHooks.manifests.shift();
          }
        });
      }).observe({ type: 'resource', buffered: true });
    } catch (e) {}
  })();

  const qNorm = (l) => String(l == null ? '' : l).toLowerCase().replace(/\s+/g, '');
  const qIsAuto = (l) => /^auto/.test(qNorm(l));
  function heightLabel(h) {
    if (!h) return null;
    const buckets = [2160, 1440, 1080, 720, 576, 480, 360, 240, 144];
    let best = null, bestD = 1;
    buckets.forEach(b => { const d = Math.abs(h - b) / b; if (d < bestD) { bestD = d; best = b; } });
    if (best && bestD <= 0.12) return best >= 2160 ? '4K / 2160p' : best + 'p';
    return h + 'p';
  }
  function qSame(a, b) {
    if (qIsAuto(a) || qIsAuto(b)) return qIsAuto(a) && qIsAuto(b);
    const ha = qualityHeight(a), hb = qualityHeight(b);
    if (ha && hb) return ha === hb;
    return qNorm(a) === qNorm(b);
  }
  // Does the picture's height match a quality label (allowing for cropped
  // widescreen and rounding)?
  const qMatches = (vh, target) => !!(target && vh && Math.abs(vh - target) <= Math.max(24, target * 0.12));
  // Height OR width fits the label, so cropped widescreen (e.g. 1920x800 for
  // 1080p) still counts, while a 854x480 picture can never pass for 1080p.
  const qPicMatches = (vw, vh, target) => qMatches(vh, target) || (!!vw && qMatches(vw, Math.round(target * 16 / 9)));

  // ---- adapters: one small wrapper per kind of player ----
  function levelsFrom(labels) {
    const seen = new Set();
    const out = [{ label: 'Auto' }];
    labels.forEach(l => { if (l && !seen.has(l)) { seen.add(l); out.push({ label: l }); } });
    return out;
  }
  function jwAdapter(p) {
    return {
      name: 'JW Player',
      levels() { return (p.getQualityLevels() || []).map(x => ({ label: x.label })); },
      current() { const l = p.getQualityLevels() || []; const x = l[p.getCurrentQuality()]; return x ? x.label : null; },
      set(label) {
        const l = p.getQualityLevels() || [];
        const i = l.findIndex(x => qSame(x.label, label));
        if (i < 0) return false;
        p.setCurrentQuality(i);
        return true;
      }
    };
  }
  // Keeps a picked hls.js quality. Segments buffered before the pick (or
  // re-fetched at a lower level by the site) used to show up as short blurry
  // bits inside the sharp picture. When one starts playing, or the level is
  // reset by someone else, the pick is applied again, which flushes the buffer
  // and reloads at the picked level. At most 3 fixes in 20 s, then it stops so
  // it can never fight the site; picking Auto or a new manifest lifts the pin.
  function pinGuard(h) {
    if (h.__lgvGuard || typeof h.on !== 'function') return;
    const g = h.__lgvGuard = { fixes: [] };
    const repin = () => {
      try {
        const pin = h.__lgvPin;
        const now = Date.now();
        if (pin == null || now < (h.__lgvQuietUntil || 0)) return;
        g.fixes = g.fixes.filter(t => now - t < 20000);
        if (g.fixes.length >= 3) { h.__lgvPin = null; return; }
        g.fixes.push(now);
        h.__lgvQuietUntil = now + 3500;
        try { h.autoLevelCapping = -1; } catch (e) {}
        h.currentLevel = pin;
      } catch (e) {}
    };
    try {
      h.on('hlsFragChanged', (_e, d) => {
        try {
          const f = d && d.frag;
          if (h.__lgvPin == null || !f || (f.type && f.type !== 'main')) return;
          if (f.level != null && f.level !== h.__lgvPin) repin();
        } catch (e) {}
      });
      h.on('hlsLevelSwitching', (_e, d) => {
        try { if (h.__lgvPin != null && d && d.level != null && d.level !== h.__lgvPin) setTimeout(repin, 50); } catch (e) {}
      });
      h.on('hlsManifestParsed', () => { h.__lgvPin = null; });
    } catch (e) {}
  }
  function hlsAdapter(h) {
    const lv = () => (h.levels || []).map((l, i) => ({
      l, i, label: heightLabel(l.height) || (l.bitrate ? Math.round(l.bitrate / 1000) + 'kbps' : 'Level ' + (i + 1))
    }));
    return {
      name: 'hls.js',
      levels() { return levelsFrom(lv().sort((a, b) => (b.l.height || 0) - (a.l.height || 0)).map(x => x.label)); },
      current() {
        if (h.autoLevelEnabled || h.currentLevel === -1) return 'Auto';
        const x = lv()[h.currentLevel];
        return x ? x.label : null;
      },
      set(label) {
        if (qIsAuto(label)) {
          h.__lgvPin = null;
          h.currentLevel = -1;
          try { h.autoLevelCapping = -1; } catch (e) {}
          return true;
        }
        const m = lv().filter(x => qSame(x.label, label)).sort((a, b) => (b.l.bitrate || 0) - (a.l.bitrate || 0));
        if (!m.length) return false;
        const idx = m[0].i;
        h.__lgvPin = idx;
        // Short quiet window so pinGuard doesn't immediately fight the switch
        h.__lgvQuietUntil = Date.now() + 1800;
        pinGuard(h);
        try { h.autoLevelCapping = -1; } catch (e) {}
        try { h.nextLevel = idx; } catch (e) {}
        try { h.loadLevel = idx; } catch (e) {}
        h.currentLevel = idx;
        // Quiet flush only — never seek (seeking made the picture dance).
        try { quietBufferFlush(h); } catch (e) {}
        return true;
      }
    };
  }

  // Quiet buffer clear only — NO seeking. The seek-jump cycle made the video
  // dance; hls.js level change + BUFFER_FLUSHING + SourceBuffer.remove is enough
  // to drop old segments without touching currentTime.
  function quietBufferFlush(h) {
    if (!h) return;
    const v = h.media;
    const t = (v && isFinite(v.currentTime)) ? v.currentTime : 0;
    try { h.stopLoad?.(); } catch (e) {}
    try {
      const H = window.Hls;
      if (H && H.Events && typeof h.trigger === 'function') {
        h.trigger(H.Events.BUFFER_FLUSHING, {
          startOffset: 0,
          endOffset: Number.POSITIVE_INFINITY
        });
      }
    } catch (e) {}
    try {
      const candidates = [];
      try {
        const bc = h.bufferController;
        if (bc) {
          if (bc.sourceBuffer) {
            ['video', 'audio', 'audiovideo'].forEach(k => {
              if (bc.sourceBuffer[k]) candidates.push(bc.sourceBuffer[k]);
            });
          }
          if (bc.sourceBuffers) {
            Object.keys(bc.sourceBuffers).forEach(k => {
              if (bc.sourceBuffers[k]) candidates.push(bc.sourceBuffers[k]);
            });
          }
        }
      } catch (e) {}
      try {
        const ms = h.mediaSource;
        if (ms && ms.sourceBuffers) {
          for (let i = 0; i < ms.sourceBuffers.length; i++)
            candidates.push(ms.sourceBuffers[i]);
        }
      } catch (e) {}
      const dur = (v && isFinite(v.duration) && v.duration > 0) ? v.duration : null;
      for (const sb of candidates) {
        if (!sb || sb.updating) continue;
        try {
          if (sb.buffered && sb.buffered.length) {
            const end = dur != null ? dur : sb.buffered.end(sb.buffered.length - 1);
            sb.remove(0, end + 0.1);
          }
        } catch (e) {}
      }
    } catch (e) {}
    try { h.startLoad?.(t); } catch (e) {}
  }

  function shakaAdapter(p) {
    const tracks = () => (p.getVariantTracks() || []);
    return {
      name: 'Shaka',
      levels() { return levelsFrom(tracks().sort((a, b) => (b.height || 0) - (a.height || 0)).map(t => heightLabel(t.height))); },
      current() {
        try { if (p.getConfiguration().abr.enabled) return 'Auto'; } catch (e) {}
        const t = tracks().find(x => x.active);
        return t ? heightLabel(t.height) : null;
      },
      set(label) {
        if (qIsAuto(label)) { p.configure({ abr: { enabled: true } }); return true; }
        const m = tracks().filter(t => qSame(heightLabel(t.height), label)).sort((a, b) => (b.bandwidth || 0) - (a.bandwidth || 0));
        if (!m.length) return false;
        p.configure({ abr: { enabled: false } });
        p.selectVariantTrack(m[0], true);
        return true;
      }
    };
  }
  function dashAdapter(p) {
    const reps = () => {
      try {
        if (typeof p.getRepresentationsByType === 'function') {
          const r = p.getRepresentationsByType('video') || [];
          if (r.length) return r.map(x => ({ h: x.height, id: x.id, bw: x.bandwidth || 0, idx: x.absoluteIndex }));
        }
      } catch (e) {}
      try {
        return (p.getBitrateInfoListFor('video') || []).map(x => ({ h: x.height, idx: x.qualityIndex, bw: x.bitrate || 0 }));
      } catch (e) {}
      return [];
    };
    const setAuto = (on) => {
      try { p.updateSettings({ streaming: { abr: { autoSwitchBitrate: { video: on } } } }); }
      catch (e) { try { p.setAutoSwitchQualityFor('video', on); } catch (e2) {} }
    };
    return {
      name: 'dash.js',
      levels() { return levelsFrom(reps().sort((a, b) => (b.h || 0) - (a.h || 0)).map(x => heightLabel(x.h))); },
      current() {
        try { if (p.getSettings().streaming.abr.autoSwitchBitrate.video) return 'Auto'; } catch (e) {}
        try { const c = p.getCurrentRepresentationForType('video'); if (c) return heightLabel(c.height); } catch (e) {}
        try { const i = p.getQualityFor('video'); const r = reps().find(x => x.idx === i); return r ? heightLabel(r.h) : null; } catch (e) {}
        return null;
      },
      set(label) {
        if (qIsAuto(label)) { setAuto(true); return true; }
        const m = reps().filter(x => qSame(heightLabel(x.h), label)).sort((a, b) => b.bw - a.bw);
        if (!m.length) return false;
        setAuto(false);
        if (typeof p.setRepresentationForTypeById === 'function' && m[0].id != null) p.setRepresentationForTypeById('video', m[0].id, true);
        else p.setQualityFor('video', m[0].idx);
        return true;
      }
    };
  }
  function vjsAdapter(p) {
    const lab = (q, i) => q.label || heightLabel(q.height) || ('Level ' + (i + 1));
    return {
      name: 'video.js',
      levels() {
        const q = p.qualityLevels(); const l = [];
        for (let i = 0; i < q.length; i++) l.push(lab(q[i], i));
        return levelsFrom(l);
      },
      current() {
        const q = p.qualityLevels(); const on = [];
        for (let i = 0; i < q.length; i++) if (q[i].enabled) on.push(lab(q[i], i));
        if (on.length === q.length) return 'Auto';
        return on.length === 1 ? on[0] : null;
      },
      set(label) {
        const q = p.qualityLevels();
        if (qIsAuto(label)) { for (let i = 0; i < q.length; i++) q[i].enabled = true; return true; }
        let hit = false;
        for (let i = 0; i < q.length; i++) { const m = qSame(lab(q[i], i), label); q[i].enabled = m; if (m) hit = true; }
        if (!hit) for (let i = 0; i < q.length; i++) q[i].enabled = true;
        return hit;
      }
    };
  }
  function plyrAdapter(p) {
    const opts = () => ((p.config && p.config.quality && p.config.quality.options) || []).filter(n => +n > 0);
    return {
      name: 'Plyr',
      levels() { return opts().map(n => ({ label: heightLabel(+n) })); },
      current() { return heightLabel(+p.quality); },
      set(label) {
        const h = qualityHeight(label);
        if (!h) return false;
        const n = opts().find(x => heightLabel(+x) === heightLabel(h));
        if (!n) return false;
        p.quality = +n;
        return true;
      }
    };
  }
  function vidstackAdapter(el) {
    const labelOf = (q) => heightLabel(q.height) || (q.bitrate ? Math.round(q.bitrate / 1000) + 'kbps' : 'Level');
    return {
      name: 'Vidstack',
      levels() { const q = el.qualities; const l = []; for (let i = 0; i < q.length; i++) l.push(labelOf(q[i])); return levelsFrom(l); },
      current() { const q = el.qualities; if (q.auto) return 'Auto'; return q.selected ? labelOf(q.selected) : null; },
      set(label) {
        const q = el.qualities;
        if (qIsAuto(label)) { if (typeof q.autoSelect === 'function') q.autoSelect(); return true; }
        for (let i = 0; i < q.length; i++) if (qSame(labelOf(q[i]), label)) { q[i].selected = true; return true; }
        return false;
      }
    };
  }

  // Looks through the page's objects for live players (hls.js, JW, Shaka,
  // dash.js, video.js, Plyr). Reads plain data properties only, so it can't
  // trigger anything on the page, and stops after a fixed amount of work.
  function deepFindPlayers(video) {
    const found = { hls: [], jw: [], shaka: [], dash: [], vjs: [], plyr: [] };
    const seen = new WeakSet();
    let budget = 9000;
    const add = (k, o) => { if (!found[k].includes(o)) found[k].push(o); };
    const classify = (o) => {
      try {
        if (typeof o.getQualityLevels === 'function' && typeof o.setCurrentQuality === 'function') add('jw', o);
        if (Array.isArray(o.levels) && ('currentLevel' in o) && ('nextLevel' in o || 'loadLevel' in o)) add('hls', o);
        if (typeof o.getVariantTracks === 'function' && typeof o.selectVariantTrack === 'function') add('shaka', o);
        if (typeof o.getBitrateInfoListFor === 'function' || typeof o.getRepresentationsByType === 'function') add('dash', o);
        if (typeof o.qualityLevels === 'function' && typeof o.src === 'function') add('vjs', o);
        if (o.config && o.config.quality && ('quality' in o) && typeof o.destroy === 'function') add('plyr', o);
      } catch (e) {}
    };
    const isNode = (o) => typeof Node !== 'undefined' && o instanceof Node;
    const walk = (o, depth) => {
      if (!o || budget <= 0 || typeof o !== 'object') return;
      if (seen.has(o)) return;
      seen.add(o);
      budget--;
      try { if (o === window || o === document || o.window === o) return; } catch (e) { return; }
      if (isNode(o)) return;
      classify(o);
      if (depth <= 0) return;
      let keys;
      try { keys = Reflect.ownKeys(o); } catch (e) { return; }
      if (keys.length > 400) keys = keys.slice(0, 400);
      for (const k of keys) {
        let d;
        try { d = Object.getOwnPropertyDescriptor(o, k); } catch (e) { continue; }
        if (d && ('value' in d)) walk(d.value, depth - 1);
      }
    };
    const walkFiber = (fiber) => {
      let f = fiber, n = 0;
      while (f && n++ < 30) {
        try { walk(f.memoizedProps, 3); } catch (e) {}
        try { if (f.stateNode && !isNode(f.stateNode)) walk(f.stateNode, 2); } catch (e) {}
        try {
          let h = f.memoizedState, c = 0;
          while (h && c++ < 40) { walk(h.memoizedState, 3); h = h.next; }
        } catch (e) {}
        f = f.return;
      }
    };
    // 1) the video element and its ancestors: plain expando properties and
    //    React internals
    let el = video;
    for (let i = 0; i < 8 && el; i++, el = el.parentElement) {
      let ks = [];
      try { ks = Reflect.ownKeys(el); } catch (e) {}
      for (const k of ks) {
        let d;
        try { d = Object.getOwnPropertyDescriptor(el, k); } catch (e) { continue; }
        if (!d || !('value' in d)) continue;
        if (/^__reactFiber\$|^__reactContainer\$/.test(String(k))) walkFiber(d.value);
        else if (/^__reactProps\$/.test(String(k))) walk(d.value, 3);
        else walk(d.value, 3);
      }
    }
    // 2) instances captured as the page built them
    lgvHooks.hls.forEach(h => { seen.add(h); classify(h); });
    // 3) the page's global objects
    try {
      // Names that sound like players first, so a big unrelated global
      // can't use up the search budget before they're reached
      const names = Object.getOwnPropertyNames(window);
      const hot = /player|video|hls|jw|plyr|shaka|dash|media|stream|source|clappr|art|dp$/i;
      const ordered = names.filter(k => hot.test(k)).concat(names.filter(k => !hot.test(k)));
      for (const k of ordered) {
        let d;
        try { d = Object.getOwnPropertyDescriptor(window, k); } catch (e) { continue; }
        if (d && ('value' in d)) walk(d.value, 4);
        if (budget <= 0) break;
      }
    } catch (e) {}
    return found;
  }

  function discoverQualityAdapters(video) {
    const out = [];
    // JW Player
    try {
      if (typeof window.jwplayer === 'function') {
        const box = video.closest ? video.closest('.jwplayer') : null;
        const tries = [];
        if (box) { tries.push(() => window.jwplayer(box)); if (box.id) tries.push(() => window.jwplayer(box.id)); }
        tries.push(() => window.jwplayer());
        for (const t of tries) {
          try {
            const p = t();
            if (!p || typeof p.getQualityLevels !== 'function') continue;
            const lv = p.getQualityLevels();
            if (lv && lv.length > 1) { out.push(jwAdapter(p)); break; }
          } catch (e) {}
        }
      }
    } catch (e) {}
    // Vidstack / media-chrome style element
    try {
      const vs = (video.closest && video.closest('media-player')) || document.querySelector('media-player');
      if (vs && vs.qualities && vs.qualities.length) out.push(vidstackAdapter(vs));
    } catch (e) {}
    // everything else, found by looking at the page's objects
    let f = { hls: [], jw: [], shaka: [], dash: [], vjs: [], plyr: [] };
    try { f = deepFindPlayers(video); } catch (e) {}
    f.jw.forEach(p => { try { if ((p.getQualityLevels() || []).length > 1 && !out.some(a => a.name === 'JW Player')) out.push(jwAdapter(p)); } catch (e) {} });
    f.hls.sort((a, b) => ((b.media === video) - (a.media === video)))
      .forEach(h => { try { if (h.levels && h.levels.length) out.push(hlsAdapter(h)); } catch (e) {} });
    f.shaka.forEach(p => { try { if (p.getVariantTracks().length) out.push(shakaAdapter(p)); } catch (e) {} });
    f.dash.forEach(p => { try { out.push(dashAdapter(p)); } catch (e) {} });
    try {
      if (window.videojs && typeof window.videojs.getPlayers === 'function') {
        Object.values(window.videojs.getPlayers() || {}).forEach(p => { if (p) add_vjs(p); });
      }
    } catch (e) {}
    function add_vjs(p) { try { if (typeof p.qualityLevels === 'function' && p.qualityLevels().length) out.push(vjsAdapter(p)); } catch (e) {} }
    f.vjs.forEach(add_vjs);
    f.plyr.forEach(p => { try { out.push(plyrAdapter(p)); } catch (e) {} });
    return out.filter(a => { try { return a.levels().length > 0; } catch (e) { return false; } });
  }

  // ---- stream playlists: last resort that doesn't need the player ----
  async function findMasterVariants() {
    const fromPerf = (performance.getEntriesByType('resource') || []).map(e => e.name);
    const all = lgvHooks.manifests.concat(fromPerf).filter(n => /\.m3u8(\?|#|$)/i.test(n));
    const uniq = Array.from(new Set(all.reverse())).slice(0, 10);
    for (const u of uniq) {
      try {
        const r = await fetch(u, { credentials: 'include' });
        if (!r.ok) continue;
        const txt = await r.text();
        if (!/#EXT-X-STREAM-INF/.test(txt)) continue;
        const lines = txt.split(/\r?\n/);
        const variants = [];
        for (let i = 0; i < lines.length; i++) {
          if (!lines[i].startsWith('#EXT-X-STREAM-INF')) continue;
          const res = /RESOLUTION=(\d+)x(\d+)/i.exec(lines[i]);
          const bw = /BANDWIDTH=(\d+)/i.exec(lines[i]);
          let j = i + 1;
          while (j < lines.length && (!lines[j].trim() || lines[j].startsWith('#'))) j++;
          if (lines[j]) variants.push({ url: new URL(lines[j].trim(), u).href, height: res ? +res[2] : 0, bandwidth: bw ? +bw[1] : 0 });
        }
        if (variants.length) return { master: u, variants };
      } catch (e) {}
    }
    return null;
  }

  // ===================== Download + video info (8.10.129) =====================
  // Works from what the page itself already uses: a plain file URL, or an HLS playlist (.m3u8). HLS is
  // downloaded segment by segment (parallel, with retries, AES-128 decryption, fMP4 init segments, byte
  // ranges), then saved as MP4 (converted with mux.js when it can be loaded) or as the raw .ts.
  // Nothing here touches subtitles.
  const LGV_VERSION = '8.10.151';
  const dlSleep = (ms) => new Promise(r => setTimeout(r, ms));
  const dlAbs = (u, base) => { try { return new URL(u, base).href; } catch (e) { return u; } };
  const dlMB = (n) => (n / 1048576).toFixed(n > 104857600 ? 0 : 1) + ' MB';
  function dlSafeName(s) {
    return String(s || 'video').replace(/[\\\/:*?"<>|\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110) || 'video';
  }
  function dlPageTitle() {
    let t = '';
    try { t = window.top.document.title; } catch (e) {}
    if (!t) t = document.title || '';
    return t.replace(/^\s*watch\s+/i, '').trim();
  }
  function dlAttrs(s) {
    const o = {}; const re = /([A-Z0-9-]+)=("([^"]*)"|[^,]*)/g; let m;
    while ((m = re.exec(s))) o[m[1]] = m[3] !== undefined ? m[3] : m[2];
    return o;
  }
  function dlRange(str, prevEnd) {
    const p = String(str).split('@'); const len = +p[0]; const off = p[1] !== undefined ? +p[1] : (prevEnd || 0);
    return [off, off + len - 1];
  }
  function dlParseMaster(txt, base) {
    const lines = txt.split(/\r?\n/); const variants = []; const audio = {};
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith('#EXT-X-MEDIA:')) {
        const a = dlAttrs(l.slice(13));
        if (a.TYPE === 'AUDIO') (audio[a['GROUP-ID']] = audio[a['GROUP-ID']] || []).push({ uri: a.URI ? dlAbs(a.URI, base) : null, name: a.NAME || '', def: a.DEFAULT === 'YES', lang: a.LANGUAGE || '' });
      } else if (l.startsWith('#EXT-X-STREAM-INF:')) {
        const a = dlAttrs(l.slice(18)); let j = i + 1;
        while (j < lines.length && (!lines[j].trim() || lines[j].startsWith('#'))) j++;
        if (!lines[j]) continue;
        const res = /(\d+)x(\d+)/.exec(a.RESOLUTION || '');
        variants.push({ url: dlAbs(lines[j].trim(), base), height: res ? +res[2] : 0, width: res ? +res[1] : 0, bandwidth: +(a['AVERAGE-BANDWIDTH'] || a.BANDWIDTH || 0), codecs: a.CODECS || '', audioGroup: a.AUDIO || '' });
      }
    }
    return { variants, audio };
  }

  function dlFlattenAudio(parsed) {
    const out = [], seen = new Set();
    if (!parsed || !parsed.audio) return out;
    Object.keys(parsed.audio).forEach(gid => {
      (parsed.audio[gid] || []).forEach((a, i) => {
        if (!a.uri) return;
        const lang = (a.lang || '').toLowerCase();
        const name = a.name || a.lang || ('Audio ' + (out.length + 1));
        // Unique id: lang + name + short uri tail (avoids "eng" colliding across groups)
        const tail = String(a.uri).split('/').pop().slice(0, 24).toLowerCase();
        const id = [lang || 'und', name.toLowerCase().replace(/\s+/g, '-').slice(0, 24), tail].filter(Boolean).join('|');
        const key = a.uri;
        if (seen.has(key)) return;
        seen.add(key);
        out.push({ id, name, lang: a.lang || '', uri: a.uri, def: !!a.def, group: gid });
      });
    });
    return out;
  }
  function dlAudioPrefGet() {
    try { return localStorage.getItem('lgv-audio-pref') || ''; } catch (e) { return ''; }
  }
  function dlAudioPrefSet(id) {
    try { if (id) localStorage.setItem('lgv-audio-pref', id); else localStorage.removeItem('lgv-audio-pref'); } catch (e) {}
  }
  function dlPickAudio(tracks, pref) {
    if (!tracks || !tracks.length) return null;
    const p = String(pref || '').toLowerCase().trim();
    if (p) {
      let hit = tracks.find(t => t.id === p || String(t.id).toLowerCase() === p);
      if (hit) return hit;
      hit = tracks.find(t => t.uri && t.uri === pref);
      if (hit) return hit;
      hit = tracks.find(t => t.lang && t.lang.toLowerCase() === p);
      if (hit) return hit;
      hit = tracks.find(t => t.name && t.name.toLowerCase() === p);
      if (hit) return hit;
      hit = tracks.find(t =>
        (t.name && t.name.toLowerCase().indexOf(p) >= 0) ||
        (t.lang && p.indexOf(t.lang.toLowerCase()) >= 0) ||
        (t.id && String(t.id).toLowerCase().indexOf(p) >= 0)
      );
      if (hit) return hit;
    }
    return tracks.find(t => t.def) || tracks[0];
  }
  async function dlDiscoverAudioTracks(video) {
    const tracks = [], seen = new Set();
    const add = (t) => {
      if (!t || !t.uri) return;
      const key = t.uri;
      if (seen.has(key)) return;
      seen.add(key);
      const lang = (t.lang || '').toLowerCase();
      const name = t.name || t.lang || ('Audio ' + (tracks.length + 1));
      const tail = String(t.uri).split('/').pop().slice(0, 24).toLowerCase();
      const id = t.id || [lang || 'und', name.toLowerCase().replace(/\s+/g, '-').slice(0, 24), tail].filter(Boolean).join('|');
      tracks.push({
        id, name, lang: t.lang || '', uri: t.uri,
        def: !!t.def, group: t.group || '', hlsIndex: (typeof t.hlsIndex === 'number' ? t.hlsIndex : -1)
      });
    };
    // 1) hls.js instances (live player)
    try {
      const f = deepFindPlayers(video);
      (f.hls || []).concat(lgvHooks.hls || []).forEach(h => {
        try {
          if (!h || !h.audioTracks) return;
          for (let i = 0; i < h.audioTracks.length; i++) {
            const t = h.audioTracks[i];
            let uri = t.url || t.uri || '';
            // Some builds keep the playlist on the track details object
            if (!uri && t.details && t.details.url) uri = t.details.url;
            if (!uri) continue;
            add({
              id: null,
              name: t.name || t.label || t.lang || ('Audio ' + (i + 1)),
              lang: t.lang || t.language || '',
              uri, def: !!t.default, group: t.groupId || '', hlsIndex: i
            });
          }
        } catch (e) {}
      });
    } catch (e) {}
    // 2) Master playlists (EXT-X-MEDIA TYPE=AUDIO) — most reliable URI source
    const masters = [];
    const addM = (u) => { if (u && !masters.includes(u)) masters.push(u); };
    try {
      (lgvHooks.manifests || []).forEach(addM);
      (performance.getEntriesByType('resource') || []).forEach(e => {
        if (/\.m3u8(\?|#|$)/i.test(e.name)) addM(e.name);
      });
      const f = deepFindPlayers(video);
      (f.hls || []).concat(lgvHooks.hls || []).forEach(h => {
        try {
          addM(h.url || h.originalUrl || (h.config && h.config.url));
          if (h.levels) h.levels.forEach(l => {
            const u = l.url;
            if (typeof u === 'string') addM(u);
            else if (Array.isArray(u)) u.forEach(addM);
          });
        } catch (e) {}
      });
      try {
        const src = (video && (video.currentSrc || video.src)) || '';
        if (/\.m3u8/i.test(src)) addM(src);
      } catch (e) {}
    } catch (e) {}
    for (const u of masters.slice(0, 10)) {
      try {
        const txt = await dlFetchText(u, new AbortController().signal);
        if (!/#EXT-X-MEDIA:/i.test(txt) && !/#EXT-X-STREAM-INF/i.test(txt)) continue;
        dlFlattenAudio(dlParseMaster(txt, u)).forEach(add);
      } catch (e) {}
    }
    // Prefer default first in list order for UI
    tracks.sort((a, b) => (b.def ? 1 : 0) - (a.def ? 1 : 0));
    return tracks;
  }

  async function dlMergeAvTs(videoParts, audioParts, signal) {
    const toPackets = async (parts) => {
      const pk = [];
      for (const b of parts) {
        if (signal && signal.aborted) throw new Error('cancelled');
        let u = new Uint8Array(await b.arrayBuffer());
        let off = 0;
        while (off < u.length && u[off] !== 0x47) off++;
        if (off) u = u.subarray(off);
        const n = Math.floor(u.length / 188) * 188;
        for (let i = 0; i + 188 <= n; i += 188) pk.push(u.subarray(i, i + 188));
      }
      return pk;
    };
    const vPk = await toPackets(videoParts);
    const aPk = await toPackets(audioParts);
    if (!vPk.length) throw new Error('no video TS packets');
    if (!aPk.length) return { blob: new Blob(videoParts, { type: 'video/mp2t' }), parts: videoParts };
    const out = [];
    let vi = 0, ai = 0;
    const vPerA = Math.max(1, Math.round(vPk.length / Math.max(1, aPk.length)));
    while (vi < vPk.length || ai < aPk.length) {
      for (let k = 0; k < vPerA && vi < vPk.length; k++, vi++) out.push(vPk[vi]);
      if (ai < aPk.length) out.push(aPk[ai++]);
    }
    const blobs = [];
    const chunk = 8000;
    for (let i = 0; i < out.length; i += chunk) {
      const slice = out.slice(i, i + chunk);
      const buf = new Uint8Array(slice.length * 188);
      for (let j = 0; j < slice.length; j++) buf.set(slice[j], j * 188);
      blobs.push(buf);
    }
    const mergedParts = blobs.map(b => new Blob([b], { type: 'video/mp2t' }));
    return { blob: new Blob(blobs, { type: 'video/mp2t' }), parts: mergedParts };
  }

  function dlParseMedia(txt, base) {
    const lines = txt.split(/\r?\n/); let seq = 0, key = null, map = null, dur = 0, br = null, endlist = false;
    const lastEnd = {}; const segs = [];
    for (const raw of lines) {
      const l = raw.trim(); if (!l) continue;
      if (l.charAt(0) === '#') {
        if (l.startsWith('#EXT-X-MEDIA-SEQUENCE:')) seq = parseInt(l.split(':')[1], 10) || 0;
        else if (l.startsWith('#EXT-X-KEY:')) {
          const a = dlAttrs(l.slice(11));
          key = (!a.METHOD || a.METHOD === 'NONE') ? null : { method: a.METHOD, uri: a.URI ? dlAbs(a.URI, base) : null, iv: a.IV || null };
        } else if (l.startsWith('#EXT-X-MAP:')) {
          const a = dlAttrs(l.slice(11));
          map = { url: dlAbs(a.URI, base), range: a.BYTERANGE ? dlRange(a.BYTERANGE, 0) : null };
        } else if (l.startsWith('#EXTINF:')) dur = parseFloat(l.slice(8)) || 0;
        else if (l.startsWith('#EXT-X-BYTERANGE:')) br = l.slice(17);
        else if (l === '#EXT-X-ENDLIST') endlist = true;
        continue;
      }
      const url = dlAbs(l, base); let range = null;
      if (br) { range = dlRange(br, lastEnd[url]); lastEnd[url] = range[1] + 1; br = null; }
      segs.push({ url, dur, range, key, seq: seq + segs.length }); dur = 0;
    }
    return { segs, map, endlist };
  }
  async function dlFetchText(url, signal) {
    const r = await fetch(url, { signal });
    if (!r.ok) throw new Error('HTTP ' + r.status + ' for the playlist');
    return r.text();
  }
  async function dlFetchBuf(url, range, signal, tries) {
    // 8.10.148: every attempt has a hard timeout (a hung request used to freeze the download on the last part)
    let err;
    for (let i = 0; i < (tries || 5); i++) {
      if (signal && signal.aborted) throw new Error('cancelled');
      const ac = new AbortController();
      const onAbort = () => { try { ac.abort(); } catch (e) {} };
      if (signal) signal.addEventListener('abort', onAbort);
      const timer = setTimeout(onAbort, 40000);
      try {
        const r = await fetch(url, { signal: ac.signal, headers: range ? { Range: 'bytes=' + range[0] + '-' + range[1] } : undefined });
        if (!r.ok && r.status !== 206) throw new Error('HTTP ' + r.status);
        return await r.arrayBuffer();
      } catch (e) {
        if (signal && signal.aborted) throw new Error('cancelled');
        err = e; await dlSleep(600 * (i + 1));
      } finally {
        clearTimeout(timer);
        if (signal) signal.removeEventListener('abort', onAbort);
      }
    }
    throw err;
  }
  function dlKeyData(key, seq, cache, signal) {
    if (key.method !== 'AES-128') throw new Error('This stream uses ' + key.method + ' encryption, which cannot be downloaded');
    if (!cache[key.uri]) {
      cache[key.uri] = dlFetchBuf(key.uri, null, signal).then(kb => crypto.subtle.importKey('raw', kb, { name: 'AES-CBC' }, false, ['decrypt']));
    }
    const iv = new Uint8Array(16);
    if (key.iv) {
      const hex = key.iv.replace(/^0x/i, '').padStart(32, '0');
      for (let i = 0; i < 16; i++) iv[i] = parseInt(hex.substr(i * 2, 2), 16);
    } else new DataView(iv.buffer).setUint32(12, seq >>> 0);
    return cache[key.uri].then(ck => ({ ck, iv }));
  }
  // Some hosts disguise segments as images: junk bytes (a fake picture header) sit in front of the real MPEG-TS
  // data. Find where the real packets start (0x47 every 188 bytes) and cut the junk off.
  function dlStripToTs(buf) {
    const u = new Uint8Array(buf); const n = u.length;
    if (n > 600 && u[0] === 0x47 && u[188] === 0x47 && u[376] === 0x47) return buf;
    const lim = Math.min(n - 565, 600000);
    for (let i = 0; i <= lim; i++) {
      if (u[i] === 0x47 && u[i + 188] === 0x47 && u[i + 376] === 0x47 && u[i + 564] === 0x47) {
        const len = Math.floor((n - i) / 188) * 188;
        return buf.slice(i, i + len);
      }
    }
    return buf;
  }

  // ---- MPEG-TS timestamp repair (8.10.132) ----
  // Streams often carry wild PTS/PCR (near 2^33, huge jumps). That makes players show a 13-hour
  // length and refuse to seek. Every segment is rewritten onto a continuous timeline that starts
  // near 0, driven ONLY by the playlist EXTINF durations (original PTS gaps are ignored when they
  // disagree with the playlist). Picture and sound bytes are not touched.
  const TS_WRAP = 8589934592;            // 2^33
  function dlTsRead33(u, i) {
    return ((u[i] >> 1) & 7) * 1073741824 + u[i + 1] * 4194304 + (u[i + 2] >> 1) * 32768 + u[i + 3] * 128 + (u[i + 4] >> 1);
  }
  function dlTsWrite33(u, i, nib, v) {
    v = ((v % TS_WRAP) + TS_WRAP) % TS_WRAP;
    const hi = Math.floor(v / 1073741824), lo = v % 1073741824;
    u[i] = (nib << 4) | ((hi & 7) << 1) | 1;
    u[i + 1] = (lo >>> 22) & 0xFF;
    u[i + 2] = (((lo >>> 15) & 0x7F) << 1) | 1;
    u[i + 3] = (lo >>> 7) & 0xFF;
    u[i + 4] = ((lo & 0x7F) << 1) | 1;
  }
  // Calls fn(kind, offsetOfField, value, hasDts?) for every PTS ('p'), DTS ('d') and PCR base ('c').
  function dlTsEach(u, fn) {
    const n = u.length;
    for (let o = 0; o + 188 <= n; o += 188) {
      if (u[o] !== 0x47) continue;
      const pusi = (u[o + 1] & 0x40) !== 0, afc = (u[o + 3] >> 4) & 3;
      let p = o + 4;
      if (afc & 2) {
        const afl = u[p];
        if (afl >= 7 && (u[p + 1] & 0x10)) {
          const base = u[p + 2] * 33554432 + u[p + 3] * 131072 + u[p + 4] * 512 + u[p + 5] * 2 + (u[p + 6] >> 7);
          fn('c', p + 2, base);
        }
        p += 1 + afl;
      }
      if (!(afc & 1) || !pusi || p + 19 > o + 188) continue;
      if (u[p] !== 0 || u[p + 1] !== 0 || u[p + 2] !== 1) continue;
      const sid = u[p + 3];
      if (!((sid >= 0xC0 && sid <= 0xEF) || sid === 0xBD)) continue;
      const fl = u[p + 7] >> 6;
      if (fl >= 2) fn('p', p + 9, dlTsRead33(u, p + 9), fl === 3);
      if (fl === 3) fn('d', p + 14, dlTsRead33(u, p + 14));
    }
  }
  function dlTsMin(u) {
    let mn = null;
    dlTsEach(u, (k, off, v) => { if (k === 'c') return; if (mn === null || v < mn) mn = v; });
    return mn;
  }
  function dlTsShift(u, delta) {
    dlTsEach(u, (k, off, v, hasDts) => {
      const nv = v + delta;
      if (k === 'p') dlTsWrite33(u, off, hasDts ? 3 : 2, nv);
      else if (k === 'd') dlTsWrite33(u, off, 1, nv);
      else {
        const b = ((nv % TS_WRAP) + TS_WRAP) % TS_WRAP;
        u[off] = Math.floor(b / 33554432) & 0xFF; u[off + 1] = Math.floor(b / 131072) & 0xFF;
        u[off + 2] = Math.floor(b / 512) & 0xFF; u[off + 3] = Math.floor(b / 2) & 0xFF;
        u[off + 4] = ((b % 2) << 7) | (u[off + 4] & 0x7F);
      }
    });
  }
  // blobs: stripped TS segments in order. durs: EXTINF seconds.
  // Always forces a continuous timeline from ~0 using playlist durations (ignores wild original PTS).
  // ---- fMP4 box helpers (fix insane durations / baseMediaDecodeTime) ----
  function dlU32(u, o) { return ((u[o] << 24) | (u[o + 1] << 16) | (u[o + 2] << 8) | u[o + 3]) >>> 0; }
  function dlW32(u, o, v) { v = v >>> 0; u[o] = v >>> 24; u[o + 1] = (v >>> 16) & 255; u[o + 2] = (v >>> 8) & 255; u[o + 3] = v & 255; }
  function dlW64(u, o, v) {
    // write 64-bit big-endian; v may exceed 2^32 for long files
    const hi = Math.floor(v / 4294967296) >>> 0;
    const lo = (v >>> 0);
    dlW32(u, o, hi); dlW32(u, o + 4, lo);
  }
  function dlBoxType(u, o) {
    return String.fromCharCode(u[o], u[o + 1], u[o + 2], u[o + 3]);
  }
  function dlWalkBoxes(u, cb, start, end) {
    let o = start || 0;
    const lim = end == null ? u.length : end;
    while (o + 8 <= lim) {
      let size = dlU32(u, o);
      const typ = dlBoxType(u, o + 4);
      let hdr = 8;
      if (size === 1) {
        if (o + 16 > lim) break;
        // 64-bit size — rare in HLS fragments
        const hi = dlU32(u, o + 8), lo = dlU32(u, o + 12);
        size = hi * 4294967296 + lo;
        hdr = 16;
      } else if (size === 0) size = lim - o;
      if (size < hdr || o + size > lim) break;
      cb(typ, o, size, hdr);
      o += size;
    }
  }
  function dlIsInitSeg(u) {
    let hasMoov = false, hasMoof = false;
    try {
      dlWalkBoxes(u, (typ) => { if (typ === 'moov') hasMoov = true; if (typ === 'moof') hasMoof = true; });
    } catch (e) {}
    return hasMoov && !hasMoof;
  }
  function dlMdhdTimescale(u) {
    let scale = 0;
    const visit = (typ, o, size, hdr) => {
      if (typ === 'mdhd' && !scale) {
        const ver = u[o + hdr];
        if (ver === 1) scale = dlU32(u, o + hdr + 20);
        else scale = dlU32(u, o + hdr + 12);
      } else if (typ === 'moov' || typ === 'trak' || typ === 'mdia' || typ === 'minf' || typ === 'stbl') {
        dlWalkBoxes(u, visit, o + hdr, o + size);
      }
    };
    try { dlWalkBoxes(u, visit); } catch (e) {}
    return scale || 0;
  }
  function dlSumDurs(durs) {
    return (durs || []).reduce((a, d) => a + (d > 0 && isFinite(d) ? d : 0), 0);
  }
  // mux.js writes the "unknown duration" placeholder 0xFFFFFFFF into mvhd/tkhd/mdhd. At a 90 kHz timescale
  // that is exactly 13:15:21 — the fake length players show. Write the real length (from the playlist) instead.
  function dlPatchMp4Duration(u, totalSec) {
    if (!(totalSec > 0) || !isFinite(totalSec)) return 0;
    let movieScale = 1000, n = 0;
    const put = (off, ver, scale) => {
      const v = Math.round(totalSec * scale);
      if (ver === 1) dlW64(u, off, v);
      else if (v <= 0xFFFFFFFF) dlW32(u, off, v);
      else return;
      n++;
    };
    const visit = (typ, o, size, hdr) => {
      const b = o + hdr;
      if (typ === 'mvhd') {
        const ver = u[b];
        movieScale = dlU32(u, ver === 1 ? b + 20 : b + 12) || movieScale;
        put(ver === 1 ? b + 24 : b + 16, ver, movieScale);
      } else if (typ === 'tkhd') {
        const ver = u[b];
        put(ver === 1 ? b + 28 : b + 20, ver, movieScale);
      } else if (typ === 'mdhd') {
        const ver = u[b];
        const sc = dlU32(u, ver === 1 ? b + 20 : b + 12) || 90000;
        put(ver === 1 ? b + 24 : b + 16, ver, sc);
      } else if (typ === 'mehd') {
        put(b + 4, u[b], movieScale);
      } else if (typ === 'moov' || typ === 'trak' || typ === 'mdia' || typ === 'mvex') {
        dlWalkBoxes(u, visit, b, o + size);
      }
    };
    try { dlWalkBoxes(u, visit); } catch (e) {}
    return n;
  }
  // ---- fragmented MP4 audio → progressive .m4a (moov + sample tables, moov first) so players can SEEK ----
  function dlBx(type, ...payloads) {
    let len = 8; for (const p of payloads) len += p.length;
    const b = new Uint8Array(len);
    dlW32(b, 0, len);
    for (let i = 0; i < 4; i++) b[4 + i] = type.charCodeAt(i);
    let o = 8; for (const p of payloads) { b.set(p, o); o += p.length; }
    return b;
  }
  function dlU32s(...v) { const b = new Uint8Array(v.length * 4); v.forEach((x, i) => dlW32(b, i * 4, x)); return b; }
  function dlCC(s) { return Uint8Array.from(s, c => c.charCodeAt(0)); }
  // full box: version/flags(0) + head words + flat list of u32
  function dlTbl(type, head, list) {
    const b = new Uint8Array(12 + head.length * 4 + list.length * 4);
    dlW32(b, 0, b.length);
    for (let i = 0; i < 4; i++) b[4 + i] = type.charCodeAt(i);
    let o = 12;
    for (const v of head) { dlW32(b, o, v); o += 4; }
    for (let i = 0; i < list.length; i++) { dlW32(b, o, list[i]); o += 4; }
    return b;
  }
  function dlM4aReadInit(u, moov, st) {
    const traks = [];
    dlWalkBoxes(u, (typ, o, size, hdr) => {
      if (typ === 'trak') traks.push({ o, size, hdr });
      else if (typ === 'mvex') {
        dlWalkBoxes(u, (t2, o2, s2, h2) => {
          if (t2 === 'trex') { const b = o2 + h2; st.trex[dlU32(u, b + 4)] = { dur: dlU32(u, b + 12), size: dlU32(u, b + 16) }; }
        }, o + hdr, o + size);
      }
    }, moov.o + moov.hdr, moov.o + moov.size);
    let pick = null;
    for (const tk of traks) {
      const info = { id: 0, handler: '', scale: 0, stsd: null };
      const walk = (typ, o, size, hdr) => {
        const b = o + hdr;
        if (typ === 'tkhd') info.id = dlU32(u, u[b] === 1 ? b + 20 : b + 12);
        else if (typ === 'mdhd') info.scale = dlU32(u, u[b] === 1 ? b + 20 : b + 12);
        else if (typ === 'hdlr') info.handler = dlBoxType(u, b + 8);
        else if (typ === 'stsd') info.stsd = u.slice(o, o + size);
        else if (typ === 'mdia' || typ === 'minf' || typ === 'stbl') dlWalkBoxes(u, walk, b, o + size);
      };
      dlWalkBoxes(u, walk, tk.o + tk.hdr, tk.o + tk.size);
      if (info.handler === 'soun' && (!pick || pick.handler !== 'soun')) pick = info;
      else if (!pick) pick = info;
    }
    if (pick && pick.stsd && pick.scale && !st.stsd) { st.stsd = pick.stsd; st.timescale = pick.scale; st.trackId = pick.id; }
  }
  function dlM4aReadMoof(u, moof, mdatStart, st) {
    dlWalkBoxes(u, (typ, o, size, hdr) => {
      if (typ !== 'traf') return;
      let tid = 0, defDur = 0, defSize = 0, cursor = mdatStart;
      dlWalkBoxes(u, (t2, o2, s2, h2) => {
        const b = o2 + h2;
        if (t2 === 'tfhd') {
          const fl = dlU32(u, b) & 0xFFFFFF;
          tid = dlU32(u, b + 4);
          let p = b + 8;
          if (fl & 0x1) p += 8;
          if (fl & 0x2) p += 4;
          const tx = st.trex[tid] || {};
          defDur = tx.dur || 0; defSize = tx.size || 0;
          if (fl & 0x8) { defDur = dlU32(u, p); p += 4; }
          if (fl & 0x10) { defSize = dlU32(u, p); p += 4; }
        } else if (t2 === 'trun') {
          if (st.trackId && tid && tid !== st.trackId) return;
          const fl = dlU32(u, b) & 0xFFFFFF;
          const cnt = dlU32(u, b + 4);
          let p = b + 8;
          if (fl & 0x1) { cursor = moof.o + (dlU32(u, p) | 0); p += 4; }
          if (fl & 0x4) p += 4;
          if (cursor < 0) return;
          const start = cursor, n0 = st.sizes.length;
          for (let i = 0; i < cnt; i++) {
            let d = defDur, s = defSize;
            if (fl & 0x100) { d = dlU32(u, p); p += 4; }
            if (fl & 0x200) { s = dlU32(u, p); p += 4; }
            if (fl & 0x400) p += 4;
            if (fl & 0x800) p += 4;
            st.durs.push(d); st.sizes.push(s); cursor += s;
          }
          if (cursor > u.length) { st.durs.length = n0; st.sizes.length = n0; return; }
          st.chunks.push(u.subarray(start, cursor));
        }
      }, o + hdr, o + size);
    }, moof.o + moof.hdr, moof.o + moof.size);
  }
  // blobs: init + fragments (or one blob holding all). Returns a Blob (audio/mp4) or null if it can't be done.
  async function dlFmp4ToM4a(blobs, signal, onProgress) {
    const st = { stsd: null, timescale: 0, trackId: 0, trex: {}, chunks: [], sizes: [], durs: [] };
    for (let bi = 0; bi < blobs.length; bi++) {
      if (signal && signal.aborted) throw new Error('cancelled');
      const u = new Uint8Array(await blobs[bi].arrayBuffer());
      const tops = [];
      dlWalkBoxes(u, (typ, o, size, hdr) => { tops.push({ typ, o, size, hdr }); });
      for (let k = 0; k < tops.length; k++) {
        const t = tops[k];
        if (t.typ === 'moov') dlM4aReadInit(u, t, st);
        else if (t.typ === 'moof') {
          let mdatStart = -1;
          for (let j = k + 1; j < tops.length; j++) if (tops[j].typ === 'mdat') { mdatStart = tops[j].o + tops[j].hdr; break; }
          dlM4aReadMoof(u, t, mdatStart, st);
        }
      }
      if (onProgress && bi % 8 === 0) { onProgress(bi + 1, blobs.length); await dlSleep(0); }
    }
    const n = st.sizes.length;
    if (!st.stsd || !st.timescale || !n) return null;
    let total = 0; for (let i = 0; i < n; i++) total += st.sizes[i];
    if (total + 8 > 0xFFFFFFFF) return null;
    let ticks = 0; for (let i = 0; i < n; i++) ticks += st.durs[i];
    const durMs = Math.round(ticks / st.timescale * 1000);
    // stts (run-length)
    const sttsFlat = []; let cd = -1, cc = 0;
    for (let i = 0; i < n; i++) { const d = st.durs[i]; if (d === cd) cc++; else { if (cc) sttsFlat.push(cc, cd); cd = d; cc = 1; } }
    if (cc) sttsFlat.push(cc, cd);
    // chunks of 1000 samples
    const K = 1000, nCh = Math.ceil(n / K), rem = n % K;
    const stscFlat = (nCh === 1) ? [1, n, 1] : (rem ? [1, K, 1, nCh, rem, 1] : [1, K, 1]);
    const chRel = []; { let acc = 0; for (let c = 0; c < nCh; c++) { chRel.push(acc); const e = Math.min(n, (c + 1) * K); for (let i = c * K; i < e; i++) acc += st.sizes[i]; } }
    const stts = dlTbl('stts', [sttsFlat.length / 2], sttsFlat);
    const stsc = dlTbl('stsc', [stscFlat.length / 3], stscFlat);
    const stsz = dlTbl('stsz', [0, n], st.sizes);
    const ftyp = dlBx('ftyp', dlCC('M4A '), dlU32s(0), dlCC('M4A '), dlCC('mp42'), dlCC('isom'));
    const build = (base) => {
      const mvp = new Uint8Array(100);
      dlW32(mvp, 12, 1000); dlW32(mvp, 16, durMs); dlW32(mvp, 20, 0x00010000); mvp[24] = 1;
      dlW32(mvp, 36, 0x00010000); dlW32(mvp, 52, 0x00010000); dlW32(mvp, 68, 0x40000000); dlW32(mvp, 96, 2);
      const tkp = new Uint8Array(84);
      dlW32(tkp, 0, 7); dlW32(tkp, 12, 1); dlW32(tkp, 20, durMs); tkp[36] = 1;
      dlW32(tkp, 40, 0x00010000); dlW32(tkp, 56, 0x00010000); dlW32(tkp, 72, 0x40000000);
      const mdp = new Uint8Array(24);
      dlW32(mdp, 12, st.timescale); dlW32(mdp, 16, ticks); mdp[20] = 0x55; mdp[21] = 0xC4;
      const hdp = new Uint8Array(37);
      hdp.set(dlCC('soun'), 8); hdp.set(dlCC('SoundHandler'), 24);
      const stco = dlTbl('stco', [nCh], chRel.map(x => base + x));
      const stbl = dlBx('stbl', st.stsd, stts, stsc, stsz, stco);
      const dinf = dlBx('dinf', dlBx('dref', dlU32s(0, 1), dlBx('url ', dlU32s(1))));
      const minf = dlBx('minf', dlBx('smhd', new Uint8Array(8)), dinf, stbl);
      const mdia = dlBx('mdia', dlBx('mdhd', mdp), dlBx('hdlr', hdp), minf);
      return dlBx('moov', dlBx('mvhd', mvp), dlBx('trak', dlBx('tkhd', tkp), mdia));
    };
    const moov0 = build(0);
    const moov = build(ftyp.length + moov0.length + 8);
    const mh = new Uint8Array(8); dlW32(mh, 0, total + 8); mh.set(dlCC('mdat'), 4);
    return new Blob([ftyp, moov, mh].concat(st.chunks), { type: 'audio/mp4' });
  }
  // Rewrite every tfdt baseMediaDecodeTime so the timeline starts near 0 and is continuous.
  function dlRewriteAllTfdt(u, baseTime) {
    let n = 0;
    const visit = (typ, o, size, hdr) => {
      if (typ === 'tfdt') {
        const ver = u[o + hdr];
        if (ver === 1) { dlW64(u, o + hdr + 4, baseTime); n++; }
        else { dlW32(u, o + hdr + 4, baseTime >>> 0); n++; }
      } else if (typ === 'moof' || typ === 'traf') {
        dlWalkBoxes(u, visit, o + hdr, o + size);
      }
    };
    try { dlWalkBoxes(u, visit); } catch (e) {}
    return n;
  }
  // Fix fMP4 (init + media segments) so players don't show 10+ hour lengths.
  // Uses playlist EXTINF durations as the source of truth.
  async function dlRebaseFmp4(parts, durs, signal, onProgress) {
    if (!parts || !parts.length) return { parts, jumps: 0, timescale: 90000 };
    const out = [];
    let timescale = 90000;
    let start = 0;
    const first = new Uint8Array(await parts[0].arrayBuffer());
    if (dlIsInitSeg(first)) {
      const ts = dlMdhdTimescale(first);
      if (ts > 0) timescale = ts;
      try { dlPatchMp4Duration(first, dlSumDurs(durs)); } catch (e) {}
      out.push(new Blob([first]));
      start = 1;
    }
    let accum = 0; // in timescale units
    let jumps = 0;
    for (let i = start; i < parts.length; i++) {
      if (signal && signal.aborted) throw new Error('cancelled');
      const u = new Uint8Array(await parts[i].arrayBuffer());
      const n = dlRewriteAllTfdt(u, Math.round(accum));
      if (n) jumps += n;
      out.push(new Blob([u]));
      const di = start ? (i - start) : i;
      const d = (durs && durs[di] > 0 && isFinite(durs[di])) ? durs[di] : 2;
      accum += d * timescale;
      if (onProgress && (i % 8 === 0)) { onProgress(i + 1, parts.length); await dlSleep(0); }
    }
    return { parts: out, jumps, timescale };
  }
  // Always produce continuous timestamps for audio (TS or fMP4).
  async function dlFixAudioTimestamps(parts, durs, fmp4, signal, onProgress) {
    if (!parts || !parts.length) return { parts, jumps: 0 };
    if (fmp4) {
      return dlRebaseFmp4(parts, durs, signal, onProgress);
    }
    // MPEG-TS audio
    const isTs = parts[0] && await dlIsTs(parts[0]);
    if (!isTs) return { parts, jumps: 0 };
    const fx = await dlRebaseTs(parts, durs || [], signal, onProgress || (() => {}));
    return { parts: fx.blobs, jumps: fx.jumps };
  }

  async function dlRebaseTs(blobs, durs, signal, onProgress) {
    const PAD = 90000;                   // start ~1 s in so nothing goes negative after B-frame offset
    let accum = 0, jumps = 0, firstMinSec = null;
    const out = [];
    for (let i = 0; i < blobs.length; i++) {
      if (signal.aborted) throw new Error('cancelled');
      const u = new Uint8Array(await blobs[i].arrayBuffer());
      const mn = dlTsMin(u);
      const target = PAD + accum;
      if (mn !== null) {
        if (firstMinSec === null) firstMinSec = mn / 90000;
        // Any disagreement with the playlist duration is treated as a discontinuity and forced.
        dlTsShift(u, target - mn);
        jumps++;
      }
      out.push(new Blob([u]));
      const d = (durs[i] > 0 && isFinite(durs[i])) ? durs[i] : 2;
      accum += Math.round(d * 90000);
      if (i % 8 === 0) { onProgress(i + 1, blobs.length); await dlSleep(0); }
    }
    return { blobs: out, jumps, firstMinSec };
  }
  // Timing facts for the debug report: first PTS, and PTS/PCR spread, of one segment.
  function dlTsInfo(buf) {
    const u = new Uint8Array(buf); let mn = null, mx = null, pcrN = 0, pesN = 0;
    dlTsEach(u, (k, off, v) => { if (k === 'c') { pcrN++; return; } pesN++; if (mn === null || v < mn) mn = v; if (mx === null || v > mx) mx = v; });
    return { first: mn === null ? null : (mn / 90000).toFixed(3), last: mx === null ? null : (mx / 90000).toFixed(3), pcr: pcrN, pes: pesN, bytes: u.length };
  }

  // ---- softcoded subtitle export (always a separate .srt — never burned into the video) ----
  // delay is applied so the file matches what you see on screen:
  // player shows cue when cue.start <= currentTime - subDelay, so exported times are start+delay.
  const dlTc = (t) => { t = Math.max(0, t); const ms = Math.round(t * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s2 = Math.floor(ms / 1000) % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s2).padStart(2, '0') + ',' + String(ms % 1000).padStart(3, '0'); };
  async function dlTrackCues(tr) {
    const was = tr.mode;
    try { if (was === 'disabled') tr.mode = 'hidden'; } catch (e) {}
    for (let k = 0; k < 40 && (!tr.cues || !tr.cues.length); k++) {
      harvestCues(tr);
      await dlSleep(120);
    }
    harvestCues(tr);
    // Prefer full track.cues; fall back to everything we harvested while watching
    let cues = tr.cues ? Array.from(tr.cues) : [];
    if (!cues.length) {
      const map = _cueCache.get(tr);
      if (map && map.size) cues = Array.from(map.values());
    }
    try { if (was === 'disabled') tr.mode = 'disabled'; } catch (e) {}
    return cues;
  }
  function dlSrtFromList(list, delay) {
    let n = 0; const out = [];
    list.forEach(c => {
      const raw = c.text != null ? c.text : (c.body || '');
      const t = cleanCueText(String(raw)).replace(/\uE001/g, '<i>').replace(/\uE002/g, '</i>').replace(/\uE003/g, '<b>').replace(/\uE004/g, '</b>').trim();
      if (!t) return;
      const st = (c.startTime != null ? c.startTime : c.start) + delay;
      const en = (c.endTime != null ? c.endTime : c.end) + delay;
      if (!(en > st)) return;
      out.push(++n + '\n' + dlTc(st) + ' --> ' + dlTc(en) + '\n' + t + '\n');
    });
    return n ? out.join('\n') : '';
  }
  function dlSrt(cues, delay) { return dlSrtFromList(cues, delay); }
  // Softcoded .srt — ONLY the track(s) you currently have selected on screen.
  // Never dumps every language / CDN hash file. One primary .srt matching the video name.
  async function dlExportSubs(player) {
    const res = [];
    const delay = player.subDelay || 0;
    const seenBody = new Set();
    const push = (tag, label, srt) => {
      if (!srt) return;
      const sig = srt.length + ':' + srt.slice(0, 120) + ':' + srt.slice(-80);
      if (seenBody.has(sig)) return;
      seenBody.add(sig);
      res.push({ tag, label, file: (tag || '') + '.srt', blob: new Blob(['\uFEFF' + srt], { type: 'application/x-subrip' }) });
    };
    const tt = player.video && player.video.textTracks;
    if (!tt || !tt.length) {
      // Last resort: single best cache entry if tracks never registered
      try {
        if (typeof subtitleFileCache !== 'undefined' && subtitleFileCache.size) {
          let best = null, bestN = 0;
          subtitleFileCache.forEach((entry) => {
            if (!entry || !entry.cues) return;
            if (entry.cues.length > bestN) { bestN = entry.cues.length; best = entry; }
          });
          if (best) {
            const srt = dlSrtFromList(best.cues, delay);
            if (srt) push('', dlFriendlySubLabel(best.label, 'dialogue'), srt);
          }
        }
      } catch (e) {}
      return res;
    }

    // Resolve exactly what the user is watching
    const indices = [];
    if (player.subsEnabled === false || player.currentTrackIndex === -2) {
      return res; // subtitles Off → export nothing
    }
    if (player._pickSet && player._pickSet.size) {
      player._pickSet.forEach(i => { if (tt[i]) indices.push(i); });
    } else if (player.currentTrackIndex >= 0 && tt[player.currentTrackIndex]) {
      indices.push(player.currentTrackIndex);
    } else {
      // Auto Detect — same pick the overlay uses
      let dlg = -1;
      try { dlg = pickAutoTrack(player, tt); } catch (e) {}
      if (dlg < 0) {
        try {
          const cls = classifyTracks(player, tt);
          if (cls && cls.dlg >= 0) dlg = cls.dlg;
        } catch (e) {}
      }
      if (dlg < 0) {
        // Prefer English-looking tracks with the most cues
        let best = -1, bestScore = -1;
        for (let i = 0; i < tt.length; i++) {
          const tr = tt[i];
          if (!tr || (tr.kind && tr.kind !== 'subtitles' && tr.kind !== 'captions')) continue;
          const lab = ((tr.label || '') + ' ' + (tr.language || '')).toLowerCase();
          if (/\b(it|ita|italian|es|spa|spanish|fr|fre|french|de|ger|german|pt|por|ru|rus|ar|ara|zh|chi|ja|jpn|ko|kor)\b/.test(lab) &&
              !/\b(en|eng|english)\b/.test(lab)) continue;
          let n = 0; try { n = tr.cues ? tr.cues.length : 0; } catch (e) {}
          const eng = /\b(en|eng|english)\b/.test(lab) ? 1000 : 0;
          const score = eng + n;
          if (score > bestScore) { bestScore = score; best = i; }
        }
        dlg = best;
      }
      if (dlg >= 0) indices.push(dlg);
      // Optional signs companion only if Auto already paired one
      try {
        if (player._autoSignsIndex >= 0 && player._autoSignsIndex !== dlg && tt[player._autoSignsIndex])
          indices.push(player._autoSignsIndex);
      } catch (e) {}
    }

    let primary = true;
    for (const i of indices) {
      const tr = tt[i]; if (!tr) continue;
      const srt = dlSrt(await dlTrackCues(tr), delay);
      if (!srt) continue;
      const raw = tr.label || tr.language || '';
      const isSigns = !primary && /sign/i.test(raw);
      const label = dlFriendlySubLabel(raw, isSigns ? 'signs' : 'dialogue');
      const tag = primary ? '' : (isSigns ? '.signs' : '.alt');
      push(tag, label, srt);
      primary = false;
    }
    return res;
  }

  // ---- Low-RAM / phone path (≈4GB devices) ----
  // Holding a 1–2GB movie as Blobs + mux.js MP4 convert will OOM a 4GB phone.
  // On constrained devices we: (1) download ONE segment at a time, (2) write it
  // straight to disk / OPFS, (3) free the buffer, (4) never run mux.js.
  function dlIsLowMem() {
    try {
      const dm = navigator.deviceMemory;
      if (typeof dm === 'number' && dm > 0 && dm <= 4) return true;
    } catch (e) {}
    try {
      if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '')) return true;
    } catch (e) {}
    try {
      if (localStorage.getItem('lgv-dl-lowmem') === '1') return true;
    } catch (e) {}
    return false;
  }
  function dlWorkers() {
    return dlIsLowMem() ? 1 : Math.min(5, 4);
  }
  // Hand a finished File/Blob to the user WITHOUT navigating to blob: (that causes
  // mobile "Cannot Complete Request" tabs). Prefer Share → Save picker → download link.
  async function dlDeliverFile(fileOrBlob, name) {
    const mime = (fileOrBlob && fileOrBlob.type) || (
      /\.mp4$/i.test(name) ? 'video/mp4' :
      /\.m4a$/i.test(name) ? 'audio/mp4' :
      /\.webm$/i.test(name) ? 'video/webm' :
      /\.ts$/i.test(name) ? 'video/mp2t' : 'application/octet-stream'
    );
    const file = (fileOrBlob instanceof File)
      ? fileOrBlob
      : new File([fileOrBlob], name, { type: mime });

    // 1) Android/iOS share sheet — works after async downloads (no user-gesture needed as much)
    try {
      if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: name });
        return 'share';
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return 'share-cancel'; // user dismissed sheet — still ok
    }

    // 2) Save file picker (desktop / some Android Chrome)
    if (typeof window.showSaveFilePicker === 'function') {
      try {
        const accept = {};
        accept[mime] = ['.' + (name.split('.').pop() || 'bin')];
        const handle = await window.showSaveFilePicker({
          suggestedName: name,
          types: [{ description: 'Media', accept }]
        });
        const w = await handle.createWritable();
        if (file.stream) {
          await file.stream().pipeTo(w);
        } else {
          const slice = 4 * 1048576;
          let off = 0;
          while (off < file.size) {
            const end = Math.min(off + slice, file.size);
            await w.write(await file.slice(off, end).arrayBuffer());
            off = end;
          }
          await w.close();
        }
        return 'fs';
      } catch (e) {
        if (e && (e.name === 'AbortError' || e.name === 'NotAllowedError')) return 'fs-cancel';
      }
    }

    // 3) Classic <a download> — MUST NOT open the blob in a tab.
    //    On many mobile browsers this is ignored after async work; we still try.
    try {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.style.cssText = 'display:none;position:fixed;left:-9999px';
      a.rel = 'noopener';
      // do NOT set target="_blank" — that opens blob: tab → "Cannot Complete Request"
      (document.body || document.documentElement).appendChild(a);
      a.click();
      setTimeout(() => { try { a.remove(); URL.revokeObjectURL(url); } catch (e) {} }, 120000);
      return 'a';
    } catch (e) {
      return 'fail';
    }
  }
  async function dlOpenWritable(name) {
    // Prefer a real Save dialog (streams to user-chosen path, almost no JS heap).
    if (typeof window.showSaveFilePicker === 'function') {
      try {
        const accept = /\.mp4$/i.test(name) || /\.m4a$/i.test(name)
          ? { 'video/mp4': ['.mp4'], 'audio/mp4': ['.m4a'] }
          : { 'video/mp2t': ['.ts'], 'video/mp4': ['.mp4'] };
        const handle = await window.showSaveFilePicker({
          suggestedName: name,
          types: [{ description: 'Media', accept }]
        });
        return { writable: await handle.createWritable(), kind: 'fs', cleanup: async () => {} };
      } catch (e) {
        if (e && e.name === 'AbortError') throw e;
      }
    }
    // OPFS fallback: write on-device, then deliver via Share / download (never navigate to blob:).
    try {
      if (navigator.storage && navigator.storage.getDirectory) {
        const root = await navigator.storage.getDirectory();
        const safe = String(name || 'video.ts').replace(/[^\w.\- ()[\]]+/g, '_').slice(0, 120);
        const fh = await root.getFileHandle(safe, { create: true });
        const writable = await fh.createWritable();
        return {
          writable,
          kind: 'opfs',
          name: safe,
          cleanup: async () => {
            let how = 'fail';
            try {
              const file = await fh.getFile();
              // Re-wrap with the friendly display name
              const named = new File([file], name || safe, { type: file.type || 'video/mp2t' });
              how = await dlDeliverFile(named, name || safe);
            } catch (e) {}
            // Keep OPFS copy if deliver failed so user can retry; otherwise free space
            if (how === 'share' || how === 'fs' || how === 'a') {
              try { await root.removeEntry(safe); } catch (e) {}
            }
            return how;
          }
        };
      }
    } catch (e) {}
    return null;
  }
  // Parse playlist the same way as dlDownloadMedia (shared prelude).
  async function dlPrepareMedia(url, signal) {
    let txt = await dlFetchText(url, signal);
    if (/#EXT-X-STREAM-INF/.test(txt)) {
      const m = dlParseMaster(txt, url);
      if (!m.variants.length) throw new Error('Empty master playlist');
      m.variants.sort((a, b) => (b.height - a.height) || (b.bandwidth - a.bandwidth));
      url = m.variants[0].url; txt = await dlFetchText(url, signal);
    }
    const pl = dlParseMedia(txt, url);
    if (!pl.segs.length) throw new Error('The playlist has no segments');
    const fmp4 = !!pl.map || /\.(m4s|mp4|m4v|cmfv|cmfa)(\?|#|$)/i.test(pl.segs[0].url);
    return { url, pl, fmp4 };
  }
  // Stream one media playlist straight into a WritableStream. Only one segment
  // lives in RAM at a time. Optional PTS rebase keeps VLC seeking correct.
  async function dlStreamMedia(url, writable, signal, onProgress, doRebase) {
    const { pl, fmp4 } = await dlPrepareMedia(url, signal);
    const total = pl.segs.length;
    const keyCache = {};
    let bytes = 0, done = 0;
    let accum = 0;                 // 90 kHz timeline cursor after rebase
    const PAD = 90000;            // 1s padding at start
    if (pl.map) {
      const b = await dlFetchBuf(pl.map.url, pl.map.range, signal);
      await writable.write(b);
      bytes += b.byteLength;
    }
    for (let i = 0; i < total; i++) {
      if (signal.aborted) throw new Error('cancelled');
      const s = pl.segs[i];
      let buf = await dlFetchBuf(s.url, s.range, signal);
      if (s.key) {
        const kd = await dlKeyData(s.key, s.seq, keyCache, signal);
        buf = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: kd.iv }, kd.ck, buf);
      }
      if (!fmp4) {
        buf = dlStripToTs(buf);
        if (doRebase) {
          const u = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
          const mn = dlTsMin(u);
          if (mn !== null) dlTsShift(u, PAD + accum - mn);
          const d = (s.dur > 0 && isFinite(s.dur)) ? s.dur : 2;
          accum += Math.round(d * 90000);
          buf = u;
        }
      }
      await writable.write(buf);
      bytes += (buf.byteLength || buf.size || 0);
      done++;
      onProgress({ done, total, bytes });
      buf = null; // help GC
      if (i % 3 === 0) await dlSleep(0);
    }
    return { fmp4, live: !pl.endlist, total, bytes, durs: pl.segs.map(x => x.dur) };
  }
  // Stream video + optional separate audio TS into ONE file, keeping at most
  // one video segment and one audio segment in RAM. Packet-interleaves each
  // pair so A/V stay in the same file (not a second track file).
  async function dlStreamAvMerge(videoUrl, audioUrl, writable, signal, onProgress) {
    const vPrep = await dlPrepareMedia(videoUrl, signal);
    const aPrep = await dlPrepareMedia(audioUrl, signal);
    if (vPrep.fmp4 || aPrep.fmp4) {
      // Can't packet-merge fMP4 cheaply — stream video only.
      return dlStreamMedia(videoUrl, writable, signal, onProgress, true);
    }
    const vSegs = vPrep.pl.segs, aSegs = aPrep.pl.segs;
    const total = vSegs.length;
    const keyCache = {};
    let bytes = 0, done = 0;
    let vAccum = 0, aAccum = 0;
    const PAD = 90000;
    const fetchSeg = async (pl, segs, i) => {
      if (i >= segs.length) return null;
      const s = segs[i];
      let buf = await dlFetchBuf(s.url, s.range, signal);
      if (s.key) {
        const kd = await dlKeyData(s.key, s.seq, keyCache, signal);
        buf = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: kd.iv }, kd.ck, buf);
      }
      buf = dlStripToTs(buf);
      const u = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
      return u;
    };
    const toPackets = (u) => {
      let off = 0;
      while (off < u.length && u[off] !== 0x47) off++;
      const n = Math.floor((u.length - off) / 188) * 188;
      const pk = [];
      for (let i = off; i + 188 <= off + n; i += 188) pk.push(u.subarray(i, i + 188));
      return pk;
    };
    for (let i = 0; i < total; i++) {
      if (signal.aborted) throw new Error('cancelled');
      let vu = await fetchSeg(vPrep.pl, vSegs, i);
      let au = await fetchSeg(aPrep.pl, aSegs, i);
      if (vu) {
        const mn = dlTsMin(vu);
        if (mn !== null) dlTsShift(vu, PAD + vAccum - mn);
        const d = (vSegs[i].dur > 0 && isFinite(vSegs[i].dur)) ? vSegs[i].dur : 2;
        vAccum += Math.round(d * 90000);
      }
      if (au) {
        const mn = dlTsMin(au);
        if (mn !== null) dlTsShift(au, PAD + aAccum - mn);
        const d = (aSegs[i] && aSegs[i].dur > 0 && isFinite(aSegs[i].dur)) ? aSegs[i].dur : 2;
        aAccum += Math.round(d * 90000);
      }
      const vPk = vu ? toPackets(vu) : [];
      const aPk = au ? toPackets(au) : [];
      vu = au = null;
      const vPerA = Math.max(1, Math.round(vPk.length / Math.max(1, aPk.length || 1)));
      let vi = 0, ai = 0;
      const chunk = new Uint8Array((vPk.length + aPk.length) * 188);
      let w = 0;
      while (vi < vPk.length || ai < aPk.length) {
        for (let k = 0; k < vPerA && vi < vPk.length; k++, vi++) {
          chunk.set(vPk[vi], w); w += 188;
        }
        if (ai < aPk.length) { chunk.set(aPk[ai++], w); w += 188; }
      }
      await writable.write(chunk.subarray(0, w));
      bytes += w;
      done++;
      onProgress({ done, total, bytes });
      if (i % 2 === 0) await dlSleep(0);
    }
    return { fmp4: false, live: !(vPrep.pl.endlist && aPrep.pl.endlist), total, bytes };
  }

  // Downloads every segment of one media playlist. Returns { parts: Blob[], fmp4 }.
  async function dlDownloadMedia(url, signal, onProgress) {
    let txt = await dlFetchText(url, signal);
    if (/#EXT-X-STREAM-INF/.test(txt)) {
      const m = dlParseMaster(txt, url);
      if (!m.variants.length) throw new Error('Empty master playlist');
      m.variants.sort((a, b) => (b.height - a.height) || (b.bandwidth - a.bandwidth));
      url = m.variants[0].url; txt = await dlFetchText(url, signal);
    }
    const pl = dlParseMedia(txt, url);
    if (!pl.segs.length) throw new Error('The playlist has no segments');
    const fmp4 = !!pl.map || /\.(m4s|mp4|m4v|cmfv|cmfa)(\?|#|$)/i.test(pl.segs[0].url);
    const total = pl.segs.length; const out = new Array(total); const keyCache = {};
    let next = 0, done = 0, bytes = 0, failed = null;
    let initBlob = null;
    if (pl.map) {
      const b = await dlFetchBuf(pl.map.url, pl.map.range, signal);
      initBlob = new Blob([b]); bytes += b.byteLength;
    }
    const worker = async () => {
      for (;;) {
        if (failed) return;
        if (signal.aborted) throw new Error('cancelled');
        const i = next++; if (i >= total) return;
        const s = pl.segs[i];
        try {
          let buf = await dlFetchBuf(s.url, s.range, signal);
          if (s.key) {
            const kd = await dlKeyData(s.key, s.seq, keyCache, signal);
            buf = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: kd.iv }, kd.ck, buf);
          }
          if (!fmp4) buf = dlStripToTs(buf);
          out[i] = new Blob([buf]); bytes += buf.byteLength; done++;
          onProgress({ done, total, bytes });
        } catch (e) { failed = e; throw e; }
      }
    };
    await Promise.all(Array.from({ length: Math.min(dlWorkers(), total) }, worker));
    return { parts: (initBlob ? [initBlob] : []).concat(out), fmp4, live: !pl.endlist, total, durs: pl.segs.map(x => x.dur) };
  }
  function dlLoadMux() {
    return new Promise((resolve) => {
      if (window.muxjs) return resolve(true);
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/mux.js/6.3.0/mux.min.js';
      s.onload = () => resolve(!!window.muxjs); s.onerror = () => resolve(false);
      (document.head || document.documentElement).appendChild(s);
      setTimeout(() => resolve(!!window.muxjs), 8000);
    });
  }
  // ffmpeg.wasm for audio → MP3 (HLS audio is almost always AAC; MP3 needs a real encode)
  function dlLoadFFmpegScript() {
    return new Promise((resolve) => {
      if (window.FFmpeg && window.FFmpeg.createFFmpeg) return resolve(true);
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js';
      s.onload = () => resolve(!!(window.FFmpeg && window.FFmpeg.createFFmpeg));
      s.onerror = () => resolve(false);
      (document.head || document.documentElement).appendChild(s);
      setTimeout(() => resolve(!!(window.FFmpeg && window.FFmpeg.createFFmpeg)), 12000);
    });
  }
  async function dlGetFFmpeg() {
    if (window.__lgvFFmpeg && window.__lgvFFmpeg.isLoaded && window.__lgvFFmpeg.isLoaded()) {
      return window.__lgvFFmpeg;
    }
    if (!(await dlLoadFFmpegScript())) return null;
    try {
      const { createFFmpeg } = window.FFmpeg;
      const ffmpeg = createFFmpeg({
        log: false,
        corePath: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js'
      });
      await ffmpeg.load();
      window.__lgvFFmpeg = ffmpeg;
      return ffmpeg;
    } catch (e) {
      try { console.warn('[LGV] ffmpeg load failed', e); } catch (e2) {}
      return null;
    }
  }
  // Encode downloaded audio segments to a real .mp3 (libmp3lame, VBR ~q2)
  async function dlPartsToMp3(parts, signal, onProgress) {
    if (signal && signal.aborted) throw new Error('cancelled');
    const ffmpeg = await dlGetFFmpeg();
    if (!ffmpeg) throw new Error('ffmpeg not available');
    if (onProgress) onProgress(0.05);
    const input = new Uint8Array(await new Blob(parts).arrayBuffer());
    if (signal && signal.aborted) throw new Error('cancelled');
    const inName = 'lgv_in_' + Date.now();
    const outName = 'lgv_out.mp3';
    try {
      ffmpeg.FS('writeFile', inName, input);
      if (onProgress) onProgress(0.2);
      // -vn: drop any video; lame q:a 2 ≈ high quality VBR MP3
      await ffmpeg.run(
        '-i', inName,
        '-vn',
        '-acodec', 'libmp3lame',
        '-q:a', '2',
        '-y',
        outName
      );
      if (onProgress) onProgress(0.95);
      const out = ffmpeg.FS('readFile', outName);
      return new Blob([out.buffer], { type: 'audio/mpeg' });
    } finally {
      try { ffmpeg.FS('unlink', inName); } catch (e) {}
      try { ffmpeg.FS('unlink', outName); } catch (e) {}
    }
  }
  async function dlToMp4(parts, signal, onProgress, totalSec) {
    const T = new window.muxjs.mp4.Transmuxer({ keepOriginalTimestamps: false });
    const outParts = []; let gotInit = false;
    T.on('data', (s) => {
      if (!gotInit) {
        const u = new Uint8Array(s.initSegment.byteLength + s.data.byteLength);
        u.set(s.initSegment, 0); u.set(s.data, s.initSegment.byteLength);
        try { dlPatchMp4Duration(u.subarray(0, s.initSegment.byteLength), totalSec); } catch (e) {}
        outParts.push(new Blob([u])); gotInit = true;
      } else outParts.push(new Blob([s.data]));
    });
    for (let i = 0; i < parts.length; i++) {
      if (signal.aborted) throw new Error('cancelled');
      T.push(new Uint8Array(await parts[i].arrayBuffer())); T.flush();
      onProgress(i + 1, parts.length);
      if (i % 4 === 0) await dlSleep(0);
    }
    if (!gotInit) throw new Error('nothing to convert');
    return new Blob(outParts, { type: 'video/mp4' });
  }
  async function dlIsTs(blob) {
    try { const b = new Uint8Array(await blob.slice(0, 1).arrayBuffer()); return b[0] === 0x47; } catch (e) { return false; }
  }
  async function dlDownloadFile(url, signal, onProgress) {
    const r = await fetch(url, { signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const total = +r.headers.get('content-length') || 0;
    const type = r.headers.get('content-type') || 'video/mp4';
    if (!r.body || !r.body.getReader) { const b = await r.blob(); return b; }
    const reader = r.body.getReader(); const blobs = []; let acc = [], accN = 0, got = 0;
    for (;;) {
      const { done, value } = await reader.read(); if (done) break;
      acc.push(value); accN += value.length; got += value.length;
      if (accN > 8388608) { blobs.push(new Blob(acc)); acc = []; accN = 0; }
      onProgress({ got, total });
    }
    if (acc.length) blobs.push(new Blob(acc));
    return new Blob(blobs, { type });
  }
  async function dlSave(blob, name) {
    return dlDeliverFile(blob, name);
  }

  // Finds what can be downloaded. Returns { options: [...], notes: [...], tried: [...] }
  async function dlDetect(video, signal) {
    const notes = [], tried = [], cands = [], seen = new Set();
    const add = (type, url, src) => { if (!url || seen.has(url)) return; seen.add(url); cands.push({ type, url, src }); };
    const srcs = [video.currentSrc, video.src].concat(Array.from(video.querySelectorAll('source')).map(s => s.src)).filter(Boolean);
    srcs.forEach(s => {
      if (/^blob:/i.test(s)) notes.push('The video src is a blob: (the page feeds it through MSE / hls.js).');
      else if (/\.m3u8(\?|#|$)/i.test(s)) add('hls', s, 'video src');
      else if (/^https?:/i.test(s)) add('file', s, 'video src');
    });
    let levelHeight = 0;
    try {
      const f = deepFindPlayers(video);
      f.hls.concat(lgvHooks.hls).forEach(h => {
        try {
          const u = h.url || h.originalUrl || (h.config && h.config.url);
          if (u) add('hls', String(u), 'hls.js instance');
          const idx = h.currentLevel >= 0 ? h.currentLevel : h.loadLevel;
          if (idx >= 0 && h.levels && h.levels[idx] && h.levels[idx].height) levelHeight = h.levels[idx].height;
        } catch (e) {}
      });
    } catch (e) {}
    let perf = [];
    try { perf = (performance.getEntriesByType('resource') || []).map(e => e.name); } catch (e) {}
    lgvHooks.manifests.concat(perf).filter(n => /\.m3u8(\?|#|$)/i.test(n)).reverse().forEach(n => add('hls', n, 'network'));
    perf.filter(n => /\.(mp4|webm|mkv|m4v|mov)(\?|#|$)/i.test(n) && !/\/(seg|chunk|frag)/i.test(n)).reverse().slice(0, 4).forEach(n => add('file', n, 'network'));

    const options = []; let mediaOpt = null;
    for (const c of cands) {
      if (signal.aborted) throw new Error('cancelled');
      if (c.type === 'file') { options.push({ kind: 'file', label: 'Video file', url: c.url, src: c.src }); continue; }
      try {
        const txt = await dlFetchText(c.url, signal);
        if (/#EXT-X-STREAM-INF/.test(txt)) {
          const m = dlParseMaster(txt, c.url);
          tried.push(c.url + ' -> master, ' + m.variants.length + ' qualities');
          m.variants.sort((a, b) => (b.height - a.height) || (b.bandwidth - a.bandwidth));
          m.variants.forEach(v => {
            const flat = dlFlattenAudio(m);
            const pref = dlAudioPrefGet();
            const picked = dlPickAudio(flat, pref);
            const audioUrl = picked ? picked.uri : null;
            options.push({ kind: 'hls', label: (v.height ? v.height + 'p' : (v.bandwidth ? Math.round(v.bandwidth / 1000) + ' kbps' : 'Stream')) + (v.bandwidth ? ' · ' + Math.round(v.bandwidth / 1000) + ' kbps' : ''), url: v.url, audioUrl, audioTracks: flat, audioPick: picked, height: v.height, current: !!(levelHeight && v.height === levelHeight), src: c.src });
          });
          break;
        } else if (/#EXTINF/.test(txt)) {
          tried.push(c.url + ' -> media playlist');
          if (!mediaOpt) {
            const vh = video.videoHeight || 0;
            mediaOpt = { kind: 'hls', label: 'This stream' + (vh ? ' · ' + vh + 'p' : ''), url: c.url, audioUrl: null, height: vh, current: true, src: c.src };
          }
        } else tried.push(c.url + ' -> not a playlist');
      } catch (e) { tried.push(c.url + ' -> ' + (e && e.message || e)); }
    }
    if (!options.length && mediaOpt) options.push(mediaOpt);
    if (!options.length && !notes.length) notes.push('No video address was found yet. Start playback first, then try again.');
    return { options, notes, tried };
  }

  // Everything useful for working out how a video is hosted.
  async function dlDebugReport(video) {
    const L = [];
    const P = (k, v) => L.push(k + ': ' + v);
    P('LGV version', LGV_VERSION);
    P('time', new Date().toISOString());
    P('frame URL', location.href);
    try { P('top URL', window.top.location.href); } catch (e) { P('top URL', '(different site: ' + (document.referrer || 'unknown referrer') + ')'); }
    P('in iframe', window.top !== window);
    try { P('iframe sandbox', window.frameElement ? (window.frameElement.getAttribute('sandbox') || '(none)') : '(n/a)'); } catch (e) { P('iframe sandbox', '(cannot read: cross-site)'); }
    P('secure context', window.isSecureContext + ' | WebCrypto ' + !!(window.crypto && crypto.subtle) + ' | MSE ' + !!window.MediaSource);
    P('videos on page', document.querySelectorAll('video').length);
    try { P('iframes', Array.from(document.querySelectorAll('iframe')).slice(0, 6).map(f => { try { return new URL(f.src).host; } catch (e) { return f.src || '(no src)'; } }).join(', ') || 'none'); } catch (e) {}
    L.push('--- <video> ---');
    P('currentSrc', video.currentSrc || '(empty)');
    P('src', video.getAttribute('src') || '(empty)');
    P('type', /^blob:/.test(video.currentSrc || '') ? 'blob: (MSE)' : (/\.m3u8/i.test(video.currentSrc || '') ? 'HLS playlist' : (video.currentSrc ? 'direct URL' : 'none')));
    P('<source> tags', Array.from(video.querySelectorAll('source')).map(s => s.src + ' [' + (s.type || '?') + ']').join(' | ') || 'none');
    P('size / duration / ready', (video.videoWidth + 'x' + video.videoHeight) + ' / ' + (isFinite(video.duration) ? Math.round(video.duration) + 's' : video.duration) + ' / ' + video.readyState);
    P('crossorigin attr', video.getAttribute('crossorigin') || '(none)');
    L.push('--- players ---');
    try {
      const f = deepFindPlayers(video);
      P('hls.js instances', f.hls.length + ' found, ' + lgvHooks.hls.length + ' captured');
      f.hls.concat(lgvHooks.hls).slice(0, 3).forEach((h, i) => {
        try {
          P('  hls#' + i + ' url', h.url || h.originalUrl || '(none)');
          P('  hls#' + i + ' levels', (h.levels || []).map(l => (l.height || '?') + 'p/' + Math.round((l.bitrate || 0) / 1000) + 'k').join(', ') + ' | current ' + h.currentLevel);
          P('  hls#' + i + ' audioTracks', h.audioTracks ? h.audioTracks.length : 'n/a');
          P('  hls#' + i + ' encrypted?', (h.levels && h.levels[0] && h.levels[0].details && h.levels[0].details.fragments && h.levels[0].details.fragments[0] && h.levels[0].details.fragments[0].levelkey) ? 'yes' : 'no/unknown');
        } catch (e) {}
      });
      P('JW / Shaka / dash.js / video.js / Plyr', [f.jw.length, f.shaka.length, f.dash.length, f.vjs.length, f.plyr.length].join(' / '));
    } catch (e) { P('player scan', 'error ' + e.message); }
    try { P('window player globals', Object.getOwnPropertyNames(window).filter(k => /^(hls|jwplayer|videojs|Plyr|shaka|dashjs|Artplayer|DPlayer|flowplayer|clappr|Clappr|muxjs|MediaElementPlayer)$/i.test(k)).join(', ') || 'none'); } catch (e) {}
    L.push('--- network ---');
    let perf = [];
    try { perf = performance.getEntriesByType('resource') || []; } catch (e) {}
    const cnt = {};
    perf.forEach(e => { const m = /\.(m3u8|ts|m4s|mp4|webm|mkv|key|vtt|srt|ass|aac|mp3)(\?|#|$)/i.exec(e.name); if (m) cnt[m[1].toLowerCase()] = (cnt[m[1].toLowerCase()] || 0) + 1; });
    P('media request counts', JSON.stringify(cnt));
    P('playlists seen', lgvHooks.manifests.slice(-6).join(' | ') || 'none');
    perf.filter(e => /\.(ts|m4s|mp4|webm|m3u8)(\?|#|$)/i.test(e.name)).slice(-6).forEach(e => P('  recent', e.name.slice(0, 160) + ' [' + e.initiatorType + ', ' + (e.transferSize || 0) + 'B, ' + new URL(e.name, location.href).host + ']'));
    L.push('--- detection ---');
    try {
      const d = await dlDetect(video, new AbortController().signal);
      d.notes.forEach(n => P('note', n));
      d.tried.forEach(t => P('tried', t.slice(0, 220)));
      d.options.slice(0, 8).forEach(o => P('option', o.kind + ' | ' + o.label + ' | ' + o.url.slice(0, 160) + (o.audioUrl ? ' | audio: ' + o.audioUrl.slice(0, 100) : '')));
      if (!d.options.length) P('result', 'no downloadable source found');
      const first = d.options.find(o => o.kind === 'hls');
      if (first) {
        try {
          const txt = await dlFetchText(first.url, new AbortController().signal);
          const pl = dlParseMedia(txt, first.url);
          P('media playlist', pl.segs.length + ' segments, fMP4 ' + !!pl.map + ', encrypted ' + (pl.segs[0] && pl.segs[0].key ? pl.segs[0].key.method : 'no') + ', ended ' + pl.endlist);
          if (pl.segs[0]) P('first segment', pl.segs[0].url.slice(0, 160));
          if (pl.segs[0]) {
            try {
              P('discontinuity tags', (txt.match(/#EXT-X-DISCONTINUITY/g) || []).length + ', total EXTINF ' + Math.round(pl.segs.reduce((n, x) => n + x.dur, 0)) + 's');
              for (const idx of [0, Math.floor(pl.segs.length / 2), pl.segs.length - 1]) {
                const rr = await fetch(pl.segs[idx].url); const bb = dlStripToTs(await rr.arrayBuffer());
                const ti = dlTsInfo(bb);
                P('  seg#' + idx, 'starts with 0x47 ' + (new Uint8Array(bb)[0] === 0x47) + ', PTS first/last ' + ti.first + ' / ' + ti.last + 's, PES ' + ti.pes + ', PCR ' + ti.pcr + ', ' + ti.bytes + 'B');
              }
            } catch (e) { P('segment timing', 'error ' + (e && e.message || e)); }
            try { const r = await fetch(pl.segs[0].url, { headers: { Range: 'bytes=0-0' } }); P('segment fetch test', 'HTTP ' + r.status + ' (page can read it)'); }
            catch (e) { P('segment fetch test', 'BLOCKED: ' + (e && e.message || e) + ' (likely CORS)'); }
          }
        } catch (e) { P('media playlist', 'error ' + (e && e.message || e)); }
      }
    } catch (e) { P('detection', 'error ' + (e && e.message || e)); }
    L.push('(contains stream links that may hold temporary tokens)');
    return L.join('\n');
  }

  // 8.10.149: Audio-track debug report — same shape as Video info, focused on every
  // audio source the stream / player exposes so you can see what is there and which
  // one is active.
  async function dlAudioDebugReport(video) {
    const L = [];
    const P = (k, v) => L.push(k + ': ' + (v == null ? '(null)' : String(v)));
    const short = (u, n) => {
      if (!u) return '(none)';
      const s = String(u);
      return s.length > (n || 160) ? s.slice(0, n || 160) + '…' : s;
    };
    P('LGV version', LGV_VERSION);
    P('time', new Date().toISOString());
    P('frame URL', location.href);
    try { P('top URL', window.top.location.href); } catch (e) { P('top URL', '(cross-origin)'); }
    P('in iframe', window.top !== window);
    L.push('--- <video> audio state ---');
    try {
      P('muted', video.muted);
      P('volume', video.volume);
      P('paused', video.paused);
      P('readyState', video.readyState + ' (HAVE_NOTHING=0 … HAVE_ENOUGH_DATA=4)');
      P('networkState', video.networkState);
      P('currentSrc', short(video.currentSrc, 200));
      P('audioTracks API', typeof video.audioTracks !== 'undefined' ? 'present' : 'NOT supported in this browser');
    } catch (e) { P('video state error', e && e.message || e); }

    L.push('--- HTMLMediaElement.audioTracks ---');
    try {
      const at = video.audioTracks;
      if (!at) {
        P('count', 'n/a (property missing)');
      } else {
        P('count', at.length);
        for (let i = 0; i < at.length; i++) {
          const t = at[i];
          try {
            P('  [' + i + ']',
              (t.enabled ? 'ENABLED' : 'off') +
              ' | id=' + (t.id || '') +
              ' | kind=' + (t.kind || '') +
              ' | label=' + (t.label || '(empty)') +
              ' | lang=' + (t.language || '(empty)'));
          } catch (e) { P('  [' + i + ']', 'error reading: ' + (e && e.message || e)); }
        }
        if (!at.length) P('note', 'Empty — many HLS sites only expose tracks through hls.js, not video.audioTracks.');
      }
    } catch (e) { P('audioTracks error', e && e.message || e); }

    L.push('--- hls.js audioTracks ---');
    try {
      const f = deepFindPlayers(video);
      const list = (f.hls || []).concat(lgvHooks.hls || []);
      const seen = new Set();
      let n = 0;
      list.forEach((h) => {
        if (!h || seen.has(h)) return;
        seen.add(h);
        try {
          P('hls#' + n + ' url', short(h.url || h.originalUrl || '', 180));
          P('hls#' + n + ' currentLevel', h.currentLevel);
          P('hls#' + n + ' audioTrack (index)', typeof h.audioTrack === 'number' ? h.audioTrack : String(h.audioTrack));
          const tracks = h.audioTracks;
          if (!tracks || !tracks.length) {
            P('hls#' + n + ' audioTracks', 'none / empty');
          } else {
            P('hls#' + n + ' audioTracks count', tracks.length);
            tracks.forEach((t, i) => {
              try {
                const cur = (h.audioTrack === i) || (h.audioTrack === t.id);
                P('  [' + i + ']',
                  (cur ? 'CURRENT' : 'alt') +
                  ' | id=' + (t.id != null ? t.id : '') +
                  ' | name=' + (t.name || t.label || '(empty)') +
                  ' | lang=' + (t.lang || t.language || '(empty)') +
                  ' | group=' + (t.groupId || t.group || '') +
                  ' | default=' + !!(t.default) +
                  ' | autoselect=' + !!(t.autoselect) +
                  ' | forced=' + !!(t.forced) +
                  ' | type=' + (t.type || '') +
                  ' | url=' + short(t.url || t.uri || '', 120));
              } catch (e) { P('  [' + i + ']', 'error: ' + (e && e.message || e)); }
            });
          }
          // Level audio codecs / audioGroup
          try {
            const levels = h.levels || [];
            levels.slice(0, 8).forEach((lv, i) => {
              P('  level#' + i,
                (lv.height || '?') + 'p' +
                ' | audioCodec=' + (lv.audioCodec || lv.attrs && lv.attrs.AUDIO || '(n/a)') +
                ' | videoCodec=' + (lv.videoCodec || '') +
                ' | audioGroup=' + (lv.audioGroupIds ? lv.audioGroupIds.join(',') : (lv.attrs && lv.attrs.AUDIO || '')));
            });
          } catch (e) {}
          n++;
        } catch (e) { P('hls#' + n + ' error', e && e.message || e); n++; }
      });
      if (!n) P('hls.js', 'no instance found on this video');
    } catch (e) { P('hls scan error', e && e.message || e); }

    L.push('--- master playlist AUDIO groups (EXT-X-MEDIA) ---');
    try {
      const notes = [], seen = new Set(), masters = [];
      const add = (u, src) => { if (!u || seen.has(u)) return; seen.add(u); masters.push({ u, src }); };
      try {
        const f = deepFindPlayers(video);
        (f.hls || []).concat(lgvHooks.hls || []).forEach(h => {
          try {
            const u = h.url || h.originalUrl || (h.config && h.config.url);
            if (u) add(String(u), 'hls.js');
          } catch (e) {}
        });
      } catch (e) {}
      try {
        (performance.getEntriesByType('resource') || []).forEach(e => {
          if (/\.m3u8(\?|#|$)/i.test(e.name)) add(e.name, 'network');
        });
      } catch (e) {}
      try { (lgvHooks.manifests || []).forEach(u => add(u, 'hook')); } catch (e) {}
      if (!masters.length) {
        P('masters', 'none found yet — play a few seconds and retry');
      } else {
        for (const m of masters.slice(0, 4)) {
          try {
            const txt = await dlFetchText(m.u, new AbortController().signal);
            if (!/#EXT-X-STREAM-INF|#EXT-X-MEDIA/.test(txt)) {
              P('playlist', short(m.u, 100) + ' [' + m.src + '] — media playlist (no AUDIO groups)');
              continue;
            }
            const parsed = dlParseMaster(txt, m.u);
            const groups = Object.keys(parsed.audio || {});
            P('master', short(m.u, 120) + ' [' + m.src + '] — ' + (parsed.variants || []).length + ' variants, ' + groups.length + ' audio group(s)');
            groups.forEach(gid => {
              (parsed.audio[gid] || []).forEach((a, i) => {
                P('  group "' + gid + '" [' + i + ']',
                  (a.def ? 'DEFAULT ' : '') +
                  'name=' + (a.name || '(empty)') +
                  ' | lang=' + (a.lang || '(empty)') +
                  ' | uri=' + short(a.uri, 140));
              });
            });
            if (!groups.length) P('  note', 'Master has no EXT-X-MEDIA TYPE=AUDIO — audio is muxed into the video playlist.');
            // Sample which variants point at which audio group
            (parsed.variants || []).slice(0, 6).forEach(v => {
              P('  variant', (v.height || '?') + 'p · AUDIO group=' + (v.audioGroup || '(none)') + ' · ' + short(v.url, 100));
            });
          } catch (e) {
            P('master fetch', short(m.u, 100) + ' — ' + (e && e.message || e));
          }
        }
      }
    } catch (e) { P('master scan error', e && e.message || e); }

    L.push('--- download detection (audioUrl) ---');
    try {
      const d = await dlDetect(video, new AbortController().signal);
      const withAudio = (d.options || []).filter(o => o.audioUrl);
      P('options total', (d.options || []).length);
      P('options with separate audio', withAudio.length);
      withAudio.slice(0, 6).forEach((o, i) => {
        P('  audio#' + i, (o.label || o.kind) + ' | ' + short(o.audioUrl, 160));
      });
      if (!withAudio.length) P('note', 'No separate audio playlist detected — audio is likely muxed in the video segments.');
    } catch (e) { P('detection error', e && e.message || e); }

    L.push('--- other players ---');
    try {
      const f = deepFindPlayers(video);
      P('JW / Shaka / dash.js / video.js / Plyr counts',
        [f.jw.length, f.shaka.length, f.dash.length, f.vjs.length, f.plyr.length].join(' / '));
      (f.shaka || []).slice(0, 2).forEach((p, i) => {
        try {
          if (p.getVariantTracks) {
            const tracks = p.getVariantTracks() || [];
            const langs = [...new Set(tracks.map(t => t.language || t.audioId || '').filter(Boolean))];
            P('  shaka#' + i + ' variant languages', langs.join(', ') || '(none)');
            P('  shaka#' + i + ' active', (() => {
              const a = tracks.find(t => t.active);
              return a ? ((a.language || '') + ' ' + (a.height || '') + 'p') : '(none)';
            })());
          }
        } catch (e) {}
      });
      (f.dash || []).slice(0, 2).forEach((p, i) => {
        try {
          if (typeof p.getBitrateInfoListFor === 'function') {
            const list = p.getBitrateInfoListFor('audio') || [];
            P('  dash#' + i + ' audio bitrates', list.length ? list.map(b => Math.round((b.bitrate || 0) / 1000) + 'k').join(', ') : 'none');
          }
        } catch (e) {}
      });
    } catch (e) {}

    L.push('(audio playlist URLs may hold temporary tokens)');
    return L.join('\n');
  }

  // Points the <video> straight at one quality's playlist, keeping the
  // position, play state and speed.
  async function swapToVariant(player, url) {
    const v = player.video;
    const t = v.currentTime, playing = !v.paused, rate = v.playbackRate;
    player._srcSwapUntil = Date.now() + 12000;
    const restore = () => {
      try { v.currentTime = t; } catch (e) {}
      try { v.playbackRate = rate; } catch (e) {}
      if (playing) v.play().catch(() => {});
    };
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = url;
      await new Promise(res => { v.addEventListener('loadedmetadata', res, { once: true }); setTimeout(res, 3500); });
      restore();
      return true;
    }
    const H = window.Hls;
    if (H && H.isSupported && H.isSupported()) {
      // Drop the player this script made on the previous swap, so repeated
      // swaps never leave several players fighting over one video (black picture)
      try { if (player._swapHls && typeof player._swapHls.destroy === 'function') player._swapHls.destroy(); } catch (e) {}
      player._swapHls = null;
      const h = new H({ startPosition: t });
      player._swapHls = h;
      h.loadSource(url);
      h.attachMedia(v);
      await new Promise(res => { try { h.on(H.Events.MANIFEST_PARSED, res); } catch (e) {} setTimeout(res, 3500); });
      restore();
      return true;
    }
    return false;
  }

  function queryAllDeep(sel, root, out) {
    out = out || []; root = root || document;
    try { root.querySelectorAll(sel).forEach(e => out.push(e)); } catch (e) {}
    try { root.querySelectorAll('*').forEach(e => { if (e.shadowRoot) queryAllDeep(sel, e.shadowRoot, out); }); } catch (e) {}
    return out;
  }

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Full pointer/mouse/click sequence, for sites whose menus only react to
  // real input events rather than a bare click().
  function pressEl(el) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const opts = { bubbles: true, cancelable: true, view: window,
      clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 0 };
    try {
      if (window.PointerEvent) {
        el.dispatchEvent(new PointerEvent('pointerover', opts));
        el.dispatchEvent(new PointerEvent('pointerenter', { ...opts, bubbles: false }));
      }
      el.dispatchEvent(new MouseEvent('mouseover', opts));
      if (window.PointerEvent) el.dispatchEvent(new PointerEvent('pointerdown', opts));
      el.dispatchEvent(new MouseEvent('mousedown', opts));
      try { el.focus({ preventScroll: true }); } catch (e) {}
      if (window.PointerEvent) el.dispatchEvent(new PointerEvent('pointerup', opts));
      el.dispatchEvent(new MouseEvent('mouseup', opts));
      el.dispatchEvent(new MouseEvent('click', opts));
    } catch (e) {}
  }

  function isShown(el) {
    if (!el || !el.getClientRects || !el.getClientRects().length) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) > 0.01;
  }

  function fireClick(el) {
    if (!el) return false;
    try {
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
      if (window.PointerEvent) el.dispatchEvent(new PointerEvent('pointerdown', opts));
      el.dispatchEvent(new MouseEvent('mousedown', opts));
      if (window.PointerEvent) el.dispatchEvent(new PointerEvent('pointerup', opts));
      el.dispatchEvent(new MouseEvent('mouseup', opts));
      el.dispatchEvent(new MouseEvent('click', opts));
      el.click();
      return true;
    } catch (e) {
      try { el.click(); return true; } catch (e2) { return false; }
    }
  }

  // ---- Aggressive subtitle discovery: parsers for externally-linked SRT/VTT/ASS files ----

  function srtVttTimeToSec(str) {
    // Handles "HH:MM:SS,mmm" (SRT) and "HH:MM:SS.mmm" (VTT), with or without hours.
    const m = str.trim().match(/(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{1,3})/);
    if (!m) return null;
    const h = parseInt(m[1] || '0', 10);
    const min = parseInt(m[2], 10);
    const s = parseInt(m[3], 10);
    const ms = parseInt(m[4].padEnd(3, '0'), 10);
    return h * 3600 + min * 60 + s + ms / 1000;
  }

  // 8.10.161: the site's seek-preview sprite track (<track kind="metadata" label="thumbnails">)
  // is not a subtitle track. It must never be listed or used as one.
  function isThumbTrack(t, el) {
    try {
      let label = '';
      if (t && t.label) label = String(t.label);
      else if (el) label = String(el.label || (el.getAttribute && el.getAttribute('label')) || '');
      if (/thumbnail/i.test(label)) return true;
      const src = el && el.getAttribute ? String(el.getAttribute('src') || '') : '';
      return /thumbnail[^/]*\.vtt(\?|#|$)/i.test(src);
    } catch (e) { return false; }
  }

  // Dual-track Auto: one dialogue track (bottom) + one signs track (right).
  // Signs tracks are rare; only used when a real signs/forced track exists
  // or a track is clearly sign-heavy and different from the dialogue pick.
  function scoreTextTracks(tt) {
    const isSubLike = (tr) => !isThumbTrack(tr) && (!tr.kind || tr.kind === 'subtitles' || tr.kind === 'captions');
    const FORMAT_RE = /[\uE001-\uE004]|\{[^}]*\}|<\s*\/?\s*[ibu]\s*>|\\(pos|an\d|i[01]|b[01])/i;
    const SIGNS_LABEL_RE = /(^|[^a-z])(signs?|songs?|forced|karaoke|lyrics)([^a-z]|$)/i;
    // Strong label: the track says it carries signs / forced text.
    const SIGNS_WORD_RE = /(^|[^a-z])(signs?|forced)([^a-z]|$)/i;
    // ASS typesetting that survives into a cue: position / move / alignment.
    const POS_TAG_RE = /\\(pos|move|org|i?clip|fad|fade|an[1-9])\b/i;
    const MESSY_RE = /\{\\[^}]*\}|\\(pos|move|org|i?clip|fad|fade|an[1-9]|k[fo]?\d)|<\s*font\b/i;
    const DIALOGUE_CUE_RE = /\b(I|I'm|you|he|she|we|they|it's|that's|what|when|where|why|how|hello|said|know|think|want|need|like|just|really|about|from|with|for|but|not|don't|can|will|would|should)\b|["\u201C\u201D\u300C\u300D]|[.!?…]/i;
    const cands = [];
    let maxCues = 0;
    for (let i = 0; i < tt.length; i++) {
      const tr = tt[i];
      if (!tr || !isSubLike(tr)) continue;
      if (tr.mode === 'disabled') { try { tr.mode = 'hidden'; } catch (e) {} }
      const cues = tr.cues ? Array.from(tr.cues) : [];
      if (!cues.length) continue;
      let styled = 0, dialogue = 0, speech = 0, signish = 0, positioned = 0, short = 0, messy = 0;
      const step = Math.max(1, Math.floor(cues.length / 120));
      let sampled = 0;
      for (let k = 0; k < cues.length; k += step) {
        const cue = cues[k];
        const raw = cue.text || '';
        const text = cleanCueText(raw).replace(/[\uE001-\uE004]/g, '').trim();
        sampled++;
        if (FORMAT_RE.test(raw)) styled++;
        // 8.10.97: typesetting / markup junk (ASS override tags, \\pos, font tags) or SHOUTING
        // lines count as messy; plain text with normal italics does not.
        {
          const letters = text.replace(/[^A-Za-z]/g, '');
          if (MESSY_RE.test(raw) || (letters.length >= 8 && letters === letters.toUpperCase())) messy++;
        }
        if (DIALOGUE_CUE_RE.test(raw)) dialogue++;
        if (looksLikeSpeech(text)) speech++;
        if (isSignBlock(text)) signish++;
        if (text.length <= 40) short++;
        let pos = POS_TAG_RE.test(raw);
        try {
          if (!pos && ((cue.line !== undefined && cue.line !== 'auto') ||
                       (cue.position !== undefined && cue.position !== 'auto'))) pos = true;
        } catch (e) {}
        if (pos) positioned++;
      }
      const scale = cues.length / Math.max(1, sampled);
      dialogue = Math.round(dialogue * scale);
      styled = Math.round(styled * scale);
      const starts = cues.map(c => c.startTime).sort((x, y) => x - y);
      if (cues.length > maxCues) maxCues = cues.length;
      const name = ((tr.label || '') + ' ' + (tr.id || '')).toLowerCase();
      const lang = (tr.language || '').toLowerCase().split('-')[0];
      cands.push({
        i: i, t: tr, n: cues.length, styled: styled, dialogue: dialogue, name: name,
        eng: isEnglishTrack(tr) ? 1 : 0,
        foreign: !!(lang && LANG_NAMES[lang] && LANG_NAMES[lang] !== 'English'),
        labelSigns: SIGNS_LABEL_RE.test(name),
        labelSignsWord: SIGNS_WORD_RE.test(name),
        // 0..1 ratios of the sampled cues
        speech: speech / sampled, signish: signish / sampled,
        positioned: positioned / sampled, short: short / sampled,
        // 1 = cleanly formatted plain text, 0 = typesetting / markup everywhere
        clean: 1 - Math.max(messy / sampled, positioned / sampled),
        sdh: /(^|[^a-z])(sdh|cc|hearing|closed[ -]?caption)([^a-z]|$)/i.test(name),
        starts: starts
      });
    }
    cands.forEach(c => {
      c.partial = c.labelSigns ||
        (maxCues >= 40 && c.n < maxCues * 0.35 && c.styled >= c.n * 0.55 && c.dialogue < c.n * 0.15);
      if (c.n >= 20 && c.dialogue < c.n * 0.08 && c.signish > 0.15) c.partial = true;
    });
    return { cands: cands, maxCues: maxCues };
  }

  // Fraction of `a`'s cue starts that land within `tol` seconds of a start
  // in `b` (both sorted). A second dialogue track (another language, SDH)
  // lines up with the main one almost cue for cue; a signs track does not.
  function startsOverlap(a, b, tol) {
    if (!a.length || !b.length) return 0;
    let j = 0, hit = 0;
    for (let i = 0; i < a.length; i++) {
      while (j < b.length - 1 && b[j + 1] <= a[i]) j++;
      const d1 = Math.abs(a[i] - b[j]);
      const d2 = j + 1 < b.length ? Math.abs(a[i] - b[j + 1]) : Infinity;
      if (Math.min(d1, d2) <= tol) hit++;
    }
    return hit / a.length;
  }

  // Decides whether a track is a SIGNS track, from its label and the
  // pattern of its cues compared with the dialogue track. Returns the score;
  // >= SIGNS_ACCEPT means "yes, this is a signs track".
  const SIGNS_ACCEPT = 3;

  // 8.10.92: roles the user set by holding a track in Settings. Keyed by the track's
  // own name (label / language), so the pick carries over to the next episode.
  // 'signs' = always the right-centre overlay, 'dialogue' = never treated as signs.
  function trackRoleKey(tr, i) {
    const k = String((tr && (tr.label || tr.language || tr.id)) || '').trim().toLowerCase();
    return k || ('#' + i);
  }
  function trackRoleOf(player, tr, i) {
    const m = player && player._trackRoles;
    if (!m || !tr) return null;
    // 8.10.98: Auto Detect is pure detection: your Signs / Dialogue picks only count in a manual pick.
    if (player.currentTrackIndex === -1) return null;
    const r = m[trackRoleKey(tr, i)];
    return (r === 'signs' || r === 'dialogue') ? r : null;
  }
  function signsTrackScore(c, dlg, maxCues) {
    const ratio = dlg && dlg.n ? c.n / dlg.n : (maxCues ? c.n / maxCues : 1);
    const timeMatch = dlg ? startsOverlap(c.starts, dlg.starts, 0.75) : 0;
    let score = 0;
    if (c.labelSignsWord) score += 4;          // labelled signs / forced
    else if (c.labelSigns) score += 1;         // songs / lyrics / karaoke only
    if (c.partial) score += 1;                 // sparse + styled, little speech
    if (ratio <= 0.5) score += 1;              // far fewer cues than dialogue
    else if (ratio >= 0.8) score -= 2;         // as many cues as dialogue
    if (c.signish >= 0.35) score += 2;         // many time/date/place cards
    else if (c.signish >= 0.15) score += 1;
    if (c.speech >= 0.6) score -= 3;           // reads like spoken lines
    else if (c.speech >= 0.4) score -= 1;
    else if (c.speech <= 0.2) score += 1;      // almost no speech
    if (c.short >= 0.7 && ratio <= 0.6) score += 1;   // short cards
    if (c.positioned - (dlg ? dlg.positioned : 0) >= 0.25) score += 1; // placed on screen
    // Same timing as the dialogue track = another dialogue track, not signs.
    if (dlg && ratio >= 0.5 && timeMatch >= 0.6) score -= 3;
    // A different language than the English dialogue and not labelled signs.
    if (dlg && dlg.eng && c.foreign && !c.labelSignsWord) score -= 3;
    c.signScore = score; c.ratio = ratio; c.timeMatch = timeMatch;
    return score;
  }

  // 8.10.97: ONE place decides which track is the dialogue track, so Auto Detect and
  // the Track list ("(signs)" tags, ticks) can never disagree. Order of importance:
  //   1. a track you set to Dialogue
  //   2. has spoken lines   3. English
  //   4. NOT an AI track (AI is only used when nothing else usable is left)
  //   5. cleanly formatted (plain text, no typesetting markup, no shouting)
  //   6. not an SDH / hearing-impaired track
  //   7. more spoken lines   8. more cues   9. cleaner still
  // 8.10.100: AI is hard-excluded unless no usable non-AI dialogue track exists.
  // Sort key still ranks clean / English / more lines inside the chosen pool.
  function dialogueKeyOf(player, tt, c, maxCues) {
    const role = trackRoleOf(player, tt[c.i], c.i) === 'dialogue' ? 1 : 0;
    // spoken lines OR a healthy speech ratio (regex can miss some clean tracks)
    const hasDlg = (c.dialogue > 0 || c.speech >= 0.25) ? 1 : 0;
    const notAi = isAiTrack(c.t) ? 0 : 1;
    const cleanTier = c.clean >= 0.85 ? 2 : (c.clean >= 0.5 ? 1 : 0);
    return [role, hasDlg, c.eng, notAi, cleanTier, c.sdh ? 0 : 1, c.dialogue, c.n, c.clean];
  }
  function pickDialogueCand(player, tt, scored) {
    const cands = scored.cands;
    const notSigns = (c) => trackRoleOf(player, tt[c.i], c.i) !== 'signs';
    const usable = (c) => !c.partial && notSigns(c);
    // Pass 1: non-AI only (the hard rule). Prefer non-partial; fall back to all non-AI.
    let nonAi = cands.filter(c => !isAiTrack(c.t) && usable(c));
    if (!nonAi.length) nonAi = cands.filter(c => !isAiTrack(c.t) && notSigns(c));
    // Prefer tracks that actually look like dialogue inside the non-AI pool.
    const nonAiDlg = nonAi.filter(c => c.dialogue > 0 || c.speech >= 0.25);
    let pool = nonAiDlg.length ? nonAiDlg : (nonAi.length ? nonAi : null);
    // Pass 2: only if no usable non-AI track at all — allow AI (and partial as last resort).
    if (!pool || !pool.length) {
      const pool0 = cands.some(c => !c.partial) ? cands.filter(c => !c.partial) : cands;
      const pool1 = pool0.filter(notSigns);
      pool = pool1.length ? pool1 : pool0;
    }
    let best = null, bestKey = null;
    for (const c of pool) {
      const key = dialogueKeyOf(player, tt, c, scored.maxCues);
      let better = !bestKey;
      if (bestKey) {
        for (let k = 0; k < key.length; k++) {
          if (key[k] > bestKey[k]) { better = true; break; }
          if (key[k] < bestKey[k]) break;
        }
      }
      if (better) { best = c; bestKey = key; }
    }
    return best;
  }

  function pickAutoTrack(player, tt) {
    const nowMs = Date.now();
    let sig = String(tt.length);
    for (let i = 0; i < tt.length; i++) {
      const c = tt[i] && tt[i].cues;
      sig += ':' + (c ? c.length : 0);
    }
    const cached = player._autoTrackIndex;
    const cachedOk = cached != null && cached >= 0 && cached < tt.length && tt[cached] &&
      tt[cached].cues && tt[cached].cues.length > 0;
    // 8.10.100: if a non-AI track has gained cues since we last picked AI, force a re-pick
    // so AI does not stay locked in while eng-* tracks finish loading.
    let forceRepick = false;
    if (cachedOk && isAiTrack(tt[cached])) {
      try {
        for (let i = 0; i < tt.length; i++) {
          if (i === cached || !tt[i] || isAiTrack(tt[i])) continue;
          const n = tt[i].cues ? tt[i].cues.length : 0;
          if (n > 0) { forceRepick = true; break; }
        }
      } catch (e) {}
    }
    if (cachedOk && !forceRepick && (player._autoSig === sig || nowMs - (player._autoAt || 0) < 1500)) {
      // Still refresh signs companion while dialogue cache holds
      pickSignsTrack(player, tt, cached);
      return cached;
    }

    const scored = scoreTextTracks(tt);
    const dc = pickDialogueCand(player, tt, scored);
    let best = dc ? dc.i : -1;
    player._autoAt = nowMs;
    if (best === -1 && cached != null && cached >= 0 && cached < tt.length) best = cached;
    player._autoTrackIndex = best;
    player._autoSig = sig;
    pickSignsTrack(player, tt, best, scored);
    try {
      const pick = best >= 0 ? tt[best] : null;
      console.log('[LGV] Auto dialogue →', best, pick && (pick.label || pick.id || ''),
        ' | signs →', player._autoSignsIndex);
      console.log('[LGV] Auto candidates', scored.cands.map(c => ({
        track: c.i, label: c.t.label || c.t.id || '', cues: c.n, english: !!c.eng, ai: isAiTrack(c.t),
        clean: +c.clean.toFixed(2), sdh: c.sdh, signsOnly: c.partial, spoken: c.dialogue
      })));
    } catch (e) {}
    return best;
  }

  // Companion signs track for the right-centre overlay.
  // Every other subtitle track is read and scored (label, cue count vs the
  // dialogue track, speech vs sign-card patterns, positioning, timing
  // overlap with the dialogue). A track becomes the signs track ONLY if it
  // scores as one; otherwise there is no companion and nothing extra shows.
  function pickSignsTrack(player, tt, dialogueIndex, scoredIn) {
    let sig = String(tt.length) + '@' + dialogueIndex;
    for (let i = 0; i < tt.length; i++) {
      const c = tt[i] && tt[i].cues;
      sig += ':' + (c ? c.length : 0);
    }
    // Same tracks, same cue counts, same dialogue pick → same answer
    // (including "no signs track"), so don't rescan every tick.
    if (player._autoSignsSig === sig && typeof player._autoSignsIndex === 'number') {
      return player._autoSignsIndex;
    }

    // 8.10.92: a track the user set to Signs always wins over the scoring.
    for (let i = 0; i < tt.length; i++) {
      if (i === dialogueIndex || !tt[i]) continue;
      if (trackRoleOf(player, tt[i], i) === 'signs') {
        player._autoSignsIndex = i;
        player._autoSignsSig = sig;
        return i;
      }
    }

    const scored = scoredIn || scoreTextTracks(tt);
    const dlg = scored.cands.find(c => c.i === dialogueIndex);
    let best = -1, bestKey = null;
    for (const c of scored.cands) {
      if (c.i === dialogueIndex) continue;
      if (trackRoleOf(player, c.t, c.i) === 'dialogue') continue;   // user: this one is dialogue
      const s = signsTrackScore(c, dlg, scored.maxCues);
      if (s < SIGNS_ACCEPT || c.n < 2) continue;
      const key = [s, c.eng, c.signish];
      let better = false;
      if (!bestKey) better = true;
      else {
        for (let k = 0; k < key.length; k++) {
          if (key[k] > bestKey[k]) { better = true; break; }
          if (key[k] < bestKey[k]) break;
        }
      }
      if (better) { best = c.i; bestKey = key; }
    }
    player._autoSignsIndex = best;
    player._autoSignsSig = sig;
    try {
      console.log('[LGV] Signs scan (dialogue ' + dialogueIndex + ') → ' + best,
        scored.cands.filter(c => c.i !== dialogueIndex).map(c => ({
          track: c.i, label: c.t.label || c.t.id || '', cues: c.n, score: c.signScore,
          speech: +c.speech.toFixed(2), signCards: +c.signish.toFixed(2),
          timing: c.timeMatch != null ? +c.timeMatch.toFixed(2) : null
        })));
    } catch (e) {}
    return best;
  }

  // 8.10.75: which tracks are SIGNS tracks. Read-only helper used for the
  // "(signs)" tag in the Subtitle Track list and for multi-select. It reuses
  // the existing scoring and never changes how subtitles are fetched.
  function classifyTracks(player, tt) {
    let sig = String(tt.length);
    for (let i = 0; i < tt.length; i++) {
      const c = tt[i] && tt[i].cues;
      sig += ':' + (c ? c.length : 0);
    }
    const nowMs = Date.now();
    // Same tracks, or looked at less than 1.5 s ago: reuse (cues stream in while loading).
    if (player._cls && (player._clsSig === sig || nowMs - (player._clsAt || 0) < 1500)) return player._cls;
    const out = { dlg: -1, signs: new Set(), sig: sig };
    try {
      const scored = scoreTextTracks(tt);
      const cands = scored.cands;
      const dlg = pickDialogueCand(player, tt, scored);
      out.dlg = dlg ? dlg.i : -1;
      // The signs track the overlay would use (same scoring and tie-break as the
      // existing pick), plus any other track that is labelled signs / forced.
      let best = null, sKey = null;
      for (const c of cands) {
        if (dlg && c.i === dlg.i) continue;
        if (trackRoleOf(player, c.t, c.i) === 'dialogue') continue;   // user: this one is dialogue
        const s = signsTrackScore(c, dlg, scored.maxCues);
        if (s < SIGNS_ACCEPT || c.n < 2) continue;
        if (c.labelSignsWord) out.signs.add(c.i);
        const key = [s, c.eng, c.signish];
        let better = !sKey;
        if (sKey) {
          for (let k = 0; k < key.length; k++) {
            if (key[k] > sKey[k]) { better = true; break; }
            if (key[k] < sKey[k]) break;
          }
        }
        if (better) { best = c; sKey = key; }
      }
      if (best) out.signs.add(best.i);
      // 8.10.92: every track the user set to Signs is a signs track.
      for (let i = 0; i < tt.length; i++) {
        if (tt[i] && trackRoleOf(player, tt[i], i) === 'signs') out.signs.add(i);
      }
    } catch (e) {}
    player._clsSig = sig;
    player._clsAt = nowMs;
    player._cls = out;
    return out;
  }

  // Sign overlay (right-centre). English meanings of on-screen text go here:
  // dates, times, places, countdowns, short title cards — including lines like
  // "November 12th 12:00 Tokyo" and "(Remaining Time … 7 Days 12 Hours)".
  // Spoken dialogue stays at the bottom. Dual-track: dialogue + signs.
  const DIALOGUE_QUOTES = /["\u201C\u201D\u300C\u300D\u300E\u300F']/;
  // 8.10.125: a ' (or ’) between two letters is an apostrophe (Sasakibe's, captain's), not a quote mark.
  const QUOTE_TEST_RE = /["\u201C\u201D\u300C\u300D\u300E\u300F]|(^|[^A-Za-z\u00C0-\u024F])['\u2018\u2019]|['\u2018\u2019]($|[^A-Za-z\u00C0-\u024F])/;
  function hasQuoteMark(t) { return QUOTE_TEST_RE.test(String(t || '')); }
  // Real speech only — do NOT list sign-vocab (remaining/until/tokyo/days…)
  const SPEECH_HARD_RE = /\b(I|I'm|I'll|I've|I'd|you|you're|you'll|he|she|we|they|it's|that's|there's|hello|hi|hey|am|said|say|know|think|want|need|like|just|really|about|from|with|for|but|don't|didn't|what|when|where|why|how|also|might|tell|taking|players|fight|death|barrier|culling game)\b/i;
  const HAS_TIME = /\b\d{1,2}\s*[:\uFF1A]\s*\d{2}\b/;
  const HAS_DATE = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2}(st|nd|rd|th)?\b|\b\d{1,2}(st|nd|rd|th)\b|\d{1,2}\s*\u6708\s*\d{1,2}\s*\u65e5/i;
  const HAS_PLACE = /\b(tokyo|osaka|kyoto|nagoya|sapporo|fukuoka|kobe|yokohama|okinawa|hokkaido|shibuya|shinjuku|ikebukuro|london|paris|new york|berlin|rome|seoul|beijing|shanghai|hong kong|singapore|bangkok|sydney|\u6771\u4eac|\u5927\u962a|\u4eac\u90fd)\b/i;
  const HAS_COUNTDOWN = /\b\d+\s*(days?|hours?|hrs?|minutes?|mins?)\b|\d+\s*\u65e5|\d+\s*\u6642\u9593/i;
  const HAS_SIGN_HINT = /\b(remaining\s+time|time\s+until|countdown|deadline|location|place:)\b/i;

  // Spoken-line detector (English-leaning). Used to keep dialogue out of
  // the signs overlay and to tell dialogue tracks from signs tracks.
  const SPEECHY_RE = /\b(I|I'm|I'll|I've|I'd|you|you're|you'll|we|we're|he|she|they|it's|that's|there's|let's|don't|didn't|can't|won't|isn't|hello|hey|please|thank|thanks|sorry|said|know|think|want|need|really|just|what|why|how)\b/i;
  function looksLikeSpeech(text) {
    const t = String(text || '').trim();
    if (!t) return false;
    // Quotes alone are NOT speech — title cards and on-screen text often
    // arrive wrapped in " " or 「」. Real dialogue needs speech words,
    // a question/exclaim, or a longer punctuated sentence.
    if (SPEECHY_RE.test(t) || /[!?…]/.test(t)) return true;
    if (/\b(is|are|was|were|will|would|can|could|should|has|have|had)\b/i.test(t) && /[.,]/.test(t)) return true;
    if (t.length > 45 && /[.,;]/.test(t)) return true;
    return false;
  }

  function isSignBlock(text) {
    const raw = String(text || '').trim();
    if (!raw) return false;
    // Long spoken paragraphs stay bottom
    if (raw.length > 160) return false;
    // Quoted + clearly spoken → dialogue (keep bottom). Bare quotes on a
    // short card are allowed through so title cards stop cluttering dialogue.
    if (hasQuoteMark(raw) && (raw.length > 90 || SPEECH_HARD_RE.test(raw))) return false;
    // Clear speech dialogue → not a sign
    if (SPEECH_HARD_RE.test(raw) && !HAS_TIME.test(raw) && !HAS_DATE.test(raw) && !HAS_PLACE.test(raw) && !HAS_COUNTDOWN.test(raw)) {
      return false;
    }
    // Must look like a sign card / translation of on-screen text
    const hits = [HAS_TIME, HAS_DATE, HAS_PLACE, HAS_COUNTDOWN, HAS_SIGN_HINT].filter(re => re.test(raw)).length;
    if (hits >= 1 && raw.length <= 120) return true;
    // Short pure JP / CJK intertitle (date cards, clan-name title cards, etc.)
    if (!/[A-Za-z]/.test(raw) && raw.length <= 28) {
      if (/[:\uFF1A]/.test(raw) || /\u6708/.test(raw) || /\u65e5/.test(raw) || /\u6642\u9593/.test(raw))
        return true;
      // Short CJK-only card with no speech punctuation → treat as sign/title
      const compact = raw.replace(/[\s"'“”「」『』]/g, '');
      if (compact.length >= 2 && compact.length <= 16 && !/[!?…]/.test(raw))
        return true;
    }
    // Short quoted English title card (no speech words): e.g. "The next day"
    if (hasQuoteMark(raw) && raw.length <= 60 && !SPEECH_HARD_RE.test(raw) && !SPEECHY_RE.test(raw))
      return true;
    return false;
  }

  function signLinesOf(text) {
    const raw = String(text || '').trim();
    if (!raw || !isSignBlock(raw)) return '';
    return raw;
  }

  // Pattern rule for a mixed track: a short non-speech cue that is placed on the
  // picture (WebVTT line/position, or ASS \\pos / \\an) while MOST of the
  // track's cues are not placed is a sign. If every cue is placed, none is odd.
  function cuePlaced(c) {
    try {
      return (c.line !== undefined && c.line !== 'auto') ||
             (c.position !== undefined && c.position !== 'auto') ||
             /\\(pos|move|an[1-9])\b/i.test(c.text || '');
    } catch (e) { return false; }
  }
  function trackPlacedShare(track) {
    const cues = track.cues ? Array.from(track.cues) : [];
    const cached = track._lgvPlaced;
    if (cached && cached.n === cues.length) return cached.r;
    let hit = 0, seen = 0;
    const step = Math.max(1, Math.floor(cues.length / 150));
    for (let k = 0; k < cues.length; k += step) { seen++; if (cuePlaced(cues[k])) hit++; }
    const r = seen ? hit / seen : 0;
    try { track._lgvPlaced = { n: cues.length, r: r }; } catch (e) {}
    return r;
  }
  function isOddPlacedCue(track, cue, text) {
    if (!text || text.length > 90 || looksLikeSpeech(text)) return false;
    if (!cuePlaced(cue)) return false;
    const r = trackPlacedShare(track);
    return r > 0 && r <= 0.35;
  }

  // ---- Cue cache so Subtitle Delay actually works ----
  // Many streams only expose activeCues (tied to real currentTime) and an
  // incomplete cues list. We accumulate every cue we ever see per track, then
  // always filter by the delayed time `now`. Without this, changing Delay had
  // no effect whenever the browser fell back to activeCues.
  const _cueCache = new WeakMap(); // TextTrack -> Map(key -> {startTime,endTime,text})
  function harvestCues(track) {
    if (!track) return;
    let map = _cueCache.get(track);
    if (!map) { map = new Map(); _cueCache.set(track, map); }
    const take = (c) => {
      if (!c) return;
      const st = c.startTime, en = c.endTime;
      if (!(en > st) || !isFinite(st) || !isFinite(en)) return;
      const key = st.toFixed(3) + '|' + en.toFixed(3) + '|' + String(c.text || '').slice(0, 80);
      if (!map.has(key)) map.set(key, { startTime: st, endTime: en, text: c.text });
    };
    try { if (track.cues) for (let i = 0; i < track.cues.length; i++) take(track.cues[i]); } catch (e) {}
    try { if (track.activeCues) for (let i = 0; i < track.activeCues.length; i++) take(track.activeCues[i]); } catch (e) {}
    return map;
  }
  function cuesLiveAt(track, now) {
    const map = harvestCues(track);
    if (!map || !map.size) {
      // Last resort: activeCues only (delay cannot apply to pure activeCues)
      try {
        if (track.activeCues && track.activeCues.length)
          return Array.from(track.activeCues).sort((a, b) => a.startTime - b.startTime);
      } catch (e) {}
      return [];
    }
    const live = [];
    map.forEach(c => { if (c.startTime <= now && now < c.endTime) live.push(c); });
    live.sort((a, b) => a.startTime - b.startTime);
    return live;
  }

  // Every cue live at delayed time `now` on a track, in start order.
  // Sign-like cues are not returned as dialogue; they go into signsOut.
  function cueLinesAt(track, now, signsOut, showAll) {
    if (!track) return '';
    const live = cuesLiveAt(track, now);
    const lines = [];
    live.forEach(c => {
      const text = cleanCueText(c.text);
      if (!text) return;
      const signText = (signsOut && !showAll) ? (signLinesOf(text) || (isOddPlacedCue(track, c, text) ? text : '')) : '';
      if (signText) {
        if (signsOut) signsOut.push({ key: String(c.startTime) + '|' + signText, text: signText });
        if (signText === text.trim()) return;
      }
      if (!showAll && !looksLikeSpeech(text) && isSignBlock(text)) return;
      lines.push(text);
    });
    return lines.join('\n');
  }

  // "1080p", "720p", "4K / 2160p" -> pixel height; null for Auto or unlabeled.
  function qualityHeight(label) {
    const m = String(label).match(/(\d{3,4})\s*p/i);
    if (m) return parseInt(m[1], 10);
    if (/\b4k\b/i.test(label)) return 2160;
    return null;
  }

  // Subtitle markup. Style switches are converted to private-use marker
  // characters so they survive cleaning and can be applied at display time:
  //   \uE001 italic on   \uE002 italic off   \uE003 bold on   \uE004 bold off
  // Supported inputs: {italic}/{/italic}, {i}/{/i}, <i>/</i>, ASS \i1/\i0,
  // and the same for bold. {break} is a line break. Any other {...} or HTML
  // tag is dropped so raw markup never reaches the screen.
  // Glass boxes are rounded with 1.05em. On a one-line box that is taller than
  // half its height, so both ends become full half-circles. Cap the radius to
  // about a third of the box height (in em of the box's own text size): a
  // one-line box gets squarer ends, while two lines or more stay at 1.05em, the
  // same roundness as before.
  function setCapRadius(el) {
    try {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      const h = el.offsetHeight;
      if (!fs || !h) return;
      const r = Math.min(1.05, (h / fs) * 0.32);
      el.style.setProperty('--lgv-cap-r', r.toFixed(3) + 'em');
    } catch (e) {}
  }
  function observeCapRadius(el) {
    if (!el || typeof ResizeObserver === 'undefined') return;
    try { new ResizeObserver(() => setCapRadius(el)).observe(el); } catch (e) {}
  }

  // Removes lines with nothing visible on them (also lines holding only style
  // markers or zero-width characters). Style markers on a dropped line move to
  // the next line so italic/bold state isn't lost. A leftover empty line is
  // what made the Glass subtitle box taller at the top than the text needed.
  function dropBlankLines(text) {
    const out = [];
    let carry = '';
    String(text).split('\n').forEach(line => {
      const visible = line.replace(/[\uE001-\uE004\u200B-\u200D\u2060\uFEFF\s]/g, '');
      if (!visible) { carry += line.replace(/[^\uE001-\uE004]/g, ''); return; }
      out.push(carry + line);
      carry = '';
    });
    return out.join('\n');
  }
  function cleanCueText(str) {
    return dropBlankLines(cleanCueTextRaw(str));
  }
  function cleanCueTextRaw(str) {
    if (str == null) return '';
    return String(str)
      // 8.10.103: real line breaks must survive. <br>, block tags, literal ASS \\N / \\n
      // (outside {...} override blocks), \\h hard space and Unicode line separators used to be
      // stripped with the other tags, which glued words together ("confinedQuincy").
      .replace(/\r\n?/g, '\n')
      // 8.10.104: every other way a converter can encode "new line" or "word gap": HTML entities,
      // control characters (VT, FF, FS-US, NEL), and zero-width characters sitting between two words.
      .replace(/&(?:#0*10|#x0*a|NewLine);/gi, '\n')
      .replace(/&(?:nbsp|#0*160|#x0*a0|ensp|emsp|thinsp);/gi, ' ')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u2028\u2029]/g, '\n')
      .replace(/([A-Za-z0-9,.!?;:'")\]\u2019\u201D])[\u200B\u2060\uFEFF\u200E\u200F]+(?=[A-Za-z0-9'"(\[\u2018\u201C])/g, '$1 ')
      .replace(/[\u200B\u2060\uFEFF\u200E\u200F]/g, '')
      .replace(/<\s*br\s*\/?\s*>/gi, '\n')
      .replace(/<\s*\/\s*(p|div|li|tr)\s*>/gi, '\n')
      .replace(/<\s*(p|div|li|tr)(\s[^>]*)?>/gi, '')
      .replace(/\{[^}]*\}|\\[Nn]|\\h/g, m => m.charAt(0) === '{' ? (/\\[Nn]/.test(m) ? '\n' : (/\\h/.test(m) ? ' ' : m)) : (m === '\\h' ? ' ' : '\n'))
      .replace(/\{\s*break\s*\}/gi, '\n')
      .replace(/<\s*i\s*>/gi, '\uE001').replace(/<\/\s*i\s*>/gi, '\uE002')
      .replace(/<\s*b\s*>/gi, '\uE003').replace(/<\/\s*b\s*>/gi, '\uE004')
      .replace(/\{\s*(italic|i)\s*\}|\\i1/gi, '\uE001')
      .replace(/\{\s*\/\s*(italic|i)\s*\}|\\i0/gi, '\uE002')
      .replace(/\{\s*(bold|b)\s*\}|\\b1/gi, '\uE003')
      .replace(/\{\s*\/\s*(bold|b)\s*\}|\\b0/gi, '\uE004')
      .replace(/\{[^}]*\}/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  // Builds real <i>/<b> DOM for a subtitle line (no innerHTML, no raw markup).
  function renderCueMarkup(el, text) {
    el.textContent = '';
    let buf = '', bi = false, bb = false;
    const flush = (i, b) => {
      if (!buf) return;
      let node = document.createTextNode(buf);
      if (bb) { const e = document.createElement('b'); e.appendChild(node); node = e; }
      if (bi) { const e = document.createElement('i'); e.appendChild(node); node = e; }
      el.appendChild(node);
      buf = '';
    };
    for (const ch of text) {
      if (ch === '\uE001' || ch === '\uE002' || ch === '\uE003' || ch === '\uE004') {
        flush();
        if (ch === '\uE001') bi = true; else if (ch === '\uE002') bi = false;
        else if (ch === '\uE003') bb = true; else bb = false;
      } else if (ch === '\n' || ch === '\u2028' || ch === '\u2029') {
        flush();
        // 8.10.106: a real newline character, not <br>. Some sites hide every <br> with their own CSS,
        // which made two-line subtitles glue together. pre-line (below) keeps the newline visible.
        el.appendChild(document.createTextNode('\n'));
      } else {
        // Style changes are handled by flushing on each marker, so buf always
        // holds a run with a single style.
        buf += ch;
      }
    }
    flush();
  }

  function parseSrtOrVtt(text) {
    const cues = [];
    const blocks = text.replace(/\r/g, '').split(/\n\n+/);
    for (const block of blocks) {
      const lines = block.split('\n').filter(l => l.trim() !== '');
      if (!lines.length) continue;
      const timeLineIdx = lines.findIndex(l => l.includes('-->'));
      if (timeLineIdx === -1) continue;
      const [startStr, endStr] = lines[timeLineIdx].split('-->');
      const start = srtVttTimeToSec(startStr);
      const end = srtVttTimeToSec(endStr);
      if (start === null || end === null) continue;
      const content = cleanCueText(lines.slice(timeLineIdx + 1).join('\n'));
      if (content) cues.push({ start, end, text: content });
    }
    return cues;
  }

  function assTimeToSec(str) {
    const m = str.trim().match(/(\d+):(\d{2}):(\d{2})[.,](\d{1,2})/);
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const s = parseInt(m[3], 10);
    const cs = parseInt(m[4].padEnd(2, '0'), 10);
    return h * 3600 + min * 60 + s + cs / 100;
  }

  function parseAss(text) {
    const cues = [];
    const lines = text.replace(/\r/g, '').split('\n');
    let fields = null;
    for (const raw of lines) {
      const line = raw.trim();
      if (/^Format:/i.test(line)) {
        fields = line.replace(/^Format:/i, '').split(',').map(f => f.trim().toLowerCase());
        continue;
      }
      if (!/^Dialogue:/i.test(line)) continue;
      const rest = line.replace(/^Dialogue:/i, '');
      const cols = fields ? fields.length : 10;
      const parts = rest.split(',');
      // Text is everything after the (cols - 1)th comma, since dialogue text can contain commas.
      const head = parts.slice(0, cols - 1);
      const textPart = parts.slice(cols - 1).join(',');
      const startIdx = fields ? fields.indexOf('start') : 1;
      const endIdx = fields ? fields.indexOf('end') : 2;
      const startStr = head[startIdx >= 0 ? startIdx : 1];
      const endStr = head[endIdx >= 0 ? endIdx : 2];
      const start = assTimeToSec(startStr || '');
      const end = assTimeToSec(endStr || '');
      if (start === null || end === null) continue;
      const clean = cleanCueText(textPart.replace(/\\N|\\n/g, '\n'));
      if (clean) cues.push({ start, end, text: clean });
    }
    return cues;
  }

  function parseSubtitleFile(url, text) {
    const clean = url.split('?')[0].toLowerCase();
    if (clean.endsWith('.ass') || clean.endsWith('.ssa') || /^\s*\[script info\]/i.test(text)) {
      return parseAss(text);
    }
    return parseSrtOrVtt(text);
  }

  function labelFromSubUrl(url) {
    try {
      const name = decodeURIComponent(url.split('?')[0].split('/').pop() || 'Subtitle');
      const langMatch = name.match(/[._-]([a-z]{2}(-[A-Z]{2})?)\.(vtt|srt|ass|ssa)$/i);
      if (langMatch) return langMatch[1].toUpperCase();
      const bare = name.replace(/\.(vtt|srt|ass|ssa)$/i, '') || 'External';
      // CDN hash filenames (e.g. 4ebff02dce7ee0cb078d42dbb9bb6bd1) → friendly name
      if (/^[a-f0-9]{16,}$/i.test(bare) || /^[0-9a-f-]{20,}$/i.test(bare)) return 'English';
      return bare;
    } catch (e) {
      return 'External';
    }
  }
  // Safe display / file-tag label: never use raw hashes in the UI or filenames.
  function dlFriendlySubLabel(raw, role) {
    const s = String(raw || '').trim();
    if (!s || /^[a-f0-9]{12,}$/i.test(s) || /^[0-9a-f-]{20,}$/i.test(s) || /^track[_\s-]?\d+/i.test(s)) {
      return role === 'signs' ? 'Signs' : 'English';
    }
    if (/sign/i.test(s)) return 'Signs';
    return s.slice(0, 40);
  }
  function dlSafeSubTag(raw, role, index) {
    if (role === 'signs') return '.signs';
    if (index === 0) return ''; // primary dialogue → exact same name as the video
    const s = String(raw || '').trim();
    if (!s || /^[a-f0-9]{12,}$/i.test(s) || /^[0-9a-f-]{20,}$/i.test(s)) return index ? ('.' + (index + 1)) : '';
    const clean = s.replace(/[\\\/:*?"<>|\s]+/g, '_').replace(/_+/g, '_').slice(0, 24);
    return clean ? ('.' + clean) : (index ? ('.' + (index + 1)) : '');
  }

  // ---- Subtitle label prettifier (display only) ----
  // Some sites hand us raw internal names like "track_4_ger" or
  // "track_16_Simplified_chi" instead of a real label. This turns those into
  // readable names ("German", "Chinese (Simplified)") purely for what the
  // Settings panel shows the user. It never touches discovery, fetching, or
  // track selection — untouched labels are still used for matching tracks,
  // this only changes the text painted into the dropdown item.
  const LANG_NAMES = {
    eng: 'English', en: 'English',
    ger: 'German', deu: 'German', de: 'German',
    fre: 'French', fra: 'French', fr: 'French',
    chi: 'Chinese', zho: 'Chinese', zh: 'Chinese',
    jpn: 'Japanese', ja: 'Japanese',
    kor: 'Korean', ko: 'Korean',
    spa: 'Spanish', es: 'Spanish',
    ita: 'Italian', it: 'Italian',
    por: 'Portuguese', pt: 'Portuguese',
    rus: 'Russian', ru: 'Russian',
    ara: 'Arabic', ar: 'Arabic',
    dut: 'Dutch', nld: 'Dutch', nl: 'Dutch',
    swe: 'Swedish', sv: 'Swedish',
    nor: 'Norwegian', nob: 'Norwegian', nno: 'Norwegian', no: 'Norwegian',
    dan: 'Danish', da: 'Danish',
    fin: 'Finnish', fi: 'Finnish',
    pol: 'Polish', pl: 'Polish',
    tur: 'Turkish', tr: 'Turkish',
    gre: 'Greek', ell: 'Greek', el: 'Greek',
    heb: 'Hebrew', he: 'Hebrew',
    hin: 'Hindi', hi: 'Hindi',
    tha: 'Thai', th: 'Thai',
    vie: 'Vietnamese', vi: 'Vietnamese',
    ind: 'Indonesian', id: 'Indonesian',
    may: 'Malay', msa: 'Malay', ms: 'Malay',
    ukr: 'Ukrainian', uk: 'Ukrainian',
    ces: 'Czech', cze: 'Czech', cs: 'Czech',
    slk: 'Slovak', slo: 'Slovak', sk: 'Slovak',
    hun: 'Hungarian', hu: 'Hungarian',
    ron: 'Romanian', rum: 'Romanian', ro: 'Romanian',
    bul: 'Bulgarian', bg: 'Bulgarian',
    hrv: 'Croatian', hr: 'Croatian',
    srp: 'Serbian', sr: 'Serbian',
    slv: 'Slovenian', sl: 'Slovenian',
    lit: 'Lithuanian', lt: 'Lithuanian',
    lav: 'Latvian', lv: 'Latvian',
    est: 'Estonian', et: 'Estonian',
    fil: 'Filipino', tgl: 'Tagalog', tl: 'Tagalog',
    per: 'Persian', fas: 'Persian', fa: 'Persian',
    urd: 'Urdu', ur: 'Urdu',
    ben: 'Bengali', bn: 'Bengali',
    tam: 'Tamil', ta: 'Tamil',
    tel: 'Telugu', te: 'Telugu',
    mal: 'Malayalam', ml: 'Malayalam',
    mar: 'Marathi', mr: 'Marathi',
    guj: 'Gujarati', gu: 'Gujarati',
    pan: 'Punjabi', pa: 'Punjabi',
    kan: 'Kannada', kn: 'Kannada',
    bur: 'Burmese', mya: 'Burmese', my: 'Burmese',
    khm: 'Khmer', km: 'Khmer',
    lao: 'Lao', lo: 'Lao',
    mon: 'Mongolian', mn: 'Mongolian',
    nep: 'Nepali', ne: 'Nepali',
    sin: 'Sinhala', si: 'Sinhala',
    geo: 'Georgian', kat: 'Georgian', ka: 'Georgian',
    arm: 'Armenian', hye: 'Armenian', hy: 'Armenian',
    aze: 'Azerbaijani', az: 'Azerbaijani',
    kaz: 'Kazakh', kk: 'Kazakh',
    uzb: 'Uzbek', uz: 'Uzbek',
    cat: 'Catalan', ca: 'Catalan',
    baq: 'Basque', eus: 'Basque', eu: 'Basque',
    glg: 'Galician', gl: 'Galician',
    ice: 'Icelandic', isl: 'Icelandic', is: 'Icelandic',
    mac: 'Macedonian', mkd: 'Macedonian', mk: 'Macedonian',
    alb: 'Albanian', sqi: 'Albanian', sq: 'Albanian',
    bos: 'Bosnian', bs: 'Bosnian',
    wel: 'Welsh', cym: 'Welsh', cy: 'Welsh',
    gle: 'Irish', ga: 'Irish',
    afr: 'Afrikaans', af: 'Afrikaans',
    swa: 'Swahili', sw: 'Swahili',
    amh: 'Amharic', am: 'Amharic',
    zul: 'Zulu', zu: 'Zulu',
    xho: 'Xhosa', xh: 'Xhosa'
  };

  const MODIFIER_NAMES = {
    sdh: 'SDH',
    cc: 'CC',
    forced: 'Forced',
    simplified: 'Simplified',
    traditional: 'Traditional',
    european: 'European',
    latin: 'Latin American',
    full: 'Full',
    signs: 'Signs',
    songs: 'Songs & Signs',
    dubtitle: 'Dubtitle',
    commentary: 'Commentary'
  };

  function titleCaseWord(w) {
    return w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w;
  }

  // A raw label that's just an opaque hash/UUID (some sites hand these out
  // as the track's "name" internally) carries zero information for a
  // viewer, so it gets swapped for a plain numbered fallback instead of
  // ever being shown verbatim.
  function looksLikeMeaninglessId(s) {
    if (!s) return true;
    return /^[0-9a-f]{16,}$/i.test(s) ||
           /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
  }

  function prettySubtitleLabel(raw, fallbackIndex, track) {
    const trimmed = (raw || '').trim();
    // Only reshape the site's own "track_<n>_[modifier_]<langCode>" pattern.
    // Anything else (a site that already sends "English", "Japanese", etc.)
    // is left exactly as-is, unless it trips the meaningless-id check below.
    const parts = trimmed.split('_');
    if (parts.length >= 3 && /^track$/i.test(parts[0]) && /^\d+$/.test(parts[1])) {
      const langToken = parts[parts.length - 1].toLowerCase();
      const langName = LANG_NAMES[langToken];
      if (langName) {
        const modifierText = parts
          .slice(2, parts.length - 1)
          .map(w => MODIFIER_NAMES[w.toLowerCase()] || titleCaseWord(w))
          .join(' ');
        return modifierText ? `${langName} (${modifierText})` : langName;
      }
      // unrecognized lang code on an otherwise-matching pattern: fall through
      // to the meaningless-id / raw-passthrough checks below rather than
      // guessing at it.
    }
    if (looksLikeMeaninglessId(trimmed)) {
      // Prefer a real language name pulled from the track's own `language`
      // field, if it has one, over a bare "Subtitle N".
      const lang = track && track.language && LANG_NAMES[track.language.toLowerCase()];
      if (lang) return lang;
      return `Subtitle ${fallbackIndex != null ? fallbackIndex + 1 : ''}`.trim();
    }
    return raw;
  }

  // ---- English-priority matching for Auto Detect ----
  // Deliberately matches on the track's own `language` tag and its label,
  // never on the display name being literally "English" -- a track named
  // "eng-2", "Subtitle 1", or a raw hash-id label should win exactly as
  // readily as one a site actually bothered to label "English", as long as
  // its language metadata (or a "track_4_eng"-shaped label, or a plain
  // "eng"/"en" token in the label) says so.
  // 8.10.97: the site's AI / machine-made subtitle tracks ("AI", "English (AI)", "AI-eng",
  // "auto-generated", "machine translated"). They often get names and wording wrong, so
  // Auto Detect only uses one when no other usable track exists. Whole-word match only
  // (never "Kai", "Mai"). They still count as English for the English-first rule.
  function isAiTrack(t) {
    if (!t) return false;
    const name = ((t.label || '') + ' ' + (t.id || '')).toLowerCase();
    return /(^|[^a-z0-9])a\.?i\.?([^a-z0-9]|$)|auto[-_ ]?(generated|translat|caption|sub)|machine[-_ ]?(translat|generated)/.test(name);
  }

  function isEnglishTrack(t) {
    if (!t) return false;
    const lang = (t.language || '').toLowerCase().split('-')[0];
    if (lang && LANG_NAMES[lang] === 'English') return true;
    // An AI track with no (or an unknown) language tag is the English AI subtitle.
    if (isAiTrack(t) && !(lang && LANG_NAMES[lang])) return true;
    const label = (t.label || '').trim();
    if (!label) return false;
    // Same "track_<n>_[modifier_]<langCode>" shape prettySubtitleLabel
    // above already unpacks for display purposes.
    const parts = label.split('_');
    if (parts.length >= 3 && /^track$/i.test(parts[0]) && /^\d+$/.test(parts[1])) {
      if (LANG_NAMES[parts[parts.length - 1].toLowerCase()] === 'English') return true;
    }
    // Whole-word "en"/"eng"/"english" anywhere in the label ("eng-2",
    // "ENG", "English (US)", "Sub - EN") without matching inside a longer
    // word it's merely a substring of ("Bengali" must never match: the
    // "en" there isn't preceded by a word boundary).
    return /(^|[^a-z])en(g|glish)?([^a-z]|$)/i.test(label);
  }

  // ---- Hardcore, "no guesses" subtitle discovery pipeline ----
  // A single shared registry so every detection method — passive DOM/script
  // scanning, live network interception, and deep object-graph scanning — all
  // feed the same place, and every <video> on the page benefits regardless of
  // which method actually caught a given file.
  const subtitleFileCache = new Map(); // url -> { label, cues }
  const subtitleUrlsSeen = new Set();  // urls already attempted (success or fail)
  const subtitleUrlsInFlight = new Set();

  function isSubtitleUrl(url) {
    return typeof url === 'string' && /\.(vtt|srt|ass|ssa)(?:[?#]|$)/i.test(url);
  }
  function isSubtitleContentType(ct) {
    if (!ct) return false;
    ct = ct.toLowerCase();
    return ct.indexOf('text/vtt') !== -1 ||
           ct.indexOf('application/x-subrip') !== -1 ||
           ct.indexOf('text/x-ssa') !== -1 ||
           ct.indexOf('application/x-ass') !== -1 ||
           ct.indexOf('text/srt') !== -1;
  }

  function ingestSubtitleText(url, text) {
    if (!text || subtitleFileCache.has(url)) return;
    try {
      const cues = parseSubtitleFile(url, text);
      if (cues.length) subtitleFileCache.set(url, { label: labelFromSubUrl(url), cues });
    } catch (e) {}
  }

  // Used by passive scanners (DOM/script/perf-entry candidates) that only
  // have a URL, not a response body in hand yet.
  function maybeFetchSubtitleUrl(url) {
    if (!url || subtitleUrlsSeen.has(url) || subtitleUrlsInFlight.has(url)) return;
    subtitleUrlsSeen.add(url);
    subtitleUrlsInFlight.add(url);
    fetch(url, { credentials: 'include' })
      .then(r => (r.ok ? r.text() : Promise.reject(new Error('HTTP ' + r.status))))
      .then(text => ingestSubtitleText(url, text))
      .catch(() => {})
      .finally(() => subtitleUrlsInFlight.delete(url));
  }

  // Live network interception: catches subtitle files the moment the page's
  // own player (hls.js, dash.js, a custom loader, whatever) requests them —
  // whether or not the URL looks like a subtitle file, by also checking the
  // real Content-Type of every response. This is the "no guesses" layer:
  // it doesn't need the file to match a naming pattern at all.
  (function installNetworkInterception() {
    if (window.__lgvNetHook) return;
    window.__lgvNetHook = true;

    const origFetch = window.fetch;
    if (typeof origFetch === 'function') {
      window.fetch = function (input, init) {
        const url = typeof input === 'string' ? input : (input && input.url) || '';
        return origFetch.apply(this, arguments).then(resp => {
          try {
            if (url && !subtitleUrlsSeen.has(url) && resp && resp.headers) {
              const ct = resp.headers.get('content-type') || '';
              if (isSubtitleUrl(url) || isSubtitleContentType(ct)) {
                subtitleUrlsSeen.add(url);
                resp.clone().text().then(text => ingestSubtitleText(url, text)).catch(() => {});
              }
            }
          } catch (e) {}
          return resp;
        });
      };
    }

    const OrigXHR = window.XMLHttpRequest;
    if (OrigXHR) {
      const origOpen = OrigXHR.prototype.open;
      const origSend = OrigXHR.prototype.send;
      OrigXHR.prototype.open = function (method, url) {
        this.__lgvUrl = url;
        return origOpen.apply(this, arguments);
      };
      OrigXHR.prototype.send = function () {
        this.addEventListener('load', function () {
          try {
            const url = this.__lgvUrl || this.responseURL || '';
            if (!url || subtitleUrlsSeen.has(url)) return;
            let ct = '';
            try { ct = this.getResponseHeader('content-type') || ''; } catch (e) {}
            if ((isSubtitleUrl(url) || isSubtitleContentType(ct)) && typeof this.responseText === 'string') {
              subtitleUrlsSeen.add(url);
              ingestSubtitleText(url, this.responseText);
            }
          } catch (e) {}
        });
        return origSend.apply(this, arguments);
      };
    }
  })();

  // Deep-ish object-graph scan of common player globals, for subtitle URLs
  // buried in a config object rather than ever hitting the network as a
  // clean request (e.g. constructed lazily, or already embedded in a JSON
  // blob assigned straight to a variable). Bounded and defensive: shallow
  // depth, node budget, WeakSet against cycles, everything wrapped so a
  // hostile getter or huge object can't hang the page.
  function scanGlobalsForSubtitleUrls() {
    const seen = new WeakSet();
    let budget = 4000;
    const found = [];
    const roots = [];
    ['Hls', 'dashjs', 'jwplayer', 'videojs', 'Clappr', 'Plyr', 'shaka'].forEach(k => {
      try { if (window[k]) roots.push(window[k]); } catch (e) {}
    });
    try {
      Object.keys(window).forEach(k => {
        if (/player|video|source|track/i.test(k)) {
          try {
            const v = window[k];
            if (v && typeof v === 'object' && !(v instanceof Node) && !(v instanceof Window)) roots.push(v);
          } catch (e) {}
        }
      });
    } catch (e) {}

    function walk(obj, depth) {
      if (!obj || depth > 3 || budget <= 0) return;
      if (typeof obj !== 'object' && typeof obj !== 'function') return;
      if (seen.has(obj)) return;
      seen.add(obj);
      let keys;
      try { keys = Object.keys(obj); } catch (e) { return; }
      for (const k of keys) {
        if (budget-- <= 0) return;
        let v;
        try { v = obj[k]; } catch (e) { continue; }
        if (typeof v === 'string') {
          if (isSubtitleUrl(v)) found.push(v);
        } else if (v && (typeof v === 'object')) {
          if (v instanceof Node || v instanceof Window) continue;
          walk(v, depth + 1);
        }
      }
    }
    roots.forEach(r => walk(r, 0));
    return found;
  }

  const players = new Set();
  // A <video> element can only ever have createMediaElementSource() called on
  // it once, ever — a second call throws. Sites that reuse the same <video>
  // tag across episodes (common in SPAs) would hit that on re-attach, the
  // error got silently swallowed, and the boost slider was left doing
  // nothing forever after. Keyed by the video element itself so a reused
  // node reuses its existing gain node instead of re-creating one.
  const audioGraphRegistry = new WeakMap(); // video -> { ctx, gainNode }

  class Player {
    constructor(video) {
      this.video = video;
      this.video.dataset.lgv = '1';
      this.video.controls = false;
      this.video.removeAttribute('controls');

      this.root = null;
      this.subs = null;
      this.hideTimer = null;
      this.dotHideTimer = null;
      this.scrubbing = false;
      this.lastSub = '';
      this.subsEnabled = true;
      this.showRemaining = false;
      this.settingsOpen = false;
      this._raf = null;
      this._lastPct = -1;

      // Defaults all labeled 1.0. New keys so any old huge size/position
      // (e.g. Size 2.1, Position 50) from earlier sessions are ignored.
      this.subSizeRatio = loadSetting('sub-size-v4', 0.0396);
      this.uiFont = loadSetting('ui-font', FONT_DEFAULT);
      if (!FONT_OPTIONS.some(f => f.id === this.uiFont)) this.uiFont = FONT_DEFAULT;
      this.subStyle = loadSetting('sub-style-v1', SUB_STYLE_DEFAULT);
      if (!STYLE_PRESETS.some(p => p.id === this.subStyle)) this.subStyle = SUB_STYLE_DEFAULT;
      // 8.10.98: Signs / Dialogue picks live only for this page now. They used to be saved
      // on the site and silently overrode Auto Detect on every later visit.
      this._trackRoles = {};
      try { clearSetting('track-roles-v1'); } catch (e) {}
      this.signStyle = loadSetting('sign-style-v1', SIGN_STYLE_DEFAULT);
      if (!STYLE_PRESETS.some(p => p.id === this.signStyle)) this.signStyle = SIGN_STYLE_DEFAULT;
      this.subPosRatio = loadSetting('sub-pos-v3', 0.01);
      this.outlineStrength = loadSetting('sub-outline-v1', 1.0);
      // Subtitle delay in seconds: + shows lines later, - earlier
      this.subDelay = Math.max(-120, Math.min(120, Number(loadSetting('sub-delay-v1', 0)) || 0));
      this.subSpacing = loadSetting('sub-spacing-v1', 1.0);
      this.playbackRate = 1;
      this.audioBoost = 1;
      this.audioCtx = null;
      this.gainNode = null;
      this.currentTrackIndex = -1;
      this._nudgeLock = false;

      // Pause-intent guard: active for a little while after this Player is
      // created, then permanently stood down the moment a real play happens
      // (see initPauseIntentGuard). Not time-limited beyond that window, so
      // it doesn't fight legitimate later interactions (headphone/lock-screen
      // media keys, etc.) — only the immediate resume-right-after-load case.
      this._pauseGuardDeadline = Date.now() + 15000;
      this._explicitPlayAction = false;

      this._lastRealSrc = this.video.currentSrc || this.video.src || null;

      // The quality the user picked for the current episode (null = none yet,
      // so the site's own choice is shown). Cleared when the episode changes.
      this.selectedQuality = null;

      // Player interaction lock (controls + zones + gestures). Not persisted —
      // locking is intentional per session so a refresh always starts unlocked.
      this.locked = false;

      // Simulated brightness (black-veil overlay only — see applyBrightness
      // for why nothing here can touch real device brightness). 1 = max =
      // no overlay at all. Persisted per site.
      this.brightness = loadSetting('brightness', 1);
      if (!isFinite(this.brightness)) this.brightness = 1;
      this.brightness = Math.max(0.15, Math.min(1, this.brightness));
      this._sideGesture = null; // 'bright' | 'vol' while dragging
      this._sideDidAdjust = false;

      // External / softcoded subtitle discovery state
      this._externalSubUrls = new Set();
      this._externalTracks = [];

      this.create();
      this.events();
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(() => {
          this.scaleEverything();
          this.updateSubsGap(this.root.classList.contains('show'));
        }).observe(this.video);
      }
      this.video.addEventListener('loadedmetadata', () => {
        this.scaleEverything();
        this.updateSubsGap(this.root.classList.contains('show'));
      });
      this.subtitleEngine();
      this.initBrightnessAdapt();
      this.initSubtitleGesture();
      this.initSideGestures();
      this.initHoldSpeed();
      this.initHoldUnlock();
      this.initSkipRelay();
      // Audio graph is created lazily on first boost > 100% (or when the
      // slider is moved). Creating MediaElementSource too early puts the
      // AudioContext in a suspended state and can silence autoplay until a
      // gesture — so we don't touch the audio path until the user asks.
      this.scaleEverything();
      this.applySpacing();
      this.applyFont();
      this.applyBrightness();
      this.updateSubsGap(false);
      this.refreshTrackList();
      this.discoverExternalSubtitles();
      this.initSettingsDrag();
      this.initQualityHeal();
      this.restoreSettingsPanelState();
      this.show();
      this.syncFsClass();
      this.update();
      this.updateIcons();
      this.renderBuffer();

      this._syncTimer = setInterval(() => {
        this.watchdog();
        this.updateIcons();
        if (!this.scrubbing) this.update();
        this.syncFsClass();
        this.stealNativeSkipMark();
        this.scanChapterTracks();
        this.renderSkipMarks();
        this.renderBuffer();
        this.updateBufferInfo();
        this.checkSourceChange();
        if (this.settingsOpen) this.paintSliders();
      }, 700);

      this._trackTimer = setInterval(() => {
        this.refreshTrackList();
        this.discoverExternalSubtitles();
      }, 4500);

      players.add(this);
    }

    watchdog() {
      if (!this.video.isConnected) { this.destroy(); return; }
      if (this.root.isConnected && this.video.parentElement?.contains(this.root)) return;
      const parent = this.video.parentElement;
      if (!parent) return;
      try {
        if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
        parent.appendChild(this.root);
      } catch (e) {}
    }

    create() {
      const root = document.createElement('div');
      root.className = 'lgv-root';

      this.frame = document.createElement('div');
      this.frame.className = 'lgv-frame';
      this.subs = document.createElement('div');
      this.subs.className = 'lgv-subs';
      this.subs.setAttribute('data-style', this.subStyle);
      this.subsText = document.createElement('span');
      this.subsText.className = 'lgv-subs-text';
      this.subs.appendChild(this.subsText);
      this.frame.appendChild(this.subs);
      root.appendChild(this.frame);

      this.signEl = document.createElement('div');
      this.signEl.className = 'lgv-sign';
      this.signEl.setAttribute('data-style', this.signStyle);
      this.frame.appendChild(this.signEl);
      observeCapRadius(this.subsText);
      observeCapRadius(this.signEl);

      this.qToast = document.createElement('div');
      this.qToast.className = 'lgv-qtoast';
      root.appendChild(this.qToast);

      this.skipBtn = document.createElement('button');
      this.skipBtn.type = 'button';
      this.skipBtn.className = 'lgv-skip';
      this.skipBtn.textContent = 'Skip';
      root.appendChild(this.skipBtn);

      // 8.10.124: seek toast chips (left = backward, right = forward) that add up while you keep stepping.
      const mkSeekFx = (dir) => {
        const el = document.createElement('div');
        el.className = 'lgv-seekfx lgv-seekfx-' + dir;
        el.setAttribute('aria-hidden', 'true');
        root.appendChild(el);
        return el;
      };
      const seekFx = { l: { el: mkSeekFx('l'), total: 0, t: 0 }, r: { el: mkSeekFx('r'), total: 0, t: 0 } };
      this.seekToast = (dir, secs) => {
        const side = dir === 'left' ? seekFx.l : seekFx.r;
        const other = dir === 'left' ? seekFx.r : seekFx.l;
        other.total = 0; other.el.classList.remove('show'); clearTimeout(other.t);
        side.total += secs;
        const n = Math.round(side.total);
        side.el.innerHTML = dir === 'left'
          ? '<svg viewBox="0 0 24 24"><path d="M11 6l-6 6 6 6"/><path d="M19 6l-6 6 6 6"/></svg><span>-' + n + 's</span>'
          : '<span>+' + n + 's</span><svg viewBox="0 0 24 24"><path d="M13 6l6 6-6 6"/><path d="M5 6l6 6-6 6"/></svg>';
        side.el.classList.add('show');
        clearTimeout(side.t);
        side.t = setTimeout(() => { side.el.classList.remove('show'); side.total = 0; }, 900);
      };

      // Unlock chip — only visible/interactive while the player is locked.
      // Positioned on the right edge, vertically centered, liquid-glass styled
      // and sized via the same container-query units as the rest of the UI so
      // it stays proportional on any screen / player size.
      this.lockCatch = document.createElement('div');
      this.lockCatch.className = 'lgv-lock-catch';
      this.lockCatch.setAttribute('aria-hidden', 'true');
      // Belt-and-suspenders alongside the CSS touch-action:none — some
      // browsers still need touchend itself cancelled to fully suppress
      // their built-in double-tap-to-zoom on this element.
      this.lockCatch.addEventListener('touchend', (e) => { e.preventDefault(); }, { passive: false });
      root.appendChild(this.lockCatch);

      this.unlockWrap = document.createElement('div');
      this.unlockWrap.className = 'lgv-unlock-wrap';

      this.holdRing = document.createElement('div');
      this.holdRing.className = 'lgv-hold-ring';
      this.holdRing.innerHTML = `
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle class="lgv-hold-ring-track" cx="20" cy="20" r="16"/>
          <circle class="lgv-hold-ring-prog" cx="20" cy="20" r="16"/>
        </svg>`;
      this.holdRingProg = this.holdRing.querySelector('.lgv-hold-ring-prog');

      this.unlockBtn = document.createElement('button');
      this.unlockBtn.type = 'button';
      this.unlockBtn.className = 'lgv-unlock';
      this.unlockBtn.setAttribute('aria-label', 'Unlock');
      this.unlockBtn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/></svg>`;

      this.unlockWrap.appendChild(this.holdRing);
      this.unlockWrap.appendChild(this.unlockBtn);
      root.appendChild(this.unlockWrap);

      // MX-style brightness / volume indicator (shown only while adjusting)
      this.sideHud = document.createElement('div');
      this.sideHud.className = 'lgv-side-hud';
      this.sideHud.innerHTML = `
        <div class="lgv-side-hud-icon"></div>
        <div class="lgv-side-hud-bar"><div class="lgv-side-hud-fill"></div></div>
        <div class="lgv-side-hud-val">50%</div>
      `;
      root.appendChild(this.sideHud);
      this.sideHudIcon = this.sideHud.querySelector('.lgv-side-hud-icon');
      this.sideHudFill = this.sideHud.querySelector('.lgv-side-hud-fill');
      this.sideHudVal = this.sideHud.querySelector('.lgv-side-hud-val');

      this.settings = document.createElement('div');
      this.settings.className = 'lgv-settings';
      this.settings.innerHTML = `
        <div class="lgv-settings-header">
          <div class="lgv-settings-title">Settings</div>
          <button class="lgv-close" type="button">✕</button>
        </div>
        <div class="lgv-settings-tabs">
          <div class="lgv-tab active" data-tab="sub">Subtitle</div>
          <div class="lgv-tab" data-tab="play">Playback</div>
          <div class="lgv-tab" data-tab="smart">Smart</div>
        </div>
        <div class="lgv-settings-body">
          <div class="lgv-section active" data-section="sub">
            <div class="lgv-ctl">
              <div class="lgv-label">Size</div>
              <div class="lgv-slider-row">
                <input type="range" class="lgv-slider" id="lgv-subsize" min="0.018" max="0.085" step="0.001" value="0.0396">
                <span class="lgv-val" id="lgv-subsize-val">1.0</span>
                <button type="button" class="lgv-reset-one" id="lgv-reset-size" title="Reset size">↺</button>
              </div>
            </div>
            <div class="lgv-ctl">
              <div class="lgv-label">Position</div>
              <div class="lgv-slider-row">
                <input type="range" class="lgv-slider" id="lgv-subpos" min="-0.5" max="0.5" step="0.005" value="0.01">
                <span class="lgv-val" id="lgv-subpos-val">1.0</span>
                <button type="button" class="lgv-reset-one" id="lgv-reset-pos" title="Reset position">↺</button>
              </div>
            </div>
            <div class="lgv-ctl">
              <div class="lgv-label">Outline</div>
              <div class="lgv-slider-row">
                <input type="range" class="lgv-slider" id="lgv-outline" min="0" max="2.0" step="0.1" value="1.0">
                <span class="lgv-val" id="lgv-outline-val">1.0</span>
                <button type="button" class="lgv-reset-one" id="lgv-reset-outline" title="Reset outline">↺</button>
              </div>
            </div>
            <div class="lgv-ctl">
              <div class="lgv-label">Spacing</div>
              <div class="lgv-slider-row">
                <input type="range" class="lgv-slider" id="lgv-spacing" min="0.5" max="2.0" step="0.05" value="1.0">
                <span class="lgv-val" id="lgv-spacing-val">1.0</span>
                <button type="button" class="lgv-reset-one" id="lgv-reset-spacing" title="Reset spacing">↺</button>
              </div>
            </div>
            <div class="lgv-ctl lgv-ctl-delay">
              <div class="lgv-delay-head">
                <div class="lgv-label">Delay</div>
                <div class="lgv-delay-field">
                  <input type="text" class="lgv-delay-input" id="lgv-delay-val" inputmode="decimal" enterkeyhint="done" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="0.0" aria-label="Subtitle delay in seconds (type a number, e.g. -15.4)">
                  <span class="lgv-delay-unit">s</span>
                </div>
                <button type="button" class="lgv-reset-one" id="lgv-reset-delay" title="Reset delay to 0">↺</button>
              </div>
              <div class="lgv-slider-row">
                <button type="button" class="lgv-reset-one" id="lgv-delay-minus" title="Earlier: tap 0.1 s, hold to speed up">−</button>
                <input type="range" class="lgv-slider" id="lgv-delay" min="-30" max="30" step="0.1" value="0">
                <button type="button" class="lgv-reset-one" id="lgv-delay-plus" title="Later: tap 0.1 s, hold to speed up">+</button>
              </div>
              <div class="lgv-delay-presets" id="lgv-delay-presets" title="Quick delay presets (seconds)">
                <button type="button" class="lgv-delay-chip" data-d="-10">−10</button>
                <button type="button" class="lgv-delay-chip" data-d="-5">−5</button>
                <button type="button" class="lgv-delay-chip" data-d="-2">−2</button>
                <button type="button" class="lgv-delay-chip" data-d="-1">−1</button>
                <button type="button" class="lgv-delay-chip" data-d="-0.5">−0.5</button>
                <button type="button" class="lgv-delay-chip" data-d="0.5">+0.5</button>
                <button type="button" class="lgv-delay-chip" data-d="1">+1</button>
                <button type="button" class="lgv-delay-chip" data-d="2">+2</button>
                <button type="button" class="lgv-delay-chip" data-d="5">+5</button>
                <button type="button" class="lgv-delay-chip" data-d="10">+10</button>
              </div>
            </div>
            <div class="lgv-fold" data-fold="tracks">
              <div class="lgv-fold-head" role="button"><span class="lgv-fold-title">Track</span><span class="lgv-fold-sum"></span><span class="lgv-fold-chev">›</span></div>
              <div class="lgv-fold-body"><div class="lgv-track-list" id="lgv-tracks"></div></div>
            </div>
            <div class="lgv-fold" data-fold="fonts">
              <div class="lgv-fold-head" role="button"><span class="lgv-fold-title">Font</span><span class="lgv-fold-sum"></span><span class="lgv-fold-chev">›</span></div>
              <div class="lgv-fold-body"><div class="lgv-font-list" id="lgv-fonts"></div></div>
            </div>
            <div class="lgv-fold" data-fold="substyle">
              <div class="lgv-fold-head" role="button"><span class="lgv-fold-title">Style</span><span class="lgv-fold-sum"></span><span class="lgv-fold-chev">›</span></div>
              <div class="lgv-fold-body"><div class="lgv-font-list" id="lgv-substyles"></div></div>
            </div>
            <div class="lgv-fold" data-fold="signstyle">
              <div class="lgv-fold-head" role="button"><span class="lgv-fold-title">Sign Style</span><span class="lgv-fold-sum"></span><span class="lgv-fold-chev">›</span></div>
              <div class="lgv-fold-body"><div class="lgv-font-list" id="lgv-signstyles"></div></div>
            </div>
            <button class="lgv-smart-btn" id="lgv-reset-sub">Reset Subtitle</button>
          </div>

          <div class="lgv-section" data-section="play">
            <div class="lgv-ctl">
              <div class="lgv-label">Speed</div>
              <div class="lgv-slider-row">
                <input type="range" class="lgv-slider" id="lgv-speed" min="0.5" max="2" step="0.05" value="1">
                <span class="lgv-val" id="lgv-speed-val">×1.00</span>
                <button type="button" class="lgv-reset-one" id="lgv-reset-speed" title="Reset speed">↺</button>
              </div>
            </div>
            <div class="lgv-fold" data-fold="audio">
              <div class="lgv-fold-head" role="button"><span class="lgv-fold-title">Audio</span><span class="lgv-fold-sum"></span><span class="lgv-fold-chev">›</span></div>
              <div class="lgv-fold-body"><div class="lgv-track-list" id="lgv-audio-tracks"></div></div>
            </div>
            <div class="lgv-fold" data-fold="quality">
              <div class="lgv-fold-head" role="button"><span class="lgv-fold-title">Quality</span><span class="lgv-fold-sum"></span><span class="lgv-fold-chev">›</span></div>
              <div class="lgv-fold-body">
                <div class="lgv-track-list" id="lgv-quality"></div>
                <div class="lgv-qtrace" id="lgv-qtrace"></div>
              </div>
            </div>
            <button class="lgv-smart-btn" id="lgv-reset-play">Reset Playback</button>
          </div>

          <div class="lgv-section" data-section="smart">
            <div class="lgv-meta" id="lgv-meta">
              Resolution: <b>—</b><br>
              File size: <b>—</b><br>
              Buffered ahead: <b>—</b><br>
              Duration: <b>—</b>
            </div>
            <div class="lgv-dl">
              <button class="lgv-smart-btn" id="lgv-dl-btn">Download video</button>
              <input class="lgv-dl-name" id="lgv-dl-name" type="text" placeholder="File name" spellcheck="false" autocomplete="off">
              <div class="lgv-dl-fmt" id="lgv-dl-what">
                <button class="lgv-dl-pill cur" data-what="video" title="Video with selected audio muxed in">Video</button>
                <button class="lgv-dl-pill" data-what="audio" title="Download only the selected audio track as .m4a (no video)">Audio only</button>
              </div>
              <div class="lgv-dl-fmt" id="lgv-dl-fmt">
                <button class="lgv-dl-pill cur" data-fmt="ts" title="MPEG-TS — safe on phones, plays in VLC/MX">.ts (safe)</button>
                <button class="lgv-dl-pill" data-fmt="mp4" title="MP4 convert — needs lots of RAM (desktop)">MP4 (desktop)</button>
              </div>
              <div class="lgv-dl-fmt" id="lgv-dl-subs">
                <button class="lgv-dl-pill cur" data-subs="1" title="Save a separate .srt next to the video">+ Subtitles</button>
                <button class="lgv-dl-pill" data-subs="0" title="Video file only">Video only</button>
              </div>
              <div class="lgv-label" id="lgv-dl-audio-lab" hidden style="margin:0.35em 0 0.15em">Download audio</div>
              <div class="lgv-dl-fmt" id="lgv-dl-audio" hidden></div>
              <div class="lgv-dl-opts" id="lgv-dl-opts"></div>
              <div class="lgv-dl-status" id="lgv-dl-status"></div>
              <div class="lgv-dl-bar" id="lgv-dl-bar" hidden><div class="lgv-dl-fill" id="lgv-dl-fill"></div></div>
              <button class="lgv-smart-btn" id="lgv-dl-cancel" hidden>Cancel download</button>

              <button class="lgv-smart-btn" id="lgv-sub-btn">Download subtitles (.srt)</button>
              <button class="lgv-smart-btn" id="lgv-dbg-btn">Video info (debug)</button>
              <textarea class="lgv-dl-dbg" id="lgv-dbg-out" readonly hidden></textarea>
              <button class="lgv-smart-btn" id="lgv-dbg-copy" hidden>Copy report</button>
              <button class="lgv-smart-btn" id="lgv-audbg-btn">Audio tracks (debug)</button>
              <textarea class="lgv-dl-dbg" id="lgv-audbg-out" readonly hidden></textarea>
              <button class="lgv-smart-btn" id="lgv-audbg-copy" hidden>Copy audio report</button>
            </div>
          </div>
        </div>
      `;
      root.appendChild(this.settings);

      root.insertAdjacentHTML('beforeend', `
        <div class="lgv-zone lgv-zone-l"></div>
        <div class="lgv-zone lgv-zone-c"></div>
        <div class="lgv-zone lgv-zone-r"></div>
        <div class="lgv-panel">
          <div class="lgv-timeline">
            <div class="lgv-bar">
              <div class="lgv-skip-mark"></div>
              <div class="lgv-fill"></div>
              <div class="lgv-thumb"></div>
            </div>
          </div>
          <div class="lgv-row">
            <div class="lgv-time lgv-cur">0:00</div>
            <div class="lgv-btns">
              <button class="lgv-btn" data-act="rew"><svg viewBox="0 0 24 24"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg></button>
              <button class="lgv-btn" data-act="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
              <button class="lgv-btn" data-act="ff"><svg viewBox="0 0 24 24"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/></svg></button>
              <button class="lgv-btn" data-act="mute"><svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg></button>
              <button class="lgv-btn" data-act="cc"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"/></svg></button>
              <button class="lgv-btn" data-act="settings"><svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg></button>
              <button class="lgv-btn" data-act="full"><svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg></button>
              <button class="lgv-btn" data-act="lock" title="Lock player"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10zm-6-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></button>
            </div>
            <div class="lgv-time lgv-dur">0:00</div>
          </div>
        </div>
      `);

      const parent = this.video.parentElement;
      if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
      parent.appendChild(root);
      this.root = root;

      this.panel = root.querySelector('.lgv-panel');
      this.fill = root.querySelector('.lgv-fill');
      this.thumb = root.querySelector('.lgv-thumb');
      this.skipMark = root.querySelector('.lgv-skip-mark');
      this.cur = root.querySelector('.lgv-cur');
      this.dur = root.querySelector('.lgv-dur');
      this.timeline = root.querySelector('.lgv-timeline');
      this.ccBtn = root.querySelector('[data-act="cc"]');
      this.playBtn = root.querySelector('[data-act="play"]');
      this.muteBtn = root.querySelector('[data-act="mute"]');
      this.zoneL = root.querySelector('.lgv-zone-l');
      this.zoneC = root.querySelector('.lgv-zone-c');
      this.zoneR = root.querySelector('.lgv-zone-r');

      // Last child → stacks above video, panels, settings, subs (still
      // pointer-events:none so controls stay usable).
      this.brightOverlay = document.createElement('div');
      this.brightOverlay.className = 'lgv-bright-overlay';
      this.brightOverlay.setAttribute('aria-hidden', 'true');
      root.appendChild(this.brightOverlay);

      this.bindSettings();
      this.bindTrackHold();
    }

    bindSettings() {
      this.settings.querySelector('.lgv-close').addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeSettings();
      });

      this.settings.querySelectorAll('.lgv-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          this.settings.querySelectorAll('.lgv-tab').forEach(t => t.classList.remove('active'));
          this.settings.querySelectorAll('.lgv-section').forEach(s => s.classList.remove('active'));
          tab.classList.add('active');
          this.settings.querySelector(`[data-section="${tab.dataset.tab}"]`).classList.add('active');
          saveSetting('active-tab', tab.dataset.tab);
        });
      });

      // Factory defaults all read as 1.0 in the UI
      const SIZE_BASE = 0.0396;
      const SIZE_DEFAULT = 0.0396;
      const POS_DEFAULT = 0.01;
      const sizeSlider = this.settings.querySelector('#lgv-subsize');
      const sizeVal = this.settings.querySelector('#lgv-subsize-val');
      const applySizeLabel = () => {
        sizeVal.textContent = (this.subSizeRatio / SIZE_BASE).toFixed(1);
      };
      sizeSlider.addEventListener('input', () => {
        this.subSizeRatio = parseFloat(sizeSlider.value);
        saveSetting('sub-size-v4', this.subSizeRatio);
        applySizeLabel();
        this.scaleEverything();
      });
      this._sizeSlider = sizeSlider;
      this._applySizeLabel = applySizeLabel;
      this.settings.querySelector('#lgv-reset-size')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.subSizeRatio = SIZE_DEFAULT;
        sizeSlider.value = SIZE_DEFAULT;
        saveSetting('sub-size-v4', SIZE_DEFAULT);
        applySizeLabel();
        this.scaleEverything();
      });

      const posSlider = this.settings.querySelector('#lgv-subpos');
      const posVal = this.settings.querySelector('#lgv-subpos-val');
      const applyPosLabel = () => {
        // Factory default (0.01) reads 1.0
        posVal.textContent = (this.subPosRatio / POS_DEFAULT).toFixed(1);
      };
      posSlider.addEventListener('input', () => {
        this.subPosRatio = parseFloat(posSlider.value);
        saveSetting('sub-pos-v3', this.subPosRatio);
        applyPosLabel();
        this.updateSubsGap(this.root.classList.contains('show'));
      });
      this._posSlider = posSlider;
      this._applyPosLabel = applyPosLabel;
      sizeSlider.value = this.subSizeRatio;
      applySizeLabel();
      posSlider.value = this.subPosRatio;
      applyPosLabel();
      this.settings.querySelector('#lgv-reset-pos')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.subPosRatio = POS_DEFAULT;
        posSlider.value = POS_DEFAULT;
        saveSetting('sub-pos-v3', POS_DEFAULT);
        applyPosLabel();
        this.updateSubsGap(this.root.classList.contains('show'));
      });

      const outlineSlider = this.settings.querySelector('#lgv-outline');
      const outlineVal = this.settings.querySelector('#lgv-outline-val');
      outlineSlider.value = this.outlineStrength;
      outlineVal.textContent = Number(this.outlineStrength).toFixed(1);
      outlineSlider.addEventListener('input', () => {
        this.outlineStrength = parseFloat(outlineSlider.value);
        saveSetting('sub-outline-v1', this.outlineStrength);
        outlineVal.textContent = this.outlineStrength.toFixed(1);
        this.applyOutline();
      });
      this.settings.querySelector('#lgv-reset-outline')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.outlineStrength = 1.0;
        outlineSlider.value = 1.0;
        saveSetting('sub-outline-v1', 1.0);
        outlineVal.textContent = '1.0';
        this.applyOutline();
      });

      const spacingSlider = this.settings.querySelector('#lgv-spacing');
      const spacingVal = this.settings.querySelector('#lgv-spacing-val');
      spacingSlider.value = this.subSpacing;
      spacingVal.textContent = Number(this.subSpacing).toFixed(1);
      spacingSlider.addEventListener('input', () => {
        this.subSpacing = parseFloat(spacingSlider.value);
        saveSetting('sub-spacing-v1', this.subSpacing);
        spacingVal.textContent = this.subSpacing.toFixed(1);
        this.applySpacing();
      });
      this._spacingSlider = spacingSlider;
      this.settings.querySelector('#lgv-reset-spacing')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.subSpacing = 1.0;
        spacingSlider.value = 1.0;
        saveSetting('sub-spacing-v1', 1.0);
        spacingVal.textContent = '1.0';
        this.applySpacing();
      });

      const delaySlider = this.settings.querySelector('#lgv-delay');
      const delayVal = this.settings.querySelector('#lgv-delay-val');
      // 8.10.161: the value is a text field now. While you are typing in it, nothing
      // rewrites it; it is applied when you press Done / Enter or tap away.
      let delayEditing = false;
      const applyDelayLabel = () => {
        if (delayEditing) return;
        const d = this.subDelay || 0;
        // Whole seconds read as "+75", fractions as "+12.5", zero as "0.0" ("s" sits beside the field)
        const body = d === 0 ? '0.0' : (Number.isInteger(d) ? String(Math.abs(d)) : Math.abs(d).toFixed(1));
        delayVal.value = (d > 0 ? '+' : d < 0 ? '-' : '') + body;
      };
      const parseDelayText = (txt) => {
        const t = String(txt || '')
          .replace(/[\u2212\u2013\u2014]/g, '-')      // − – — → -
          .replace(/,/g, '.')                          // 12,5 → 12.5
          .replace(/\s+/g, '')
          .replace(/s(ec(onds?)?)?$/i, '');            // "12.5s" → 12.5
        if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(t)) return null;
        const n = parseFloat(t);
        return isFinite(n) ? n : null;
      };
      const paintDelayChips = () => {
        const cur = this.subDelay || 0;
        this.settings.querySelectorAll('#lgv-delay-presets .lgv-delay-chip').forEach(c => {
          c.classList.toggle('cur', Math.abs(parseFloat(c.dataset.d) - cur) < 0.05);
        });
      };
      const setDelay = (d) => {
        d = Math.max(-120, Math.min(120, Math.round(d * 10) / 10));
        this.subDelay = d;
        delaySlider.value = d;          // the slider covers ±30 s; past that it rests at the end
        saveSetting('sub-delay-v1', d);
        applyDelayLabel();
        paintDelayChips();
        this.paintSliders();
        // Drop held text so the next cue pick uses the new delay immediately
        this._subLastText = '';
        this._subLastAt = 0;
        this.lastSub = '\0';
        try {
          // Harvest whatever is currently active so the cache has times to shift
          const tt = this.video.textTracks;
          if (tt) for (let i = 0; i < tt.length; i++) harvestCues(tt[i]);
        } catch (e) {}
        // Force a subtitle tick now (don't wait for the 160ms interval)
        try { this.video.dispatchEvent(new Event('timeupdate')); } catch (e) {}
      };
      delaySlider.value = this.subDelay;
      applyDelayLabel();
      paintDelayChips();
      delaySlider.addEventListener('input', () => setDelay(parseFloat(delaySlider.value)));

      // Typed delay: tap the number, type (e.g. -15.4 or +2), press Done / Enter or tap away.
      // Empty or not a number = nothing changes. The old value shows greyed while you type.
      // A tap anywhere else (sheet, chips, buttons, video) finishes the typing first, so the
      // typed number is applied even where the browser does not blur the field by itself.
      const outsideDown = (ev) => {
        try { if (ev.target === delayVal || (ev.composedPath && ev.composedPath().indexOf(delayVal) >= 0)) return; } catch (e) {}
        delayVal.blur();
      };
      delayVal.addEventListener('focus', () => {
        delayEditing = true;
        delayVal.placeholder = delayVal.value || '0.0';
        delayVal.value = '';
        window.addEventListener('pointerdown', outsideDown, true);
      });
      const commitDelayText = () => {
        window.removeEventListener('pointerdown', outsideDown, true);
        const typed = delayVal.value;
        delayEditing = false;
        delayVal.placeholder = '';
        const n = typed.trim() === '' ? null : parseDelayText(typed);
        if (n === null) applyDelayLabel(); else setDelay(n);
      };
      delayVal.addEventListener('blur', commitDelayText);
      // The key-up that follows Enter / Escape arrives after the field has lost focus, so it is
      // swallowed here too (otherwise the page's own player shortcuts would see it).
      const swallowNextKeyup = (key) => {
        let tm = 0;
        const h = (ev) => { if (ev.key === key) { ev.stopPropagation(); ev.preventDefault(); } done(); };
        const done = () => { window.removeEventListener('keyup', h, true); clearTimeout(tm); };
        tm = setTimeout(done, 1000);
        window.addEventListener('keyup', h, true);
      };
      delayVal.addEventListener('keydown', (e) => {
        e.stopPropagation();                                  // never leak keys to the player / site shortcuts
        if (e.key === 'Enter') { e.preventDefault(); swallowNextKeyup('Enter'); delayVal.blur(); }
        else if (e.key === 'Escape') { e.preventDefault(); swallowNextKeyup('Escape'); delayVal.value = ''; delayVal.blur(); }
      });
      delayVal.addEventListener('keyup', (e) => e.stopPropagation());
      delayVal.addEventListener('keypress', (e) => e.stopPropagation());
      delayVal.addEventListener('pointerdown', (e) => e.stopPropagation());

      // Step size by how long the button has been held: 0.1 s per tap, then
      // 0.1 s repeating, then 1 s, then 5 s, so the far end is a few seconds away.
      const stepForHold = (ms) => ms < 500 ? 0 : ms < 1500 ? 0.1 : ms < 3000 ? 1 : 5;
      const holdButton = (btn, dir) => {
        if (!btn) return;
        let timer = null, t0 = 0;
        const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
        btn.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          stop();
          t0 = Date.now();
          setDelay((this.subDelay || 0) + dir * 0.1);       // the tap itself
          timer = setInterval(() => {
            const st = stepForHold(Date.now() - t0);
            if (st) setDelay((this.subDelay || 0) + dir * st);
          }, 100);
        });
        ['pointerup', 'pointerleave', 'pointercancel', 'lostpointercapture'].forEach(t => btn.addEventListener(t, stop));
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
        // Keyboard activation (Enter/Space) arrives as a click with no pointer
        btn.addEventListener('click', (e) => { e.stopPropagation(); if (e.detail === 0) setDelay((this.subDelay || 0) + dir * 0.1); });
      };
      holdButton(this.settings.querySelector('#lgv-delay-minus'), -1);
      holdButton(this.settings.querySelector('#lgv-delay-plus'), 1);
      this.settings.querySelector('#lgv-reset-delay')?.addEventListener('click', (e) => { e.stopPropagation(); setDelay(0); });
      this.settings.querySelectorAll('#lgv-delay-presets .lgv-delay-chip').forEach(c => {
        c.addEventListener('click', (e) => {
          e.stopPropagation();
          setDelay(parseFloat(c.dataset.d) || 0);
        });
      });
      this._setDelay = setDelay;

      const speedSlider = this.settings.querySelector('#lgv-speed');
      const speedVal = this.settings.querySelector('#lgv-speed-val');
      speedSlider.addEventListener('input', () => {
        this.playbackRate = parseFloat(speedSlider.value);
        this.video.playbackRate = this.playbackRate;
        speedVal.textContent = '×' + this.playbackRate.toFixed(2);
      });
      this.settings.querySelector('#lgv-reset-speed')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playbackRate = 1;
        this.video.playbackRate = 1;
        speedSlider.value = 1;
        speedVal.textContent = '×1.00';
      });

      this.settings.addEventListener('input', () => this.paintSliders());
      this.settings.addEventListener('change', () => this.paintSliders());
      this.settings.addEventListener('click', () => setTimeout(() => this.paintSliders(), 0));
      setTimeout(() => this.paintSliders(), 0);
      this.initFolds();

      this.settings.querySelector('#lgv-reset-sub').addEventListener('click', () => {
        this.subSizeRatio = SIZE_DEFAULT;
        this.outlineStrength = 1.0;
        this.subPosRatio = POS_DEFAULT;
        this.subSpacing = 1.0;
        if (this._setDelay) this._setDelay(0);
        this.uiFont = FONT_DEFAULT;
        this.subStyle = SUB_STYLE_DEFAULT;
        this.signStyle = SIGN_STYLE_DEFAULT;
        saveSetting('sub-style-v1', SUB_STYLE_DEFAULT);
        saveSetting('sign-style-v1', SIGN_STYLE_DEFAULT);
        saveSetting('sub-size-v4', SIZE_DEFAULT);
        saveSetting('sub-pos-v3', POS_DEFAULT);
        saveSetting('sub-outline-v1', 1.0);
        saveSetting('sub-spacing-v1', 1.0);
        saveSetting('ui-font', FONT_DEFAULT);
        sizeSlider.value = this.subSizeRatio;
        applySizeLabel();
        outlineSlider.value = this.outlineStrength;
        outlineVal.textContent = this.outlineStrength.toFixed(1);
        posSlider.value = this.subPosRatio;
        applyPosLabel();
        spacingSlider.value = this.subSpacing;
        spacingVal.textContent = this.subSpacing.toFixed(1);
        this.scaleEverything();
        this.applyOutline();
        this.applySpacing();
        this.applyFont();
        this.buildFontList();
        this.applySubStyle();
        this.applySignStyle();
        this.buildStyleLists();
        this.updateSubsGap(this.root.classList.contains('show'));
        this.currentTrackIndex = -1;
        this.subsEnabled = true;
        // refreshSubtitleTracks() below decides cc-on for real, based on
        // whether a track actually exists — not set directly here.
        this.setAllTextTracks?.('hidden');
        this.refreshSubtitleTracks();
      });

      this.buildFontList();
      this.buildStyleLists();

      this.settings.querySelector('#lgv-reset-play').addEventListener('click', () => {
        this.playbackRate = 1;
        this.video.playbackRate = 1;
        speedSlider.value = 1;
        speedVal.textContent = '×1.00';

        this.selectedQuality = null;
        this._qApplied = null;
        this._qState = null;
        this.refreshQualityList(true);
      });
      this.initDownloadUI();
    }

    initDownloadUI() {
      const q = (sel) => this.settings.querySelector(sel);
      const btn = q('#lgv-dl-btn'), opts = q('#lgv-dl-opts'), st = q('#lgv-dl-status');
      const bar = q('#lgv-dl-bar'), fill = q('#lgv-dl-fill'), cancel = q('#lgv-dl-cancel');
      const dbg = q('#lgv-dbg-btn'), out = q('#lgv-dbg-out'), copy = q('#lgv-dbg-copy');
      if (!btn || !dbg) return;
      const nameIn = q('#lgv-dl-name'), fmtBox = q('#lgv-dl-fmt'), subBtn = q('#lgv-sub-btn'), subsBox = q('#lgv-dl-subs');
      const whatBox = q('#lgv-dl-what');
      let fmt = 'ts', wantSubs = true, dlWhat = 'video';
      try { fmt = localStorage.getItem('lgv-dl-fmt') === 'mp4' ? 'mp4' : 'ts'; } catch (e) {}
      // Phones with ≤4GB: MP4 convert OOMs — force .ts (streamed). User can still pick mp4 on desktop.
      if (dlIsLowMem()) fmt = 'ts';
      try { wantSubs = localStorage.getItem('lgv-dl-subs') !== '0'; } catch (e) {}
      try { dlWhat = localStorage.getItem('lgv-dl-what') === 'audio' ? 'audio' : 'video'; } catch (e) {}
      // Season queue always forces .ts + subs + series naming
      const queueSnap = lgvQueueGet();
      if (queueSnap && queueSnap.items) {
        fmt = 'ts';
        wantSubs = true;
        const item = queueSnap.items[queueSnap.index || 0];
        if (item && nameIn) {
          nameIn.value = lgvQueueFileName(item.num, queueSnap.baseName || lgvSeriesName());
        }
      }
      const audioBox = q('#lgv-dl-audio'), audioLab = q('#lgv-dl-audio-lab');
      let audioPref = dlAudioPrefGet();
      const paintFmt = () => fmtBox.querySelectorAll('.lgv-dl-pill').forEach(b => b.classList.toggle('cur', b.dataset.fmt === fmt));
      const paintSubs = () => { if (subsBox) subsBox.querySelectorAll('.lgv-dl-pill').forEach(b => b.classList.toggle('cur', (b.dataset.subs === '1') === wantSubs)); };
      const paintWhat = () => {
        if (!whatBox) return;
        whatBox.querySelectorAll('.lgv-dl-pill').forEach(b => b.classList.toggle('cur', b.dataset.what === dlWhat));
        if (fmtBox) fmtBox.style.display = dlWhat === 'audio' ? 'none' : '';
        if (subsBox) subsBox.style.display = dlWhat === 'audio' ? 'none' : '';
        if (btn) btn.textContent = dlWhat === 'audio' ? 'Download audio (.m4a)' : 'Download video';
      };
      const paintAudio = () => {
        if (!audioBox) return;
        audioBox.querySelectorAll('.lgv-dl-pill').forEach(b => {
          const aid = b.dataset.aid || '';
          const auri = b.dataset.auri || '';
          const on = audioPref
            ? (aid === audioPref || auri === audioPref || (auri && audioPref.indexOf(auri) >= 0))
            : b.dataset.def === '1';
          b.classList.toggle('cur', !!on);
        });
      };
      const renderAudioPills = (tracks) => {
        if (!audioBox) return;
        // Show even a single track so the user can see what will be downloaded
        if (!tracks || !tracks.length) {
          audioBox.hidden = true;
          if (audioLab) audioLab.hidden = true;
          audioBox.innerHTML = '';
          return;
        }
        audioBox.hidden = false;
        if (audioLab) {
          audioLab.hidden = false;
          audioLab.textContent = tracks.length > 1 ? 'Download audio language' : 'Download audio';
        }
        audioBox.innerHTML = '';
        tracks.forEach(t => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'lgv-dl-pill';
          b.dataset.aid = t.id || '';
          b.dataset.auri = t.uri || '';
          b.dataset.def = t.def ? '1' : '0';
          b.textContent = (t.name || t.lang || t.id || 'Audio') + (t.lang && t.name && t.name.indexOf(t.lang) < 0 ? ' · ' + t.lang : '');
          b.title = (t.lang ? t.lang + ' · ' : '') + (t.name || '') + (t.uri ? '\n' + t.uri.slice(0, 80) : '');
          b.addEventListener('click', () => {
            audioPref = t.uri || t.id;
            dlAudioPrefSet(audioPref);
            paintAudio();
            try { this.refreshAudioTracks(); } catch (e) {}
            try {
              const h = this._findHlsInstance && this._findHlsInstance();
              if (h && h.audioTracks) {
                for (let i = 0; i < h.audioTracks.length; i++) {
                  const ht = h.audioTracks[i];
                  const url = ht.url || ht.uri || '';
                  if ((t.uri && url === t.uri) ||
                      (t.lang && (ht.lang || '').toLowerCase() === String(t.lang).toLowerCase()) ||
                      (t.name && (ht.name || '').toLowerCase() === String(t.name).toLowerCase())) {
                    h.audioTrack = i;
                    break;
                  }
                }
              }
            } catch (e) {}
            try {
              this.showQualityToast((t.name || t.lang || 'Audio') + ' · selected', 1800);
            } catch (e) {}
          });
          audioBox.appendChild(b);
        });
        if (!audioPref || !tracks.some(t => t.id === audioPref || t.uri === audioPref)) {
          const d = tracks.find(x => x.def) || tracks[0];
          if (d) { audioPref = d.uri || d.id; dlAudioPrefSet(audioPref); }
        }
        paintAudio();
      };

      this._lgvRenderDlAudio = renderAudioPills;

      // Bind Video / Audio only / format / subs pills (was missing — buttons looked dead)
      // Event delegation + pointerup so mobile taps actually register.
      const bindPills = (box, onPick) => {
        if (!box) return;
        const fire = (e) => {
          const b = e.target && e.target.closest ? e.target.closest('.lgv-dl-pill') : null;
          if (!b || !box.contains(b)) return;
          try { e.preventDefault(); e.stopPropagation(); } catch (err) {}
          onPick(b, e);
        };
        box.addEventListener('click', fire);
        box.addEventListener('pointerup', (e) => {
          // Touch/pen: click sometimes never fires inside nested overflow panels
          if (e.pointerType === 'touch' || e.pointerType === 'pen') fire(e);
        });
      };
      bindPills(whatBox, (b) => {
        dlWhat = b.dataset.what === 'audio' ? 'audio' : 'video';
        try { localStorage.setItem('lgv-dl-what', dlWhat); } catch (e) {}
        paintWhat();
        try {
          this.showQualityToast(dlWhat === 'audio' ? 'Mode: Audio only' : 'Mode: Video', 1400);
        } catch (e) {}
      });
      bindPills(fmtBox, (b) => {
        fmt = b.dataset.fmt === 'mp4' ? 'mp4' : 'ts';
        if (dlIsLowMem()) fmt = 'ts';
        try { localStorage.setItem('lgv-dl-fmt', fmt); } catch (e) {}
        paintFmt();
      });
      bindPills(subsBox, (b) => {
        wantSubs = b.dataset.subs === '1';
        try { localStorage.setItem('lgv-dl-subs', wantSubs ? '1' : '0'); } catch (e) {}
        paintSubs();
      });
      paintFmt();
      paintSubs();
      paintWhat();
      (async () => {
        try { renderAudioPills(await dlDiscoverAudioTracks(this.video)); } catch (e) {}
      })();

      const fileBase = (height) => {
        const qn = lgvQueueGet();
        if (qn && qn.items && qn.items[qn.index || 0]) {
          // AFK season naming: {Series from site} - [0N] - VOIDXZORO
          return lgvQueueFileName(qn.items[qn.index || 0].num, qn.baseName || lgvSeriesName());
        }
        let n = dlSafeName(nameIn.value || dlPageTitle());
        if (height && n.toLowerCase().indexOf(height + 'p') < 0) n += ' ' + height + 'p';
        return n;
      };
      const saveSubs = async (base) => {
        try {
          // Softcoded only: separate .srt files, never burned into the video.
          // Primary file is exactly base.srt (same name as the video).
          const subs = await dlExportSubs(this);
          subs.forEach(x => {
            const fname = base + (x.tag || '') + '.srt';
            x.savedAs = fname;
            dlSave(x.blob, fname);
          });
          return subs;
        } catch (e) { return []; }
      };
      let ctl = null;
      const say = (t) => {
        st.textContent = t;
        try {
          if (lgvQueueGet()) {
            const l = String(t).split('\n')[0].slice(0, 90);
            const n = Date.now();
            if (!/parts/.test(l) || n - (this._lgvSayAt || 0) > 400) { this._lgvSayAt = n; lgvQueueStatus(l); }
          }
        } catch (e) {}
      };
      const prog = (f) => {
        bar.hidden = false; fill.style.width = Math.max(0, Math.min(100, f * 100)).toFixed(1) + '%';
        this._lgvLastProgAt = Date.now();
        try { if (lgvQueueGet()) lgvQueueProgress(f); } catch (e) {}
      };
      const finish = () => { ctl = null; btn.disabled = false; cancel.hidden = true; };

      const run = async (opt) => {
        ctl = new AbortController(); const signal = ctl.signal;
        this._lgvRunOk = false; this._lgvLastProgAt = Date.now();
        btn.disabled = true; cancel.hidden = false; opts.innerHTML = '';
        const base = fileBase(opt.height);
        try {
          if (opt.kind === 'file') {
            say('Downloading the video file…'); prog(0);
            const blob = await dlDownloadFile(opt.url, signal, (p) => {
              if (p.total) prog(p.got / p.total);
              say('Downloading… ' + dlMB(p.got) + (p.total ? ' of ' + dlMB(p.total) : ''));
            });
            const ext = /webm/i.test(blob.type) ? '.webm' : '.mp4';
            await dlSave(blob, base + ext); prog(1);
            say('Done: ' + dlMB(blob.size) + '. Check your Downloads.');
            return;
          }
          const grab = async (url, tag, weight, offset) => {
            const r = await dlDownloadMedia(url, signal, (p) => {
              prog(offset + weight * (p.done / p.total));
              say(tag + ' ' + p.done + ' / ' + p.total + ' parts · ' + dlMB(p.bytes));
            });
            let blob, ext, jumps = 0;
            const isTs = !r.fmp4 && await dlIsTs(r.parts[0]);
            if (r.fmp4) {
              try {
                say('Fixing fMP4 timestamps…');
                const fx = await dlRebaseFmp4(r.parts, r.durs, signal, (i, n) => prog(offset + weight * (i / Math.max(1, n))));
                blob = new Blob(fx.parts, { type: 'video/mp4' });
              } catch (e) {
                if (signal.aborted) throw e;
                blob = new Blob(r.parts, { type: 'video/mp4' });
              }
              ext = '.mp4';
            }
            else if (isTs) {
              say('Fixing timestamps…');
              let parts = r.parts;
              try {
                const fx = await dlRebaseTs(r.parts, r.durs, signal, (i, n) => prog(offset + weight * 0.98 + 0.02 * (i / n)));
                parts = fx.blobs; jumps = fx.jumps;
              } catch (e) { if (signal.aborted) throw e; parts = r.parts; }
              const size = parts.reduce((n, b) => n + b.size, 0);
              if (fmt === 'mp4' && size < 400 * 1048576 && !dlIsLowMem() && await dlLoadMux()) {
                try {
                  say('Converting to MP4…');
                  blob = await dlToMp4(parts, signal, (i, n) => prog(offset + weight + 0.02 * (i / n)), dlSumDurs(r.durs));
                  ext = '.mp4';
                } catch (e) { if (signal.aborted) throw e; blob = null; }
              }
              if (!blob) { blob = new Blob(parts, { type: 'video/mp2t' }); ext = '.ts'; }
            } else { blob = new Blob(r.parts, { type: 'video/mp2t' }); ext = '.ts'; }
            return { blob, ext, live: r.live, jumps };
          };
          // Resolve audio track: user pick from Download / Settings, else option default
          let audioUrl = opt.audioUrl || null;
          let audioLabel = (opt.audioPick && (opt.audioPick.name || opt.audioPick.lang)) || '';
          try {
            const tracks = (opt.audioTracks && opt.audioTracks.length)
              ? opt.audioTracks
              : await dlDiscoverAudioTracks(this.video);
            if (tracks && tracks.length) {
              try { if (this._lgvRenderDlAudio) this._lgvRenderDlAudio(tracks); } catch (e) {}
              const pref = dlAudioPrefGet();
              const picked = dlPickAudio(tracks, pref);
              if (picked) {
                audioUrl = picked.uri;
                audioLabel = picked.name || picked.lang || picked.id;
                // Prefer this URI even if dlDetect had another default
                opt.audioUrl = audioUrl;
                opt.audioPick = picked;
              }
            }
          } catch (e) {}

          const hasAudio = !!audioUrl;
          let finalBlob, finalExt, jumps = 0, live = false;

          // ---- AUDIO ONLY → .m4a with DEAD-ACCURATE timestamps ----
          if (dlWhat === 'audio') {
            if (!audioUrl) {
              try {
                const tracks = await dlDiscoverAudioTracks(this.video);
                try { if (this._lgvRenderDlAudio) this._lgvRenderDlAudio(tracks); } catch (e) {}
                const pref = dlAudioPrefGet();
                const picked = dlPickAudio(tracks, pref);
                if (picked) {
                  audioUrl = picked.uri;
                  audioLabel = picked.name || picked.lang || picked.id;
                }
              } catch (e) {}
            }
            if (!audioUrl) {
              throw new Error('No separate audio track URL found. This stream may only have one muxed audio — use Video download, or open Audio tracks (debug).');
            }
            const aLabel = audioLabel || 'audio';
            const safeLabel = dlSafeName(aLabel).slice(0, 40) || 'audio';
            say('Audio only: ' + aLabel + '…');
            const ar = await dlDownloadMedia(audioUrl, signal, (p) => {
              prog(0.55 * (p.total ? p.done / p.total : 0));
              say('Downloading audio ' + p.done + ' / ' + p.total + ' · ' + dlMB(p.bytes));
            });
            live = !!ar.live;
            // FORCE continuous timeline from ~0 (kills 10h+/13h fake durations)
            say('Fixing audio timestamps…');
            let fixed;
            try {
              fixed = await dlFixAudioTimestamps(ar.parts, ar.durs, !!ar.fmp4, signal, (i, n) => {
                prog(0.55 + 0.2 * (i / Math.max(1, n)));
              });
            } catch (e) {
              if (signal.aborted) throw e;
              fixed = { parts: ar.parts, jumps: 0 };
            }
            const parts = fixed.parts;
            let aBlob = null;
            let aExt = '.m4a';
            let seekable = false;
            if (ar.fmp4) {
              // Fragmented MP4 with rewritten tfdt → valid .m4a, then made seekable below
              aBlob = new Blob(parts, { type: 'audio/mp4' });
              aExt = '.m4a';
              try {
                say('Making the file seekable…');
                const pb = await dlFmp4ToM4a(parts, signal, (i, n) => prog(0.78 + 0.17 * (i / Math.max(1, n))));
                if (pb) { aBlob = pb; seekable = true; }
              } catch (e) { if (signal.aborted) throw e; }
            } else if (await dlLoadMux()) {
              try {
                say('Packaging audio as .m4a…');
                aBlob = await dlToMp4(parts, signal, (i, n) => prog(0.75 + 0.1 * (i / Math.max(1, n))), dlSumDurs(ar.durs));
                aExt = '.m4a';
                try {
                  say('Making the file seekable…');
                  const pb = await dlFmp4ToM4a([aBlob], signal, (i, n) => prog(0.87 + 0.08 * (i / Math.max(1, n))));
                  if (pb) { aBlob = pb; seekable = true; }
                } catch (e) { if (signal.aborted) throw e; }
                // never let the blob say video/mp4 — Android would save it as name.m4a.mp4
                if (aBlob.type !== 'audio/mp4') aBlob = aBlob.slice(0, aBlob.size, 'audio/mp4');
              } catch (e) {
                if (signal.aborted) throw e;
                aBlob = null;
              }
            }
            if (!aBlob) {
              // Rebased TS still seeks correctly in VLC / MX
              aBlob = new Blob(parts, { type: 'video/mp2t' });
              aExt = '.ts';
            }
            const outName = base + ' (' + safeLabel + ')' + aExt;
            await dlSave(aBlob, outName);
            prog(1);
            const totalDur = (ar.durs || []).reduce((s, d) => s + (d > 0 && isFinite(d) ? d : 0), 0);
            const durStr = totalDur > 0
              ? (totalDur >= 3600
                  ? Math.floor(totalDur / 3600) + 'h ' + Math.floor((totalDur % 3600) / 60) + 'm'
                  : Math.floor(totalDur / 60) + 'm ' + Math.round(totalDur % 60) + 's')
              : '';
            let msg = 'Audio saved:\n' + outName + '\n(' + dlMB(aBlob.size) + ')';
            if (durStr) msg += '\nDuration ≈ ' + durStr + ' (from playlist)';
            msg += '\nTrack: ' + aLabel;
            if (fixed.jumps) msg += '\nTimestamps rewritten (' + fixed.jumps + ' fixes)';
            if (aExt === '.m4a') msg += seekable ? '\n.m4a — seekable, open in VLC / Musicolet / any player.' : '\n.m4a — fragmented (seeking may be limited).';
            else msg += '\n.ts fallback — open in VLC.';
            if (live) msg += '\nLive stream: only what was available was saved.';
            say(msg);
            this._lgvRunOk = true;
            return;
          }

          // ---- LOW-RAM PATH (phones ≈4GB): stream segment→disk, never hold the movie ----
          const lowMem = dlIsLowMem();
          if (lowMem) {
            say('Low-RAM mode (phone/≤4GB): streaming to disk one part at a time.\nNo MP4 convert — that would crash. Saving .ts (VLC opens it fine).');
            const videoName = base + '.ts';
            const sink = await dlOpenWritable(videoName);
            if (!sink) {
              throw new Error('Cannot stream to disk on this browser. Use desktop Chrome, or free RAM and retry.');
            }
            try {
              const onP = (p) => {
                prog(p.total ? p.done / p.total : 0);
                say('Streaming ' + p.done + ' / ' + p.total + ' · ' + dlMB(p.bytes) + ' (low-RAM)');
              };
              let meta;
              if (hasAudio) {
                say('Streaming video + ' + (audioLabel || 'audio') + ' (merged, low-RAM)…');
                meta = await dlStreamAvMerge(opt.url, audioUrl, sink.writable, signal, onP);
              } else {
                meta = await dlStreamMedia(opt.url, sink.writable, signal, onP, true);
              }
              live = !!meta.live;
              await sink.writable.close();
              if (sink.kind === 'opfs') await sink.cleanup();
              let msg = 'Saved (low-RAM stream):\n' + videoName + '\n(' + dlMB(meta.bytes) + ', .ts — open in VLC / MX)\nOnly one segment was in RAM at a time.';
              if (audioLabel && hasAudio) msg += '\nAudio: ' + audioLabel + ' (muxed into the same file).';
              msg += '\nTimestamps fixed for seeking.';
              if (wantSubs) {
                say('Saving softcoded subtitles…');
                const subs = await saveSubs(base);
                if (subs.length) {
                  const d = this.subDelay || 0;
                  msg += '\nSubtitles:\n' + subs.map(x => x.savedAs || (base + (x.tag || '') + '.srt')).join('\n');
                  if (d) msg += '\nDelay ' + (d > 0 ? '+' : '') + d + 's applied.';
                }
              }
              if (live) msg += '\nLive stream: only what was available was saved.';
              prog(1); say(msg);
              const qNow = lgvQueueGet();
              if (qNow && qNow.items && qNow.items.length) {
                say(msg + '\n\nSeason queue: next episode in 2s…');
                lgvQueueStatus('Saved ✓ · opening next…');
                setTimeout(() => { try { lgvQueueAdvance(); } catch (e) {} }, 2000);
              }
              this._lgvRunOk = true;
              return;
            } catch (e) {
              try { await sink.writable.abort(); } catch (e2) {}
              throw e;
            }
          }

          // ---- NORMAL PATH (desktop / more RAM): may convert to MP4 ----
          if (hasAudio) {
            // Download video + chosen audio, then remux into ONE file
            say('Video…' + (audioLabel ? ' + ' + audioLabel + ' audio' : ' + audio'));
            const vr = await dlDownloadMedia(opt.url, signal, (p) => {
              prog(0.55 * (p.done / p.total));
              say('Video ' + p.done + ' / ' + p.total + ' · ' + dlMB(p.bytes));
            });
            const ar = await dlDownloadMedia(audioUrl, signal, (p) => {
              prog(0.55 + 0.25 * (p.done / p.total));
              say((audioLabel || 'Audio') + ' ' + p.done + ' / ' + p.total + ' · ' + dlMB(p.bytes));
            });
            live = !!(vr.live || ar.live);
            const vIsTs = !vr.fmp4 && vr.parts[0] && await dlIsTs(vr.parts[0]);
            const aIsTs = !ar.fmp4 && ar.parts[0] && await dlIsTs(ar.parts[0]);
            if (vIsTs && aIsTs) {
              say('Merging ' + (audioLabel || 'audio') + ' into video…');
              prog(0.82);
              let vParts = vr.parts, aParts = ar.parts;
              try {
                const fx = await dlRebaseTs(vr.parts, vr.durs, signal, (i, n) => prog(0.82 + 0.04 * (i / n)));
                vParts = fx.blobs; jumps = fx.jumps;
              } catch (e) { if (signal.aborted) throw e; }
              try {
                const fxA = await dlRebaseTs(ar.parts, ar.durs, signal, () => {});
                aParts = fxA.blobs;
              } catch (e) { if (signal.aborted) throw e; }
              const merged = await dlMergeAvTs(vParts, aParts, signal);
              // Free source parts ASAP
              try { vr.parts.length = 0; ar.parts.length = 0; } catch (e) {}
              const size = merged.blob.size;
              // Skip MP4 convert above ~400MB even on desktop — mux.js doubles RAM
              if (fmt === 'mp4' && size < 400 * 1048576 && await dlLoadMux()) {
                try {
                  say('Converting merged file to MP4…');
                  finalBlob = await dlToMp4(merged.parts, signal, (i, n) => prog(0.9 + 0.08 * (i / n)), dlSumDurs(vr.durs));
                  finalExt = '.mp4';
                } catch (e) {
                  if (signal.aborted) throw e;
                  finalBlob = merged.blob; finalExt = '.ts';
                }
              } else {
                finalBlob = merged.blob; finalExt = '.ts';
              }
            } else {
              // fMP4 / mixed: cannot cleanly remux in pure JS — save video and note
              say('This stream uses fragmented MP4 audio; saving video (audio mux limited)…');
              finalBlob = new Blob(vr.parts, { type: vr.fmp4 ? 'video/mp4' : 'video/mp2t' });
              finalExt = vr.fmp4 ? '.mp4' : '.ts';
              try {
                const aBlob = new Blob(ar.parts, { type: ar.fmp4 ? 'audio/mp4' : 'video/mp2t' });
                await dlSave(aBlob, base + ' (' + (audioLabel || 'audio') + ')' + (ar.fmp4 ? '.m4a' : '.ts'));
              } catch (e) {}
            }
          } else {
            const v = await grab(opt.url, 'Video', 0.97, 0);
            finalBlob = v.blob; finalExt = v.ext; jumps = v.jumps; live = v.live;
          }

          const videoName = base + finalExt;
          await dlSave(finalBlob, videoName);
          let msg = 'Episode saved as:\n' + videoName + '\n(' + dlMB(finalBlob.size) + (finalExt === '.ts' ? ', open in VLC / MX Player' : '') + ')\n→ Check your phone’s Downloads folder.';
          if (audioLabel && hasAudio) msg += '\nAudio: ' + audioLabel + ' (muxed into the video file).';
          if (jumps) msg += '\nTimestamps fixed so seeking works.';
          if (wantSubs) {
            say('Saving softcoded subtitles…');
            const subs = await saveSubs(base);
            if (subs.length) {
              const d = this.subDelay || 0;
              msg += '\nSubtitles:\n' + subs.map(x => x.savedAs || (base + (x.tag || '') + '.srt')).join('\n');
              msg += '\nKeep the .srt next to the video — VLC / MX load it automatically.';
              if (d) msg += '\nDelay ' + (d > 0 ? '+' : '') + d + 's applied to match the screen.';
            } else {
              msg += '\nNo subtitle lines found. Turn subs on, wait a few seconds, try again.';
            }
          } else {
            msg += '\nVideo only (no subtitles).';
          }
          if (live) msg += '\nThis stream had no end marker, so only what was available now was saved.';
          prog(1); say(msg);
          // Season queue: move to the next episode after a short pause
          const qNow = lgvQueueGet();
          if (qNow && qNow.items && qNow.items.length) {
            say(msg + '\n\nSeason queue: next episode in 2s…');
            lgvQueueStatus('Saved ✓ · opening next…');
            setTimeout(() => { try { lgvQueueAdvance(); } catch (e) {} }, 2000);
          }
          this._lgvRunOk = true;
        } catch (e) {
          this._lgvRunOk = false;
          const m = String((e && e.message) || e);
          if (signal.aborted || m === 'cancelled') say('Download cancelled.');
          else say('Download failed: ' + m + (/Failed to fetch|NetworkError|Load failed/i.test(m) ? '\nThe site blocks reading this stream from the page (CORS). Tap Video info and send me the report.' : ''));
          bar.hidden = true;
          // On failure, still allow manual stop; do not auto-skip unless user wants
        } finally { finish(); }
      };

      // AFK season queue: open Smart, force .ts+subs, name files, download without taps
      const forceSmartTab = () => {}; // 8.10.148: progress lives in the top-page panel now
      const clickSiteServer = () => {
        if (!LGV_IS_TOP && LGV_BRIDGE.ok) { lgvDbg('server click skipped (player is in an iframe)'); return false; }
        const labels = ['HD-1', 'HD1', 'Vidstream-1', 'Vidstream', 'Megaplay', 'Server 1', 'SUB'];
        const nodes = Array.from(document.querySelectorAll('button, a, div[role="button"], .server-item, .btn, span'));
        for (const lab of labels) {
          const el = nodes.find(n => {
            const t = (n.textContent || '').replace(/\s+/g, ' ').trim();
            return t.length < 40 && t.toUpperCase().includes(lab.toUpperCase()) && n.offsetParent !== null;
          });
          if (el) {
            try { el.click(); lgvDbg('clicked server: ' + (el.textContent || '').trim().slice(0, 40)); return true; } catch (e) {}
          }
        }
        lgvDbg('no server button found to click');
        return false;
      };
      const tryQueueAuto = async () => {
        const qn = lgvQueueGet();
        if (!qn || !qn.items || !qn.items.length) {
          lgvDbg('tryQueueAuto: no queue in localStorage');
          return;
        }
        if (ctl) {
          lgvDbg('tryQueueAuto: skip — download already in progress (ctl set)');
          return;
        }
        const item = qn.items[qn.index || 0];
        if (!item) {
          lgvDbg('tryQueueAuto: no item at index ' + (qn.index || 0));
          return;
        }
        const cur = lgvCurrentEpNum();
        lgvDbg('tryQueueAuto: curEp=' + cur + ' needEp=' + item.num + ' idx=' + (qn.index || 0) +
          ' video.rs=' + (this.video && this.video.readyState) +
          ' src=' + String((this.video && (this.video.currentSrc || this.video.src)) || '').slice(0, 60));

        // Wrong episode page → navigate (do NOT silent-return)
        if (cur && item.num && cur !== item.num) {
          lgvDbg('tryQueueAuto: wrong page — navigating to ep' + item.num);
          lgvGoto(item.url);
          return;
        }
        if (this._lgvQueueBusy) {
          lgvDbg('tryQueueAuto: skip — already busy');
          return;
        }
        this._lgvQueueBusy = true;

        fmt = 'ts';
        wantSubs = true;
        paintFmt();
        paintSubs();
        forceSmartTab();

        const fname = lgvQueueFileName(item.num, qn.baseName || lgvSeriesName());
        if (nameIn) nameIn.value = fname;
        lgvDbg('filename → ' + fname);

        const total = qn.items.length;
        const idx = (qn.index || 0) + 1;
        const updateSeasonStatus = (extra) => {
          const line = 'Queue ' + idx + '/' + total + ' · Ep ' + item.num + (extra ? ' · ' + extra : '');
          say(line);
          lgvQueueStatus(line);
        };
        updateSeasonStatus('AFK · opening stream…');

        let opt = null;
        let clickedServer = false;
        for (let attempt = 0; attempt < 30; attempt++) {
          if (!lgvQueueGet()) {
            lgvDbg('queue cleared while waiting');
            this._lgvQueueBusy = false;
            return;
          }
          if (ctl) {
            lgvDbg('ctl set mid-wait — abort auto');
            this._lgvQueueBusy = false;
            return;
          }
          forceSmartTab();
          try {
            if (this.video.paused) {
              try { this.video.muted = true; await this.video.play(); lgvDbg('play() nudged'); } catch (e) {
                lgvDbg('play() fail: ' + e);
              }
            }
          } catch (e) {}
          if ((attempt === 2 || attempt === 8) && !clickedServer) {
            clickedServer = clickSiteServer();
            updateSeasonStatus(clickedServer ? 'tapped server…' : 'waiting for stream…');
          }
          await dlSleep(attempt === 0 ? 1500 : 1000);
          try {
            const d = await dlDetect(this.video, new AbortController().signal);
            lgvDbg('dlDetect attempt ' + (attempt + 1) + ': options=' + (d.options ? d.options.length : 0) +
              (d.notes && d.notes.length ? ' notes=' + d.notes.slice(0, 2).join('; ') : ''));
            if (d.options && d.options.length) {
              opt = d.options.find(o => o.current) || d.options[0];
              lgvDbg('picked ' + (opt.height || '?') + 'p kind=' + opt.kind + ' url=' + String(opt.url || '').slice(0, 70));
              break;
            }
            updateSeasonStatus('looking for stream… (' + (attempt + 1) + ')');
          } catch (e) {
            lgvDbg('dlDetect error: ' + e);
            updateSeasonStatus('detect error · retry…');
          }
        }

        if (!opt) {
          lgvDbg('NO STREAM after 30 attempts — retry in 8s');
          updateSeasonStatus('no stream yet · retrying in 8s (keep tab open)');
          this._lgvQueueBusy = false;
          setTimeout(() => { tryQueueAuto(); }, 8000);
          return;
        }

        if (nameIn) nameIn.value = fname;
        updateSeasonStatus((opt.height ? opt.height + 'p · ' : '') + 'DOWNLOADING…');
        lgvDbg('calling run() for ep' + item.num);
        this._lgvQueueBusy = false;
        this._lgvUserCancel = false;
        this._lgvLastProgAt = Date.now();
        const stallTimer = setInterval(() => {
          if (ctl && Date.now() - (this._lgvLastProgAt || 0) > 90000) {
            lgvDbg('STALL: no progress for 90s — aborting this attempt');
            lgvQueueStatus('Stalled · restarting this episode…');
            try { ctl.abort(); } catch (e) {}
          }
        }, 5000);
        try {
          await run(opt);
          lgvDbg('run() finished for ep' + item.num + ' ok=' + this._lgvRunOk);
        } catch (e) {
          this._lgvRunOk = false;
          lgvDbg('run() threw: ' + e);
        } finally { clearInterval(stallTimer); }
        if (this._lgvRunOk) return;
        if (!lgvQueueGet()) return; // stopped
        if (this._lgvUserCancel) {
          this._lgvUserCancel = false;
          lgvDbg('user cancelled — stopping the queue');
          lgvQueueSet(null);
          return;
        }
        this._lgvTries = this._lgvTries || {};
        const tries = this._lgvTries[item.num] = (this._lgvTries[item.num] || 0) + 1;
        if (tries < 3) {
          lgvDbg('ep' + item.num + ' failed (try ' + tries + '/3) — retrying');
          lgvQueueStatus('Failed · retrying (' + tries + '/3)…');
          setTimeout(() => { this._lgvQueueBusy = false; tryQueueAuto(); }, 4000);
        } else {
          lgvDbg('ep' + item.num + ' failed 3 times — skipping');
          lgvQueueStatus('Skipped ep ' + item.num + ' after 3 failures');
          setTimeout(() => { try { lgvQueueAdvance(true); } catch (e) {} }, 1500);
        }
      };

      // Expose for debug button / watchdog
      this._lgvTryQueueAuto = tryQueueAuto;

      setTimeout(() => { lgvDbg('init schedule tryQueueAuto'); tryQueueAuto(); }, 1200);

      // 8.10.147: ask the top page for the queue (cross-origin iframes cannot read its localStorage)
      if (!LGV_IS_TOP) {
        LGV_BRIDGE.hooks.push((had, now) => {
          if (now && !had) {
            lgvDbg('bridge: queue received from top page (ep' + (now.items && now.items[now.index || 0] ? now.items[now.index || 0].num : '?') + ')');
            this._lgvQueueBusy = false;
            setTimeout(() => { tryQueueAuto(); }, 400);
          } else if (!now && had && ctl) {
            lgvDbg('bridge: queue stopped — cancelling download');
            try { ctl.abort(); } catch (e) {}
          }
        });
        const ask = () => lgvPostTop({ t: 'get' });
        ask();
        this._lgvAskTimer = setInterval(ask, 3000);
      }
      window.addEventListener('lgv-queue-continue', () => {
        lgvDbg('event lgv-queue-continue');
        this._lgvQueueBusy = false;
        setTimeout(() => { tryQueueAuto(); }, 600);
      });

      // Watchdog: if queue is active but nothing is downloading, kick again
      this._lgvQueueWatch = setInterval(() => {
        const qn = lgvQueueGet();
        if (!qn || !qn.items) return;
        if (ctl || this._lgvQueueBusy) return;
        lgvDbg('watchdog kick');
        tryQueueAuto();
      }, 15000);

      btn.addEventListener('click', async () => {
        if (ctl) return;
        // Audio only: skip quality list — go straight to the selected audio track
        if (dlWhat === 'audio') {
          if (!nameIn.value) nameIn.value = dlSafeName(dlPageTitle());
          opts.innerHTML = '';
          run({ kind: 'hls', label: 'Audio only', url: '', audioUrl: null, height: 0 });
          return;
        }
        ctl = new AbortController(); btn.disabled = true; opts.innerHTML = ''; bar.hidden = true;
        if (!nameIn.value) nameIn.value = dlSafeName(dlPageTitle());
        say('Looking for the video…');
        try {
          const d = await dlDetect(this.video, ctl.signal);
          ctl = null; btn.disabled = false;
          if (!d.options.length) { say(d.notes.join('\n') + '\nNothing downloadable was found. Tap Video info (debug) and send me the report.'); return; }
          say('Pick a quality to download:');
          d.options.forEach(o => {
            const b = document.createElement('button');
            b.className = 'lgv-dl-opt' + (o.current ? ' cur' : '');
            b.textContent = o.label + (o.current ? '  (playing now)' : '') + (o.audioUrl ? '  + audio' : '');
            b.addEventListener('click', () => run(o));
            opts.appendChild(b);
          });
        } catch (e) { say('Could not look for the video: ' + ((e && e.message) || e)); ctl = null; btn.disabled = false; }
      });
      cancel.addEventListener('click', () => { this._lgvUserCancel = true; try { if (ctl) ctl.abort(); } catch (e) {} });
      subBtn.addEventListener('click', async () => {
        if (!nameIn.value) nameIn.value = dlSafeName(dlPageTitle());
        say('Saving softcoded subtitles…');
        try {
          const tt = this.video.textTracks;
          if (tt) for (let i = 0; i < tt.length; i++) if (tt[i] && tt[i].mode === 'disabled') tt[i].mode = 'hidden';
        } catch (e) {}
        await dlSleep(400);
        const base = fileBase(this.video.videoHeight || 0);
        const subs = await saveSubs(base);
        const d = this.subDelay || 0;
        if (subs.length) {
          let m = 'Subtitles saved to Downloads:\n' + subs.map(x => x.savedAs || (base + (x.tag || '') + '.srt')).join('\n');
          m += '\n(This is only the .srt — to get the episode, tap Download video, then pick a quality.)';
          if (d) m += '\nDelay ' + (d > 0 ? '+' : '') + d + 's applied.';
          say(m);
        } else {
          say('No subtitle lines found. Turn subtitles on, wait a few seconds, then try again.');
        }
      });

      dbg.addEventListener('click', async () => {
        out.hidden = false; copy.hidden = false; out.value = 'Collecting…';
        let rep = '';
        try { rep = await dlDebugReport(this.video); } catch (e) { rep = 'Report failed: ' + ((e && e.message) || e); }
        out.value = rep;
        try { console.log('[LGV] video info report\n' + rep); } catch (e) {}
      });
      copy.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(out.value); copy.textContent = 'Copied'; }
        catch (e) { try { out.focus(); out.select(); document.execCommand('copy'); copy.textContent = 'Copied'; } catch (e2) { copy.textContent = 'Select the text and copy it'; } }
        setTimeout(() => { copy.textContent = 'Copy report'; }, 1800);
      });

      // 8.10.149: Audio tracks debug (parallel to Video info)
      const audBtn = q('#lgv-audbg-btn'), audOut = q('#lgv-audbg-out'), audCopy = q('#lgv-audbg-copy');
      if (audBtn && audOut && audCopy) {
        audBtn.addEventListener('click', async () => {
          audOut.hidden = false; audCopy.hidden = false; audOut.value = 'Collecting audio tracks…';
          let rep = '';
          try { rep = await dlAudioDebugReport(this.video); } catch (e) { rep = 'Report failed: ' + ((e && e.message) || e); }
          audOut.value = rep;
          try { console.log('[LGV] audio tracks report\n' + rep); } catch (e) {}
        });
        audCopy.addEventListener('click', async () => {
          try { await navigator.clipboard.writeText(audOut.value); audCopy.textContent = 'Copied'; }
          catch (e) { try { audOut.focus(); audOut.select(); document.execCommand('copy'); audCopy.textContent = 'Copied'; } catch (e2) { audCopy.textContent = 'Select the text and copy it'; } }
          setTimeout(() => { audCopy.textContent = 'Copy audio report'; }, 1800);
        });
      }
    }

    initSettingsDrag() {
      const header = this.settings.querySelector('.lgv-settings-header');
      let drag = null;
      const move = (event) => {
        if (!drag) return;
        try {
          const point = event.touches?.[0] || event;
          const x = clamp(drag.left + point.clientX - drag.x, 8, this.root.clientWidth - this.settings.offsetWidth - 8);
          const y = clamp(drag.top + point.clientY - drag.y, 8, this.root.clientHeight - this.settings.offsetHeight - 8);
          this.settings.style.left = x + 'px';
          this.settings.style.top = y + 'px';
          this.settings.style.transform = 'none';
        } catch (e) {}
      };
      const end = (event) => {
        drag = null;
        window.removeEventListener('pointermove', move, true);
        window.removeEventListener('pointerup', end, true);
        window.removeEventListener('pointercancel', end, true);
        try { if (event && header.hasPointerCapture?.(event.pointerId)) header.releasePointerCapture(event.pointerId); } catch (e) {}
        // Stored as a fraction of the root's size (not raw px) so it stays
        // sensible across fullscreen toggles / orientation changes / a
        // differently-sized player on the next episode.
        try {
          const left = parseFloat(this.settings.style.left);
          const top = parseFloat(this.settings.style.top);
          if (isFinite(left) && isFinite(top) && this.root.clientWidth && this.root.clientHeight) {
            saveSetting('panel-pos-v3', {
              xFrac: left / this.root.clientWidth,
              yFrac: top / this.root.clientHeight
            });
          }
        } catch (e) {}
      };
      header.addEventListener('pointerdown', (event) => {
        if (this.locked) return;
        if (event.target.closest('button')) return;
        this._settingsPinned = true;
        this.settings.classList.remove('anchored');
        this.settings.style.bottom = 'auto';
        // A previous drag should always have called end(), but if a prior
        // gesture ended in a way that skipped it (see below), don't stack a
        // second set of window listeners on top of a leaked one.
        if (drag) end();
        const rect = this.settings.getBoundingClientRect();
        const rootRect = this.root.getBoundingClientRect();
        drag = { x: event.clientX, y: event.clientY, left: rect.left - rootRect.left, top: rect.top - rootRect.top };
        try { header.setPointerCapture?.(event.pointerId); } catch (e) {}
        window.addEventListener('pointermove', move, true);
        window.addEventListener('pointerup', end, true);
        // pointercancel fires instead of pointerup when the OS/browser
        // interrupts the touch (common on Android — a system gesture, a
        // brief multi-touch, etc). Without listening for it too, drag never
        // resets and the leaked window-level listeners silently reposition
        // the panel on every later tap — which is what made the settings
        // tabs seem to "freeze": the tap target moved out from under the
        // finger a split second before release, so the click never landed.
        window.addEventListener('pointercancel', end, true);
        event.preventDefault();
      }, true);
    }

    // Reapplies the last active tab and dragged panel position, saved
    // site-wide, so the settings sheet comes back exactly where it was
    // left - across a refresh, and across moving to the next episode.
    restoreSettingsPanelState() {
      const savedTab = loadSetting('active-tab', null);
      if (savedTab) {
        const tab = this.settings.querySelector(`.lgv-tab[data-tab="${savedTab}"]`);
        if (tab) {
          this.settings.querySelectorAll('.lgv-tab').forEach(t => t.classList.remove('active'));
          this.settings.querySelectorAll('.lgv-section').forEach(s => s.classList.remove('active'));
          tab.classList.add('active');
          this.settings.querySelector(`[data-section="${savedTab}"]`)?.classList.add('active');
        }
      }

      const pos = loadSetting('panel-pos-v3', null);
      this._settingsPinned = !!pos;
      if (pos && this.root.clientWidth && this.root.clientHeight) {
        this.settings.classList.remove('anchored');
        this.settings.style.bottom = 'auto';
        const x = clamp(pos.xFrac * this.root.clientWidth, 8, this.root.clientWidth - 40);
        const y = clamp(pos.yFrac * this.root.clientHeight, 8, this.root.clientHeight - 40);
        this.settings.style.left = x + 'px';
        this.settings.style.top = y + 'px';
        this.settings.style.transform = 'none';
      }
      try { this.updateSubsGap(this.root.classList.contains('show')); } catch (e) {}
    }


    // Detects the underlying source changing (site advanced to a new episode
    // in the same <video> element, e.g. an SPA) and clears the picked quality.
    checkSourceChange() {
      const src = this.video.currentSrc || this.video.src;
      if (!src || src.startsWith('blob:')) return;
      if (this._lastRealSrc === null) { this._lastRealSrc = src; return; }
      if (src !== this._lastRealSrc) {
        this._lastRealSrc = src;
        if (!(this._srcSwapUntil && Date.now() < this._srcSwapUntil)) { this.selectedQuality = null; this._qApplied = null; this._qState = null; }
      }
    }

    refreshTrackList() {
      this.refreshSubtitleTracks();
      this.refreshAudioTracks();
      // The quality scan reads the page a lot; only do it while Settings is open
      if (this.settingsOpen) this.refreshQualityList();
    }

    // Aggressively hunts for subtitles the page doesn't expose as a normal
    // <track>: links/anchors pointing at .vtt/.srt/.ass/.ssa files, files the
    // page has already fetched (visible in the Performance/Resource Timing
    // API — this catches players like hls.js/dash.js/Shaka that pull
    // subtitle files in via JS rather than a <track> tag), and subtitle URLs
    // embedded inside the page's own inline script/config JSON. Anything
    // found is fetched, parsed (SRT/VTT/ASS/SSA), and registered as a real
    // TextTrack so it shows up in the normal track list and cue engine.
    discoverExternalSubtitles() {
      if (typeof fetch !== 'function') return;

      // 1) Passive candidate gathering: DOM links/anchors, everything the
      // page has requested so far (Resource Timing — this already covers
      // fetch()/XHR requests made by the page's own player, not just <link>
      // tags), and any inline-script text mentioning a subtitle URL.
      const consider = (url) => {
        if (!url) return;
        try { url = new URL(url, location.href).href; } catch (e) { return; }
        if (!isSubtitleUrl(url)) return;
        maybeFetchSubtitleUrl(url);
      };

      document.querySelectorAll('link[href], a[href], track[src]').forEach(el =>
        consider(el.getAttribute('href') || el.getAttribute('src')));

      try {
        performance.getEntriesByType('resource').forEach(r => consider(r.name));
      } catch (e) {}

      try {
        document.querySelectorAll('script:not([src])').forEach(s => {
          const body = s.textContent || '';
          if (body.length > 400000) return; // skip huge bundles, not worth scanning
          const re = /["']([^"'\s]+\.(?:vtt|srt|ass|ssa))(?:\?[^"'\s]*)?["']/gi;
          let m;
          while ((m = re.exec(body))) consider(m[1]);
        });
      } catch (e) {}

      // 2) Deep object-graph scan of common player globals — catches URLs
      // sitting inside a config object that never produced a clean matching
      // network request. Throttled: it's a heavier scan.
      const now = Date.now();
      if (!this._lastGlobalScan || now - this._lastGlobalScan > 6000) {
        this._lastGlobalScan = now;
        try { scanGlobalsForSubtitleUrls().forEach(consider); } catch (e) {}
      }

      // 3) Pull in anything the shared pipeline has resolved by now
      // (from the above, from network interception firing independently
      // the instant the page made the request, or from another player
      // instance on the page) and register it as a real TextTrack.
      if (!subtitleFileCache.size) return;
      subtitleFileCache.forEach((entry, url) => {
        if (this._externalSubUrls.has(url)) return;
        this._externalSubUrls.add(url);
        try {
          const langMatch = entry.label.match(/^[a-z]{2}(-[A-Z]{2})?$/i);
          const track = this.video.addTextTrack('subtitles', entry.label, langMatch ? entry.label.toLowerCase() : '');
          track.mode = 'hidden';
          entry.cues.forEach(c => {
            try {
              const CueCtor = window.VTTCue || window.TextTrackCue;
              track.addCue(new CueCtor(c.start, c.end, c.text));
            } catch (e) {}
          });
        } catch (e) {}
      });
      this.refreshSubtitleTracks();
    }

    refreshSubtitleTracks() {
      const list = this.settings.querySelector('#lgv-tracks');
      if (!list) return;

      const tracks = [];
      if (this.video.textTracks) {
        for (let i = 0; i < this.video.textTracks.length; i++) {
          const t = this.video.textTracks[i];
          if ((t.kind === 'subtitles' || t.kind === 'captions' || t.kind === 'descriptions' || !t.kind) && !isThumbTrack(t)) {
            const label = (t.label || t.language || `Track ${i + 1}`).trim();
            if (label) tracks.push({ index: i, label, track: t });
          }
        }
      }

      this.video.querySelectorAll('track').forEach((tr, i) => {
        if (isThumbTrack(tr.track, tr)) return;
        const label = (tr.label || tr.srclang || `Track ${i + 1}`).trim();
        if (label && !tracks.find(x => x.label === label)) {
          const nativeIndex = tr.track && this.video.textTracks
            ? Array.prototype.indexOf.call(this.video.textTracks, tr.track)
            : i;
          tracks.push({ index: nativeIndex >= 0 ? nativeIndex : i, label, el: tr, track: tr.track });
        }
      });

      // A native/hls.js-provided TextTrack defaults to mode "disabled", and a
      // disabled track never processes or exposes its cues at all — it just
      // sits there invisible to activeCues, regardless of what our UI shows
      // as "selected". Force every discovered track to at least "hidden" as
      // soon as it's found (not only when the user clicks something), or
      // subtitles never appear even in Auto Detect's default state.
      if (this.subsEnabled && this.currentTrackIndex !== -2) {
        tracks.forEach(t => { if (t.track && t.track.mode === 'disabled') t.track.mode = 'hidden'; });
      }

      list.innerHTML = '';

      // Single source of truth for whether subtitles are actually usable
      // right now — used below to decide the Auto row's label/state AND,
      // at the end of this function, whether the CC control-bar icon's
      // little underline is allowed to show at all. Previously that
      // underline was hardcoded on in the markup and only ever got
      // toggled by direct user actions, so it happily stayed lit even on
      // a video with zero real subtitle tracks — implying captions were
      // "on" when there was nothing to turn on.
      const hasTracks = tracks.length > 0;

      const off = document.createElement('div');
      off.className = 'lgv-track-item' + (this.currentTrackIndex === -2 ? ' active' : ' off');
      off.textContent = 'Off';
      off.addEventListener('click', () => {
        this.currentTrackIndex = -2;
        this.subsEnabled = false;
        this.setSubsText('');
        this.setAllTextTracks('hidden');
        this.refreshSubtitleTracks();
      });
      list.appendChild(off);

      const auto = document.createElement('div');
      auto.className = 'lgv-track-item'
        + (hasTracks && this.currentTrackIndex === -1 ? ' active' : '')
        + (hasTracks ? '' : ' off');
      auto.textContent = hasTracks ? 'Auto Detect' : 'No Subtitles';
      auto.addEventListener('click', () => {
        this.currentTrackIndex = -1;
        this._pickSet = new Set();
        this.subsEnabled = true;
        // 8.10.95: Auto Detect is a full reset: forget every Signs / Dialogue pick too.
        this._trackRoles = {};
        this._cls = null; this._clsSig = null; this._clsAt = 0;
        this._autoSig = null; this._autoAt = 0; this._autoSignsSig = null; this._autoSignsIndex = -1;
        this._signPrevUntil = 0;
        this.setAllTextTracks('hidden');
        this.refreshSubtitleTracks();
        this.clearSignNow();
      });
      list.appendChild(auto);

      // 8.10.75: multi-select. Every row has a tick circle; tapping a row turns
      // that track on or off. Tracks detected as signs carry a "(signs)" tag.
      let cls = { signs: new Set() };
      try { cls = classifyTracks(this, this.video.textTracks); } catch (e) {}
      const sel = this.selectedTrackSet();
      const manual = this.subsEnabled && this.currentTrackIndex >= 0;
      const names = [];
      tracks.forEach((t, idx) => {
        const picked = sel.has(t.index);
        const isSign = cls.signs.has(t.index);
        const pretty = prettySubtitleLabel(t.label, idx, t.track);
        if (picked) names.push(pretty + (isSign ? ' (signs)' : (cls.dlg === t.index ? ' (dialogue)' : '')));
        const item = document.createElement('div');
        item.className = 'lgv-track-item' + (picked && manual ? ' active' : '');
        item.dataset.tidx = String(t.index);
        item.setAttribute('role', 'checkbox');
        item.setAttribute('aria-checked', picked ? 'true' : 'false');
        const labelEl = document.createElement('span');
        labelEl.className = 'lgv-track-label';
        labelEl.textContent = pretty;
        item.appendChild(labelEl);
        const role = trackRoleOf(this, t.track, t.index);
        // 8.10.101: show (dialogue) for auto-detected dialogue too (cls.dlg),
        // not only when the user forced the role by holding the row.
        const isDlg = role === 'dialogue' || (cls.dlg >= 0 && cls.dlg === t.index && !isSign);
        let tagText = '';
        if (isSign) tagText = '(signs)';
        else if (isDlg) tagText = '(dialogue)';
        else if (isAiTrack(t.track)) tagText = '(AI)';
        if (tagText) {
          const tag = document.createElement('span');
          tag.className = 'lgv-track-tag'
            + (role ? ' user' : '')
            + (tagText === '(AI)' ? ' ai' : '')
            + (tagText === '(dialogue)' ? ' dlg' : '');
          tag.textContent = tagText;
          item.appendChild(tag);
        }
        // Tick circle: filled with a tick when the track is on, empty ring when off.
        const tick = document.createElement('span');
        tick.className = 'lgv-track-tick' + (picked ? '' : ' empty');
        if (picked) {
          tick.setAttribute('aria-label', 'On');
          tick.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" style="stroke:var(--lgv-tick)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
        item.appendChild(tick);
        item.addEventListener('click', () => {
          // Start from what is on now (a manual pick, or what Auto chose), then toggle this row.
          const set = this.selectedTrackSet();
          if (set.has(t.index)) set.delete(t.index); else set.add(t.index);
          this.applyPickSet(set);
        });
        list.appendChild(item);
      });
      if (tracks.length) {
        const hint = document.createElement('div');
        hint.className = 'lgv-track-hint';
        hint.textContent = 'Hold a track: Signs / Dialogue';
        list.appendChild(hint);
      }
      this._trackSummary = (!this.subsEnabled || this.currentTrackIndex === -2) ? 'Off'
        : !hasTracks ? 'No Subtitles'
        : names.length ? ((this.currentTrackIndex === -1 ? 'Auto · ' : '') + names.join(' + '))
        : (this.currentTrackIndex === -1 ? 'Auto Detect' : 'None');
      this._listKey = this._subListKey();

      // The CC icon's underline now reflects reality, not just intent:
      // it only lights up when there's an actual track to show AND the
      // user hasn't explicitly turned captions off.
      this.ccBtn?.classList.toggle('cc-on', hasTracks && this.subsEnabled && this.currentTrackIndex !== -2);
    }

    // 8.10.98: set what a track is: 'signs', 'dialogue', or null (Auto). Picking Signs or
    // Dialogue also turns the track on and leaves Auto Detect for a manual pick of what is on
    // now (Dialogue replaces the dialogue track Auto had chosen). Tap Auto Detect to undo it all.
    setTrackRole(tr, index, role) {
      const wasAuto = this.subsEnabled && this.currentTrackIndex === -1;
      const base = this.selectedTrackSet();            // what is on screen right now
      const autoDlg = wasAuto ? this._autoTrackIndex : -1;
      const key = trackRoleKey(tr, index);
      const map = Object.assign({}, this._trackRoles || {});
      if (role === 'signs' || role === 'dialogue') map[key] = role; else delete map[key];
      this._trackRoles = map;
      // drop every cached answer that depended on the old roles
      this._cls = null; this._clsSig = null; this._clsAt = 0;
      this._autoSig = null; this._autoAt = 0; this._autoSignsSig = null;
      this._signPrevUntil = 0;
      if (role === 'signs' || role === 'dialogue') {
        const set = new Set(base);
        if (role === 'dialogue' && autoDlg >= 0 && autoDlg !== index) set.delete(autoDlg);
        set.add(index);
        if (this.currentTrackIndex === -1) this.currentTrackIndex = index;   // leave Auto so the role counts
        this.applyPickSet(set);
      } else {
        const set = this.selectedTrackSet();
        if (this.currentTrackIndex >= 0 && set.size) this.applyPickSet(set);
        else this.refreshSubtitleTracks();
      }
      this.clearSignNow();
    }

    // Hold a row in the Track list (about half a second) to get the Auto / Signs / Dialogue pill.
    bindTrackHold() {
      const list = this.settings && this.settings.querySelector('#lgv-tracks');
      if (!list || list._lgvHold) return;
      list._lgvHold = true;
      let timer = null, sx = 0, sy = 0, row = null;
      const cancel = () => { clearTimeout(timer); timer = null; row = null; };
      list.addEventListener('pointerdown', (e) => {
        const r = e.target && e.target.closest ? e.target.closest('.lgv-track-item[data-tidx]') : null;
        if (!r) return;
        row = r; sx = e.clientX; sy = e.clientY;
        clearTimeout(timer);
        timer = setTimeout(() => {
          const target = row;
          timer = null; row = null;
          if (!target) return;
          this._holdFired = Date.now();
          try { if (navigator.vibrate) navigator.vibrate(12); } catch (err) {}
          this.openRolePop(target);
        }, 480);
      });
      list.addEventListener('pointermove', (e) => {
        if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 9) cancel();
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(n => list.addEventListener(n, cancel));
      list.addEventListener('contextmenu', (e) => {
        if (e.target && e.target.closest && e.target.closest('.lgv-track-item[data-tidx]')) e.preventDefault();
      });
      // the tap that ends a long press must not also toggle the row
      list.addEventListener('click', (e) => {
        if (Date.now() - (this._holdFired || 0) < 600) { e.stopPropagation(); e.preventDefault(); }
      }, true);
    }

    openRolePop(row) {
      this.closeRolePop();
      const idx = parseInt(row.dataset.tidx, 10);
      const tt = this.video.textTracks;
      const tr = tt && tt[idx];
      if (!tr || !this.root) return;
      const cur = (this._trackRoles || {})[trackRoleKey(tr, idx)] || 'auto';
      const pop = document.createElement('div');
      pop.className = 'lgv-role-pop';
      [['auto', 'Auto'], ['signs', 'Signs'], ['dialogue', 'Dialogue']].forEach(([id, label]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'lgv-role-chip' + (cur === id ? ' on' : '') + (id === 'signs' ? ' signs' : '');
        b.textContent = label;
        b.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeRolePop();
          this.setTrackRole(tr, idx, id === 'auto' ? null : id);
        });
        pop.appendChild(b);
      });
      // The track list is rebuilt now and then while you hold, so the row captured
      // at touch-down can be gone. Find the live row for this track.
      if (!row.isConnected) {
        const live = this.settings && this.settings.querySelector('.lgv-track-item[data-tidx="' + idx + '"]');
        if (live) row = live;
      }
      row.classList.add('lgv-hold');
      this.root.appendChild(pop);
      try { pop.style.fontSize = getComputedStyle(this.settings).fontSize; } catch (e) {}
      const rr = this.root.getBoundingClientRect();
      let br = row.getBoundingClientRect();
      if (!row.isConnected || (!br.width && !br.height)) br = this.settings.getBoundingClientRect();
      const pw = pop.offsetWidth, ph = pop.offsetHeight;
      let left = (br.left - rr.left) + br.width / 2 - pw / 2;
      left = Math.max(4, Math.min(left, rr.width - pw - 4));
      let top = (br.bottom - rr.top) + 4;
      if (top + ph > rr.height - 4) top = (br.top - rr.top) - ph - 4;
      top = Math.max(4, top);
      pop.style.left = left + 'px';
      pop.style.top = top + 'px';
      requestAnimationFrame(() => pop.classList.add('show'));
      this._rolePop = pop;
      this._roleRow = row;
      this._roleOut = (e) => { if (!pop.contains(e.target)) this.closeRolePop(); };
      setTimeout(() => { if (this._rolePop === pop) document.addEventListener('pointerdown', this._roleOut, true); }, 0);
    }

    closeRolePop() {
      if (this._roleOut) { document.removeEventListener('pointerdown', this._roleOut, true); this._roleOut = null; }
      const pop = this._rolePop;
      this._rolePop = null;
      if (this._roleRow) { this._roleRow.classList.remove('lgv-hold'); this._roleRow = null; }
      if (pop) { pop.classList.remove('show'); setTimeout(() => pop.remove(), 160); }
    }

    // 8.10.75: the set of subtitle track indexes that are on right now.
    selectedTrackSet() {
      const sel = new Set();
      if (!this.subsEnabled || this.currentTrackIndex === -2) return sel;
      if (this.currentTrackIndex >= 0) {
        if (this._pickSet && this._pickSet.size) this._pickSet.forEach(i => sel.add(i));
        else sel.add(this.currentTrackIndex);
      } else {
        if (this._autoTrackIndex >= 0) sel.add(this._autoTrackIndex);
        if (this._autoSignsIndex >= 0) sel.add(this._autoSignsIndex);
      }
      return sel;
    }

    // Applies a manual selection. Empty selection = subtitles Off.
    applyPickSet(set) {
      this._pickSet = set;
      if (!set.size) {
        this.currentTrackIndex = -2;
        this.subsEnabled = false;
        this.lastSub = '';
        this.setSubsText('');
        this.setAllTextTracks('hidden');
      } else {
        let cls = null;
        try { cls = classifyTracks(this, this.video.textTracks); } catch (e) {}
        const arr = Array.from(set).sort((a, b) => a - b);
        const main = arr.find(i => !(cls && cls.signs.has(i)));
        this.currentTrackIndex = main != null ? main : arr[0];
        this.subsEnabled = true;
        this.setAllTextTracks('hidden');
        // "hidden", never "showing": the browser must not draw its own caption box.
        try { arr.forEach(i => { const tr = this.video.textTracks[i]; if (tr) tr.mode = 'hidden'; }); } catch (e) {}
      }
      this.refreshSubtitleTracks();
    }

    // Changes whenever the track list needs to be redrawn (new cues, Auto's pick, ticks).
    _subListKey() {
      let k = '';
      try { k = classifyTracks(this, this.video.textTracks).sig; } catch (e) {}
      return k + '|' + this.subsEnabled + '|' + this.currentTrackIndex + '|' + this._autoTrackIndex +
        '|' + this._autoSignsIndex + '|' + (this._pickSet ? Array.from(this._pickSet).join(',') : '') +
        '|' + JSON.stringify(this._trackRoles || {});
    }

    // Manual multi-select display: every ticked dialogue track goes to the bottom
    // (stacked), every ticked signs track goes to the right-centre overlay.
    multiSubsText(tt) {
      const now = this.video.currentTime - (this.subDelay || 0);
      const cls = classifyTracks(this, tt);
      const picked = Array.from(this._pickSet).filter(i => tt[i]).sort((a, b) => a - b);
      for (let i = 0; i < tt.length; i++) {
        const tr = tt[i];
        if (!tr || (tr.kind && tr.kind !== 'subtitles' && tr.kind !== 'captions')) continue;
        try {
          if (picked.indexOf(i) >= 0) { if (tr.mode === 'disabled') tr.mode = 'hidden'; }
          else if (tr.mode === 'showing') tr.mode = 'hidden';
        } catch (e) {}
      }
      const parts = [];
      picked.filter(i => !cls.signs.has(i)).forEach(i => {
        // With no separate signs track on this video, sign cards inside the dialogue
        // track still go right-centre, as before.
        const asDlg = trackRoleOf(this, tt[i], i) === 'dialogue';
        // 8.10.126: no separate signs track -> nothing is split off as a sign: every line stays on the bottom strip.
        const tx = cueLinesAt(tt[i], now, null, asDlg || !cls.signs.size);
        if (tx && parts.indexOf(tx) < 0) parts.push(tx);
      });
      const text = parts.join('\n');
      picked.filter(i => cls.signs.has(i)).forEach(i => {
        const tr = tt[i];
        const forced = trackRoleOf(this, tr, i) === 'signs';
        const live = cuesLiveAt(tr, now);
        live.forEach(c => {
          const st = cleanCueText(c.text);
          if (!st || st.length > (forced ? 240 : 120)) return;
          if (text && text.indexOf(st) !== -1) return;
          if (this._frameSigns.some(x => x.text === st)) return;
          if (forced || signLinesOf(st) || !looksLikeSpeech(st)) {
            this._frameSigns.push({ key: String(c.startTime) + '|' + st, text: st });
          }
        });
      });
      return text;
    }

    refreshAudioTracks() {
      const list = this.settings.querySelector('#lgv-audio-tracks');
      if (!list) return;

      const pref = dlAudioPrefGet();
      const paint = (audioTracks) => {
        list.innerHTML = '';
        if (!audioTracks.length) {
          const none = document.createElement('div');
          none.className = 'lgv-track-item';
          none.style.opacity = '0.5';
          none.textContent = 'Only default audio (no language list)';
          list.appendChild(none);
          return;
        }
        audioTracks.forEach((t) => {
          const item = document.createElement('div');
          item.className = 'lgv-track-item' + (t.enabled ? ' active' : '');
          item.style.cursor = 'pointer';
          const lab = document.createElement('span');
          lab.className = 'lgv-track-label';
          lab.textContent = t.label;
          item.appendChild(lab);
          if (t.enabled) {
            const tick = document.createElement('span');
            tick.className = 'lgv-track-tick';
            tick.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
            item.appendChild(tick);
          }
          item.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            try {
              // Remember for Download (uri is strongest key)
              if (t.uri) dlAudioPrefSet(t.uri);
              else if (t.id) dlAudioPrefSet(t.id);
              else if (t.lang) dlAudioPrefSet(t.lang);
              // Live switch in the player
              let switched = false;
              if (t.source === 'hls' && t.hls) {
                try {
                  // Prefer exact index; else match by lang/name
                  if (typeof t.index === 'number' && t.index >= 0) {
                    t.hls.audioTrack = t.index;
                    switched = true;
                  } else if (t.hls.audioTracks) {
                    for (let i = 0; i < t.hls.audioTracks.length; i++) {
                      const ht = t.hls.audioTracks[i];
                      const hl = (ht.lang || ht.language || '').toLowerCase();
                      const hn = (ht.name || ht.label || '').toLowerCase();
                      if ((t.lang && hl === t.lang.toLowerCase()) ||
                          (t.name && (hn === t.name.toLowerCase() || hn.indexOf(t.name.toLowerCase()) >= 0))) {
                        t.hls.audioTrack = i;
                        switched = true;
                        break;
                      }
                    }
                  }
                } catch (e) {}
              }
              if (!switched && t.source === 'html' && this.video.audioTracks) {
                try {
                  for (let i = 0; i < this.video.audioTracks.length; i++) {
                    this.video.audioTracks[i].enabled = (i === t.index);
                  }
                  switched = true;
                } catch (e) {}
              }
              if (!switched) {
                try { switched = !!this.clickSiteAudioOption(t.name || t.lang || t.label); } catch (e) {}
              }
              this.showQualityToast(
                (t.name || t.label || 'Audio') + (switched ? ' · switched' : ' · saved for download'),
                2200
              );
              try {
                if (this._lgvRenderDlAudio) {
                  dlDiscoverAudioTracks(this.video).then(tr => this._lgvRenderDlAudio(tr)).catch(() => {});
                }
              } catch (e) {}
              setTimeout(() => { try { this.refreshAudioTracks(); } catch (e) {} }, 200);
            } catch (e) {
              try { console.warn('[LGV] audio switch', e); } catch (e2) {}
            }
          });
          list.appendChild(item);
        });
      };

      let audioTracks = [];
      try {
        if (this.video.audioTracks && this.video.audioTracks.length) {
          for (let i = 0; i < this.video.audioTracks.length; i++) {
            const t = this.video.audioTracks[i];
            const label = (t.label || t.language || ('Audio ' + (i + 1))) +
              (t.language && t.label ? ' · ' + t.language : '');
            audioTracks.push({
              index: i, id: (t.language || t.label || ('a' + i)).toLowerCase(),
              label, name: t.label || '', lang: t.language || '',
              enabled: !!t.enabled, source: 'html', track: t
            });
          }
        }
      } catch (e) {}

      let hlsInst = null;
      try { hlsInst = this._findHlsInstance(); } catch (e) {}
      if ((!audioTracks.length) && hlsInst && hlsInst.audioTracks && hlsInst.audioTracks.length) {
        try {
          const cur = hlsInst.audioTrack;
          for (let i = 0; i < hlsInst.audioTracks.length; i++) {
            const t = hlsInst.audioTracks[i];
            const name = t.name || t.label || ('Audio ' + (i + 1));
            const lang = t.lang || t.language || '';
            const id = (lang || name || ('a' + i)).toLowerCase();
            const label = name + (lang && name.indexOf(lang) === -1 ? ' · ' + lang : '');
            audioTracks.push({
              index: i, id, label, name, lang,
              enabled: cur === i || cur === t.id || (!!pref && pref === id),
              source: 'hls', track: t, hls: hlsInst
            });
          }
        } catch (e) {}
      }

      if (audioTracks.length) {
        paint(audioTracks);
        return;
      }

      // Master playlist AUDIO group (ravok / multi-lang hosts)
      list.innerHTML = '';
      const loading = document.createElement('div');
      loading.className = 'lgv-track-item';
      loading.style.opacity = '0.55';
      loading.textContent = 'Looking for audio…';
      list.appendChild(loading);
      const token = (this._audListToken = (this._audListToken || 0) + 1);
      dlDiscoverAudioTracks(this.video).then(tracks => {
        if (token !== this._audListToken) return;
        if (!tracks.length) { paint([]); return; }
        const cur = dlAudioPrefGet();
        const picked = dlPickAudio(tracks, cur);
        paint(tracks.map(t => ({
          index: 0, id: t.id, label: t.name + (t.lang ? ' · ' + t.lang : ''),
          name: t.name, lang: t.lang, uri: t.uri,
          enabled: !!(picked && picked.id === t.id),
          source: 'master', track: t
        })));
        try { if (this._lgvRenderDlAudio) this._lgvRenderDlAudio(tracks); } catch (e) {}
      }).catch(() => { if (token === this._audListToken) paint([]); });
    }

    // Click the page's own audio language control if it exposes one
    clickSiteAudioOption(name) {
      if (!name) return false;
      const want = String(name).toLowerCase();
      const nodes = document.querySelectorAll('select option, button, [role="option"], [role="menuitem"], a, li, span');
      for (const el of nodes) {
        if (this.root.contains(el)) continue;
        const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (!t || t.length > 40) continue;
        if (t.toLowerCase() !== want && t.toLowerCase().indexOf(want) === -1) continue;
        const clickable = el.tagName === 'OPTION' ? el.parentElement : (el.closest('button, [role="option"], [role="menuitem"], a, li') || el);
        if (!clickable || this.root.contains(clickable)) continue;
        try {
          if (el.tagName === 'OPTION' && el.parentElement) {
            el.parentElement.value = el.value;
            el.parentElement.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
          clickable.click();
          return true;
        } catch (e) {}
      }
      return false;
    }

    // Collect available quality options from every reliable source, in order:
    //  1) Player library APIs (hls.js levels, dash.js bitrates, video.js,
    //     shaka) — these are what the "real" player uses under the hood, so
    //     switching here actually changes the stream, not just UI labels.
    //  2) <source> tags on the <video> element itself — the common setup on
    //     self-hosted/direct-file sites with no JS quality menu at all; the
    //     old version never looked at these, which is a likely reason the
    //     list came back empty on a site that works this way.
    //  3) A native <select> quality/server dropdown, if the site uses one —
    //     also never scraped before (the old selector list had no `select`/
    //     `option` in it).
    //  4) DOM scrape of the site's own quality / server / source menus —
    //     still needed when none of the above apply.
    // All four are merged and de-duplicated by label; an API-provided level
    // wins over a same-labeled DOM/source guess since it's a real in-place
    // stream switch rather than a full reload or a blind click.
    getQualityOptions() {
      const lists = [
        this.qualityAdapterOptions(),
        this.scrapePlayerApiQuality(),
        this.scrapeSourceTagQuality(),
        this.scrapeSelectQuality(),
        this.scrapeNativeQualityOptions()
      ];
      const merged = [];
      const seen = new Set();
      lists.forEach(list => {
        list.forEach(o => {
          const key = o.label.toLowerCase();
          if (seen.has(key)) return;
          seen.add(key);
          merged.push(o);
        });
      });
      return merged;
    }

    // <source src="...1080p.mp4" label="1080p"> / <source src="...720.mp4">
    // style quality lists. Label comes from an explicit attribute first
    // (label/data-label/data-quality/data-res/title/size — different sites
    // use different ones), falling back to pulling a resolution-looking
    // number straight out of the URL/filename. Switching quality here means
    // actually swapping video.src and reloading, so playback position and
    // play/pause state are preserved across the switch.
    scrapeSourceTagQuality() {
      const results = [];
      try {
        const sources = this.video.querySelectorAll('source');
        if (!sources.length) return results;
        const seen = new Set();
        const currentSrc = this.video.currentSrc || this.video.src || '';
        sources.forEach((srcEl) => {
          const url = srcEl.getAttribute('src') || srcEl.src || '';
          if (!url) return;
          let label = (srcEl.getAttribute('label') || srcEl.getAttribute('data-label') ||
                       srcEl.getAttribute('data-quality') || srcEl.getAttribute('data-res') ||
                       srcEl.getAttribute('size') || srcEl.getAttribute('title') || '').trim();
          if (!label) {
            const m = url.match(/(?:^|[\/_\-])(\d{3,4})p?(?:[\/_\-.?]|$)/);
            if (m) label = m[1] + 'p';
          }
          if (!label || label.length > 16) return;
          const key = label.toLowerCase() + '|' + url;
          if (seen.has(key)) return;
          seen.add(key);
          results.push({
            label,
            apply: () => this.applySourceUrl(url),
            active: url === currentSrc
          });
        });
        // Highest resolution first; non-numeric labels (Auto/Original) sort last.
        results.sort((a, b) => (parseInt(b.label, 10) || -1) - (parseInt(a.label, 10) || -1));
      } catch (e) {}
      return results;
    }

    // Swaps the video's src directly (used by the <source>-tag quality
    // path above), preserving current playback position and play state
    // across the reload — otherwise every quality switch would restart
    // the episode from 0:00.
    applySourceUrl(url) {
      const v = this.video;
      try {
        const wasPaused = v.paused;
        const t = v.currentTime;
        const resume = () => {
          v.removeEventListener('loadedmetadata', resume);
          try { v.currentTime = t; } catch (e) {}
          if (!wasPaused) v.play().catch(() => {});
        };
        v.addEventListener('loadedmetadata', resume);
        v.src = url;
        v.load();
      } catch (e) {}
    }

    // A native <select> used as a quality/server picker. Identified either
    // by a quality-ish hint on the select itself (name/id/class/aria-label)
    // or, failing that, by its options themselves looking like resolutions
    // — some sites give the <select> no useful attributes at all.
    scrapeSelectQuality() {
      const results = [];
      try {
        const qualityHintRe = /quality|resolution|resol|server|source/i;
        const looksQualityRe = /\b(1080|720|480|360|240|144|2160|4k|auto)\b/i;
        document.querySelectorAll('select').forEach(sel => {
          if (this.root.contains(sel)) return;
          const opts = Array.from(sel.options || []);
          if (opts.length < 2) return;
          const hint = ((sel.getAttribute('name') || '') + ' ' + (sel.id || '') + ' ' +
                        (sel.className || '') + ' ' + (sel.getAttribute('aria-label') || '')).toLowerCase();
          const looksLikeQuality = qualityHintRe.test(hint) ||
            opts.filter(o => looksQualityRe.test(o.textContent || '')).length >= Math.min(2, opts.length);
          if (!looksLikeQuality) return;
          opts.forEach((o) => {
            const text = (o.textContent || o.value || '').trim();
            if (!text || text.length > 24) return;
            results.push({
              label: text,
              apply: () => {
                sel.value = o.value;
                sel.dispatchEvent(new Event('change', { bubbles: true }));
                sel.dispatchEvent(new Event('input', { bubbles: true }));
              },
              active: o.selected
            });
          });
        });
      } catch (e) {}
      return results;
    }

    // Nudges any settings/quality menu trigger on the page so lazily-
    // rendered menu items (only added to the DOM once opened — common in
    // React/Vue players) get a chance to appear before we give up. Only
    // called when a scrape has already come back empty, and throttled by
    // the caller, so this never spams clicks on a page that already works.
    nudgeQualityMenus() {
      // Opens the site's own quality/settings menus just long enough for scrapeNativeQualityOptions
      // to read the labels — then closes them again so a floating Auto/1080p panel is not left
      // stranded in the middle of the video (out of reach / covering the picture).
      try {
        const triggers = document.querySelectorAll(
          'button, [role="button"], [class*="quality" i], [class*="settings" i], ' +
          '[aria-label*="quality" i], [title*="quality" i], [class*="hd" i], [class*="gear" i], [class*="cog" i]'
        );
        const opened = [];
        let clicked = 0;
        triggers.forEach(el => {
          if (clicked >= 6) return;
          if (this.root.contains(el)) return;
          const t = ((el.getAttribute('aria-label') || '') + ' ' + (el.className || '') + ' ' +
                     (el.title || '') + ' ' + (el.textContent || '')).toLowerCase();
          if (!/quality|resolution|hd\b|settings|gear|cog|source|server/.test(t)) return;
          const r = el.getBoundingClientRect();
          if (r.width > 220 || r.height > 90 || r.width < 1) return;
          try { fireClick(el); opened.push(el); clicked++; } catch (e) {}
        });
        this._nudgeOpened = opened;
        // Close after the scrape timeouts (250 / 900) have had a chance to read the DOM
        clearTimeout(this._nudgeCloseTimer);
        this._nudgeCloseTimer = setTimeout(() => { try { this.closeSiteQualityMenus(); } catch (e) {} }, 1100);
      } catch (e) {}
    }

    // Shut any quality/settings popover the site left open over the picture.
    closeSiteQualityMenus() {
      try {
        // Re-click the same triggers we opened (toggle close)
        (this._nudgeOpened || []).forEach(el => {
          try {
            if (!el || !document.contains(el)) return;
            const expanded = el.getAttribute('aria-expanded');
            if (expanded === 'false') return;
            fireClick(el);
          } catch (e) {}
        });
        this._nudgeOpened = [];
      } catch (e) {}
      try {
        // Escape often closes player menus
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));
      } catch (e) {}
      try {
        // Hide leftover floating quality panels that sit over our video box
        const vr = this.video.getBoundingClientRect();
        if (!vr.width) return;
        const cand = document.querySelectorAll(
          '[class*="quality" i], [class*="resolution" i], [role="menu"], [role="listbox"], ' +
          '.jw-settings-menu, .vjs-menu, .plyr__menu'
        );
        cand.forEach(el => {
          try {
            if (this.root.contains(el)) return;
            const r = el.getBoundingClientRect();
            if (r.width < 40 || r.height < 40 || r.width > 420) return;
            // Overlaps the video frame and looks like a small menu of quality labels
            const over = r.left < vr.right && r.right > vr.left && r.top < vr.bottom && r.bottom > vr.top;
            if (!over) return;
            const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
            if (!/\b(auto|1080p?|720p?|480p?|360p?|240p?|144p?|4k|2160p?)\b/i.test(txt)) return;
            // Only a short list of quality tokens — not a big page section
            if (txt.length > 80) return;
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            // Remember so we don't keep fighting a permanent page control
            el.setAttribute('data-lgv-hid-q', '1');
          } catch (e) {}
        });
      } catch (e) {}
    }

    // Find an hls.js / dash / videojs / shaka instance tied to this video
    // and expose its quality levels with a real apply() callback.
    scrapePlayerApiQuality() {
      const results = [];
      const seen = new Set();
      const push = (label, apply, active) => {
        const key = String(label).toLowerCase();
        if (!label || seen.has(key)) return;
        seen.add(key);
        results.push({ label: String(label), apply, active: !!active, el: null });
      };

      try {
        // ---- hls.js ----
        const hls = this._findHlsInstance();
        if (hls && Array.isArray(hls.levels) && hls.levels.length) {
          // Auto first
          push('Auto', () => {
            try {
              hls.currentLevel = -1;
              if ('loadLevel' in hls) hls.loadLevel = -1;
              if ('nextLevel' in hls) hls.nextLevel = -1;
            } catch (e) {}
          }, hls.autoLevelEnabled || hls.currentLevel === -1);

          // Highest first (better UX)
          const indexed = hls.levels.map((lvl, i) => ({ lvl, i }));
          indexed.sort((a, b) => (b.lvl.height || 0) - (a.lvl.height || 0) || (b.lvl.bitrate || 0) - (a.lvl.bitrate || 0));
          indexed.forEach(({ lvl, i }) => {
            let label = lvl.height ? (lvl.height + 'p') : (lvl.bitrate ? Math.round(lvl.bitrate / 1000) + 'kbps' : 'Level ' + (i + 1));
            if (lvl.height >= 2160) label = '4K / ' + label;
            else if (lvl.height >= 1440) label = '1440p';
            else if (lvl.height >= 1080) label = '1080p';
            else if (lvl.height >= 720) label = '720p';
            else if (lvl.height >= 480) label = '480p';
            else if (lvl.height >= 360) label = '360p';
            push(label, () => {
              try {
                hls.currentLevel = i;
                if ('loadLevel' in hls) hls.loadLevel = i;
                if ('nextLevel' in hls) hls.nextLevel = i;
                // Disable auto so the pick sticks
                if (typeof hls.autoLevelEnabled !== 'undefined') {
                  try { hls.autoLevelEnabled = false; } catch (e) {}
                }
              } catch (e) {}
            }, !hls.autoLevelEnabled && hls.currentLevel === i);
          });
          if (results.length) return results;
        }

        // ---- dash.js ----
        const dash = this._findDashInstance();
        if (dash && typeof dash.getBitrateInfoListFor === 'function') {
          try {
            const list = dash.getBitrateInfoListFor('video') || [];
            if (list.length) {
              push('Auto', () => {
                try { dash.setAutoSwitchQualityFor('video', true); } catch (e) {}
              }, true);
              const sorted = list.slice().sort((a, b) => (b.height || 0) - (a.height || 0));
              sorted.forEach((info) => {
                const label = info.height ? info.height + 'p' : (info.bitrate ? Math.round(info.bitrate / 1000) + 'kbps' : 'Quality');
                push(label, () => {
                  try {
                    dash.setAutoSwitchQualityFor('video', false);
                    dash.setQualityFor('video', info.qualityIndex);
                  } catch (e) {}
                }, false);
              });
              if (results.length) return results;
            }
          } catch (e) {}
        }

        // ---- video.js qualityLevels plugin ----
        try {
          if (window.videojs) {
            const players = window.videojs.getPlayers ? window.videojs.getPlayers() : {};
            for (const id of Object.keys(players || {})) {
              const p = players[id];
              if (!p || !p.el_) continue;
              if (!p.el_.contains(this.video) && p.tech_?.el_ !== this.video) continue;
              if (typeof p.qualityLevels === 'function') {
                const ql = p.qualityLevels();
                if (ql && ql.length) {
                  for (let i = 0; i < ql.length; i++) {
                    const q = ql[i];
                    const label = q.label || (q.height ? q.height + 'p' : 'Quality ' + (i + 1));
                    push(label, () => {
                      for (let j = 0; j < ql.length; j++) ql[j].enabled = (j === i);
                    }, q.enabled);
                  }
                  if (results.length) return results;
                }
              }
            }
          }
        } catch (e) {}
      } catch (e) {}
      return results;
    }

    _findHlsInstance() {
      const candidates = [];
      const add = (x) => {
        if (!x) return;
        try {
          if (Array.isArray(x.levels) && ('currentLevel' in x || 'loadLevel' in x || 'nextLevel' in x)) {
            candidates.push(x);
          }
        } catch (e) {}
      };
      try {
        add(this.video._hls);
        add(this.video.hls);
        add(this.video.__hls);
        add(this.video.Hls);
        // Some players stash the instance on a WeakMap-like property
        for (const k of Object.getOwnPropertyNames(this.video)) {
          try { add(this.video[k]); } catch (e) {}
        }
      } catch (e) {}
      try {
        const roots = [window.hls, window.player, window.videoPlayer, window.jwplayer, window.art, window.dp, window.DPlayer];
        Object.keys(window).forEach(k => {
          if (/^(hls|player|video|jw|art|dplayer|clappr|plyr|shaka)/i.test(k)) {
            try { roots.push(window[k]); } catch (e) {}
          }
        });
        // Hls.DefaultConfig isn't an instance; look for live instances via media match
        roots.forEach(r => {
          if (!r) return;
          add(r);
          try { add(r.hls); add(r.core?.hls); add(r.player?.hls); add(r._hls); } catch (e) {}
          // jwplayer style
          try {
            if (typeof r === 'function' && r.getPlaylist) {
              const inst = r();
              add(inst); add(inst?.hls);
            }
          } catch (e) {}
        });
      } catch (e) {}
      // Prefer instance whose media element is exactly our video
      for (const c of candidates) {
        try {
          if (c.levels?.length && c.media === this.video) return c;
        } catch (e) {}
      }
      for (const c of candidates) {
        try {
          if (c.levels?.length && (!c.media || c.media === this.video)) return c;
        } catch (e) {}
      }
      for (const c of candidates) {
        try { if (c.levels?.length) return c; } catch (e) {}
      }
      return null;
    }

    _findDashInstance() {
      try {
        if (this.video._dash) return this.video._dash;
        if (window.dashjs && window.player && typeof window.player.getBitrateInfoListFor === 'function') return window.player;
        if (window.player && typeof window.player.getBitrateInfoListFor === 'function') return window.player;
      } catch (e) {}
      return null;
    }

    // Last-resort path that works the way a person would: open the site's own
    // settings menu, click the matching quality inside it, close the menu.
    // Only ever touches elements outside our own UI.
    async driveSiteQuality(label) {
      if (this._driving) return false;
      this._driving = true;
      let trigger = null;
      try {
        let item = this.findSiteQualityItem(label);
        if (!item || !item.shown) {
          trigger = this.findSiteSettingsTrigger();
          if (trigger) pressEl(trigger);
          const deadline = Date.now() + 1600;
          let tabTried = false, nativeTried = false;
          while (Date.now() < deadline) {
            await sleep(60);
            item = this.findSiteQualityItem(label);
            if (item && item.shown) break;
            // The menu may open on another tab (captions, speed...). Try the
            // quality tab once if the item isn't there.
            if (!tabTried && Date.now() > deadline - 1300) {
              tabTried = true;
              const tab = queryAllDeep('[aria-controls*="quality" i], #jw-settings-submenu-quality, .jw-settings-quality, [role="tab"], button, [role="button"]').find(b => {
                if (this.root.contains(b)) return false;
                const t = ((b.getAttribute('aria-label') || '') + ' ' + (b.title || '') + ' ' + (b.id || '') + ' ' + (b.getAttribute('aria-controls') || '')).toLowerCase();
                return /quality|resolution|signal/.test(t);
              });
              if (tab) pressEl(tab);
            }
            // The first press can be swallowed; one native click if nothing opened
            if (trigger && !nativeTried && Date.now() > deadline - 1100) {
              nativeTried = true;
              if (!(this.findSiteQualityItem(label) || {}).shown) { try { trigger.click(); } catch (e) {} }
            }
          }
        }
        if (!item) {
          console.warn('[LGV] quality "' + label + '": no matching item in the site menu.',
            { trigger: trigger ? trigger.outerHTML.slice(0, 400) : 'none found',
              candidates: Array.from(document.querySelectorAll('button, [role="menuitem"], [role="option"], li, a, div, span'))
                .filter(e => /\b\d{3,4}\s*p\b/i.test(e.textContent || '') && e.textContent.length < 40)
                .slice(0, 8).map(e => e.outerHTML.slice(0, 200)) });
          return false;
        }
        console.log('[LGV] quality "' + label + '" → clicking:', item.clickable.textContent.trim(), item.clickable);
        pressEl(item.clickable);
        await sleep(400);
        const selected = Array.from(document.querySelectorAll('[aria-checked="true"], [aria-selected="true"], [class*="selected" i], [class*="active" i]'))
          .filter(e => !this.root.contains(e) && (e.textContent || '').trim().length < 20)
          .map(e => e.textContent.trim()).slice(0, 6);
        console.log('[LGV] site now marks as selected:', selected);
        return true;
      } catch (e) {
        return false;
      } finally {
        // Close the menu we opened so the site is left as it was
        if (trigger) {
          try {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
          } catch (e) {}
          await sleep(120);
          const still = this.findSiteQualityItem(label);
          if (still && still.shown) pressEl(trigger);
        }
        this._driving = false;
      }
    }

    // Finds the element for one quality option in the site's own menu.
    findSiteQualityItem(label) {
      const h = qualityHeight(label);
      const want = (h ? h + 'p' : String(label).toLowerCase()).replace(/\s+/g, '');
      const wantRe = new RegExp('(^|[^0-9])' + want.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^0-9a-z])', 'i');
      const picks = [];
      queryAllDeep('button, [role="menuitem"], [role="menuitemradio"], [role="option"], [role="radio"], li, a, div, span, .jw-settings-content-item').forEach(el => {
        if (this.root.contains(el)) return;
        const text = (el.textContent || '').trim();
        if (!text || text.length > 40) return;
        if (!wantRe.test(text.replace(/\s+/g, ''))) return;
        const clickable = el.closest('button, [role="menuitem"], [role="menuitemradio"], [role="option"], [role="radio"], a, li') || el;
        if (this.root.contains(clickable)) return;
        const cr = clickable.getBoundingClientRect();
        const drawn = cr.width > 0 && cr.height > 0;
        picks.push({ el, clickable, shown: isShown(clickable) && drawn });
      });
      // Prefer an element that is actually on screen, then the smallest match
      picks.sort((a, b) => (b.shown - a.shown) || (a.clickable.textContent.length - b.clickable.textContent.length));
      return picks[0] || null;
    }

    // The site's own gear / settings / quality button near this video.
    findSiteSettingsTrigger() {
      // 0) Known player gear buttons
      const known = queryAllDeep('.jw-icon-settings, .vjs-quality-selector button, .plyr__control[data-plyr="settings"], button[aria-label*="Settings" i], button[title*="Settings" i], button[aria-label*="Quality" i], [role="button"][aria-label*="Settings" i]')
        .find(b => !this.root.contains(b));
      if (known) return known;
      // 1) The gear sits right beside the fullscreen button in the bar
      let scope = this.video.parentElement;
      for (let i = 0; i < 6 && scope && scope !== document.body; i++) {
        const fs = Array.from(scope.querySelectorAll('button, [role="button"]')).find(b => {
          if (this.root.contains(b)) return false;
          const t = ((b.getAttribute('aria-label') || '') + ' ' + (b.title || '')).toLowerCase();
          return /full\s*-?\s*screen/.test(t);
        });
        if (fs) {
          const prev = fs.previousElementSibling;
          if (prev && prev.matches && prev.matches('button, [role="button"]') && !this.root.contains(prev)) return prev;
        }
        scope = scope.parentElement;
      }
      // 2) Otherwise, a button labelled as settings / quality
      scope = this.video.parentElement;
      for (let i = 0; i < 6 && scope && scope !== document.body; i++) {
        const btns = scope.querySelectorAll('button, [role="button"]');
        for (const b of btns) {
          if (this.root.contains(b)) continue;
          const t = ((b.getAttribute('aria-label') || '') + ' ' + (b.title || '') + ' ' +
                     (b.className && b.className.baseVal === undefined ? b.className : '')).toLowerCase();
          if (/quality|setting|gear|cog|resolution|hd\b/.test(t)) return b;
        }
        scope = scope.parentElement;
      }
      // Wider net: any button in the page that advertises a menu
      for (const b of document.querySelectorAll('button[aria-haspopup], [role="button"][aria-haspopup]')) {
        if (this.root.contains(b)) continue;
        const r = b.getBoundingClientRect();
        const v = this.video.getBoundingClientRect();
        if (r.width && r.top > v.top && r.bottom <= v.bottom + 80) return b;
      }
      return null;
    }

    // DOM scrape fallback — reads whatever quality/server menu items are
    // currently in the DOM (visible or display:none). Text matching is
    // two-tier: a clean exact match is used as-is; otherwise we pull just
    // the quality-looking token out of noisier real-world text (extra
    // words, parentheticals, icons) so our own menu still shows a clean
    // label. Menu-opening is handled separately by nudgeQualityMenus() —
    // this function only ever reads, never clicks.
    scrapeNativeQualityOptions() {
      const qualityRe = /^(auto|original|source|4k|uhd|fhd|hd|sd|2160p?|1440p?|1080p?|960p?|720p?|576p?|480p?|360p?|240p?|144p?|(?:hd|sd|fhd|uhd|hq|lq)[-\s]?\d{0,2}|server\s*\d+|source\s*\d+|sub|dub|high|medium|low|best)$/i;
      const looseTokenRe = /\b(4k|2160p?|1440p?|1080p?|720p?|576p?|480p?|360p?|240p?|144p?|uhd|fhd|auto|original|source\s*\d*|server\s*\d+)\b/i;
      const selector = 'button, [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], a, li, div, span, ' +
        '[class*="quality" i], [class*="resolution" i], [class*="level" i], ' +
        '[class*="server" i], [class*="source" i], [data-quality], [data-resolution], [data-level]';

      const extractLabel = (raw) => {
        const text = raw.trim();
        if (!text || text.length > 60) return null;
        if (qualityRe.test(text)) return text;
        const m = text.match(looseTokenRe);
        return m ? m[0] : null;
      };

      const scrapeScope = (scope) => {
        const results = [];
        const seen = new Set();
        let candidates;
        try { candidates = scope.querySelectorAll(selector); } catch (e) { return results; }
        candidates.forEach((el) => {
          if (this.root.contains(el)) return;
          const raw = (el.getAttribute('data-quality') || el.getAttribute('data-resolution') ||
                       el.getAttribute('data-level') || el.getAttribute('aria-label') ||
                       el.innerText || el.textContent || '').trim().split('\n')[0].trim();
          const label = extractLabel(raw);
          if (!label) return;
          const key = label.toLowerCase();
          if (seen.has(key)) return;
          const r = el.getBoundingClientRect();
          // Skip huge layout containers; allow 0-size (display:none menu items)
          if (r.width > 420 || r.height > 140) return;
          seen.add(key);
          results.push({
            label,
            el,
            viaDom: true,
            apply: () => {},
            active: el.classList?.contains('active') || el.getAttribute('aria-checked') === 'true' || el.getAttribute('aria-selected') === 'true'
          });
        });
        return results;
      };

      try {
        let scope = this.video.parentElement;
        for (let i = 0; i < 10 && scope?.parentElement && scope !== document.body; i++) {
          scope = scope.parentElement;
        }
        if (scope) {
          const nearby = scrapeScope(scope);
          if (nearby.length) return nearby;
        }
        return scrapeScope(document.body);
      } catch (e) { return []; }
    }

    refreshQualityList(force) {
      const list = this.settings.querySelector('#lgv-quality');
      if (!list) return;

      const options = this.getQualityOptions();

      // Nothing found? A lot of players only put their quality list into
      // the DOM once its trigger has actually been clicked (React/Vue
      // conditional rendering), so an empty first pass doesn't necessarily
      // mean there's nothing there. Nudge once, then re-check shortly
      // after, throttled to at most once every 5s.
      if (!options.length && this.settingsOpen && !this._qRunning && !this._qPendingOpt && !this._driving &&
          (this._nudgeCount || 0) < 3 && (!this._qualityNudgeAt || Date.now() - this._qualityNudgeAt > 5000)) {
        this._qualityNudgeAt = Date.now();
        this._nudgeCount = (this._nudgeCount || 0) + 1;
        this.nudgeQualityMenus();
        setTimeout(() => { try { this.refreshQualityList(); } catch (e) {} }, 250);
        setTimeout(() => {
          try { this.refreshQualityList(); } catch (e) {}
          try { this.closeSiteQualityMenus(); } catch (e) {}
        }, 900);
      }

      this._qualityOptions = options;
      if (this._lastQualityCount !== options.length) {
        this._lastQualityCount = options.length;
        console.log('[LGV] Quality options: ' + options.length +
          (options.length ? ' → ' + options.map(o => o.label).join(', ') : ' (none — checked player API, <source> tags, <select>, and DOM menu scrape)'));
      }

      // Exactly one row is "in use": the pick you made, else what the site
      // reports, else Auto (the usual default when nothing is reported).
      // A label only counts as "in use" when the picture really has that
      // size. Otherwise the tick goes to the row that matches the real
      // picture (or Auto) and the line under the list says what is playing.
      const pvw = this.video.videoWidth || 0, pvh = this.video.videoHeight || 0;
      const truthful = (o) => {
        if (!o || qIsAuto(o.label)) return true;
        const t = qualityHeight(o.label);
        return !t || !pvh || qPicMatches(pvw, pvh, t);
      };
      let claimed = null;
      let activeIdx = -1;
      if (this.selectedQuality != null) {
        activeIdx = options.findIndex(o => o.label === this.selectedQuality);
        if (activeIdx < 0) activeIdx = options.findIndex(o => qSame(o.label, this.selectedQuality));
        if (activeIdx >= 0 && !truthful(options[activeIdx])) { claimed = options[activeIdx].label; activeIdx = -1; }
      }
      if (activeIdx < 0) {
        const k = options.findIndex(o => o.active);
        if (k >= 0) { if (truthful(options[k])) activeIdx = k; else claimed = claimed || options[k].label; }
      }
      if (activeIdx < 0 && claimed && pvh) {
        activeIdx = options.findIndex(o => !qIsAuto(o.label) && qualityHeight(o.label) && qPicMatches(pvw, pvh, qualityHeight(o.label)));
      }
      if (activeIdx < 0) activeIdx = options.findIndex(o => qIsAuto(o.label));
      try {
        if (pvh && !this._qRunning && !this._qPendingOpt) {
          const tr = this.settings.querySelector('#lgv-qtrace');
          const cur = tr ? tr.textContent : '';
          if (claimed || !cur || /^Playing /.test(cur)) {
            const line = claimed
              ? 'Playing ' + pvw + '×' + pvh + ' — the site\'s ' + claimed + ' label is not what is on screen'
              : 'Playing ' + pvw + '×' + pvh;
            if (cur !== line) this._setQualityTrace(line);
          }
        }
      } catch (e) {}

      // Rebuild only when something changed, so a tap is never lost to a
      // refresh that replaced the row under the finger.
      const sig = options.map(o => o.label).join('|') + '#' + activeIdx;
      if (!force && sig === this._qListSig && list.childElementCount) return;
      this._qListSig = sig;
      list.innerHTML = '';

      if (!options.length) {
        const none = document.createElement('div');
        none.className = 'lgv-track-item';
        none.style.opacity = '0.5';
        none.textContent = 'No quality menu detected on this site';
        list.appendChild(none);
        return;
      }

      options.forEach((opt, idx) => {
        const item = document.createElement('div');
        const isActive = idx === activeIdx;
        item.className = 'lgv-track-item' + (isActive ? ' active' : '');
        const labelEl = document.createElement('span');
        labelEl.className = 'lgv-track-label';
        labelEl.textContent = opt.label;
        item.appendChild(labelEl);
        if (isActive) {
          const tick = document.createElement('span');
          tick.className = 'lgv-track-tick';
          tick.setAttribute('aria-label', 'In use');
          tick.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" style="stroke:var(--lgv-tick)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          item.appendChild(tick);
        }
        item.addEventListener('click', () => { this.switchQuality(opt); });
        list.appendChild(item);
      });
    }

    // After a pick, checks the picture height against the label. If the
    // site didn't actually change quality, say so and go back to showing
    // the site's own choice instead of a highlight that lies.
    // Sign-like text (times, places, numbers) appears at the right-centre of
    // the picture, holds for about four seconds, then fades out. Each sign
    // shows once, not again while its own cue is still on the track.
    // 8.10.72: headline line(s) + bracketed block(s). A bracketed group that wraps
    // over several lines is joined into ONE smaller block so it flows and balances
    // properly; times and "N days / N hours" inside it are highlighted.
    renderSignLines(text) {
      const el = this.signEl;
      if (!el) return;
      el.textContent = '';
      const OPENS = /[(\uFF08\[\u3010]/g, CLOSES = /[)\uFF09\]\u3011]/g;
      const HL = /(\d{1,2}\s*[:\uFF1A]\s*\d{2}|\d+\s*(?:days?|hours?|hrs?|minutes?|mins?|seconds?|secs?))/gi;
      const lines = String(text || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
      const blocks = [];
      let cur = null, depth = 0;
      for (const ln of lines) {
        const o = (ln.match(OPENS) || []).length, c = (ln.match(CLOSES) || []).length;
        if (cur) {
          cur.text += ' ' + ln; depth += o - c;
          if (depth <= 0) { blocks.push(cur); cur = null; depth = 0; }
        } else if (/^[(\uFF08\[\u3010]/.test(ln)) {
          cur = { sub: true, text: ln }; depth = o - c;
          if (depth <= 0) { blocks.push(cur); cur = null; depth = 0; }
        } else {
          blocks.push({ sub: false, text: ln });
        }
      }
      if (cur) blocks.push(cur);
      blocks.forEach((bl) => {
        const d = document.createElement('span');
        d.className = 'lgv-sign-line' + (bl.sub ? ' lgv-sign-sub' : '');
        if (bl.sub) {
          bl.text.split(HL).forEach((part, i) => {
            if (!part) return;
            if (i % 2) {
              const h = document.createElement('span');
              h.className = 'lgv-sign-hl';
              h.textContent = part;
              d.appendChild(h);
            } else d.appendChild(document.createTextNode(part));
          });
        } else d.textContent = bl.text;
        el.appendChild(d);
      });
    }

    // 8.10.94: keep the signs box clear of the dialogue box. If they would overlap
    // (same screen area), the signs box slides up until it sits just above the
    // dialogue; when the dialogue goes, it returns to its normal spot.
    avoidSignOverlap() {
      const sg = this.signEl, st = this.subsText;
      if (!sg || !st || !this.frame) return;
      const setDy = (v) => {
        v = Math.round(v);
        if (v === (this._signDy || 0)) return;
        this._signDy = v;
        sg.style.setProperty('--lgv-sign-dy', v + 'px');
      };
      const shown = sg.classList.contains('show') && sg.textContent && st.textContent;
      if (!shown) { setDy(0); return; }
      const fr = this.frame.getBoundingClientRect();
      const a = sg.getBoundingClientRect();
      const b = st.getBoundingClientRect();
      if (!fr.height || !a.height || !b.height) return;
      const dy0 = this._signDy || 0;
      const natTop = a.top - dy0, natBottom = a.bottom - dy0;
      const gap = fr.height * 0.015;
      const hOverlap = a.left < b.right + gap && a.right > b.left - gap;
      const vOverlap = natBottom > b.top - gap && natTop < b.bottom;
      if (!hOverlap || !vOverlap) { setDy(0); return; }
      let dy = (b.top - gap) - natBottom;               // negative = move up
      const minDy = (fr.top + fr.height * 0.02) - natTop;  // do not leave the picture
      if (dy < minDy) dy = Math.min(0, minDy);
      setDy(dy);
    }

    // 8.10.92: hide the sign overlay right now (no 4 s hold). Used when subtitles go Off
    // or a track changes role. The Sign Style preview is left alone while it runs.
    clearSignNow() {
      if (!this.signEl) return;
      if (Date.now() < (this._signPrevUntil || 0)) return;
      if (!this._signKey && !this.signEl.classList.contains('show')) return;
      this._signKey = null;
      clearTimeout(this._signClear);
      this.signEl.classList.remove('show');
      this._signClear = setTimeout(() => { if (!this._signKey) this.signEl.textContent = ''; }, 700);
    }

    updateSignDisplay(signs) {
      if (!this.signEl) return;
      const now = Date.now();
      if (signs && signs.length) {
        // All sign cues live right now, in start order, as one block.
        const key = signs.map(s => s.key).join('||');
        if (key !== this._signKey) {
          this._signKey = key;
          this.renderSignLines(signs.map(s => s.text).join('\n').replace(/[\uE001-\uE004]/g, '').trim());
          this._signShownAt = now;
          clearTimeout(this._signClear);
        }
        this._signLiveAt = now;
        this.signEl.classList.add('show');
        this.avoidSignOverlap();
        return;
      }
      // No sign cue live: keep the last one up for at least 4 s from when it
      // appeared (and a moment past its end), then fade. Clearing the key here
      // means the same sign shows again if the cue comes round again (rewind).
      if (!this._signKey) return;
      const holdUntil = Math.max((this._signShownAt || 0) + 4000, (this._signLiveAt || 0) + 800);
      if (now < holdUntil) return;
      this._signKey = null;
      this.signEl.classList.remove('show');
      clearTimeout(this._signClear);
      this._signClear = setTimeout(() => { if (!this._signKey) this.signEl.textContent = ''; }, 700);
    }

    // ---- quality engine, player side ----
    getQualityAdapters(force) {
      const now = Date.now();
      const src = this.video.currentSrc || this.video.src || '';
      const same = !!this._qAdapters && this._qAdaptersSrc === src;
      const age = now - (this._qAdaptersAt || 0);
      // A good list stays valid while the stream is the same, so a quality pick
      // no longer re-walks the whole page first. Empty lists are retried.
      if (same && ((this._qAdapters.length && age < 20000) || (!force && age < 6000))) return this._qAdapters;
      const prev = this._qAdapters ? this._qAdapters.map(a => a.name).join(',') : null;
      this._qAdapters = discoverQualityAdapters(this.video);
      this._qAdaptersAt = now;
      this._qAdaptersSrc = src;
      const names = this._qAdapters.map(a => a.name).join(',');
      if (names !== prev) console.log('[LGV] quality adapters: ' + (names || 'none') + ' | playlists seen: ' + lgvHooks.manifests.length);
      return this._qAdapters;
    }

    // The first adapter with levels supplies the list; the rest stay as fallbacks.
    qualityAdapterOptions() {
      for (const a of this.getQualityAdapters(false)) {
        let lv = [], cur = null;
        try { lv = a.levels(); } catch (e) {}
        if (!lv.length) continue;
        try { cur = a.current(); } catch (e) {}
        const key = (l) => qIsAuto(l) ? 99999 : (qualityHeight(l) || 0);
        return lv.slice().sort((x, y) => key(y.label) - key(x.label)).map(l => ({
          label: l.label, el: null, viaAdapter: true,
          active: cur != null && qSame(cur, l.label),
          apply: () => { try { a.set(l.label); } catch (e) {} }
        }));
      }
      return [];
    }

    _setQualityTrace(text) {
      const el = this.settings && this.settings.querySelector('#lgv-qtrace');
      if (el) el.textContent = text || '';
    }

    // True once the picture (or the player's own report) shows the quality.
    async _confirmQuality(label, adapter, ctx, timeout, alive) {
      if (ctx.auto && !adapter) { await sleep(200); return alive(); }
      if (!ctx.auto && !ctx.target && !adapter) { await sleep(250); return alive(); }
      const t0 = Date.now();
      let apiOk = false;
      // When paused the picture never updates, so accept the player's own
      // report as soon as it agrees — no multi-second wait.
      const paused = !!this.video.paused;
      const poll = paused ? 50 : 80;
      const limit = paused ? Math.min(timeout, 900) : timeout;
      while (Date.now() - t0 < limit) {
        await sleep(poll);
        if (!alive()) return false;
        const vh = this.video.videoHeight || 0;
        try { if (adapter && qSame(adapter.current(), label)) apiOk = true; } catch (e) {}
        // Instant accept when paused and the API already reports the new level
        if (apiOk && paused) return true;
        if (ctx.auto || !ctx.target) { if (apiOk) return true; continue; }
        if (qMatches(vh, ctx.target)) return true;
        if (apiOk && ctx.before && vh && vh !== ctx.before && ((ctx.target < ctx.before) === (vh < ctx.before))) return true;
      }
      // Final fallback: paused + API says ok
      return !!(alive() && apiOk && this.video.paused);
    }

    async _swapManifestVariant(label) {
      const target = qualityHeight(label);
      if (!target) return null;
      const info = await findMasterVariants();
      if (!info) return null;
      const v = info.variants.filter(x => x.height)
        .sort((a, b) => Math.abs(a.height - target) - Math.abs(b.height - target) || b.bandwidth - a.bandwidth)[0];
      if (!v || Math.abs(v.height - target) > target * 0.15) return null;
      return (await swapToVariant(this, v.url)) ? v.url : null;
    }

    // One pick at a time. A tap records the pick and shows it at once; the
    // real switch starts a moment later, so a burst of taps ends as a single
    // switch to the last one instead of several fighting over the video.
    switchQuality(opt) {
      if (!opt) return;
      const label = opt.label;
      if (!this._qRunning && !this._qPendingOpt && this._qApplied != null && qSame(this._qApplied, label)) {
        this.selectedQuality = label;
        this.showQualityToast('Already on ' + label);
        this.refreshQualityList(true);
        return;
      }
      this.selectedQuality = label;
      this._qPendingOpt = opt;
      this._qToken = (this._qToken || 0) + 1;   // older picks stop at their next checkpoint
      this._setQualityTrace('Switching to ' + label + '...');
      this.showQualityToast('Switching to ' + label + '…', 9000);
      this.refreshQualityList(true);
      clearTimeout(this._qDebounce);
      this._drainQualitySwitches();
    }

    async _drainQualitySwitches() {
      if (this._qRunning) return;   // the running loop picks up the newest pick
      this._qRunning = true;
      try {
        while (this._qPendingOpt) {
          const opt = this._qPendingOpt;
          this._qPendingOpt = null;
          try { await this._runQualitySwitch(opt, this._qToken); }
          catch (e) { console.warn('[LGV] quality switch error', e); }
          if (this._qPendingOpt) await sleep(30);
        }
      } finally { this._qRunning = false; }
    }

    // Tries every route until the picture really changes. The routes and their
    // order are the same as before; the one that worked last time on this site
    // is simply tried first, so there is no wait on routes that never work here.
    async _runQualitySwitch(opt, token) {
      const label = opt.label;
      const alive = () => token === this._qToken;
      const trace = [];
      this._qState = null;
      const ctx = { before: this.video.videoHeight || 0, target: qualityHeight(label), auto: qIsAuto(label) };
      const done = (ok, how, stepId) => {
        if (!alive()) return false;
        if (ok) {
          const vh = this.video.videoHeight || 0;
          const sharp = !ctx.auto && vh && ((ctx.target && qMatches(vh, ctx.target)) || (ctx.before && vh !== ctx.before));
          const pvw = this.video.videoWidth || 0;
          const fake = !ctx.auto && ctx.target && vh && !qPicMatches(pvw, vh, ctx.target);
          this._qApplied = fake ? null : label;
          if (!ctx.auto && stepId && !fake) saveSetting('q-winner', stepId);
          this._qState = sharp ? { label, goodH: vh, time: this.video.currentTime || 0, step: stepId, opt } : null;
          this._setQualityTrace(fake ? ('Playing ' + pvw + '×' + vh + ' — ' + label + ' is not available here') : (label + ' via ' + how));
          this.showQualityToast(fake ? ('Picture is ' + heightLabel(vh) + ', not ' + label) : ('Quality: ' + label));
        } else {
          this.selectedQuality = null;
          this._setQualityTrace('No change. Tried: ' + trace.join(', '));
          this.showQualityToast("Couldn't switch to " + label);
        }
        console.log('[LGV] quality', label, ok ? 'ok via ' + how : 'failed', trace);
        this.refreshQualityList(true);
        this._watchAfterSwitch();
        return ok;
      };


      const steps = [];
      // 1. The player's own API (JW Player, hls.js, Shaka, dash.js, video.js, Plyr, Vidstack)
      this.getQualityAdapters(true).forEach(a => steps.push({ id: 'api:' + a.name, how: a.name, run: async () => {
        let applied = false;
        try { applied = a.set(label); } catch (e) { trace.push(a.name + ' error'); return false; }
        if (!applied) { trace.push(a.name + ' has no ' + label); return false; }
        // Quiet hls flush only if we have an instance — never seek.
        try {
          const hls = this._findHlsInstance();
          if (hls) quietBufferFlush(hls);
        } catch (e) {}
        const wait = this.video.paused ? 800 : 2800;
        if (await this._confirmQuality(label, a, ctx, wait, alive)) return true;
        trace.push(a.name + ' no change');
        return false;
      } }));
      // 2. The option's own handler (<source> swap, <select>)
      if (!opt.viaAdapter && !opt.viaDom && (typeof opt.apply === 'function' || opt.el)) {
        steps.push({ id: 'page source', how: 'page source', run: async () => {
          try {
            if (typeof opt.apply === 'function') opt.apply(); else fireClick(opt.el);
          } catch (e) { trace.push('page option error'); }
          const wait = this.video.paused ? 900 : 2800;
          if (await this._confirmQuality(label, null, ctx, wait, alive)) return true;
          trace.push('page source');
          return false;
        } });
      }
      // 2b. The site's own quality item, pressed directly.
      steps.push({ id: 'site item', how: 'site item', run: async () => {
        let el = (opt.el && opt.el.isConnected) ? opt.el : null;
        if (!el) { try { const f = this.findSiteQualityItem(label); el = f && f.clickable; } catch (e) {} }
        if (!el) { trace.push('site item not found'); return false; }
        try { fireClick(el); } catch (e) { trace.push('site item error'); return false; }
        try {
          const hls = this._findHlsInstance();
          if (hls) quietBufferFlush(hls);
        } catch (e) {}
        const wait = this.video.paused ? 1000 : 3500;
        if (await this._confirmQuality(label, null, ctx, wait, alive)) return true;
        trace.push('site item no change');
        return false;
      } });
      // 3. The site's own settings menu, driven like a person would
      steps.push({ id: 'site menu', how: 'site menu', run: async () => {
        const driven = await this.driveSiteQuality(label);
        if (!alive()) return false;
        const wait = this.video.paused ? 1000 : 2800;
        if (driven && await this._confirmQuality(label, null, ctx, wait, alive)) return true;
        trace.push(driven ? 'site menu no change' : 'site menu not found');
        return false;
      } });
      // 4. Last resort: point the video at that quality's stream playlist
      steps.push({ id: 'stream swap', how: 'stream swap', run: async () => {
        let swapped = null;
        try { swapped = await this._swapManifestVariant(label); } catch (e) {}
        if (!alive()) return false;
        const wait = this.video.paused ? 1200 : 3500;
        if (swapped && await this._confirmQuality(label, null, ctx, wait, alive)) return true;
        trace.push(swapped ? 'stream swap no change' : 'no stream list');
        return false;
      } });

      const win = loadSetting('q-winner', null);
      if (opt.viaDom && opt.el) {
        const i = steps.findIndex(x => x.id === 'site item');
        if (i > 0) steps.unshift(steps.splice(i, 1)[0]);
      } else if (win) {
        const i = steps.findIndex(x => x.id === win);
        if (i > 0) steps.unshift(steps.splice(i, 1)[0]);
      }
      for (const st of steps) {
        if (!alive()) return false;
        let ok = false;
        try {
          let to = null;
          const limit = new Promise(res => { to = setTimeout(() => res('timeout'), 12000); });
          const r = await Promise.race([st.run(), limit]);
          clearTimeout(to);
          if (r === 'timeout') trace.push(st.id + ' timed out'); else ok = !!r;
        } catch (e) { trace.push(st.id + ' error'); }
        if (!alive()) return false;
        if (ok) return done(true, st.how, st.id);
      }
      return done(false);
    }

    // Long lists (tracks, fonts, audio, quality) sit behind a one-line header that
    // shows the current choice, so each tab stays short. Tap the header to open or
    // close it; the choice is remembered. The lists themselves are built by the
    // same code as before; this only watches them to keep the header text current.
    initFolds() {
      try {
        const defaults = { tracks: false, fonts: false, substyle: false, signstyle: false, audio: false, quality: true };
        const state = Object.assign({}, defaults, loadSetting('folds', null) || {});
        const folds = Array.from(this.settings.querySelectorAll('.lgv-fold'));
        const labelOf = (el) => { const l = el.querySelector('.lgv-track-label'); return ((l ? l.textContent : el.textContent) || '').trim(); };
        const summaryOf = (f) => {
          const key = f.getAttribute('data-fold');
          const body = f.querySelector('.lgv-fold-body');
          if (key === 'audio') {
            try {
              const at = this.video.audioTracks;
              if (at && at.length) for (let i = 0; i < at.length; i++) if (at[i].enabled) return at[i].label || at[i].language || ('Audio ' + (i + 1));
            } catch (e) {}
            return 'Default';
          }
          if (key === 'tracks' && this._trackSummary != null) return this._trackSummary;
          const items = Array.from(body.querySelectorAll('.lgv-track-item, .lgv-font-item'));
          const ticked = items.find(el => el.querySelector('.lgv-track-tick:not(.empty)'));
          const active = items.find(el => el.classList.contains('active'));
          if (key === 'tracks' && active && ticked && active !== ticked) return 'Auto · ' + labelOf(ticked);
          const pick = ticked || active;
          return pick ? labelOf(pick) : '—';
        };
        const sync = () => {
          folds.forEach(f => {
            try {
              const sum = f.querySelector('.lgv-fold-sum');
              const t = summaryOf(f);
              if (sum && sum.textContent !== t) sum.textContent = t;
              if (f.getAttribute('data-fold') === 'audio') {
                const only = f.querySelector('.lgv-fold-body').textContent.trim() === 'Only default audio';
                f.style.display = only ? 'none' : '';
              }
            } catch (e) {}
          });
        };
        folds.forEach(f => f.classList.toggle('open', !!state[f.getAttribute('data-fold')]));
        let raf = 0;
        const schedule = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; sync(); }); };
        folds.forEach(f => {
          try { new MutationObserver(schedule).observe(f.querySelector('.lgv-fold-body'), { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] }); } catch (e) {}
        });
        this.settings.addEventListener('click', (e) => {
          const head = e.target && e.target.closest ? e.target.closest('.lgv-fold-head') : null;
          if (!head) return;
          const f = head.closest('.lgv-fold');
          if (!f) return;
          const key = f.getAttribute('data-fold');
          state[key] = !f.classList.contains('open');
          f.classList.toggle('open', state[key]);
          saveSetting('folds', state);
        });
        sync();
      } catch (e) {}
    }

    // Paints each slider's white fill (CSS variable --p = how far the handle is).
    paintSliders() {
      try {
        this.settings.querySelectorAll('.lgv-slider').forEach(el => {
          const mn = parseFloat(el.min) || 0, mx = parseFloat(el.max) || 100, v = parseFloat(el.value);
          const p = mx > mn && isFinite(v) ? Math.max(0, Math.min(100, (v - mn) / (mx - mn) * 100)) : 0;
          const t = p.toFixed(1) + '%';
          if (el.style.getPropertyValue('--p') !== t) el.style.setProperty('--p', t);
        });
      } catch (e) {}
    }

    // After a quality pick: only nudge if the picture is truly stalled (black /
    // not loading). Never seek just because height is still updating — that
    // caused the "dancing" playback.
    _watchAfterSwitch() {
      const v = this.video;
      clearTimeout(this._qWatch);
      clearTimeout(this._qWatch2);
      this._qWatch = setTimeout(() => {
        try {
          if (this._qRunning || this._qPendingOpt) return;
          if (!v.paused && !v.seeking && v.readyState < 2 && !v.ended) {
            // Single tiny nudge only when nothing is decoding
            const t = v.currentTime;
            v.currentTime = Math.max(0, t + 0.01);
            console.log('[LGV] stalled after switch; tiny nudge');
          }
        } catch (e) {}
      }, 4000);
    }

    // Going back after a quality change can replay old, softer video that was
    // already buffered. When the picture drops below what the switch gave, the
    // same route that worked is applied once more (at most once per 15 s).
    initQualityHeal() {
      const v = this.video;
      let timer = null;
      // Keep the tick and the "Playing WxH" line honest when the picture size changes.
      let rz = 0;
      v.addEventListener('resize', () => {
        clearTimeout(rz);
        rz = setTimeout(() => { try { if (this.settingsOpen) this.refreshQualityList(); } catch (e) {} }, 400);
      });
      v.addEventListener('seeked', () => {
        clearTimeout(timer);
        const st = this._qState;
        if (!st || !st.goodH || !this.selectedQuality || qIsAuto(this.selectedQuality)) return;
        if (v.currentTime >= st.time - 1) return;   // only when jumping back behind the switch
        timer = setTimeout(() => { this._healBackQuality().catch(() => {}); }, 1400);
      });
    }

    async _healBackQuality() {
      const st = this._qState, v = this.video;
      if (!st || !st.goodH || this._qRunning || this._qPendingOpt) return;
      if (!this.selectedQuality || !qSame(this.selectedQuality, st.label)) return;
      const vh = v.videoHeight || 0;
      if (!vh || vh >= st.goodH * 0.88) return;
      const now = Date.now();
      if (this._qHealAt && now - this._qHealAt < 15000) return;
      this._qHealAt = now;
      console.log('[LGV] quality heal: picture is ' + vh + 'p after going back; applying ' + st.label + ' again via ' + st.step);
      if (st.step && st.step.indexOf('api:') === 0) {
        const a = this.getQualityAdapters(false).find(x => 'api:' + x.name === st.step);
        if (a) { try { a.set(st.label); } catch (e) {} }
      } else if (st.step === 'page source' && st.opt && typeof st.opt.apply === 'function') {
        try { st.opt.apply(); } catch (e) {}
      } else {
        console.log('[LGV] quality heal: ' + st.step + ' cannot be repeated safely');
      }
    }

    showQualityToast(msg, ms) {
      if (!this.qToast) return;
      this.qToast.textContent = msg;
      this.qToast.classList.add('show');
      clearTimeout(this._qToastTimer);
      this._qToastTimer = setTimeout(() => this.qToast.classList.remove('show'), ms || 1300);
    }

    verifyQuality() {
      const c = this._qualityCheck;
      this._qualityCheck = null;
      if (!c || c.height == null) return;   // Auto / unlabeled: nothing to check
      const vh = this.video.videoHeight;
      if (!vh) return;
      if (Math.abs(vh - c.height) <= 16) {
        this.showQualityToast('Quality: ' + c.label);
      } else {
        this.selectedQuality = null;
        this.showQualityToast("Site didn't switch to " + c.label);
        this.refreshQualityList();
      }
    }

    setAllTextTracks(mode) {
      if (!this.video.textTracks) return;
      for (let i = 0; i < this.video.textTracks.length; i++) {
        this.video.textTracks[i].mode = mode;
      }
    }

    openSettings() {
      if (this.locked) return;
      this.settingsOpen = true;
      this.settings.classList.add('open');
      this.root.classList.add('show');
      clearTimeout(this.hideTimer);
      try { this.updateSubsGap(true); } catch (e) {}
      this._nudgeCount = 0;
      this.refreshTrackList();
    }

    closeSettings() {
      try { this.closeRolePop(); } catch (e) {}
      try { this.closeSiteQualityMenus(); } catch (e) {}
      this.settingsOpen = false;
      this.settings.classList.remove('open');
    }

    // Locks the player UI: control bar, seek zones, subtitle gestures,
    // skip, settings, and scrubbing all stop responding. Only the
    // compact unlock icon on the right edge remains interactive (and it
    // auto-hides after a short delay, reappearing on any touch).
    // Video continues playing (or stays paused) — lock only freezes input.
    setLocked(on) {
      this.locked = !!on;
      if (this.locked) {
        this.root.classList.add('lgv-locked');
        this.closeSettings();
        this.root.classList.remove('show');
        this.updateSubsGap(false);
        if (this.scrubbing) {
          this.scrubbing = false;
          this.root.classList.remove('scrubbing');
        }
        this._subGestureEnd?.();
        clearTimeout(this.hideTimer);
        this.showUnlock();
      } else {
        this._cancelHoldUnlock?.();
        this.root.classList.remove('lgv-locked');
        this.hideUnlock();
        this.show();
      }
    }

    showUnlock() {
      if (!this.locked || !this.unlockWrap) return;
      this.unlockWrap.classList.add('lgv-unlock-show');
      clearTimeout(this._unlockHideTimer);
      this._unlockHideTimer = setTimeout(() => this.hideUnlock(), 2800);
    }

    hideUnlock() {
      clearTimeout(this._unlockHideTimer);
      this.unlockWrap?.classList.remove('lgv-unlock-show');
    }

    // Long-press on the video (about 0.4s) runs at 2x while the finger stays
    // down; releasing restores the speed chosen in Settings. Only the video
    // clock changes, and subtitles are timed against it, so they stay in sync.
    //
    // "2x is live" (`active`) is its own state, separate from "this touch
    // became a hold" (`_holdFired`, which only stops the tap handlers). A
    // later touch used to reset the shared flag, and then neither the
    // release nor a pause knew 2x was still on. Now 2x ends on any of:
    // finger up / cancel, pause, a new touch, fullscreen change, page hide,
    // blur, or the watchdog below noticing no finger is down.
    initHoldSpeed() {
      const HOLD_MS = 400;
      const MOVE_CANCEL = 10;
      const FAST = 2;
      const v = this.video;

      const wrap = document.createElement('div');
      wrap.className = 'lgv-speed-wrap';
      const badge = document.createElement('div');
      badge.className = 'lgv-speed-badge';
      badge.textContent = '2\u00D7';
      wrap.appendChild(badge);
      this.root.appendChild(wrap);
      this._speedBadge = badge;

      let timer = null, watchdog = null;
      let down = false;       // pointer pressed on a zone, waiting to see if it's a hold
      let touching = false;   // any finger/mouse button currently down
      let active = false;     // 2x is on right now
      let sx = 0, sy = 0;
      const clearTimer = () => { if (timer) { clearTimeout(timer); timer = null; } };
      const clearWatchdog = () => { if (watchdog) { clearInterval(watchdog); watchdog = null; } };

      // Safe to call any number of times; does nothing unless 2x is on.
      const finish = () => {
        clearTimer();
        down = false;
        if (!active) return;
        active = false;
        this._holdActive = false;
        clearWatchdog();
        const back = this.playbackRate || 1;
        try { v.playbackRate = back; } catch (e) {}
        badge.classList.remove('show');
        // Make sure nothing put 2x back
        setTimeout(() => { if (!active && v.playbackRate === FAST && back !== FAST) { try { v.playbackRate = back; } catch (e) {} } }, 150);
        setTimeout(() => { if (!active && v.playbackRate === FAST && back !== FAST) { try { v.playbackRate = back; } catch (e) {} } }, 700);
      };

      const engage = () => {
        timer = null;
        if (!down || !touching || this.locked || v.paused) return;
        active = true;
        this._holdActive = true;
        this._holdFired = true;   // this touch is a hold, not a tap
        try { v.preservesPitch = true; } catch (e) {}
        v.playbackRate = FAST;
        badge.classList.add('show');
        clearWatchdog();
        watchdog = setInterval(() => {
          if (!active) { clearWatchdog(); return; }
          if (!touching || v.paused || document.hidden) finish();
        }, 200);
      };

      const begin = (x, y) => {
        if (this.locked) return;
        if (active) finish();        // stale 2x from a missed release
        clearTimer();
        down = true;
        this._holdFired = false;
        sx = x; sy = y;
        timer = setTimeout(engage, HOLD_MS);
      };

      const moveTo = (x, y) => {
        if (!down || active) return;
        if (Math.abs(x - sx) > MOVE_CANCEL || Math.abs(y - sy) > MOVE_CANCEL) {
          clearTimer();
          down = false;
        }
      };

      // Touch starts on the tap zones...
      [this.zoneL, this.zoneR, this.zoneC].forEach(zone => {
        if (!zone) return;
        zone.addEventListener('touchstart', (e) => {
          const t = e.touches && e.touches[0];
          if (t && !(active && e.touches.length > 1)) begin(t.clientX, t.clientY);
        }, { passive: true, capture: true });
        zone.addEventListener('mousedown', (e) => {
          if (e.button === 0) begin(e.clientX, e.clientY);
        }, true);
        // A long-press must not open the browser's own menu mid-hold
        zone.addEventListener('contextmenu', (e) => { if (down || active) e.preventDefault(); }, true);
      });

      // ...but every touch anywhere is tracked window-wide.
      const syncTouching = (e) => {
        touching = !!(e.touches && e.touches.length > 0);
        if (!touching) finish();
      };
      window.addEventListener('touchstart', (e) => {
        // A fresh single touch while 2x is on means the old one ended unseen
        if (active && e.touches && e.touches.length === 1) finish();
        touching = true;
      }, { passive: true, capture: true });
      window.addEventListener('touchmove', (e) => {
        touching = !!(e.touches && e.touches.length > 0);
        const t = e.touches && e.touches[0];
        if (t) moveTo(t.clientX, t.clientY);
      }, { passive: true, capture: true });
      window.addEventListener('touchend', syncTouching, { passive: true, capture: true });
      window.addEventListener('touchcancel', () => { touching = false; finish(); }, { passive: true, capture: true });
      window.addEventListener('mousedown', (e) => { if (e.button === 0) touching = true; }, true);
      window.addEventListener('mousemove', (e) => moveTo(e.clientX, e.clientY), true);
      ['mouseup', 'pointerup', 'pointercancel'].forEach(type =>
        window.addEventListener(type, () => { if (type === 'mouseup') touching = false; if (type !== 'pointerup' || !touching) finish(); }, true));
      window.addEventListener('blur', () => { touching = false; finish(); });
      window.addEventListener('pagehide', () => { touching = false; finish(); });
      document.addEventListener('visibilitychange', () => { if (document.hidden) { touching = false; finish(); } });
      document.addEventListener('fullscreenchange', () => { touching = false; finish(); });
      v.addEventListener('pause', () => { touching = false; finish(); });
      v.addEventListener('ended', () => { touching = false; finish(); });
    }

    // Hold 3s anywhere on the locked player (or the unlock chip) to unlock.
    initHoldUnlock() {
      const HOLD_MS = 3000;
      const CIRC = 2 * Math.PI * 16; // r=16 in the 40×40 viewBox
      let holding = false;
      let start = 0;
      let startX = 0, startY = 0;
      let raf = 0;

      const setProgress = (t) => {
        const p = Math.max(0, Math.min(1, t));
        if (this.holdRingProg) {
          this.holdRingProg.style.strokeDasharray = String(CIRC);
          this.holdRingProg.style.strokeDashoffset = String(CIRC * (1 - p));
        }
      };

      const cancel = () => {
        holding = false;
        cancelAnimationFrame(raf);
        this.holdRing?.classList.remove('show');
        setProgress(0);
      };

      const tick = () => {
        if (!holding || !this.locked) { cancel(); return; }
        const p = (performance.now() - start) / HOLD_MS;
        setProgress(p);
        if (p >= 1) {
          cancel();
          this.setLocked(false);
          this.show();
          return;
        }
        raf = requestAnimationFrame(tick);
      };

      const begin = (x, y) => {
        if (!this.locked) return;
        holding = true;
        start = performance.now();
        startX = x; startY = y;
        this.showUnlock();
        clearTimeout(this._unlockHideTimer); // keep chip up while holding
        setProgress(0);
        this.holdRing?.classList.add('show');
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      };

      const move = (x, y) => {
        if (!holding) return;
        if (Math.hypot(x - startX, y - startY) > 18) cancel();
      };

      const onDown = (e) => {
        if (!this.locked) return;
        // The unlock chip is its own instant one-tap unlock (see the
        // unlockBtn listeners below) — it must not also start the 3s
        // hold-ring, or a plain tap there would just sit counting down
        // instead of unlocking immediately.
        if (e.target && e.target.closest && e.target.closest('.lgv-unlock-wrap')) return;
        const pt = e.touches ? e.touches[0] : e;
        if (!pt) return;
        begin(pt.clientX, pt.clientY);
      };
      const onMove = (e) => {
        if (!holding) return;
        const pt = e.touches ? e.touches[0] : e;
        if (!pt) return;
        move(pt.clientX, pt.clientY);
      };
      const onUp = () => { if (holding) cancel(); };

      this.root.addEventListener('touchstart', onDown, { passive: true });
      this.root.addEventListener('touchmove', onMove, { passive: true });
      this.root.addEventListener('touchend', onUp, { passive: true });
      this.root.addEventListener('touchcancel', onUp, { passive: true });
      this.root.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        onDown(e);
      });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);

      this._cancelHoldUnlock = cancel;
    }

    // Sets the cue text and, in the same place, toggles whether the text
    // node is touchable — empty text is always pointer-events:none, so a
    // pinch during a gap in the dialogue has literally nothing to grab.
    setSubsText(rawText) {
      const text = cleanCueText(rawText);
      if (this._subsKey !== text) {
        this._subsKey = text;
        renderCueMarkup(this.subsText, text);
      }
      this.subsText.classList.toggle('lgv-subs-interactive', !!text);
      this.avoidSignOverlap();
    }

    // Belt-and-suspenders against a second, unstyled subtitle line showing
    // through underneath ours — the "other languages leaking in" / duplicate
    // caption bug. The hardcoded player-framework selectors in the <style>
    // block (.vjs-text-track-display, .shaka-text-container, etc.) only
    // catch subtitle boxes belonging to *known* players. A site with its
    // own custom, non-standard subtitle renderer (its own div synced by its
    // own JS, not driven through the HTML5 TextTrack API at all) is
    // invisible to those rules and to video::cue — our overlay reading a
    // *different* track than that native box is what produced two
    // different languages/lines on screen at once.
    //
    // This scans for the same "looks like a subtitle/caption box" pattern
    // already used as a last-resort text source below, and force-hides any
    // match that isn't part of our own UI. The same exclusion (skip
    // anything containing buttons/links/menu items) is reused here so this
    // never hides an actual subtitle *picker* menu, only a plain text
    // display box.
    suppressNativeSubtitleLeaks() {
      // Only meaningful once we have our own reliable, textTracks-driven
      // source of cue text — if textTracks is empty, subtitleEngine's own
      // last-resort fallback (below) has to read these same elements via
      // .innerText to have any subtitles at all, so hiding them here would
      // just break that path instead.
      if (!this.video.textTracks || !this.video.textTracks.length) return;
      try {
        const guesses = document.querySelectorAll('[class*="subtitle" i], [class*="caption" i]');
        for (const el of guesses) {
          if (this.root.contains(el)) continue;
          if (el.dataset.lgvSuppressed) continue;
          if (el.contains(this.video) || el.querySelector('video')) continue;
          if (el.querySelector('button, a, [role="button"], [role="menuitem"], [role="option"], input, select, li')) continue;
          // opacity only, deliberately NOT visibility:hidden/display:none —
          // those would zero out .innerText too, which is exactly what the
          // text-extraction fallback path below still needs to keep
          // working on sites where it's ever actually reached.
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
          el.dataset.lgvSuppressed = '1';
        }
      } catch (e) {}
    }

    scaleEverything() {
      this.syncPictureFrame();
      // Font size = subSizeRatio of the picture height (cqh of the frame).
      // Everything else on the subtitle is in em of this, so it all follows
      // the picture rather than the full phone box.
      this.subs.style.fontSize = `calc(${(this.subSizeRatio * 100).toFixed(3)} * 1cqh)`;
      this.applyOutline();
    }

    // Matches the frame to the picture as it's actually drawn inside the
    // <video> box (letterboxed/pillarboxed like object-fit: contain). A 16:9
    // video in a tall portrait box gets its subtitles placed inside the 16:9
    // picture, not down in the black bars.
    syncPictureFrame() {
      if (!this.frame) return;
      const W = this.video.clientWidth, H = this.video.clientHeight;
      const rw = this.root.clientWidth || W, rh = this.root.clientHeight || H;
      if (!W || !H || !rw || !rh) return;
      let pw = W, ph = H, pl = 0, pt = 0;
      const vw = this.video.videoWidth, vh = this.video.videoHeight;
      const fit = getComputedStyle(this.video).objectFit;
      if (vw && vh && fit !== 'cover' && fit !== 'fill') {
        const k = Math.min(W / vw, H / vh);
        pw = vw * k; ph = vh * k;
        pl = (W - pw) / 2; pt = (H - ph) / 2;
      }
      this.frame.style.left = (pl / rw * 100) + '%';
      this.frame.style.top = (pt / rh * 100) + '%';
      this.frame.style.width = (pw / rw * 100) + '%';
      this.frame.style.height = (ph / rh * 100) + '%';
      this._frameH = ph;
      this._picTopPx = pt;
      this._rootH = rh;
    }

    applyOutline() {
      // em units resolve against this element's own font-size (set in
      // scaleEverything()), so stroke thickness scales with text size.
      // Baseline 1.0 ≈ the old 1.2 visual (1.0 * 0.06 = 0.06em).
      const s = this.outlineStrength * 0.06;
      // Presets other than Outline draw their own edge in CSS (scaled by this).
      this.subs.style.setProperty('--lgv-ol', String(this.outlineStrength));
      if (this.subStyle && this.subStyle !== 'outline') { this.subs.style.textShadow = ''; return; }
      this.subs.style.textShadow = `
        ${s}em 0 0 #000, -${s}em 0 0 #000, 0 ${s}em 0 #000, 0 -${s}em 0 #000,
        ${s*0.7}em ${s*0.7}em 0 #000, -${s*0.7}em ${s*0.7}em 0 #000,
        ${s*0.7}em -${s*0.7}em 0 #000, -${s*0.7}em -${s*0.7}em 0 #000
      `;
    }

    applySpacing() {
      // 1.0 = original line-height of 1.32; higher = more gap between lines
      const lh = 1.32 * (this.subSpacing || 1);
      this.subs.style.lineHeight = lh;
    }

    applyFont() {
      const opt = FONT_OPTIONS.find(f => f.id === this.uiFont) || FONT_OPTIONS[0];
      if (this.root) this.root.style.setProperty('--lgv-font', opt.stack);
    }

    // ---- Look presets (normal subtitles + signs) ----
    applySubStyle() {
      try { this.subs.setAttribute('data-style', this.subStyle); } catch (e) {}
      this.applyOutline();
    }
    applySignStyle() {
      try { if (this.signEl) this.signEl.setAttribute('data-style', this.signStyle); } catch (e) {}
    }
    buildStyleList(selector, current, onPick) {
      const list = this.settings && this.settings.querySelector(selector);
      if (!list) return;
      list.innerHTML = '';
      STYLE_PRESETS.forEach((opt) => {
        const item = document.createElement('div');
        item.className = 'lgv-font-item lgv-preset-item' + (current === opt.id ? ' active' : '');
        const l = document.createElement('span');
        l.className = 'lgv-track-label';
        l.textContent = opt.label;
        const h = document.createElement('span');
        h.className = 'lgv-preset-hint';
        h.textContent = opt.hint;
        item.appendChild(l);
        item.appendChild(h);
        item.addEventListener('click', () => onPick(opt.id));
        list.appendChild(item);
      });
    }
    buildStyleLists() {
      this.buildStyleList('#lgv-substyles', this.subStyle, (id) => {
        this.subStyle = id;
        saveSetting('sub-style-v1', id);
        this.applySubStyle();
        this.buildStyleLists();
        this.previewSubs();
      });
      this.buildStyleList('#lgv-signstyles', this.signStyle, (id) => {
        this.signStyle = id;
        saveSetting('sign-style-v1', id);
        this.applySignStyle();
        this.buildStyleLists();
        this.previewSign();
      });
    }
    // Short sample so a pick can be seen straight away, even with nothing on screen.
    previewSubs() {
      try {
        clearTimeout(this._subPrevT);
        this.setSubsText('This is how your subtitles look');
        this.updateSubsGap(this.root.classList.contains('show'));
        this._subPrevT = setTimeout(() => {
          this.setSubsText(this.lastSub || '');
          this.updateSubsGap(this.root.classList.contains('show'));
        }, 3500);
      } catch (e) {}
    }
    previewSign() {
      try {
        if (!this.signEl) return;
        clearTimeout(this._signPrevT);
        if (this._signKey) return;   // a real sign is up: it already shows the new look
        this._signPrevUntil = Date.now() + 3900;
        this.renderSignLines('November 12th 12:00 Tokyo\n(Remaining Time Until Tsumiki Must Enter the Culling Game:\n7 Days 12 Hours)');
        this.signEl.classList.add('show');
        this._signPrevT = setTimeout(() => {
          if (this._signKey) return;
          this.signEl.classList.remove('show');
          setTimeout(() => { if (!this._signKey && !this.signEl.classList.contains('show')) this.signEl.textContent = ''; }, 700);
        }, 3800);
      } catch (e) {}
    }

    buildFontList() {
      const list = this.settings?.querySelector('#lgv-fonts');
      if (!list) return;
      list.innerHTML = '';
      FONT_OPTIONS.forEach((opt) => {
        const item = document.createElement('div');
        item.className = 'lgv-font-item' + (this.uiFont === opt.id ? ' active' : '');
        item.textContent = opt.label;
        item.style.fontFamily = opt.stack;
        item.addEventListener('click', () => {
          this.uiFont = opt.id;
          saveSetting('ui-font', opt.id);
          this.applyFont();
          this.buildFontList();
        });
        list.appendChild(item);
      });
    }

    applyBrightness() {
      // Honest limitation, stated plainly: no web page or userscript can
      // control the device's actual hardware/system screen brightness —
      // there is no browser API for that, on any platform, by design (a
      // page/script reaching into your OS display settings would be a
      // serious privacy/security hole). What follows is the closest
      // honest approximation: a pure black veil that only ever DIMS the
      // picture, never a fake "brighten past 100%" trick. The old
      // above-100% soft-light "boost" has been removed entirely — it
      // wasn't real extra brightness, just a white-tinted overlay that
      // washed color out and looked "messed up" for no real gain. So:
      // slider max (1.0) = zero overlay = exactly what your device is
      // already rendering, untouched. Only the low end darkens, and even
      // then it's capped so text never crushes to solid black.
      const b = Math.max(0.15, Math.min(1, this.brightness ?? 1));
      this.brightness = b;

      // Clear any leftover filter from older builds
      try { if (this.root) this.root.style.filter = ''; } catch (e) {}
      try { if (this.video) this.video.style.filter = ''; } catch (e) {}

      const ov = this.brightOverlay;
      if (!ov) return;

      if (b >= 0.995) {
        // Max/neutral = fully out of the render tree, not just invisible.
        // See the CSS comment above: leaving an opacity:0 layer sitting
        // over the glass panels was itself the bug (broke their blur into
        // a "mosaic" look and flattened their transparency in some
        // browsers) even though you couldn't see the overlay itself.
        ov.style.display = 'none';
        ov.style.opacity = '0';
        ov.style.background = '#000';
        return;
      }

      // Dim: black veil over everything (video + UI + subs).
      // Cap so white text never collapses to pure black.
      const dim = Math.min(0.78, (1 - b) * 0.92);
      ov.style.display = 'block';
      ov.style.background = '#000';
      ov.style.opacity = String(dim);
    }

    // MX Player–style vertical swipe: left = brightness, right = volume.
    // HUD is tiny, player-sized, and shown on the OPPOSITE side of the finger.
    initSideGestures() {
      // Sun with 8 rounded "sticks" like a brightness glyph
      const ICON_BRIGHT = `<svg viewBox="0 0 24 24">
        <g class="lgv-sun-rays">
          <rect x="11" y="0.8" width="2" height="3.6" rx="1"/>
          <rect x="11" y="19.6" width="2" height="3.6" rx="1"/>
          <rect x="0.8" y="11" width="3.6" height="2" rx="1"/>
          <rect x="19.6" y="11" width="3.6" height="2" rx="1"/>
          <g transform="rotate(45 12 12)">
            <rect x="11" y="0.8" width="2" height="3.6" rx="1"/>
            <rect x="11" y="19.6" width="2" height="3.6" rx="1"/>
            <rect x="0.8" y="11" width="3.6" height="2" rx="1"/>
            <rect x="19.6" y="11" width="3.6" height="2" rx="1"/>
          </g>
        </g>
        <circle class="lgv-sun-core" cx="12" cy="12" r="5.15"/>
      </svg>`;
      const ICON_VOL = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`;
      const ICON_VOL_HI = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
      const ICON_MUTE = `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>`;

      const showHud = (mode, ratio) => {
        if (!this.sideHud) return;
        const pct = Math.round(Math.max(0, Math.min(1, ratio)) * 100);
        this.sideHudFill.style.height = pct + '%';
        this.sideHudVal.textContent = pct + '%';
        // Opposite side of the finger so the HUD stays visible
        this.sideHud.classList.remove('side-left', 'side-right', 'show');
        if (mode === 'bright') {
          this.sideHud.classList.add('side-right'); // swipe left → HUD right
          this.sideHudIcon.classList.add('bright');
          this.sideHudIcon.innerHTML = ICON_BRIGHT;
        } else {
          this.sideHud.classList.add('side-left'); // swipe right → HUD left
          this.sideHudIcon.classList.remove('bright');
          this.sideHudIcon.innerHTML = pct <= 0 ? ICON_MUTE : (pct < 50 ? ICON_VOL : ICON_VOL_HI);
        }
        // Force reflow so the enter transition plays
        void this.sideHud.offsetWidth;
        this.sideHud.classList.add('show');
        clearTimeout(this._sideHudTimer);
        this._sideHudTimer = setTimeout(() => {
          this.sideHud.classList.remove('show');
        }, 850);
      };

      const bindZone = (zone, mode) => {
        if (!zone) return;
        let startY = 0, startVal = 0, active = false, moved = false;

        const onStart = (clientY) => {
          if (this.locked) return false;
          startY = clientY;
          moved = false;
          active = true;
          this._sideDidAdjust = false;
          if (mode === 'bright') {
            startVal = this.brightness;
          } else {
            startVal = this.video.muted ? 0 : (this.video.volume || 0);
          }
          return true;
        };

        const onMove = (clientY, h) => {
          if (!active || this.locked) return;
          const dy = startY - clientY; // up = increase
          if (Math.abs(dy) < 6 && !moved) return;
          moved = true;
          this._sideDidAdjust = true;
          this._sideGesture = mode;
          // Full zone height ≈ full range sweep
          const delta = dy / Math.max(h, 120);

          if (mode === 'bright') {
            // brightness 0.15 – 1.0 (display as 0–100% across that range).
            // 1.0 is the top of the range on purpose — see applyBrightness:
            // max means "no overlay", not a fake brighten-past-normal.
            let next = startVal + delta * 0.85;
            next = Math.max(0.15, Math.min(1, next));
            this.brightness = next;
            this.applyBrightness();
            const ratio = (next - 0.15) / (1 - 0.15);
            showHud('bright', ratio);
            saveSetting('brightness', next);
          } else {
            let next = startVal + delta;
            next = Math.max(0, Math.min(1, next));
            try {
              this.video.muted = next <= 0.001;
              this.video.volume = next;
            } catch (e) {}
            this.updateIcons();
            showHud('vol', next);
          }
        };

        const onEnd = () => {
          active = false;
          this._sideGesture = null;
          // Keep HUD visible briefly (timer already set in showHud)
        };

        zone.addEventListener('touchstart', (e) => {
          if (this.locked || !e.touches[0]) return;
          onStart(e.touches[0].clientY);
        }, { passive: true, capture: true });

        zone.addEventListener('touchmove', (e) => {
          if (!active || this.locked) return;
          if (!e.touches[0]) return;
          const h = this.root.clientHeight || this.video.clientHeight || 320;
          const t = e.touches[0];
          // Only claim the gesture once it's clearly vertical
          const dy = Math.abs(startY - t.clientY);
          if (dy > 8 || moved) {
            e.preventDefault();
            e.stopPropagation();
            onMove(t.clientY, h);
          }
        }, { passive: false, capture: true });

        zone.addEventListener('touchend', (e) => {
          if (this._sideDidAdjust) {
            e.preventDefault();
            e.stopPropagation();
          }
          onEnd();
        }, { passive: false, capture: true });

        zone.addEventListener('touchcancel', () => onEnd(), { passive: true, capture: true });

        // Mouse (desktop): hold + drag
        zone.addEventListener('mousedown', (e) => {
          if (this.locked || e.button !== 0) return;
          onStart(e.clientY);
          const h = this.root.clientHeight || 320;
          const move = (ev) => {
            ev.preventDefault();
            onMove(ev.clientY, h);
          };
          const up = () => {
            window.removeEventListener('mousemove', move, true);
            window.removeEventListener('mouseup', up, true);
            onEnd();
          };
          window.addEventListener('mousemove', move, true);
          window.addEventListener('mouseup', up, true);
        }, true);
      };

      bindZone(this.zoneL, 'bright');
      bindZone(this.zoneR, 'vol');
    }

    // Control bar placement, all from the picture's own height so it scales
    // with any screen or zoom:
    //  - Letterboxed with room under the picture (portrait): the bar sits just
    //    under the picture.
    //  - Picture fills the height (16:9 fullscreen, embedded player): the bar
    //    sits just above the picture's bottom edge, as it always did.
    // Returns the top of the bar, measured up from the bottom of the player (px).
    placePanel(picGap, fh, rootH) {
      if (!this.panel) return rootH * 0.024 + fh * 0.1;
      const panelH = this.panel.offsetHeight || fh * 0.1;
      const belowGap = fh * 0.075;   // gap under the picture (portrait)
      const edgeGap = fh * 0.006;    // gap above the picture edge (fullscreen/embedded)
      let barTop;
      const belowMode = picGap > fh * 0.05 && picGap - belowGap - panelH >= 0;
      if (belowMode) {
        const topFromRootTop = rootH - picGap + belowGap;
        this.panel.style.bottom = 'auto';
        this.panel.style.top = (topFromRootTop / rootH * 100) + '%';
        barTop = picGap - belowGap;
      } else {
        const bottomPx = picGap + edgeGap;
        this.panel.style.top = 'auto';
        this.panel.style.bottom = (bottomPx / rootH * 100) + '%';
        barTop = bottomPx + panelH;
      }
      this._placeSettings(barTop, fh, rootH, belowMode);
      return barTop;
    }

    // Real fullscreen (or a page that fills the whole screen).
    _isFullscreenNow() {
      try {
        if (document.fullscreenElement || document.webkitFullscreenElement) return true;
        return screen.width > 0 && window.innerWidth >= screen.width - 2 && window.innerHeight >= screen.height - 2;
      } catch (e) { return false; }
    }

    // 8.10.109: .lgv-fs = the extended fullscreen bar. Real fullscreen of the player, or a landscape page
    // that fills the whole screen. A windowed or portrait player never gets it.
    syncFsClass() {
      const root = this.root; if (!root) return;
      let fs = false;
      try {
        const fe = document.fullscreenElement || document.webkitFullscreenElement;
        if (fe) fs = fe === root || fe.contains(root) || root.contains(fe);
        else fs = this._isFullscreenNow() && root.clientWidth > root.clientHeight * 1.2;
      } catch (e) {}
      if (fs === root.classList.contains('lgv-fs')) return;
      root.classList.toggle('lgv-fs', fs);
      this._lastPct = null;
      try { this.update(); this.updateSubsGap(root.classList.contains('show')); } catch (e) {}
    }

    // The Settings sheet is sized from the picture, so its shape stays good:
    //  - fullscreen 16:9: taller card (about 3:4)
    //  - portrait / embedded / website view: shorter and compact
    // The size applies even after the sheet was dragged; a dragged sheet keeps
    // its spot but is kept inside the player. Not dragged: it sits just above
    // the control bar (or inside the top of the picture in portrait).
    _placeSettings(barTop, fh, rootH, belowMode) {
      const s = this.settings;
      if (!s || !rootH) return;
      const rootW = this.root.clientWidth || rootH;
      const big = this._isFullscreenNow() && rootW > rootH * 1.2;
      const margin = 8;
      const sz = settingsSheetSize(fh, rootW, rootH, big);
      let h = sz.h;
      const w = sz.w;
      const pinned = !!this._settingsPinned;
      let bottomPx = 0;
      if (!pinned && !belowMode) {
        bottomPx = barTop + fh * 0.012;
        const avail = rootH - bottomPx - margin;
        if (h > avail) h = Math.max(90, avail);
      }
      // Sizes are written in em: the font relative to the player root's own
      // font, width / max-height relative to the sheet's font.
      const baseFs = parseFloat(getComputedStyle(this.root).fontSize) || 16;
      s.style.width = (w / sz.font).toFixed(3) + 'em';
      s.style.height = 'auto';
      s.style.maxHeight = (h / sz.font).toFixed(3) + 'em';
      s.style.fontSize = (sz.font / baseFs).toFixed(4) + 'em';
      if (pinned) {
        const l = parseFloat(s.style.left), t = parseFloat(s.style.top);
        if (isFinite(l) && isFinite(t)) {
          s.style.left = clamp(l, margin, Math.max(margin, rootW - w - margin)) + 'px';
          s.style.top = clamp(t, margin, Math.max(margin, rootH - h - margin)) + 'px';
        }
        return;
      }
      s.classList.add('anchored');
      // Always keep the sheet in the thumb zone above the control bar.
      // Parking it at the top of a tall/letterboxed player made Quality / Audio
      // options feel "out of reach" on phones.
      if (!bottomPx) {
        bottomPx = barTop + fh * 0.012;
        const avail = rootH - bottomPx - margin;
        if (h > avail) {
          h = Math.max(90, avail);
          s.style.maxHeight = (h / sz.font).toFixed(3) + 'em';
        }
      }
      s.style.top = 'auto';
      s.style.bottom = (Math.max(margin, bottomPx) / rootH * 100) + '%';
      s.style.left = '50%';
      s.style.transform = ''; // CSS .anchored.open handles translateX(-50%)
    }

    updateSubsGap(expanded) {
      const h = this.video.clientHeight || 320;
      const panelH = this.panel ? this.panel.offsetHeight : h * 0.1;
      // The control panel occupies this same box even while hidden
      // (opacity 0 doesn't collapse layout), so basing the skip button's
      // *default* clearance off its actual rendered height — rather than a
      // fixed percentage guess — keeps it sitting right above the panel at
      // any screen size, aspect ratio, or font-size scale.
      const panelBottomPct = 0.024; // matches .lgv-panel's CSS bottom
      const margin = Math.max(10, h * 0.02);
      let defaultSkipBottom = h * panelBottomPct + panelH + margin;

      // Subtitle position is entirely the user's call now (base placement
      // plus their drag/pinch/slider offset) — nothing here overrides it
      // to dodge the skip button anymore. It's only clamped to the video's
      // own top/bottom edges so it can't be dragged fully off-screen.
      this.syncPictureFrame();
      const fh = this._frameH || h;
      const rootH = this._rootH || h;
      // Gap from the bottom of the player to the bottom of the picture
      const picGap = rootH - (this._picTopPx + fh);
      // When the control bar is showing, lift the subtitle only if the bar
      // actually overlaps the picture (not when it sits in the black bar).
      const barTop = this.placePanel(picGap, fh, rootH);
      defaultSkipBottom = barTop + margin;
      const overlap = expanded ? Math.max(0, barTop - picGap) : 0;
      let bottomFrame = fh * 0.048 + (expanded ? overlap + fh * 0.02 : 0);
      let pct = (bottomFrame / fh) * 100 + this.subPosRatio * 100;
      pct = Math.max(0, Math.min(pct, 92));
      this.subs.style.bottom = pct + '%';
      // Same position in player pixels, for the skip button logic below
      let bottom = picGap + (pct / 100) * fh;

      // Skip button: sits at its normal spot above the control panel by
      // default. If the subtitle line's vertical span would overlap that
      // spot — because the user's dragged it down that far, or a
      // multi-line cue grew into it — the skip button is the one that
      // moves, up above the subtitle's top edge plus a buffer, rather
      // than the subtitle getting silently pinned above the skip button.
      let skipBottom = defaultSkipBottom;
      if (this.skipBtn?.classList.contains('show')) {
        const skipH = this.skipBtn.offsetHeight || h * 0.09;
        const hasLine = !!this.subsText.textContent;
        const subsH = hasLine ? (this.subs.offsetHeight || h * 0.08) : 0;
        const subsTop = bottom + subsH;
        const overlaps = hasLine && subsTop > defaultSkipBottom && bottom < defaultSkipBottom + skipH;
        if (overlaps) skipBottom = subsTop + margin * 0.6;
      }
      if (this.skipBtn) this.skipBtn.style.bottom = skipBottom + 'px';
      this.avoidSignOverlap();
    }

    // Subtitle touch gestures, scoped entirely to the subtitle text itself:
    //  - The gesture can only ever START on this.subsText, with a finger
    //    already down on it. Since this.subsText is pointer-events:none
    //    whenever there's no cue on screen (toggled in setSubsText), a
    //    touch during a silent gap in the dialogue has no interactive
    //    target to land on and is simply never seen here — it falls
    //    straight through to the video/tap zones underneath, same as
    //    before this feature existed.
    //  - ONE finger drags the subtitle up/down (subPosRatio, same value
    //    the Subtitle Position slider writes). This is the primary,
    //    expected way to reposition it.
    //  - TWO fingers pinch to resize (subSizeRatio, same value the
    //    Subtitle Size slider writes). If a second finger comes down
    //    mid-drag, the gesture switches from 1-finger reposition to
    //    2-finger resize without needing to lift and restart.
    //  - Every phase of both gestures (start/move/end/cancel) calls both
    //    preventDefault() and stopPropagation() at the capture phase. The
    //    stopPropagation is what actually matters here: the global
    //    touchstart/touchmove/touchend listeners that reveal the control
    //    panel (see events() -> showUI) are bound on `document`, and
    //    without stopping propagation up to it, every touch used to
    //    reposition or resize the subtitle also popped the control panel
    //    open underneath it.
    initSubtitleGesture() {
      const MIN_SIZE = 0.022, MAX_SIZE = 0.085;
      const MIN_POS = -0.5, MAX_POS = 0.5;

      let mode = null; // 'drag' | 'pinch' | null
      let startDist = 0, startMidY = 0, startSize = 0, startPos = 0;
      let startY = 0;

      const dist = (t0, t1) => Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const midY = (t0, t1) => (t0.clientY + t1.clientY) / 2;

      const syncSliders = () => {
        if (this._sizeSlider) {
          this._sizeSlider.value = this.subSizeRatio;
          this._applySizeLabel?.();
        }
        if (this._posSlider) {
          this._posSlider.value = this.subPosRatio;
          this._applyPosLabel?.();
        }
      };

      const beginDrag = (touch) => {
        mode = 'drag';
        startY = touch.clientY;
        startPos = this.subPosRatio;
      };

      const beginPinch = (t0, t1) => {
        mode = 'pinch';
        startDist = dist(t0, t1);
        startMidY = midY(t0, t1);
        startSize = this.subSizeRatio;
        startPos = this.subPosRatio;
      };

      const onMove = (e) => {
        if (!mode) return;
        e.preventDefault();
        e.stopPropagation();
        const h = this.video.clientHeight || 320;

        if (mode === 'drag') {
          // A second finger landed mid-drag: switch to pinch instead of
          // fighting over which gesture owns the touch.
          if (e.touches.length >= 2) { beginPinch(e.touches[0], e.touches[1]); }
          else {
            const deltaRatio = (startY - e.touches[0].clientY) / h; // up -> subtitle moves up
            this.subPosRatio = Math.max(MIN_POS, Math.min(MAX_POS, startPos + deltaRatio));
          }
        }

        if (mode === 'pinch') {
          if (e.touches.length < 2) return; // wait for touchend to clean up
          const [t0, t1] = e.touches;
          const newDist = dist(t0, t1);
          if (startDist > 0) {
            const scaleFactor = newDist / startDist;
            this.subSizeRatio = Math.max(MIN_SIZE, Math.min(MAX_SIZE, startSize * scaleFactor));
          }
          const newMidY = midY(t0, t1);
          const deltaRatio = (startMidY - newMidY) / h;
          this.subPosRatio = Math.max(MIN_POS, Math.min(MAX_POS, startPos + deltaRatio));
        }

        this.scaleEverything();
        this.updateSubsGap(this.root.classList.contains('show'));
        syncSliders();
      };

      const end = (e) => {
        if (!mode) return;
        e?.preventDefault();
        e?.stopPropagation();
        // Dropping from 2 fingers to 1 mid-pinch resumes as a drag rather
        // than ending the whole gesture, so lifting one finger after a
        // pinch feels continuous instead of abruptly stopping.
        if (mode === 'pinch' && e && e.touches && e.touches.length === 1) {
          beginDrag(e.touches[0]);
          return;
        }
        mode = null;
        window.removeEventListener('touchmove', onMove, true);
        window.removeEventListener('touchend', end, true);
        window.removeEventListener('touchcancel', end, true);
      };
      // Exposed so destroy() can tear down a gesture that's still in
      // progress when the player is torn down mid-touch.
      this._subGestureEnd = end;

      this.subsText.addEventListener('touchstart', (e) => {
        if (this.locked || !this.subsText.textContent) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.touches.length >= 2) beginPinch(e.touches[0], e.touches[1]);
        else beginDrag(e.touches[0]);
        window.addEventListener('touchmove', onMove, true);
        window.addEventListener('touchend', end, true);
        window.addEventListener('touchcancel', end, true);
      }, { passive: false, capture: true });
    }

    // 8.10.103: reads the average brightness of the picture (tiny 24x14 canvas) a few times a second and
    // lowers --lgv-dim / adds .lgv-bright on bright frames so the glass keeps contrast. If the video is
    // cross-origin and the canvas is blocked, the static default (0.62) still applies.
    initBrightnessAdapt() {
      let cv = null, cx = null, lum = 0.3, blocked = false, last = -1, brightOn = false, zeros = 0;
      const W = 24, H = 14;
      const tick = () => {
        try {
          if (blocked || !this.root || !this.video) return;
          if (this.video.readyState < 2 || this.video.videoWidth < 2) return;
          if (!this.root.classList.contains('show') && !this.settingsOpen) return;   // only while UI is visible
          if (!cv) { cv = document.createElement('canvas'); cv.width = W; cv.height = H; cx = cv.getContext('2d', { willReadFrequently: true }); }
          cx.drawImage(this.video, 0, 0, W, H);
          const d = cx.getImageData(0, 0, W, H).data;
          let sum = 0, n = 0;
          for (let y = 0; y < H; y++) {
            const wgt = y > H * 0.35 ? 1.6 : 1;      // controls sit low and left: weight those rows more
            for (let x = 0; x < W; x++) {
              const i = (y * W + x) * 4;
              const l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
              sum += l * wgt; n += wgt;
            }
          }
          const cur = sum / n;
          // Some browsers hand back a pure black frame instead of the picture. A bright scene reading exactly 0
          // for 2+ seconds is that case: stop adapting and keep the fixed default.
          if (cur < 0.002 && !this.video.paused) { zeros++; } else if (cur >= 0.002) { zeros = 0; }
          if (zeros >= 5) { blocked = true; this.root.style.removeProperty('--lgv-dim'); return; }
          lum = lum + (cur - lum) * 0.5;               // smooth, so it doesn't flicker on cuts
          // 0.35 and below = scene already dark: barely dim; 0.80 and above = white screen: dim hard
          const t = Math.max(0, Math.min(1, (lum - 0.35) / 0.45));
          const dim = +(0.80 - 0.34 * t).toFixed(2);   // 0.80 .. 0.46
          if (Math.abs(dim - last) >= 0.02) {
            last = dim;
            this.root.style.setProperty('--lgv-dim', String(dim));
          }
          const b = lum > 0.55;
          if (b !== brightOn) { brightOn = b; this.root.classList.toggle('lgv-bright', b); }
        } catch (e) { blocked = true; }                // SecurityError: canvas tainted -> keep CSS default
      };
      this._lumTimer = setInterval(tick, 400);
      this.video.addEventListener('seeked', tick);
      this.video.addEventListener('loadeddata', tick);
    }

    subtitleEngine() {
      let lastSuppressScan = 0;
      const update = () => { try { updateCore(); } catch (e) {} };
      const updateCore = () => {
        // Throttled to roughly once/second — this walks a chunk of the
        // whole document each time, so it runs far less often than the
        // 160ms cue-text tick right below it.
        const now = Date.now();
        if (now - lastSuppressScan > 1000) {
          lastSuppressScan = now;
          this.suppressNativeSubtitleLeaks();
        }
        if (!this.subsEnabled || this.currentTrackIndex === -2) {
          this.setSubsText('');
          this._frameSigns = [];
          this.clearSignNow();   // 8.10.92: Off means Off, signs included
          return;
        }
        let text = '';
        let anyCues = false;
        this._frameSigns = [];
        try {
          if (this.video.textTracks && this.video.textTracks.length) {
            const tt = this.video.textTracks;
            // Keep every track's cue cache growing (needed for Delay to work on streams
            // that only expose activeCues). Also force disabled → hidden so the browser
            // actually processes cues.
            for (let i = 0; i < tt.length; i++) {
              const tr = tt[i];
              if (!tr || (tr.kind && tr.kind !== 'subtitles' && tr.kind !== 'captions')) continue;
              try { if (tr.mode === 'disabled') tr.mode = 'hidden'; } catch (e) {}
              harvestCues(tr);
            }
            let handled = false;
            if (this.currentTrackIndex >= 0 && this._pickSet && this._pickSet.size) {
              try { text = this.multiSubsText(tt); handled = true; } catch (e) { text = ''; this._frameSigns = []; }
            }
            if (!handled) {
            // Two tracks when possible: dialogue (bottom) + signs (right).
            let t = this.currentTrackIndex >= 0 ? (tt[this.currentTrackIndex] || null) : null;
            let dlgIdx = this.currentTrackIndex >= 0 ? this.currentTrackIndex : -1;
            if (!t) {
              dlgIdx = pickAutoTrack(this, tt);
              t = dlgIdx >= 0 ? tt[dlgIdx] : null;
            } else {
              // Manual pick is dialogue; still look for a companion signs track
              pickSignsTrack(this, tt, dlgIdx);
            }
            const signsIdx = this._autoSignsIndex;
            const signsTrack = (signsIdx != null && signsIdx >= 0 && signsIdx !== dlgIdx)
              ? tt[signsIdx] : null;
            for (let i = 0; i < tt.length; i++) {
              const tr = tt[i];
              if (!tr || (tr.kind && tr.kind !== 'subtitles' && tr.kind !== 'captions')) continue;
              try {
                if (tr === t || tr === signsTrack) {
                  if (tr.mode === 'disabled') tr.mode = 'hidden';
                } else if (tr.mode === 'showing') {
                  tr.mode = 'hidden';
                }
              } catch (e) {}
            }
            // Dialogue track → bottom (and signs only if no companion track)
            if (t) {
              const asDlg = trackRoleOf(this, t, dlgIdx) === 'dialogue';
              // 8.10.126: no separate signs track -> every line of the track stays on the bottom strip (nothing is split off as a sign).
              text = cueLinesAt(t, this.video.currentTime - (this.subDelay || 0), null, asDlg || !signsTrack);
            }
            // Dedicated signs companion → right-centre
            if (signsTrack) {
              const forcedSigns = trackRoleOf(this, signsTrack, signsIdx) === 'signs';
              const nowT = this.video.currentTime - (this.subDelay || 0);
              const live = cuesLiveAt(signsTrack, nowT);
              live.forEach(c => {
                const st = cleanCueText(c.text);
                if (!st) return;
                // The track was already judged a signs track; still never
                // show a spoken line, a long block, or a copy of what the
                // dialogue track is showing at the bottom right now.
                if (st.length > (forcedSigns ? 240 : 120)) return;
                if (text && text.indexOf(st) !== -1) return;
                if (forcedSigns || signLinesOf(st) || !looksLikeSpeech(st)) {
                  this._frameSigns.push({ key: String(c.startTime) + '|' + st, text: st });
                }
              });
            }
            }
            for (let i = 0; i < tt.length; i++) {
              const tr = tt[i];
              if (!tr || (tr.kind && tr.kind !== 'subtitles' && tr.kind !== 'captions')) continue;
              if ((tr.cues && tr.cues.length) || (_cueCache.get(tr) && _cueCache.get(tr).size)) { anyCues = true; break; }
            }
          }
          // DOM fallback has no timestamps — it cannot honour Delay. Only use it
          // when we have no track cues at all.
          if (!text && !anyCues) {
            const sels = [
              '.vjs-text-track-display .vjs-text-track-cue',
              '.vjs-text-track-display',
              '.ytp-caption-window-container .ytp-caption-segment',
              '.ytp-caption-window-container',
              '.plyr__captions .plyr__caption',
              '.jw-text-track-container .jw-text-track-cue',
              '.shaka-text-container',
              '.dplayer-subtitle',
              '.art-subtitle',
              '.vds-captions',
              '.hls-subtitle',
              '[class*="subtitle-cue"]',
              '[class*="caption-window"]'
            ];
            for (const sel of sels) {
              const el = document.querySelector(sel);
              if (el) {
                const t = (el.innerText || el.textContent || '').trim();
                if (t.length > 1) { text = t; break; }
              }
            }
            // Last-resort fallback: any small overlay element whose class/id
            // names it as a subtitle/caption layer, positioned over the video,
            // with plausible cue-length text (guards against grabbing unrelated UI).
            if (!text) {
              const guesses = document.querySelectorAll('[class*="subtitle" i], [class*="caption" i]');
              for (const el of guesses) {
                if (this.root.contains(el)) continue;
                // A closed subtitle-track picker on the site (its "Off / Auto /
                // eng-2 / English (AI) ..." option list) matches these same
                // class names and sits in the DOM even while collapsed. Using
                // innerText (which respects display/visibility) and refusing
                // to fall back to textContent when it comes back empty is
                // what keeps a hidden menu from ever being read as a caption
                // line — that fallback was the actual cause of the garbled
                // "SettingsOffAIeng-2eng-3English..." text.
                if (!isVisible(el)) continue;
                if (el.querySelector('button, a, [role="button"], [role="menuitem"], [role="option"], input, select, li')) continue;
                const t = (el.innerText || '').trim();
                if (t.length > 1 && t.length < 220 && el.children.length <= 3) { text = t; break; }
              }
            }
          }
        } catch (e) {}
        // Belt-and-suspenders: never show a raw HLS discontinuity/ID3-style
        // metadata payload as if it were a subtitle line, no matter which
        // path above produced it. Narrow on purpose so it can't ever eat a
        // real line of dialogue that happens to use curly braces (e.g. a
        // "{sighs}" sound-effect cue).
        if (text && /"metadataType"\s*:\s*"discontinuity"|"discontinuitySequence"/i.test(text)) text = '';
        // Hold the last line for a quarter second across a tiny gap between
        // cues, so a line doesn't flash off and back on.
        if (this.settingsOpen && now - (this._listChk || 0) > 1200) {
          this._listChk = now;
          try { if (this._subListKey() !== this._listKey) this.refreshSubtitleTracks(); } catch (e) {}
        }
        this.updateSignDisplay(this._frameSigns || []);
        const nowMs = Date.now();
        if (text) {
          this._subLastText = text;
          this._subLastAt = nowMs;
        } else if (this._subLastText && nowMs - this._subLastAt < 250) {
          text = this._subLastText;
        }
        if (text !== this.lastSub) {
          this.lastSub = text;
          this.setSubsText(text);
          // A cue that wraps onto more lines than the last one can grow
          // tall enough to newly reach the skip button even with the
          // subtitle's own bottom position unchanged — re-run the overlap
          // check now rather than waiting for the next drag/resize.
          this.updateSubsGap(this.root.classList.contains('show'));
        }
      };
      this._subTimer = setInterval(update, 160);
      this.video.addEventListener('timeupdate', update);
      try {
        const tl = this.video.textTracks;
        if (tl && tl.addEventListener) {
          let pending = 0;
          const onTracks = () => {
            clearTimeout(pending);
            pending = setTimeout(() => { try { this.refreshSubtitleTracks(); update(); } catch (e) {} }, 200);
          };
          tl.addEventListener('addtrack', onTracks);
          tl.addEventListener('removetrack', onTracks);
        }
      } catch (e) {}

      const resync = () => {
        this.scaleEverything();
        this.updateSubsGap(this.root.classList.contains('show'));
      };
      if (window.ResizeObserver) {
        this._ro = new ResizeObserver(resync);
        this._ro.observe(this.video);
      }
      window.addEventListener('orientationchange', resync);
      document.addEventListener('fullscreenchange', resync);
      const fsSync = () => { try { this.syncFsClass(); } catch (e) {} };
      document.addEventListener('fullscreenchange', fsSync);
      document.addEventListener('webkitfullscreenchange', fsSync);
      window.addEventListener('resize', fsSync);
      window.addEventListener('orientationchange', fsSync);
      // Fullscreen: show the whole picture (contain) instead of a cover-crop
      // that zooms it sideways. Restored when leaving fullscreen.
      const fitFullscreen = () => {
        const v = this.video;
        if (!v) return;
        if (document.fullscreenElement) {
          if (v.dataset.lgvFitSaved == null) v.dataset.lgvFitSaved = v.style.objectFit || '';
          if (getComputedStyle(v).objectFit === 'cover') v.style.objectFit = 'contain';
        } else if (v.dataset.lgvFitSaved != null) {
          v.style.objectFit = v.dataset.lgvFitSaved;
          delete v.dataset.lgvFitSaved;
        }
      };
      document.addEventListener('fullscreenchange', fitFullscreen);
      // Fullscreen shows a landscape video as 16:9 (landscape) instead of a
      // letterboxed strip in a portrait screen. Rotation is released on exit.
      const orientFullscreen = () => {
        try {
          const o = screen.orientation;
          if (!o || typeof o.lock !== 'function') return;
          const inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
          if (inFs) {
            const v = this.video;
            if (v && v.videoWidth >= v.videoHeight) {
              this._lgvOrientLocked = true;
              const p = o.lock('landscape');
              if (p && p.catch) p.catch(() => {});
            }
          } else if (this._lgvOrientLocked) {
            this._lgvOrientLocked = false;
            o.unlock();
          }
        } catch (e) {}
      };
      document.addEventListener('fullscreenchange', orientFullscreen);
      document.addEventListener('webkitfullscreenchange', orientFullscreen);
    }

    // 8.10.111: the unbroken buffered run that contains the playhead, as [start, end] in seconds, or null
    // when the playhead is outside every buffered range. The number in Settings and the grey on the seek bar
    // both come from this, so they can never disagree.
    bufferRun() {
      const v = this.video;
      const b = v.buffered;
      const t = v.currentTime || 0;
      const EPS = 0.1;       // a playhead this close to a range's start still plays from it
      for (let k = 0; k < b.length; k++) {
        const a = b.start(k), e = isFinite(v.duration) ? Math.min(b.end(k), v.duration) : b.end(k);
        if (t >= a - EPS && t <= e) return [a, e];
      }
      return null;
    }
    bufferedAheadSeconds() {
      const run = this.bufferRun();
      return run ? Math.max(0, run[1] - (this.video.currentTime || 0)) : 0;
    }

    updateBufferInfo() {
      const meta = this.settings.querySelector('#lgv-meta');
      if (!meta) return;
      const v = this.video;
      // 8.10.110: only the unbroken run of buffered video that starts at the playhead. The old code used the
      // end of the LAST buffered range, which after a seek can be a far-away island (380 s) while the
      // playhead's own range is tiny, so the number was false. Anything not contiguous with the playhead
      // (a gap, however small) does not count. Rounded down, never up.
      let ahead = '—';
      try {
        ahead = formatBufAhead(this.bufferedAheadSeconds());
      } catch (e) {}
      const res = (v.videoWidth && v.videoHeight) ? `${v.videoWidth}×${v.videoHeight}` : '—';
      const dur = isFinite(v.duration) ? formatTime(v.duration) : '—';
      const size = this.fetchFileSize();
      let bitrate = '—';
      let quality = '—';
      try {
        const hls = this._findHlsInstance();
        if (hls && Array.isArray(hls.levels) && hls.levels.length) {
          const idx = hls.currentLevel >= 0 ? hls.currentLevel : hls.loadLevel;
          const lvl = (idx >= 0 && hls.levels[idx]) ? hls.levels[idx] : null;
          if (lvl) {
            quality = lvl.height ? (lvl.height + 'p') : (lvl.name || 'Level ' + idx);
            if (lvl.bitrate) bitrate = Math.round(lvl.bitrate / 1000) + ' kbps';
          } else if (hls.autoLevelEnabled || hls.currentLevel === -1) {
            quality = 'Auto';
            // Show active level if available
            const al = hls.levels[hls.currentLevel] || hls.levels[hls.loadLevel];
            if (al?.height) quality = 'Auto → ' + al.height + 'p';
            if (al?.bitrate) bitrate = Math.round(al.bitrate / 1000) + ' kbps';
          }
        }
      } catch (e) {}
      meta.innerHTML =
        `Resolution: <b>${res}</b><br>` +
        `Quality: <b>${quality}</b><br>` +
        `Bitrate: <b>${bitrate}</b><br>` +
        `File size: <b>${size}</b><br>` +
        `Buffered ahead: <b>${ahead}</b><br>` +
        `Intro / Outro: <b>${this._skipInfo || '—'}</b><br>` +
        `Duration: <b>${dur}</b>`;
    }

    // v8.7.1 fix: this used to check currentSrc for blob: and bail out to
    // '—' immediately, full stop. But currentSrc IS blob: on basically
    // every HLS/DASH site, because that's just how MSE works (hls.js/
    // dash.js/shaka all hand the <video> a blob: MediaSource handle, never
    // the real manifest URL) - so this was permanently stuck at '—' for
    // almost everyone, not just an edge case. It only ever worked for a
    // site serving a plain progressive file URL directly.
    // Now, when currentSrc is blob:, it first tries to recover the real
    // manifest URL (same Resource Timing trick already used for subtitle
    // discovery elsewhere in this file) before giving up.
    fetchFileSize() {
      // 1) Best: bitrate × duration from the live player (hls.js levels)
      const fromPlayer = this.estimateSizeFromPlayer();
      if (fromPlayer) return fromPlayer;

      // 2) Progressive file URL (not blob)
      const rawSrc = this.video.currentSrc || this.video.src;
      const src = (rawSrc && !rawSrc.startsWith('blob:')) ? rawSrc : this.resolveManifestUrl();
      if (!src) {
        const partial = this.estimateSegmentedSize();
        return partial || '—';
      }
      if (/\.m3u8(\?|$)/i.test(src) || /\.mpd(\?|$)/i.test(src)) {
        // Kick off async manifest parse once; return best available now
        this._parseManifestForSize(src);
        if (this._fileSizeText) return this._fileSizeText;
        const partial = this.estimateSegmentedSize();
        return partial || (this._fileSizeLoading ? 'Checking…' : '—');
      }

      if (this._fileSizeSrc === src) {
        if (this._fileSizeLoading) return 'Checking…';
        return this._fileSizeText || '—';
      }

      this._fileSizeSrc = src;
      this._fileSizeText = null;
      this._fileSizeLoading = true;
      fetch(src, { method: 'HEAD', credentials: 'include' })
        .then(res => {
          const len = parseInt(res.headers.get('content-length') || '0', 10);
          this._fileSizeText = len ? formatBytes(len) : 'Unknown';
        })
        .catch(() => { this._fileSizeText = 'Unknown'; })
        .finally(() => { this._fileSizeLoading = false; });

      return 'Checking…';
    }

    // bitrate (bits/s) × duration (s) / 8 → approximate total bytes for the
    // currently selected (or highest) quality. This is what "the real player
    // knows" without needing Timing-Allow-Origin on segment responses.
    estimateSizeFromPlayer() {
      try {
        const hls = this._findHlsInstance();
        const dur = this.video.duration;
        if (!hls || !Array.isArray(hls.levels) || !hls.levels.length) return null;
        if (!isFinite(dur) || dur <= 0) return null;
        let lvl = null;
        if (hls.currentLevel >= 0 && hls.levels[hls.currentLevel]) {
          lvl = hls.levels[hls.currentLevel];
        } else {
          // Auto: use highest level for a ceiling estimate
          lvl = hls.levels.reduce((best, L) => {
            const b = L.bitrate || 0;
            return (!best || b > (best.bitrate || 0)) ? L : best;
          }, null);
        }
        const br = lvl && (lvl.bitrate || lvl.bandwidth);
        if (!br || br <= 0) return null;
        const bytes = (br / 8) * dur;
        if (!isFinite(bytes) || bytes < 1024) return null;
        const approx = formatBytes(bytes);
        // Mark as estimate so it's honest
        return '~' + approx;
      } catch (e) {
        return null;
      }
    }

    resolveManifestUrl() {
      try {
        // Prefer URL the hls instance is actually playing
        const hls = this._findHlsInstance();
        if (hls) {
          if (typeof hls.url === 'string' && /\.m3u8/i.test(hls.url)) return hls.url;
          if (typeof hls.loadLevel !== 'undefined' && hls.levels?.[hls.currentLevel]?.url) {
            const u = hls.levels[hls.currentLevel].url;
            if (typeof u === 'string') return u;
            if (Array.isArray(u) && u[0]) return u[0];
          }
        }
      } catch (e) {}
      try {
        const entries = performance.getEntriesByType('resource');
        for (let i = entries.length - 1; i >= 0; i--) {
          const name = entries[i].name;
          if (/\.m3u8(\?|$)/i.test(name) || /\.mpd(\?|$)/i.test(name)) return name;
        }
      } catch (e) {}
      return null;
    }

    // Fetch the master/media playlist and sum EXTINF durations × bandwidth,
    // or read BANDWIDTH from EXT-X-STREAM-INF and multiply by video duration.
    _parseManifestForSize(url) {
      if (!url || this._manifestSizeTried === url) return;
      this._manifestSizeTried = url;
      this._fileSizeLoading = true;
      fetch(url, { credentials: 'include' })
        .then(r => r.ok ? r.text() : Promise.reject())
        .then(text => {
          if (!text) return;
          const dur = this.video.duration;
          // Master playlist: pick highest BANDWIDTH
          const bws = [];
          const re = /BANDWIDTH=(\d+)/gi;
          let m;
          while ((m = re.exec(text))) bws.push(parseInt(m[1], 10));
          if (bws.length && isFinite(dur) && dur > 0) {
            const maxBw = Math.max(...bws);
            const bytes = (maxBw / 8) * dur;
            if (bytes > 1024) {
              this._fileSizeText = '~' + formatBytes(bytes);
              this._fileSizeLoading = false;
              return;
            }
          }
          // Media playlist: sum #EXTINF durations, use average bitrate if present
          let totalDur = 0;
          const extinf = /#EXTINF:([\d.]+)/gi;
          while ((m = extinf.exec(text))) totalDur += parseFloat(m[1]) || 0;
          if (totalDur > 0 && bws.length) {
            const bytes = (Math.max(...bws) / 8) * totalDur;
            if (bytes > 1024) {
              this._fileSizeText = '~' + formatBytes(bytes);
              this._fileSizeLoading = false;
              return;
            }
          }
          // Last: downloaded segments so far
          const partial = this.estimateSegmentedSize();
          this._fileSizeText = partial || 'Segmented stream';
        })
        .catch(() => {
          this._fileSizeText = this.estimateSegmentedSize() || 'Unknown';
        })
        .finally(() => { this._fileSizeLoading = false; });
    }

    estimateSegmentedSize() {
      try {
        const entries = performance.getEntriesByType('resource');
        let bytes = 0;
        for (const e of entries) {
          if (/\.(ts|m4s|mp4|aac|m4a|webm|cmfv|cmfa)(\?|$)/i.test(e.name)) {
            const n = e.transferSize || e.encodedBodySize || e.decodedBodySize || 0;
            if (n) bytes += n;
          }
        }
        if (bytes > 0) return formatBytes(bytes) + ' so far';
      } catch (e) {}
      return null;
    }

    // ---------------- 8.10.108: intro / outro marks on the seek bar ----------------
    // Sources, best first: the site's own data (network / JSON.parse), chapter or metadata tracks,
    // the site's own coloured bar segment, and ranges learned when the site's Skip button showed up.
    collectSkipSegs(dur) {
      const pool = [].concat(netSkipSegs(dur), this._chapSegs || [], this._domSegs || [], this._learnedSegs || []);
      const out = [];
      pool.forEach(s => {
        if (!(s.end > s.start) || s.end > dur + 2 || s.end - s.start < 3) return;
        const dup = out.some(o => o.kind === s.kind && Math.min(o.end, s.end) - Math.max(o.start, s.start) > 0.5 * Math.min(o.end - o.start, s.end - s.start));
        if (!dup) out.push(s);
      });
      return out;
    }

    // 8.10.109: a different episode loaded into the same page -> forget what was latched for the old one.
    skipEpisodeCheck(dur) {
      const L = this._skipLatch = this._skipLatch || { intro: null, outro: null, dur: 0 };
      if (L.dur && isFinite(dur) && Math.abs(dur - L.dur) > 5) {
        L.intro = L.outro = null;
        this._domSegs = []; this._chapSegs = []; this._skipKey = null;
      }
      if (isFinite(dur)) L.dur = dur;
    }

    // 8.10.109: an intro / outro is latched for the episode the first time it is found, so it never
    // blinks off when a source goes quiet (the site hides its own bar, a request is forgotten ...).
    // Ranking: site data > chapter track > the site's own bar > the Skip-button range. A better source
    // may replace a worse one. Site data and chapters keep their first answer for the episode (a prefetch of
    // the next episode must not move it); the site bar and the Skip-button range are re-measured, so they
    // may update themselves.
    latchSkipSegs(fresh) {
      const RANK = { net: 4, chapter: 3, dom: 2, button: 1 };
      const L = this._skipLatch = this._skipLatch || { intro: null, outro: null, dur: 0 };
      ['intro', 'outro'].forEach(kind => {
        const mine = fresh.filter(s => s.kind === kind);
        if (!mine.length) return;
        const top = Math.max.apply(null, mine.map(s => RANK[s.src] || 0));
        const cur = L[kind];
        if (cur && (cur.rank > top || (cur.rank === top && top >= 3))) return;
        L[kind] = { rank: top, segs: mine.filter(s => (RANK[s.src] || 0) === top) };
      });
      return [].concat(L.intro ? L.intro.segs : [], L.outro ? L.outro.segs : []);
    }

    renderSkipMarks() {
      const base = this.skipMark; if (!base) return;
      const bar = base.parentElement; if (!bar) return;
      if (base.classList.contains('show')) base.classList.remove('show');
      const dur = this.video.duration;
      if (!isFinite(dur) || dur <= 20) return;       // length not known yet: leave the marks as they are
      let segs = [];
      try {
        this.skipEpisodeCheck(dur);
        segs = this.latchSkipSegs(this.collectSkipSegs(dur));
      } catch (e) {}
      const key = segs.map(s => s.kind + s.start.toFixed(1) + '-' + s.end.toFixed(1) + s.src).join('|') + '/' + Math.round(dur);
      if (key === this._skipKey) return;
      this._skipKey = key;
      const SRC = { net: 'site data', chapter: 'chapter', dom: 'site bar', button: 'skip button' };
      this._skipInfo = segs.length
        ? segs.map(s => (s.kind === 'intro' ? 'Intro ' : 'Outro ') + formatTime(s.start) + '–' + formatTime(s.end) + ' (' + (SRC[s.src] || s.src) + ')').join(', ')
        : 'none found';
      this._skipEls = this._skipEls || [];
      while (this._skipEls.length < segs.length) {
        const el = document.createElement('div');
        el.className = 'lgv-skip-mark lgv-skip-seg';
        bar.insertBefore(el, base.nextSibling);
        this._skipEls.push(el);
      }
      this._skipEls.forEach((el, i) => {
        const s = segs[i];
        if (!s) { el.classList.remove('show'); return; }
        el.style.left = (s.start / dur * 100).toFixed(3) + '%';
        el.style.width = ((s.end - s.start) / dur * 100).toFixed(3) + '%';
        el.dataset.kind = s.kind;
        el.classList.add('show');
      });
    }

    // 8.10.109: buffered ranges on the seek bar (light grey-white, under the played fill).
    renderBuffer() {
      const base = this.skipMark; if (!base) return;
      const bar = base.parentElement; if (!bar) return;
      const v = this.video, dur = v.duration;
      // 8.10.111: only the run that starts at the playhead is drawn. Older buffered islands left behind by
      // seeking around are not shown (they are not what plays next).
      const ranges = [];
      if (isFinite(dur) && dur > 0) {
        try {
          const run = this.bufferRun();
          if (run && run[1] > run[0]) ranges.push(run);
        } catch (e) {}
      }
      const key = ranges.map(r => Math.round(r[0] / dur * 2000) + '-' + Math.round(r[1] / dur * 2000)).join('|');
      if (key === this._bufKey) return;
      this._bufKey = key;
      this._bufEls = this._bufEls || [];
      while (this._bufEls.length < ranges.length) {
        const el = document.createElement('div');
        el.className = 'lgv-buf';
        bar.insertBefore(el, bar.firstChild);
        this._bufEls.push(el);
      }
      this._bufEls.forEach((el, i) => {
        const r = ranges[i];
        if (!r) { el.style.display = 'none'; return; }
        el.style.display = '';
        el.style.left = (r[0] / dur * 100).toFixed(3) + '%';
        el.style.width = ((r[1] - r[0]) / dur * 100).toFixed(3) + '%';
      });
    }

    // Reads the site's own coloured intro/outro segment off its seek bar (yellow / amber / orange).
    stealNativeSkipMark() {
      try {
        const now = Date.now();
        if (now - (this._domScanAt || 0) < 2000) return;
        this._domScanAt = now;
        const dur = this.video.duration;
        if (!isFinite(dur) || dur <= 20) { this._domSegs = []; return; }
        let scope = this.video.parentElement;
        for (let i = 0; i < 6 && scope?.parentElement && scope !== document.body; i++) scope = scope.parentElement;
        if (!scope) return;
        const isYellow = (c) => {
          const m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/.exec(c || '');
          if (!m) return false;
          const r = +m[1], g = +m[2], b = +m[3], a = m[4] == null ? 1 : parseFloat(m[4]);
          return a > 0.3 && r >= 190 && g >= 120 && b <= 130 && r - b >= 90 && Math.abs(r - g) <= 120;
        };
        const found = [];
        const seen = new Set();
        const walk = (rootNode, depth) => {
          if (!rootNode || depth > 3) return;
          const els = rootNode.querySelectorAll('div, span, i, b, li, svg rect');
          let n = 0;
          for (const el of els) {
            if (++n > 2500) break;
            if (this.root.contains(el)) continue;
            if (el.shadowRoot) walk(el.shadowRoot, depth + 1);
            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 1 || r.height > 26) continue;
            const st = getComputedStyle(el);
            if (st.display === 'none' || st.visibility === 'hidden' || st.opacity === '0') continue;
            const yellow = isYellow(st.backgroundColor) || isYellow(st.backgroundImage) || isYellow(st.fill);
            const named = /skip|marker|segment|chapter|interval|intro|outro/i.test(String(el.className && el.className.baseVal != null ? el.className.baseVal : el.className));
            if (!yellow && !(named && st.backgroundColor && st.backgroundColor !== 'rgba(0, 0, 0, 0)')) continue;
            let bar = el.parentElement, bw = bar ? bar.getBoundingClientRect().width : 0;
            if (bw < 150 && bar) { bar = bar.parentElement; bw = bar ? bar.getBoundingClientRect().width : 0; }
            if (!bar || bw < 150) continue;
            const pr = bar.getBoundingClientRect();
            if (pr.height > 40) continue;
            const left = (r.left - pr.left) / bw, w = r.width / bw;
            if (w < 0.008 || w > 0.6 || left < -0.01 || left > 1) continue;
            const key = Math.round(left * 500) + ':' + Math.round(w * 500);
            if (seen.has(key)) continue;
            seen.add(key);
            const s = Math.max(0, left) * dur, e = Math.min(1, left + w) * dur;
            found.push({ kind: s < dur * 0.4 ? 'intro' : 'outro', start: s, end: e, src: 'dom' });
            if (found.length >= 4) return;
          }
        };
        walk(scope, 0);
        if (found.length) this._domSegs = found;   // 8.10.109: keep the last good reading when the site's bar is hidden
      } catch (e) {}
    }

    // Chapter / metadata tracks named Intro, Opening, Outro, Ending ... (cue text or JSON).
    scanChapterTracks() {
      const now = Date.now();
      if (now - (this._chapAt || 0) < 3000) return;
      this._chapAt = now;
      const out = [];
      try {
        const tt = this.video.textTracks;
        for (let i = 0; i < (tt ? tt.length : 0); i++) {
          const tr = tt[i];
          if (!tr || (tr.kind !== 'chapters' && tr.kind !== 'metadata')) continue;
          if (tr.mode === 'disabled') { try { tr.mode = 'hidden'; } catch (e) {} }
          const cues = tr.cues ? Array.from(tr.cues) : [];
          cues.forEach(c => {
            const t = String(c.text || '');
            const kind = skipKindOf(t) || skipKindOf(tr.label);
            if (kind && c.endTime > c.startTime && isFinite(c.endTime)) out.push({ kind, start: c.startTime, end: c.endTime, src: 'chapter' });
          });
        }
      } catch (e) {}
      this._chapSegs = out;
    }

    // The site shows its own Skip button during an intro/outro; remember that time range for this episode.
    learnSkip(a, b, label, partialStart) {
      const dur = this.video.duration;
      if (!isFinite(dur) || dur < 60 || !(b > a) || b - a < 8 || b - a > 400) return;
      const kind = skipKindOf(label) || (a < dur * 0.4 ? 'intro' : 'outro');
      const all = this._learnedSegs || [];
      const prev = all.find(s => s.kind === kind && Math.min(s.end, b) - Math.max(s.start, a) > 0);
      // 8.10.109: a start seen right after a seek (you jumped into the middle of the intro) is too late.
      // Keep the earliest clean start across viewings.
      let start = a, partial = !!partialStart;
      if (prev) {
        if (partialStart) { start = Math.min(prev.start, a); partial = !!prev.partial; }
        else { start = prev.partial ? a : Math.min(prev.start, a); partial = false; }
      }
      const seg = { kind, start, end: b, src: 'button', partial };
      this._learnedSegs = all.filter(s => !(s.kind === kind && Math.min(s.end, b) - Math.max(s.start, a) > 0));
      this._learnedSegs.push(seg);
      try { localStorage.setItem('lgv_skipsegs:' + location.pathname + location.search, JSON.stringify(this._learnedSegs)); } catch (e) {}
      this._skipKey = null;
    }
    loadLearnedSkips() {
      try {
        const raw = localStorage.getItem('lgv_skipsegs:' + location.pathname + location.search);
        this._learnedSegs = raw ? JSON.parse(raw).filter(s => s && s.end > s.start) : [];
      } catch (e) { this._learnedSegs = []; }
      this._skipKey = null;
    }

    initSkipRelay() {
      this._skipTarget = null;
      const poll = () => {
        try {
          const found = this.findNativeSkip();
          // 8.10.108: remember when the site's Skip button is up, to draw the intro/outro on the seek bar
          try {
            const vt = this.video.currentTime, wall = Date.now();
            if (this._pollVt != null) {
              const dvp = vt - this._pollVt, dwp = (wall - this._pollWall) / 1000;
              const rate = this.video.paused ? 0 : (this.video.playbackRate || 1);
              if (Math.abs(dvp - dwp * rate) > 2.5) this._lastJumpWall = wall;
            }
            this._pollVt = vt; this._pollWall = wall;
            if (found && !this._skipSeen) {
              this._skipSeen = true; this._skipSeenAt = vt; this._skipSeenWall = wall;
              this._skipSeenPartial = (wall - (this._lastJumpWall || 0)) < 1500;
              this._skipSeenLabel = (found.innerText || found.textContent || '').trim();
            } else if (!found && this._skipSeen) {
              this._skipSeen = false;
              const dv = vt - this._skipSeenAt, dw = (wall - this._skipSeenWall) / 1000;
              const natural = Math.abs(dv - dw * (this.video.playbackRate || 1)) < 4;
              const jumped = dv - dw > 8 && (wall - (this._skipClickAt || 0)) < 3000;   // only a real Skip press gives the end
              if (dv > 0 && (natural || jumped)) this.learnSkip(this._skipSeenAt, vt, this._skipSeenLabel, this._skipSeenPartial);
            }
          } catch (e) {}
          if (found) {
            this._skipTarget = found;
            found.style.setProperty('opacity', '0', 'important');
            found.style.setProperty('pointer-events', 'none', 'important');
            let label = (found.innerText || found.textContent || '').trim().replace(/\s+/g, ' ');
            if (!label || label.length > 20) label = 'Skip';
            this.skipBtn.textContent = label;
            this.skipBtn.classList.add('show');
          } else {
            this._skipTarget = null;
            this.skipBtn.classList.remove('show');
          }
          this.updateSubsGap(this.root.classList.contains('show'));
        } catch (e) {}
      };
      this.loadLearnedSkips();
      this._skipHref = location.href;
      this._skipTimer = setInterval(() => { if (location.href !== this._skipHref) { this._skipHref = location.href; this.loadLearnedSkips(); this._skipSeen = false; } poll(); }, 400);
      poll();

      this.skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.locked) return;
        this._skipClickAt = Date.now();
        if (this._skipTarget && document.contains(this._skipTarget)) {
          try { this._skipTarget.click(); } catch (err) {}
        }
        this.skipBtn.classList.remove('show');
        this.updateSubsGap(this.root.classList.contains('show'));
        this.show();
      });
    }

    findNativeSkip() {
      let scope = this.video.parentElement;
      for (let i = 0; i < 5 && scope?.parentElement && scope !== document.body; i++) {
        scope = scope.parentElement;
      }
      if (!scope) return null;
      const candidates = scope.querySelectorAll('[class*="skip" i], [id*="skip" i], button, [role="button"]');
      for (const el of candidates) {
        if (this.root.contains(el) || el === this.skipBtn) continue;
        const text = (el.innerText || el.textContent || '').trim();
        const cls = (el.className || '') + ' ' + (el.id || '');
        if (!/skip/i.test(cls) && !/^skip\b/i.test(text) && !/\bskip\s*(intro|opening|op|ed|outro|recap)?\b/i.test(text)) continue;
        if (text.length > 28) continue;
        const st = getComputedStyle(el);
        if (st.display === 'none' || st.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) continue;
        return el;
      }
      return null;
    }

    // Audio boost fully removed. Volume = native video.volume only (0–100%).
    initAudioBoost() {}
    applyAudioBoost() {}
    paintBoostSlider() {}
    syncAudioBoostUI() {}
    _setGainNow() {}
    _ensureAudioCtxRunning() {}
    _tryCaptureStreamSource() { return null; }

    events() {
      const v = this.video;
      const root = this.root;

      const showUI = () => {
        if (this.locked) this.showUnlock();
        else this.show();
      };
      ['touchstart', 'touchend', 'mousemove', 'click'].forEach(ev => {
        document.addEventListener(ev, showUI, { passive: true });
        v.addEventListener(ev, showUI, { passive: true });
      });



      // Pause-intent guard (see pauseIntentKey/savePauseIntent/readPauseIntent
      // above). Registered with capture so it runs before the other 'play'
      // listener below gets a chance to treat this as a legitimate resume.
      v.addEventListener('play', () => {
        const intent = readPauseIntent();
        if (intent === true && Date.now() < this._pauseGuardDeadline && !this._explicitPlayAction) {
          v.pause();
          return;
        }
        this._pauseGuardDeadline = 0; // a real play happened; stop second-guessing future ones this page-life
        this._explicitPlayAction = false;
        savePauseIntent(false);
      }, true);
      v.addEventListener('pause', () => { savePauseIntent(true); }, true);

      root.querySelectorAll('.lgv-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          if (this.locked && btn.dataset.act !== 'lock') return;
          const act = btn.dataset.act;

          if (act === 'play') {
            if (v.paused) { this._explicitPlayAction = true; v.play().catch(() => {}); }
            else v.pause();
          }
          if (act === 'rew') { v.currentTime = Math.max(0, v.currentTime - CONFIG.seek); this.seekToast('left', CONFIG.seek); }
          if (act === 'ff') { v.currentTime = Math.min(v.duration || 99999, v.currentTime + CONFIG.seek); this.seekToast('right', CONFIG.seek); }
          if (act === 'mute') v.muted = !v.muted;
          if (act === 'cc') {
            this.subsEnabled = !this.subsEnabled;
            // Not setting cc-on directly here — refreshSubtitleTracks()
            // (called below) is the single source of truth for it and will
            // only light it up if there's actually a track available.
            if (!this.subsEnabled) {
              this.lastSub = '';
              this.setSubsText('');
              this.currentTrackIndex = -2;
            } else {
              this.currentTrackIndex = -1;
            }
            this.refreshSubtitleTracks();
          }
          if (act === 'settings') {
            if (this.settingsOpen) this.closeSettings();
            else this.openSettings();
          }
          if (act === 'full') {
            const el = v.parentElement || v;
            if (!document.fullscreenElement) {
              (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
            } else {
              (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
            }
          }
          if (act === 'lock') {
            this.setLocked(true);
            return;
          }
          this.updateIcons();
          setTimeout(() => this.updateIcons(), 40);
          this.show();
        }, true);
      });

      // Unlock chip — a direct tap unlocks immediately. Holding down
      // anywhere else on the locked video (handled by initHoldUnlock)
      // still needs the full 3s with the loading ring.
      this.unlockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.locked) return;
        this._cancelHoldUnlock?.();
        this.setLocked(false);
      }, true);
      this.unlockBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.locked) return;
        this._cancelHoldUnlock?.();
        this.setLocked(false);
      }, { passive: false, capture: true });

      this.dur.addEventListener('click', e => {
        e.stopPropagation();
        this.showRemaining = !this.showRemaining;
        this.update();
        this.show();
      }, true);

      // Scrubber
      const getPercent = (clientX) => {
        const rect = this.timeline.getBoundingClientRect();
        if (rect.width <= 0) return 0;
        return clamp((clientX - rect.left) / rect.width, 0, 1);
      };
      const seekTo = (clientX) => {
        if (!isFinite(v.duration) || v.duration <= 0) return;
        v.currentTime = getPercent(clientX) * v.duration;
        this.update();
        this.showDot();
      };
      const beginScrub = (clientX) => {
        if (this.locked) return;
        this.scrubbing = true;
        root.classList.add('scrubbing');
        this.showDot();
        seekTo(clientX);
        this.show();
      };
      const HAS_POINTER = !!window.PointerEvent;
      const endScrub = () => {
        if (!this.scrubbing) return;
        this.scrubbing = false;
        root.classList.remove('scrubbing');
        window.removeEventListener('pointermove', this._dragMove, true);
        window.removeEventListener('pointerup', this._dragEnd, true);
        window.removeEventListener('pointercancel', this._dragEnd, true);
        window.removeEventListener('touchmove', this._touchMove, true);
        window.removeEventListener('touchend', this._touchEnd, true);
        window.removeEventListener('touchcancel', this._touchEnd, true);
        window.removeEventListener('mousemove', this._mouseMove, true);
        window.removeEventListener('mouseup', this._mouseEnd, true);
        this.scheduleDotHide();
        if (!v.paused) this.startLoop();
      };

      this._dragMove = (e) => { if (this.scrubbing) { e.preventDefault(); seekTo(e.clientX); } };
      this._dragEnd = () => endScrub();
      this._touchMove = (e) => {
        if (!this.scrubbing) return;
        e.preventDefault();
        seekTo(e.touches[0].clientX);
      };
      this._touchEnd = () => endScrub();
      this._mouseMove = (e) => { if (this.scrubbing) seekTo(e.clientX); };
      this._mouseEnd = () => endScrub();

      if (HAS_POINTER) {
        this.timeline.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          try { this.timeline.setPointerCapture?.(e.pointerId); } catch (_) {}
          beginScrub(e.clientX);
          window.addEventListener('pointermove', this._dragMove, true);
          window.addEventListener('pointerup', this._dragEnd, true);
          window.addEventListener('pointercancel', this._dragEnd, true);
        }, true);
      } else {
        this.timeline.addEventListener('touchstart', (e) => {
          e.preventDefault();
          e.stopPropagation();
          beginScrub(e.touches[0].clientX);
          window.addEventListener('touchmove', this._touchMove, true);
          window.addEventListener('touchend', this._touchEnd, true);
          window.addEventListener('touchcancel', this._touchEnd, true);
        }, { passive: false, capture: true });
        this.timeline.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          beginScrub(e.clientX);
          window.addEventListener('mousemove', this._mouseMove, true);
          window.addEventListener('mouseup', this._mouseEnd, true);
        }, true);
      }

      // Separate last-tap clocks per zone. A shared clock meant a single
      // tap on the left zone quickly followed by a single tap on the
      // right zone (two ordinary, separate taps) was misread as one
      // "double tap" and fired an unwanted seek — this keeps each zone's
      // double-tap detection scoped to itself.
      let lastTapL = 0, lastTapR = 0;
      const handleTap = (dir) => {
        if (this.locked) return;
        // A long-press that already switched to 2x is not a tap
        if (this._holdFired) return;
        // Don't seek if this touch was a brightness/volume vertical drag
        if (this._sideDidAdjust) {
          this._sideDidAdjust = false;
          return;
        }
        const now = Date.now();
        if (dir === 'left') {
          if (now - lastTapL < 300) {
            v.currentTime = Math.max(0, Math.min(v.duration || 99999, v.currentTime - CONFIG.seek));
            this.seekToast('left', CONFIG.seek);
            this.show();
            lastTapL = 0;
          } else {
            lastTapL = now;
          }
        } else {
          if (now - lastTapR < 300) {
            v.currentTime = Math.max(0, Math.min(v.duration || 99999, v.currentTime + CONFIG.seek));
            this.seekToast('right', CONFIG.seek);
            this.show();
            lastTapR = 0;
          } else {
            lastTapR = now;
          }
        }
      };
      this.zoneL.addEventListener('touchend', e => { e.preventDefault(); handleTap('left'); }, { passive: false, capture: true });
      this.zoneR.addEventListener('touchend', e => { e.preventDefault(); handleTap('right'); }, { passive: false, capture: true });

      // Middle zone: now requires a DOUBLE tap to toggle play/pause,
      // matching zoneL/zoneR's double-tap-to-seek — a single tap in the
      // middle (e.g. a stray touch while reaching for a seek zone) no
      // longer pauses playback. Uses the same 300ms window as handleTap
      // above. Both touchend and click are bound (touch devices vs.
      // mouse); the click handler ignores any click landing just after a
      // touchend so a touch device's synthetic click for that same
      // physical tap isn't miscounted as a second, separate tap.
      let lastCenterTap = 0;
      let lastCenterTouchAt = 0;
      const registerCenterTap = () => {
        if (this.locked || this._holdFired) return;
        const now = Date.now();
        if (now - lastCenterTap < 300) {
          lastCenterTap = 0;
          if (v.paused) { this._explicitPlayAction = true; v.play().catch(() => {}); }
          else v.pause();
          this.updateIcons();
          this.show();
        } else {
          lastCenterTap = now;
        }
      };
      this.zoneC.addEventListener('touchend', e => {
        e.preventDefault();
        e.stopPropagation();
        lastCenterTouchAt = Date.now();
        registerCenterTap();
      }, { passive: false, capture: true });
      this.zoneC.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        if (Date.now() - lastCenterTouchAt < 500) return;
        registerCenterTap();
      }, true);

      v.addEventListener('play', () => { this.updateIcons(); this.startLoop(); });
      v.addEventListener('playing', () => this.updateIcons());
      v.addEventListener('pause', () => { this.updateIcons(); this.stopLoop(); });
      v.addEventListener('volumechange', () => this.updateIcons());
      v.addEventListener('timeupdate', () => { if (!this.scrubbing && !this._raf) this.update(); });
      v.addEventListener('loadedmetadata', () => this.update());
      ['progress', 'seeking', 'seeked', 'timeupdate', 'loadedmetadata', 'durationchange', 'canplay', 'emptied'].forEach(ev => {
        v.addEventListener(ev, () => { try { this.renderBuffer(); } catch (e) {} });
      });
      ['seeked', 'seeking'].forEach(ev => {
        v.addEventListener(ev, () => { try { if (this.settingsOpen) this.updateBufferInfo(); } catch (e) {} });
      });

      if (!v.paused) this.startLoop();
    }

    updateIcons() {
      if (this.playBtn) {
        this.playBtn.innerHTML = this.video.paused
          ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      }
      if (this.muteBtn) {
        const muted = this.video.muted || this.video.volume === 0;
        this.muteBtn.innerHTML = muted
          ? '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
      }
    }

    update() {
      const v = this.video;
      if (!isFinite(v.duration) || v.duration <= 0) return;
      const pct = clamp((v.currentTime / v.duration) * 100, 0, 100);
      // Always apply on first paint (_lastPct null) so the dot is not stuck left
      if (this._lastPct == null || Math.abs(pct - this._lastPct) > 0.05) {
        this._lastPct = pct;
        this.fill.style.width = pct + '%';
        this.thumb.style.left = pct + '%';
      }
      this.cur.textContent = formatTime(v.currentTime);
      this.dur.textContent = this.showRemaining
        ? '-' + formatTime(v.duration - v.currentTime)
        : formatTime(v.duration);
    }

    show() {
      const was = this.root.classList.contains('show');
      this.root.classList.add('show');
      try { this.update(); } catch (e) {}
      if (!was) this.updateSubsGap(true);
      clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => {
        if (!this.scrubbing && !this.settingsOpen) {
          this.root.classList.remove('show');
          this.updateSubsGap(false);
        }
      }, CONFIG.hideDelay);
    }

    showDot() {
      this.thumb.classList.remove('lgv-dot-hidden');
      clearTimeout(this.dotHideTimer);
      this.scheduleDotHide();
    }
    scheduleDotHide() {
      clearTimeout(this.dotHideTimer);
      this.dotHideTimer = setTimeout(() => {
        if (!this.scrubbing) this.thumb.classList.add('lgv-dot-hidden');
      }, 4000);
    }

    startLoop() {
      if (this._raf) return;
      const loop = () => {
        if (this.video.paused || this.scrubbing) {
          this._raf = null;
          return;
        }
        this.update();
        this._raf = requestAnimationFrame(loop);
      };
      this._raf = requestAnimationFrame(loop);
    }
    stopLoop() {
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      this.update();
    }

    destroy() {
      this._subGestureEnd?.();
      clearInterval(this._subTimer);
      clearInterval(this._lumTimer);
      clearInterval(this._syncTimer);
      clearInterval(this._skipTimer);
      clearInterval(this._trackTimer);
      clearTimeout(this.hideTimer);
      clearTimeout(this.dotHideTimer);
      clearTimeout(this._unlockHideTimer);
      clearTimeout(this._sideHudTimer);
      this._cancelHoldUnlock?.();
      this.stopLoop();
      this._ro?.disconnect();
      try { this.video.style.filter = ''; } catch (e) {}
      try { if (this.root) this.root.style.filter = ''; } catch (e) {}
      try {
        if (this.brightOverlay) {
          this.brightOverlay.style.display = 'none';
          this.brightOverlay.style.opacity = '0';
        }
      } catch (e) {}
      this.root?.remove();
      delete this.video.dataset.lgv;
      players.delete(this);
    }
  }

  // ---- Season bulk queue (anichi-style /ep-N and data-num lists) ----
  // localStorage is shared across parent page + video iframe (sessionStorage is NOT)
  const LGV_QUEUE_KEY = 'lgv-season-queue-v2';
  // 8.10.147: the player iframe (/stream/…) is usually CROSS-ORIGIN, so it has its own localStorage and
  // cannot touch the top page. The top page owns the queue; frames talk to it with postMessage.
  const LGV_IS_TOP = (function () { try { return window === window.top; } catch (e) { return false; } })();
  const LGV_BRIDGE = { ok: false, q: null, ep: 0, hooks: [] };
  const LGV_PANEL = { f: 0, status: '', finished: null, forceOpen: false, render: null, _pt: 0 };
  function lgvPostTop(msg) {
    try { window.parent.postMessage(Object.assign({ lgv: 'q147' }, msg), '*'); } catch (e) {}
  }
  function lgvPostDown(msg) {
    try {
      document.querySelectorAll('iframe').forEach(f => { try { f.contentWindow.postMessage(msg, '*'); } catch (e) {} });
    } catch (e) {}
  }
  function lgvBroadcastQueue() {
    if (!LGV_IS_TOP) return;
    let q = null;
    try { q = JSON.parse(localStorage.getItem(LGV_QUEUE_KEY) || 'null'); } catch (e) {}
    lgvPostDown({ lgv: 'q147', t: 'queue', q: q, ep: lgvCurrentEpNum() });
  }
  const LGV_DBG_KEY = 'lgv-season-dbg-v1';
  const LGV_DBG = [];
  function lgvDbg(msg) {
    const line = '[' + new Date().toISOString().slice(11, 19) + '] ' + msg;
    LGV_DBG.push(line);
    if (LGV_DBG.length > 100) LGV_DBG.shift();
    try { console.log('%c[LGV-Q] ' + msg, 'color:#7dd3fc'); } catch (e) {}
    try { localStorage.setItem(LGV_DBG_KEY, LGV_DBG.join('\n')); } catch (e) {}
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) lgvPostTop({ t: 'dbg', msg: msg });
    try {
      const text = LGV_DBG.join('\n');
      const docs = [document];
      try { docs.push(lgvTopDoc()); } catch (e) {}
      docs.forEach(doc => {
        try {
          doc.querySelectorAll('#lgv-season-dbg').forEach(el => {
            if (el.tagName === 'TEXTAREA') el.value = text;
            else el.textContent = text;
            el.scrollTop = el.scrollHeight;
          });
          doc.querySelectorAll('#lgv-season-status').forEach(el => {
            // keep status for queue progress lines only when they look like status updates
          });
        } catch (e) {}
      });
    } catch (e) {}
  }
  function lgvQueueGet() {
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) return LGV_BRIDGE.q;
    try { return JSON.parse(localStorage.getItem(LGV_QUEUE_KEY) || 'null'); } catch (e) { return null; }
  }
  function lgvQueueSet(q) {
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) {
      LGV_BRIDGE.q = q || null;
      lgvPostTop({ t: 'set', q: q || null });
      return;
    }
    try {
      if (!q) localStorage.removeItem(LGV_QUEUE_KEY);
      else localStorage.setItem(LGV_QUEUE_KEY, JSON.stringify(q));
    } catch (e) {}
    lgvBroadcastQueue();
  }
  function lgvGoto(url) {
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) { lgvPostTop({ t: 'goto', url: url }); return; }
    try { lgvTopLoc().href = url; } catch (e) { location.href = url; }
  }
  function lgvQueueStatus(text) {
    text = String(text || '');
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) { lgvPostTop({ t: 'status', text: text }); return; }
    LGV_PANEL.status = text;
    try { if (LGV_PANEL.render) LGV_PANEL.render(); } catch (e) {}
  }
  function lgvQueueProgress(f) {
    f = Math.max(0, Math.min(1, +f || 0));
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) {
      const n = Date.now();
      if (f < 1 && n - LGV_PANEL._pt < 300) return;
      LGV_PANEL._pt = n;
      lgvPostTop({ t: 'progress', f: f });
      return;
    }
    LGV_PANEL.f = f;
    try { if (LGV_PANEL.render) LGV_PANEL.render(); } catch (e) {}
  }
  // Video often runs in iframe (/stream/s-2/...) while the show page is top (/watch/.../ep-N)
  function lgvTop() {
    try { if (window.top && window.top.document) return window.top; } catch (e) {}
    try { if (window.parent && window.parent !== window && window.parent.document) return window.parent; } catch (e) {}
    return window;
  }
  function lgvTopLoc() {
    try { return lgvTop().location; } catch (e) { return location; }
  }
  function lgvTopDoc() {
    try { return lgvTop().document; } catch (e) { return document; }
  }
  function lgvWatchBase() {
    const fromPath = (path, origin) => {
      const m = (path || '').match(/^(\/watch\/[^/]+)/);
      return m ? (origin + m[1]) : '';
    };
    try {
      const loc = lgvTopLoc();
      const b = fromPath(loc.pathname, loc.origin);
      if (b) return b;
    } catch (e) {}
    {
      const b = fromPath(location.pathname, location.origin);
      if (b) return b;
    }
    const docs = [document];
    try { docs.push(lgvTopDoc()); } catch (e) {}
    for (const doc of docs) {
      try {
        const a = doc.querySelector('a[href*="/watch/"]');
        if (!a) continue;
        const u = new URL(a.getAttribute('href'), (doc.defaultView && doc.defaultView.location.href) || location.href);
        const b = fromPath(u.pathname, u.origin);
        if (b) return b;
      } catch (e) {}
    }
    // Embed iframe often has referrer = parent watch URL
    try {
      if (document.referrer) {
        const u = new URL(document.referrer);
        const b = fromPath(u.pathname, u.origin);
        if (b) return b;
      }
    } catch (e) {}
    return '';
  }
  function lgvCurrentEpNum() {
    if (!LGV_IS_TOP && LGV_BRIDGE.ok && LGV_BRIDGE.ep) return LGV_BRIDGE.ep;
    const paths = [];
    try { paths.push(lgvTopLoc().pathname); } catch (e) {}
    paths.push(location.pathname);
    for (const path of paths) {
      const m = (path || '').match(/\/ep-(\d+)/i);
      if (m) return parseInt(m[1], 10);
    }
    const docs = [document];
    try { docs.push(lgvTopDoc()); } catch (e) {}
    for (const doc of docs) {
      try {
        const active = doc.querySelector('a[data-num].active, a.active[data-num], .episodes a.active, li.active a[data-num]');
        if (active) {
          const n = parseInt(active.getAttribute('data-num') || active.getAttribute('data-slug'), 10);
          if (n) return n;
        }
      } catch (e) {}
    }
    try {
      const sp = new URLSearchParams(lgvTopLoc().search || '');
      const n = parseInt(sp.get('ep') || sp.get('episode') || '0', 10);
      if (n > 0) return n;
    } catch (e) {}
    try {
      if (document.referrer) {
        const m = new URL(document.referrer).pathname.match(/\/ep-(\d+)/i);
        if (m) return parseInt(m[1], 10);
      }
    } catch (e) {}
    return 0;
  }
  function lgvAnimeId() {
    // anichi embeds numeric ids in data attrs and API URLs
    const candidates = [];
    document.querySelectorAll('[data-id], [data-anime-id], [data-mal], [data-film-id]').forEach(el => {
      const v = el.getAttribute('data-id') || el.getAttribute('data-anime-id') || el.getAttribute('data-film-id');
      const n = parseInt(v, 10);
      // episode ids are large; anime ids used in /ajax/episode/list/{id} are smaller (e.g. 5799)
      if (n > 0 && n < 1000000) candidates.push(n);
    });
    const html = document.documentElement ? document.documentElement.innerHTML : '';
    const re = /\/(?:ajax\/episode\/list|anime\/getinfo|api\/seasons)\/(\d+)/g;
    let m;
    while ((m = re.exec(html))) candidates.push(parseInt(m[1], 10));
    // also scan performance/resource entries if any scripts referenced it
    try {
      performance.getEntriesByType('resource').forEach(e => {
        const mm = (e.name || '').match(/\/(?:ajax\/episode\/list|anime\/getinfo|api\/seasons)\/(\d+)/);
        if (mm) candidates.push(parseInt(mm[1], 10));
      });
    } catch (e) {}
    // prefer the most common id
    const counts = new Map();
    candidates.forEach(n => counts.set(n, (counts.get(n) || 0) + 1));
    let best = 0, bestC = 0;
    counts.forEach((c, n) => { if (c > bestC || (c === bestC && n < best)) { best = n; bestC = c; } });
    return best || 0;
  }
  function lgvPageEpTotal() {
    const texts = [];
    try { if (document.body) texts.push(document.body.innerText); } catch (e) {}
    try { const b = lgvTopDoc().body; if (b) texts.push(b.innerText); } catch (e) {}
    const patterns = [
      /\b(\d{1,4})\s*eps?\b/i,
      /episodes?\s*[:=]\s*(\d{1,4})\b/i,
      /\b(\d{1,4})\s*episodes?\b/i
    ];
    for (const body of texts) {
      for (const re of patterns) {
        const m = body.match(re);
        if (m) {
          const n = parseInt(m[1], 10);
          if (n > 0 && n < 2000) return n;
        }
      }
    }
    return 0;
  }
  function lgvDiscoverEpisodes() {
    const map = new Map();
    const base = lgvWatchBase();
    let originHref = location.href;
    try { originHref = lgvTopLoc().href; } catch (e) {}
    const add = (num, url, title) => {
      num = parseInt(num, 10);
      if (!(num > 0) || num > 5000 || map.has(num)) return;
      let href = url || '';
      if (!href || href === '#' || /javascript:/i.test(href) || href.endsWith('#')) {
        if (!base) return;
        href = base + '/ep-' + num;
      } else {
        try { href = new URL(href, originHref).href; } catch (e) { return; }
        if (!/\/ep-\d+/i.test(href) && base) href = base + '/ep-' + num;
      }
      map.set(num, { num, url: href, title: (title || ('Episode ' + num)).trim() });
    };

    const docs = [document];
    try {
      const td = lgvTopDoc();
      if (td && td !== document) docs.push(td);
    } catch (e) {}

    for (const doc of docs) {
      try {
        doc.querySelectorAll('a[data-num], a[data-slug], li[data-num] a, .episodes a, .ep-range a').forEach(a => {
          const num = a.getAttribute('data-num') || a.getAttribute('data-slug') ||
            (a.textContent || '').trim().match(/^(\d{1,4})$/)?.[1];
          if (!num) return;
          const title = a.getAttribute('title') || a.querySelector('.d-title, .ep-title, span')?.textContent || '';
          add(num, a.getAttribute('href'), title);
        });
        doc.querySelectorAll('a[href*="/ep-"]').forEach(a => {
          const m = (a.getAttribute('href') || '').match(/\/ep-(\d+)/i);
          if (m) add(m[1], a.href, a.textContent);
        });
        if (base) {
          doc.querySelectorAll('.episodes button, .episodes a, [class*="ep-range"] a, [class*="ep-list"] a, [class*="episode"] button').forEach(el => {
            const t = (el.textContent || '').trim();
            if (/^\d{1,4}$/.test(t)) add(t, base + '/ep-' + t, 'Episode ' + t);
          });
        }
      } catch (e) {}
    }

    const stated = lgvPageEpTotal();
    if (base && stated > 0) {
      if (map.size > 0 && map.size < stated) {
        for (let i = 1; i <= stated; i++) {
          if (!map.has(i)) add(i, base + '/ep-' + i, 'Episode ' + i);
        }
      }
      if (!map.size) {
        for (let i = 1; i <= stated; i++) add(i, base + '/ep-' + i, 'Episode ' + i);
      }
    }

    return Array.from(map.values()).sort((a, b) => a.num - b.num);
  }
  // Async: pull the full episode list from anichi's API when DOM is incomplete
  async function lgvDiscoverEpisodesFull() {
    let eps = lgvDiscoverEpisodes();
    const base = lgvWatchBase();
    const stated = lgvPageEpTotal();
    if (eps.length && (!stated || eps.length >= stated)) return eps;

    const id = lgvAnimeId();
    if (!id || !base) return eps;

    try {
      const url = location.origin + '/ajax/episode/list/' + id + '?style=&vrf=' + id;
      const r = await fetch(url, {
        credentials: 'include',
        headers: { 'Accept': 'application/json, text/javascript, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest' }
      });
      const j = await r.json();
      const html = (j && (j.result || j.html || j.data)) || '';
      if (typeof html !== 'string' || !html) return eps;

      const map = new Map(eps.map(e => [e.num, e]));
      const add = (num, title) => {
        num = parseInt(num, 10);
        if (!(num > 0) || map.has(num)) return;
        map.set(num, { num, url: base + '/ep-' + num, title: (title || ('Episode ' + num)).trim() });
      };
      // Parse data-num / data-slug from API HTML
      const re = /data-num=["']?(\d+)["']?[^>]*(?:title=["']([^"']*)["'])?/gi;
      let m;
      while ((m = re.exec(html))) add(m[1], m[2] || '');
      // Also <b>1</b> style
      const re2 = /data-num=["']?(\d+)["']?[\s\S]{0,200}?<b>\s*(\d+)\s*<\/b>/gi;
      while ((m = re2.exec(html))) add(m[1], '');
      // Titles
      const re3 = /data-num=["']?(\d+)["']?[\s\S]{0,400}?class=["']d-title["'][^>]*>([^<]+)/gi;
      while ((m = re3.exec(html))) {
        const n = parseInt(m[1], 10);
        if (map.has(n) && m[2]) map.get(n).title = m[2].trim();
      }
      eps = Array.from(map.values()).sort((a, b) => a.num - b.num);
    } catch (e) {}
    return eps;
  }
  function lgvSeriesName() {
    // Pull the show title from the page thoroughly (not a fixed string)
    const tryText = (el) => {
      if (!el) return '';
      let t = (el.getAttribute('content') || el.textContent || '').replace(/\s+/g, ' ').trim();
      t = t.replace(/\s*\|.*$/, '')
        .replace(/\s*[–—-]\s*Episode\s*\d+.*$/i, '')
        .replace(/\s*Episode\s*\d+.*$/i, '')
        .replace(/\s*Ep\.?\s*\d+.*$/i, '')
        .replace(/^Watch\s+/i, '')
        .replace(/\s+Anime Online.*$/i, '')
        .replace(/\s*\|\s*Anichi.*$/i, '')
        .trim();
      return t;
    };
    const sels = [
      'h1.film-name', 'h2.film-name', '.film-name.dynamic-name', '.film-name',
      '.anime-title', '.heading-name', '.anisc-detail h2', '.anisc-detail h1',
      '.watch-main h2', '.watch-main h1', 'h1.heading-name', 'h2.heading-name',
      'meta[property="og:title"]', 'meta[name="title"]', 'h1', 'h2'
    ];
    for (const s of sels) {
      const el = document.querySelector(s);
      const t = tryText(el);
      if (t && t.length > 1 && !/^(home|filter|schedule|menu)$/i.test(t)) return t;
    }
    let t = tryText({ textContent: document.title });
    return t || 'Anime';
  }
  function lgvShowTitle() {
    return dlSafeName(lgvSeriesName()) || 'Episode';
  }
  function lgvQueueFileName(epNum, series) {
    const name = dlSafeName(series || lgvSeriesName()) || 'Anime';
    const ep = String(epNum).padStart(2, '0');
    return name + ' - [' + ep + '] - VOIDXZORO';
  }
  // ======================= 8.10.148: Season download panel (top page only) =======================
  function lgvStartQueue(eps, selectedNums) {
    const ordered = eps.filter(e => selectedNums.has(e.num));
    if (!ordered.length) { lgvDbg('startQueue: nothing selected'); return false; }
    const q = {
      items: ordered, index: 0, fmt: 'ts', wantSubs: true,
      baseName: lgvSeriesName(), failed: [], max: 0, startedAt: Date.now()
    };
    LGV_PANEL.f = 0; LGV_PANEL.finished = null;
    lgvQueueSet(q);
    const first = ordered[0];
    const cur = lgvCurrentEpNum();
    lgvDbg('startQueue: ' + ordered.length + ' eps, first=ep' + first.num + ' cur=' + cur + ' series=' + q.baseName);
    if (cur === first.num && (document.querySelector('video') || document.querySelector('iframe'))) {
      lgvDbg('startQueue: already on ep' + first.num + ' — telling the player frame');
      lgvBroadcastQueue();
      return true;
    }
    lgvGoto(first.url);
    return true;
  }
  function lgvQueueAdvance(failed) {
    if (!LGV_IS_TOP && LGV_BRIDGE.ok) { lgvDbg('advance → asking top page'); lgvPostTop({ t: 'advance', failed: !!failed }); return; }
    const q = lgvQueueGet();
    if (!q || !q.items || !q.items.length) return;
    const cur = q.items[q.index || 0];
    if (failed && cur) q.failed = (q.failed || []).concat(cur.num);
    q.index = (q.index || 0) + 1;
    LGV_PANEL.f = 0;
    if (q.index >= q.items.length) {
      lgvDbg('queue DONE ' + q.items.length + ' eps, failed=' + (q.failed || []).join(','));
      LGV_PANEL.finished = { nums: q.items.map(x => x.num), failed: q.failed || [] };
      LGV_PANEL.status = '';
      LGV_PANEL.forceOpen = true;
      lgvQueueSet(null);
      try { if (LGV_PANEL.render) LGV_PANEL.render(); } catch (e) {}
      return;
    }
    lgvQueueSet(q);
    LGV_PANEL.status = 'Opening episode ' + q.items[q.index].num + '…';
    try { if (LGV_PANEL.render) LGV_PANEL.render(); } catch (e) {}
    lgvDbg('advance → ep' + q.items[q.index].num + ' (' + (q.index + 1) + '/' + q.items.length + ')');
    lgvGoto(q.items[q.index].url);
  }

  const LGV_PANEL_CSS = `
    [hidden] { display: none !important; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    button { font: inherit; color: inherit; cursor: pointer; border: 0; background: none; }
    .wrap {
      position: fixed; right: 10px; bottom: calc(84px + env(safe-area-inset-bottom, 0px)); z-index: 2147483646;
      font: 14px/1.35 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #fff;
    }
    .pill {
      position: relative; overflow: hidden; display: flex; align-items: center; gap: 8px;
      height: 40px; padding: 0 16px 0 12px; border-radius: 99px;
      border: 1px solid rgba(255,255,255,.16); background: rgba(14,18,26,.9);
      backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4);
      box-shadow: 0 6px 24px rgba(0,0,0,.4); font-weight: 700; font-size: 13px;
      font-variant-numeric: tabular-nums;
    }
    .pill .ln { position: absolute; left: 0; bottom: 0; height: 3px; width: 0; background: #1ccee6; transition: width .3s; }
    .sheet {
      width: min(calc(100vw - 20px), 380px); padding: 14px; border-radius: 22px;
      border: 1px solid rgba(255,255,255,.14); background: rgba(14,18,26,.94);
      backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4);
      box-shadow: 0 18px 50px rgba(0,0,0,.55);
    }
    .hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .ttl { font-weight: 800; font-size: 15px; }
    .x { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,.08); display: grid; place-items: center; }
    .big { display: flex; align-items: baseline; gap: 10px; }
    .pct { font-size: 36px; font-weight: 800; letter-spacing: -.02em; font-variant-numeric: tabular-nums; line-height: 1; }
    .sub { font-size: 13px; opacity: .8; }
    .bar { height: 8px; border-radius: 99px; background: rgba(255,255,255,.12); overflow: hidden; margin: 10px 0 8px; }
    .fill { height: 100%; width: 0; border-radius: 99px; background: linear-gradient(90deg, #1ccee6, #5eead4); transition: width .3s; }
    .st { font-size: 12px; opacity: .75; min-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .row { display: flex; align-items: center; gap: 6px; }
    .sp { flex: 1; }
    .chip { height: 30px; min-width: 30px; padding: 0 12px; border-radius: 99px; font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.07); }
    .grid { position: relative; display: grid; grid-template-columns: repeat(auto-fill, minmax(42px, 1fr)); gap: 6px; max-height: 132px; overflow-y: auto; margin: 10px 0; padding: 2px; }
    .ep { height: 36px; border-radius: 10px; font-size: 13px; font-weight: 700; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.06); }
    .ep:disabled { opacity: 1; cursor: default; }
    .ep.on { border-color: #1ccee6; background: rgba(28,206,230,.22); }
    .ep.done { border-color: rgba(74,222,128,.6); background: rgba(74,222,128,.16); }
    .ep.fail { border-color: rgba(248,113,113,.75); background: rgba(248,113,113,.16); }
    .ep.cur { border-color: #1ccee6; background: rgba(28,206,230,.2); box-shadow: 0 0 0 2px rgba(28,206,230,.55); }
    .btn { width: 100%; height: 46px; border-radius: 99px; font-weight: 800; font-size: 15px; }
    .btn:disabled { opacity: .45; }
    .go { background: linear-gradient(180deg, #3de0f5, #1ccee6); color: #04262d; }
    .stop { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); }
    .log { margin-top: 8px; font-size: 11px; opacity: .5; text-decoration: underline; }
  `;
  const LGV_PANEL_HTML = `
    <div class="wrap">
      <button class="pill" id="pill" type="button" aria-label="Season download">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>
        <span id="pillt">Season</span><i class="ln" id="pilln"></i>
      </button>
      <section class="sheet" id="sheet" hidden>
        <div class="hd">
          <span class="ttl" id="ttl">Season download</span>
          <button class="x" id="min" type="button" aria-label="Minimize"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>
        </div>
        <div id="prog" hidden>
          <div class="big"><span class="pct" id="pct">0%</span><span class="sub" id="sub"></span></div>
          <div class="bar" id="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="fill" id="fill"></div></div>
          <div class="st" id="st" aria-live="polite"></div>
        </div>
        <div class="row" id="tools">
          <span class="sub" id="found"></span><span class="sp"></span>
          <button class="chip" id="all" type="button">All</button>
          <button class="chip" id="none" type="button">None</button>
          <button class="chip" id="rescan" type="button" aria-label="Rescan episodes">&#8635;</button>
        </div>
        <div class="grid" id="grid"></div>
        <button class="btn go" id="act" type="button">Download</button>
        <button class="log" id="log" type="button">Copy log</button>
      </section>
    </div>
  `;
  function lgvMountSeasonFloat() {
    if (!LGV_IS_TOP) return;
    if (document.getElementById('lgv-season-host')) return;
    if (!/anichi\.|\/watch\/|\/anime\//i.test(location.href) && lgvDiscoverEpisodes().length < 2) return;
    const parent = document.documentElement;
    if (!parent) return;

    const host = document.createElement('div');
    host.id = 'lgv-season-host';
    host.style.cssText = 'all:initial';
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' + LGV_PANEL_CSS + '</style>' + LGV_PANEL_HTML;
    const $ = (id) => root.getElementById(id);

    let eps = [], selected = new Set(), touched = false, scans = 0, gridKey = '';
    let open = false;
    try { open = localStorage.getItem('lgv-sheet-open') === '1'; } catch (e) {}
    const setOpen = (v) => { open = !!v; try { localStorage.setItem('lgv-sheet-open', open ? '1' : '0'); } catch (e) {} };
    const applySel = () => {
      if (!touched) selected = new Set(eps.map(e => e.num));
      else selected = new Set(Array.from(selected).filter(n => eps.some(e => e.num === n)));
    };

    const render = () => {
      const q = lgvQueueGet();
      const fin = LGV_PANEL.finished;
      const mode = (q && q.items && q.items.length) ? 'run' : (fin ? 'done' : 'idle');
      if (LGV_PANEL.forceOpen) { LGV_PANEL.forceOpen = false; setOpen(true); }

      let pct = 0, sub = '', epNo = 0, nums = [], failed = [], idx = 0;
      if (mode === 'run') {
        const n = q.items.length;
        idx = Math.min(q.index || 0, n - 1);
        const mx = Math.max(q.max || 0, (idx + LGV_PANEL.f) / n); // never goes backwards
        if (mx > (q.max || 0) + 0.002) { q.max = mx; try { localStorage.setItem(LGV_QUEUE_KEY, JSON.stringify(q)); } catch (e) {} }
        pct = Math.min(100, Math.floor(mx * 100));
        epNo = q.items[idx].num;
        sub = 'Episode ' + epNo + ' · ' + (idx + 1) + ' of ' + n;
        nums = q.items.map(x => x.num);
        failed = q.failed || [];
      } else if (mode === 'done') {
        pct = 100; nums = fin.nums; failed = fin.failed; idx = nums.length;
        sub = (nums.length - failed.length) + ' of ' + nums.length + ' saved';
      }

      $('pill').hidden = open;
      $('sheet').hidden = !open;
      $('pillt').textContent = mode === 'run' ? ('Ep ' + epNo + ' · ' + pct + '%') : mode === 'done' ? 'Done ✓' : 'Season';
      $('pilln').style.width = (mode === 'idle' ? 0 : pct) + '%';
      $('ttl').textContent = mode === 'run' ? 'Downloading season' : mode === 'done' ? 'Season finished' : 'Season download';

      $('prog').hidden = mode === 'idle';
      $('tools').hidden = mode !== 'idle';
      if (mode !== 'idle') {
        $('pct').textContent = pct + '%';
        $('sub').textContent = sub;
        $('fill').style.width = pct + '%';
        $('bar').setAttribute('aria-valuenow', String(pct));
        $('st').textContent = mode === 'run' ? (LGV_PANEL.status || '') : (failed.length ? 'Failed: ep ' + failed.join(', ') : 'All saved to Downloads');
      } else {
        $('found').textContent = eps.length ? (eps.length + ' episode' + (eps.length === 1 ? '' : 's') + ' found') : (scans < 6 ? 'Looking for episodes…' : 'No episodes found');
      }

      const key = mode + '|' + (mode === 'idle'
        ? eps.map(e => e.num).join(',') + '|' + Array.from(selected).sort((x, y) => x - y).join(',')
        : nums.join(',') + '|' + idx + '|' + failed.join(','));
      if (key !== gridKey) {
        gridKey = key;
        const grid = $('grid');
        grid.innerHTML = '';
        const list = mode === 'idle' ? eps.map(e => e.num) : nums;
        list.forEach((num, i) => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'ep'; b.textContent = String(num);
          if (mode === 'idle') {
            if (selected.has(num)) b.classList.add('on');
            b.addEventListener('click', () => {
              touched = true;
              if (selected.has(num)) selected.delete(num); else selected.add(num);
              render();
            });
          } else {
            b.disabled = true;
            if (failed.indexOf(num) >= 0) b.classList.add('fail');
            else if (i < idx) b.classList.add('done');
            else if (mode === 'run' && i === idx) b.classList.add('cur');
          }
          grid.appendChild(b);
        });
        grid.hidden = !list.length;
        const cur = grid.querySelector('.cur');
        if (cur) grid.scrollTop = Math.max(0, cur.offsetTop - grid.clientHeight / 2);
      }

      const act = $('act');
      act.dataset.mode = mode;
      act.className = 'btn ' + (mode === 'run' ? 'stop' : 'go');
      act.disabled = mode === 'idle' && !selected.size;
      act.textContent = mode === 'run' ? 'Stop'
        : mode === 'done' ? 'Done'
        : (selected.size ? 'Download ' + selected.size + (selected.size === 1 ? ' episode' : ' episodes') : 'Select episodes');
    };
    LGV_PANEL.render = render;

    const rescan = async () => {
      scans++;
      eps = lgvDiscoverEpisodes(); applySel(); render();
      try {
        const full = await lgvDiscoverEpisodesFull();
        if (full && full.length >= eps.length) { eps = full; applySel(); render(); }
      } catch (e) {}
    };

    $('pill').addEventListener('click', () => { setOpen(true); render(); if (!eps.length) rescan(); });
    $('min').addEventListener('click', () => { setOpen(false); render(); });
    $('all').addEventListener('click', () => { touched = true; selected = new Set(eps.map(e => e.num)); render(); });
    $('none').addEventListener('click', () => { touched = true; selected = new Set(); render(); });
    $('rescan').addEventListener('click', () => { scans = 0; rescan(); });
    $('act').addEventListener('click', () => {
      const m = $('act').dataset.mode;
      if (m === 'idle') {
        if (!selected.size || !eps.length) return;
        LGV_PANEL.status = 'Starting…';
        setOpen(true);
        lgvStartQueue(eps, selected);
      } else if (m === 'run') {
        lgvDbg('queue stopped by user');
        LGV_PANEL.status = '';
        lgvQueueSet(null);
      } else {
        LGV_PANEL.finished = null;
      }
      render();
    });
    $('log').addEventListener('click', async () => {
      const text = LGV_DBG.join('\n');
      const btn = $('log');
      try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
      catch (e) {
        try {
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
          btn.textContent = 'Copied';
        } catch (e2) { btn.textContent = 'Copy failed'; }
      }
      setTimeout(() => { btn.textContent = 'Copy log'; }, 1600);
    });

    parent.appendChild(host);
    render();
    lgvDbg('panel mounted path=' + location.pathname);
    [0, 1500, 4000].forEach(ms => setTimeout(rescan, ms));
    const iv = setInterval(() => {
      if (!host.isConnected) { clearInterval(iv); return; }
      if (!eps.length && scans < 8 && !lgvQueueGet()) rescan();
      render();
    }, 3000);
  }

  // 8.10.147: cross-frame message router (one per frame)
  window.addEventListener('message', (e) => {
    const d = e && e.data;
    if (!d || d.lgv !== 'q147') return;
    try {
      if (LGV_IS_TOP) {
        if (d.t === 'get') {
          let q = null;
          try { q = JSON.parse(localStorage.getItem(LGV_QUEUE_KEY) || 'null'); } catch (er) {}
          e.source.postMessage({ lgv: 'q147', t: 'queue', q: q, ep: lgvCurrentEpNum() }, '*');
        } else if (d.t === 'set') {
          lgvQueueSet(d.q || null);
        } else if (d.t === 'advance') {
          lgvDbg('top: advance requested by player frame' + (d.failed ? ' (failed)' : ''));
          lgvQueueAdvance(!!d.failed);
        } else if (d.t === 'goto') {
          const u = new URL(String(d.url || ''), location.href);
          if (u.origin === location.origin && /^\/watch\//.test(u.pathname)) {
            lgvDbg('top: navigating to ' + u.pathname);
            location.href = u.href;
          } else lgvDbg('top: refused goto ' + String(d.url).slice(0, 80));
        } else if (d.t === 'status') {
          lgvQueueStatus(String(d.text || ''));
        } else if (d.t === 'progress') {
          lgvQueueProgress(d.f);
        } else if (d.t === 'dbg') {
          lgvDbg('[frame] ' + String(d.msg || '').replace(/^\[[\d:]+\]\s*/, ''));
        }
        return;
      }
      // Non-top frame
      if (e.source === window.parent) {
        if (d.t !== 'queue') return;
        const had = LGV_BRIDGE.ok && LGV_BRIDGE.q ? LGV_BRIDGE.q : null;
        LGV_BRIDGE.ok = true;
        LGV_BRIDGE.q = d.q || null;
        LGV_BRIDGE.ep = d.ep || 0;
        lgvPostDown(d); // nested frames
        LGV_BRIDGE.hooks.forEach(h => { try { h(had, LGV_BRIDGE.q); } catch (er) {} });
      } else {
        window.parent.postMessage(d, '*'); // relay child → parent
      }
    } catch (er) {}
  });

  function tryAttach(video) {
    if (!video || video.dataset.lgv) return;
    const rect = video.getBoundingClientRect();
    if (rect.width < 100 || rect.height < 60) return;
    try { new Player(video); } catch (e) { console.warn('[LGV]', e); }
  }

  function scan() {
    document.querySelectorAll('video').forEach(tryAttach);
    players.forEach(p => { if (!p.video?.isConnected) p.destroy(); });
    try { lgvMountSeasonFloat(); } catch (e) {}
  }

  scan();
  setInterval(scan, CONFIG.scanEvery);

  let t = null;
  new MutationObserver(() => {
    clearTimeout(t);
    t = setTimeout(scan, 300);
  }).observe(document.documentElement, { childList: true, subtree: true });

  console.log('%c[Liquid Glass Pro v8.10.158] Ready', 'color:#7dd3fc');
  try {
    let topP = '';
    try { topP = lgvTopLoc().pathname; } catch (e) { topP = 'blocked'; }
    lgvDbg('script boot v8.10.158 frame=' + location.pathname + ' top=' + topP + ' ref=' + (document.referrer || '').slice(0, 60));
  } catch (e) {
    lgvDbg('script boot v8.10.158 path=' + location.pathname);
  }
})();
