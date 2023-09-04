import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://127.0.0.1:8002/notes/');
  // check() takes a response and a set of predicates (or checks)
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  check(res, {
    // checks if status code is 200
    'is status 200': (r) => r.status === 200, 
    // checks if the response body is 123 bytes
    'body size is 123 bytes': (r) => r.body.length === 123,
    // checks if the response time is below 200ms 
    'transaction time OK': (r) => r.timings.duration < 200, 
  });
}
