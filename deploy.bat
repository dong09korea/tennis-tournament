@echo off
echo [1/2] PowerShell execution policy change...
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"
echo [2/2] Running Vercel deployment...
npx vercel --prod --yes
echo.
if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed. Please check if vercel is logged in.
) else (
    echo [SUCCESS] Deploy complete! Refresh your browser in 1 minute.
)
pause
