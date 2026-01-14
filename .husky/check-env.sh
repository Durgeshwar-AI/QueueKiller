#!/bin/sh

# Prevent committing with NODE_ENV=production
if [ "$NODE_ENV" = "production" ]; then
  echo "❌ Cannot commit with NODE_ENV=production"
  exit 1
fi

# Prevent committing .env files
if git diff --cached --name-only | grep -qE '^\.env($|\.)'; then
  echo "❌ Do not commit .env files!"
  git diff --cached --name-only | grep -E '^\.env($|\.)'
  exit 1
fi

echo "✅ Environment check passed"