# HDSTeamBuilding
HDS Leadership Team Building Mobile Application


Initial VS2015 project files have been uploaded.  See below instructions for installing SQLite ADO.NET package in Visual Studio. 

Build the project in Visual Studio and run it. 


====
## Setup HDSMobileApp Project To Run Locally:

#### Server Setup (Internet Information Services "IIS"):
The following instructions only apply if you wish to run the site outside visual studio and make changes without having to start and restart the site in visual studio.

Enable windows features: (start > search 'turn windows features on or off'):
* .Net framework 3.5/4.0 > HTTP Activation
* Internet Information Services > Web Management Tools > IIS Management Console
* Internet Information Services > World Wide Web Services > * (including sub trees)

Add to hosts file (C:\Windows\System32\drivers\etc\hosts):
* "127.0.0.1 site-url" (e.g. '127.0.0.1 my-test-site.dev')

IIS web server console: (start > inetmgr)
* right click on 'sites' > add web site
* site name: anything (e.g. 'my-test-site.dev')
* application pool: .NET v4 (if ASP.NET v4 is not available, something hasn't installed correctly, try below command to register IIS)
* physical path: the "/HDSMobileApp" folder from git on your local machine
* Type: http
* IP address: all unassigned
* Port: 80
* Host name: same as hosts file (e.g. 'my-test-site.dev')

If pages don't load, or .NET v4 is missing, or issues with IIS errors: 
* setup/register IIS with this command in command prompt: 
* $ "C:\Windows\Microsoft.NET\Framework\v4.0.30319\aspnet_regiis.exe -i" (may need to change .net framework path name)

====
#### Build Tool Setup (gulp.js using Node.js):

Install Node.js and packages setup:
* install Node.js from http://nodejs.org/
* start 'Node.js command prompt' (as administrator! from start > all programs once you install it)
* $ 'npm install -g gulp'  // to install the gulp.js build tool globally

Node.js command prompt:
* navigate to HDSMobileApp/ dir inside main project (i.e. using 'cd ...')
* $ 'npm install'  // to install dependencies required by the project
* $ 'gulp'  // start gulp running, this will rebuild files whenever you modify any of the source files and save them
* you should see output message about 'starting'
* wait for 'finished building ...' message, once you see that you should be all set

From now on, when you want to edit app/ files:
* open 'Node.js command prompt'
* navigate to HDSMobileApp/ dir inside main project
* $ 'gulp'

====
#### IDE Setup (Visual Studio 2015 Community):

Install Visual Studio SQLite ADO.NET NuGet package:
* Tools > 'NuGet Package Manager' > 'Manage NuGet Packages For Solution' 
* Search: 'sqlite' 
* Install: 'System.Data.SQLite' (v1.0.97, dependencies: .NET v2.0, .NET v4.0, .NET v4.5, .NET v4.5.1)

Visual Studio:
* Tools > options > Text Editor > TypeScript > Project:
* enable checkbox "Automatically compile TypeScript files which are not part of a project"
* enable radio-button "**Use CommonJS** code generation for modules that are not part of a project"

If using VS2015:
  Disable browser link in Visual Studio

====
### additional error fixes:

Install:
* asp.net mvc 4

go to your global node_modules dir (normally %ProgramFiles(x86)%/nodejs/node_modules) and go to "typescript/bin" and rename "lib.d.ts" to "lib.d.ts.bak" or something similar
and rename "lib.es6.d.ts" to "lib.d.ts" to get TypeScript support for es6 which the project uses (may not apply in future once TypeScript switches to es6).

add the chunk of parseFloat/parseInt and NumberConstructor definitions from "tsDefinitions/ps.d.ts" to the global typescript "lib.d.ts" file. 

in "lib.d.ts" change 'declare var Window' to some other name, like 'declare var WindowStatic' for the window constructor so that the 'Window' interface is visible and extendable. 


If VS2015 Javascript syntax/autocomplete missing:
  (https://social.msdn.microsoft.com/Forums/en-US/f3693b97-7fb1-4b9a-9953-1970b767a407/visual-studio-2015-ctp-javascript-support-missing?forum=visualstudiogeneral)
  "If you are not installed in the default folder,then go to C:\Program Files (x86)\Microsoft Visual Studio 14.0 copy ["merge"] to your install folder(ex.F:\Microsoft Visual Studio 14.0)
  open the Developer Command Prompt as administrator,run command:
  devenv /setup
  devenv.exe /InstallVSTemplates
  Reference articles:http://blog.lishewen.com/post/2015/03/03/vs2015-ctp6-after-installation-without-javascript-intellisense-solution-templates-and-editor"


====
links/notes:

* http://stackoverflow.com/questions/2218838/entity-framework-connection-to-sqlite-database-not-working-after-deployment

* http://nullskull.com/a/10476742/sqlite-in-wpf-with-entity-framework-6.aspx

* http://system.data.sqlite.org/index.html/doc/trunk/www/index.wiki
