/* eslint-disable class-methods-use-this */
import mixpanel, { Dict } from 'mixpanel-browser';
import { filterEvent, validateEventProperties, IEventProperties } from './AnalyticEvents';

class AnalyticsService {
  private static instance: AnalyticsService;

  isInitialized = false;

  init(): void {
    if (!import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN) {
      return;
    }

    const debugLogging = false;
    mixpanel.init(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN, {
      debug: debugLogging,
    });

    this.isInitialized = true;
  }

  trackEvent(name: string, properties?: IEventProperties): void {
    if (!this.isInitialized) {
      return;
    }

    if (properties) {
      if (!validateEventProperties(name, properties)) {
        // Don't send this event as it's malformed (check console for warning message).
        return;
      }

      if (filterEvent(name, properties)) {
        // Don't send this event as it's been filtered out
        return;
      }
    }

    // console.info('trackEvent', name, properties);
    mixpanel.track(name, properties as Dict);
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
}

export default AnalyticsService;
