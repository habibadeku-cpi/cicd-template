export interface IEventProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const analyticEvents = {
  localeChanged: 'locale-changed',
  pageView: 'page-view',
  testButtonClicked: 'test-button-clicked',
  // TODO: Add more events!!!
};

const requiredEventProperties = {
  [analyticEvents.pageView]: ['path'],
  [analyticEvents.localeChanged]: ['locale'],
};

export const validateEventProperties = (
  eventName: string,
  eventProperties: IEventProperties
): boolean => {
  const requiredProperties = requiredEventProperties[eventName] || [];
  const missingEventProperties: string[] = [];
  const { hasOwnProperty } = Object.prototype;

  requiredProperties.forEach((prop) => {
    if (!hasOwnProperty.call(eventProperties, prop)) {
      missingEventProperties.push(prop);
    }
  });

  if (missingEventProperties.length > 0) {
    const missingProps = missingEventProperties.join(', ');
    console.warn(`[${eventName}] is missing event properties: [${missingProps}]`);
    return false;
  }

  return true;
};

const filterPageViews = (eventProperties: IEventProperties): boolean => {
  if (
    // These page view paths cause noise due to station map movement and/or user actions.
    // Will be filtering these page views out and swapping them with a manually fired events.
    // Example: pageView with path = 'station-map', mySpotsClicked, recentsClicked
    eventProperties.path === '/' ||
    eventProperties.path.startsWith('/dashboard') ||
    eventProperties.path.startsWith('/mapCenter') ||
    eventProperties.path.startsWith('/mapBounds')
  ) {
    return true;
  }
  return false;
};

export const filterEvent = (eventName: string, eventProperties: IEventProperties): boolean => {
  if (eventName === analyticEvents.pageView) {
    return filterPageViews(eventProperties);
  }
  return false;
};
