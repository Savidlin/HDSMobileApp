. "C:\inetpub\wwwroot\HDSTeamBuilding\HDSMobileApp\ps_scripts\Include.ps1"
"Navigating to our site directory.."
cd C:\inetpub\wwwroot\HDSTeamBuilding
    
    Write-Host -Foregroundcolor white "Making sure we are using the correct user to push to github..."
    git remote set-url origin https://joedoestech@github.com/SaumyaS/HDSTeamBuilding.git
    git config user.name JoeDoesTech
    git config user.email JoeDoesTech@gmail.com
    
    git add -A
    git commit -m "finished scenario"

    Do {
    $session = Read-Host "Which session are you?" 
    write-host -foregroundcolor red "WARNING THIS WILL PUSH ALL OF YOUR CHANGES TO GITHUB! ENTER VALUE '6' IF YOU NEED TO CANCEL!"
    $scenario = Read-Host "Which scenario are you working on?"


            If ($session -eq 1) {
                switch ($scenario) {
                        1 {git checkout session1scenario1; git pull origin session1; git push origin session1scenario1:session1;}
                        2 {git checkout session1scenario2; git pull origin session1; git push origin session1scenario2:session1;}
                        3 {git checkout session1scenario3; git pull origin session1; git push origin session1scenario3:session1;}
                        4 {git checkout session1scenario4; git pull origin session1; git push origin session1scenario4:session1;}
                        5 {git checkout session1scenario5; git pull origin session1; git push origin session1scenario5:session1;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                    }
            }

            elseif ($session -eq 2) {
                switch ($scenario) {
                        1 {git checkout session2scenario1; git pull origin session2; git push origin session2scenario1:session2;}
                        2 {git checkout session2scenario2; git pull origin session2; git push origin session2scenario2:session2;}
                        3 {git checkout session2scenario3; git pull origin session2; git push origin session2scenario3:session2;}
                        4 {git checkout session2scenario4; git pull origin session2; git push origin session2scenario4:session2;}
                        5 {git checkout session2scenario5; git pull origin session2; git push origin session2scenario5:session2;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }

            elseif ($session -eq 3) {
                switch ($scenario) {
                        1 {git checkout session3scenario1; git pull origin session3; git push origin session3scenario1:session3;}
                        2 {git checkout session3scenario2; git pull origin session3; git push origin session3scenario2:session3;}
                        3 {git checkout session3scenario3; git pull origin session3; git push origin session3scenario3:session3;}
                        4 {git checkout session3scenario4; git pull origin session3; git push origin session3scenario4:session3;}
                        5 {git checkout session3scenario5; git pull origin session3; git push origin session3scenario5:session3;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }
            else {"Please enter a session between 1 and 3!"}
    }
        Until (($session -le 3 -and $session -ge 1) -and ($scenario -le 5 -and $scenario -ge 1) -or $scenario -eq 6)

echo ""
Read-Host "Press return to exit..."



