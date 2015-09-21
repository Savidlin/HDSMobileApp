function mainmenu{  
 echo ""
 echo "    1. Install Powershell v4.0"  
 echo "    2. Install Visual Studio, GitHub, and NodeJS"  
 echo "    3. Install and Setup IIS"  
 echo "    4. Setup/Reset Scenario"
 echo "    5. Push Scenario to GitHub"
 echo "    6. Run gulp with nodejs"
 echo "    7. Exit"
 echo ""

 $scriptchoice = read-host "Please Make a Selection"  
 If (($scriptchoice -le 7 -and $scriptchoice -ge 1)) {
    switch ($scriptchoice) {
            1 {
                $areyousure = read-host "Are you sure you want to Install PowerShell v4.0? (y/n)"
                if($areyousure -like "y"){
                & "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Install-PSv4.0.ps1"}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu}
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
            }
            2 {
                $areyousure = read-host "Are you sure you want to Install Visual Studio, GitHub, and NodeJS? (y/n)"
                if($areyousure -like "y") {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Install-Software.ps1"}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu}
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
            }
            3 {
                $areyousure = read-host "Are you sure you want to Install and Setup IIS? (y/n)"
                if($areyousure -like "y") {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Install-Website.ps1"}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu}
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
                }
            4 {
                $areyousure = read-host "Are you sure you want to reset your scenario to default? (y/n)"
                if($areyousure -like "y") {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Setup-Scenario.ps1"}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu}
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
                }
            5 {
                $areyousure = read-host "Are you sure you want to push your scenario to GitHub? (y/n)"
                if($areyousure -like "y") {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Push-Scenario.ps1"}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu}
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
                }
            6 {
                $areyousure = read-host "Are you sure you want run nodejs? (y/n)"
                if($areyousure -like "y") {& "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\nodejs.ps1"}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu}
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
                }
            7 {
                $areyousure = read-host "Are you sure you want to exit? (y/n)"
                if($areyousure -like "y"){"Exiting..."; Start-Sleep -s 2; Exit;}
                Elseif($areyousure -like "n") {cls; write-host -ForegroundColor red "Back to main menu..."; mainmenu }
                Else {write-host -ForegroundColor red "Invalid Selection"; mainmenu}
            }
        }
}
Else {cls; write-host -ForegroundColor red "Invalid Selection"; mainmenu}
}