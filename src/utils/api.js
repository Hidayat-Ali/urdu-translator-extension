// Using multiple free translation APIs with better error handling
const APIS = [
  {
    name: "MyMemory",
    url: "https://api.mymemory.translated.net/get",
    method: "GET",
    process: (data) => data.responseData.translatedText,
    getUrl: (text, source, target) =>
      `${APIS[0].url}?q=${encodeURIComponent(
        text
      )}&langpair=${source}|${target}`,
  },
  {
    name: "LibreTranslate",
    url: "https://libretranslate.de/translate",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    process: (data) => data.translatedText,
    getBody: (text, source, target) =>
      JSON.stringify({
        q: text,
        source: source,
        target: target,
        format: "text",
      }),
  },
];

export const translateText = async (
  text,
  sourceLang = "en",
  targetLang = "ur"
) => {
  // Try each API in sequence
  for (const api of APIS) {
    try {
      console.log(`Trying ${api.name} API for: ${text}`);

      const options = {
        method: api.method,
        headers: api.headers || {},
      };

      if (api.method === "POST" && api.getBody) {
        options.body = api.getBody(text, sourceLang, targetLang);
      }

      const url = api.getUrl
        ? api.getUrl(text, sourceLang, targetLang)
        : api.url;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${api.name} API error: ${response.status}`);
      }

      const data = await response.json();
      const translation = api.process(data);

      if (translation && translation !== text) {
        console.log(`Success from ${api.name}: ${translation}`);
        return translation;
      }

      throw new Error("Invalid translation received");
    } catch (error) {
      console.warn(`${api.name} failed:`, error.message);
      // Continue to next API
    }
  }

  // All APIs failed, use fallback dictionary
  console.log("All APIs failed, using fallback dictionary");
  return fallbackDictionary[text.toLowerCase()] || "Translation unavailable";
};

// Enhanced fallback dictionary
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
  man: "آدمی",
  woman: "عورت",
  boy: "لڑکا",
  girl: "لڑکی",
  child: "بچہ",
  father: "والد",
  mother: "والدہ",
  brother: "بھائی",
  sister: "بہن",
  work: "کام",
  home: "گھر",
  city: "شہر",
  country: "ملک",
  water: "پانی",
  fire: "آگ",
  earth: "زمین",
  air: "ہوا",
  sky: "آسمان",
  star: "ستارہ",
  rain: "بارش",
  snow: "برف",
  wind: "ہوا",
  cloud: "بادل",
  river: "دریا",
  mountain: "پہاڑ",
  sea: "سمندر",
  ocean: "بحیرہ",
  fish: "مچھلی",
  bird: "پرندہ",
  animal: "جانور",
  dog: "کتا",
  cat: "بلی",
  horse: "گھوڑا",
  cow: "گائے",
  food: "کھانا",
  bread: "روٹی",
  rice: "چاول",
  fruit: "پھل",
  vegetable: "سبزی",
  meat: "گوشت",
  milk: "دودھ",
  egg: "انڈا",
  tea: "چائے",
  coffee: "کافی",
  sugar: "چینی",
  salt: "نمک",
  pepper: "کالی مرچ",
  yes: "جی ہاں",
  no: "نہیں",
  please: "براہ کرم",
  "thank you": "شکریہ",
  welcome: "خوش آمدید",
  sorry: "معاف کیجئے",
  "excuse me": "معذرت",
  name: "نام",
  age: "عمر",
  country: "ملک",
  city: "شہر",
  village: "گاؤں",
  street: "گلی",
  road: "سڑک",
  house: "گھر",
  room: "کمرہ",
  door: "دروازہ",
  window: "کھڑکی",
  chair: "کرسی",
  table: "میز",
  bed: "بستر",
  food: "کھانا",
  water: "پانی",
  milk: "دودھ",
  bread: "روٹی",
  rice: "چاول",
  fruit: "پھل",
  vegetable: "سبزی",
  meat: "گوشت",
  fish: "مچھلی",
  school: "اسکول",
  college: "کالج",
  university: "یونیورسٹی",
  teacher: "استاد",
  student: "طالب علم",
  book: "کتاب",
  pen: "قلم",
  pencil: "پنسل",
  paper: "کاغذ",
  computer: "کمپیوٹر",
  phone: "فون",
  internet: "انٹرنیٹ",
  time: "وقت",
  day: "دن",
  night: "رات",
  morning: "صبح",
  evening: "شام",
  week: "ہفتہ",
  month: "مہینہ",
  year: "سال",
  today: "آج",
  tomorrow: "کل",
  yesterday: "کل",
  now: "اب",
  later: "بعد میں",
  soon: "جلد",
  never: "کبھی نہیں",
  always: "ہمیشہ",
  sometimes: "کبھی کبھار",
  India: "ہندوستان",
};
