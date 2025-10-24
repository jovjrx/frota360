/** @type {import('next-i18next').UserConfig} */
const config = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es', 'it', 'fr'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: 'pt',
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/public/locales',
};

module.exports = config;
