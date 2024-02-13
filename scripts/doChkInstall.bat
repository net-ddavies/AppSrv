@echo off

if exist "%USERPROFILE%\src\js\AppSrv" (
   echo Found AppSrv application service installation.
) else (
  echo Did not find AppSrv application service installation.
)

if exist "%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\AppSrvStart.lnk" (
  echo Found AppSrvStart.lnk shortcut in startup folder.
) else (
  echo Did not find AppSrvStart.lnk shortcut in start up folder.
)

call %USERPROFILE%\src\js\AppSrv\scripts\doShow.bat

if exist "%USERPROFILE%\src\js\AppSrv\AppSrv.log" (
   echo Found AppSrv.log log file.
) else (
    echo Did not find AppSrv.log log file.
)

if exist "%USERPROFILE%\.AppSrv.conf" (
   echo found .AppSrv.conf under your home directory.
) else (
  echo Did not find %USERPROFILE%\.AppSrv.conf
)

rem ends here.
