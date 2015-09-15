. "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Include.ps1"

$areyousure = read-host "Are you sure you want to run gulp? (y/n)"

If($areyousure -like "y") {
    echo "Starting Node.JS..."
    cd C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp
    gulp
}
ElseIf($areyousure -like "n") {
    cls
    write-host -ForegroundColor red "Back to main menu..."
    mainmenu
}
Else {cls; write-host -ForegroundColor red "Invalid Selection"; mainmenu}
