$ErrorActionPreference = 'Stop'
$zip = $env:ZIP_PATH
$pub = $env:PUB_PATH
if (-not $zip -or -not $pub) { throw 'ZIP_PATH and PUB_PATH env vars required' }

foreach ($p in @('healthfit','provino','slavyanka')) {
  $dir = Join-Path $pub $p
  if (Test-Path $dir) { Remove-Item -Recurse -Force $dir }
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead($zip)
try {
  foreach ($e in $z.Entries) {
    if ($e.FullName -notlike '*.png') { continue }
    $slug = $null
    $name = $null
    if ($e.FullName.StartsWith('HealthFit/')) {
      $slug = 'healthfit'
      $name = $e.FullName.Substring('HealthFit/'.Length)
    } elseif ($e.FullName.StartsWith('ProVino/')) {
      $slug = 'provino'
      $name = $e.FullName.Substring('ProVino/'.Length)
    } elseif ($e.FullName.StartsWith('View/') -or $e.FullName.StartsWith('Place Bureau/')) {
      continue
    } else {
      $first = [int][char]$e.FullName[0]
      if ($first -gt 127) {
        $slug = 'slavyanka'
        $idx = $e.FullName.IndexOf('/')
        if ($idx -lt 0) { continue }
        $name = $e.FullName.Substring($idx + 1)
      } else {
        continue
      }
    }
    $dstDir = Join-Path $pub $slug
    if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
    $dst = Join-Path $dstDir $name
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($e, $dst, $true)
    Write-Output "$slug/$name"
  }
} finally {
  $z.Dispose()
}
