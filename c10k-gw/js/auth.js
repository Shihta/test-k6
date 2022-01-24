function auth(r) {
  // r.error(r.uri);
  // r.error("rawHeadersIn: " + r.rawHeadersIn);
  // r.error("requestBuffer: " + r.requestBuffer);
  // r.error("requestBody: " + r.requestBody);
  r.subrequest('/get_auth')
    .then(reply => {
      if (reply.status != 200) {
        // r.error("auth error!");
        r.return(401);
        return;
      }
      // r.error("responseBody: " + reply.responseBody);
      var rjson = JSON.parse(reply.responseBody);
      // r.error("parse ok!");
      r.headersOut.user = rjson.token.user.name;
      r.headersOut.keystoneid = rjson.token.user.id;
      // r.headersOut['Content-Length'] = 0;
      // r.error(JSON.stringify(r.headersOut));
      r.return(200);
    });
  // r.return(200, "Hello world!GGGGGGGG eeeeee\n");
}

