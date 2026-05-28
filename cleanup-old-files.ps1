Write-Host "Cleaning up old conflicting .js files..." -ForegroundColor Yellow

$filesToDelete = @(
    "src/hooks/index.js"
    "src/utils/index.js"
    "src/lib/Portfolio.js"
    "src/lib/Variants.js"
    "src/data/portfolio.js"
    "src/animations/variants.js"
    "src/components/About.jsx"
    "src/components/Contact.jsx"
    "src/components/Footer.jsx"
    "src/components/Projects.jsx"
    "src/components/Skills.jsx"
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file" -ForegroundColor Green
    } else {
        Write-Host "Not found: $file" -ForegroundColor Gray
    }
}

Write-Host "`nCleanup complete!" -ForegroundColor Green
Write-Host "Run 'npm run dev' to start your fixed portfolio." -ForegroundColor Cyan
