import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  // http.get('https://10.103.11.43:20443/bootstrap.min.css');
  // http.get('https://10.103.11.43:20443/font-awesome.min.css');
  // http.get('https://10.103.11.43:20443/icx-text-png-a.png');
  // http.get('https://10.103.11.43:20443/');
  http.get('https://10.103.11.43:20443/jquery.loadie.min.js');
  http.get('https://10.103.11.43:20443/jquery.mCustomScrollbar.min.css');
  http.get('https://10.103.11.43:20443/qct_home_icon.png');
  http.get('https://10.103.11.43:20443/reset.css');
  http.get('https://10.103.11.43:20443/sitesearch360-v11.min.js');
  http.get('https://10.103.11.43:20443/sweetalert.css');
}
