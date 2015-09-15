"Navigating to our site directory.."
cd C:\inetpub\wwwroot\HDSTeamBuilding

    $name = Read-Host "What is your github username?"
    $email = Read-Host "What is your github email?"

    git config user.email $email
    git config user.name $name
    
    git add -A
    git commit -m "finished scenario"

    Do {
    $session = Read-Host "Which session are you?" 
    write-host -foregroundcolor red "WARNING THIS WILL PUSH ALL OF YOUR CHANGES TO GITHUB! ENTER VALUE '6' IF YOU NEED TO CANCEL!"
    $scenario = Read-Host "Which scenario are you working on?"


            If ($session -eq 1) {
                echo $scenario
                switch ($scenario) {
                        1 {git checkout session1scenario1; git push origin session1;}
                        2 {git checkout session1scenario2; git push origin session1;}
                        3 {git checkout session1scenario3; git push origin session1;}
                        4 {git checkout session1scenario4; git push origin session1;}
                        5 {git checkout session1scenario5; git push origin session1;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                    }
            }

            elseif ($session -eq 2) {
                echo $scenario
                switch ($scenario) {
                        1 {git checkout session2scenario1; git push origin session2;}
                        2 {git checkout session2scenario2; git push origin session2;}
                        3 {git checkout session2scenario3; git push origin session2;}
                        4 {git checkout session2scenario4; git push origin session2;}
                        5 {git checkout session2scenario5; git push origin session2;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }

            elseif ($session -eq 3) {
                echo $scenario
                switch ($scenario) {
                        1 {git checkout session3scenario1; git push origin session3;}
                        2 {git checkout session3scenario2; git push origin session3;}
                        3 {git checkout session3scenario3; git push origin session3;}
                        4 {git checkout session3scenario4; git push origin session3;}
                        5 {git checkout session3scenario5; git push origin session3;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }
            else {"Please enter a session between 1 and 3!"}
    }
        Until (($session -le 3 -and $session -ge 1) -and ($scenario -le 5 -and $scenario -ge 1) -or $scenario -eq 6)






