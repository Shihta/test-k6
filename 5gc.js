import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const IPAddr = '10.103.11.43';

const authRate = new Rate('rate_auth');
const dnnRate = new Rate('rate_dnn');
const nfstatRate = new Rate('rate_nfstat');
const networkRate = new Rate('rate_network');
const logoutRate = new Rate('rate_logout');

const authTrend = new Trend('waiting_auth', true);
const dnnTrend = new Trend('waiting_dnn', true);
const nfstatTrend = new Trend('waiting_nfstat', true);
const networkTrend = new Trend('waiting_network', true);
const logoutTrend = new Trend('waiting_logout', true);

export default function () {
  // sleep(1);

  const payload = `{
    "auth": {
      "identity": {
        "methods": [ "password" ],
        "password": {
          "user": {
            "name": "admin",
            "domain": { "name": "Default" },
            "password": "5gc@PASS"
          }}}}}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // console.log(Math.random());
  
  let res = http.post('https://'+IPAddr+'/v3/auth/tokens', payload, params);
  authTrend.add(res.timings.waiting)
  // console.log(JSON.stringify(res));
  let chkRes = check(res, {
    'auth': (r) => r.status === 201,
  });
  if (chkRes) {
    authRate.add(true)
  } else {
    authRate.add(false)
    fail('auth failed');
  }
  // if (Math.random() > 0.5) {
  //   authRate.add(false)
  //   fail('unexpected response');
  // } else {
  //   authRate.add(true)
  // }

  // console.log("token:", res.headers['X-Subject-Token']);
  params.headers['X-Auth-Token'] = res.headers['X-Subject-Token'];
  params.headers['X-Subject-Token'] = res.headers['X-Subject-Token'];
  // console.log(JSON.stringify(params));
  res = http.get('https://'+IPAddr+'/api/dnn', params);
  dnnTrend.add(res.timings.waiting)
  // console.log(JSON.stringify(res2));
  chkRes = check(res, {
    'dnn': (r) => r.status === 200,
  });
  if (chkRes) {
    dnnRate.add(true)
  } else {
    dnnRate.add(false)
  }

  res = http.get('https://'+IPAddr+'/api/other/nf/status', params);
  nfstatTrend.add(res.timings.waiting)
  // console.log(JSON.stringify(res));
  chkRes = check(res, {
    'nfstat': (r) => r.status === 200,
  });
  if (chkRes) {
    nfstatRate.add(true)
  } else {
    nfstatRate.add(false)
  }

  res = http.get('https://'+IPAddr+'/api/network', params);
  networkTrend.add(res.timings.waiting)
  // console.log(JSON.stringify(res));
  chkRes = check(res, {
    'network': (r) => r.status === 200,
  });
  if (chkRes) {
    networkRate.add(true)
  } else {
    networkRate.add(false)
  }

  res = http.del('https://'+IPAddr+'/v3/auth/tokens', null, params);
  logoutTrend.add(res.timings.waiting)
  // console.log(JSON.stringify(res));
  chkRes = check(res, {
    'logout': (r) => r.status === 204,
  });
  if (chkRes) {
    logoutRate.add(true)
  } else {
    logoutRate.add(false)
  }
}
