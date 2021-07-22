import http from 'k6/http';
import { Rate, Counter, Gauge, Trend } from 'k6/metrics';
import { check, group, sleep } from "k6";

export let options = {
  discardResponseBodies: true,
  scenarios: {
    s1: {
      executor: 'constant-vus',
      exec: 's1',
      vus: 50,
      duration: '30s',
      tags: { my_custom_tag: 'contacts' },
      env: { MYVAR: 'contacts' },
    },
    s2: {
      executor: 'per-vu-iterations',
      exec: 's2',
      vus: 200,
      iterations: 100,
      startTime: '30s',
      maxDuration: '1m',
      tags: { my_custom_tag: 'news' },
      env: { MYVAR: 'news' },
    },
  }
};

export function s1() {
  const response = http.get("http://web/", {headers: {Accepts: "text/html"}});
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};

export function s2() {
  const response = http.get("http://web/", {headers: {Accepts: "text/html"}});
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.100);
};