import http from 'k6/http';
import { Rate, Counter, Gauge, Trend } from 'k6/metrics';
import { check, sleep } from "k6";

export let options = {
  discardResponseBodies: true,
  vus: 100,
  duration: String(10 + Math.random() * 10 ) + 's',
  rps: 20
};

export default function () {
  const response = http.get("http://web/", {headers: {Accepts: "text/html"}});
  check(response, { "status is 200": (r) => r.status === 200 });
  // sleep(.300);
};