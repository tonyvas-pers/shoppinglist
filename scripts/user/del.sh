#!/usr/bin/bash

curl 'http://localhost:6969/api/user' -X DELETE -H "Content-Type: application/json" -d "{\"user\": \"$1\"}"