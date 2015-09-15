. "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Include.ps1"

$areyousure = read-host "Do you want to Install Visual STudio, GitHub, and NodeJS? (y/n)"

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
        "https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409" # Visual Studio
        "https://github.com/git-for-windows/git/releases/download/v2.5.0.windows.1/Git-2.5.0-64-bit.exe" # GitHub
        "https://nodejs.org/dist/v0.12.7/x64/node-v0.12.7-x64.msi" # NodeJS
    )

    $path = @(
        "C:\ITLS_Software\vs15.exe" # Visual Studio
        "C:\ITLS_Software\github.exe" # GitHub
        "C:\ITLS_Software\nodejs.msi" # NodeJS
     )

     # Searches through files to determine if they already exist, if not they are downloaded
    for ($i=0; $i -lt $url.length; $i++) {
        If (Test-Path $path[$i]) {
            echo ("File #" + ($i+1) + " already exists...")
        }
        else {
           # (new-object System.Net.WebClient).DownloadFile($url[$i], $path[$i]); echo ("Downloading file #" + ($i+1)) // PSv2.0
           Invoke-WebRequest -Uri $url[$i] -OutFile $path[$i];  echo ("Downloading file #" + ($i+1))
        }
    }

    # Starts installation of each application

    for ($i=0; $i -lt $path.length; $i++) {
        echo ("Installing program #" + ($i+1))
        Start-Process $path[$i] -Wait
    }

    echo "Restarting computer to complete installations..."

    Start-Sleep -s 5

    Restart-Computer

    }
ElseIf ($areyousure -like "n") {
    cls
    write-host -ForegroundColor red "Back to main menu..."
    mainmenu
    }
Else {cls; write-host -ForegroundColor red "Invalid Selection"; mainmenu}