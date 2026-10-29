@echo off
title Pizarras Nica English Club
if not exist node_modules (
  echo Instalando, espera 1 o 2 minutos...
  call npm install
)
echo.
echo Abre en tu navegador: http://localhost:5173/#/admin
echo.
call npm run dev -- --open /#/admin
pause
