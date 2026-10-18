# Liquid Glass Pro — Android app

Native Kotlin / Android Studio app that wraps a WebView browser, injects **Liquid Glass Pro v8.10.148** into every HTML document (top page **and** cross-origin iframes like `/stream/…`), and runs a **foreground DownloadService** so season downloads can continue with the screen off.

## What you get

| Piece | Role |
|-------|------|
| **Browser screen** | WebView + URL bar, back/forward/reload/home. Default home: `https://anichi.to` |
| **Script injection** | Full LGV script in all frames via HTML intercept (Tampermonkey-style), plus Android bridge |
| **Download service** | Foreground service + notification with overall %; partial wake lock; progress from the season queue |

## Open in Android Studio

1. Install [Android Studio](https://developer.android.com/studio) (Hedgehog or newer recommended).
2. **File → Open** → select this `LiquidGlassPro` folder.
3. Let Gradle sync (it will download the Android Gradle Plugin and dependencies).
4. Connect a device or start an emulator (API 26+).
5. Run **app**.

First build may take a few minutes while Gradle and the SDK components download.

## Project layout

```
LiquidGlassPro/
├── app/
│   ├── build.gradle.kts
│   ├── proguard-rules.pro
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── assets/liquid-glass-pro.js   ← full userscript
│       ├── java/com/liquidglass/pro/
│       │   ├── LgApp.kt                ← notification channel
│       │   ├── MainActivity.kt         ← WebView + chrome
│       │   ├── ScriptInjector.kt       ← HTML intercept → all frames (incl. cross-origin)
│       │   ├── ScriptBridge.kt         ← JS → Kotlin bridge
│       │   └── DownloadService.kt      ← FGS + progress notification
│       └── res/ …
├── build.gradle.kts
├── settings.gradle.kts
└── gradle.properties
```

## How injection works (including cross-origin iframes)

Liquid Glass Pro expects the script in **both** the watch page and the cross-origin player iframe so they can talk over `postMessage` (queue, status, progress, advance). Tampermonkey does that by injecting into every frame. This app does the same:

1. **`ScriptInjector` + `shouldInterceptRequest`** — every HTML document (main frame and iframes, any origin) is fetched with the WebView’s cookies, LGV + the Android bridge are spliced into `<head>`, and the modified HTML is returned. Non-HTML (`.ts`, `.m3u8`, XHR, images, …) is not touched.
2. **`evaluateJavascript` fallback** on `onPageFinished` for the top frame if intercept skipped a document.
3. **`LgAndroid` (`JavascriptInterface`)** is available in all frames of the WebView for progress / keep-alive.

## Background downloads

HTML-to-app shells pause when backgrounded. This app starts a **dataSync foreground service** when the season queue is active, holds a partial wake lock, and shows a low-importance progress notification. The WebView process stays alive so the existing LGV download pipeline (`.ts` + `.srt`) can finish.

For best results on aggressive OEMs (Xiaomi, Huawei, etc.):

- Allow notifications when prompted.
- Optionally disable battery optimization for Liquid Glass Pro (Settings → Apps → Liquid Glass Pro → Battery).

## Permissions

- `INTERNET`, `ACCESS_NETWORK_STATE`
- `FOREGROUND_SERVICE` / `FOREGROUND_SERVICE_DATA_SYNC`
- `POST_NOTIFICATIONS` (Android 13+)
- `WAKE_LOCK`
- `WRITE_EXTERNAL_STORAGE` only up to API 28 (newer use public Downloads via DownloadManager)

## Building a release APK

```bash
./gradlew assembleRelease
```

Sign with your own keystore before distributing. Debug builds work for local install:

```bash
./gradlew installDebug
```

## Updating the userscript

Replace `app/src/main/assets/liquid-glass-pro.js` with a newer Liquid Glass Pro build and rebuild. The Android bridge hook is separate and does not need to change unless the queue storage key (`lgv-season-queue-v2`) changes.

## Notes / limits

- Cross-origin iframes are supported via HTML interception (not via parent `evaluateJavascript`). Strict **Content-Security-Policy** that blocks inline scripts can still prevent injection on some sites; anichi-style hosts typically allow it (same as the userscript in page context).
- Fully native HLS segment downloading (without WebView) is stubbed in `ScriptBridge.enqueueNativeDownload` for a future version; v1 reuses the script’s proven download path under a keep-alive service.
- Default home URL is `https://anichi.to` — change `R.string.default_home` if the domain moves.
