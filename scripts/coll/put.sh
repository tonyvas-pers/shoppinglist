#!/usr/bin/bash

curl 'http://localhost:6969/api/user/collection' -X PUT -H "Content-Type: application/json" -d "{\"user\": \"$1\", \"collection\": \"$2\", \"data\":\"$3\"}"