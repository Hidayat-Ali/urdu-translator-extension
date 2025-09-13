// Using LibreTranslate API (free and open source)
// You can also use other free APIs like MyMemory Translation API

const LIBRETRANSLATE_API = "https://libretranslate.de/translate";

export const translateText = async (
  text,
  sourceLang = "en",
  targetLang = "ur"
) => {
  try {
    const response = await fetch(LIBRETRANSLATE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);

    // Fallback to a simple dictionary if API fails
    const fallbackTranslation = fallbackDictionary[text.toLowerCase()];
    return fallbackTranslation || "Translation unavailable";
  }
};

// Fallback dictionary for common words
const fallbackDictionary = {
  hello: "ہیلو",
  world: "دنیا",
  book: "کتاب",
  pen: "قلم",
  computer: "کمپیوٹر",
  water: "پانی",
  food: "کھانا",
  house: "گھر",
  car: "گاڑی",
  tree: "درخت",
  school: "اسکول",
  teacher: "استاد",
  student: "طالب علم",
  friend: "دوست",
  family: "خاندان",
  time: "وقت",
  day: "دن",
  night: "رات",
  sun: "سورج",
  moon: "چاند",
  love: "محبت",
  peace: "امن",
  happy: "خوش",
  sad: "اداس",
  good: "اچھا",
  bad: "برا",
  big: "بڑا",
  small: "چھوٹا",
  hot: "گرم",
  cold: "ٹھنڈا",
  new: "نیا",
  old: "پرانا",
};
