# ─────────────────────────────────────────────────────────────────────────────
# download-manga-covers.ps1
# Downloads all Detective Conan volume covers from MangaDex into images/manga/
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts\download-manga-covers.ps1
# ─────────────────────────────────────────────────────────────────────────────

$MANGA_ID = "7f30dfc3-0b80-4dcc-a3b9-0cd746fac005"
$OUT_DIR  = "d:\Antigravity Projects\BBDCI Index\images\manga"
$DELAY_MS = 400

if (-not (Test-Path $OUT_DIR)) {
    New-Item -ItemType Directory -Path $OUT_DIR -Force | Out-Null
    Write-Host "[INFO] Created: $OUT_DIR" -ForegroundColor Cyan
}

function Invoke-ApiGet([string]$Url) {
    for ($i = 0; $i -lt 3; $i++) {
        try {
            return Invoke-RestMethod -Uri $Url -Method Get `
                -Headers @{ "User-Agent" = "BBDCI-Index/1.0" } -TimeoutSec 20
        } catch {
            $msg = $_.Exception.Message
            if ($i -lt 2) {
                Write-Host "  [RETRY] $msg" -ForegroundColor Yellow
                Start-Sleep -Milliseconds ($DELAY_MS * 3)
            } else {
                Write-Host "  [FAIL] $msg" -ForegroundColor Red
                return $null
            }
        }
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " MangaDex Cover Downloader - Detective Conan" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Fetch all cover metadata ─────────────────────────────────────────
$covers = @{}
$offset = 0
$total  = 999

do {
    $apiUrl = "https://api.mangadex.org/cover?manga[]=$MANGA_ID&limit=100&offset=$offset&order[volume]=asc"
    Write-Host "[API] Fetching list (offset=$offset)..." -ForegroundColor Gray
    $data = Invoke-ApiGet $apiUrl
    if ($null -eq $data) { break }

    $items = $data.data
    $total = $data.total

    foreach ($item in $items) {
        $volStr   = $item.attributes.volume
        $fileName = $item.attributes.fileName
        if ($volStr -and $fileName) {
            try {
                $v = [double]$volStr
                if (-not $covers.ContainsKey($v)) { $covers[$v] = $fileName }
            } catch { }
        }
    }
    $offset += $items.Count
    Start-Sleep -Milliseconds $DELAY_MS
} while ($items.Count -eq 100 -and $offset -lt $total)

Write-Host ""
Write-Host "[INFO] Found $($covers.Count) covers (API total: $total)" -ForegroundColor Green
Write-Host "[INFO] Saving to: $OUT_DIR" -ForegroundColor Cyan
Write-Host ""

# ── Step 2: Download each cover ───────────────────────────────────────────────
$downloaded = 0; $skipped = 0; $failed = 0
$failedList = @()

foreach ($vol in ($covers.Keys | Sort-Object)) {
    $fileName = $covers[$vol]
    $label    = if ($vol -eq [Math]::Floor($vol)) { "$([int]$vol)" } else { "$vol" }
    $dest     = "$OUT_DIR\vol-$label.jpg"

    if (Test-Path $dest) {
        $sz = (Get-Item $dest).Length
        if ($sz -gt 1024) {
            Write-Host "  [SKIP] Vol $label ($([Math]::Round($sz/1024))KB)" -ForegroundColor DarkGray
            $skipped++
            continue
        }
        Remove-Item $dest -Force
    }

    $imgUrl = "https://uploads.mangadex.org/covers/$MANGA_ID/$fileName.512.jpg"
    Write-Host "  [DL] Vol $label ... " -ForegroundColor White -NoNewline

    $ok = $false
    for ($attempt = 0; $attempt -lt 3; $attempt++) {
        try {
            Invoke-WebRequest -Uri $imgUrl -OutFile $dest `
                -Headers @{ "User-Agent" = "BBDCI-Index/1.0" } `
                -TimeoutSec 25 -UseBasicParsing | Out-Null
            $sz = (Get-Item $dest).Length
            if ($sz -lt 1024) { throw "Too small ($sz bytes)" }
            $kb = [Math]::Round($sz / 1024)
            Write-Host "OK ($($kb)KB)" -ForegroundColor Green
            $downloaded++; $ok = $true; break
        } catch {
            if ($attempt -lt 2) {
                Write-Host "retry... " -NoNewline -ForegroundColor Yellow
                Start-Sleep -Milliseconds ($DELAY_MS * 2)
            } else {
                Write-Host "FAILED" -ForegroundColor Red
                $failed++; $failedList += $label
                if (Test-Path $dest) { Remove-Item $dest -Force }
            }
        }
    }
    Start-Sleep -Milliseconds $DELAY_MS
}

# ── Summary ────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Done!" -ForegroundColor Green
Write-Host "  Downloaded : $downloaded" -ForegroundColor Green
Write-Host "  Skipped    : $skipped" -ForegroundColor DarkGray
if ($failed -gt 0) {
    Write-Host "  Failed     : $failed ($($failedList -join ', '))" -ForegroundColor Red
} else {
    Write-Host "  Failed     : 0" -ForegroundColor Green
}
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
