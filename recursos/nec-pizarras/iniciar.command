#!/bin/bash
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
echo "Abre: http://localhost:5173/#/admin"
npm run dev -- --open /#/admin
