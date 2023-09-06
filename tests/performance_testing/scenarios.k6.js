import http from 'k6/http';

export const options = {
  scenarios: {
    constantLoad: {
      // Scenario named 'constantLoad' that will run for 30 seconds
      executor: 'constant-vus', // defines the executor to use
      vus: 10, // Simulate 10 virtual users
      duration: '30s', 
    },
    rampingLoad: {
      // scenario named 'rampingLoad'
      executor: 'ramping-vus', // Ramp up and down VUs
      startVUs: 5, // Start with 5 VUs
      stages: [
        { duration: '10s', target: 10 }, // Ramp up to 10 VUs over 10 seconds
        { duration: '20s', target: 5 }, // Ramp down to 5 VUs over 20 seconds
      ],
    },
  },
};

export default function () {
  // Your test logic here, for example, make an HTTP request
  http.get('https://example.com');
}
