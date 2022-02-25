#!/usr/bin/bash

curl 'http://localhost:6969/api/user/collection' -X DELETE -H "Content-Type: application/json" -d "{\"user\": \"$1\", \"collection\": \"$2\"}"