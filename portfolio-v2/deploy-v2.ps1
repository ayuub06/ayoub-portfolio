# deploy-v2.ps1 — Run from C:\Users\hp840\ayoub-portfolio
# Copies the new feature files into place

$src = Join-Path $PSScriptRoot "portfolio-v2"

if (-not (Test-Path $src)) {
  Write-Host "ERROR: Extract portfolio-v2.zip first, then re-run." -ForegroundColor Red
  exit 1
}

Write-Host "Deploying portfolio v2 features..." -ForegroundColor Cyan

$copies = @(
  @{ From = "portfolio-v2\src\components\Hero.tsx";             To = "src\components\Hero.tsx" },
  @{ From = "portfolio-v2\src\components\Experience.tsx";        To = "src\components\Experience.tsx" },
  @{ From = "portfolio-v2\src\components\Certifications.tsx";    To = "src\components\Certifications.tsx" },
  @{ From = "portfolio-v2\src\components\Contact.tsx";           To = "src\components\Contact.tsx" },
  @{ From = "portfolio-v2\app\page.tsx";                         To = "app\page.tsx" },
  @{ From = "portfolio-v2\app\api\contact\route.ts";             To = "app\api\contact\route.ts" },
  @{ From = "portfolio-v2\.env.local.example";                   To = ".env.local.example" }
)

foreach ($pair in $copies) {
  $fromPath = Join-Path $PSScriptRoot $pair.From
  $toPath   = Join-Path $PSScriptRoot $pair.To
  $dir = Split-Path $toPath -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if (Test-Path $fromPath) {
    Copy-Item $fromPath $toPath -Force
    Write-Host "  Copied: $($pair.To)" -ForegroundColor Green
  } else {
    Write-Host "  MISSING: $($pair.From)" -ForegroundColor Red
  }
}

# Remove old .jsx component files that conflict
$stale = @("src\components\Certifications.jsx", "src\components\Experience.jsx")
foreach ($f in $stale) {
  if (Test-Path $f) { Remove-Item $f -Force; Write-Host "  Removed stale: $f" -ForegroundColor Yellow }
}

# Clear Next.js cache
if (Test-Path ".next") {
  Remove-Item ".next" -Recurse -Force
  Write-Host "  Cleared .next cache" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Next steps ===" -ForegroundColor Cyan
Write-Host "1. Put your photo in: public\profile.jpg" -ForegroundColor White
Write-Host "2. Put your CV in:    public\cv.pdf" -ForegroundColor White
Write-Host "3. Copy .env.local.example to .env.local and add your Resend API key" -ForegroundColor White
Write-Host "   Get free key at: https://resend.com" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White