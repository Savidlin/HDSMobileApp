. "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Include.ps1"

$areyousure = read-host "Are you sure you want install Powershell v4.0? (y/n)"

If ($areyousure -like "y") {
# Determine if path is created and then create it and start software installation
echo "Creating C:\ITLS_Software Directory to store files..."
C:
If (Test-Path C:\ITLS_Software) {
    echo "Path already exists"
    cd C:\ITLS_Software
}
else {
    mkdir C:\ITLS_Software
    cd C:\ITLS_Software
}

$url = @(
    "http://download.microsoft.com/download/B/A/4/BA4A7E71-2906-4B2D-A0E1-80CF16844F5F/dotNetFx45_Full_setup.exe" #.NET 4.5
    "http://download.microsoft.com/download/3/D/6/3D61D262-8549-4769-A660-230B67E15B25/Windows6.1-KB2819745-x64-MultiPkg.msu" # PowerShell 4.0
)

$path = @(
    "C:\ITLS_Software\net45.exe" # .NET 4.5
    "C:\ITLS_Software\ps40.msu" # PowerShell 4.0
 )

 # Searches through files to determine if they already exist, if not they are downloaded
for ($i=0; $i -lt $url.length; $i++) {
    If (Test-Path $path[$i]) {
        echo ("File #" + ($i+1) + " already exists...")
    }
    else {
        (new-object System.Net.WebClient).DownloadFile($url[$i], $path[$i]); echo ("Downloading file #" + ($i+1))
       # Invoke-WebRequest -Uri $url[$i] -OutFile $path[$i];  echo ("Downloading file #" + ($i+1)) //PSv4.0
    }
}

# Starts installation of each application

for ($i=0; $i -lt $path.length; $i++) {
    echo ("Installing program #" + ($i+1))
    Start-Process $path[$i] -Wait
}

Restart-Computer
}

Elseif($areyousure -like "n") {
    cls
    write-host -ForegroundColor red "Back to main menu..."
    mainmenu
}
Else {cls; write-host -ForegroundColor red "Invalid Selection"; mainmenu}

