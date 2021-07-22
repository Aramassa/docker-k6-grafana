#!/bin/bash

if [ "$1" = "" ];then
  echo "ディレクトリを指定してください 引数[1]"
  exit 1
fi

docker-compose up -d influxdb grafana
docker-compose run k6 run /scripts/$1/k6.js