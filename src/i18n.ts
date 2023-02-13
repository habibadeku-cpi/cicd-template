import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// NOTES:
// Setup to fetch locally via public locales folder using HttpBackend and then cache in local storage.
// Subsequent loads will look in local storage cache first with a fallback to HttpBackend.

// Setting a smaller expiration time for non production which will force a fetch from HttpBackend and update local storage.
const localStorageExpirationTime = import.meta.env.PROD ? 7 * 24 * 60 * 60 * 1000 : 5 * 1000; // 7 day cache or hot reload

const showDebugLogs = import.meta.env.PROD ? false : true;

const checkForLocaleOverride = () => {
  // Could check if locale query param was passed and override i18n to specify that locale...
};

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      debug: showDebugLogs,
      load: 'currentOnly',
      ns: ['translation'],
      fallbackLng: 'en-US',
      backend: {
        backends: [
          LocalStorageBackend, // primary
          HttpBackend, // fallback
        ],
        backendOptions: [
          {
            prefix: 'i18next_driver:', // prefix used to store languages in local storage
            expirationTime: localStorageExpirationTime,
            // defaultVersion: `${window.runtimeVersion.GITHUB_SHA}`,
          },
          {
            // loadPath: `/locales/{{lng}}/{{ns}}.json?v=${window.runtimeVersion.GITHUB_SHA}`, // load path for HttpBackend fallback
            loadPath: '/locales/{{lng}}/{{ns}}.json?v=1', // load path for HttpBackend fallback
          },
        ],
      },
    },
    (err) => {
      if (err) {
        console.error('Error initializing i18n', err);
      }

      checkForLocaleOverride();
    }
  );

i18n.on('initialized', () => {
  if (showDebugLogs) {
    console.info(
      'i18n initialized i18next.services.resourceStore.data',
      i18n.services.resourceStore.data
    );
  }
});

export default i18n;
