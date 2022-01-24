import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  // http.get('https://10.103.11.43:20443/metrics');
  http.get('https://10.103.11.43:20443/proxy/metrics');
  // sleep(1);
}
