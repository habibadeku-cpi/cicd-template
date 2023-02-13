import AnalyticsService from '../services/analytics/AnalyticsService';

const useAnalyticsService = (): { analyticsService: AnalyticsService } => {
  if (!AnalyticsService.getInstance().isInitialized) {
    AnalyticsService.getInstance().init();
  }
  return { analyticsService: AnalyticsService.getInstance() };
};

export default useAnalyticsService;
