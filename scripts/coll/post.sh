#!/usr/bin/bash

curl 'http://localhost:6969/api/user/collection' -X POST -H "Content-Type: application/json" -d "{\"user\": \"$1\", \"collection\": \"$2\"}"