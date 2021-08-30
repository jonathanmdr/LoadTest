import http from "k6/http";
import { check, sleep } from "k6";

import env from "./config/env.js";

export let options = {
  stages: [
      // Ramp-up from 1 to 200 virtual users (VUs) in 5s
      { duration: "5s", target: 200 },

      // Stay at rest on 250 VUs for 10s
      { duration: "10s", target: 250 },

      // Ramp-down from 5 to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  var url = env.HOST + "/authorization-server/oauth/token";

  var payload = {
    "grant_type": "password",
    "username": "my.user@domain.com.br",
    "password": "############",
  };

  var formBody = [];

  for (var property in payload) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(payload[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");

  var params = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic #############",
      "Accept": "application/json",
    },
  };

  const response = http.post(url, formBody, params);

  check(response, { "status is 200": (r) => r.status === 200 });

  sleep(.300);
}
