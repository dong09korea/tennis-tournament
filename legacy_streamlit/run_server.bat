@echo off
cd /d "%~dp0"
echo Tennis Tournament Server Starting...

:: Start Streamlit in a new window
start "Tennis App" cmd /k "streamlit run app.py"

:: Wait a bit for Streamlit to initialize
timeout /t 5 /nobreak >nul

:: Start Ngrok in a new window
start "Ngrok Tunnel" cmd /k "npx ngrok http 8501"

echo.
echo ========================================================
echo  Server Started!
echo  1. 'Tennis App' window runs the dashboard.
echo  2. 'Ngrok Tunnel' window provides the public URL.
echo.
echo  To STOP the server, simply CLOSE both of these windows.
echo ========================================================
pause
