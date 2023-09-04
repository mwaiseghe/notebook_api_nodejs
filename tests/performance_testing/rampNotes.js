import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
/* stages property is used to define the 
ramp-up and ramp-down of virtual users
 */
  stages: [
    // simulate ramp-up of traffic from 1 to 20 users over 30 seconds. 
    { duration: '30s', target: 20 }, 
    // stay at 10 users for 1 minute 30 seconds
    { duration: '1m30s', target: 10 }, 
    // ramp-down to 0 users over 20 seconds
    { duration: '20s', target: 0 }, 
  ],
};

export default function () {
  const res = http.get('http://127.0.0.1:8000/notes/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
