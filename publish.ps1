# Publish the replacement frontend; the copied backend is not Mythwright infrastructure.
param(
    [Alias('f')] [switch]$Frontend,
    [Alias('b')] [switch]$Backend,
    [Alias('a')] [switch]$All,
    [Alias('c')] [switch]$Clean,
    [Alias('v')] [switch]$Verbose,
    [Alias('p')] [switch]$Production,
    [switch]$FTP,
    [Alias('fv')] [switch]$ForceVendor,
    [Alias('fs')] [switch]$FileSystemOnly,
    [string]$FTPProfile,
    [Alias('r')] [switch]$RootDeploy,
    [Alias('d')] [switch]$DryRun,
    [switch]$Help
)
$rootScript = 'D:\WebHatchery\publish.ps1'
if (-not (Test-Path $rootScript)) {
    Write-Error "Root publish script not found at $rootScript"
    exit 1
}
if ($Backend -or $All) {
    Write-Error 'The inherited Writers Studio backend is disconnected. Complete Mythwright M02 before publishing a backend.'
    exit 1
}
$publishOptions = @{} + $PSBoundParameters
$publishOptions.Remove('Backend')
$publishOptions.Remove('All')
$publishOptions['ProjectDir'] = $PSScriptRoot
$publishOptions['Frontend'] = $true
& $rootScript @publishOptions
