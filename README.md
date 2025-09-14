# Urdu Translator Extension

A simple browser extension that translates **English → Urdu** using free translation APIs: **LibreTranslate** and **MyMemory**. Lightweight and easy to install — copy this `README.md` into your repo.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Features](#features)
3. [Installation (Step-by-step)](#installation-step-by-step)
4. [Configure which API to use](#configure-which-api-to-use)
5. [API examples (how calls are made)](#api-examples-how-calls-are-made)
6. [Usage](#usage)
7. [Development & testing](#development--testing)
8. [Troubleshooting & notes](#troubleshooting--notes)
9. [Contributing](#contributing)
10. [License](#license)

---

# Quick Start

1. Clone the repo:

   ```bash
   git clone https://github.com/Hidayat-Ali/urdu-translator-extension.git
   cd urdu-translator-extension
   ```
2. Install dependencies and build:

   ```bash
   npm install
   npm run build
   ```
3. Load the `dist` folder into your browser as an unpacked extension (Chrome/Edge: `chrome://extensions/` → Developer mode → **Load unpacked**).

---

## Features

* Translate selected text or page text from **English → Urdu**.
* Uses **LibreTranslate** (POST) or **MyMemory** (GET) — both free/public endpoints.
* Minimal UI and lightweight footprint.

---

## Installation (Step-by-step)

1. **Clone & open project**

   ```bash
   git clone https://github.com/Hidayat-Ali/urdu-translator-extension.git
   cd urdu-translator-extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build**

   ```bash
   npm run build
   ```

   This will create the production bundle (commonly in `dist/`).

4. **Load into browser**

   * **Chrome / Edge**:

     * Open `chrome://extensions/`
     * Enable **Developer mode**
     * Click **Load unpacked** → select the `dist` folder
   * **Firefox**:

     * Open `about:debugging#/runtime/this-firefox`
     * Click **Load Temporary Add-on** → select `manifest.json` from `dist`

---

## Configure which API to use

The extension supports two free options:

* **LibreTranslate** (recommended for better quality; POST request)

  ```js
  const LIBRETRANSLATE_API = "https://libretranslate.com/translate";
  ```
* **MyMemory** (simple free GET API for short texts)

  ```js
  const MYMEMORY_API = "https://api.mymemory.translated.net/get";
  ```

### How to switch

1. Search the repository for `LIBRETRANSLATE_API` or `MYMEMORY_API`.
2. Replace the constant (or update the config file) with the URL of the service you want to use.

   * Example: set `const API = LIBRETRANSLATE_API` or `const API = MYMEMORY_API` depending on your choice.

> Tip: Keep automatic detection or a simple extension setting so users can choose which API to use at runtime.

---

## API examples (how calls are made)

### LibreTranslate (POST)

* Request body (JSON):

```json
{
  "q": "Hello world",
  "source": "en",
  "target": "ur",
  "format": "text"
}
```

* Example `fetch` (background script or extension):

```js
async function translateWithLibre(text) {
  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "ur",
      format: "text"
    })
  });
  const data = await res.json();
  // LibreTranslate returns: { translatedText: "..." }
  return data.translatedText;
}
```

### MyMemory (GET)

* Example URL:

```
https://api.mymemory.translated.net/get?q=Hello%20world&langpair=en|ur
```

* Example `fetch`:

```js
async function translateWithMyMemory(text) {
  const query = encodeURIComponent(text);
  const url = `https://api.mymemory.translated.net/get?q=${query}&langpair=en|ur`;
  const res = await fetch(url);
  const data = await res.json();
  // MyMemory returns responseData.translatedText
  return data.responseData && data.responseData.translatedText;
}
```

---

## Usage

1. Open any webpage that contains English text.
2. Select text or click the extension icon (depending on your extension UI).
3. The extension will call the configured API and display the Urdu translation (replace, overlay, or show in tooltip).
4. If using your local/hosted LibreTranslate, ensure the server is running and the extension is pointed at the correct endpoint.

---

## Development & testing

* Run the dev build (if available):

  ```bash
  npm run dev
  ```
* To debug in browser:

  * Open DevTools for the extension (background page or popup) via `chrome://extensions/` → **Inspect views**.
  * Check console logs for API requests and any CORS errors.

---

## Troubleshooting & notes

* **Rate limits**: Public LibreTranslate and MyMemory endpoints may throttle heavy usage. If you plan high volume, consider self-hosting LibreTranslate.
* **CORS issues**: Some public APIs block cross-origin requests from content scripts. If you see CORS errors:

  * Move the fetch to a **background script** (background pages generally handle cross-origin better if you add host permissions in `manifest.json`), or
  * Add necessary host permissions in `manifest.json`, or
  * Use a simple proxy on your server (if you control one).
* **Translation quality**: MyMemory can be inconsistent for long or complex sentences. LibreTranslate tends to be better but not perfect.
* **Privacy**: Translations are sent to third-party services — be careful with sensitive text.

---

## Contributing

* Feel free to open issues or pull requests.
* Suggested improvements:

  * Add user setting to choose API at runtime.
  * Add caching for repeated translations to reduce API calls.
  * Support batch translations for performance.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
## THANKYOU FELL IN LOVE WITH CODING ❤️
