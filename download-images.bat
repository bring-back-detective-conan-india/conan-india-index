@echo off
:: Batch file to download fallback images
:: This script runs the PowerShell script to download all images

echo ==========================================
echo  Downloading Fallback Images
echo ==========================================
echo.

:: Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PowerShell is not available on this system.
    echo Please install PowerShell or run the download-images.ps1 script manually.
    pause
    exit /b 1
)

:: Run the PowerShell script
echo Starting image download...
echo.

powershell -ExecutionPolicy Bypass -File "download-images.ps1"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Download script failed.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo  Download Complete!
echo ==========================================
echo.
echo Fallback images are now in the 'fallback-images' folder.
echo.
pause
