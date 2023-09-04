import http from 'k6/http'; // For making HTTP requests
import { sleep } from 'k6'; // For making the test wait for a specified amount of time

// set options
export const options = {
  vus: 10, // 10 users looping for 30 seconds
  duration: '30s', 
};
export default function () {
  http.get('http://127.0.0.1:8000/notes/');
  sleep(1);
}
