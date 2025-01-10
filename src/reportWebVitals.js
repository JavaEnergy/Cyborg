import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase'; // Ensure correct path

const sendToFirebase = (metric) => {
  const { name, value } = metric;
  console.log(`${name}: ${value}`);

  logEvent(analytics, 'web_vitals', {
    metric_name: name,
    metric_value: value,
    url: window.location.href,
  });
};

export const reportWebVitals = () => {
  getCLS(sendToFirebase);
  getFID(sendToFirebase);
  getFCP(sendToFirebase);
  getLCP(sendToFirebase);
  getTTFB(sendToFirebase);
};
