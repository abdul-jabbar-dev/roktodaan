import translate from 'translate';

(translate as any).engine = 'libre';

// 🔄 Backup servers (auto fallback)
const SERVERS = [
  'https://translate.argosopentech.com',
  'https://libretranslate.de',
  'https://libretranslate.com'
];

export const translateText = async (text: string) => {
  for (const url of SERVERS) {
    try {
      (translate as any).url = url;

      // force detect from Bengali or auto
      const translated = await translate(text, { from: 'auto', to: 'en' });

      // if translation actually changed (not same as input)
      if (translated && translated.trim() !== text.trim()) {
          return translated;
      }
    } catch (err) {
      console.warn(`⚠️ Server ${url} failed`);
      continue;
    }
  }

  console.error('❌ All translation servers failed');
  return text;
};
