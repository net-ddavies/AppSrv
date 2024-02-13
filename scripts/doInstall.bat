@echo off

if not exist %USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\AppSrvStart.lnk (
   cscript %USERPROFILE%\src\js\AppSrv\scripts\mkShortcut.vbs
   if exist %USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\AppSrvStart.lnk (
      echo Start up shortcut created.  The AppSrv application service is now set up to automatically start when you log in.
      echo Copy the example .AppSrv.conf file to your windows home directory.
      echo Windows .bat files are provided for Firefox, Chrome and Zoom
      echo See AppSrvFF.bat, AppSrvGChr.bat and AppSrvZoom.bat under "scripts/" (cf README.txt).
      echo Please log out and back in to start the service.  Thank You!
      exit /b 0
   )
   else (
echo Sorry, but something has gone wrong, please report a bug or check out the files under the scripts directory to take a look yourself.
exit /b 13
     )
)

rem Ends here.
