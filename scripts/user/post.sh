#!/usr/bin/bash

curl 'http://localhost:6969/api/user' -X POST -H "Content-Type: application/json" -d "{\"user\": \"$1\"}"