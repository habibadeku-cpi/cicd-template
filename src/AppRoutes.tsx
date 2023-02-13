import { lazy, ReactElement, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import useAnalyticsService from './hooks/useAnalyticsService';
import { analyticEvents } from './services/analytics/AnalyticEvents';

const Home = lazy(() => import('./pages/Home'));

function AppRoutes(): ReactElement {
  const { analyticsService } = useAnalyticsService();
  const location = useLocation();

  useEffect(() => {
    // const queryParams = KitUtilCommon.getQueryObject(location.search);
    analyticsService.trackEvent(analyticEvents.pageView, {
      path: location.pathname,
      // ...queryParams,
    });
  }, [location, analyticsService]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* TODO: Add more routes */}
      {/* <Route path={ROUTES.NOT_FOUND_404} element={<NotFound404 />} /> */}
    </Routes>
  );
}

export default AppRoutes;
