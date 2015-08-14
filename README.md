# HDSTeamBuilding
HDS Leadership Team Building Mobile Application


## Tools Setup

Initial VS2015 project files have been uploaded.  See below instructions for installing SQLite ADO.NET package in Visual Studio. 
Build the project in Visual Studio and run it. 


====
## Notes:

#### SQLite

Install Visual Studio 2015 SQLite ADO.NET NuGet package:
* Tools > 'NuGet Package Manager' > 'Manage NuGet Packages For Solution' 
* Search: 'sqlite' 
* Install: 'System.Data.SQLite' (v1.0.97, dependencies: .NET v2.0, .NET v4.0, .NET v4.5, .NET v4.5.1)


Install Node.js (https://nodejs.org/):
* Windows start > search/open: Node.js command line
* Run: 'npm install -g gulp'
* Navigate (i.e. 'cd ...') to the project dir and into /HDSMobileApp
* Run: 'npm install'
* Run: 'gulp'
* Wait for 'finished building ...' message


====
links:

http://stackoverflow.com/questions/2218838/entity-framework-connection-to-sqlite-database-not-working-after-deployment

http://nullskull.com/a/10476742/sqlite-in-wpf-with-entity-framework-6.aspx

http://system.data.sqlite.org/index.html/doc/trunk/www/index.wiki
