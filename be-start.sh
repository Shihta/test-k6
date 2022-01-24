#!/bin/bash -x

IMAGE_COREGW="harbor.rd2.qct.io/5g/nginx:b6bf3068"
DOCKER_LOG_OPT="--log-driver json-file --log-opt max-size=10m --log-opt max-file=3"

docker rm -f c10k-be
docker run --network host --name c10k-be -d \
  -v $PWD/c10k-be/nginx.conf:/etc/nginx/nginx.conf \
  -v $PWD/c10k-be/http.d:/etc/nginx/http.d \
  -v $PWD/c10k-be/js:/etc/nginx/js \
  -v $PWD/c10k-be/ssl:/etc/nginx/ssl \
  $DOCKER_LOG_OPT \
  $IMAGE_COREGW
