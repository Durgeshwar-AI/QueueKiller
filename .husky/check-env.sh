#!/bin/sh

# Example: Ensure NODE_ENV is not 'production' during commits
if [ "$NODE_ENV" = "production" ]; then
  echo "❌ Cannot commit with NODE_ENV=production"
  exit 1
fi

echo "✅ Environment check passed"