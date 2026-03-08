# SETUP.md — Running ExamArchive v4 on Your Phone

A step-by-step guide optimized for developers who code **from a mobile browser**.

---

## What You Need

| Tool | Where to get it |
|------|----------------|
| **Node.js ≥ 18** | https://nodejs.org |
| **npm ≥ 9** (bundled with Node) | — |
| **Expo Go** app | Play Store → search *Expo Go* |

> You only need a computer (or cloud IDE) to run the dev server.  
> The app preview happens **entirely on your phone** via the Expo Go app — no USB cable, no Android Studio required.

---

## Step 1 — Get the Code

```bash
git clone https://github.com/Omdas11/examarchive-v4.git
cd examarchive-v4
```

Or download the ZIP from GitHub and unzip it.

---

## Step 2 — Install Dependencies

```bash
npm install
```

This installs Expo, React Navigation, and all other packages listed in `package.json`.  
It may take 1–2 minutes on a fresh machine.

---

## Step 3 — Start the Expo Dev Server

```bash
npm start
```

Or equivalently:

```bash
npx expo start
```

You will see a **QR code** printed in your terminal and a Metro bundler dashboard open in your browser.

---

## Step 4 — Preview on Your Phone

1. Make sure your phone and computer are on the **same Wi-Fi network**.
2. Open the **Expo Go** app on your Android phone.
3. Tap **"Scan QR code"** and scan the QR code shown in the terminal.
4. The app will bundle and launch — usually within 30 seconds.

> **Tip:** If the QR code scan fails, tap **"Enter URL manually"** in Expo Go and type the `exp://` URL shown in the terminal (e.g. `exp://192.168.x.x:8081`).

---

## Step 5 — Live Reload While You Edit

Once the app is running, any change you save to `App.js` will automatically hot-reload on your phone — no manual refresh needed.

---

## Useful Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Start Expo dev server (with QR code) |
| `npm run android` | Start and open in Android emulator (if installed) |
| `npm run ios` | Start and open in iOS simulator (Mac only) |

---

## Project Structure

```
examarchive-v4/
├── App.js          ← All screens & navigation (single file)
├── package.json    ← Dependencies
├── SETUP.md        ← This file
└── README.md
```

Everything lives in **`App.js`** — screens, styles, and navigation — keeping it easy to edit from a mobile browser or small screen.

---

## Screens Overview

| Tab | Screen | Description |
|-----|--------|-------------|
| 🏠 | **Home** | Hero banner, notice board, stream filter, recent papers |
| 🔍 | **Search** | Full-text search bar + stream / year / semester / type filters |
| ➕ | **Contribute** | 3-step form wizard to submit a question paper (UI only) |
| 👤 | **Profile** | Avatar, XP stats, settings menu, sign-out button |

---

## Troubleshooting

**"Network response timed out" in Expo Go**  
→ Make sure phone and computer are on the same Wi-Fi.  
→ Try `npx expo start --tunnel` which routes traffic through Expo's servers (works on any network).

**Metro bundler crashes on start**  
→ Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
npm start
```

**"Unable to resolve module" error**  
→ Clear the Metro cache:
```bash
npx expo start --clear
```

---

## Notes

- This is a **pure UI skeleton** — no backend, database, or real authentication.
- All data shown (papers, user stats) is static dummy data defined inside `App.js`.
- The color scheme mirrors ExamArchive v3: academic red `#ff5252` on a dark `#121212` background.
