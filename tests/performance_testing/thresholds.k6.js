import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');

export const options = {
    thresholds: {
        // Count: Incorrect content cannot be returned more than 99 times.
        'Errors': ['count<100'],
        // Gauge: returned content must be smaller than 4000 bytes
        'ContentSize': ['value<4000'],
        // Rate: content must be OK more than 95 times
        'Content OK': ['rate>0.95'],
        // Trend: Percentiles, averages, medians, and minimums
        // must be within specified milliseconds.
        'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
      },
};

export default function () {
  const res = http.get('http://127.0.0.1:8002/notes/');
    // Record the response time.
    TrendRTT.add(res.timings.duration);

    // Record if the content was OK.
    RateContentOK.add(res.status === 200);

    // Record the size of the content.
    GaugeContentSize.add(res.body.length);

    // Record if there were any errors.
    CounterErrors.add(res.status !== 200);

    sleep(1);

}
