import { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, } from '@cp-kit/components.templates.layout';
import HeyThere from '../components/HeyThere';
import useAnalyticsService from '../hooks/useAnalyticsService';
import { analyticEvents } from '../services/analytics/AnalyticEvents';
import localesJson from '../locales.json';

const Div = () => <div></div>;

const Home = () => {
  const { t, i18n } = useTranslation();
  const { analyticsService } = useAnalyticsService();
  const [selectedLocale, setSelectedLocale] = useState(i18n.language);

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    i18n.changeLanguage(locale);
    analyticsService.trackEvent(analyticEvents.localeChanged, {
      locale
    });
    setSelectedLocale(locale);
  };

  const MainContent = () => {
    const [count, setCount] = useState(0);
    return (
      <div className='App'>
        <h1 className='text-3xl font-bold underline text-green-500'>{t('hello_world')}</h1>
        <h2>Vite + React</h2>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        </div>
        <HeyThere />
        <HeyThere name='Brandon' />
        <p className='my-6 tracking-wide'>
          <select name='locales' onChange={handleLocaleChange} defaultValue={selectedLocale}>
            {localesJson.map((locale) => (
              <option key={locale} value={locale}>
                {locale}
              </option>
            ))}
          </select>
        </p>
      </div>
    );
  };

  return (
    <div className='App'>
      <Layout content={<MainContent />} footer='bar' navbar={<Div />} sidebar={<Div />}></Layout>
    </div>
  );
};

export default Home;
