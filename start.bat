@echo off
REM ============================================================
REM  trimsOS web - launcher
REM  Starts the Next.js dev server and opens it in your browser.
REM  Double-click this file, or run it from a terminal.
REM ============================================================
setlocal

REM Go to the web\ folder (relative to where this .bat lives)
cd /d "%~dp0web"

REM Install dependencies on first run / after a fresh clone
if not exist "node_modules" (
  echo [setup] node_modules not found - running "npm install"...
  call npm install
  if errorlevel 1 (
    echo.
    echo [error] npm install failed. See messages above.
    pause
    exit /b 1
  )
)

echo.
echo [run] Starting trimsOS web dev server...
echo [run] URL: http://localhost:3000
echo.

REM Open the browser after a short delay (gives the server time to start)
start "" cmd /c "timeout /t 5 /nobreak >nul & start http://localhost:3000"

REM Start the dev server (blocks here until you press Ctrl+C)
call npm run dev

REM If we reach this point, the server stopped or crashed
echo.
echo [stopped] Dev server exited. Press any key to close.
pause
