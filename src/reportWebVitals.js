// src/reportWebVitals.js

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * Reports web vitals metrics.
 * @param {function} onPerfEntry - Callback function to handle the metric.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export { reportWebVitals };
