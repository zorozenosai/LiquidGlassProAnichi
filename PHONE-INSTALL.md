# Install on phone without Android Studio

## Option A — GitHub builds the APK for you (recommended)

1. Free GitHub account → **New repository**
2. Upload the entire `LiquidGlassPro` folder (Add file → Upload, or git push)
3. Repo → **Actions** → **Build debug APK** → **Run workflow**
4. Wait about 5–10 minutes
5. Click the green run → **Artifacts** → download **LiquidGlassPro-debug**
6. Unzip → copy the `.apk` to your phone
7. Phone: Settings → allow install from that app (Files/Chrome) → open APK → Install

## Option B — Userscript only (no APK)

Works in browser; background downloads are limited vs the full app.

1. Install **Kiwi Browser** (Play Store) — supports Chrome extensions
2. Install **Tampermonkey** from the Chrome Web Store inside Kiwi
3. Tampermonkey → + → New script → paste contents of `liquid-glass-pro.js`
4. Open anichi in Kiwi — Liquid Glass runs like on desktop

Firefox + Violentmonkey works the same way.

## Option C — Android Studio on your PC

First Gradle sync is slow once; after that builds are quicker.
