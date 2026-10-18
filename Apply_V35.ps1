param(
  [string]$InputPath = (Join-Path $PSScriptRoot 'index.html')
)
$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $InputPath -PathType Leaf)) {
  Write-Host 'Could not find index.html. Download your CURRENT homepage index.html from your GitHub repository and put it in this folder.' -ForegroundColor Yellow
  exit 1
}

$original = [System.IO.File]::ReadAllText($InputPath, [System.Text.Encoding]::UTF8)
$result = $original
$edits = New-Object System.Collections.Generic.List[string]

# A. Government-section relocation notice: V34 correction included for anyone who has not applied it.
$oldNotice = 'The previous Karatin homepage — including data protection, compliance, secure AI adoption, training, government documents, and contracting information — is now available under Government Solutions.'
$newNotice = 'Karatin LLC supports federal agencies, state and local governments, educational institutions, and prime contractors with flexible staffing, project-based services, and specialized expertise in data protection, compliance readiness, responsible AI, and workforce training.'
if ($result.Contains($oldNotice)) {
  $result = $result.Replace($oldNotice, $newNotice)
  $edits.Add('Replaced obsolete previous-homepage notice')
}

# B. Requested visible government card correction.
$oldCardHeading = '<h3>SLED &amp; Education</h3>'
if ($result.Contains($oldCardHeading)) {
  $result = $result.Replace($oldCardHeading, '<h3>SLED</h3>')
  $edits.Add('Changed government card heading to SLED')
}
$oldCardHeading2 = '<h3>SLED & Education</h3>'
if ($result.Contains($oldCardHeading2)) {
  $result = $result.Replace($oldCardHeading2, '<h3>SLED</h3>')
  $edits.Add('Changed unescaped government card heading to SLED')
}

$oldCardText = 'Flexible IT staffing and services for state, local, and educational organizations.'
$newCardText = 'Flexible staffing and specialized workforce solutions for state, local, and educational organizations.'
if ($result.Contains($oldCardText)) {
  $result = $result.Replace($oldCardText, $newCardText)
  $edits.Add('Updated SLED card description')
}

# C. Same redundant phrase occurs in a secondary homepage card and metadata.
$oldMarkets = 'Federal, SLED, education, prime-contractor, and commercial staffing support.'
$newMarkets = 'Federal, SLED, prime-contractor, and commercial staffing support.'
if ($result.Contains($oldMarkets)) {
  $result = $result.Replace($oldMarkets, $newMarkets)
  $edits.Add('Removed redundant education wording from audience list')
}
# Keep SEO metadata consistent with the corrected terminology; do not change other messages.
$repeated = 'SLED, education,'
if ($result.Contains($repeated)) {
  $result = $result.Replace($repeated, 'SLED,')
  $edits.Add('Removed redundant SLED/education wording from metadata')
}

# Verify no targeted obsolete visible wording remains.
if ($result -match 'The previous Karatin homepage|<h3>\s*SLED\s*&(?:amp;)?\s*Education\s*</h3>') {
  Write-Host 'A targeted phrase is still present. No file was written. Please share your current index.html for a manual review.' -ForegroundColor Red
  exit 2
}

$out = Join-Path (Split-Path -Parent $InputPath) 'index_V35.html'
if ($edits.Count -eq 0) {
  Write-Host 'The source already appears to include the V35 fixes. No replacement file was created.' -ForegroundColor Yellow
  exit 0
}
[System.IO.File]::WriteAllText($out, $result, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ('Saved corrected homepage to: ' + $out) -ForegroundColor Green
Write-Host ('Applied ' + $edits.Count + ' wording-only corrections:')
$edits | ForEach-Object { Write-Host (' - ' + $_) }
Write-Host 'Only upload the generated file AFTER renaming index_V35.html to index.html. No other site files are needed.'
