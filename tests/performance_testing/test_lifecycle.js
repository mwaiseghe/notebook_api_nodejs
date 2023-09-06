// The four lifecycle stages of k6 are init, setup, VU, and teardown.

// 1. init: This stage is used to initialize the test environment.
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
};

// 2. setup: This stage is used to initialize the test environment for each virtual user.
export function setup() {
    const res = http.get('https://httpbin.test.k6.io/get');
    return { data: res.json() };
  }

// 3. VU: This stage is used to define the test scenario.
export default function (data) {
    check(data, {
        'status was 200': (r) => r.status == 200,
    });
    sleep(1);
}

// 4. teardown: This stage is used to clean up the test environment.
export function teardown(data) {
    console.log(`Response data: ${JSON.stringify(data)}`);
  }
