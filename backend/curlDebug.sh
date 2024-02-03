#!/bin/bash

# -----------
#BASE_URL="http://localhost:3000"
BASE_URL="https://29e1-186-169-23-33.ngrok-free.app"
PATH_URL="api/v1/messages/debug"
URL="$BASE_URL/$PATH_URL"

# ------------
curl -X POST \
	--url $URL \
	-H "Content-Type: application/json" \
	-d \
"$(echo '{
   "tags": ["curl", "test", "sh", "ngrok"],
   "name": "John Doe",
   "age": 30,
   "city": "Example City",
   "skills": ["programming", "bash", "jq"]
}' | jq -c .)" | jq
