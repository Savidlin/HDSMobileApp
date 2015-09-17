   "Navigating to our site directory.."
    C:
    cd C:\inetpub\wwwroot\HDSTeamBuilding

    echo "Making sure we are using the correct user to push to github..."
    git remote set-url origin https://joedoestech@github.com/SaumyaS/HDSTeamBuilding.git
    git config user.name JoeDoesTech
    git config user.email JoeDoesTech@gmail.com
    
    echo "Lets make sure we are in master!"
    echo "Comitting any current changes..."
    git add -A
    git commit -m "Adding all changes to reset scenario for next session"
    git checkout master
    echo "updating Master..."
    git pull origin master


    Do {
        $session = Read-Host "Which session are you?" 
        write-host -foregroundcolor red "WARNING THIS WILL DELETE THE BRANCH AND RECREATE IT FROM MASTER! ENTER VALUE '6' IF YOU NEED TO CANCEL!"
        $scenario = Read-Host "Which scenario are you working on?"

            If ($session -eq 1) {
                echo $scenario
                switch ($scenario) {
                        1 {git branch -D session1scenario1; git checkout -b session1scenario1; git pull scenario1-skeleton}
                        2 {git branch -D session1scenario2; git checkout -b session1scenario2; git pull scenario2-skeleton}
                        3 {git branch -D session1scenario3; git checkout -b session1scenario3; git pull scenario3-skeleton}
                        4 {git branch -D session1scenario4; git checkout -b session1scenario4; git pull scenario4-skeleton}
                        5 {git branch -D session1scenario5; git checkout -b session1scenario5; git pull scenario5-skeleton}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }

            elseif ($session -eq 2) {
                echo $scenario
                switch ($scenario) {
                        1 {git branch -D session2scenario1; git checkout -b session2scenario1; git pull scenario1-skeleton}
                        2 {git branch -D session2scenario2; git checkout -b session2scenario2; git pull scenario2-skeleton}
                        3 {git branch -D session2scenario3; git checkout -b session2scenario3; git pull scenario3-skeleton}
                        4 {git branch -D session2scenario4; git checkout -b session2scenario4; git pull scenario4-skeleton}
                        5 {git branch -D session2scenario5; git checkout -b session2scenario5; git pull scenario5-skeleton}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }

            elseif ($session -eq 3) {
                echo $scenario
                switch ($scenario) {
                        1 {git branch -D session3scenario1; git checkout -b session3scenario1; git pull scenario1-skeleton}
                        2 {git branch -D session3scenario2; git checkout -b session3scenario2; git pull scenario2-skeleton}
                        3 {git branch -D session3scenario3; git checkout -b session3scenario3; git pull scenario3-skeleton}
                        4 {git branch -D session3scenario4; git checkout -b session3scenario4; git pull scenario4-skeleton}
                        5 {git branch -D session3scenario5; git checkout -b session3scenario5; git pull scenario5-skeleton}
                        6 {cls; write-host -Foregroundcolor red "Back to main menu..."; mainmenu}
                        default {"Please choose a scenario between 1 and 5"}
                    }
            }
            else {"Please enter a session between 1 and 3!"}
    }
        Until (($session -le 3 -and $session -ge 1) -and ($scenario -le 5 -and $scenario -ge 1) -or ($scenario -eq 6))

echo ""
Read-Host "Press any key to exit..."