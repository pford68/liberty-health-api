#!/usr/bin/env bash
set -a
set -e
source .env
FLYWAY_PASSWORD=${ADMIN_PWD}

for c in "${@}"
do
  echo "Running ${c}..."
  flyway -configFiles=./flyway.dev.conf ${c}
done

echo "Done."