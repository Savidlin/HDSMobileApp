   "Navigating to our site directory.."
    C:
    cd C:\inetpub\wwwroot\HDSTeamBuilding

    $name = Read-Host "What is your github username?"
    $email = Read-Host "What is your github email?"

    git config user.email $email
    git config user.name $name
    

    "Lets make sure we are in master!"
    "Comitting any changes..."
    git commit -a -m "Adding all changes to reset scenario for next session"
    git checkout master

    Do {
        $session = Read-Host "Which session are you?" 
        write-host -foregroundcolor red "WARNING THIS WILL DELETE THE BRANCH AND RECREATE IT FROM MASTER! ENTER VALUE '6' IF YOU NEED TO CANCEL!"
        $scenario = Read-Host "Which scenario are you working on?"

            If ($session -eq 1) {
                echo $scenario
                switch ($scenario) {
                        1 {git branch -d session1scenario1; git checkout -b session1scenario1;}
                        2 {git branch -d session1scenario2; git checkout -b session1scenario2;}
                        3 {git branch -d session1scenario3; git checkout -b session1scenario3;}
                        4 {git branch -d session1scenario4; git checkout -b session1scenario4;}
                        5 {git branch -d session1scenario5; git checkout -b session1scenario5;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }

            elseif ($session -eq 2) {
                echo $scenario
                switch ($scenario) {
                        1 {git branch -d session2scenario1; git checkout -b session2scenario1;}
                        2 {git branch -d session2scenario2; git checkout -b session2scenario2;}
                        3 {git branch -d session2scenario3; git checkout -b session2scenario3;}
                        4 {git branch -d session2scenario4; git checkout -b session2scenario4;}
                        5 {git branch -d session2scenario5; git checkout -b session2scenario5;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }

            elseif ($session -eq 3) {
                echo $scenario
                switch ($scenario) {
                        1 {git branch -d session3scenario1; git checkout -b session3scenario1;}
                        2 {git branch -d session3scenario2; git checkout -b session3scenario2;}
                        3 {git branch -d session3scenario3; git checkout -b session3scenario3;}
                        4 {git branch -d session3scenario4; git checkout -b session3scenario4;}
                        5 {git branch -d session3scenario5; git checkout -b session3scenario5;}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }
            else {"Please enter a session between 1 and 3!"}
    }
        Until (($session -le 3 -and $session -ge 1) -and ($scenario -le 5 -and $scenario -ge 1) -or ($scenario -eq 6))

