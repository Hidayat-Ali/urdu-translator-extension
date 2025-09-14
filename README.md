# Urdu Translator Extension

A simple browser extension to translate English text into Urdu using free translation APIs.

---

## Features

- Translate text from **English → Urdu**.
- Uses [LibreTranslate](https://libretranslate.com) or [MyMemory Translation API](https://mymemory.translated.net/).
- Lightweight and easy to use.

---

## Installation

1. Clone this repo:
   ```bash
   git clone https://github.com/Hidayat-Ali/urdu-translator-extension.git
   cd urdu-translator-extension
   Install dependencies:
   ```

npm install

Build the extension:

npm run build

Load into your browser:

Open Chrome → Extensions → Enable Developer Mode.

Click Load unpacked and select the dist folder.

Configuration

In the code you can switch between APIs:

// For LibreTranslate
const LIBRETRANSLATE_API = "https://libretranslate.com/translate";

// For MyMemory
const MYMEMORY_API = "https://api.mymemory.translated.net/get";

LibreTranslate: Works with POST requests. Example body:

{
"q": "Hello world",
"source": "en",
"target": "ur",
"format": "text"
}

MyMemory: Works with GET requests. Example:

https://api.mymemory.translated.net/get?q=Hello%20world&langpair=en|ur

Update the API constant depending on which service you want to use.

Usage

Open any webpage with English text.

Click the extension icon.

The selected text (or page section) will be translated into Urdu.

Notes

LibreTranslate has rate limits on public endpoints.

MyMemory is free but may return mixed quality translations.

For unlimited use, consider hosting your own LibreTranslate instance.
