. "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Include.ps1"

$areyousure = read-host "Are you sure you want install IIS and setup HDSMobileApp Website? (y/n)"

If($areyousure -like "y") {
    echo "Setting up IIS..."
    dism /online /enable-feature /FeatureName:WCF-HTTP-Activation /FeatureName:IIS-ManagementConsole /FeatureName:IIS-WebServerManagementTools /FeatureName:IIS-Performance /FeatureName:IIS-HttpCompressionStatic /FeatureName:IIS-DirectoryBrowsing /FeatureName:IIS-DefaultDocument /FeatureName:IIS-StaticContent /FeatureName:IIS-RequestMonitor /FeatureName:IIS-HttpLogging /FeatureName:IIS-HealthAndDiagnostics /FeatureName:IIS-NetFxExtensibility /FeatureName:IIS-RequestFiltering /FeatureName:IIS-Security /FeatureName:IIS-ApplicationDevelopment /FeatureName:IIS-HttpErrors /FeatureName:IIS-CommonHttpFeatures /FeatureName:IIS-WebServer /FeatureName:IIS-WebServerRole

    # Creates github directory, clones respository and sets up IIS Website
    echo "Setting up IIS Website..."

    If (Test-Path C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp) {
        echo "The website already exists"
    }
    else {
        cd C:\inetpub\wwwroot\
        git clone https://github.com/SaumyaS/HDSTeamBuilding.git
        New-Website -Name "hds-mobile-app" -PhysicalPath "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp"
    }

    echo "Setting up Node.JS..."
    C:
    cd C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp
    npm install -g gulp
    npm install
    gulp
}
Elseif($areyousure -like "n") {
    cls
    write-host -ForegroundColor red "Back to main menu..."
    mainmenu
}
Else {cls; write-host -ForegroundColor red "Invalid Selection"; mainmenu}



